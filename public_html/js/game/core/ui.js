// ui.js — DOM chrome for games: HUD, info cards, start/pause overlays.
// Reuses the site's existing button/card CSS classes and tokens.

/**
 * createHud(container) -> { setTopLeft(html), setTopRight(html), setBottom(html), el, dispose() }
 */
export function createHud(container) {
    const el = document.createElement('div');
    el.className = 'game-hud';
    el.innerHTML =
        '<div class="game-hud-top">' +
        '<div class="game-hud-topleft"></div>' +
        '<div class="game-hud-topright"></div>' +
        '</div>' +
        '<div class="game-hud-bottom"></div>' +
        '<div class="game-hud-live" aria-live="polite"></div>';
    container.appendChild(el);

    const topLeft = el.querySelector('.game-hud-topleft');
    const topRight = el.querySelector('.game-hud-topright');
    const bottom = el.querySelector('.game-hud-bottom');
    const live = el.querySelector('.game-hud-live');

    return {
        el,
        setTopLeft(html) { topLeft.innerHTML = html; },
        setTopRight(html) { topRight.innerHTML = html; },
        setBottom(html) { bottom.innerHTML = html; },
        announce(text) { live.textContent = text; },
        dispose() { if (el.parentNode) el.parentNode.removeChild(el); },
    };
}

/**
 * infoCard(container, { title, subtitle, body, tags }, onClose) -> { close() }
 * Focus-managed modal-style card: focuses itself on open, Esc closes,
 * focus returns to `returnFocusTo` on close.
 */
export function infoCard(container, { title, subtitle, body, tags = [], ctaLabel, onCta }, opts = {}) {
    const overlay = document.createElement('div');
    overlay.className = 'game-card-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.tabIndex = -1;

    const tagsHtml = tags.map((t) => '<span class="skill-tag">' + t + '</span>').join('');
    const ctaHtml = ctaLabel
        ? '<button type="button" class="btn btn-primary game-card-cta">' + ctaLabel + '</button>'
        : '';

    overlay.innerHTML =
        '<div class="game-card">' +
        '<button type="button" class="game-card-close" aria-label="Close">' +
        '<i class="fas fa-xmark" aria-hidden="true"></i></button>' +
        (subtitle ? '<span class="eyebrow">' + subtitle + '</span>' : '') +
        '<h3 class="game-card-title">' + title + '</h3>' +
        '<p class="game-card-body">' + body + '</p>' +
        (tags.length ? '<div class="skill-tags game-card-tags">' + tagsHtml + '</div>' : '') +
        ctaHtml +
        '</div>';

    container.appendChild(overlay);
    const closeBtn = overlay.querySelector('.game-card-close');
    const ctaBtn = overlay.querySelector('.game-card-cta');
    const returnFocusTo = opts.returnFocusTo || document.activeElement;

    function close() {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        document.removeEventListener('keydown', onKeyDown);
        if (returnFocusTo && returnFocusTo.focus) returnFocusTo.focus();
        if (opts.onClose) opts.onClose();
    }

    function onKeyDown(e) {
        if (e.key === 'Escape') close();
    }

    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    if (ctaBtn && onCta) ctaBtn.addEventListener('click', () => { onCta(); close(); });
    document.addEventListener('keydown', onKeyDown);

    requestAnimationFrame(() => overlay.focus());

    return { close };
}

/**
 * startPoster(container, { title, subtitle, controlsLegend, onStart, disabled }) -> { remove() }
 */
export function startPoster(container, { title, subtitle, controlsLegend, onStart, disabledReason }) {
    const el = document.createElement('div');
    el.className = 'game-poster';
    el.innerHTML =
        '<span class="eyebrow">Interactive</span>' +
        '<h3 class="game-poster-title">' + title + '</h3>' +
        '<p class="game-poster-subtitle">' + subtitle + '</p>' +
        (controlsLegend ? '<p class="game-poster-controls">' + controlsLegend + '</p>' : '') +
        (disabledReason
            ? '<p class="game-poster-controls">' + disabledReason + '</p>'
            : '<button type="button" class="btn btn-primary game-poster-start">Start <i class="fas fa-play" aria-hidden="true"></i></button>');

    container.appendChild(el);
    const btn = el.querySelector('.game-poster-start');
    if (btn) btn.addEventListener('click', onStart);

    return {
        remove() { if (el.parentNode) el.parentNode.removeChild(el); },
    };
}

export function toast(container, message) {
    const el = document.createElement('div');
    el.className = 'game-toast';
    el.textContent = message;
    container.appendChild(el);
    requestAnimationFrame(() => el.classList.add('game-toast--in'));
    setTimeout(() => {
        el.classList.remove('game-toast--in');
        setTimeout(() => { if (el.parentNode) el.parentNode.removeChild(el); }, 300);
    }, 2200);
}
