// platformer.js — "Career Run": a third-person forward endless runner.
// The player character auto-runs INTO the screen through five company zones
// (chronological: Abtach → Tekrevol → Brainwave → Herogram → RAMA), switching
// lanes, jumping obstacles and collecting glowing skill orbs. No death — only
// stumbles. The game owns its OWN vivid palette (azure sky, grass, sand track,
// coral obstacles, gold orbs) and deliberately ignores the site theme.
//
// World strategy: the player stays near the origin; every track-fixed object
// lives in one `track` group whose position.z = distance travelled, so the
// whole world slides toward the camera (float-precision safe, one transform).

import * as THREE from 'three';
import { toast, infoCard } from '../core/ui.js';
import { addEdges, glowTexture, makeContactShadow } from '../core/theme.js';

// ---------------------------------------------------------------------------
// Palette — Career Run's own colors. Saturated but soft, Alto's-Odyssey-ish.
// ---------------------------------------------------------------------------
const PAL = {
    sky: 0x7ec8f7,
    skyHorizon: 0xeaf6ff,
    fogBase: 0xbfe3fb,
    sun: 0xfff3c4,
    sunCore: 0xffe9a0,
    grass: 0x6fcf6f,
    grassDark: 0x55b25c,
    track: 0xe8c98a,
    trackEdge: 0xd4b170,
    laneLine: 0xf7e6bf,
    obstacle: 0xff6f61,
    obstacleTall: 0xf05545,
    orb: 0xffd93b,
    orbGlow: 0xffe66d,
    ink: 0x2b3a4a,
    cloud: 0xffffff,
    rock: 0xb8c4cc,
    trunk: 0x9a6b45,
    bodyMain: 0x3d8bfd,
    bodyLight: 0xffffff,
    scarf: 0xff6f61,
    hills: 0x8fd6a8,
    hillsFar: 0xbfe8f7,
    confetti: [0xff6f61, 0xffd93b, 0x3d8bfd, 0x9b6ff0, 0x4fd6c2],
};

// Per-zone environment tints: foliage, ground, fog — progression you can feel.
const ZONE_TINTS = [
    { foliage: 0x66cc70, ground: 0x6fcf6f, fog: 0xbfe3fb, hills: 0x8fd6a8 }, // spring green
    { foliage: 0xf0a04b, ground: 0x9ccf6a, fog: 0xf7ddb8, hills: 0xe0b380 }, // autumn orange
    { foliage: 0x9b6ff0, ground: 0x86c98d, fog: 0xd8ccf5, hills: 0xb49ae0 }, // lavender
    { foliage: 0x35b7a8, ground: 0x5cb894, fog: 0xa8d8d8, hills: 0x6fbfb2 }, // teal dusk
    { foliage: 0xf2c14e, ground: 0xa8cf6f, fog: 0xf9e2b8, hills: 0xe8c070 }, // golden hour
];

// ---------------------------------------------------------------------------
// Tunables
// ---------------------------------------------------------------------------
const LANES = [-2.2, 0, 2.2];
const LANE_LERP_TIME = 0.15;      // seconds for a lane switch
const ZONE_LEN = 240;             // metres per company zone
const ZONE_COUNT = 5;
const FINISH_RUNWAY = 40;
const TOTAL_LEN = ZONE_LEN * ZONE_COUNT;
const SEG_LEN = 14;
const SEG_COUNT = 14;             // ~196m of live track
const SPAWN_AHEAD = 130;          // activate layout items this far ahead
const RECYCLE_BEHIND = 18;        // recycle once this far behind the player
const GRAVITY = -32;
const JUMP_V = 11.5;
const BASE_SPEED = 9;
const MAX_SPEED = 22;

