<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="https://i.ibb.co/HD2ykMXR/Whats-App-Image-2026-02-11-at-2-32-41-PM.jpg">
    <link rel="shortcut icon" href="https://i.ibb.co/HD2ykMXR/Whats-App-Image-2026-02-11-at-2-32-41-PM.jpg">
    <link rel="apple-touch-icon" sizes="180x180" href="https://i.ibb.co/HD2ykMXR/Whats-App-Image-2026-02-11-at-2-32-41-PM.jpg">
    <link rel="icon" type="image/png" sizes="32x32" href="https://i.ibb.co/HD2ykMXR/Whats-App-Image-2026-02-11-at-2-32-41-PM.jpg">
    <link rel="icon" type="image/png" sizes="16x16" href="https://i.ibb.co/HD2ykMXR/Whats-App-Image-2026-02-11-at-2-32-41-PM.jpg">

    <!-- Primary Meta Tags -->
    <title>Abdul Karim Taji — Senior Full Stack Developer</title>
    <meta name="title" content="Abdul Karim Taji — Senior Full Stack Developer">
    <meta name="description" content="Senior Full Stack Developer with 7+ years building AI-powered platforms and scalable web systems. Node.js, React, Laravel, TypeScript. Based in Dubai, UAE.">
    <meta name="keywords" content="Full Stack Developer, Senior Developer, Node.js, React, Laravel, JavaScript, TypeScript, PHP, AI Solutions, Web Development, Dubai Developer, UAE, Backend Developer, Frontend Developer, API Development">
    <meta name="author" content="Abdul Karim Taji">
    <meta name="robots" content="index, follow">
    <meta name="language" content="English">
    <meta name="revisit-after" content="7 days">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:title" content="Abdul Karim Taji — Senior Full Stack Developer">
    <meta property="og:description" content="Senior Full Stack Developer with 7+ years building AI-powered platforms and scalable web systems. Node.js, React, Laravel, TypeScript.">
    <meta property="og:image" content="https://i.ibb.co/HD2ykMXR/Whats-App-Image-2026-02-11-at-2-32-41-PM.jpg">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:site_name" content="Abdul Karim Taji Portfolio">
    <meta property="og:locale" content="en_US">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="{{ url()->current() }}">
    <meta property="twitter:title" content="Abdul Karim Taji — Senior Full Stack Developer">
    <meta property="twitter:description" content="Senior Full Stack Developer with 7+ years building AI-powered platforms and scalable web systems. Based in Dubai, UAE.">
    <meta property="twitter:image" content="https://i.ibb.co/HD2ykMXR/Whats-App-Image-2026-02-11-at-2-32-41-PM.jpg">
    <meta property="twitter:creator" content="@abdulkarimtaji">
    <meta property="twitter:site" content="@abdulkarimtaji">

    <!-- Canonical URL -->
    <link rel="canonical" href="{{ url()->current() }}">

    <!-- Preconnect for performance -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://cdnjs.cloudflare.com">
    <link rel="dns-prefetch" href="//cdnjs.cloudflare.com">

    <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet">

    <meta name="theme-color" content="#0b0c0f" media="(prefers-color-scheme: dark)">
    <meta name="theme-color" content="#faf9f7" media="(prefers-color-scheme: light)">

    <style>
        /* ============================================================
           1. DESIGN TOKENS — Primitive → Semantic → Component
           One accent (amber/gold), reserved for actions & the one
           thing that should be noticed. 60% neutral / 30% structural
           surfaces / 10% accent.
           ============================================================ */
        :root {
            /* --- Primitives (OKLCH, hex fallback given inline) --- */
            --ink-98: oklch(98.2% 0.003 90);
            --ink-95: oklch(95.5% 0.004 90);
            --ink-90: oklch(90% 0.005 90);
            --ink-70: oklch(70% 0.006 90);
            --ink-45: oklch(45% 0.008 90);
            --ink-20: oklch(20% 0.008 90);
            --ink-14: oklch(14% 0.006 90);
            --ink-10: oklch(10% 0.005 90);

            --gold-90: oklch(90% 0.06 85);
            --gold-70: oklch(74% 0.13 78);
            --gold-55: oklch(62% 0.15 62);
            --gold-40: oklch(46% 0.13 55);

            --teal-60: oklch(62% 0.09 190);

            /* --- Semantic: light (default) --- */
            --surface-0: var(--ink-98);      /* page background */
            --surface-1: #ffffff;             /* card */
            --surface-2: var(--ink-95);       /* subtle recessed panel */
            --surface-inverse: var(--ink-10);

            --border-subtle: var(--ink-90);
            --border-strong: var(--ink-70);

            --text-primary: var(--ink-10);
            --text-secondary: var(--ink-45);
            --text-on-inverse: var(--ink-95);

            --color-action: var(--gold-55);
            --color-action-hover: var(--gold-40);
            --color-action-contrast: #ffffff;
            --color-accent-soft: var(--gold-90);
            --color-structural: var(--teal-60);

            --focus-ring: var(--gold-55);

            /* --- Spacing (4px base) --- */
            --space-1: 0.25rem;
            --space-2: 0.5rem;
            --space-3: 0.75rem;
            --space-4: 1rem;
            --space-5: 1.5rem;
            --space-6: 2rem;
            --space-8: 3rem;
            --space-10: 4rem;
            --space-12: 6rem;
            --space-16: 8rem;

            /* --- Radii --- */
            --radius-sm: 0.375rem;
            --radius-md: 0.75rem;
            --radius-lg: 1.25rem;
            --radius-full: 9999px;

            /* --- Shadows (light mode) --- */
            --shadow-sm: 0 1px 2px oklch(20% 0 0 / 0.05), 0 1px 1px oklch(20% 0 0 / 0.04);
            --shadow-md: 0 8px 24px oklch(20% 0 0 / 0.07), 0 2px 6px oklch(20% 0 0 / 0.05);
            --shadow-lg: 0 24px 48px oklch(20% 0 0 / 0.12), 0 6px 16px oklch(20% 0 0 / 0.06);

            /* --- Motion --- */
            --duration-fast: 150ms;
            --duration-base: 250ms;
            --duration-slow: 450ms;
            --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
            --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);

            /* --- Type scale (1.25 ratio, fluid) --- */
            --text-xs: 0.8125rem;
            --text-sm: 0.9375rem;
            --text-base: 1.0625rem;
            --text-lg: 1.25rem;
            --text-xl: clamp(1.5rem, 1.3rem + 0.8vw, 1.875rem);
            --text-2xl: clamp(1.875rem, 1.5rem + 1.6vw, 2.75rem);
            --text-3xl: clamp(2.5rem, 1.8rem + 3vw, 4.25rem);
        }

        [data-theme="dark"] {
            --surface-0: var(--ink-10);
            --surface-1: var(--ink-14);
            --surface-2: var(--ink-20);
            --surface-inverse: var(--ink-98);

            --border-subtle: oklch(28% 0.008 90);
            --border-strong: oklch(38% 0.01 90);

            --text-primary: var(--ink-95);
            --text-secondary: oklch(68% 0.01 90);
            --text-on-inverse: var(--ink-10);

            --color-action: var(--gold-70);
            --color-action-hover: var(--gold-90);
            --color-action-contrast: var(--ink-10);
            --color-accent-soft: oklch(30% 0.05 78);
            --color-structural: oklch(70% 0.08 190);

            --shadow-sm: 0 1px 2px oklch(0% 0 0 / 0.3);
            --shadow-md: 0 8px 24px oklch(0% 0 0 / 0.4);
            --shadow-lg: 0 24px 48px oklch(0% 0 0 / 0.5);
        }

        @media (prefers-color-scheme: dark) {
            :root:not([data-theme="light"]) {
                --surface-0: var(--ink-10);
                --surface-1: var(--ink-14);
                --surface-2: var(--ink-20);
                --surface-inverse: var(--ink-98);

                --border-subtle: oklch(28% 0.008 90);
                --border-strong: oklch(38% 0.01 90);

                --text-primary: var(--ink-95);
                --text-secondary: oklch(68% 0.01 90);
                --text-on-inverse: var(--ink-10);

                --color-action: var(--gold-70);
                --color-action-hover: var(--gold-90);
                --color-action-contrast: var(--ink-10);
                --color-accent-soft: oklch(30% 0.05 78);
                --color-structural: oklch(70% 0.08 190);

                --shadow-sm: 0 1px 2px oklch(0% 0 0 / 0.3);
                --shadow-md: 0 8px 24px oklch(0% 0 0 / 0.4);
                --shadow-lg: 0 24px 48px oklch(0% 0 0 / 0.5);
            }
        }

        /* ============================================================
           2. RESET & BASE
           ============================================================ */
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        html { scroll-behavior: smooth; color-scheme: light dark; }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            font-size: var(--text-base);
            line-height: 1.6;
            color: var(--text-primary);
            background: var(--surface-0);
            transition: background-color var(--duration-base) var(--ease-in-out), color var(--duration-base) var(--ease-in-out);
        }

        img { max-width: 100%; display: block; }

        h1, h2, h3, h4 {
            font-family: 'Fraunces', Georgia, serif;
            font-weight: 600;
            line-height: 1.1;
            letter-spacing: -0.01em;
            color: var(--text-primary);
        }

        p { color: var(--text-secondary); }

        a { color: inherit; text-decoration: none; }

        ::selection { background: var(--color-action); color: var(--color-action-contrast); }

        /* Visible focus everywhere — :focus-visible so mouse clicks stay clean */
        a:focus-visible, button:focus-visible, [tabindex]:focus-visible {
            outline: 2px solid var(--focus-ring);
            outline-offset: 3px;
            border-radius: var(--radius-sm);
        }

        @media (prefers-reduced-motion: reduce) {
            html { scroll-behavior: auto; }
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
        }

        .container {
            width: 100%;
            max-width: 1180px;
            margin-inline: auto;
            padding-inline: var(--space-5);
        }

        .visually-hidden {
            position: absolute; width: 1px; height: 1px; overflow: hidden;
            clip: rect(0 0 0 0); white-space: nowrap;
        }

        .skip-link {
            position: absolute; top: -100%; left: var(--space-4);
            background: var(--color-action); color: var(--color-action-contrast);
            padding: var(--space-2) var(--space-4); border-radius: var(--radius-sm);
            z-index: 1000; font-weight: 600; font-size: var(--text-sm);
            transition: top var(--duration-fast) var(--ease-out);
        }
        .skip-link:focus { top: var(--space-4); }

        /* ============================================================
           3. TYPOGRAPHY UTILITIES
           ============================================================ */
        .eyebrow {
            font-size: var(--text-xs);
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: var(--color-action);
        }

        .section-head { max-width: 44rem; margin-bottom: var(--space-8); }
        .section-head .eyebrow { margin-bottom: var(--space-3); display: block; }
        .section-head h2 { font-size: var(--text-2xl); margin-bottom: var(--space-3); }
        .section-head p { font-size: var(--text-lg); max-width: 42ch; }

        .prose { max-width: 66ch; }

        /* ============================================================
           4. BUTTONS
           ============================================================ */
        .btn {
            display: inline-flex;
            align-items: center;
            gap: var(--space-2);
            font-family: 'Inter', sans-serif;
            font-weight: 600;
            font-size: var(--text-sm);
            padding: var(--space-3) var(--space-6);
            border-radius: var(--radius-full);
            border: 1px solid transparent;
            cursor: pointer;
            transition: transform var(--duration-fast) var(--ease-out),
                        background-color var(--duration-fast) var(--ease-out),
                        box-shadow var(--duration-fast) var(--ease-out),
                        border-color var(--duration-fast) var(--ease-out);
            white-space: nowrap;
        }
        .btn:active { transform: scale(0.97); }

        .btn-primary {
            background: var(--color-action);
            color: var(--color-action-contrast);
            box-shadow: var(--shadow-sm);
        }
        .btn-primary:hover { background: var(--color-action-hover); box-shadow: var(--shadow-md); transform: translateY(-1px); }

        .btn-ghost {
            background: transparent;
            color: var(--text-primary);
            border-color: var(--border-strong);
        }
        .btn-ghost:hover { border-color: var(--color-action); color: var(--color-action); }

        /* ============================================================
           5. NAVIGATION
           ============================================================ */
        .site-nav {
            position: fixed;
            top: 0; left: 0; right: 0;
            z-index: 100;
            padding-block: var(--space-4);
            transition: padding var(--duration-base) var(--ease-in-out),
                        background-color var(--duration-base) var(--ease-in-out),
                        box-shadow var(--duration-base) var(--ease-in-out),
                        border-color var(--duration-base) var(--ease-in-out);
            border-bottom: 1px solid transparent;
        }
        .site-nav.scrolled {
            padding-block: var(--space-3);
            background: color-mix(in oklch, var(--surface-0) 82%, transparent);
            backdrop-filter: blur(14px) saturate(160%);
            border-color: var(--border-subtle);
            box-shadow: var(--shadow-sm);
        }

        .nav-inner {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: var(--space-4);
        }

        .nav-brand {
            display: flex;
            align-items: center;
            gap: var(--space-3);
            font-family: 'Fraunces', serif;
            font-weight: 600;
            font-size: var(--text-lg);
        }
        .nav-brand img {
            width: 2.5rem; height: 2.5rem; border-radius: var(--radius-full);
            object-fit: cover; border: 2px solid var(--border-subtle);
        }
        .nav-brand-name { display: none; }
        @media (min-width: 480px) { .nav-brand-name { display: inline; } }

        .nav-links {
            display: none;
            align-items: center;
            gap: var(--space-6);
            list-style: none;
        }
        @media (min-width: 900px) { .nav-links { display: flex; } }

        .nav-links a {
            font-size: var(--text-sm);
            font-weight: 500;
            color: var(--text-secondary);
            position: relative;
            padding-block: var(--space-1);
            transition: color var(--duration-fast) var(--ease-out);
        }
        .nav-links a::after {
            content: '';
            position: absolute; left: 0; right: 100%; bottom: -2px;
            height: 2px; background: var(--color-action);
            transition: right var(--duration-base) var(--ease-out);
        }
        .nav-links a:hover { color: var(--text-primary); }
        .nav-links a:hover::after { right: 0; }

        .nav-actions { display: flex; align-items: center; gap: var(--space-3); }

        .theme-toggle {
            display: inline-flex; align-items: center; justify-content: center;
            width: 2.5rem; height: 2.5rem;
            border-radius: var(--radius-full);
            border: 1px solid var(--border-subtle);
            background: var(--surface-1);
            color: var(--text-primary);
            cursor: pointer;
            transition: border-color var(--duration-fast) var(--ease-out), transform var(--duration-fast) var(--ease-out);
        }
        .theme-toggle:hover { border-color: var(--color-action); transform: translateY(-1px); }
        .theme-toggle .fa-sun { display: none; }
        [data-theme="dark"] .theme-toggle .fa-moon { display: none; }
        [data-theme="dark"] .theme-toggle .fa-sun { display: inline; }

        .nav-toggle {
            display: inline-flex; align-items: center; justify-content: center;
            width: 2.5rem; height: 2.5rem;
            border-radius: var(--radius-sm);
            border: 1px solid var(--border-subtle);
            background: var(--surface-1);
            color: var(--text-primary);
            cursor: pointer;
        }
        @media (min-width: 900px) { .nav-toggle { display: none; } }

        .mobile-menu {
            display: none;
            flex-direction: column;
            gap: var(--space-1);
            margin-top: var(--space-4);
            padding: var(--space-4);
            background: var(--surface-1);
            border: 1px solid var(--border-subtle);
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-lg);
        }
        .mobile-menu.open { display: flex; }
        @media (min-width: 900px) { .mobile-menu { display: none !important; } }

        .mobile-menu a {
            padding: var(--space-3) var(--space-3);
            border-radius: var(--radius-sm);
            font-weight: 500;
            color: var(--text-primary);
            transition: background-color var(--duration-fast) var(--ease-out);
        }
        .mobile-menu a:hover { background: var(--surface-2); }

        /* ============================================================
           6. HERO
           ============================================================ */
        .hero {
            position: relative;
            padding-block: calc(var(--space-16) + var(--space-6)) var(--space-12);
            overflow: hidden;
        }

        .hero-bg {
            position: absolute; inset: 0; z-index: -1;
            background:
                radial-gradient(circle at 15% 20%, color-mix(in oklch, var(--color-action) 14%, transparent) 0%, transparent 45%),
                radial-gradient(circle at 85% 75%, color-mix(in oklch, var(--color-structural) 12%, transparent) 0%, transparent 50%);
        }

        .hero-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: var(--space-10);
            align-items: center;
        }
        @media (min-width: 960px) {
            .hero-grid { grid-template-columns: 1.15fr 0.85fr; }
        }

        .hero-copy .eyebrow { margin-bottom: var(--space-4); }

        .hero h1 {
            font-size: var(--text-3xl);
            margin-bottom: var(--space-4);
        }
        .hero h1 em {
            font-style: italic;
            color: var(--color-action);
        }

        .hero-lead {
            font-size: var(--text-lg);
            max-width: 46ch;
            margin-bottom: var(--space-6);
        }

        .hero-actions { display: flex; flex-wrap: wrap; gap: var(--space-3); margin-bottom: var(--space-8); }

        .hero-meta {
            display: flex; flex-wrap: wrap; gap: var(--space-5);
            font-size: var(--text-sm); color: var(--text-secondary);
        }
        .hero-meta span { display: inline-flex; align-items: center; gap: var(--space-2); }
        .hero-meta i { color: var(--color-action); width: 1rem; text-align: center; }
        .hero-meta a { color: var(--text-secondary); transition: color var(--duration-fast) var(--ease-out); border-bottom: 1px solid transparent; }
        .hero-meta a:hover { color: var(--color-action); border-color: var(--color-action); }

        .copy-btn { background: none; border: none; cursor: pointer; font: inherit; color: inherit; padding: 0; position: relative; }
        .copy-btn:hover { color: var(--color-action); }
        .copy-toast {
            position: absolute; bottom: 130%; left: 50%; transform: translateX(-50%);
            background: var(--surface-inverse); color: var(--text-on-inverse);
            font-size: var(--text-xs); font-weight: 600; white-space: nowrap;
            padding: var(--space-2) var(--space-3); border-radius: var(--radius-sm);
            box-shadow: var(--shadow-md);
            animation: toast-pop var(--duration-slow) var(--ease-out) forwards;
            pointer-events: none;
        }
        @keyframes toast-pop {
            0% { opacity: 0; transform: translate(-50%, 6px); }
            15% { opacity: 1; transform: translate(-50%, 0); }
            85% { opacity: 1; transform: translate(-50%, 0); }
            100% { opacity: 0; transform: translate(-50%, -6px); }
        }

        .hero-portrait-wrap {
            position: relative;
            justify-self: center;
            width: min(100%, 22rem);
        }
        .hero-portrait {
            position: relative;
            aspect-ratio: 1;
            border-radius: var(--radius-lg);
            overflow: hidden;
            box-shadow: var(--shadow-lg);
            border: 1px solid var(--border-subtle);
        }
        .hero-portrait img { width: 100%; height: 100%; object-fit: cover; }

        .hero-badge {
            position: absolute;
            bottom: -1rem; left: -1rem;
            background: var(--surface-1);
            border: 1px solid var(--border-subtle);
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-md);
            padding: var(--space-3) var(--space-4);
            display: flex; align-items: center; gap: var(--space-3);
        }
        .hero-badge-icon {
            width: 2.5rem; height: 2.5rem; border-radius: var(--radius-full);
            background: var(--color-accent-soft); color: var(--color-action-hover);
            display: flex; align-items: center; justify-content: center; font-size: 1.1rem;
            flex-shrink: 0;
        }
        .hero-badge strong { display: block; font-size: var(--text-sm); color: var(--text-primary); }
        .hero-badge span { font-size: var(--text-xs); color: var(--text-secondary); }

        /* ============================================================
           7. STATS
           ============================================================ */
        .stats {
            border-block: 1px solid var(--border-subtle);
            padding-block: var(--space-8);
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: var(--space-6);
        }
        @media (min-width: 720px) { .stats-grid { grid-template-columns: repeat(4, 1fr); } }

        .stat {
            text-align: center;
            padding-inline: var(--space-2);
            border-right: 1px solid var(--border-subtle);
        }
        .stat:last-child { border-right: none; }
        @media (max-width: 719px) {
            .stat:nth-child(2n) { border-right: none; }
        }

        .stat-number {
            font-family: 'Fraunces', serif;
            font-size: var(--text-2xl);
            font-weight: 600;
            color: var(--text-primary);
            display: block;
        }
        .stat-label {
            font-size: var(--text-xs);
            color: var(--text-secondary);
            text-transform: uppercase;
            letter-spacing: 0.06em;
        }

        /* ============================================================
           8. SECTIONS — shared rhythm
           ============================================================ */
        section.block { padding-block: var(--space-12); }
        .surface-alt { background: var(--surface-2); }

        /* ============================================================
           9. ABOUT
           ============================================================ */
        .about-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: var(--space-8);
        }
        @media (min-width: 860px) {
            .about-grid { grid-template-columns: 0.9fr 1.1fr; align-items: start; }
        }
        .about-lead {
            font-family: 'Fraunces', serif;
            font-size: var(--text-xl);
            font-weight: 500;
            color: var(--text-primary);
            line-height: 1.35;
        }
        .about-lead em { font-style: italic; color: var(--color-action); }
        .about-body p { margin-bottom: var(--space-4); font-size: var(--text-base); max-width: 62ch; }
        .about-body p:last-child { margin-bottom: 0; }
        .about-body strong { color: var(--text-primary); font-weight: 600; }

        /* ============================================================
           10. SKILLS
           ============================================================ */
        .skills-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: var(--space-5);
        }
        @media (min-width: 640px) { .skills-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .skills-grid { grid-template-columns: repeat(3, 1fr); } }

        .skill-card {
            background: var(--surface-1);
            border: 1px solid var(--border-subtle);
            border-radius: var(--radius-md);
            padding: var(--space-5);
            transition: border-color var(--duration-base) var(--ease-out), box-shadow var(--duration-base) var(--ease-out), transform var(--duration-base) var(--ease-out);
        }
        .skill-card:hover { border-color: var(--color-action); box-shadow: var(--shadow-md); transform: translateY(-2px); }

        .skill-card-head { display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-4); }
        .skill-card-icon {
            width: 2.75rem; height: 2.75rem; border-radius: var(--radius-md);
            background: var(--color-accent-soft); color: var(--color-action-hover);
            display: flex; align-items: center; justify-content: center; font-size: 1.15rem;
            flex-shrink: 0;
        }
        .skill-card h4 { font-family: 'Inter', sans-serif; font-size: var(--text-base); font-weight: 700; }

        .skill-tags { display: flex; flex-wrap: wrap; gap: var(--space-2); }
        .skill-tag {
            font-size: var(--text-xs);
            font-weight: 500;
            padding: var(--space-1) var(--space-3);
            border-radius: var(--radius-full);
            background: var(--surface-2);
            color: var(--text-secondary);
            border: 1px solid var(--border-subtle);
        }

        /* ============================================================
           11. PROJECTS
           ============================================================ */
        .project-row {
            display: grid;
            grid-template-columns: 1fr;
            gap: var(--space-6);
            margin-bottom: var(--space-10);
        }
        @media (min-width: 760px) { .project-row { grid-template-columns: repeat(2, 1fr); } }

        .project-row-secondary {
            grid-template-columns: 1fr;
        }
        @media (min-width: 640px) { .project-row-secondary { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .project-row-secondary { grid-template-columns: repeat(3, 1fr); } }

        .project-card {
            display: grid;
            grid-template-rows: auto auto 1fr auto;
            background: var(--surface-1);
            border: 1px solid var(--border-subtle);
            border-radius: var(--radius-lg);
            overflow: hidden;
            transition: border-color var(--duration-base) var(--ease-out), box-shadow var(--duration-base) var(--ease-out), transform var(--duration-base) var(--ease-out);
        }
        .project-card:hover { border-color: var(--border-strong); box-shadow: var(--shadow-lg); transform: translateY(-3px); }

        .project-media { position: relative; aspect-ratio: 16/9; overflow: hidden; background: var(--surface-2); }
        .project-media img {
            width: 100%; height: 100%; object-fit: cover;
            transition: transform var(--duration-slow) var(--ease-out);
        }
        .project-card:hover .project-media img { transform: scale(1.05); }

        .project-badge {
            position: absolute; top: var(--space-3); left: var(--space-3);
            background: var(--color-action); color: var(--color-action-contrast);
            font-size: var(--text-xs); font-weight: 700;
            padding: var(--space-1) var(--space-3);
            border-radius: var(--radius-full);
            display: inline-flex; align-items: center; gap: var(--space-1);
        }

        .project-body { padding: var(--space-5) var(--space-5) 0; }
        .project-category {
            font-size: var(--text-xs); font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
            color: var(--color-structural);
        }
        .project-title { font-family: 'Fraunces', serif; font-size: var(--text-lg); margin-block: var(--space-2) var(--space-2); }
        .project-desc { padding-inline: var(--space-5); font-size: var(--text-sm); }

        .project-footer { padding: var(--space-4) var(--space-5) var(--space-5); }
        .project-link {
            display: inline-flex; align-items: center; gap: var(--space-2);
            font-size: var(--text-sm); font-weight: 600; color: var(--color-action);
        }
        .project-link i { transition: transform var(--duration-fast) var(--ease-out); }
        .project-card:hover .project-link i { transform: translateX(3px); }

        .project-muted { font-size: var(--text-sm); color: var(--text-secondary); display: inline-flex; align-items: center; gap: var(--space-2); }

        .subsection-title {
            display: flex; align-items: center; gap: var(--space-4);
            margin-bottom: var(--space-6);
            font-size: var(--text-lg);
            font-weight: 600;
        }
        .subsection-title::after {
            content: ''; flex: 1; height: 1px; background: var(--border-subtle);
        }

        /* ============================================================
           12. EXPERIENCE — timeline
           ============================================================ */
        .timeline { position: relative; max-width: 52rem; }
        .timeline::before {
            content: '';
            position: absolute; left: 0.5rem; top: 0.5rem; bottom: 0.5rem;
            width: 2px; background: var(--border-subtle);
        }
        @media (min-width: 640px) {
            .timeline::before { left: 0.6875rem; }
        }

        .timeline-item {
            position: relative;
            padding-left: var(--space-8);
            padding-bottom: var(--space-8);
        }
        .timeline-item:last-child { padding-bottom: 0; }

        .timeline-dot {
            position: absolute; left: 0; top: 0.35rem;
            width: 1.375rem; height: 1.375rem;
            border-radius: var(--radius-full);
            background: var(--surface-0);
            border: 2px solid var(--border-strong);
            display: flex; align-items: center; justify-content: center;
        }
        .timeline-item.current .timeline-dot {
            border-color: var(--color-action);
            background: var(--color-accent-soft);
        }
        .timeline-dot::after {
            content: ''; width: 0.5rem; height: 0.5rem; border-radius: var(--radius-full);
            background: var(--border-strong);
        }
        .timeline-item.current .timeline-dot::after { background: var(--color-action); }

        .timeline-card {
            background: var(--surface-1);
            border: 1px solid var(--border-subtle);
            border-radius: var(--radius-md);
            padding: var(--space-5);
            transition: border-color var(--duration-base) var(--ease-out), box-shadow var(--duration-base) var(--ease-out);
        }
        .timeline-card:hover { border-color: var(--color-action); box-shadow: var(--shadow-md); }

        .timeline-top {
            display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: var(--space-2);
            margin-bottom: var(--space-1);
        }
        .timeline-role { font-family: 'Fraunces', serif; font-size: var(--text-lg); }
        .timeline-period {
            font-size: var(--text-xs); font-weight: 600; color: var(--color-action);
            white-space: nowrap;
        }
        .timeline-company {
            font-size: var(--text-sm); color: var(--text-secondary); font-weight: 500;
            margin-bottom: var(--space-3);
        }
        .current-pill {
            display: inline-block; margin-left: var(--space-2);
            font-size: 0.6875rem; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase;
            background: var(--color-accent-soft); color: var(--color-action-hover);
            padding: 0.1rem var(--space-2); border-radius: var(--radius-full);
            vertical-align: middle;
        }
        .timeline-desc { font-size: var(--text-sm); }

        /* ============================================================
           13. CONTACT / CTA
           ============================================================ */
        .cta-panel {
            background: var(--surface-inverse);
            color: var(--text-on-inverse);
            border-radius: var(--radius-lg);
            padding: var(--space-10) var(--space-6);
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        .cta-panel::before {
            content: '';
            position: absolute; inset: 0;
            background: radial-gradient(circle at 50% 0%, color-mix(in oklch, var(--gold-55) 20%, transparent) 0%, transparent 60%);
            pointer-events: none;
        }
        .cta-panel h2 { color: var(--text-on-inverse); font-size: var(--text-2xl); margin-bottom: var(--space-3); }
        .cta-panel p { color: color-mix(in oklch, var(--text-on-inverse) 70%, transparent); font-size: var(--text-lg); max-width: 40ch; margin-inline: auto; margin-bottom: var(--space-6); }
        .cta-actions { display: flex; flex-wrap: wrap; gap: var(--space-3); justify-content: center; position: relative; z-index: 1; }
        .cta-panel .btn-ghost { border-color: color-mix(in oklch, var(--text-on-inverse) 30%, transparent); color: var(--text-on-inverse); }
        .cta-panel .btn-ghost:hover { border-color: var(--color-action); color: var(--color-action); }

        /* ============================================================
           14. FOOTER
           ============================================================ */
        .site-footer {
            border-top: 1px solid var(--border-subtle);
            padding-block: var(--space-10) var(--space-6);
        }
        .footer-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: var(--space-8);
            margin-bottom: var(--space-8);
        }
        @media (min-width: 760px) { .footer-grid { grid-template-columns: 1.3fr 1fr 1fr; } }

        .footer-brand h5 { font-family: 'Fraunces', serif; font-size: var(--text-lg); margin-bottom: var(--space-3); }
        .footer-brand p { font-size: var(--text-sm); max-width: 34ch; margin-bottom: var(--space-4); }

        .footer-col h6 {
            font-size: var(--text-xs); font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
            color: var(--text-primary); margin-bottom: var(--space-4);
        }
        .footer-links { list-style: none; display: flex; flex-direction: column; gap: var(--space-3); }
        .footer-links a, .footer-links span {
            font-size: var(--text-sm); color: var(--text-secondary);
            display: inline-flex; align-items: center; gap: var(--space-2);
            transition: color var(--duration-fast) var(--ease-out);
        }
        .footer-links a:hover { color: var(--color-action); }
        .footer-links i { color: var(--color-action); width: 1rem; text-align: center; }

        .social-row { display: flex; gap: var(--space-2); }
        .social-link {
            width: 2.5rem; height: 2.5rem; border-radius: var(--radius-full);
            display: flex; align-items: center; justify-content: center;
            border: 1px solid var(--border-subtle);
            color: var(--text-primary);
            transition: background-color var(--duration-fast) var(--ease-out), border-color var(--duration-fast) var(--ease-out), transform var(--duration-fast) var(--ease-out);
        }
        .social-link:hover { background: var(--color-action); color: var(--color-action-contrast); border-color: var(--color-action); transform: translateY(-2px); }

        .footer-bottom {
            padding-top: var(--space-6);
            border-top: 1px solid var(--border-subtle);
            text-align: center;
            font-size: var(--text-xs);
            color: var(--text-secondary);
        }
        .footer-bottom i { color: var(--color-action); }

        /* ============================================================
           15. SCROLL REVEAL — IntersectionObserver-driven, with a
           guaranteed-visible fallback (see script below). Elements
           start visible; JS opts eligible ones into the transition
           only once observed, so content is never stuck hidden.
           ============================================================ */
        .reveal {
            opacity: 1;
            transform: none;
        }
        .reveal.reveal-pending {
            opacity: 0;
            transform: translateY(20px);
        }
        .reveal.reveal-in {
            opacity: 1;
            transform: translateY(0);
            transition: opacity var(--duration-slow) var(--ease-out), transform var(--duration-slow) var(--ease-out);
            transition-delay: var(--reveal-delay, 0ms);
        }

        /* Stagger — sibling groups get an incremental delay so they cascade
           in rather than popping together (40–100ms rhythm per skill guidance) */
        .stats-grid .stat:nth-child(1) { --reveal-delay: 0ms; }
        .stats-grid .stat:nth-child(2) { --reveal-delay: 80ms; }
        .stats-grid .stat:nth-child(3) { --reveal-delay: 160ms; }
        .stats-grid .stat:nth-child(4) { --reveal-delay: 240ms; }

        .skills-grid .skill-card:nth-child(1) { --reveal-delay: 0ms; }
        .skills-grid .skill-card:nth-child(2) { --reveal-delay: 70ms; }
        .skills-grid .skill-card:nth-child(3) { --reveal-delay: 140ms; }
        .skills-grid .skill-card:nth-child(4) { --reveal-delay: 210ms; }
        .skills-grid .skill-card:nth-child(5) { --reveal-delay: 280ms; }
        .skills-grid .skill-card:nth-child(6) { --reveal-delay: 350ms; }

        .project-row .project-card:nth-child(1) { --reveal-delay: 0ms; }
        .project-row .project-card:nth-child(2) { --reveal-delay: 90ms; }
        .project-row .project-card:nth-child(3) { --reveal-delay: 180ms; }
        .project-row-secondary .project-card:nth-child(1) { --reveal-delay: 0ms; }
        .project-row-secondary .project-card:nth-child(2) { --reveal-delay: 70ms; }
        .project-row-secondary .project-card:nth-child(3) { --reveal-delay: 140ms; }
        .project-row-secondary .project-card:nth-child(4) { --reveal-delay: 210ms; }
        .project-row-secondary .project-card:nth-child(5) { --reveal-delay: 280ms; }
        .project-row-secondary .project-card:nth-child(6) { --reveal-delay: 350ms; }

        .timeline .timeline-item:nth-child(1) { --reveal-delay: 0ms; }
        .timeline .timeline-item:nth-child(2) { --reveal-delay: 60ms; }
        .timeline .timeline-item:nth-child(3) { --reveal-delay: 120ms; }
        .timeline .timeline-item:nth-child(4) { --reveal-delay: 180ms; }
        .timeline .timeline-item:nth-child(5) { --reveal-delay: 240ms; }

        /* ============================================================
           16. HERO ENTRANCE + AMBIENT MOTION
           ============================================================ */
        @media (prefers-reduced-motion: no-preference) {
            .hero-copy .eyebrow,
            .hero-copy h1,
            .hero-lead,
            .hero-actions,
            .hero-meta {
                opacity: 0;
                animation: hero-in var(--duration-slow) var(--ease-out) forwards;
            }
            .hero-copy .eyebrow  { animation-delay: 60ms; }
            .hero-copy h1        { animation-delay: 140ms; }
            .hero-lead            { animation-delay: 260ms; }
            .hero-actions          { animation-delay: 360ms; }
            .hero-meta               { animation-delay: 440ms; }

            .hero-portrait-wrap {
                opacity: 0;
                animation: hero-in-scale 700ms var(--ease-out) forwards;
                animation-delay: 200ms;
            }

            .hero-badge {
                animation: badge-float 5s ease-in-out infinite;
                animation-delay: 1s; /* let the entrance settle first */
            }

            .hero-bg {
                animation: bg-drift 22s ease-in-out infinite alternate;
            }
        }

        @keyframes hero-in {
            from { opacity: 0; transform: translateY(16px); }
            to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hero-in-scale {
            from { opacity: 0; transform: scale(0.94) translateY(12px); }
            to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes badge-float {
            0%, 100% { transform: translateY(0); }
            50%      { transform: translateY(-8px); }
        }
        @keyframes bg-drift {
            from { transform: scale(1) translate(0, 0); }
            to   { transform: scale(1.08) translate(-2%, 2%); }
        }

        /* ============================================================
           17. MICRO-INTERACTIONS
           ============================================================ */
        .skill-card-icon,
        .hero-badge-icon {
            transition: transform var(--duration-base) var(--ease-out), background-color var(--duration-base) var(--ease-out);
        }
        .skill-card:hover .skill-card-icon { transform: rotate(-8deg) scale(1.08); }

        .social-link,
        .theme-toggle {
            transition: transform var(--duration-fast) var(--ease-out), background-color var(--duration-fast) var(--ease-out), border-color var(--duration-fast) var(--ease-out);
        }
        .social-link:active { transform: scale(0.92); }
        .theme-toggle:active { transform: scale(0.9) rotate(-10deg); }

        .timeline-dot {
            transition: transform var(--duration-base) var(--ease-out), border-color var(--duration-base) var(--ease-out), background-color var(--duration-base) var(--ease-out);
        }
        .timeline-item:hover .timeline-dot { transform: scale(1.15); }

        .timeline-item.current .timeline-dot {
            animation: dot-pulse 2.2s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
            .timeline-item.current .timeline-dot { animation: none; }
        }
        @keyframes dot-pulse {
            0%, 100% { box-shadow: 0 0 0 0 color-mix(in oklch, var(--color-action) 35%, transparent); }
            50%      { box-shadow: 0 0 0 6px color-mix(in oklch, var(--color-action) 0%, transparent); }
        }

        .project-card { will-change: transform; }
        .project-badge { transition: transform var(--duration-base) var(--ease-out); }
        .project-card:hover .project-badge { transform: scale(1.06); }

        .nav-brand img { transition: transform var(--duration-base) var(--ease-out); }
        .nav-brand:hover img { transform: rotate(-6deg) scale(1.05); }

        /* Button shine sweep on hover */
        .btn-primary { position: relative; overflow: hidden; }
        .btn-primary::before {
            content: '';
            position: absolute; top: 0; left: -60%;
            width: 40%; height: 100%;
            background: linear-gradient(120deg, transparent, color-mix(in oklch, white 45%, transparent), transparent);
            transform: skewX(-20deg);
            transition: left var(--duration-slow) var(--ease-out);
            pointer-events: none;
        }
        .btn-primary:hover::before { left: 130%; }

        .cta-panel {
            transition: transform var(--duration-base) var(--ease-out);
        }

        .stat-number { transition: color var(--duration-base) var(--ease-out); }
        .stat:hover .stat-number { color: var(--color-action); }
    </style>
</head>
<body>
    <a href="#main" class="skip-link">Skip to main content</a>

    <!-- ============================================================
         NAVIGATION
         ============================================================ -->
    <header class="site-nav" id="siteNav">
        <div class="container nav-inner">
            <a class="nav-brand" href="#home">
                <img src="https://i.ibb.co/wNPhM5GW/33.jpg" alt="" width="40" height="40">
                <span class="nav-brand-name">Abdul Karim Taji</span>
            </a>

            <nav aria-label="Primary">
                <ul class="nav-links">
                    <li><a href="#about">About</a></li>
                    <li><a href="#skills">Skills</a></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#experience">Experience</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>

            <div class="nav-actions">
                <button class="theme-toggle" id="themeToggle" type="button" aria-label="Toggle dark mode">
                    <i class="fas fa-moon" aria-hidden="true"></i>
                    <i class="fas fa-sun" aria-hidden="true"></i>
                </button>
                <a href="#contact" class="btn btn-primary" style="display:none" id="navCta">Let's talk</a>
                <button class="nav-toggle" id="navToggle" type="button" aria-label="Toggle menu" aria-expanded="false" aria-controls="mobileMenu">
                    <i class="fas fa-bars" aria-hidden="true"></i>
                </button>
            </div>
        </div>

        <nav class="container mobile-menu" id="mobileMenu" aria-label="Mobile">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
        </nav>
    </header>

    <main id="main">
        <!-- ============================================================
             HERO
             ============================================================ -->
        <section id="home" class="hero">
            <div class="hero-bg" aria-hidden="true"></div>
            <div class="container">
                <div class="hero-grid">
                    <div class="hero-copy">
                        <span class="eyebrow">Dubai, UAE · Available for select engagements</span>
                        <h1>Building <em>AI&#8209;powered</em> platforms that hold up at scale.</h1>
                        <p class="hero-lead">Senior Full&nbsp;Stack Developer with 7+ years shipping fintech, AI, and e-commerce systems end to end — from backend architecture to the interface people actually touch.</p>

                        <div class="hero-actions">
                            <a href="#projects" class="btn btn-primary">
                                View my work <i class="fas fa-arrow-right" aria-hidden="true"></i>
                            </a>
                            <a href="#contact" class="btn btn-ghost">Get in touch</a>
                        </div>

                        <div class="hero-meta">
                            <span><i class="fas fa-location-dot" aria-hidden="true"></i> Dubai, UAE</span>
                            <span>
                                <i class="fas fa-phone" aria-hidden="true"></i>
                                <button type="button" class="copy-btn" data-copy="+971505302566" aria-label="Copy phone number +971 50 530 2566">
                                    +971 50 530 2566
                                </button>
                            </span>
                            <span><i class="fas fa-envelope" aria-hidden="true"></i> <a href="mailto:abdulkarimtaji33@gmail.com">Email</a></span>
                            <span><i class="fab fa-linkedin" aria-hidden="true"></i> <a href="https://www.linkedin.com/in/abdul-karim-taji-09a56821a" target="_blank" rel="noopener">LinkedIn</a></span>
                        </div>
                    </div>

                    <div class="hero-portrait-wrap">
                        <div class="hero-portrait">
                            <img src="https://i.ibb.co/wNPhM5GW/33.jpg" alt="Portrait of Abdul Karim Taji" width="352" height="352" fetchpriority="high">
                        </div>
                        <div class="hero-badge">
                            <div class="hero-badge-icon"><i class="fas fa-briefcase" aria-hidden="true"></i></div>
                            <div>
                                <strong>7+ years</strong>
                                <span>Full-stack &amp; AI systems</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ============================================================
             STATS
             ============================================================ -->
        <section class="stats" aria-label="Career highlights">
            <div class="container stats-grid">
                <div class="stat reveal">
                    <span class="stat-number" data-count="7" data-suffix="+">0</span>
                    <span class="stat-label">Years Experience</span>
                </div>
                <div class="stat reveal">
                    <span class="stat-number" data-count="100" data-suffix="+">0</span>
                    <span class="stat-label">Projects Delivered</span>
                </div>
                <div class="stat reveal">
                    <span class="stat-number" data-count="6" data-suffix="">0</span>
                    <span class="stat-label">Companies</span>
                </div>
                <div class="stat reveal">
                    <span class="stat-number" data-count="15" data-suffix="+">0</span>
                    <span class="stat-label">Technologies</span>
                </div>
            </div>
        </section>

        <!-- ============================================================
             ABOUT
             ============================================================ -->
        <section id="about" class="block">
            <div class="container">
                <div class="about-grid">
                    <p class="about-lead reveal">Senior Full Stack Developer specializing in <em>AI-driven platforms</em> and scalable systems for finance, travel, and real estate.</p>
                    <div class="about-body reveal">
                        <p>I'm a Senior Full Stack Developer with <strong>7+ years</strong> of experience building, scaling, and maintaining large-scale web and AI-enabled applications. My background spans both backend and frontend technologies, API design and integration, and mentoring the engineers around me.</p>
                        <p>I work closely with cross-functional stakeholders to deliver <strong>secure, high-performance solutions</strong> — the kind that hold up under real financial and operational data, not just demos. That means seamless integration across web, mobile, and AI systems, and code that the next engineer can actually maintain.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- ============================================================
             SKILLS
             ============================================================ -->
        <section id="skills" class="block surface-alt">
            <div class="container">
                <div class="section-head reveal">
                    <span class="eyebrow">Technical Expertise</span>
                    <h2>A full-spectrum toolkit</h2>
                    <p>From backend architecture to the pixels users interact with — one consistent standard across the stack.</p>
                </div>

                <div class="skills-grid">
                    <div class="skill-card reveal">
                        <div class="skill-card-head">
                            <div class="skill-card-icon"><i class="fas fa-code" aria-hidden="true"></i></div>
                            <h4>Languages &amp; Frameworks</h4>
                        </div>
                        <div class="skill-tags">
                            <span class="skill-tag">Node.js</span>
                            <span class="skill-tag">TypeScript</span>
                            <span class="skill-tag">JavaScript</span>
                            <span class="skill-tag">PHP</span>
                            <span class="skill-tag">Laravel</span>
                            <span class="skill-tag">NestJS</span>
                            <span class="skill-tag">Python</span>
                        </div>
                    </div>

                    <div class="skill-card reveal">
                        <div class="skill-card-head">
                            <div class="skill-card-icon"><i class="fas fa-display" aria-hidden="true"></i></div>
                            <h4>Frontend</h4>
                        </div>
                        <div class="skill-tags">
                            <span class="skill-tag">React.js</span>
                            <span class="skill-tag">Next.js</span>
                            <span class="skill-tag">Vue.js</span>
                            <span class="skill-tag">HTML5</span>
                            <span class="skill-tag">CSS3</span>
                            <span class="skill-tag">jQuery</span>
                        </div>
                    </div>

                    <div class="skill-card reveal">
                        <div class="skill-card-head">
                            <div class="skill-card-icon"><i class="fas fa-database" aria-hidden="true"></i></div>
                            <h4>Databases</h4>
                        </div>
                        <div class="skill-tags">
                            <span class="skill-tag">MySQL</span>
                            <span class="skill-tag">PostgreSQL</span>
                            <span class="skill-tag">MongoDB</span>
                            <span class="skill-tag">SQLite</span>
                            <span class="skill-tag">Firebase</span>
                        </div>
                    </div>

                    <div class="skill-card reveal">
                        <div class="skill-card-head">
                            <div class="skill-card-icon"><i class="fas fa-cloud" aria-hidden="true"></i></div>
                            <h4>Infrastructure &amp; DevOps</h4>
                        </div>
                        <div class="skill-tags">
                            <span class="skill-tag">CI/CD</span>
                            <span class="skill-tag">AWS</span>
                            <span class="skill-tag">Git</span>
                            <span class="skill-tag">Docker</span>
                        </div>
                    </div>

                    <div class="skill-card reveal">
                        <div class="skill-card-head">
                            <div class="skill-card-icon"><i class="fas fa-gears" aria-hidden="true"></i></div>
                            <h4>Craft</h4>
                        </div>
                        <div class="skill-tags">
                            <span class="skill-tag">REST API Design</span>
                            <span class="skill-tag">SEO</span>
                            <span class="skill-tag">Performance</span>
                            <span class="skill-tag">Security</span>
                        </div>
                    </div>

                    <div class="skill-card reveal">
                        <div class="skill-card-head">
                            <div class="skill-card-icon"><i class="fas fa-users" aria-hidden="true"></i></div>
                            <h4>Leadership</h4>
                        </div>
                        <div class="skill-tags">
                            <span class="skill-tag">Mentorship</span>
                            <span class="skill-tag">Code Review</span>
                            <span class="skill-tag">Agile/Scrum</span>
                            <span class="skill-tag">Project Management</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ============================================================
             PROJECTS
             ============================================================ -->
        <section id="projects" class="block">
            <div class="container">
                <div class="section-head reveal">
                    <span class="eyebrow">Selected Work</span>
                    <h2>Projects that shipped, and stayed shipped</h2>
                    <p>A curated set of platforms delivered across fintech, travel, real estate, and AI.</p>
                </div>

                @if($featuredProjects->count())
                <div class="project-row">
                    @foreach($featuredProjects as $project)
                    <article class="project-card reveal">
                        <div class="project-media">
                            <img src="{{ $project->image }}" alt="{{ $project->name }}" loading="lazy" width="640" height="360">
                            <span class="project-badge"><i class="fas fa-star" aria-hidden="true"></i> Featured</span>
                        </div>
                        <div class="project-body">
                            <span class="project-category">{{ $project->category }}</span>
                            <h3 class="project-title">{{ $project->name }}</h3>
                        </div>
                        <p class="project-desc">{{ $project->description }}</p>
                        <div class="project-footer">
                            @if($project->url && $project->url !== '#')
                            <a href="{{ $project->url }}" class="project-link" target="_blank" rel="noopener">
                                View project <i class="fas fa-arrow-right" aria-hidden="true"></i>
                            </a>
                            @else
                            <span class="project-muted"><i class="fas fa-mobile-screen" aria-hidden="true"></i> Mobile app — contact for demo</span>
                            @endif
                        </div>
                    </article>
                    @endforeach
                </div>
                @endif

                @if($otherProjects->count())
                <h3 class="subsection-title reveal">More projects</h3>
                <div class="project-row project-row-secondary">
                    @foreach($otherProjects as $project)
                    <article class="project-card reveal">
                        <div class="project-media">
                            <img src="{{ $project->image }}" alt="{{ $project->name }}" loading="lazy" width="480" height="270">
                        </div>
                        <div class="project-body">
                            <span class="project-category">{{ $project->category }}</span>
                            <h4 class="project-title" style="font-size: var(--text-base);">{{ $project->name }}</h4>
                        </div>
                        <p class="project-desc">{{ $project->description }}</p>
                        <div class="project-footer">
                            @if($project->url && $project->url !== '#')
                            <a href="{{ $project->url }}" class="project-link" target="_blank" rel="noopener">
                                Visit site <i class="fas fa-arrow-right" aria-hidden="true"></i>
                            </a>
                            @else
                            <span class="project-muted"><i class="fas fa-mobile-screen" aria-hidden="true"></i> Contact for demo</span>
                            @endif
                        </div>
                    </article>
                    @endforeach
                </div>
                @endif

                @if(!$featuredProjects->count() && !$otherProjects->count())
                <div class="reveal" style="text-align:center; padding: var(--space-10) 0; color: var(--text-secondary);">
                    <i class="fas fa-folder-open" style="font-size: 2rem; color: var(--color-action); margin-bottom: var(--space-3); display:block;"></i>
                    <p>Project case studies are being updated — check back soon, or get in touch for a walkthrough.</p>
                </div>
                @endif
            </div>
        </section>

        <!-- ============================================================
             EXPERIENCE
             ============================================================ -->
        <section id="experience" class="block surface-alt">
            <div class="container">
                <div class="section-head reveal">
                    <span class="eyebrow">Professional Journey</span>
                    <h2>Where I've built</h2>
                    <p>A track record across financial platforms, AI products, and full-stack teams.</p>
                </div>

                <ol class="timeline" style="list-style:none;">
                    <li class="timeline-item current reveal">
                        <div class="timeline-dot" aria-hidden="true"></div>
                        <div class="timeline-card">
                            <div class="timeline-top">
                                <h3 class="timeline-role">Senior Software Engineer — Full Stack<span class="current-pill">Current</span></h3>
                                <span class="timeline-period">May 2025 – Present</span>
                            </div>
                            <div class="timeline-company"><i class="fas fa-building" aria-hidden="true"></i> RAMA Technologies, Dubai</div>
                            <p class="timeline-desc">Development of web platforms for digital loan origination, credit assessment, and customer onboarding. Owned end-to-end full-stack delivery with primary responsibility for backend architecture and data integrity — secure, scalable REST APIs integrating AI-driven credit/risk engines and third-party financial services, plus access control, audit logging, and compliance-aligned backend logic.</p>
                        </div>
                    </li>

                    <li class="timeline-item reveal">
                        <div class="timeline-dot" aria-hidden="true"></div>
                        <div class="timeline-card">
                            <div class="timeline-top">
                                <h3 class="timeline-role">Senior Software Engineer — Full Stack (AI Products)</h3>
                                <span class="timeline-period">Jan 2024 – Apr 2025</span>
                            </div>
                            <div class="timeline-company"><i class="fas fa-building" aria-hidden="true"></i> Herogram, Dubai</div>
                            <p class="timeline-desc">Led development on large-scale AI-based web products, with emphasis on backend architecture. Designed scalable RESTful APIs integrating frontend and AI components, automated critical workflows, and mentored junior developers.</p>
                        </div>
                    </li>

                    <li class="timeline-item reveal">
                        <div class="timeline-dot" aria-hidden="true"></div>
                        <div class="timeline-card">
                            <div class="timeline-top">
                                <h3 class="timeline-role">Senior Full Stack Developer</h3>
                                <span class="timeline-period">Dec 2022 – Oct 2023</span>
                            </div>
                            <div class="timeline-company"><i class="fas fa-building" aria-hidden="true"></i> Brainwave Technologies</div>
                            <p class="timeline-desc">Built and maintained large-scale applications with a full-stack focus, owning backend services and frontend integration. Created efficient REST APIs for mobile and web clients for smooth cross-platform communication.</p>
                        </div>
                    </li>

                    <li class="timeline-item reveal">
                        <div class="timeline-dot" aria-hidden="true"></div>
                        <div class="timeline-card">
                            <div class="timeline-top">
                                <h3 class="timeline-role">Senior Software Engineer — Backend</h3>
                                <span class="timeline-period">Mar 2021 – Dec 2022</span>
                            </div>
                            <div class="timeline-company"><i class="fas fa-building" aria-hidden="true"></i> Tekrevol</div>
                            <p class="timeline-desc">Architected and maintained core server-side components for multiple projects in Agile/Scrum environments, integrating backend services with frontend and mobile teams to ensure consistent API contracts.</p>
                        </div>
                    </li>

                    <li class="timeline-item reveal">
                        <div class="timeline-dot" aria-hidden="true"></div>
                        <div class="timeline-card">
                            <div class="timeline-top">
                                <h3 class="timeline-role">Full Stack Web Developer</h3>
                                <span class="timeline-period">Jan 2018 – Dec 2020</span>
                            </div>
                            <div class="timeline-company"><i class="fas fa-building" aria-hidden="true"></i> Abtach</div>
                            <p class="timeline-desc">Developed custom modules and integrated APIs into large-scale systems with an emphasis on performance and security, including data protection and security audits across applications.</p>
                        </div>
                    </li>
                </ol>
            </div>
        </section>

        <!-- ============================================================
             CONTACT / CTA
             ============================================================ -->
        <section id="contact" class="block">
            <div class="container">
                <div class="cta-panel reveal">
                    <h2>Have a project in mind?</h2>
                    <p>I'm currently open to select senior full-stack and AI-platform engagements. Let's talk about what you're building.</p>
                    <div class="cta-actions">
                        <a href="mailto:abdulkarimtaji33@gmail.com" class="btn btn-primary">
                            <i class="fas fa-envelope" aria-hidden="true"></i> Email me
                        </a>
                        <a href="https://www.linkedin.com/in/abdul-karim-taji-09a56821a" target="_blank" rel="noopener" class="btn btn-ghost">
                            <i class="fab fa-linkedin" aria-hidden="true"></i> Connect on LinkedIn
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- ============================================================
         FOOTER
         ============================================================ -->
    <footer class="site-footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <h5>Abdul Karim Taji</h5>
                    <p>Senior Full Stack Developer specializing in AI-powered platforms and scalable web systems. Based in Dubai, UAE.</p>
                    <div class="social-row">
                        <a href="https://www.linkedin.com/in/abdul-karim-taji-09a56821a" class="social-link" target="_blank" rel="noopener" title="LinkedIn" aria-label="LinkedIn">
                            <i class="fab fa-linkedin-in" aria-hidden="true"></i>
                        </a>
                        <a href="mailto:abdulkarimtaji33@gmail.com" class="social-link" title="Email" aria-label="Email">
                            <i class="fas fa-envelope" aria-hidden="true"></i>
                        </a>
                        <a href="tel:+971505302566" class="social-link" title="Phone" aria-label="Phone">
                            <i class="fas fa-phone" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>

                <div class="footer-col">
                    <h6>Navigate</h6>
                    <ul class="footer-links">
                        <li><a href="#home"><i class="fas fa-house" aria-hidden="true"></i> Home</a></li>
                        <li><a href="#about"><i class="fas fa-user" aria-hidden="true"></i> About</a></li>
                        <li><a href="#projects"><i class="fas fa-diagram-project" aria-hidden="true"></i> Projects</a></li>
                        <li><a href="#experience"><i class="fas fa-briefcase" aria-hidden="true"></i> Experience</a></li>
                    </ul>
                </div>

                <div class="footer-col">
                    <h6>Get in touch</h6>
                    <ul class="footer-links">
                        <li><span><i class="fas fa-location-dot" aria-hidden="true"></i> Jumeirah Lake Towers, Dubai, UAE</span></li>
                        <li><a href="tel:+971505302566"><i class="fas fa-phone" aria-hidden="true"></i> +971 50 530 2566</a></li>
                        <li><a href="mailto:abdulkarimtaji33@gmail.com"><i class="fas fa-envelope" aria-hidden="true"></i> abdulkarimtaji33@gmail.com</a></li>
                    </ul>
                </div>
            </div>

            <div class="footer-bottom">
                <p>&copy; {{ date('Y') }} Abdul Karim Taji. Crafted with <i class="fas fa-heart" aria-hidden="true"></i> in Dubai.</p>
            </div>
        </div>
    </footer>

    <script>
        (function () {
            'use strict';

            // ---- Theme toggle (persisted) ----
            var root = document.documentElement;
            var toggle = document.getElementById('themeToggle');
            var stored = null;
            try { stored = localStorage.getItem('theme'); } catch (e) {}
            if (stored) { root.setAttribute('data-theme', stored); }

            toggle.addEventListener('click', function () {
                var current = root.getAttribute('data-theme');
                var isDark = current === 'dark' || (!current && window.matchMedia('(prefers-color-scheme: dark)').matches);
                var next = isDark ? 'light' : 'dark';
                root.setAttribute('data-theme', next);
                try { localStorage.setItem('theme', next); } catch (e) {}
            });

            // ---- Sticky nav shadow ----
            var nav = document.getElementById('siteNav');
            var onScroll = function () {
                if (window.scrollY > 24) { nav.classList.add('scrolled'); }
                else { nav.classList.remove('scrolled'); }
            };
            window.addEventListener('scroll', onScroll, { passive: true });
            onScroll();

            // ---- Mobile menu ----
            var navToggle = document.getElementById('navToggle');
            var mobileMenu = document.getElementById('mobileMenu');
            navToggle.addEventListener('click', function () {
                var open = mobileMenu.classList.toggle('open');
                navToggle.setAttribute('aria-expanded', String(open));
                navToggle.innerHTML = open ? '<i class="fas fa-xmark" aria-hidden="true"></i>' : '<i class="fas fa-bars" aria-hidden="true"></i>';
            });
            mobileMenu.querySelectorAll('a').forEach(function (a) {
                a.addEventListener('click', function () {
                    mobileMenu.classList.remove('open');
                    navToggle.setAttribute('aria-expanded', 'false');
                    navToggle.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
                });
            });

            // ---- Copy phone number ----
            document.querySelectorAll('.copy-btn').forEach(function (btn) {
                btn.addEventListener('click', function () {
                    var text = btn.getAttribute('data-copy');
                    var done = function () {
                        var existing = btn.querySelector('.copy-toast');
                        if (existing) existing.remove();
                        var toast = document.createElement('span');
                        toast.className = 'copy-toast';
                        toast.textContent = 'Copied!';
                        btn.appendChild(toast);
                        setTimeout(function () { toast.remove(); }, 1600);
                    };
                    if (navigator.clipboard && window.isSecureContext) {
                        navigator.clipboard.writeText(text).then(done).catch(done);
                    } else {
                        var ta = document.createElement('textarea');
                        ta.value = text;
                        ta.style.position = 'fixed';
                        ta.style.left = '-9999px';
                        document.body.appendChild(ta);
                        ta.select();
                        try { document.execCommand('copy'); } catch (e) {}
                        document.body.removeChild(ta);
                        done();
                    }
                });
            });

            // ---- Scroll reveal (IntersectionObserver, with guaranteed-visible fallback) ----
            var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (!prefersReducedMotion && 'IntersectionObserver' in window) {
                var revealEls = document.querySelectorAll('.reveal');
                revealEls.forEach(function (el) { el.classList.add('reveal-pending'); });

                var revealObserver = new IntersectionObserver(function (entries, obs) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            entry.target.classList.remove('reveal-pending');
                            entry.target.classList.add('reveal-in');
                            obs.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

                revealEls.forEach(function (el) { revealObserver.observe(el); });

                // Safety net: if anything is still pending after 4s (e.g. an
                // element never intersects due to a layout quirk), force it
                // visible rather than leaving content permanently hidden.
                setTimeout(function () {
                    document.querySelectorAll('.reveal-pending').forEach(function (el) {
                        el.classList.remove('reveal-pending');
                        el.classList.add('reveal-in');
                    });
                }, 4000);
            }

            // ---- Stat counters (respects reduced motion) ----
            var reduceMotion = prefersReducedMotion;
            var counters = document.querySelectorAll('.stat-number');
            if (counters.length) {
                var animate = function (el) {
                    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
                    var suffix = el.getAttribute('data-suffix') || '';
                    if (reduceMotion) { el.textContent = target + suffix; return; }
                    var start = null;
                    var duration = 1400;
                    var step = function (ts) {
                        if (!start) start = ts;
                        var progress = Math.min((ts - start) / duration, 1);
                        var eased = 1 - Math.pow(1 - progress, 3);
                        el.textContent = Math.floor(eased * target) + suffix;
                        if (progress < 1) { window.requestAnimationFrame(step); }
                        else { el.textContent = target + suffix; }
                    };
                    window.requestAnimationFrame(step);
                };
                var seen = new WeakSet();
                var observer = new IntersectionObserver(function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting && !seen.has(entry.target)) {
                            seen.add(entry.target);
                            animate(entry.target);
                        }
                    });
                }, { threshold: 0.6 });
                counters.forEach(function (el) { observer.observe(el); });
            }
        })();
    </script>
</body>
</html>
