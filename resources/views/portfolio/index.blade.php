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
    <title>Abdul Karim Taji - Senior Full Stack Developer</title>
    <meta name="title" content="Abdul Karim Taji - Senior Full Stack Developer">
    <meta name="description" content="Senior Full Stack Developer with 7+ years experience in AI-powered solutions, web applications, and scalable systems. Specialized in Node.js, React, Laravel, and modern web technologies. Based in Dubai, UAE.">
    <meta name="keywords" content="Full Stack Developer, Senior Developer, Node.js, React, Laravel, JavaScript, TypeScript, PHP, AI Solutions, Web Development, Dubai Developer, UAE, Backend Developer, Frontend Developer, API Development">
    <meta name="author" content="Abdul Karim Taji">
    <meta name="robots" content="index, follow">
    <meta name="language" content="English">
    <meta name="revisit-after" content="7 days">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:title" content="Abdul Karim Taji - Senior Full Stack Developer">
    <meta property="og:description" content="Senior Full Stack Developer with 7+ years experience in AI-powered solutions, web applications, and scalable systems. Specialized in Node.js, React, Laravel, and modern web technologies.">
    <meta property="og:image" content="https://i.ibb.co/HD2ykMXR/Whats-App-Image-2026-02-11-at-2-32-41-PM.jpg">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:site_name" content="Abdul Karim Taji Portfolio">
    <meta property="og:locale" content="en_US">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="{{ url()->current() }}">
    <meta property="twitter:title" content="Abdul Karim Taji - Senior Full Stack Developer">
    <meta property="twitter:description" content="Senior Full Stack Developer with 7+ years experience in AI-powered solutions, web applications, and scalable systems. Based in Dubai, UAE.">
    <meta property="twitter:image" content="https://i.ibb.co/HD2ykMXR/Whats-App-Image-2026-02-11-at-2-32-41-PM.jpg">
    <meta property="twitter:creator" content="@abdulkarimtaji">
    <meta property="twitter:site" content="@abdulkarimtaji">
    
    <!-- LinkedIn -->
    <meta property="linkedin:owner" content="Abdul Karim Taji">
    
    <!-- Additional SEO Meta Tags -->
    <meta name="theme-color" content="{{ $currentTheme['primary'] }}">
    <meta name="msapplication-TileColor" content="{{ $currentTheme['primary'] }}">
    <meta name="msapplication-TileImage" content="https://i.ibb.co/HD2ykMXR/Whats-App-Image-2026-02-11-at-2-32-41-PM.jpg">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="{{ url()->current() }}">
    
    <!-- Preconnect for performance -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://cdn.jsdelivr.net">
    <link rel="preconnect" href="https://cdnjs.cloudflare.com">
    
    <!-- DNS Prefetch -->
    <link rel="dns-prefetch" href="//fonts.googleapis.com">
    <link rel="dns-prefetch" href="//cdn.jsdelivr.net">
    <link rel="dns-prefetch" href="//cdnjs.cloudflare.com">
    <link rel="dns-prefetch" href="//unpkg.com">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@600;700;800;900&display=swap" rel="stylesheet">
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <style>
        :root {
            --primary: {{ $currentTheme['primary'] }};
            --dark: {{ $currentTheme['dark'] }};
            --light: {{ $currentTheme['light'] }};
            --emerald: {{ $currentTheme['emerald'] }};
            --accent: {{ $currentTheme['accent'] }};
            --forest: {{ $currentTheme['forest'] }};
            --secondary: {{ $currentTheme['secondary'] }};
            --tertiary: {{ $currentTheme['tertiary'] }};
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
            color: #1f2937;
            background: #ffffff;
            overflow-x: hidden;
        }

        /* Navigation - Enhanced */
        .navbar {
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            padding: 1.2rem 0;
            border-bottom: 2px solid transparent;
        }

        .navbar.scrolled {
            padding: 0.7rem 0;
            box-shadow: 0 8px 40px rgba(0, 0, 0, 0.1);
            border-bottom-color: var(--primary);
        }

        .navbar-brand {
            font-family: 'Poppins', sans-serif;
            font-weight: 800;
            font-size: 1.4rem;
            background: linear-gradient(135deg, var(--primary) 0%, var(--tertiary) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            position: relative;
            display: flex;
            align-items: center;
            gap: 0.8rem;
            letter-spacing: -0.5px;
        }

        .navbar-brand-image {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            border: 3px solid var(--primary);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
            object-fit: cover;
        }

        .navbar-brand::after {
            content: '✨';
            position: absolute;
            right: -25px;
            top: -5px;
            font-size: 1rem;
            animation: sparkle 2s ease-in-out infinite;
        }

        @keyframes sparkle {
            0%, 100% { opacity: 1; transform: scale(1) rotate(0deg); }
            50% { opacity: 0.5; transform: scale(1.2) rotate(180deg); }
        }

        .nav-link {
            font-weight: 600;
            color: #374151 !important;
            transition: all 0.3s ease;
            position: relative;
            margin: 0 0.7rem;
            padding: 0.6rem 1.2rem !important;
            border-radius: 12px;
        }

        .nav-link:hover {
            color: var(--primary) !important;
            background: var(--light);
            transform: translateY(-2px);
        }

        .nav-link::after {
            content: '';
            position: absolute;
            bottom: 5px;
            left: 50%;
            width: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--primary), var(--accent));
            transition: all 0.3s ease;
            transform: translateX(-50%);
            border-radius: 10px;
        }

        .nav-link:hover::after {
            width: 70%;
        }

        /* Hamburger Menu Styling */
        .navbar-toggler {
            border: 2px solid var(--primary);
            border-radius: 8px;
            padding: 0.4rem 0.6rem;
            transition: all 0.3s ease;
        }

        .navbar-toggler:hover {
            background: var(--light);
            border-color: var(--dark);
            transform: scale(1.05);
        }

        .navbar-toggler:focus {
            box-shadow: 0 0 0 0.2rem rgba(0, 0, 0, 0.1);
        }

        .navbar-toggler-icon {
            background-image: none;
            width: 24px;
            height: 18px;
            position: relative;
            background: var(--primary);
            height: 3px;
            border-radius: 2px;
            top: 50%;
            transform: translateY(-50%);
            transition: all 0.3s ease;
        }

        .navbar-toggler-icon::before,
        .navbar-toggler-icon::after {
            content: '';
            position: absolute;
            left: 0;
            width: 100%;
            height: 3px;
            background: var(--primary);
            border-radius: 2px;
            transition: all 0.3s ease;
        }

        .navbar-toggler-icon::before {
            top: -7px;
        }

        .navbar-toggler-icon::after {
            top: 7px;
        }

        /* Hamburger transforms into minus sign (-) when menu is open */
        .navbar-toggler[aria-expanded="true"] .navbar-toggler-icon {
            background: var(--primary);
        }

        .navbar-toggler[aria-expanded="true"] .navbar-toggler-icon::before {
            transform: rotate(0deg);
            top: 0;
            opacity: 0;
        }

        .navbar-toggler[aria-expanded="true"] .navbar-toggler-icon::after {
            transform: rotate(0deg);
            top: 0;
            opacity: 0;
        }

        /* Hero Section - Spectacular */
        .hero {
            background: linear-gradient(135deg, var(--forest) 0%, var(--emerald) 50%, var(--primary) 100%);
            color: white;
            padding: 200px 0 140px;
            position: relative;
            overflow: hidden;
        }

        /* Animated Background */
        .hero::before {
            content: '';
            position: absolute;
            width: 200%;
            height: 200%;
            top: -50%;
            left: -50%;
            background:
                radial-gradient(circle at 20% 50%, rgba(255,255,255,0.08) 1px, transparent 1px),
                radial-gradient(circle at 80% 80%, rgba(255,255,255,0.08) 1px, transparent 1px);
            background-size: 50px 50px;
            animation: moveBackground 90s linear infinite;
        }

        @keyframes moveBackground {
            0% { transform: translate(0, 0) rotate(0deg); }
            100% { transform: translate(50px, 50px) rotate(360deg); }
        }

        /* Glowing orbs */
        .hero::after {
            content: '';
            position: absolute;
            width: 500px;
            height: 500px;
            background: radial-gradient(circle, var(--accent) 0%, transparent 70%);
            border-radius: 50%;
            top: -200px;
            right: -200px;
            opacity: 0.3;
            filter: blur(80px);
            animation: float 20s ease-in-out infinite;
        }

        .hero-content {
            position: relative;
            z-index: 2;
        }

        /* Profile Image - Premium */
        .profile-image-container {
            position: relative;
            width: 280px;
            height: 280px;
            margin: 0 auto 2.5rem;
        }

        .profile-image {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
            border: 10px solid rgba(255, 255, 255, 0.2);
            box-shadow:
                0 30px 80px rgba(0, 0, 0, 0.4),
                0 0 0 1px rgba(255, 255, 255, 0.1),
                inset 0 0 0 1px rgba(255, 255, 255, 0.1);
            animation: float 6s ease-in-out infinite;
            position: relative;
            z-index: 3;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-25px) scale(1.02); }
        }

        /* Multi-layer glow effect */
        .profile-image-container::before {
            content: '';
            position: absolute;
            top: -15px;
            left: -15px;
            right: -15px;
            bottom: -15px;
            background: linear-gradient(45deg,
                var(--accent),
                var(--secondary),
                var(--tertiary),
                var(--primary),
                var(--accent));
            border-radius: 50%;
            opacity: 0.6;
            filter: blur(25px);
            animation: rotateBg 10s linear infinite;
            z-index: 1;
        }

        .profile-image-container::after {
            content: '';
            position: absolute;
            top: -25px;
            left: -25px;
            right: -25px;
            bottom: -25px;
            background: linear-gradient(-45deg,
                var(--primary),
                var(--accent),
                var(--tertiary),
                var(--secondary));
            border-radius: 50%;
            opacity: 0.3;
            filter: blur(40px);
            animation: rotateBg 15s linear infinite reverse;
            z-index: 0;
        }

        @keyframes rotateBg {
            0% { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(180deg) scale(1.1); }
            100% { transform: rotate(360deg) scale(1); }
        }

        .hero h1 {
            font-family: 'Poppins', sans-serif;
            font-size: 4.5rem;
            font-weight: 900;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            background: linear-gradient(to right, #ffffff, var(--light), #ffffff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            letter-spacing: -2px;
        }

        .hero .subtitle {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 1.2rem;
            color: var(--accent);
            text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
        }

        .hero .lead {
            font-size: 1.3rem;
            font-weight: 400;
            margin-bottom: 2rem;
            opacity: 0.95;
            line-height: 1.8;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
        }

        .contact-info {
            display: flex;
            flex-wrap: wrap;
            gap: 1.5rem;
            margin-top: 2.5rem;
            justify-content: center;
        }

        .contact-item {
            display: flex;
            align-items: center;
            gap: 0.8rem;
            color: rgba(255, 255, 255, 0.95);
            background: rgba(255, 255, 255, 0.12);
            padding: 1rem 1.8rem;
            border-radius: 50px;
            backdrop-filter: blur(15px);
            border: 2px solid rgba(255, 255, 255, 0.25);
            transition: all 0.3s ease;
            font-weight: 500;
        }

        .contact-item:hover {
            background: rgba(255, 255, 255, 0.25);
            transform: translateY(-5px) scale(1.05);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
            border-color: rgba(255, 255, 255, 0.4);
        }

        .phone-copy {
            cursor: pointer;
            position: relative;
        }

        .phone-copy:hover {
            background: rgba(255, 255, 255, 0.3) !important;
        }

        .phone-copy:active {
            transform: translateY(-3px) scale(1.02);
        }

        .copy-feedback {
            position: absolute;
            top: -40px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            white-space: nowrap;
            opacity: 0;
            animation: copyFeedback 2s ease;
            pointer-events: none;
        }

        @keyframes copyFeedback {
            0% { opacity: 0; transform: translateX(-50%) translateY(10px); }
            20% { opacity: 1; transform: translateX(-50%) translateY(0px); }
            80% { opacity: 1; transform: translateX(-50%) translateY(0px); }
            100% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
        }

        .contact-item i {
            color: var(--accent);
            font-size: 1.3rem;
        }

        .contact-item a {
            color: white;
            text-decoration: none;
        }

        .contact-link {
            position: relative;
            z-index: 2;
            padding: 0.2rem 0.5rem;
            border-radius: 8px;
            transition: all 0.3s ease;
        }

        .contact-link:hover {
            background: rgba(255, 255, 255, 0.2);
            color: white !important;
            text-decoration: none !important;
        }

        /* Floating Decorative Shapes */
        .floating-shapes {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: 1;
            overflow: hidden;
        }

        .shape {
            position: absolute;
            opacity: 0.12;
        }

        .shape-1 {
            width: 400px;
            height: 400px;
            background: linear-gradient(135deg, var(--accent), transparent);
            border-radius: 50%;
            top: -150px;
            right: -150px;
            animation: pulse 10s ease-in-out infinite;
        }

        .shape-2 {
            width: 250px;
            height: 250px;
            background: linear-gradient(135deg, var(--secondary), transparent);
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
            bottom: -80px;
            left: -80px;
            animation: pulse 8s ease-in-out infinite;
        }

        .shape-3 {
            width: 180px;
            height: 180px;
            background: linear-gradient(135deg, var(--tertiary), transparent);
            border-radius: 50%;
            top: 50%;
            left: 10%;
            animation: pulse 12s ease-in-out infinite;
        }

        @keyframes pulse {
            0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.12; }
            50% { transform: scale(1.15) rotate(180deg); opacity: 0.18; }
        }

        /* Stats Section - Enhanced */
        .stats-section {
            background: linear-gradient(135deg, var(--primary) 0%, var(--dark) 100%);
            padding: 80px 0;
            color: white;
            position: relative;
            overflow: hidden;
        }

        .stats-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.1)"/></svg>');
            background-size: 30px 30px;
            opacity: 0.3;
        }

        .stat-item {
            text-align: center;
            padding: 2.5rem;
            position: relative;
            z-index: 2;
        }

        .stat-number {
            font-family: 'Poppins', sans-serif;
            font-size: 3.5rem;
            font-weight: 900;
            display: block;
            margin-bottom: 0.5rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }

        .stat-label {
            font-size: 1.2rem;
            opacity: 0.95;
            font-weight: 600;
        }

        .stat-icon {
            font-size: 2rem;
            margin-bottom: 1rem;
            opacity: 0.8;
        }

        /* Skills Section - Premium */
        .skills {
            padding: 120px 0;
            background: linear-gradient(180deg, #ffffff 0%, #f9fafb 100%);
            position: relative;
        }

        .section-title {
            text-align: center;
            margin-bottom: 6rem;
        }

        .section-title h2 {
            font-family: 'Poppins', sans-serif;
            font-size: 3.5rem;
            font-weight: 900;
            color: var(--forest);
            margin-bottom: 1.5rem;
            position: relative;
            display: inline-block;
            letter-spacing: -1px;
        }

        .section-title h2::before {
            content: '';
            position: absolute;
            bottom: -20px;
            left: 50%;
            transform: translateX(-50%);
            width: 120px;
            height: 6px;
            background: linear-gradient(90deg, var(--primary), var(--accent));
            border-radius: 10px;
        }

        .section-title h2::after {
            content: '';
            position: absolute;
            bottom: -28px;
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
            height: 6px;
            background: linear-gradient(90deg, var(--secondary), var(--tertiary));
            border-radius: 10px;
        }

        .section-title p {
            font-size: 1.3rem;
            color: #6b7280;
            margin-top: 2.5rem;
            font-weight: 500;
        }

        .skill-category {
            background: white;
            border-radius: 25px;
            padding: 3rem;
            margin-bottom: 0.5rem;
            border: 3px solid rgba(0, 0, 0, 0.05);
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
            height: 100%;
            display: flex;
            flex-direction: column;
            min-height: 280px;
        }

        .skill-category::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 8px;
            background: linear-gradient(90deg, var(--primary), var(--accent), var(--tertiary));
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.5s ease;
        }

        .skill-category::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, var(--light) 0%, transparent 100%);
            opacity: 0;
            transition: opacity 0.5s ease;
        }

        .skill-category:hover {
            transform: translateY(-15px) scale(1.02);
            box-shadow: 0 30px 80px rgba(0, 0, 0, 0.12);
            border-color: var(--primary);
        }

        .skill-category:hover::before {
            transform: scaleX(1);
        }

        .skill-category:hover::after {
            opacity: 1;
        }

        .skill-category h4 {
            color: var(--emerald);
            font-weight: 800;
            margin-bottom: 2rem;
            font-size: 1.5rem;
            display: flex;
            align-items: center;
            gap: 0.7rem;
            position: relative;
            z-index: 2;
        }

        .skill-category h4 i {
            font-size: 1.8rem;
            color: var(--primary);
        }

        .skill-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.8rem;
            position: relative;
            z-index: 2;
            flex: 1;
            align-content: flex-start;
        }

        .skill-tag {
            background: linear-gradient(135deg, var(--primary) 0%, var(--dark) 100%);
            color: white;
            padding: 0.7rem 1.4rem;
            border-radius: 30px;
            font-size: 0.95rem;
            font-weight: 700;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
            transition: all 0.3s ease;
            cursor: default;
        }

        .skill-tag:hover {
            transform: translateY(-5px) scale(1.08);
            box-shadow: 0 12px 35px rgba(0, 0, 0, 0.25);
            background: linear-gradient(135deg, var(--accent), var(--secondary));
        }

        /* Projects Section - Gallery Style */
        .projects {
            padding: 120px 0;
            background: linear-gradient(180deg, #f9fafb 0%, #ffffff 50%, #f9fafb 100%);
        }

        .project-card {
            background: white;
            border-radius: 30px;
            overflow: hidden;
            margin-bottom: 3rem;
            box-shadow: 0 15px 50px rgba(0, 0, 0, 0.08);
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            border: 2px solid rgba(0, 0, 0, 0.05);
            position: relative;
            height: 100%;
            display: flex;
            flex-direction: column;
        }

        .project-card:hover {
            transform: translateY(-20px) scale(1.02);
            box-shadow: 0 40px 90px rgba(0, 0, 0, 0.15);
            border-color: var(--primary);
        }

        .project-image-container {
            position: relative;
            width: 100%;
            height: 280px;
            overflow: hidden;
            background: linear-gradient(135deg, var(--light) 0%, var(--accent) 100%);
        }

        .project-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.7s ease;
            filter: brightness(0.95);
        }

        .project-card:hover .project-image {
            transform: scale(1.15) rotate(2deg);
            filter: brightness(1);
        }

        .project-image-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(to bottom,
                rgba(0, 0, 0, 0) 0%,
                rgba(0, 0, 0, 0.4) 60%,
                rgba(0, 0, 0, 0.8) 100%);
            opacity: 0;
            transition: opacity 0.4s ease;
            display: flex;
            align-items: flex-end;
            padding: 2rem;
        }

        .project-card:hover .project-image-overlay {
            opacity: 1;
        }

        .project-content {
            padding: 2.5rem;
            flex: 1;
            display: flex;
            flex-direction: column;
        }

        .project-card.featured {
            border: 4px solid var(--primary);
            background: linear-gradient(to bottom, white 0%, var(--light) 100%);
        }

        .project-card.featured .project-image-container {
            height: 340px;
        }

        .project-title {
            font-family: 'Poppins', sans-serif;
            font-size: 1.8rem;
            font-weight: 800;
            color: var(--forest);
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.7rem;
        }

        .project-category {
            background: linear-gradient(135deg, var(--accent), var(--secondary));
            color: white;
            padding: 0.5rem 1.2rem;
            border-radius: 25px;
            font-size: 0.9rem;
            font-weight: 800;
            display: inline-block;
            margin-bottom: 1.2rem;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
        }

        .project-description {
            color: #4b5563;
            margin-bottom: 2rem;
            line-height: 1.8;
            flex: 1;
            font-size: 1.05rem;
        }

        .project-link {
            color: white;
            text-decoration: none;
            font-weight: 700;
            display: inline-flex;
            align-items: center;
            gap: 0.7rem;
            transition: all 0.3s ease;
            padding: 1rem 2rem;
            background: linear-gradient(135deg, var(--primary), var(--dark));
            border-radius: 50px;
            align-self: flex-start;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .project-link:hover {
            background: linear-gradient(135deg, var(--accent), var(--secondary));
            transform: translateX(8px);
            box-shadow: 0 12px 35px rgba(0, 0, 0, 0.25);
        }

        .featured-badge {
            position: absolute;
            top: 1.5rem;
            right: 1.5rem;
            background: linear-gradient(135deg, #FFD700, #FFA500);
            color: #000;
            padding: 0.6rem 1.3rem;
            border-radius: 25px;
            font-size: 0.85rem;
            font-weight: 900;
            z-index: 10;
            box-shadow: 0 8px 25px rgba(255, 215, 0, 0.5);
            display: flex;
            align-items: center;
            gap: 0.4rem;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        /* Experience Section - Timeline */
        .experience {
            padding: 120px 0;
            background: linear-gradient(135deg, var(--light) 0%, rgba(255, 255, 255, 0.5) 100%);
        }

        .experience-item {
            background: white;
            border-radius: 25px;
            padding: 3rem;
            margin-bottom: 2.5rem;
            border-left: 8px solid var(--primary);
            transition: all 0.5s ease;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
            position: relative;
            overflow: hidden;
        }

        .experience-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 8px;
            height: 100%;
            background: linear-gradient(to bottom, var(--primary), var(--accent));
        }

        .experience-item::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background: linear-gradient(135deg, var(--light) 0%, transparent 100%);
            opacity: 0;
            transition: opacity 0.5s ease;
        }

        .experience-item:hover {
            transform: translateX(20px) scale(1.02);
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.12);
        }

        .experience-item:hover::after {
            opacity: 1;
        }

        .experience-title {
            font-family: 'Poppins', sans-serif;
            font-size: 1.7rem;
            font-weight: 800;
            color: var(--forest);
            margin-bottom: 0.8rem;
            position: relative;
            z-index: 2;
        }

        .experience-company {
            color: var(--primary);
            font-weight: 800;
            font-size: 1.2rem;
            margin-bottom: 0.8rem;
            position: relative;
            z-index: 2;
        }

        .experience-duration {
            color: #6b7280;
            font-size: 1rem;
            margin-bottom: 1.5rem;
            font-weight: 700;
            position: relative;
            z-index: 2;
        }

        .experience-item p {
            position: relative;
            z-index: 2;
        }

        /* Footer - Modern */
        .footer {
            background: linear-gradient(135deg, var(--forest) 0%, var(--emerald) 50%, var(--dark) 100%);
            color: white;
            padding: 100px 0 40px;
            position: relative;
            overflow: hidden;
        }

        .footer::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 8px;
            background: linear-gradient(90deg, var(--accent), var(--secondary), var(--tertiary), var(--accent));
            background-size: 200% 100%;
            animation: gradientShift 5s ease infinite;
        }

        @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }

        .footer h5 {
            color: var(--accent);
            margin-bottom: 2rem;
            font-weight: 800;
            font-size: 1.5rem;
            font-family: 'Poppins', sans-serif;
        }

        .footer-links {
            list-style: none;
            padding: 0;
        }

        .footer-links li {
            margin-bottom: 1rem;
        }

        .footer-links a, .footer-links li {
            color: rgba(255, 255, 255, 0.9);
            text-decoration: none;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.7rem;
            font-weight: 500;
        }

        .footer-links a:hover {
            color: var(--accent);
            transform: translateX(8px);
        }

        .social-links {
            display: flex;
            gap: 1.2rem;
            margin-top: 2rem;
        }

        .social-link {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, var(--primary), var(--tertiary));
            color: white;
            border-radius: 50%;
            text-decoration: none;
            transition: all 0.4s ease;
            font-size: 1.4rem;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        .social-link:hover {
            background: linear-gradient(135deg, var(--accent), var(--secondary));
            color: white;
            transform: translateY(-8px) rotate(360deg);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
        }

        /* Responsive */
        @media (max-width: 768px) {
            .navbar-brand {
                font-size: 1.1rem;
                gap: 0.5rem;
            }

            .navbar-brand-image {
                width: 35px;
                height: 35px;
            }

            .navbar-brand::after {
                right: -20px;
                font-size: 0.8rem;
            }

            .hero h1 {
                font-size: 2.8rem;
            }

            .hero .subtitle {
                font-size: 1.5rem;
            }

            .hero .lead {
                font-size: 1.1rem;
            }

            .contact-info {
                flex-direction: column;
                gap: 1rem;
            }

            .section-title h2 {
                font-size: 2.5rem;
            }

            .profile-image-container {
                width: 200px;
                height: 200px;
            }

            .project-image-container {
                height: 220px;
            }

            .stat-number {
                font-size: 2.5rem;
            }
        }

        /* Scroll Animations */
        html {
            scroll-behavior: smooth;
        }

        /* Loading Animation */
        .fade-in {
            opacity: 0;
            animation: fadeIn 1s ease forwards;
        }

        @keyframes fadeIn {
            to { opacity: 1; }
        }

        /* Gradient Text Helper */
        .gradient-text {
            background: linear-gradient(135deg, var(--primary) 0%, var(--tertiary) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        /* Equal Height Columns */
        .row-equal-height {
            display: flex;
            flex-wrap: wrap;
        }

        .row-equal-height > [class*='col-'] {
            display: flex;
            flex-direction: column;
        }

        /* About Section Special Styling */
        #about .lead {
            background: white;
            padding: 3rem;
            border-radius: 25px;
            box-shadow: 0 15px 50px rgba(0, 0, 0, 0.08);
            border: 3px solid var(--light);
            position: relative;
            overflow: hidden;
        }

        #about .lead::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 6px;
            background: linear-gradient(90deg, var(--primary), var(--accent), var(--tertiary));
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg fixed-top">
        <div class="container">
            <a class="navbar-brand" href="#home">
                <img src="https://i.ibb.co/wNPhM5GW/33.jpg?name=Abdul+Karim+Taji&size=90&background={{ substr($currentTheme['primary'], 1) }}&color=fff&bold=true&font-size=0.35" alt="Abdul Karim Taji" class="navbar-brand-image">
                {{-- Abdul Karim Taji --}}
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#home"><i class="fas fa-home me-1"></i>Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#about"><i class="fas fa-user me-1"></i>About</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#skills"><i class="fas fa-code me-1"></i>Skills</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#projects"><i class="fas fa-project-diagram me-1"></i>Projects</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#experience"><i class="fas fa-briefcase me-1"></i>Experience</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#contact"><i class="fas fa-envelope me-1"></i>Contact</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="hero">
        <div class="floating-shapes">
            <div class="shape shape-1"></div>
            <div class="shape shape-2"></div>
            <div class="shape shape-3"></div>
        </div>
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-12 hero-content text-center">
                    <div class="profile-image-container" data-aos="zoom-in" data-aos-duration="1000">
                        <img src="https://i.ibb.co/wNPhM5GW/33.jpg" alt="Abdul Karim Taji" class="profile-image">
                    </div>
                    <h1 data-aos="fade-up" data-aos-delay="200">Abdul Karim Taji</h1>
                    <p class="subtitle" data-aos="fade-up" data-aos-delay="300">Senior Full Stack Developer</p>
                    <p class="lead" data-aos="fade-up" data-aos-delay="400">Architecting AI-Powered Solutions & Scalable Web and Mobile Applications</p>
                    <p class="mb-4" data-aos="fade-up" data-aos-delay="500">7+ years transforming complex challenges into elegant digital experiences across fintech, travel, real estate, and AI-driven platforms</p>

                    <div class="contact-info" data-aos="fade-up" data-aos-delay="600">
                        <div class="contact-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Dubai, UAE</span>
                        </div>
                        <div class="contact-item phone-copy" onclick="copyToClipboard('+971505302566', this)" title="Click to copy phone number">
                            <i class="fas fa-phone"></i>
                            <span>+971 50 530 2566</span>
                        </div>
                        <div class="contact-item">
                            <i class="fas fa-envelope"></i>
                            <a href="mailto:abdulkarimtaji6@gmail.com" class="contact-link">Email Me</a>
                        </div>
                        <div class="contact-item">
                            <i class="fab fa-linkedin"></i>
                            <a href="https://www.linkedin.com/in/abdul-karim-taji-09a56821a" target="_blank" class="contact-link">LinkedIn</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
        <div class="container">
            <div class="row">
                <div class="col-md-3 col-6">
                    <div class="stat-item" data-aos="fade-up" data-aos-delay="100">
                        <div class="stat-icon"><i class="fas fa-award"></i></div>
                        <span class="stat-number">7+</span>
                        <span class="stat-label">Years Experience</span>
                    </div>
                </div>
                <div class="col-md-3 col-6">
                    <div class="stat-item" data-aos="fade-up" data-aos-delay="200">
                        <div class="stat-icon"><i class="fas fa-project-diagram"></i></div>
                        <span class="stat-number">100+</span>
                        <span class="stat-label">Projects Delivered</span>
                    </div>
                </div>
                <div class="col-md-3 col-6">
                    <div class="stat-item" data-aos="fade-up" data-aos-delay="300">
                        <div class="stat-icon"><i class="fas fa-building"></i></div>
                        <span class="stat-number">6</span>
                        <span class="stat-label">Companies</span>
                    </div>
                </div>
                <div class="col-md-3 col-6">
                    <div class="stat-item" data-aos="fade-up" data-aos-delay="400">
                        <div class="stat-icon"><i class="fas fa-code"></i></div>
                        <span class="stat-number">15+</span>
                        <span class="stat-label">Technologies</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="skills">
        <div class="container">
            <div class="section-title" data-aos="fade-up">
                <h2>About Me</h2>
                <p>Passionate about creating innovative digital solutions that make a difference</p>
            </div>
            <div class="row">
                <div class="col-lg-10 mx-auto">
                    <p class="lead text-center" data-aos="fade-up" data-aos-delay="100" style="font-size: 1.2rem; line-height: 2; color: #374151;">
                        Senior Full Stack Developer with <strong class="gradient-text">7+ years</strong> of proven experience building, scaling, and maintaining <strong class="gradient-text">large-scale web and AI-enabled applications</strong>. I possess a strong command of both backend and frontend technologies, API design/integration, and team mentorship. My expertise lies in working with cross-functional stakeholders to deliver <strong class="gradient-text">secure, high-performance solutions</strong> that ensure seamless integration across web, mobile, and AI systems.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="skills">
        <div class="container">
            <div class="section-title" data-aos="fade-up">
                <h2>Technical Expertise</h2>
                <p>Comprehensive mastery across the full development spectrum</p>
            </div>
            <div class="row row-equal-height">
                <div class="col-md-6 col-lg-4">
                    <div class="skill-category" data-aos="fade-up" data-aos-delay="100">
                        <h4><i class="fas fa-code"></i>Languages & Frameworks</h4>
                        <div class="skill-tags">
                            <span class="skill-tag">Node.js</span>
                            <span class="skill-tag">JavaScript</span>
                            <span class="skill-tag">TypeScript</span>
                            <span class="skill-tag">PHP</span>
                            <span class="skill-tag">Laravel</span>
                            <span class="skill-tag">NestJS</span>
                            <span class="skill-tag">Python</span>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-4">
                    <div class="skill-category" data-aos="fade-up" data-aos-delay="200">
                        <h4><i class="fas fa-desktop"></i>Frontend Technologies</h4>
                        <div class="skill-tags">
                            <span class="skill-tag">React.js</span>
                            <span class="skill-tag">Next.js</span>
                            <span class="skill-tag">Vue.js</span>
                            <span class="skill-tag">HTML5</span>
                            <span class="skill-tag">CSS3</span>
                            <span class="skill-tag">jQuery</span>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-4">
                    <div class="skill-category" data-aos="fade-up" data-aos-delay="300">
                        <h4><i class="fas fa-database"></i>Databases</h4>
                        <div class="skill-tags">
                            <span class="skill-tag">MySQL</span>
                            <span class="skill-tag">PostgreSQL</span>
                            <span class="skill-tag">MongoDB</span>
                            <span class="skill-tag">SQLite</span>
                            <span class="skill-tag">Firebase</span>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-4">
                    <div class="skill-category" data-aos="fade-up" data-aos-delay="100">
                        <h4><i class="fas fa-cloud"></i>Infrastructure & DevOps</h4>
                        <div class="skill-tags">
                            <span class="skill-tag">CI/CD</span>
                            <span class="skill-tag">AWS</span>
                            <span class="skill-tag">Git</span>
                            <span class="skill-tag">Docker</span>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-4">
                    <div class="skill-category" data-aos="fade-up" data-aos-delay="200">
                        <h4><i class="fas fa-cogs"></i>Technical Skills</h4>
                        <div class="skill-tags">
                            <span class="skill-tag">REST API</span>
                            <span class="skill-tag">SEO</span>
                            <span class="skill-tag">Performance</span>
                            <span class="skill-tag">Security</span>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-4">
                    <div class="skill-category" data-aos="fade-up" data-aos-delay="300">
                        <h4><i class="fas fa-users"></i>Leadership & Soft Skills</h4>
                        <div class="skill-tags">
                            <span class="skill-tag">Mentorship</span>
                            <span class="skill-tag">Code Review</span>
                            <span class="skill-tag">Agile/Scrum</span>
                            <span class="skill-tag">Project Management</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="projects">
        <div class="container">
            <div class="section-title" data-aos="fade-up">
                <h2>Featured Projects</h2>
                <p>A curated collection of impactful solutions delivered across industries</p>
            </div>

            <!-- Featured Projects -->
            <div class="row">
                @foreach($featuredProjects as $index => $project)
                <div class="col-lg-6 mt-2">
                    <div class="project-card featured" data-aos="fade-up" data-aos-delay="{{ $index * 100 }}">
                        <div class="featured-badge">
                            <i class="fas fa-star"></i> Featured
                        </div>
                        <div class="project-image-container">
                            <img src="{{ $project->image }}" alt="{{ $project->name }}" class="project-image">
                            <div class="project-image-overlay"></div>
                        </div>
                        <div class="project-content">
                            <h3 class="project-title">{{ $project->name }}</h3>
                            <span class="project-category">{{ $project->category }}</span>
                            <p class="project-description">{{ $project->description }}</p>
                            @if($project->url !== '#')
                            <a href="{{ $project->url }}" class="project-link" target="_blank">
                                View Project <i class="fas fa-arrow-right"></i>
                            </a>
                            @else
                            <span class="text-muted"><i class="fas fa-mobile-alt me-2"></i>Mobile App - Contact for Demo</span>
                            @endif
                        </div>
                    </div>
                </div>
                @endforeach
            </div>

            <!-- Other Projects -->
            <div class="mt-5">
                <h3 class="text-center mb-5 gradient-text" style="font-family: 'Poppins', sans-serif; font-size: 3rem; font-weight: 900;" data-aos="fade-up">Additional Projects</h3>
                <div class="row">
                    @foreach($otherProjects as $index => $project)
                    <div class="col-lg-4 col-md-6">
                        <div class="project-card" data-aos="fade-up" data-aos-delay="{{ $index * 50 }}">
                            <div class="project-image-container">
                                <img src="{{ $project->image }}" alt="{{ $project->name }}" class="project-image">
                                <div class="project-image-overlay"></div>
                            </div>
                            <div class="project-content">
                                <h4 class="project-title">{{ $project->name }}</h4>
                                <span class="project-category">{{ $project->category }}</span>
                                <p class="project-description">{{ $project->description }}</p>
                                <a href="{{ $project->url }}" class="project-link" target="_blank">
                                    Visit Site <i class="fas fa-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    @endforeach
                </div>
            </div>
        </div>
    </section>

    <!-- Experience Section -->
    <section id="experience" class="experience">
        <div class="container">
            <div class="section-title" data-aos="fade-up">
                <h2>Professional Journey</h2>
                <p>A proven track record of excellence across industry-leading organizations</p>
            </div>
            <div class="row">
                <div class="col-lg-10 mx-auto">
                    <div class="experience-item" data-aos="fade-right" data-aos-delay="100">
                        <h3 class="experience-title">Senior Software Engineer – Full Stack</h3>
                        <div class="experience-company"><i class="fas fa-building me-2"></i>RAMA Technologies, Dubai</div>
                        <div class="experience-duration"><i class="fas fa-calendar-alt me-2"></i>May 2025 - Present</div>
                        <p>Development of web platforms for digital loan origination, credit assessment, and customer onboarding. Owned end-to-end full-stack delivery with primary responsibility for backend architecture and data integrity. Designed and implemented secure, scalable REST APIs integrating frontend systems, AI-driven credit/risk engines, and third-party financial services. Implemented access control, audit logging, and compliance-aligned backend logic for financial data handling.</p>
                    </div>

                    <div class="experience-item" data-aos="fade-right" data-aos-delay="200">
                        <h3 class="experience-title">Senior Software Engineer – Full Stack (AI Products)</h3>
                        <div class="experience-company"><i class="fas fa-building me-2"></i>Herogram, Dubai</div>
                        <div class="experience-duration"><i class="fas fa-calendar-alt me-2"></i>Jan 2024 - April 2025</div>
                        <p>Lead development on large-scale, AI-based web products responsible for full stack delivery with emphasis on backend architecture. Designed and implemented scalable RESTful APIs ensuring robust integration with frontend and AI components. Automated critical workflows and mentored junior developers.</p>
                    </div>

                    <div class="experience-item" data-aos="fade-right" data-aos-delay="300">
                        <h3 class="experience-title">Senior Full Stack Developer</h3>
                        <div class="experience-company"><i class="fas fa-building me-2"></i>Brainwave Technologies</div>
                        <div class="experience-duration"><i class="fas fa-calendar-alt me-2"></i>Dec 2022 - Oct 2023</div>
                        <p>Built and maintained large-scale applications with a full-stack focus, owned backend services and frontend integration. Created efficient REST APIs for mobile and web clients, enabling smooth cross-platform communication.</p>
                    </div>

                    <div class="experience-item" data-aos="fade-right" data-aos-delay="400">
                        <h3 class="experience-title">Senior Software Engineer – Backend</h3>
                        <div class="experience-company"><i class="fas fa-building me-2"></i>Tekrevol</div>
                        <div class="experience-duration"><i class="fas fa-calendar-alt me-2"></i>Mar 2021 - Dec 2022</div>
                        <p>Architected and maintained core server-side components for multiple projects in Agile/Scrum environments. Integrated backend services with frontend and mobile teams ensuring consistent API contracts.</p>
                    </div>

                    <div class="experience-item" data-aos="fade-right" data-aos-delay="500">
                        <h3 class="experience-title">Full Stack Web Developer</h3>
                        <div class="experience-company"><i class="fas fa-building me-2"></i>Abtach</div>
                        <div class="experience-duration"><i class="fas fa-calendar-alt me-2"></i>Jan 2018 - Dec 2020</div>
                        <p>Developed custom modules and integrated APIs into large-scale systems with emphasis on performance and security. Implemented data protection and security measures across all applications.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer id="contact" class="footer">
        <div class="container">
            <div class="row">
                <div class="col-lg-4 mb-5">
                    <h5>Abdul Karim Taji</h5>
                    <p>Senior Full Stack Developer specializing in AI-powered solutions and scalable web applications. Based in Dubai, UAE with 7+ years of professional experience transforming complex challenges into elegant digital experiences.</p>
                    <div class="social-links">
                        <a href="https://www.linkedin.com/in/abdul-karim-taji-09a56821a" class="social-link" target="_blank" title="LinkedIn">
                            <i class="fab fa-linkedin-in"></i>
                        </a>
                        <a href="mailto:abdulkarimtaji6@gmail.com" class="social-link" title="Email">
                            <i class="fas fa-envelope"></i>
                        </a>
                        <a href="tel:+971505302566" class="social-link" title="Phone">
                            <i class="fas fa-phone"></i>
                        </a>
                        <a href="https://github.com" class="social-link" target="_blank" title="GitHub">
                            <i class="fab fa-github"></i>
                        </a>
                    </div>
                </div>
                <div class="col-lg-4 mb-5">
                    <h5>Quick Navigation</h5>
                    <ul class="footer-links">
                        <li><a href="#home"><i class="fas fa-home me-2"></i>Home</a></li>
                        <li><a href="#about"><i class="fas fa-user me-2"></i>About</a></li>
                        <li><a href="#skills"><i class="fas fa-code me-2"></i>Skills</a></li>
                        <li><a href="#projects"><i class="fas fa-project-diagram me-2"></i>Projects</a></li>
                        <li><a href="#experience"><i class="fas fa-briefcase me-2"></i>Experience</a></li>
                    </ul>
                </div>
                <div class="col-lg-4 mb-5">
                    <h5>Get In Touch</h5>
                    <ul class="footer-links">
                        <li><i class="fas fa-map-marker-alt me-2"></i>Jumeirah Lake Towers, Dubai, UAE</li>
                        <li><i class="fas fa-phone me-2"></i>+971 50 530 2566</li>
                        <li><i class="fas fa-envelope me-2"></i>abdulkarimtaji6@gmail.com</li>
                        {{-- <li><i class="fas fa-id-card me-2"></i>Own Visa • Available Immediately</li> --}}
                    </ul>
                </div>
            </div>
            <hr style="border-color: rgba(255,255,255,0.2); margin: 3rem 0 2rem;">
            <div class="text-center">
                <p>&copy; {{ date('Y') }} Abdul Karim Taji • Crafted with <i class="fas fa-heart" style="color: #FFD700;"></i> and <i class="fas fa-code" style="color: #FFD700;"></i> • Current Theme: <strong style="color: var(--accent);">{{ ucfirst($themeColor) }}</strong></p>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script>
        // Initialize AOS
        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            once: true,
            mirror: false,
            offset: 100
        });

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        navbarCollapse.classList.remove('show');
                    }
                }
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.pageYOffset > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Counter animation
        const animateValue = (element, start, end, duration) => {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const value = Math.floor(progress * (end - start) + start);
                const text = element.textContent;
                element.textContent = value + (text.includes('+') ? '+' : '');
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        };

        // Stats counter observer
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    statNumbers.forEach(stat => {
                        const text = stat.textContent;
                        const finalValue = parseInt(text);
                        animateValue(stat, 0, finalValue, 2000);
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            statsObserver.observe(statsSection);
        }

        // Loading animation
        window.addEventListener('load', function() {
            document.body.classList.add('fade-in');
        });

        // Copy to clipboard function
        function copyToClipboard(text, element) {
            // Try modern clipboard API first
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(text).then(function() {
                    showCopyFeedback(element, 'Phone number copied!');
                }).catch(function() {
                    fallbackCopyTextToClipboard(text, element);
                });
            } else {
                // Fallback for older browsers or non-secure contexts
                fallbackCopyTextToClipboard(text, element);
            }
        }

        // Fallback copy method
        function fallbackCopyTextToClipboard(text, element) {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.style.position = "fixed";
            textArea.style.left = "-999999px";
            textArea.style.top = "-999999px";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            try {
                const successful = document.execCommand('copy');
                if (successful) {
                    showCopyFeedback(element, 'Phone number copied!');
                } else {
                    showCopyFeedback(element, 'Copy failed');
                }
            } catch (err) {
                showCopyFeedback(element, 'Copy not supported');
            }

            document.body.removeChild(textArea);
        }

        // Show copy feedback
        function showCopyFeedback(element, message) {
            // Remove any existing feedback
            const existingFeedback = element.querySelector('.copy-feedback');
            if (existingFeedback) {
                existingFeedback.remove();
            }

            // Create and show new feedback
            const feedback = document.createElement('div');
            feedback.className = 'copy-feedback';
            feedback.textContent = message;
            element.appendChild(feedback);

            // Remove feedback after animation
            setTimeout(() => {
                if (feedback.parentNode) {
                    feedback.parentNode.removeChild(feedback);
                }
            }, 2000);
        }
    </script>
</body>
</html>
