<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <title inertia>{{ config('app.name', 'Nitesh Hamal') }}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&family=Poppins:wght@300;400;500;600;700&family=Raleway:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    @inertiaHead
    @if(request()->is('/'))
    <meta property="og:image" content="{{ url('/og-image.png') }}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:image" content="{{ url('/og-image.png') }}">
    @php
        $_s       = \App\Models\Setting::whereIn('key', ['hero','about','contact','seo'])->get()->pluck('value','key');
        $_hero    = $_s['hero']    ?? [];
        $_about   = $_s['about']   ?? [];
        $_contact = $_s['contact'] ?? [];
        $_seo     = $_s['seo']     ?? [];

        $_sameAs = array_values(array_filter([
            $_contact['github']    ?? null,
            $_contact['linkedin']  ?? null,
            $_contact['youtube']   ?? null,
            $_contact['facebook']  ?? null,
            $_contact['instagram'] ?? null,
        ]));

        $_schema = [
            '@context'    => 'https://schema.org',
            '@type'       => 'Person',
            'name'        => $_hero['name']        ?? 'Nitesh Hamal',
            'jobTitle'    => $_about['subtitle']   ?? 'Backend Developer',
            'description' => $_seo['description']  ?? ($_hero['description'] ?? ''),
            'url'         => url('/'),
            'email'       => $_contact['email']    ?? '',
            'telephone'   => $_contact['phone']    ?? '',
            'address'     => [
                '@type'           => 'PostalAddress',
                'streetAddress'   => $_contact['address'] ?? '',
                'addressLocality' => 'Kathmandu',
                'addressRegion'   => 'Bagmati',
                'addressCountry'  => 'NP',
            ],
            'nationality' => ['@type' => 'Country', 'name' => 'Nepal'],
            'knowsAbout'  => ['Laravel', 'PHP', 'MySQL', 'REST API', 'React.js', 'Python', 'Flutter', 'Git'],
            'sameAs'      => $_sameAs,
        ];
    @endphp
    <script type="application/ld+json">{!! json_encode($_schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) !!}</script>
    @endif
</head>
<body class="antialiased">
    @inertia
</body>
</html>
