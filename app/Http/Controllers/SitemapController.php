<?php

namespace App\Http\Controllers;

use App\Models\Project;

class SitemapController extends Controller
{
    public function __invoke()
    {
        $projects = Project::select('slug', 'updated_at')->get();

        $xml = view('sitemap', [
            'projects' => $projects,
            'homeUpdated' => now()->toAtomString(),
        ])->render();

        return response($xml, 200, [
            'Content-Type' => 'application/xml',
            'Cache-Control' => 'public, max-age=3600',
        ]);
    }
}
