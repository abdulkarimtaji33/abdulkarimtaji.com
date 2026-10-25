<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <script>document.documentElement.className = 'js'; if (sessionStorage.getItem('akt-seen')) document.documentElement.classList.add('seen');</script>

    <link rel="icon" href="{{ asset('images/profile.jpg') }}">
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('images/profile.jpg') }}">

    <title>Abdul Karim Taji | Senior Full Stack Developer</title>
    <meta name="title" content="Abdul Karim Taji | Senior Full Stack Developer">
    <meta name="description" content="Senior Full Stack Developer with 7+ years building AI-powered platforms and scalable web systems. Node.js, React, Laravel, TypeScript. Based in Dubai, UAE.">
    <meta name="keywords" content="Full Stack Developer, Senior Developer, Node.js, React, Laravel, JavaScript, TypeScript, PHP, AI Solutions, Web Development, Dubai Developer, UAE, Backend Developer, Frontend Developer, API Development">
    <meta name="author" content="Abdul Karim Taji">
    <meta name="robots" content="index, follow">

    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:title" content="Abdul Karim Taji | Senior Full Stack Developer">
    <meta property="og:description" content="Senior Full Stack Developer with 7+ years building AI-powered platforms and scalable web systems. Node.js, React, Laravel, TypeScript.">
    <meta property="og:image" content="{{ asset('images/profile.jpg') }}">
    <meta property="og:image:type" content="image/jpeg">
    <meta property="og:image:width" content="1254">
    <meta property="og:image:height" content="1254">
    <meta property="og:image:alt" content="Abdul Karim Taji | Senior Full Stack Developer">
    <meta property="og:site_name" content="Abdul Karim Taji Portfolio">
    <meta property="og:locale" content="en_US">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Abdul Karim Taji | Senior Full Stack Developer">
    <meta name="twitter:description" content="Senior Full Stack Developer with 7+ years building AI-powered platforms and scalable web systems. Based in Dubai, UAE.">
    <meta name="twitter:image" content="{{ asset('images/profile.jpg') }}">
    <meta name="twitter:creator" content="@abdulkarimtaji">

    <link rel="canonical" href="{{ url()->current() }}">
    <meta name="theme-color" content="#07070b">
    <meta name="color-scheme" content="dark">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet">
    <link href="{{ asset('css/site.css') }}?v={{ filemtime(base_path('public_html/css/site.css')) }}" rel="stylesheet">

    <script type="application/ld+json">
    {!! json_encode([
        '@context' => 'https://schema.org',
        '@graph' => [
            [
                '@type' => 'Person',
                'name' => $profile['name'],
                'jobTitle' => $profile['role'],
                'url' => route('portfolio'),
                'image' => asset($profile['portrait']),
                'email' => 'mailto:' . $profile['email'],
                'telephone' => array_column($profile['phones'], 'number'),
                'sameAs' => [$profile['linkedin']],
                'address' => ['@type' => 'PostalAddress', 'addressLocality' => 'Dubai', 'addressCountry' => 'AE'],
                'knowsAbout' => ['Node.js', 'TypeScript', 'React', 'Laravel', 'PHP', 'Python', 'AI platforms', 'REST API design'],
            ],
            ['@type' => 'WebSite', 'name' => 'Abdul Karim Taji Portfolio', 'url' => route('portfolio')],
        ],
    ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) !!}
    </script>
</head>
<body>
    <a class="skip" href="#main">Skip to content</a>

    <div class="preloader" id="preloader" aria-hidden="true">
        <div class="preloader-name">@foreach(str_split('AKT') as $c)<span>{{ $c }}</span>@endforeach</div>
        <div class="preloader-bar"><i></i></div>
    </div>

    <div class="grain" aria-hidden="true"></div>
    <div class="cursor" id="cursor" aria-hidden="true"><i></i><b></b></div>

    @include('portfolio.sections._nav')

    <main id="main">
        @include('portfolio.sections._hero')
        @include('portfolio.sections._marquee')
        @include('portfolio.sections._about')
        @include('portfolio.sections._skills')
        @include('portfolio.sections._work')
        @include('portfolio.sections._projects')
        @include('portfolio.sections._experience')
        @include('portfolio.sections._contact')
    </main>

    @include('portfolio.sections._footer')

    <div class="toast" id="toast" role="status" aria-live="polite"></div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js" defer></script>
    <script type="module" src="{{ asset('js/site.js') }}?v={{ filemtime(base_path('public_html/js/site.js')) }}"
            data-hero="{{ asset('js/hero-scene.js') }}?v={{ filemtime(base_path('public_html/js/hero-scene.js')) }}"></script>
</body>
</html>
