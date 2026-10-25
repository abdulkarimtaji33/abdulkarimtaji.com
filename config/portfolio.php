<?php

// Single source of truth for everything on the portfolio page that is not a
// database project. The Blade sections only read from here.

return [

    'profile' => [
        'name' => 'Abdul Karim Taji',
        'role' => 'Senior Full-Stack Engineer',
        'location' => 'Dubai, UAE',
        'address' => 'Jumeirah Lake Towers, Dubai, UAE',
        'timezone' => 'Asia/Dubai',
        'email' => 'abdulkarimtaji33@gmail.com',
        // First entry is the primary number.
        'phones' => [
            ['label' => 'Primary', 'number' => '+923390026555', 'display' => '+92 339 0026555'],
            ['label' => 'UAE', 'number' => '+971505302566', 'display' => '+971 50 530 2566'],
        ],
        'linkedin' => 'https://www.linkedin.com/in/abdul-karim-taji-09a56821a',
        'portrait' => 'images/profile.jpg',
        'headline' => ['I build software', 'that ships', 'and scales.'],
        'lead' => 'Senior full-stack engineer with 7+ years shipping fintech, Ai and e-commerce platforms end to end, from backend architecture to the interface people actually touch.',
        'availability' => 'Available for select engagements',
        'about_lead' => 'Specialising in Ai-driven platforms and scalable systems for finance, travel and real estate.',
        'about' => [
            'I am a senior full-stack engineer with **7+ years** of experience building, scaling and maintaining large web and Ai-enabled applications. My work spans backend and frontend, API design and integration, and mentoring the engineers around me.',
            'I work closely with cross-functional teams to deliver **secure, high-performance solutions** that hold up under real financial and operational data, not just demos. That means seamless integration across web, mobile and Ai systems, and code the next engineer can actually maintain.',
        ],
        'contact_lead' => 'I am open to select senior full-stack and Ai-platform engagements. Tell me what you are building and let us make it real.',
    ],

    // Order of the stacked featured cards; anything not listed goes last.
    'featured_order' => ['Pulse Ai', 'Lunchbox Ai', 'BBrain', 'Socialposter', 'Upwork Automation'],

    'stats' => [
        ['value' => 7, 'suffix' => '+', 'label' => 'Years experience'],
        ['value' => 100, 'suffix' => '+', 'label' => 'Projects delivered'],
        ['value' => 6, 'suffix' => '', 'label' => 'Companies'],
        ['value' => 15, 'suffix' => '+', 'label' => 'Technologies'],
    ],

    'skill_groups' => [
        ['id' => 'backend', 'title' => 'Languages & Frameworks', 'icon' => 'fa-code', 'summary' => 'Server-side engineering with typed, structured, testable code.', 'size' => 'lg'],
        ['id' => 'frontend', 'title' => 'Frontend', 'icon' => 'fa-display', 'summary' => 'Fast, accessible, responsive interfaces.', 'size' => 'lg'],
        ['id' => 'db', 'title' => 'Databases', 'icon' => 'fa-database', 'summary' => 'Relational and document stores at production scale.', 'size' => 'sm'],
        ['id' => 'devops', 'title' => 'Infrastructure & DevOps', 'icon' => 'fa-cloud', 'summary' => 'Pipelines and environments that ship safely.', 'size' => 'sm'],
        ['id' => 'craft', 'title' => 'Craft', 'icon' => 'fa-gears', 'summary' => 'The details that make systems hold up.', 'size' => 'sm'],
        ['id' => 'leadership', 'title' => 'Leadership', 'icon' => 'fa-users', 'summary' => 'Raising the bar for the whole team.', 'size' => 'sm'],
    ],

    'marquee' => [
        ['Node.js', 'TypeScript', 'React', 'Next.js', 'Laravel', 'NestJS', 'PHP', 'Python', 'Vue.js'],
        ['PostgreSQL', 'MySQL', 'MongoDB', 'Firebase', 'AWS', 'Docker', 'CI/CD', 'REST APIs', 'Ai Integrations'],
    ],

    // "tags" are highlights taken from each role's own description.
    'companies' => [
        [
            'id' => 'rama',
            'name' => 'RAMA Technologies',
            'place' => 'Dubai',
            'role' => 'Senior Software Engineer, Full Stack',
            'period' => 'May 2025 – Present',
            'current' => true,
            'blurb' => 'Web platforms for digital loan origination, credit assessment and customer onboarding. Owned end-to-end delivery with primary responsibility for backend architecture and data integrity: secure, scalable REST APIs integrating Ai-driven credit and risk engines and third-party financial services, plus access control, audit logging and compliance-aligned backend logic.',
            'tags' => ['REST API Design', 'Security', 'Ai risk engines', 'Audit logging'],
        ],
        [
            'id' => 'herogram',
            'name' => 'Herogram',
            'place' => 'Dubai',
            'role' => 'Senior Software Engineer, Full Stack (Ai Products)',
            'period' => 'Jan 2024 – Apr 2025',
            'current' => false,
            'blurb' => 'Led development of large-scale Ai-based web products with an emphasis on backend architecture. Designed scalable RESTful APIs integrating frontend and Ai components, automated critical workflows and mentored junior developers.',
            'tags' => ['REST API Design', 'Ai products', 'Workflow automation', 'Mentorship'],
        ],
        [
            'id' => 'brainwave',
            'name' => 'Brainwave Technologies',
            'place' => '',
            'role' => 'Senior Full Stack Developer',
            'period' => 'Dec 2022 – Oct 2023',
            'current' => false,
            'blurb' => 'Built and maintained large-scale applications with a full-stack focus, owning backend services and frontend integration. Created efficient REST APIs for mobile and web clients for smooth cross-platform communication.',
            'tags' => ['REST API Design', 'Mobile + web APIs'],
        ],
        [
            'id' => 'tekrevol',
            'name' => 'Tekrevol',
            'place' => '',
            'role' => 'Senior Software Engineer, Backend',
            'period' => 'Mar 2021 – Dec 2022',
            'current' => false,
            'blurb' => 'Architected and maintained core server-side components for multiple projects in Agile/Scrum environments, integrating backend services with frontend and mobile teams to keep API contracts consistent.',
            'tags' => ['Agile/Scrum', 'API contracts', 'Backend architecture'],
        ],
        [
            'id' => 'abtach',
            'name' => 'Abtach',
            'place' => '',
            'role' => 'Full Stack Web Developer',
            'period' => 'Jan 2018 – Dec 2020',
            'current' => false,
            'blurb' => 'Developed custom modules and integrated APIs into large-scale systems with an emphasis on performance and security, including data protection and security audits across applications.',
            'tags' => ['Performance', 'Security audits', 'Data protection'],
        ],
    ],

    'skills' => [
        // backend
        ['id' => 'nodejs', 'label' => 'Node.js', 'group' => 'backend', 'fact' => 'APIs powering Ai-driven credit-risk engines at RAMA.'],
        ['id' => 'typescript', 'label' => 'TypeScript', 'group' => 'backend', 'fact' => 'Type-safe code across backend and frontend.'],
        ['id' => 'javascript', 'label' => 'JavaScript', 'group' => 'backend', 'fact' => 'The common thread across every stack touched.'],
        ['id' => 'php', 'label' => 'PHP', 'group' => 'backend', 'fact' => '7+ years building and securing large-scale systems.'],
        ['id' => 'laravel', 'label' => 'Laravel', 'group' => 'backend', 'fact' => 'Backend architecture across fintech and travel platforms.'],
        ['id' => 'nestjs', 'label' => 'NestJS', 'group' => 'backend', 'fact' => 'Structured, scalable API design.'],
        ['id' => 'python', 'label' => 'Python', 'group' => 'backend', 'fact' => 'Automation and Ai-adjacent tooling.'],
        // frontend
        ['id' => 'react', 'label' => 'React.js', 'group' => 'frontend', 'fact' => 'Interfaces for Ai-based web products.'],
        ['id' => 'nextjs', 'label' => 'Next.js', 'group' => 'frontend', 'fact' => 'Modern, fast-loading frontends.'],
        ['id' => 'vuejs', 'label' => 'Vue.js', 'group' => 'frontend', 'fact' => 'Reactive UI for internal tools and dashboards.'],
        ['id' => 'html5', 'label' => 'HTML5', 'group' => 'frontend', 'fact' => 'Semantic, accessible markup as the foundation.'],
        ['id' => 'css3', 'label' => 'CSS3', 'group' => 'frontend', 'fact' => 'Polished, responsive interfaces.'],
        ['id' => 'jquery', 'label' => 'jQuery', 'group' => 'frontend', 'fact' => 'Fast, reliable DOM work on legacy and hybrid stacks.'],
        // db
        ['id' => 'mysql', 'label' => 'MySQL', 'group' => 'db', 'fact' => 'Relational data at production scale.'],
        ['id' => 'postgresql', 'label' => 'PostgreSQL', 'group' => 'db', 'fact' => 'Reliable storage for financial data.'],
        ['id' => 'mongodb', 'label' => 'MongoDB', 'group' => 'db', 'fact' => 'Flexible schema for fast-moving products.'],
        ['id' => 'sqlite', 'label' => 'SQLite', 'group' => 'db', 'fact' => 'Lightweight storage for embedded and local use.'],
        ['id' => 'firebase', 'label' => 'Firebase', 'group' => 'db', 'fact' => 'Realtime data and backend-as-a-service.'],
        // devops
        ['id' => 'cicd', 'label' => 'CI/CD', 'group' => 'devops', 'fact' => 'Pipelines that ship safely and often.'],
        ['id' => 'aws', 'label' => 'AWS', 'group' => 'devops', 'fact' => 'Cloud infrastructure for production systems.'],
        ['id' => 'git', 'label' => 'Git', 'group' => 'devops', 'fact' => 'Disciplined version control across every team.'],
        ['id' => 'docker', 'label' => 'Docker', 'group' => 'devops', 'fact' => 'Consistent, portable environments.'],
        // craft
        ['id' => 'rest-api', 'label' => 'REST API Design', 'group' => 'craft', 'fact' => 'Consistent contracts across mobile, web and Ai systems.'],
        ['id' => 'seo', 'label' => 'SEO', 'group' => 'craft', 'fact' => 'Technical optimisation for real organic visibility.'],
        ['id' => 'performance', 'label' => 'Performance', 'group' => 'craft', 'fact' => 'Systems that hold up under real load.'],
        ['id' => 'security', 'label' => 'Security', 'group' => 'craft', 'fact' => 'Access control and compliance-aligned backend logic.'],
        // leadership
        ['id' => 'mentorship', 'label' => 'Mentorship', 'group' => 'leadership', 'fact' => 'Training and elevating junior developers.'],
        ['id' => 'code-review', 'label' => 'Code Review', 'group' => 'leadership', 'fact' => 'Raising quality across every pull request.'],
        ['id' => 'agile', 'label' => 'Agile/Scrum', 'group' => 'leadership', 'fact' => 'Delivery across cross-functional teams.'],
        ['id' => 'project-management', 'label' => 'Project Management', 'group' => 'leadership', 'fact' => 'Keeping delivery on time and on scope.'],
    ],

];
