// hero-scene.js — GPU particle field that morphs sphere -> wave -> helix as the hero scrolls.
// One draw call, no post-processing. Loaded lazily by site.js after first paint.
import * as THREE from './vendor/three.module.min.js';
import { detectTier } from './lib/perf.js';

const COUNTS = { high: 26000, mid: 13000, low: 6000 };

function buildTargets(n) {
    const sphere = new Float32Array(n * 3);
    const wave = new Float32Array(n * 3);
    const helix = new Float32Array(n * 3);
    const seed = new Float32Array(n);
    const golden = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < n; i++) {
        const k = i * 3;
        seed[i] = Math.random();

        // sphere shell with a little thickness (fibonacci lattice)
        const y = 1 - (i / (n - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const th = golden * i;
        const rad = 2.5 * (0.9 + Math.random() * 0.2);
        sphere[k] = Math.cos(th) * r * rad;
        sphere[k + 1] = y * rad;
        sphere[k + 2] = Math.sin(th) * r * rad;

        // wide wave sheet
        const wx = (Math.random() - 0.5) * 11;
        const wz = (Math.random() - 0.5) * 7;
        wave[k] = wx;
        wave[k + 1] = Math.sin(wx * 1.1) * Math.cos(wz * 0.9) * 0.45;
        wave[k + 2] = wz;

        // double helix with jitter
        const t = (i / n) * 2 - 1;
        const strand = i % 2;
        const a = t * Math.PI * 7 + strand * Math.PI;
        const j = 0.09;
        helix[k] = Math.cos(a) * 1.35 + (Math.random() - 0.5) * j * 4;
        helix[k + 1] = t * 3.6;
        helix[k + 2] = Math.sin(a) * 1.35 + (Math.random() - 0.5) * j * 4;
    }
    return { sphere, wave, helix, seed };
}

const VERT = /* glsl */ `
attribute vec3 aWave;
attribute vec3 aHelix;
attribute float aSeed;
uniform float uMorph;
uniform float uTime;
uniform vec2 uPointer;
uniform float uSize;
uniform float uPx;
varying float vMix;
varying float vSeed;

void main() {
    float w0 = max(0.0, 1.0 - abs(uMorph));
    float w1 = max(0.0, 1.0 - abs(uMorph - 1.0));
    float w2 = max(0.0, 1.0 - abs(uMorph - 2.0));
    vec3 p = position * w0 + aWave * w1 + aHelix * w2;

    // living motion
    float t = uTime * 0.6 + aSeed * 6.2831;
    p += vec3(sin(t + p.y * 1.3), cos(t * 0.9 + p.x * 1.1), sin(t * 1.1 + p.z)) * 0.07;
    p.y += sin(p.x * 1.1 + uTime * 0.9) * 0.22 * w1;

    // pointer repulsion in screen space
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vec4 clip = projectionMatrix * mv;
    vec2 ndc = clip.xy / clip.w;
    vec2 d = ndc - uPointer;
    float dist = length(d);
    float push = smoothstep(0.42, 0.0, dist);
    mv.xy += normalize(d + 1e-4) * push * 0.9;

    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPx * (0.55 + aSeed * 0.9) * (6.5 / -mv.z) * (1.0 + push * 1.2);
    vMix = clamp((p.x * 0.18 + p.y * 0.12) + 0.5, 0.0, 1.0);
    vSeed = aSeed;
}`;

const FRAG = /* glsl */ `
precision mediump float;
uniform vec3 uA;
uniform vec3 uB;
uniform float uAlpha;
varying float vMix;
varying float vSeed;

void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.0, d);
    vec3 col = mix(uA, uB, vMix);
    col = mix(col, vec3(1.0), smoothstep(0.85, 1.0, vSeed) * 0.5);
    gl_FragColor = vec4(col, pow(a, 1.4) * uAlpha * 1.5);
}`;

export function createHero(canvas, hero) {
    const cfg = detectTier();
    const width = window.innerWidth;
    const tier = cfg.tier === 'low' ? (width < 640 ? 'low' : 'mid') : 'high';
    const count = COUNTS[tier];

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' });
    renderer.setClearColor(0x000000, 0);
    const dpr = Math.min(window.devicePixelRatio || 1, tier === 'high' ? 2 : 1.5);
    renderer.setPixelRatio(dpr);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 60);
    camera.position.set(0, 0, 8);

    const t = buildTargets(count);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(t.sphere, 3));
    geo.setAttribute('aWave', new THREE.BufferAttribute(t.wave, 3));
    geo.setAttribute('aHelix', new THREE.BufferAttribute(t.helix, 3));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(t.seed, 1));

    const mat = new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
            uMorph: { value: 0 },
            uTime: { value: 0 },
            uPointer: { value: new THREE.Vector2(9, 9) },
            uSize: { value: tier === 'low' ? 4.6 : 3.8 },
            uPx: { value: dpr },
            uA: { value: new THREE.Color(0x7c5cff) },
            uB: { value: new THREE.Color(0x22d3ee) },
            uAlpha: { value: 1 },
        },
    });
    const points = new THREE.Points(geo, mat);
    points.frustumCulled = false;
    const group = new THREE.Group();
    group.add(points);
    scene.add(group);

    const pointerTarget = new THREE.Vector2(9, 9);
    let visible = true;
    let tabVisible = !document.hidden;
    let raf = 0;
    let lost = false;
    let morph = 0;
    let rotY = 0;
    const clock = new THREE.Clock();

    function resize() {
        const w = canvas.clientWidth || hero.clientWidth;
        const h = canvas.clientHeight || hero.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        const wide = w / h > 1.1;
        // keep the field to the right of the copy on desktop, centred and softer on phones
        group.position.x = wide ? Math.min(2.6, w / 560) : 0;
        group.position.y = wide ? 0 : 1.1;
        const s = wide ? 1 : Math.max(0.62, Math.min(0.9, w / 520));
        group.scale.setScalar(s);
        mat.uniforms.uAlpha.value = wide ? 1 : 0.72;
        camera.updateProjectionMatrix();
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    function scrollProgress() {
        const r = hero.getBoundingClientRect();
        return Math.min(1, Math.max(0, -r.top / Math.max(1, r.height * 0.9)));
    }

    function frame() {
        raf = 0;
        if (!visible || !tabVisible || lost) return;
        const dt = Math.min(clock.getDelta(), 0.05);
        mat.uniforms.uTime.value += dt;

        const targetMorph = scrollProgress() * 2;
        morph += (targetMorph - morph) * Math.min(1, dt * 5);
        mat.uniforms.uMorph.value = morph;

        const p = mat.uniforms.uPointer.value;
        p.x += (pointerTarget.x - p.x) * Math.min(1, dt * 10);
        p.y += (pointerTarget.y - p.y) * Math.min(1, dt * 10);

        rotY += dt * 0.12;
        group.rotation.y = rotY + p.x * 0.08 * (p.x < 5 ? 1 : 0);
        group.rotation.x = Math.sin(mat.uniforms.uTime.value * 0.2) * 0.06 + morph * 0.12;

        renderer.render(scene, camera);
        raf = requestAnimationFrame(frame);
    }
    const kick = () => { if (!raf && visible && tabVisible && !lost) { clock.getDelta(); raf = requestAnimationFrame(frame); } };

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; kick(); }, { threshold: 0 });
    io.observe(hero);
    const onVis = () => { tabVisible = !document.hidden; kick(); };
    document.addEventListener('visibilitychange', onVis);

    // pointer (fine pointers only; phones just drift)
    const onMove = (ev) => {
        const r = canvas.getBoundingClientRect();
        pointerTarget.set(((ev.clientX - r.left) / r.width) * 2 - 1, -(((ev.clientY - r.top) / r.height) * 2 - 1));
    };
    const onLeave = () => pointerTarget.set(9, 9);
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        hero.addEventListener('pointermove', onMove, { passive: true });
        hero.addEventListener('pointerleave', onLeave);
    }

    canvas.addEventListener('webglcontextlost', (e) => {
        e.preventDefault();
        lost = true;
        canvas.classList.remove('is-on');
    });
    canvas.addEventListener('webglcontextrestored', () => { lost = false; canvas.classList.add('is-on'); kick(); });

    renderer.render(scene, camera);
    canvas.classList.add('is-on');
    kick();

    return {
        dispose() {
            cancelAnimationFrame(raf);
            ro.disconnect();
            io.disconnect();
            document.removeEventListener('visibilitychange', onVis);
            hero.removeEventListener('pointermove', onMove);
            geo.dispose();
            mat.dispose();
            renderer.dispose();
        },
        tier,
        count,
    };
}
