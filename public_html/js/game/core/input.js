// input.js — unified keyboard + pointer + touch input. Emits a polled state
// object; games read it per frame rather than wiring their own listeners.

/**
 * createInput(container, opts) -> { state, dispose, onTap(cb), attachTouchCluster(kind) }
 *
 * state shape (all fields always present):
 *   { left, right, up, down, jump, action, pause,
 *     dragX, dragY,      // accumulated drag delta since last read, then reset
 *     wheel,             // accumulated wheel delta since last read, then reset
 *     pointerDown, pointerX, pointerY }
 */
export function createInput(container, opts = {}) {
    const state = {
        left: false, right: false, up: false, down: false,
        jump: false, action: false, pause: false,
        dragX: 0, dragY: 0, wheel: 0,
        pointerDown: false, pointerX: 0, pointerY: 0,
    };

    const tapListeners = new Set();
    const keyDownHandlers = new Map([
        ['ArrowLeft', () => { state.left = true; }],
        ['KeyA', () => { state.left = true; }],
        ['ArrowRight', () => { state.right = true; }],
        ['KeyD', () => { state.right = true; }],
        ['ArrowUp', () => { state.up = true; }],
        ['KeyW', () => { state.up = true; }],
        ['ArrowDown', () => { state.down = true; }],
        ['KeyS', () => { state.down = true; }],
        ['Space', () => { state.jump = true; state.action = true; }],
        ['Enter', () => { state.action = true; }],
        ['Escape', () => { state.pause = true; }],
        ['KeyP', () => { state.pause = true; }],
    ]);
    const keyUpHandlers = new Map([
        ['ArrowLeft', () => { state.left = false; }],
        ['KeyA', () => { state.left = false; }],
        ['ArrowRight', () => { state.right = false; }],
        ['KeyD', () => { state.right = false; }],
        ['ArrowUp', () => { state.up = false; }],
        ['KeyW', () => { state.up = false; }],
        ['ArrowDown', () => { state.down = false; }],
        ['KeyS', () => { state.down = false; }],
        ['Space', () => { state.jump = false; state.action = false; }],
        ['Enter', () => { state.action = false; }],
    ]);

    const onKeyDown = (e) => {
        const handler = keyDownHandlers.get(e.code);
        if (handler) { handler(); if (e.code === 'Space') e.preventDefault(); }
    };
    const onKeyUp = (e) => {
        const handler = keyUpHandlers.get(e.code);
        if (handler) handler();
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    // Pointer drag (orbit-style) + tap discrimination
    let dragging = false;
    let lastX = 0, lastY = 0, downX = 0, downY = 0, moved = 0;

    const onPointerDown = (e) => {
        dragging = true;
        state.pointerDown = true;
        lastX = downX = e.clientX;
        lastY = downY = e.clientY;
        moved = 0;
    };
    const onPointerMove = (e) => {
        state.pointerX = e.clientX;
        state.pointerY = e.clientY;
        if (!dragging) return;
        state.dragX += e.clientX - lastX;
        state.dragY += e.clientY - lastY;
        moved += Math.abs(e.clientX - lastX) + Math.abs(e.clientY - lastY);
        lastX = e.clientX;
        lastY = e.clientY;
    };
    const onPointerUp = (e) => {
        dragging = false;
        state.pointerDown = false;
        if (moved < 6) {
            tapListeners.forEach((cb) => cb({ x: e.clientX, y: e.clientY }));
        }
    };
    const onWheel = (e) => {
        state.wheel += e.deltaY;
        e.preventDefault();
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    container.addEventListener('wheel', onWheel, { passive: false });

    // Touch control cluster — DOM buttons overlaid on the canvas container.
    let touchCluster = null;
    function attachTouchCluster(kind) {
        touchCluster = document.createElement('div');
        touchCluster.className = 'game-touch-controls';

        const makeButton = (label, iconClass, onDown, onUp) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'game-touch-btn';
            btn.setAttribute('aria-label', label);
            btn.innerHTML = '<i class="' + iconClass + '" aria-hidden="true"></i>';
            btn.addEventListener('pointerdown', (e) => { e.preventDefault(); onDown(); });
            btn.addEventListener('pointerup', (e) => { e.preventDefault(); if (onUp) onUp(); });
            btn.addEventListener('pointerleave', () => { if (onUp) onUp(); });
            return btn;
        };

        if (kind === 'dpad-jump') {
            const left = document.createElement('div');
            left.className = 'game-touch-group game-touch-group--left';
            left.appendChild(makeButton('Move left', 'fas fa-chevron-left', () => { state.left = true; }, () => { state.left = false; }));
            left.appendChild(makeButton('Move right', 'fas fa-chevron-right', () => { state.right = true; }, () => { state.right = false; }));

            const right = document.createElement('div');
            right.className = 'game-touch-group game-touch-group--right';
            right.appendChild(makeButton('Jump', 'fas fa-arrow-up', () => { state.jump = true; }, () => { state.jump = false; }));

            touchCluster.appendChild(left);
            touchCluster.appendChild(right);
        } else if (kind === 'action') {
            const right = document.createElement('div');
            right.className = 'game-touch-group game-touch-group--right';
            right.appendChild(makeButton('Drop block', 'fas fa-hand-pointer', () => { state.action = true; }, () => { state.action = false; }));
            touchCluster.appendChild(right);
        }

        container.appendChild(touchCluster);
        return touchCluster;
    }

    return {
        state,
        onTap(cb) { tapListeners.add(cb); return () => tapListeners.delete(cb); },
        attachTouchCluster,
        consumeDrag() {
            const d = { x: state.dragX, y: state.dragY };
            state.dragX = 0;
            state.dragY = 0;
            return d;
        },
        consumeWheel() {
            const w = state.wheel;
            state.wheel = 0;
            return w;
        },
        consumePause() {
            const p = state.pause;
            state.pause = false;
            return p;
        },
        dispose() {
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('keyup', onKeyUp);
            container.removeEventListener('pointerdown', onPointerDown);
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);
            container.removeEventListener('wheel', onWheel);
            if (touchCluster && touchCluster.parentNode) touchCluster.parentNode.removeChild(touchCluster);
            tapListeners.clear();
        },
    };
}
