<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">
    <title>Game Playground — Abdul Karim Taji</title>

    <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet">

    <meta name="theme-color" content="#0b0c0f" media="(prefers-color-scheme: dark)">
    <meta name="theme-color" content="#faf9f7" media="(prefers-color-scheme: light)">

    <style>
        :root {
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

            --surface-0: var(--ink-98);
            --surface-1: #ffffff;
            --surface-2: var(--ink-95);
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

            --space-1: 0.25rem; --space-2: 0.5rem; --space-3: 0.75rem; --space-4: 1rem;
            --space-5: 1.5rem; --space-6: 2rem; --space-8: 3rem; --space-10: 4rem;

            --radius-sm: 0.375rem; --radius-md: 0.75rem; --radius-lg: 1.25rem; --radius-full: 9999px;

            --shadow-sm: 0 1px 2px oklch(20% 0 0 / 0.05), 0 1px 1px oklch(20% 0 0 / 0.04);
            --shadow-md: 0 8px 24px oklch(20% 0 0 / 0.07), 0 2px 6px oklch(20% 0 0 / 0.05);
            --shadow-lg: 0 24px 48px oklch(20% 0 0 / 0.12), 0 6px 16px oklch(20% 0 0 / 0.06);

            --duration-fast: 150ms; --duration-base: 250ms; --duration-slow: 450ms;
            --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
            --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);

            --text-xs: 0.8125rem; --text-sm: 0.9375rem; --text-base: 1.0625rem;
            --text-lg: 1.25rem; --text-xl: clamp(1.5rem, 1.3rem + 0.8vw, 1.875rem);
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
            }
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Inter', sans-serif;
            background: var(--surface-0);
            color: var(--text-primary);
            padding: var(--space-6) var(--space-5) var(--space-10);
        }
        h1 { font-family: 'Fraunces', serif; font-size: var(--text-xl); margin-bottom: var(--space-2); }
        .container { max-width: 900px; margin-inline: auto; }
        .switcher { display: flex; gap: var(--space-2); margin-block: var(--space-5); flex-wrap: wrap; }
        .switcher button {
            font-family: 'Inter', sans-serif;
            font-weight: 600;
            font-size: var(--text-sm);
            padding: var(--space-2) var(--space-4);
            border-radius: var(--radius-full);
            border: 1px solid var(--border-subtle);
            background: var(--surface-1);
            color: var(--text-primary);
            cursor: pointer;
        }
        .switcher button.active { background: var(--color-action); border-color: var(--color-action); color: var(--color-action-contrast); }
        .switcher button:hover:not(.active) { border-color: var(--color-action); }
        .theme-row { display: flex; gap: var(--space-2); margin-bottom: var(--space-4); align-items: center; font-size: var(--text-xs); color: var(--text-secondary); }
        .theme-row button { font-size: var(--text-xs); padding: var(--space-1) var(--space-3); border-radius: var(--radius-full); border: 1px solid var(--border-subtle); background: var(--surface-1); color: var(--text-primary); cursor: pointer; }
        .debug-hud { font-size: var(--text-xs); color: var(--text-secondary); margin-top: var(--space-3); font-family: monospace; }
        .skill-tag {
            font-size: var(--text-xs); font-weight: 500;
            padding: var(--space-1) var(--space-3);
            border-radius: var(--radius-full);
            background: var(--surface-2);
            color: var(--text-secondary);
            border: 1px solid var(--border-subtle);
            display: inline-block;
        }
        .eyebrow { font-size: var(--text-xs); font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--color-action); }
        .btn {
            display: inline-flex; align-items: center; gap: var(--space-2);
            font-family: 'Inter', sans-serif; font-weight: 600; font-size: var(--text-sm);
            padding: var(--space-3) var(--space-6); border-radius: var(--radius-full);
            border: 1px solid transparent; cursor: pointer;
        }
        .btn-primary { background: var(--color-action); color: var(--color-action-contrast); }
        .btn-primary:hover { background: var(--color-action-hover); }
    </style>
</head>
<body>
    <div class="container">
        <span class="eyebrow">Local review only — not linked from the live site</span>
        <h1>3D Game Playground</h1>
        <p style="color:var(--text-secondary); font-size: var(--text-sm);">Switch between the three prototypes below. Judge in light mode first.</p>

        <div class="theme-row">
            Theme:
            <button type="button" id="theme-light">Light</button>
            <button type="button" id="theme-dark">Dark</button>
            <button type="button" id="theme-system">System</button>
        </div>

        <div class="switcher" id="switcher">
            <button type="button" data-game="platformer" class="active">A · Career Run (platformer)</button>
            <button type="button" data-game="world">B · Career Constellation (world)</button>
            <button type="button" data-game="tower">C · Stack the Stack (tower)</button>
        </div>

        @include('portfolio._game-section', ['gameId' => 'platformer', 'suffix' => 'active'])

        <div class="debug-hud" id="debug-hud">fps: — · tier: — · draw calls: —</div>
    </div>

    @include('portfolio._game-styles')
    @include('portfolio._game-data')

    <script type="importmap">
    { "imports": { "three": "{{ asset('js/vendor/three.module.min.js') }}" } }
    </script>

    <script type="module">
        import { mountGame, parseGameData } from '{{ asset("js/game/main.js") }}';

        var data = parseGameData();
        var frame = document.getElementById('game-frame-active');
        var switcher = document.getElementById('switcher');
        var current = null;
        var currentId = 'platformer';

        async function mount(gameId) {
            if (current) { current.dispose(); current = null; }
            frame.innerHTML = '';
            currentId = gameId;
            current = await mountGame(frame, gameId, data);
        }

        switcher.addEventListener('click', function (e) {
            var btn = e.target.closest('button[data-game]');
            if (!btn) return;
            switcher.querySelectorAll('button').forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            mount(btn.getAttribute('data-game'));
        });

        document.getElementById('theme-light').addEventListener('click', function () {
            document.documentElement.setAttribute('data-theme', 'light');
        });
        document.getElementById('theme-dark').addEventListener('click', function () {
            document.documentElement.setAttribute('data-theme', 'dark');
        });
        document.getElementById('theme-system').addEventListener('click', function () {
            document.documentElement.removeAttribute('data-theme');
        });

        mount(currentId);
    </script>
</body>
</html>
