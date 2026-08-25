// engine.js — generic three.js bootstrap: renderer, resize/DPR, rAF loop,
// auto-pause when hidden/offscreen, context-loss handling, full disposal.
// Nothing game-specific lives here.

import * as THREE from 'three';
import { detectTier } from './perf.js';

/**
 * createEngine(container, opts) -> engine
 * opts: { dprCap, background: hexNumber, fog: { color, near, far } | null }
 */
export function createEngine(container, opts = {}) {
    const tier = detectTier();
    const dprCap = opts.dprCap || tier.dprCap;

    const scene = new THREE.Scene();
    if (opts.background !== undefined) scene.background = new THREE.Color(opts.background);
    if (opts.fog) scene.fog = new THREE.Fog(opts.fog.color, opts.fog.near, opts.fog.far);

    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 2, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, dprCap));
    renderer.shadowMap.enabled = !!tier.shadows;
    if (tier.shadows) renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    renderer.domElement.setAttribute('role', 'img');
    if (opts.ariaLabel) renderer.domElement.setAttribute('aria-label', opts.ariaLabel);

    let running = false;
    let rafId = null;
    let lastTime = performance.now();
    const updateCallbacks = new Set();
    const renderCallbacks = new Set();

    function frame(now) {
        if (!running) return;
        const dt = Math.min((now - lastTime) / 1000, 1 / 20); // clamp to avoid huge steps after a pause
        lastTime = now;
        updateCallbacks.forEach((cb) => cb(dt));
        renderCallbacks.forEach((cb) => cb());
        renderer.render(scene, camera);
        rafId = requestAnimationFrame(frame);
    }

    function start() {
        if (running) return;
        running = true;
        lastTime = performance.now();
        rafId = requestAnimationFrame(frame);
    }
    function stop() {
        running = false;
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
    }

    // --- resize ---
    function resize() {
        const width = container.clientWidth || 1;
        const height = container.clientHeight || 1;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
    }
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    // --- auto-pause when hidden or scrolled offscreen ---
    let wasRunningBeforeHide = false;
    const onVisibility = () => {
        if (document.hidden) {
            wasRunningBeforeHide = running;
            stop();
        } else if (wasRunningBeforeHide) {
            start();
        }
    };
    document.addEventListener('visibilitychange', onVisibility);

    let wasRunningBeforeScroll = false;
    const intersectionObserver = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (!entry.isIntersecting) {
            wasRunningBeforeScroll = running;
            stop();
        } else if (wasRunningBeforeScroll) {
            start();
        }
    }, { threshold: 0.05 });
    intersectionObserver.observe(container);

    // --- context loss / restore ---
    const onContextLost = (e) => { e.preventDefault(); stop(); };
    const onContextRestored = () => { resize(); };
    renderer.domElement.addEventListener('webglcontextlost', onContextLost, false);
    renderer.domElement.addEventListener('webglcontextrestored', onContextRestored, false);

    function dispose() {
        stop();
        resizeObserver.disconnect();
        intersectionObserver.disconnect();
        document.removeEventListener('visibilitychange', onVisibility);
        renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
        renderer.domElement.removeEventListener('webglcontextrestored', onContextRestored);

        scene.traverse((obj) => {
            if (obj.geometry) obj.geometry.dispose();
            if (obj.material) {
                const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
                materials.forEach((m) => {
                    if (m.map) m.map.dispose();
                    m.dispose();
                });
            }
        });
        renderer.dispose();
        renderer.forceContextLoss();
        if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);

        updateCallbacks.clear();
        renderCallbacks.clear();
    }

    return {
        scene, camera, renderer, tier,
        start, stop, dispose, resize,
        onUpdate(cb) { updateCallbacks.add(cb); return () => updateCallbacks.delete(cb); },
        onRender(cb) { renderCallbacks.add(cb); return () => renderCallbacks.delete(cb); },
        get running() { return running; },
    };
}
