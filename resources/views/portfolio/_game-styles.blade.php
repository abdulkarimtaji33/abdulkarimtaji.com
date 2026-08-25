{{-- Shared CSS for the 3D game section — used by both the homepage embed and
     /playground. Reuses existing design tokens; only new chrome-specific rules
     live here. Dark-mode-specific overrides go in the site's existing dark
     blocks when this partial is included on the main page; on /playground the
     tokens are already available from the shared <head>. --}}
<style>
    /* ============================================================
       GAME — shared chrome for all three prototypes
       ============================================================ */
    .game-section-wrap { }

    .game-frame {
        position: relative;
        width: 100%;
        aspect-ratio: 16 / 10;
        border-radius: var(--radius-lg);
        border: 1px solid var(--border-subtle);
        overflow: hidden;
        background: var(--surface-1);
        box-shadow: var(--shadow-md);
    }
    @media (max-width: 640px) {
        .game-frame { aspect-ratio: 4 / 5; }
    }

    .game-canvas-wrap {
        position: absolute;
        inset: 0;
    }
    .game-canvas-wrap canvas {
        display: block;
        width: 100% !important;
        height: 100% !important;
        touch-action: none;
        -webkit-tap-highlight-color: transparent;
        outline: none;
    }

    /* --- Poster / start overlay --- */
    .game-poster {
        position: absolute;
        inset: 0;
        z-index: 5;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        gap: var(--space-3);
        padding: var(--space-6);
        background: var(--surface-1);
    }
    .game-poster-title {
        font-family: 'Fraunces', serif;
        font-size: var(--text-xl);
    }
    .game-poster-subtitle {
        max-width: 40ch;
        font-size: var(--text-base);
        color: var(--text-secondary);
    }
    .game-poster-controls {
        font-size: var(--text-xs);
        color: var(--text-secondary);
        margin-top: var(--space-1);
    }
    .game-poster-start { margin-top: var(--space-2); }

    /* --- HUD --- */
    .game-hud {
        position: absolute;
        inset: 0;
        z-index: 4;
        pointer-events: none;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: var(--space-3);
    }
    .game-hud-top {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: var(--space-2);
    }
    .game-hud-topleft,
    .game-hud-topright {
        pointer-events: auto;
        background: color-mix(in oklch, var(--surface-1) 88%, transparent);
        backdrop-filter: blur(8px);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-md);
        padding: var(--space-2) var(--space-3);
        font-size: var(--text-xs);
        font-weight: 600;
        color: var(--text-primary);
        box-shadow: var(--shadow-sm);
    }
    .game-hud-bottom {
        pointer-events: auto;
        align-self: center;
    }
    .game-hud-live { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }

    .game-hud-pause-btn {
        background: none;
        border: none;
        color: var(--text-primary);
        cursor: pointer;
        font-size: 1rem;
        padding: 0;
        line-height: 1;
    }
    .game-hud-pause-btn:hover { color: var(--color-action); }

    /* --- Info card overlay --- */
    .game-card-overlay {
        position: absolute;
        inset: 0;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
        background: color-mix(in oklch, var(--surface-inverse) 45%, transparent);
        padding: var(--space-4);
    }
    .game-card {
        position: relative;
        max-width: 26rem;
        width: 100%;
        background: var(--surface-1);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        padding: var(--space-6);
        animation: game-card-in var(--duration-base) var(--ease-out);
    }
    @keyframes game-card-in {
        from { opacity: 0; transform: translateY(8px) scale(0.97); }
        to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    .game-card-close {
        position: absolute;
        top: var(--space-3);
        right: var(--space-3);
        width: 2rem; height: 2rem;
        border-radius: var(--radius-full);
        border: 1px solid var(--border-subtle);
        background: var(--surface-2);
        color: var(--text-primary);
        cursor: pointer;
        display: flex; align-items: center; justify-content: center;
    }
    .game-card-close:hover { border-color: var(--color-action); color: var(--color-action); }
    .game-card-title {
        font-family: 'Fraunces', serif;
        font-size: var(--text-lg);
        margin-block: var(--space-2) var(--space-2);
    }
    .game-card-body { font-size: var(--text-sm); margin-bottom: var(--space-3); }
    .game-card-tags { margin-bottom: var(--space-4); }
    .game-card-cta { width: 100%; justify-content: center; }

    /* --- Toast --- */
    .game-toast {
        position: absolute;
        left: 50%;
        bottom: var(--space-4);
        transform: translate(-50%, 12px);
        z-index: 6;
        background: var(--surface-inverse);
        color: var(--text-on-inverse);
        font-size: var(--text-xs);
        font-weight: 600;
        padding: var(--space-2) var(--space-4);
        border-radius: var(--radius-full);
        box-shadow: var(--shadow-md);
        opacity: 0;
        transition: opacity var(--duration-base) var(--ease-out), transform var(--duration-base) var(--ease-out);
        pointer-events: none;
        max-width: 80%;
        text-align: center;
    }
    .game-toast--in { opacity: 1; transform: translate(-50%, 0); }

    /* --- Touch controls --- */
    .game-touch-controls {
        position: absolute;
        inset: 0;
        z-index: 4;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        padding: var(--space-4);
        pointer-events: none;
    }
    .game-touch-group {
        display: flex;
        gap: var(--space-3);
        pointer-events: auto;
    }
    .game-touch-btn {
        width: 3.25rem; height: 3.25rem;
        border-radius: var(--radius-full);
        border: 1px solid var(--border-subtle);
        background: color-mix(in oklch, var(--surface-1) 85%, transparent);
        backdrop-filter: blur(8px);
        color: var(--text-primary);
        font-size: 1.1rem;
        display: flex; align-items: center; justify-content: center;
        box-shadow: var(--shadow-sm);
        cursor: pointer;
    }
    .game-touch-btn:active { background: var(--color-accent-soft); border-color: var(--color-action); }

    @media (hover: hover) and (pointer: fine) {
        .game-touch-controls { display: none; }
    }
</style>
