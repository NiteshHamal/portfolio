<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Support\Facades\Cache;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\Encoders\PngEncoder;
use Intervention\Image\ImageManager;
use Intervention\Image\Interfaces\ImageInterface;

class OgImageController extends Controller
{
    private string $bold;
    private string $regular;

    public function __construct()
    {
        $this->bold    = resource_path('fonts/Poppins-Bold.ttf');
        $this->regular = resource_path('fonts/Poppins-Regular.ttf');
    }

    public function __invoke()
    {
        $png = Cache::remember('og_image_v1', 3600, fn () => $this->generate());

        return response($png, 200, [
            'Content-Type'  => 'image/png',
            'Cache-Control' => 'public, max-age=3600',
        ]);
    }

    private function generate(): string
    {
        $hero  = Setting::get('hero', []);
        $about = Setting::get('about', []);

        $name      = $hero['name']      ?? 'Nitesh Hamal';
        $jobTitle  = $about['subtitle'] ?? 'Backend Developer';
        $domain    = parse_url(url('/'), PHP_URL_HOST) ?? 'portfolio';

        // The about photo is stored in public/images/ (not storage/app/public/)
        $rawPhoto  = $about['photo'] ?? null;
        $photoPath = $rawPhoto ? public_path(ltrim($rawPhoto, '/')) : null;

        $manager = new ImageManager(new Driver());
        $canvas  = $manager->createImage(1200, 630);

        $this->paintBackground($canvas);
        $this->paintText($canvas, $name, $jobTitle, $domain);
        $this->paintAvatar($manager, $canvas, $photoPath, $name);

        return (string) $canvas->encode(new PngEncoder());
    }

    /* ── Background ──────────────────────────────────────────── */

    private function paintBackground(ImageInterface $canvas): void
    {
        $canvas->fill('#040404');

        // Soft glow behind avatar area
        $canvas->drawCircle(fn ($c) => $c->at(980, 260)->radius(260)->background('#18d26e08'));
        $canvas->drawCircle(fn ($c) => $c->at(980, 260)->radius(170)->background('#18d26e0c'));

        // Bottom-left glow
        $canvas->drawCircle(fn ($c) => $c->at(60, 610)->radius(200)->background('#18d26e06'));

        // Left accent bar
        $canvas->drawRectangle(fn ($r) => $r->at(0, 0)->size(6, 630)->background('#18d26e'));

        // Bottom rule
        $canvas->drawRectangle(fn ($r) => $r->at(0, 618)->size(1200, 12)->background('#18d26e1a'));
    }

    /* ── Text ────────────────────────────────────────────────── */

    private function paintText(ImageInterface $canvas, string $name, string $jobTitle, string $domain): void
    {
        [$first, $last] = $this->splitName($name);

        // y values are baselines. Add ~0.7 × size to convert "desired top" → baseline.
        $canvas->text($first, 80, 167, fn ($f) => $f
            ->file($this->bold)->size(96)->color('#ffffff')->align('left'));

        $canvas->text($last, 80, 269, fn ($f) => $f
            ->file($this->bold)->size(96)->color('#18d26e')->align('left'));

        $canvas->text($jobTitle, 80, 349, fn ($f) => $f
            ->file($this->regular)->size(30)->color('#ffffff80')->align('left'));

        // Short accent rule under job title
        $canvas->drawRectangle(fn ($r) => $r->at(80, 384)->size(60, 4)->background('#18d26e'));

        $canvas->text('Laravel · PHP · MySQL · REST API · React', 80, 423, fn ($f) => $f
            ->file($this->regular)->size(21)->color('#ffffff50')->align('left'));

        // Available indicator
        $canvas->drawCircle(fn ($c) => $c->at(88, 568)->radius(8)->background('#18d26e'));
        $canvas->text('Available for Work', 108, 568, fn ($f) => $f
            ->file($this->regular)->size(21)->color('#18d26e')->align('left'));

        // Domain — bottom right
        $canvas->text($domain, 1120, 568, fn ($f) => $f
            ->file($this->regular)->size(21)->color('#ffffff33')->align('right'));
    }

    /* ── Avatar ──────────────────────────────────────────────── */

    private function paintAvatar(ImageManager $manager, ImageInterface $canvas, ?string $photoPath, string $name): void
    {
        $cx = 980; $cy = 255; $r = 130;

        // Glow + ring layers
        $canvas->drawCircle(fn ($c) => $c->at($cx, $cy)->radius($r + 22)->background('#18d26e14'));
        $canvas->drawCircle(fn ($c) => $c->at($cx, $cy)->radius($r + 6)->background('#18d26e55'));
        $canvas->drawCircle(fn ($c) => $c->at($cx, $cy)->radius($r)->background('#0c1c13'));

        if ($photoPath && file_exists($photoPath)) {
            $circlePng = $this->circularCropGd($photoPath, $r * 2);
            if ($circlePng) {
                $canvas->insert($manager->decodeBinary($circlePng), $cx - $r, $cy - $r);
                return;
            }
        }

        // Initials fallback
        $initials = implode('', array_map(
            fn ($w) => strtoupper($w[0] ?? ''),
            array_slice(explode(' ', trim($name)), 0, 2)
        ));
        // Baseline: center of circle + half cap-height offset for visual centering
        $canvas->text($initials, $cx, $cy + 20, fn ($f) => $f
            ->file($this->bold)->size(90)->color('#18d26e')->align('center'));
    }

    /* ── Pure-GD circular crop ───────────────────────────────── */

    private function circularCropGd(string $path, int $size): ?string
    {
        $info = @getimagesize($path);
        if (!$info) return null;

        $src = match ($info[2]) {
            IMAGETYPE_JPEG => @imagecreatefromjpeg($path),
            IMAGETYPE_PNG  => @imagecreatefrompng($path),
            IMAGETYPE_WEBP => @imagecreatefromwebp($path),
            default        => null,
        };
        if (!$src) return null;

        // Scale source to a square
        $sq = imagecreatetruecolor($size, $size);
        imagecopyresampled($sq, $src, 0, 0, 0, 0, $size, $size, $info[0], $info[1]);
        unset($src);

        // Output image with alpha channel
        $out = imagecreatetruecolor($size, $size);
        imagealphablending($out, false);
        imagesavealpha($out, true);
        $transparent = imagecolorallocatealpha($out, 0, 0, 0, 127);
        imagefilledrectangle($out, 0, 0, $size, $size, $transparent);
        imagealphablending($out, true);

        // Copy only pixels within the circle radius
        $half = $size / 2;
        $r2   = $half * $half;
        for ($x = 0; $x < $size; $x++) {
            for ($y = 0; $y < $size; $y++) {
                $dx = $x - $half; $dy = $y - $half;
                if ($dx * $dx + $dy * $dy <= $r2) {
                    imagesetpixel($out, $x, $y, imagecolorat($sq, $x, $y));
                }
            }
        }
        unset($sq);

        ob_start();
        imagepng($out);
        $png = ob_get_clean();
        unset($out);

        return $png ?: null;
    }

    private function splitName(string $name): array
    {
        $parts = explode(' ', trim($name), 2);
        return [$parts[0], $parts[1] ?? ''];
    }
}
