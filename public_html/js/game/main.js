// main.js — entry point. Reads the JSON data payload, shows a static poster
// until the user opts in, then dynamic-imports the requested game module and
// drives it through the shared lifecycle (init/start/pause/dispose).
//
// Also powers the /playground switcher (multiple game slots on one page).

import { createEngine } from './core/engine.js';
import { createThemeWatcher } from './core/theme.js';
import { createInput } from './core/input.js';
import { createHud, startPoster } from './core/ui.js';

const GAME_MODULES = {
    platformer: './games/platformer.js',
    world: './games/world.js',
    tower: './games/tower.js',
};

const GAME_META = {
    platformer: {
        title: 'Career Run',
        subtitle: 'Sprint through five jobs, oldest to newest. Dodge, jump, and grab every skill in your path.',
        controlsLegend: '←/→ or A/D to switch lanes · Space / W / ↑ to jump · Esc to pause',
    },
    world: {
        title: 'Career Constellation',
        subtitle: 'A night sky of floating islands — every job, skill, and project has a place. Explore it all.',
        controlsLegend: 'Drag to orbit · scroll/pinch to zoom · tap islands, crystals & ships · Tab + Enter also works',
    },
    tower: {
        title: 'Stack the Stack',
        subtitle: 'Stack the entire tech stack, block by block. Chase perfects, build combos, reach the top.',
        controlsLegend: 'Space, click or tap to drop · Esc to pause',
    },
};

function parseGameData() {
    const el = document.getElementById('portfolio-game-data');
    if (!el) return { companies: [], skills: [], projects: [] };
    try {
        return JSON.parse(el.textContent);
    } catch (e) {
        return { companies: [], skills: [], projects: [] };
    }
}

function reduceMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function supportsWebGL() {
    try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext &&
            (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
        return false;
    }
}

/**
 * mountGame(container, gameId, data) -> Promise<{ dispose() }>
 * Shows a poster; on Start, loads the module and boots it. Returns a handle
 * whose dispose() tears down everything (engine, input, theme watcher, HUD).
 */
export async function mountGame(container, gameId, data) {
    const meta = GAME_META[gameId];
    let active = null; // { engine, input, themeWatcher, hud, gameInstance }

    function teardown() {
        if (!active) return;
        try { active.gameInstance && active.gameInstance.dispose && active.gameInstance.dispose(); } catch (e) {}
        try { active.hud.dispose(); } catch (e) {}
        try { active.input.dispose(); } catch (e) {}
        try { active.themeWatcher.dispose(); } catch (e) {}
        try { active.engine.dispose(); } catch (e) {}
        active = null;
    }

    async function boot() {
        const canvasWrap = document.createElement('div');
        canvasWrap.className = 'game-canvas-wrap';
        container.appendChild(canvasWrap);

        const themeWatcher = createThemeWatcher();
        const engine = createEngine(canvasWrap, {
            background: themeWatcher.palette.surface0,
            fog: { color: themeWatcher.palette.surface0, near: 8, far: 26 },
            ariaLabel: meta.title + ' — interactive 3D scene',
        });
        const input = createInput(canvasWrap);
        const hud = createHud(canvasWrap);

        const module = await import(GAME_MODULES[gameId]);
        const gameInstance = module.default;

        await gameInstance.init({ engine, hud, input, themeWatcher }, data, {
            reduceMotion: reduceMotion(),
        });

        themeWatcher.onChange(() => {
            if (gameInstance.onThemeChange) gameInstance.onThemeChange(themeWatcher.palette);
        });

        active = { engine, input, themeWatcher, hud, gameInstance };
        gameInstance.start();
        engine.start();
    }

    if (!supportsWebGL()) {
        startPoster(container, {
            title: meta.title,
            subtitle: meta.subtitle,
            disabledReason: 'Your browser doesn’t support 3D graphics here — no problem, everything above tells the same story.',
        });
        return { dispose() {} };
    }

    const poster = startPoster(container, {
        title: meta.title,
        subtitle: meta.subtitle,
        controlsLegend: meta.controlsLegend,
        onStart: async () => {
            poster.remove();
            await boot();
        },
    });

    return {
        dispose() {
            poster.remove();
            teardown();
        },
    };
}

export { GAME_META, parseGameData };