export default {
    id: 'platformer',

    // ---------------------------------------------------------------------
    async init(ctx, data, opts) {
        this.ctx = ctx;
        this.opts = opts || {};
        this.reduceMotion = !!this.opts.reduceMotion;
        const engine = ctx.engine;
        this.engine = engine;
        this.tier = engine.tier || { tier: 'high', shadows: false, particleScale: 1 };

        // -- data -----------------------------------------------------------
        const companies = (data && data.companies ? data.companies.slice() : [])
            .sort((a, b) => ((a.years && a.years.from) || 0) - ((b.years && b.years.from) || 0));
        while (companies.length < ZONE_COUNT) {
            companies.push({ id: 'zone' + companies.length, name: 'Onward', role: '', period: '', blurb: '', skills: [] });
        }
        this.companies = companies.slice(0, ZONE_COUNT);
        this.skillById = {};
        (data && data.skills ? data.skills : []).forEach((s) => { this.skillById[s.id] = s; });

        // -- scene mood: our palette, not the site's ------------------------
        engine.scene.background = new THREE.Color(PAL.sky);
        engine.scene.fog = new THREE.Fog(PAL.fogBase, 42, 135);
        this.fogColor = new THREE.Color(PAL.fogBase);
        this.fogTarget = new THREE.Color(ZONE_TINTS[0].fog);

        // -- lights ---------------------------------------------------------
        this.ambient = new THREE.HemisphereLight(0xeaf6ff, 0x8fbf7a, 0.95);
        engine.scene.add(this.ambient);
        this.sunLight = new THREE.DirectionalLight(PAL.sun, 1.15);
        this.sunLight.position.set(14, 26, -18);
        if (this.tier.shadows) {
            this.sunLight.castShadow = true;
            this.sunLight.shadow.mapSize.set(1024, 1024);
            const cam = this.sunLight.shadow.camera;
            cam.left = -14; cam.right = 14; cam.top = 8; cam.bottom = -30;
            cam.near = 4; cam.far = 70;
        }
        engine.scene.add(this.sunLight);
        engine.scene.add(this.sunLight.target);
        this.sunLight.target.position.set(0, 0, -20);

        // -- shared geometries / materials ----------------------------------
        this._buildShared();
        // -- static sky dressing: sun sprite, gradient backdrop, hills, clouds
        this._buildSky();
        // -- the sliding world group ---------------------------------------
        this.track = new THREE.Group();
        engine.scene.add(this.track);
        this._buildSegments();
        this._buildGates();
        this._buildObstaclePool();
        this._buildOrbPool();
        this._buildParticlePool();
        this._buildConfettiPool();
        // -- the runner -----------------------------------------------------
        this._buildRunner();
        // -- camera ---------------------------------------------------------
        const camera = engine.camera;
        camera.fov = 55;
        camera.position.set(0, 4.4, 7.2);
        camera.lookAt(0, 1.4, -10);
        camera.updateProjectionMatrix();

        // -- DOM: style tag + chip stack + zone banner ----------------------
        this.container = ctx.hud.el.parentNode;
        this._buildDom();

        // -- input ----------------------------------------------------------
        ctx.input.attachTouchCluster('dpad-jump');
        this._offTap = ctx.input.onTap(() => { if (this.running && !this.paused) this._tryJump(); });
        this._prevInput = { left: false, right: false, jump: false, up: false };

        // -- run state ------------------------------------------------------
        this.running = false;
        this.paused = false;
        this._timers = new Set();
        this._resetRun();

        // -- main loop ------------------------------------------------------
        this._unsubUpdate = engine.onUpdate((dt) => this._update(dt));
    },

    start() {
        this.running = true;
        this.paused = false;
        this.ctx.hud.announce('Career Run started. Run through five companies, collect skill orbs.');
    },
    pause() { this.paused = true; },
    resume() { this.paused = false; },
    onThemeChange() { /* Career Run keeps its own palette — intentional no-op. */ },

    // ---------------------------------------------------------------------
    // Shared assets
    // ---------------------------------------------------------------------
    _buildShared() {
        const g = this.geo = {};
        const m = this.mat = {};

        g.ground = new THREE.PlaneGeometry(60, SEG_LEN);
        g.trackStrip = new THREE.PlaneGeometry(LANES[2] - LANES[0] + 2.4, SEG_LEN);
        g.laneLine = new THREE.PlaneGeometry(0.09, SEG_LEN);
        g.trunk = new THREE.CylinderGeometry(0.14, 0.2, 1, 6);
        g.coneS = new THREE.ConeGeometry(0.7, 1.5, 7);
        g.coneM = new THREE.ConeGeometry(1.0, 2.3, 7);
        g.coneL = new THREE.ConeGeometry(1.4, 3.2, 8);
        g.rock = new THREE.DodecahedronGeometry(0.55, 0);
        g.bush = new THREE.IcosahedronGeometry(0.5, 0);
        g.lowBar = new THREE.BoxGeometry(1.7, 0.85, 0.7);
        g.tallBlock = new THREE.BoxGeometry(1.7, 2.6, 0.9);
        g.orb = new THREE.IcosahedronGeometry(0.3, 0);
        g.gatePillar = new THREE.BoxGeometry(0.9, 5.2, 0.9);
        g.gateBeam = new THREE.BoxGeometry(9.6, 1.3, 0.9);
        g.body = new THREE.BoxGeometry(0.62, 0.8, 0.4);
        g.head = new THREE.SphereGeometry(0.26, 10, 8);
        g.limb = new THREE.BoxGeometry(0.16, 0.5, 0.16);
        g.scarf = new THREE.BoxGeometry(0.5, 0.14, 0.3);
        g.particle = new THREE.PlaneGeometry(1, 1);
        g.confetti = new THREE.PlaneGeometry(0.16, 0.24);

        const lam = (color, extra) => new THREE.MeshLambertMaterial(Object.assign({ color, flatShading: true }, extra || {}));
        m.track = lam(PAL.track);
        m.laneLine = new THREE.MeshBasicMaterial({ color: PAL.laneLine, transparent: true, opacity: 0.55 });
        m.trunk = lam(PAL.trunk);
        m.rock = lam(PAL.rock);
        m.lowBar = lam(PAL.obstacle);
        m.tallBlock = lam(PAL.obstacleTall);
        m.orb = new THREE.MeshLambertMaterial({ color: PAL.orb, emissive: 0xcc9900, flatShading: true });
        m.gate = lam(0xf5efe0);
        m.body = lam(PAL.bodyMain);
        m.bodyLight = lam(PAL.bodyLight);
        m.scarf = lam(PAL.scarf);
        m.limb = lam(0x2f6fd0);

        // per-zone tinted materials (foliage + ground), assigned on recycle
        m.zoneFoliage = ZONE_TINTS.map((z) => lam(z.foliage));
        m.zoneGround = ZONE_TINTS.map((z) => lam(z.ground));

        this._orbSpriteMat = new THREE.SpriteMaterial({ map: glowTexture(PAL.orbGlow), transparent: true, depthWrite: false, opacity: 0.9 });
        this._burstMat = new THREE.SpriteMaterial({ map: glowTexture(PAL.orb), transparent: true, depthWrite: false });
        this._dustMat = new THREE.SpriteMaterial({ map: glowTexture(0xd8c9a8), transparent: true, depthWrite: false });
    },

    _buildSky() {
        const scene = this.engine.scene;
        this.skyGroup = new THREE.Group();
        scene.add(this.skyGroup);

        // Gradient backdrop plane far ahead (azure -> pale horizon).
        const c = document.createElement('canvas');
        c.width = 4; c.height = 256;
        const cx = c.getContext('2d');
        const grad = cx.createLinearGradient(0, 0, 0, 256);
        grad.addColorStop(0, '#7ec8f7');
        grad.addColorStop(0.72, '#c9e8fb');
        grad.addColorStop(1, '#eaf6ff');
        cx.fillStyle = grad;
        cx.fillRect(0, 0, 4, 256);
        this._skyTex = new THREE.CanvasTexture(c);
        const backdrop = new THREE.Mesh(
            new THREE.PlaneGeometry(420, 150),
            new THREE.MeshBasicMaterial({ map: this._skyTex, fog: false, depthWrite: false })
        );
        backdrop.position.set(0, 42, -150);
        this.skyGroup.add(backdrop);

        // Distant hill silhouettes, two parallax bands drawn on canvases.
        this._hillMeshes = [];
        const mkHills = (color, h, z, y) => {
            const hc = document.createElement('canvas');
            hc.width = 512; hc.height = 96;
            const hx = hc.getContext('2d');
            hx.fillStyle = '#' + color.toString(16).padStart(6, '0');
            hx.beginPath();
            hx.moveTo(0, 96);
            for (let x = 0; x <= 512; x += 8) {
                const yy = 60 - Math.sin(x * 0.021) * 26 - Math.sin(x * 0.052 + 2) * 12;
                hx.lineTo(x, yy);
            }
            hx.lineTo(512, 96);
            hx.closePath();
            hx.fill();
            const tex = new THREE.CanvasTexture(hc);
            const mesh = new THREE.Mesh(
                new THREE.PlaneGeometry(360, h),
                new THREE.MeshBasicMaterial({ map: tex, transparent: true, fog: false, depthWrite: false })
            );
            mesh.position.set(0, y, z);
            this.skyGroup.add(mesh);
            this._hillMeshes.push(mesh);
            return mesh;
        };
        mkHills(PAL.hillsFar, 34, -148, 16);
        this._nearHills = mkHills(PAL.hills, 26, -146, 10);

        // Visible glowing sun.
        this.sunSprite = new THREE.Sprite(new THREE.SpriteMaterial({
            map: glowTexture(PAL.sunCore), transparent: true, fog: false, depthWrite: false, opacity: 0.95,
        }));
        this.sunSprite.scale.set(30, 30, 1);
        this.sunSprite.position.set(46, 52, -145);
        this.skyGroup.add(this.sunSprite);

        // Drifting clouds — soft white sprite blobs, pooled forever.
        this.clouds = [];
        const cloudMat = new THREE.SpriteMaterial({ map: glowTexture(PAL.cloud), transparent: true, fog: false, depthWrite: false, opacity: 0.85 });
        const count = this.tier.tier === 'low' ? 5 : 9;
        for (let i = 0; i < count; i++) {
            const grp = new THREE.Group();
            const blobs = 2 + (i % 2);
            for (let b = 0; b < blobs; b++) {
                const s = new THREE.Sprite(cloudMat);
                const sc = 7 + Math.random() * 6;
                s.scale.set(sc * 1.5, sc * 0.8, 1);
                s.position.set(b * 4 - blobs * 2, Math.random() * 1.4, 0);
                grp.add(s);
            }
            grp.position.set(-90 + Math.random() * 180, 26 + Math.random() * 16, -130 - Math.random() * 15);
            grp.userData.speed = 0.6 + Math.random() * 0.9;
            this.skyGroup.add(grp);
            this.clouds.push(grp);
        }
    },

    // ---------------------------------------------------------------------
    // Track segments + roadside props (pooled)
    // ---------------------------------------------------------------------
    _buildSegments() {
        this.segments = [];
        for (let i = 0; i < SEG_COUNT; i++) {
            const seg = new THREE.Group();
            const ground = new THREE.Mesh(this.geo.ground, this.mat.zoneGround[0]);
            ground.rotation.x = -Math.PI / 2;
            ground.position.y = -0.02;
            if (this.tier.shadows) ground.receiveShadow = true;
            seg.add(ground);
            seg.userData.ground = ground;

            const strip = new THREE.Mesh(this.geo.trackStrip, this.mat.track);
            strip.rotation.x = -Math.PI / 2;
            strip.position.y = 0;
            if (this.tier.shadows) strip.receiveShadow = true;
            seg.add(strip);

            [-1.1, 1.1].forEach((x) => {
                const line = new THREE.Mesh(this.geo.laneLine, this.mat.laneLine);
                line.rotation.x = -Math.PI / 2;
                line.position.set(x, 0.012, 0);
                seg.add(line);
            });

            // Roadside props: trees, rocks, bushes — randomized on recycle.
            seg.userData.props = [];
            const propCount = this.tier.tier === 'low' ? 4 : 7;
            for (let p = 0; p < propCount; p++) {
                const prop = this._makeProp();
                seg.add(prop.group);
                seg.userData.props.push(prop);
            }
            this.track.add(seg);
            this.segments.push(seg);
        }
    },

    _makeProp() {
        // A prop is a mini pool of variants; recycle shows exactly one.
        const group = new THREE.Group();
        const variants = {};

        const treeSizes = [[this.geo.coneS, 1.5, 0.55], [this.geo.coneM, 2.3, 0.75], [this.geo.coneL, 3.2, 1.0]];
        variants.trees = treeSizes.map(([cone, h, trunkH]) => {
            const t = new THREE.Group();
            const trunk = new THREE.Mesh(this.geo.trunk, this.mat.trunk);
            trunk.scale.y = trunkH;
            trunk.position.y = trunkH / 2;
            t.add(trunk);
            const foliage = new THREE.Mesh(cone, this.mat.zoneFoliage[0]);
            foliage.position.y = trunkH + h / 2 - 0.1;
            addEdges(foliage, PAL.ink, 0.14);
            if (this.tier.shadows) foliage.castShadow = true;
            t.add(foliage);
            t.userData.foliage = foliage;
            t.visible = false;
            group.add(t);
            return t;
        });

        const rock = new THREE.Mesh(this.geo.rock, this.mat.rock);
        rock.position.y = 0.3;
        addEdges(rock, PAL.ink, 0.16);
        rock.visible = false;
        group.add(rock);
        variants.rock = rock;

        const bush = new THREE.Mesh(this.geo.bush, this.mat.zoneFoliage[0]);
        bush.position.y = 0.32;
        addEdges(bush, PAL.ink, 0.14);
        bush.visible = false;
        group.add(bush);
        variants.bush = bush;

        return { group, variants };
    },

    _dressProp(prop, zone) {
        const v = prop.variants;
        v.trees.forEach((t) => { t.visible = false; });
        v.rock.visible = false;
        v.bush.visible = false;
        const side = Math.random() < 0.5 ? -1 : 1;
        const x = side * (5.5 + Math.random() * 12);
        const z = (Math.random() - 0.5) * (SEG_LEN - 2);
        prop.group.position.set(x, 0, z);
        prop.group.rotation.y = Math.random() * Math.PI * 2;
        const roll = Math.random();
        if (roll < 0.62) {
            const t = v.trees[Math.floor(Math.random() * v.trees.length)];
            t.visible = true;
            t.userData.foliage.material = this.mat.zoneFoliage[zone];
        } else if (roll < 0.8) {
            v.rock.visible = true;
            const s = 0.7 + Math.random() * 0.9;
            v.rock.scale.setScalar(s);
            v.rock.position.y = 0.3 * s;
        } else {
            v.bush.visible = true;
            v.bush.material = this.mat.zoneFoliage[zone];
        }
    },

    _placeSegment(seg, dist) {
        seg.userData.dist = dist;
        seg.position.z = -dist - SEG_LEN / 2;
        const zone = this._zoneAt(dist + SEG_LEN / 2);
        seg.userData.ground.material = this.mat.zoneGround[zone];
        seg.userData.props.forEach((p) => this._dressProp(p, zone));
    },

    // ---------------------------------------------------------------------
    // Gates (5 company arches + finish arch) — built once, fixed positions
    // ---------------------------------------------------------------------
    _buildGates() {
        this.gates = [];
        const mkGate = (label, sub, dist, isFinish) => {
            const gate = new THREE.Group();
            [-4.35, 4.35].forEach((x) => {
                const pillar = new THREE.Mesh(this.geo.gatePillar, this.mat.gate);
                pillar.position.set(x, 2.6, 0);
                addEdges(pillar, PAL.ink, 0.22);
                if (this.tier.shadows) pillar.castShadow = true;
                gate.add(pillar);
            });
            const beam = new THREE.Mesh(this.geo.gateBeam, this.mat.gate);
            beam.position.set(0, 5.4, 0);
            addEdges(beam, PAL.ink, 0.22);
            gate.add(beam);

            // Big readable CanvasTexture name on the beam.
            const c = document.createElement('canvas');
            c.width = 1024; c.height = 160;
            const cx = c.getContext('2d');
            cx.fillStyle = isFinish ? '#ffd93b' : '#ffffff';
            cx.fillRect(0, 0, 1024, 160);
            cx.fillStyle = '#2b3a4a';
            cx.font = '700 ' + (label.length > 16 ? 74 : 92) + 'px system-ui, sans-serif';
            cx.textAlign = 'center';
            cx.textBaseline = 'middle';
            cx.fillText(label, 512, sub ? 62 : 80);
            if (sub) {
                cx.font = '600 40px system-ui, sans-serif';
                cx.fillStyle = '#6b7a8c';
                cx.fillText(sub, 512, 124);
            }
            const tex = new THREE.CanvasTexture(c);
            tex.anisotropy = 4;
            const sign = new THREE.Mesh(
                new THREE.PlaneGeometry(9.2, 1.44),
                new THREE.MeshBasicMaterial({ map: tex, transparent: false })
            );
            sign.position.set(0, 5.4, 0.47);
            gate.add(sign);

            gate.position.z = -dist;
            gate.userData.dist = dist;
            this.track.add(gate);
            this.gates.push(gate);
        };

        this.companies.forEach((co, i) => {
            mkGate(co.name || 'Chapter ' + (i + 1), co.period || '', i * ZONE_LEN + 18, false);
        });
        mkGate('FINISH', '7+ years, one run', TOTAL_LEN + 18, true);
        this.finishDist = TOTAL_LEN + 18;
    },

    // ---------------------------------------------------------------------
    // Obstacles + orbs: precomputed layout, pooled meshes
    // ---------------------------------------------------------------------
    _buildObstaclePool() {
        this.obstaclePool = [];
        for (let i = 0; i < 16; i++) {
            const low = new THREE.Mesh(this.geo.lowBar, this.mat.lowBar);
            addEdges(low, PAL.ink, 0.3);
            const tall = new THREE.Mesh(this.geo.tallBlock, this.mat.tallBlock);
            addEdges(tall, PAL.ink, 0.3);
            if (this.tier.shadows) { low.castShadow = true; tall.castShadow = true; }
            const grp = new THREE.Group();
            low.visible = false; tall.visible = false;
            grp.add(low); grp.add(tall);
            grp.visible = false;
            this.track.add(grp);
            this.obstaclePool.push({ group: grp, low, tall, item: null });
        }
    },

    _buildOrbPool() {
        this.orbPool = [];
        for (let i = 0; i < 34; i++) {
            const grp = new THREE.Group();
            const core = new THREE.Mesh(this.geo.orb, this.mat.orb);
            addEdges(core, 0xaa7700, 0.35);
            grp.add(core);
            const glow = new THREE.Sprite(this._orbSpriteMat);
            glow.scale.set(1.35, 1.35, 1);
            grp.add(glow);
            grp.visible = false;
            this.track.add(grp);
            this.orbPool.push({ group: grp, core, item: null, spin: Math.random() * Math.PI * 2 });
        }
    },

    _buildParticlePool() {
        const count = Math.round(48 * (this.tier.particleScale || 1));
        this.particles = [];
        for (let i = 0; i < Math.max(count, 16); i++) {
            const s = new THREE.Sprite(this._burstMat);
            s.visible = false;
            this.engine.scene.add(s);
            this.particles.push({ sprite: s, life: 0, vel: new THREE.Vector3() });
        }
        this._pIndex = 0;
    },

    _buildConfettiPool() {
        const count = Math.round(70 * (this.tier.particleScale || 1));
        this.confetti = [];
        for (let i = 0; i < count; i++) {
            const mat = new THREE.MeshBasicMaterial({
                color: PAL.confetti[i % PAL.confetti.length], side: THREE.DoubleSide,
            });
            const mesh = new THREE.Mesh(this.geo.confetti, mat);
            mesh.visible = false;
            this.engine.scene.add(mesh);
            this.confetti.push({ mesh, life: 0, vel: new THREE.Vector3(), rot: new THREE.Vector3() });
        }
    },

    _burst(pos, mat, n, spread, up) {
        for (let i = 0; i < n; i++) {
            const p = this.particles[this._pIndex];
            this._pIndex = (this._pIndex + 1) % this.particles.length;
            p.sprite.material = mat;
            p.sprite.position.copy(pos);
            p.sprite.scale.setScalar(0.3 + Math.random() * 0.35);
            p.sprite.visible = true;
            p.life = 0.45 + Math.random() * 0.25;
            p.maxLife = p.life;
            p.vel.set((Math.random() - 0.5) * spread, up + Math.random() * 2.2, (Math.random() - 0.5) * spread);
        }
    },

    // Precompute the entire run layout: obstacles + orbs by track distance.
    _generateLayout() {
        this.layout = { obstacles: [], orbs: [] };
        let d = 42;
        let orbSerial = 0;
        while (d < TOTAL_LEN - 20) {
            const zone = this._zoneAt(d);
            const speedAt = Math.min(MAX_SPEED, BASE_SPEED + (d / TOTAL_LEN) * (MAX_SPEED - BASE_SPEED));
            const gap = speedAt * (0.85 + Math.random() * 0.5); // breathing room scales with speed
            const skills = this.companies[zone].skills || [];
            const skillFor = () => {
                const id = skills.length ? skills[orbSerial % skills.length] : null;
                orbSerial++;
                return id && this.skillById[id] ? this.skillById[id] : { label: 'Experience', fact: '' };
            };
            const roll = Math.random();
            if (roll < 0.34) {
                // Obstacle row: block 1 or 2 lanes, never 3.
                const lanes = [0, 1, 2];
                const blockCount = Math.random() < 0.4 ? 2 : 1;
                for (let b = 0; b < blockCount; b++) {
                    const li = lanes.splice(Math.floor(Math.random() * lanes.length), 1)[0];
                    this.layout.obstacles.push({ dist: d, lane: li, tall: Math.random() < 0.45, hit: false, mesh: null });
                }
                d += gap;
            } else if (roll < 0.58) {
                // Straight orb trail in one lane.
                const lane = Math.floor(Math.random() * 3);
                const n = 4 + Math.floor(Math.random() * 3);
                for (let i = 0; i < n; i++) {
                    this.layout.orbs.push({ dist: d + i * 2.4, lane, y: 1.0, skill: skillFor(), taken: false, mesh: null });
                }
                d += n * 2.4 + gap * 0.7;
            } else if (roll < 0.74) {
                // Jump arc of orbs over a low barrier — the fun combo.
                const lane = Math.floor(Math.random() * 3);
                this.layout.obstacles.push({ dist: d + 4.8, lane, tall: false, hit: false, mesh: null });
                for (let i = 0; i < 5; i++) {
                    const t = i / 4;
                    this.layout.orbs.push({
                        dist: d + 1.6 + t * 6.4, lane,
                        y: 1.0 + Math.sin(t * Math.PI) * 1.5,
                        skill: skillFor(), taken: false, mesh: null,
                    });
                }
                d += 8 + gap * 0.8;
            } else if (roll < 0.9) {
                // Tall block + orb trail in a neighbouring lane (steer to collect).
                const blockLane = Math.floor(Math.random() * 3);
                const orbLane = blockLane === 1 ? (Math.random() < 0.5 ? 0 : 2) : 1;
                this.layout.obstacles.push({ dist: d + 3, lane: blockLane, tall: true, hit: false, mesh: null });
                for (let i = 0; i < 4; i++) {
                    this.layout.orbs.push({ dist: d + i * 2.4, lane: orbLane, y: 1.0, skill: skillFor(), taken: false, mesh: null });
                }
                d += 9.6 + gap * 0.7;
            } else {
                d += gap * 0.8; // a quiet stretch
            }
        }
        this.layout.obstacles.sort((a, b) => a.dist - b.dist);
        this.layout.orbs.sort((a, b) => a.dist - b.dist);
        this.totalOrbs = this.layout.orbs.length;
        this._obCursor = 0;
        this._orbCursor = 0;
    },

    // ---------------------------------------------------------------------
    // Runner character
    // ---------------------------------------------------------------------
    _buildRunner() {
        const p = this.player = new THREE.Group();
        const rig = this.rig = new THREE.Group();
        p.add(rig);

        const body = new THREE.Mesh(this.geo.body, this.mat.body);
        body.position.y = 0.85;
        addEdges(body, PAL.ink, 0.25);
        rig.add(body);
        this.body = body;

        const head = new THREE.Mesh(this.geo.head, this.mat.bodyLight);
        head.position.y = 1.5;
        rig.add(head);
        this.head = head;

        const scarf = new THREE.Mesh(this.geo.scarf, this.mat.scarf);
        scarf.position.set(0, 1.26, 0.05);
        rig.add(scarf);
        const scarfTail = new THREE.Mesh(this.geo.scarf, this.mat.scarf);
        scarfTail.scale.set(0.6, 0.7, 1.6);
        scarfTail.position.set(0.1, 1.22, 0.32);
        rig.add(scarfTail);
        this.scarfTail = scarfTail;

        this.armL = new THREE.Mesh(this.geo.limb, this.mat.limb);
        this.armL.position.set(-0.42, 1.0, 0);
        rig.add(this.armL);
        this.armR = new THREE.Mesh(this.geo.limb, this.mat.limb);
        this.armR.position.set(0.42, 1.0, 0);
        rig.add(this.armR);
        this.legL = new THREE.Mesh(this.geo.limb, this.mat.limb);
        this.legL.position.set(-0.16, 0.28, 0);
        rig.add(this.legL);
        this.legR = new THREE.Mesh(this.geo.limb, this.mat.limb);
        this.legR.position.set(0.16, 0.28, 0);
        rig.add(this.legR);

        if (this.tier.shadows) {
            body.castShadow = true;
            head.castShadow = true;
        } else {
            this.blobShadow = makeContactShadow(0.7);
            this.blobShadow.position.y = 0.015;
            this.player.add(this.blobShadow);
        }
        this.engine.scene.add(p);
        this._flashables = [body, head, scarf, scarfTail, this.armL, this.armR, this.legL, this.legR];
    },

    // ---------------------------------------------------------------------
    // DOM overlays: style tag, skill chips (stack of 3), company banner
    // ---------------------------------------------------------------------
    _buildDom() {
        this.styleTag = document.createElement('style');
        this.styleTag.textContent = [
            '.crun-chips{position:absolute;top:14%;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;gap:6px;align-items:center;pointer-events:none;z-index:30;}',
            '.crun-chip{background:rgba(43,58,74,0.88);color:#ffd93b;font:600 13px/1 system-ui,sans-serif;padding:8px 14px;border-radius:999px;opacity:0;transform:translateY(-10px) scale(0.9);transition:opacity .18s ease,transform .22s cubic-bezier(.34,1.56,.64,1);white-space:nowrap;box-shadow:0 4px 14px rgba(0,0,0,.18);}',
            '.crun-chip--in{opacity:1;transform:translateY(0) scale(1);}',
            '.crun-banner{position:absolute;top:22%;right:0;max-width:min(320px,72%);background:rgba(255,255,255,0.94);border-left:4px solid #3d8bfd;border-radius:12px 0 0 12px;padding:12px 16px;font-family:system-ui,sans-serif;color:#2b3a4a;transform:translateX(110%);transition:transform .35s cubic-bezier(.22,1,.36,1);pointer-events:none;z-index:29;box-shadow:0 6px 20px rgba(0,0,0,.15);}',
            '.crun-banner--in{transform:translateX(0);}',
            '.crun-banner h4{margin:0 0 2px;font-size:15px;font-weight:700;}',
            '.crun-banner .crun-role{font-size:12px;font-weight:600;color:#3d8bfd;margin:0 0 2px;}',
            '.crun-banner .crun-period{font-size:11px;color:#6b7a8c;margin:0 0 6px;}',
            '.crun-banner p{margin:0;font-size:12px;line-height:1.45;color:#44556a;}',
        ].join('\n');
        document.head.appendChild(this.styleTag);

        this.chipStack = document.createElement('div');
        this.chipStack.className = 'crun-chips';
        this.container.appendChild(this.chipStack);

        this.banner = document.createElement('div');
        this.banner.className = 'crun-banner';
        this.container.appendChild(this.banner);
        this._bannerTimer = null;
    },

    _showChip(text) {
        const chip = document.createElement('div');
        chip.className = 'crun-chip';
        chip.textContent = '✦ ' + text;
        while (this.chipStack.children.length >= 3) {
            this.chipStack.removeChild(this.chipStack.firstChild);
        }
        this.chipStack.appendChild(chip);
        requestAnimationFrame(() => chip.classList.add('crun-chip--in'));
        const t = setTimeout(() => {
            this._timers.delete(t);
            chip.classList.remove('crun-chip--in');
            const t2 = setTimeout(() => {
                this._timers.delete(t2);
                if (chip.parentNode) chip.parentNode.removeChild(chip);
            }, 240);
            this._timers.add(t2);
        }, 1800);
        this._timers.add(t);
    },

    _showBanner(co) {
        if (this._bannerTimer) { clearTimeout(this._bannerTimer); this._timers.delete(this._bannerTimer); }
        this.banner.innerHTML =
            '<h4>' + (co.name || '') + '</h4>' +
            (co.role ? '<p class="crun-role">' + co.role + '</p>' : '') +
            (co.period ? '<p class="crun-period">' + co.period + '</p>' : '') +
            (co.blurb ? '<p>' + co.blurb + '</p>' : '');
        this.banner.classList.remove('crun-banner--in');
        requestAnimationFrame(() => this.banner.classList.add('crun-banner--in'));
        this._bannerTimer = setTimeout(() => {
            this._timers.delete(this._bannerTimer);
            this._bannerTimer = null;
            this.banner.classList.remove('crun-banner--in');
        }, 4000);
        this._timers.add(this._bannerTimer);
    },

    // ---------------------------------------------------------------------
    // Run state
    // ---------------------------------------------------------------------
    _resetRun() {
        this.traveled = 0;
        this.speed = BASE_SPEED;
        this.lane = 1;
        this.laneX = LANES[1];
        this.laneFrom = LANES[1];
        this.laneTo = LANES[1];
        this.laneT = 1;
        this.py = 0;
        this.vy = 0;
        this.grounded = true;
        this.runTimer = 0;
        this.stumble = 0;
        this.flashTimer = 0;
        this.shake = 0;
        this.finished = false;
        this.finishing = false;
        this.collected = 0;
        this.skillsGathered = new Set();
        this.currentZone = -1;
        this._nextGate = 0;
        this._hudTick = 0;
        this._confettiFired = false;

        this._generateLayout();

        // park all pooled meshes
        this.obstaclePool.forEach((o) => { o.group.visible = false; o.item = null; });
        this.orbPool.forEach((o) => { o.group.visible = false; if (o.item) o.item.mesh = null; o.item = null; });
        this.particles.forEach((p) => { p.life = 0; p.sprite.visible = false; });
        this.confetti.forEach((c) => { c.life = 0; c.mesh.visible = false; });

        // lay segments fresh from d=0
        this.segments.forEach((seg, i) => this._placeSegment(seg, i * SEG_LEN));
        this.track.position.z = 0;

        this.player.position.set(LANES[1], 0, 0);
        this.rig.rotation.set(0, 0, 0);
        this.rig.scale.set(1, 1, 1);

        this.fogTarget.setHex(ZONE_TINTS[0].fog);
        this._enterZone(0, true);
        this._updateHudCounts(true);
    },

    _zoneAt(dist) {
        return Math.max(0, Math.min(ZONE_COUNT - 1, Math.floor(dist / ZONE_LEN)));
    },

    _enterZone(zone, silent) {
        if (zone === this.currentZone) return;
        this.currentZone = zone;
        const co = this.companies[zone];
        this.fogTarget.setHex(ZONE_TINTS[zone].fog);
        if (this._nearHills) this._nearHills.material.color = new THREE.Color(ZONE_TINTS[zone].hills);
        this.ctx.hud.setTopLeft(
            '<strong>' + (co.name || '') + '</strong>' +
            (co.period ? ' &middot; ' + co.period : '')
        );
        if (!silent) {
            this._showBanner(co);
            this.ctx.hud.announce('Entering ' + co.name + ', ' + (co.period || ''));
        }
    },

    _updateHudCounts(force) {
        this._hudTick -= 1;
        if (!force && this._hudTick > 0) return;
        this._hudTick = 8; // ~every 8 frames
        this.ctx.hud.setTopRight(
            '✦ ' + this.collected + '/' + this.totalOrbs +
            ' &nbsp; ' + Math.floor(this.traveled) + 'm'
        );
    },

    _tryJump() {
        if (this.grounded && !this.finished) {
            this.vy = JUMP_V;
            this.grounded = false;
            this._jumpSquash = 0.14; // anticipation squash window
        }
    },

    _switchLane(dir) {
        const next = Math.max(0, Math.min(2, this.lane + dir));
        if (next === this.lane) return;
        this.lane = next;
        this.laneFrom = this.laneX;
        this.laneTo = LANES[next];
        this.laneT = 0;
    },

    // ---------------------------------------------------------------------
    // Frame update
    // ---------------------------------------------------------------------
    _update(dt) {
        if (!this.running || this.paused) return;
        const input = this.ctx.input.state;

        // --- edge-triggered controls -------------------------------------
        if (input.left && !this._prevInput.left) this._switchLane(-1);
        if (input.right && !this._prevInput.right) this._switchLane(1);
        if ((input.jump && !this._prevInput.jump) || (input.up && !this._prevInput.up)) this._tryJump();
        this._prevInput.left = input.left;
        this._prevInput.right = input.right;
        this._prevInput.jump = input.jump;
        this._prevInput.up = input.up;

        // --- speed ramp + stumble + finish slow-down ----------------------
        const targetSpeed = Math.min(MAX_SPEED, BASE_SPEED + (this.traveled / TOTAL_LEN) * (MAX_SPEED - BASE_SPEED));
        let speedMult = 1;
        if (this.stumble > 0) {
            this.stumble = Math.max(0, this.stumble - dt);
            speedMult = 0.3 + 0.7 * (1 - this.stumble / 1.0);
        }
        if (this.finishing) {
            this.speed = Math.max(0, this.speed - dt * 9);
            if (this.speed <= 0.05 && !this.finished) this._endRun();
        } else {
            this.speed += (targetSpeed * speedMult - this.speed) * Math.min(1, dt * 4);
        }
        this.traveled += this.speed * dt;
        this.track.position.z = this.traveled;

        // --- fog blend toward zone tint -----------------------------------
        this.fogColor.lerp(this.fogTarget, Math.min(1, dt * 0.8));
        this.engine.scene.fog.color.copy(this.fogColor);

        // --- zone / gate crossings ----------------------------------------
        const zone = this._zoneAt(this.traveled);
        while (this._nextGate < this.gates.length && this.traveled >= this.gates[this._nextGate].userData.dist) {
            const gi = this._nextGate++;
            if (gi < ZONE_COUNT) {
                this._enterZone(gi, gi === 0 && this.traveled < 30);
            } else if (!this.finishing && !this.finished) {
                this.finishing = true;
                this._fireConfetti();
                this.ctx.hud.announce('Finish! You ran the whole career.');
            }
        }
        if (zone !== this.currentZone && !this.finishing) this._enterZone(zone);

        // --- lane lerp + banking ------------------------------------------
        if (this.laneT < 1) {
            this.laneT = Math.min(1, this.laneT + dt / LANE_LERP_TIME);
            const e = this.laneT * this.laneT * (3 - 2 * this.laneT); // smoothstep
            this.laneX = this.laneFrom + (this.laneTo - this.laneFrom) * e;
        }
        const bank = (this.laneTo - this.laneX) * -0.28;

        // --- jump physics + squash/stretch --------------------------------
        if (!this.grounded) {
            this.vy += GRAVITY * dt;
            this.py += this.vy * dt;
            if (this.py <= 0) {
                this.py = 0;
                this.vy = 0;
                this.grounded = true;
                this._landSquash = 0.16;
                this._burst(new THREE.Vector3(this.laneX, 0.12, 0.2), this._dustMat,
                    Math.round(6 * (this.tier.particleScale || 1)), 2.4, 0.6);
            }
        }
        let sy = 1, sxz = 1;
        if (this._jumpSquash > 0) {
            this._jumpSquash -= dt;
            sy = 1.12; sxz = 0.92; // stretch on launch
        }
        if (this._landSquash > 0) {
            this._landSquash -= dt;
            sy = 0.82; sxz = 1.14; // squash on landing
        }
        this.rig.scale.set(sxz, sy, sxz);

        // --- run cycle animation ------------------------------------------
        this.runTimer += dt * (4 + this.speed * 0.55);
        const c = Math.sin(this.runTimer * Math.PI);
        const bob = this.grounded ? Math.abs(c) * 0.09 : 0;
        const airPose = this.grounded ? 0 : 1;
        this.player.position.set(this.laneX, this.py, 0);
        this.rig.position.y = bob;
        this.rig.rotation.z = bank + (this.grounded ? c * 0.05 : 0);
        this.rig.rotation.x = -0.1 - (this.speed / MAX_SPEED) * 0.14 + airPose * -0.12; // lean grows with speed
        this.rig.rotation.y = Math.PI; // face into the screen
        const swing = c * (this.grounded ? 0.9 : 0.3);
        this.armL.rotation.x = swing + airPose * 0.8;
        this.armR.rotation.x = -swing + airPose * 0.8;
        this.legL.rotation.x = -swing + airPose * -0.5;
        this.legR.rotation.x = swing + airPose * -0.3;
        this.scarfTail.rotation.x = 0.25 + Math.sin(this.runTimer * Math.PI * 0.7) * 0.2 + (this.speed / MAX_SPEED) * 0.4;
        if (this.blobShadow) {
            this.blobShadow.position.y = 0.015 - this.py; // keep on ground plane
            const sh = Math.max(0.35, 1 - this.py * 0.32);
            this.blobShadow.scale.set(sh, sh, sh);
        }

        // --- stumble flash -------------------------------------------------
        if (this.flashTimer > 0) {
            this.flashTimer -= dt;
            const on = Math.floor(this.flashTimer * 14) % 2 === 0;
            this._flashables.forEach((mesh) => { mesh.visible = on; });
            if (this.flashTimer <= 0) this._flashables.forEach((mesh) => { mesh.visible = true; });
        }

        // --- recycle segments ---------------------------------------------
        this.segments.forEach((seg) => {
            if (seg.userData.dist + SEG_LEN < this.traveled - RECYCLE_BEHIND) {
                this._placeSegment(seg, seg.userData.dist + SEG_COUNT * SEG_LEN);
            }
        });

        // --- activate layout items entering range -------------------------
        this._activateAhead();

        // --- animate + collide orbs ---------------------------------------
        this._updateOrbs(dt);
        this._updateObstacles();

        // --- particles / confetti / sky -----------------------------------
        this._updateParticles(dt);
        this._updateConfetti(dt);
        if (!this.reduceMotion) {
            this.clouds.forEach((cl) => {
                cl.position.x += cl.userData.speed * dt;
                if (cl.position.x > 110) cl.position.x = -110;
            });
            const pulse = 1 + Math.sin(this.runTimer * 0.35) * 0.03;
            this.sunSprite.scale.set(30 * pulse, 30 * pulse, 1);
        }

        // --- camera chase --------------------------------------------------
        this._updateCamera(dt);
        this._updateHudCounts(false);
    },

    _activateAhead() {
        const horizon = this.traveled + SPAWN_AHEAD;
        // obstacles
        while (this._obCursor < this.layout.obstacles.length && this.layout.obstacles[this._obCursor].dist < horizon) {
            const item = this.layout.obstacles[this._obCursor++];
            const slot = this.obstaclePool.find((o) => !o.item);
            if (!slot) break;
            slot.item = item;
            item.mesh = slot;
            slot.low.visible = !item.tall;
            slot.tall.visible = item.tall;
            slot.low.position.y = 0.425;
            slot.tall.position.y = 1.3;
            slot.group.position.set(LANES[item.lane], 0, -item.dist);
            slot.group.visible = true;
        }
        // orbs
        while (this._orbCursor < this.layout.orbs.length && this.layout.orbs[this._orbCursor].dist < horizon) {
            const item = this.layout.orbs[this._orbCursor++];
            const slot = this.orbPool.find((o) => !o.item);
            if (!slot) break;
            slot.item = item;
            item.mesh = slot;
            slot.group.position.set(LANES[item.lane], item.y, -item.dist);
            slot.group.scale.setScalar(1);
            slot.group.visible = true;
        }
    },

    _updateOrbs(dt) {
        this.orbPool.forEach((slot) => {
            const item = slot.item;
            if (!item) return;
            // recycle behind
            if (item.dist < this.traveled - RECYCLE_BEHIND) {
                slot.group.visible = false;
                item.mesh = null;
                slot.item = null;
                return;
            }
            slot.spin += dt * 2.4;
            slot.core.rotation.y = slot.spin;
            slot.group.position.y = item.y + Math.sin(slot.spin * 1.3) * 0.08;
            if (item.taken) {
                // absorb pop: scale up then vanish
                const s = slot.group.scale.x + dt * 9;
                if (s > 1.9) {
                    slot.group.visible = false;
                    item.mesh = null;
                    slot.item = null;
                } else {
                    slot.group.scale.setScalar(s);
                }
                return;
            }
            // collect check
            const dz = item.dist - this.traveled;
            if (Math.abs(dz) < 0.85 && item.lane === this.lane &&
                Math.abs((this.py + 1.0) - item.y) < 1.15) {
                item.taken = true;
                this.collected++;
                if (item.skill && item.skill.label) {
                    this.skillsGathered.add(item.skill.label);
                    this._showChip(item.skill.label);
                }
                this._burst(new THREE.Vector3(LANES[item.lane], item.y, -dz), this._burstMat,
                    Math.round(8 * (this.tier.particleScale || 1)), 3, 1.4);
                this._updateHudCounts(true);
            }
        });
    },

    _updateObstacles() {
        this.obstaclePool.forEach((slot) => {
            const item = slot.item;
            if (!item) return;
            if (item.dist < this.traveled - RECYCLE_BEHIND) {
                slot.group.visible = false;
                item.mesh = null;
                slot.item = null;
                return;
            }
            if (item.hit) return;
            const dz = item.dist - this.traveled;
            if (Math.abs(dz) < 0.75 && item.lane === this.lane) {
                const clears = !item.tall && this.py > 0.72;
                if (!clears) {
                    item.hit = true;
                    this._doStumble();
                }
            }
        });
    },

    _doStumble() {
        this.stumble = 1.0;
        this.flashTimer = 0.6;
        if (!this.reduceMotion) this.shake = 0.2;
        this._burst(new THREE.Vector3(this.laneX, 0.6, 0), this._dustMat,
            Math.round(10 * (this.tier.particleScale || 1)), 3.5, 1.2);
        this.ctx.hud.announce('Stumbled! Keep running.');
    },

    _updateParticles(dt) {
        this.particles.forEach((p) => {
            if (p.life <= 0) return;
            p.life -= dt;
            if (p.life <= 0) { p.sprite.visible = false; return; }
            p.vel.y -= 6 * dt;
            p.sprite.position.addScaledVector(p.vel, dt);
            p.sprite.material.opacity = Math.max(0, p.life / p.maxLife);
            p.sprite.scale.multiplyScalar(1 - dt * 1.2);
        });
    },

    _fireConfetti() {
        this._confettiFired = true;
        this.confetti.forEach((c) => {
            c.life = 1.6 + Math.random() * 1.2;
            c.mesh.visible = true;
            c.mesh.position.set((Math.random() - 0.5) * 8, 4 + Math.random() * 3, -6 - Math.random() * 4);
            c.vel.set((Math.random() - 0.5) * 4, 2 + Math.random() * 4, (Math.random() - 0.3) * 3);
            c.rot.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);
        });
    },

    _updateConfetti(dt) {
        this.confetti.forEach((c) => {
            if (c.life <= 0) return;
            c.life -= dt;
            if (c.life <= 0) { c.mesh.visible = false; return; }
            c.vel.y -= 7 * dt;
            c.mesh.position.addScaledVector(c.vel, dt);
            c.mesh.rotation.x += c.rot.x * dt;
            c.mesh.rotation.y += c.rot.y * dt;
            c.mesh.rotation.z += c.rot.z * dt;
        });
    },

    _updateCamera(dt) {
        const cam = this.engine.camera;
        // shake decay
        let sx = 0, sy = 0;
        if (this.shake > 0) {
            this.shake = Math.max(0, this.shake - dt);
            const a = this.shake * 0.9;
            sx = (Math.random() - 0.5) * a;
            sy = (Math.random() - 0.5) * a;
        }
        const idle = this.reduceMotion ? 0 : Math.sin(this.runTimer * 0.5) * 0.05;
        const tx = this.laneX * 0.42 + sx + idle;
        const ty = 4.4 + this.py * 0.25 + sy;
        const k = Math.min(1, dt * 5);
        cam.position.x += (tx - cam.position.x) * k;
        cam.position.y += (ty - cam.position.y) * k;
        cam.position.z = 7.2;
        cam.lookAt(this.laneX * 0.7, 1.3 + this.py * 0.3, -9);
        const targetFov = 55 + (this.speed / MAX_SPEED) * 7;
        if (Math.abs(cam.fov - targetFov) > 0.05) {
            cam.fov += (targetFov - cam.fov) * Math.min(1, dt * 3);
            cam.updateProjectionMatrix();
        }
    },

    // ---------------------------------------------------------------------
    // Finish + recap + restart
    // ---------------------------------------------------------------------
    _endRun() {
        this.finished = true;
        const skills = Array.from(this.skillsGathered);
        const self = this;
        infoCard(this.container, {
            subtitle: 'Run complete',
            title: 'You just ran through 7+ years',
            body: 'Distance: ' + Math.floor(this.traveled) + 'm across ' + ZONE_COUNT +
                ' companies. Skill orbs: ' + this.collected + '/' + this.totalOrbs +
                '. Close this card to run again.',
            tags: skills,
            ctaLabel: 'See full experience',
            onCta() { window.location.hash = 'experience'; },
        }, {
            onClose() {
                self._resetRun();
                toast(self.container, 'Fresh track laid — run again!');
            },
        });
        this.ctx.hud.announce('Run complete. ' + this.collected + ' of ' + this.totalOrbs + ' skill orbs collected.');
    },

    // ---------------------------------------------------------------------
    dispose() {
        if (this._unsubUpdate) this._unsubUpdate();
        if (this._offTap) this._offTap();
        this._timers.forEach((t) => clearTimeout(t));
        this._timers.clear();
        if (this._bannerTimer) clearTimeout(this._bannerTimer);
        [this.chipStack, this.banner].forEach((el) => {
            if (el && el.parentNode) el.parentNode.removeChild(el);
        });
        if (this.styleTag && this.styleTag.parentNode) this.styleTag.parentNode.removeChild(this.styleTag);
        // engine.dispose() traverses the scene and frees geometries/materials/renderer.
    },
};
