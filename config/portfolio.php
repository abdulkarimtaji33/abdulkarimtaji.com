<?php

return [

    'companies' => [
        [
            'id' => 'rama',
            'name' => 'RAMA Technologies',
            'role' => 'Senior Software Engineer — Full Stack',
            'period' => 'May 2025 – Present',
            'years' => ['from' => 2025, 'to' => null],
            'blurb' => 'Digital loan origination and credit-assessment platforms — secure REST APIs integrating AI-driven risk engines, with audit logging and compliance-aligned backend logic.',
            'skills' => ['nodejs', 'typescript', 'javascript', 'php', 'laravel', 'nestjs', 'python', 'react', 'nextjs', 'vuejs', 'html5', 'css3', 'jquery', 'mysql', 'postgresql', 'mongodb', 'sqlite', 'firebase', 'cicd', 'aws', 'git', 'docker', 'rest-api', 'seo', 'performance', 'security', 'mentorship', 'code-review', 'agile', 'project-management'],
            'accent' => 'gold',
            'current' => true,
        ],
        [
            'id' => 'herogram',
            'name' => 'Herogram',
            'role' => 'Senior Software Engineer — Full Stack (AI Products)',
            'period' => 'Jan 2024 – Apr 2025',
            'years' => ['from' => 2024, 'to' => 2025],
            'blurb' => 'Led development on large-scale AI-based web products, designing scalable RESTful APIs that integrate frontend and AI components.',
            'skills' => ['nodejs', 'typescript', 'javascript', 'php', 'laravel', 'nestjs', 'python', 'react', 'nextjs', 'vuejs', 'html5', 'css3', 'jquery', 'mysql', 'postgresql', 'mongodb', 'sqlite', 'firebase', 'cicd', 'aws', 'git', 'docker', 'rest-api', 'seo', 'performance', 'security', 'mentorship', 'code-review', 'agile', 'project-management'],
            'accent' => 'teal',
            'current' => false,
        ],
        [
            'id' => 'brainwave',
            'name' => 'Brainwave Technologies',
            'role' => 'Senior Full Stack Developer',
            'period' => 'Dec 2022 – Oct 2023',
            'years' => ['from' => 2022, 'to' => 2023],
            'blurb' => 'Built and maintained large-scale applications end to end, creating efficient REST APIs for smooth cross-platform mobile and web communication.',
            'skills' => ['nodejs', 'typescript', 'javascript', 'php', 'laravel', 'nestjs', 'python', 'react', 'nextjs', 'vuejs', 'html5', 'css3', 'jquery', 'mysql', 'postgresql', 'mongodb', 'sqlite', 'firebase', 'cicd', 'aws', 'git', 'docker', 'rest-api', 'seo', 'performance', 'security', 'mentorship', 'code-review', 'agile', 'project-management'],
            'accent' => 'teal',
            'current' => false,
        ],
        [
            'id' => 'tekrevol',
            'name' => 'Tekrevol',
            'role' => 'Senior Software Engineer — Backend',
            'period' => 'Mar 2021 – Dec 2022',
            'years' => ['from' => 2021, 'to' => 2022],
            'blurb' => 'Architected core server-side components across multiple Agile/Scrum projects, keeping API contracts consistent between backend, frontend and mobile teams.',
            'skills' => ['nodejs', 'typescript', 'javascript', 'php', 'laravel', 'nestjs', 'python', 'react', 'nextjs', 'vuejs', 'html5', 'css3', 'jquery', 'mysql', 'postgresql', 'mongodb', 'sqlite', 'firebase', 'cicd', 'aws', 'git', 'docker', 'rest-api', 'seo', 'performance', 'security', 'mentorship', 'code-review', 'agile', 'project-management'],
            'accent' => 'teal',
            'current' => false,
        ],
        [
            'id' => 'abtach',
            'name' => 'Abtach',
            'role' => 'Full Stack Web Developer',
            'period' => 'Jan 2018 – Dec 2020',
            'years' => ['from' => 2018, 'to' => 2020],
            'blurb' => 'Developed custom modules and integrated APIs into large-scale systems, with a focus on performance, security audits and data protection.',
            'skills' => ['nodejs', 'typescript', 'javascript', 'php', 'laravel', 'nestjs', 'python', 'react', 'nextjs', 'vuejs', 'html5', 'css3', 'jquery', 'mysql', 'postgresql', 'mongodb', 'sqlite', 'firebase', 'cicd', 'aws', 'git', 'docker', 'rest-api', 'seo', 'performance', 'security', 'mentorship', 'code-review', 'agile', 'project-management'],
            'accent' => 'teal',
            'current' => false,
        ],
    ],

    // Mirrors the "Technical Expertise" section on the homepage exactly —
    // same skills, same six category groups (renamed to short group ids the
    // games use: db, backend, frontend, devops, craft, leadership).
    'skills' => [
        // Languages & Frameworks -> backend
        ['id' => 'nodejs', 'label' => 'Node.js', 'group' => 'backend', 'fact' => 'Node.js — APIs powering AI-driven credit-risk engines at RAMA.'],
        ['id' => 'typescript', 'label' => 'TypeScript', 'group' => 'backend', 'fact' => 'TypeScript — type-safe code across backend and frontend.'],
        ['id' => 'javascript', 'label' => 'JavaScript', 'group' => 'backend', 'fact' => 'JavaScript — the common thread across every stack touched.'],
        ['id' => 'php', 'label' => 'PHP', 'group' => 'backend', 'fact' => 'PHP — 7+ years building and securing large-scale systems.'],
        ['id' => 'laravel', 'label' => 'Laravel', 'group' => 'backend', 'fact' => 'Laravel — backend architecture across fintech and travel platforms.'],
        ['id' => 'nestjs', 'label' => 'NestJS', 'group' => 'backend', 'fact' => 'NestJS — structured, scalable API design.'],
        ['id' => 'python', 'label' => 'Python', 'group' => 'backend', 'fact' => 'Python — automation and AI-adjacent tooling.'],

        // Frontend Technologies -> frontend
        ['id' => 'react', 'label' => 'React.js', 'group' => 'frontend', 'fact' => 'React.js — interfaces for AI-based web products.'],
        ['id' => 'nextjs', 'label' => 'Next.js', 'group' => 'frontend', 'fact' => 'Next.js — modern, fast-loading frontends.'],
        ['id' => 'vuejs', 'label' => 'Vue.js', 'group' => 'frontend', 'fact' => 'Vue.js — reactive UI for internal tools and dashboards.'],
        ['id' => 'html5', 'label' => 'HTML5', 'group' => 'frontend', 'fact' => 'HTML5 — semantic, accessible markup as the foundation.'],
        ['id' => 'css3', 'label' => 'CSS3', 'group' => 'frontend', 'fact' => 'CSS3 — polished, responsive interfaces.'],
        ['id' => 'jquery', 'label' => 'jQuery', 'group' => 'frontend', 'fact' => 'jQuery — fast, reliable DOM work on legacy and hybrid stacks.'],

        // Databases -> db
        ['id' => 'mysql', 'label' => 'MySQL', 'group' => 'db', 'fact' => 'MySQL — relational data at production scale.'],
        ['id' => 'postgresql', 'label' => 'PostgreSQL', 'group' => 'db', 'fact' => 'PostgreSQL — reliable storage for financial data.'],
        ['id' => 'mongodb', 'label' => 'MongoDB', 'group' => 'db', 'fact' => 'MongoDB — flexible schema for fast-moving products.'],
        ['id' => 'sqlite', 'label' => 'SQLite', 'group' => 'db', 'fact' => 'SQLite — lightweight storage for embedded and local use.'],
        ['id' => 'firebase', 'label' => 'Firebase', 'group' => 'db', 'fact' => 'Firebase — realtime data and backend-as-a-service.'],

        // Infrastructure & DevOps -> devops
        ['id' => 'cicd', 'label' => 'CI/CD', 'group' => 'devops', 'fact' => 'CI/CD pipelines — shipping safely and often.'],
        ['id' => 'aws', 'label' => 'AWS', 'group' => 'devops', 'fact' => 'AWS — cloud infrastructure for production systems.'],
        ['id' => 'git', 'label' => 'Git', 'group' => 'devops', 'fact' => 'Git — disciplined version control across every team.'],
        ['id' => 'docker', 'label' => 'Docker', 'group' => 'devops', 'fact' => 'Docker — consistent, portable environments.'],

        // Craft -> craft
        ['id' => 'rest-api', 'label' => 'REST API Design', 'group' => 'craft', 'fact' => 'REST API design — consistent contracts across mobile, web and AI systems.'],
        ['id' => 'seo', 'label' => 'SEO', 'group' => 'craft', 'fact' => 'SEO — technical optimization for real organic visibility.'],
        ['id' => 'performance', 'label' => 'Performance', 'group' => 'craft', 'fact' => 'Performance tuning — systems that hold up under real load.'],
        ['id' => 'security', 'label' => 'Security', 'group' => 'craft', 'fact' => 'Security audits — access control and compliance-aligned backend logic.'],

        // Leadership & Soft Skills -> leadership
        ['id' => 'mentorship', 'label' => 'Mentorship', 'group' => 'leadership', 'fact' => 'Mentorship — training and elevating junior developers.'],
        ['id' => 'code-review', 'label' => 'Code Review', 'group' => 'leadership', 'fact' => 'Code review — raising quality across every pull request.'],
        ['id' => 'agile', 'label' => 'Agile/Scrum', 'group' => 'leadership', 'fact' => 'Agile/Scrum — delivery across cross-functional teams.'],
        ['id' => 'project-management', 'label' => 'Project Management', 'group' => 'leadership', 'fact' => 'Project management — keeping delivery on time and on scope.'],
    ],

];
