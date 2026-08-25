// theme.js — reads the site's CSS custom properties into a THREE.Color palette
// and keeps it live-synced with the data-theme toggle. No game-specific logic.

import * as THREE from 'three';

const TOKENS = [
    'surface-0', 'surface-1', 'surface-2', 'surface-inverse',
    'text-primary', 'text-secondary',
    'color-action', 'color-action-hover', 'color-accent-soft', 'color-structural',
    'border-subtle', 'border-strong',
];

let resolveCanvas = null;

function resolveCssColorToHex(cssColor) {
    // THREE.Color can't parse oklch()/color-mix() directly in all browsers.
    // Paint a 1x1 canvas with the CSS value and read back the resolved RGB.
    if (!resolveCanvas) {
        resolveCanvas = document.createElement('canvas');
        resolveCanvas.width = 1;
        resolveCanvas.height = 1;
    }
    const ctx = resolveCanvas.getContext('2d', { willReadFrequently: true });
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = '#000';
    ctx.fillStyle = cssColor;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    return (r << 16) | (g << 8) | b;
}

function readPalette() {
    const styles = getComputedStyle(document.documentElement);
    const palette = {};
    TOKENS.forEach((token) => {
        const raw = styles.getPropertyValue('--' + token).trim();
        palette[toCamel(token)] = raw ? resolveCssColorToHex(raw) : 0x888888;
    });
    palette.isDark = isDarkMode();
    return palette;
}

function toCamel(token) {
    return token.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
}

function isDarkMode() {
    const attr = document.documentElement.getAttribute('data-theme');
    if (attr === 'dark') return true;
    if (attr === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * createThemeWatcher() -> { palette, onChange(cb), dispose() }
 * `palette` is a live object (mutated in place on change) with THREE-friendly
 * hex color numbers, e.g. palette.colorAction, palette.surface0.
 */
export function createThemeWatcher() {
    const palette = readPalette();
    const listeners = new Set();

    const refresh = () => {
        const next = readPalette();
        Object.assign(palette, next);
        listeners.forEach((cb) => cb(palette));
    };

    const observer = new MutationObserver((mutations) => {
        if (mutations.some((m) => m.attributeName === 'data-theme')) refresh();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const mediaHandler = () => refresh();
    if (media.addEventListener) media.addEventListener('change', mediaHandler);

    return {
        palette,
        onChange(cb) { listeners.add(cb); return () => listeners.delete(cb); },
        dispose() {
            observer.disconnect();
            if (media.removeEventListener) media.removeEventListener('change', mediaHandler);
            listeners.clear();
        },
    };
}

/** Adds ink-toned edge lines to a mesh so low-poly shapes read against a pale ground. */
export function addEdges(mesh, colorHex, opacity = 0.35) {
    const edges = new THREE.EdgesGeometry(mesh.geometry, 1);
    const material = new THREE.LineBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity,
    });
    const lines = new THREE.LineSegments(edges, material);
    mesh.add(lines);
    return lines;
}

/** A soft radial-gradient sprite texture, generated once, reused across instances. */
const glowTextureCache = new Map();
export function glowTexture(colorHex) {
    const key = colorHex;
    if (glowTextureCache.has(key)) return glowTextureCache.get(key);

    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const hex = '#' + colorHex.toString(16).padStart(6, '0');
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, hex + 'ff');
    gradient.addColorStop(0.4, hex + '88');
    gradient.addColorStop(1, hex + '00');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    const texture = new THREE.CanvasTexture(canvas);
    glowTextureCache.set(key, texture);
    return texture;
}

/** A soft elliptical contact-shadow blob texture — cheap grounding without shadow maps. */
let contactShadowTex = null;
export function contactShadowTexture() {
    if (contactShadowTex) return contactShadowTex;
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, 'rgba(0,0,0,0.35)');
    gradient.addColorStop(0.7, 'rgba(0,0,0,0.12)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    contactShadowTex = new THREE.CanvasTexture(canvas);
    return contactShadowTex;
}

export function makeContactShadow(radius = 0.6) {
    const geometry = new THREE.PlaneGeometry(radius * 2, radius * 2);
    const material = new THREE.MeshBasicMaterial({
        map: contactShadowTexture(),
        transparent: true,
        depthWrite: false,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2;
    return mesh;
}
