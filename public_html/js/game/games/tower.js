// tower.js — "Stack the Stack" v2: a joyful arcade block stacker.
//
// Every block is a real technology from data.skills, stacked bottom-to-top by
// group (db -> backend -> frontend -> devops -> craft -> leadership). The game
// has its OWN vivid arcade-sunset palette (it deliberately does NOT follow the
// site's beige/gold theme tokens — onThemeChange is a no-op) and its own
// fairness model: there is no fail state, the only ending is victory with all
// skills placed. Score (perfects, combos) differentiates run quality.
//
// Fairness model (why v1 died at height ~7 and this one doesn't):
//   - slide range proportional to the CURRENT footprint, slow speed, tiny ramp
//   - generous perfect window (10% of extent) with a small grow-back reward
//   - min-overlap floor of 40% of the current extent — a miss can never chop
//     more than 60%, and repeated misses converge instead of collapsing
//   - completing a skill group restores the footprint 15% toward base size

import * as THREE from 'three';
import { addEdges, glowTexture } from '../core/theme.js';
import { infoCard, toast } from '../core/ui.js';

// ------------------------------------------------------------------ constants

const GROUP_ORDER = ['db', 'backend', 'frontend', 'devops', 'craft', 'leadership'];

// Same family as Career Constellation's night-sky palette (PAL in world.js) —
// cyan / green / magenta / purple / rose / gold accents on a deep indigo
// backdrop, so the two games read as one connected game suite.
const GROUP_META = {
    db:         { label: 'Databases',  color: 0x3fe0f0 }, // accentCyan
    backend:    { label: 'Backend',    color: 0x5fe89a }, // accentGreen
    frontend:   { label: 'Frontend',   color: 0xf05fd0 }, // accentMagenta
    devops:     { label: 'DevOps',     color: 0x9d7bff }, // accentPurple
    craft:      { label: 'Craft',      color: 0xc75b74 }, // roof rose
    leadership: { label: 'Leadership', color: 0xffc857 }, // accentGold
};
const FALLBACK_GROUP = { label: 'Stack', color: 0x3fe0f0 };

// Deep indigo night sky, matching Career Constellation's bg/fog exactly —
// a faint lift toward nebula-purple near the top instead of a hard flat
// color, so climbing the tower still feels like it's going somewhere.
const SKY_LOW = new THREE.Color(0x12123f);
const SKY_HIGH = new THREE.Color(0x2a2160);
const FOG_LOW = new THREE.Color(0x12123f);
const FOG_HIGH = new THREE.Color(0x241c50);

const BEST_KEY = 'game.tower.best';

// --- block geometry / fairness tuning -------------------------------------
// Goal: an average player finishes all ~21 skills with footprint comfortably
// above the floor. Worst case math: a full miss shrinks to 40% but every
// group completion (6 groups over 21 blocks) restores +15% toward base, and
// any perfect grows +8% of base back. There is NO end-by-narrowing: the run
// only ends at victory, these constants only shape how tense it feels.
const BLOCK_HEIGHT = 0.42;
const BASE_SIZE = 1.6;
const PERFECT_WINDOW = 0.10;   // |offset| <= 10% of extent => perfect
const PERFECT_GROWBACK = 0.08; // perfect adds 8% of BASE_SIZE, capped at base
const MIN_OVERLAP_RATIO = 0.40; // a miss never keeps less than 40% of extent
const MIN_EXTENT_ABS = 0.3;    // hard floor — blocks never shrink below this
const GROUP_BONUS = 0.15;      // group complete: +15% toward base, both axes
const SLIDE_RANGE_FACTOR = 0.75; // halfRange = max(extent * this, 0.5)
const SLIDE_RANGE_MIN = 0.5;
const SPEED_BASE = 0.85;       // radians/sec of the sine slide phase
const SPEED_RAMP = 0.012;      // per placed block
const SPEED_CAP = 1.45;        // very gentle cap — fairness first

const DROP_COOLDOWN_MS = 100;

const PLAZA_RADIUS = 3.5; // small warm plaza disc, not a huge plane

const STATS = [
    '7+ years of experience',
    '100+ projects delivered',
    '6 companies, 15+ technologies',
    '100+ projects, 7+ years — keep stacking',
];

const CLOUD_COUNT = 7;
const STAR_COUNT = 140;
const PARTICLE_POOL = 90;
const DEBRIS_POOL = 10;

// ------------------------------------------------------------------- helpers

function readBest() {
    try {
        const n = parseInt(localStorage.getItem(BEST_KEY), 10);
        return Number.isFinite(n) ? n : 0;
    } catch (e) { return 0; }
}

function writeBest(value) {
    try { localStorage.setItem(BEST_KEY, String(value)); } catch (e) { /* private mode */ }
}

function sortSkills(skills) {
    const list = Array.isArray(skills) ? skills.slice() : [];
    return list
        .map((s, idx) => ({ s, idx }))
        .sort((a, b) => {
            const ga = GROUP_ORDER.indexOf(a.s.group);
            const gb = GROUP_ORDER.indexOf(b.s.group);
            const oa = ga === -1 ? GROUP_ORDER.length : ga;
            const ob = gb === -1 ? GROUP_ORDER.length : gb;
            if (oa !== ob) return oa - ob;
            return a.idx - b.idx;
        })
        .map((x) => x.s);
}

function groupMeta(group) {
    return GROUP_META[group] || FALLBACK_GROUP;
}

function hexCss(hex) {
    return '#' + hex.toString(16).padStart(6, '0');
}

/** brighter / deeper shades of a group color for active vs placed blocks */
function shade(hex, towardWhite) {
    const c = new THREE.Color(hex);
    if (towardWhite > 0) c.lerp(new THREE.Color(0xffffff), towardWhite);
    else c.lerp(new THREE.Color(0x1a1030), -towardWhite);
    return c.getHex();
}

function easeOutBack(t) {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

function axisExtent(size, axis) { return axis === 'x' ? size.x : size.z; }

// ======================================================================= game

export default {
    id: 'tower',

    // ------------------------------------------------------------------ init

    async init(ctx, data, opts) {
        this.ctx = ctx;
        this.engine = ctx.engine;
        this.hud = ctx.hud;
        this.input = ctx.input;
        this.reduceMotion = !!(opts && opts.reduceMotion);
        this.container = this.hud.el.parentNode;

        this.skills = sortSkills(data && data.skills);
        this.labelTextureCache = new Map();

        this.paused = false;
        this.gameOver = false;
        this.prevAction = false;
        this.lastDropAt = 0;
        this.elapsed = 0;
        this.timers = new Set();
        this.anims = [];       // dt-driven tweens: { t, dur, update(k), done() }
        this.unsubscribers = [];
        this.banners = [];

        // camera state
        this.camRadius = 8.2;
        this.camRadiusKiss = 0;
        this.camAzimuth = 0.62; // radians from +z toward +x — keeps +z faces visible
        this.camHeight = 3.4;
        this.camLookY = 0.7;
        this.shake = 0;

        // tower wobble spring (rotation on root)
        this.wobbleAngle = 0;
        this.wobbleVel = 0;

        this._injectStyles();
        this._buildSky();
        this._buildEnvironment();
        this._buildLights();
        this._buildPools();
        this._buildStars();

        this.towerGroup = new THREE.Group();
        this.engine.scene.add(this.towerGroup);

        this.resetGame();

        this.unsubscribers.push(this.engine.onUpdate((dt) => this._update(dt)));
        this.unsubscribers.push(this.input.onTap(() => this._triggerDrop()));
        this.input.attachTouchCluster('action');

        this.hud.setBottom('Space / tap to drop');
    },

    start() { this._updateHud(); },
    pause() { this.paused = true; },
    resume() { this.paused = false; },

    // Own palette by design — the game ignores the site theme entirely.
    onThemeChange() { /* no-op */ },

    dispose() {
        this.unsubscribers.forEach((fn) => { try { fn(); } catch (e) {} });
        this.unsubscribers = [];
        this.timers.forEach((id) => clearTimeout(id));
        this.timers.clear();
        this.banners.forEach((el) => { if (el.parentNode) el.parentNode.removeChild(el); });
        this.banners = [];
        if (this.styleEl && this.styleEl.parentNode) this.styleEl.parentNode.removeChild(this.styleEl);
        this.styleEl = null;
        if (this.completionCard) { try { this.completionCard.close(); } catch (e) {} this.completionCard = null; }
        // engine.dispose() (main.js) walks the scene and frees geometries,
        // materials and textures — nothing scene-side left to free here.
    },

    _setTimer(fn, ms) {
        const id = setTimeout(() => { this.timers.delete(id); fn(); }, ms);
        this.timers.add(id);
        return id;
    },

    // ------------------------------------------------------------------- DOM

    _injectStyles() {
        const style = document.createElement('style');
        style.textContent =
            '.tower-banner{position:absolute;top:18%;left:50%;transform:translate(-50%,-8px);' +
            'padding:.5rem 1.1rem;border-radius:999px;font-weight:700;font-size:.95rem;' +
            'color:#fff;letter-spacing:.02em;box-shadow:0 6px 24px rgba(30,10,60,.35);' +
            'opacity:0;transition:opacity .25s ease,transform .25s ease;pointer-events:none;z-index:30;}' +
            '.tower-banner--in{opacity:1;transform:translate(-50%,0);}' +
            '.tower-combo-chip{display:inline-block;margin-left:.4em;padding:.05em .5em;' +
            'border-radius:999px;background:linear-gradient(135deg,#ff4fa3,#ffc93c);color:#fff;font-weight:800;}';
        document.head.appendChild(style);
        this.styleEl = style;
    },

    _showBanner(text, colorHex) {
        const el = document.createElement('div');
        el.className = 'tower-banner';
        // Stack banners vertically instead of one replacing/overlapping the
        // other — the first active one sits "up", the next "down" below it.
        el.style.top = (14 + this.banners.length * 13) + '%';
        el.style.background = 'linear-gradient(135deg,' + hexCss(colorHex) + ',' + hexCss(shade(colorHex, 0.3)) + ')';
        el.textContent = text;
        this.container.appendChild(el);
        this.banners.push(el);
        requestAnimationFrame(() => el.classList.add('tower-banner--in'));
        this._setTimer(() => {
            el.classList.remove('tower-banner--in');
            this._setTimer(() => {
                if (el.parentNode) el.parentNode.removeChild(el);
                this.banners = this.banners.filter((b) => b !== el);
            }, 300);
        }, 2100);
    },

    // ------------------------------------------------------------------- sky

    _buildSky() {
        const scene = this.engine.scene;
        this.skyColor = SKY_LOW.clone();
        this.fogColor = FOG_LOW.clone();
        scene.background = this.skyColor;           // override site-theme value
        scene.fog = new THREE.Fog(this.fogColor, 14, 42); // override site-theme fog
    },

    _buildStars() {
        const positions = new Float32Array(STAR_COUNT * 3);
        for (let i = 0; i < STAR_COUNT; i++) {
            // upper shell around the play area so stars ring the tower top
            const az = Math.random() * Math.PI * 2;
            const el = 0.15 + Math.random() * 1.2;
            const r = 20 + Math.random() * 8;
            positions[i * 3] = Math.cos(az) * Math.cos(el) * r;
            positions[i * 3 + 1] = Math.sin(el) * r + 2;
            positions[i * 3 + 2] = Math.sin(az) * Math.cos(el) * r;
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        this.starMat = new THREE.PointsMaterial({
            color: 0xfff6e8, size: 0.12, transparent: true, opacity: 0,
            depthWrite: false, sizeAttenuation: true, fog: false,
        });
        this.stars = new THREE.Points(geo, this.starMat);
        this.engine.scene.add(this.stars);
    },

    // ----------------------------------------------------------- environment

    _buildEnvironment() {
        const scene = this.engine.scene;
        this.envGroup = new THREE.Group();
        scene.add(this.envGroup);

        // Night-diorama plaza (~7 units across) in the same dusky-rock /
        // fresh-green palette Career Constellation uses for its islands.
        const plazaTop = new THREE.Mesh(
            new THREE.CylinderGeometry(PLAZA_RADIUS, PLAZA_RADIUS, 0.24, 40),
            new THREE.MeshStandardMaterial({ color: 0x4a3b55, roughness: 0.95, flatShading: true })
        );
        plazaTop.position.y = -0.12;
        this.envGroup.add(plazaTop);

        const plazaRim = new THREE.Mesh(
            new THREE.CylinderGeometry(PLAZA_RADIUS + 0.28, PLAZA_RADIUS + 0.42, 0.16, 40),
            new THREE.MeshStandardMaterial({ color: 0x352a40, roughness: 0.95, flatShading: true })
        );
        plazaRim.position.y = -0.28;
        this.envGroup.add(plazaRim);

        // inner accent ring where the tower stands
        const pad = new THREE.Mesh(
            new THREE.CylinderGeometry(1.25, 1.32, 0.05, 28),
            new THREE.MeshStandardMaterial({ color: 0x4fca6e, roughness: 0.9, flatShading: true })
        );
        pad.position.y = 0.025;
        this.envGroup.add(pad);

        // tiny trees: cone canopy + trunk
        const treeSpots = [
            [2.4, 0.9], [-2.1, 1.9], [1.4, -2.6], [-2.7, -1.1], [0.4, 2.9],
        ];
        treeSpots.forEach(([x, z], i) => {
            const tree = new THREE.Group();
            const trunk = new THREE.Mesh(
                new THREE.CylinderGeometry(0.05, 0.07, 0.26, 6),
                new THREE.MeshStandardMaterial({ color: 0x6e4a37, roughness: 1, flatShading: true })
            );
            trunk.position.y = 0.13;
            const canopy = new THREE.Mesh(
                new THREE.ConeGeometry(0.24 + (i % 3) * 0.05, 0.5 + (i % 2) * 0.16, 7),
                new THREE.MeshStandardMaterial({
                    color: i % 2 ? 0x2a9a72 : 0x35b364, roughness: 0.95, flatShading: true,
                })
            );
            canopy.position.y = 0.26 + (0.5 + (i % 2) * 0.16) / 2;
            tree.add(trunk); tree.add(canopy);
            tree.position.set(x, 0, z);
            tree.rotation.y = i * 1.7;
            this.envGroup.add(tree);
        });

        // little rocks
        const rockSpots = [[1.9, -1.4], [-1.5, -2.2], [-2.8, 0.6], [2.9, -0.3]];
        rockSpots.forEach(([x, z], i) => {
            const rock = new THREE.Mesh(
                new THREE.IcosahedronGeometry(0.12 + (i % 2) * 0.07, 0),
                new THREE.MeshStandardMaterial({ color: 0x8d86a8, roughness: 1, flatShading: true })
            );
            rock.position.set(x, 0.07, z);
            rock.rotation.set(i, i * 2, 0);
            this.envGroup.add(rock);
        });
    },

    _buildLights() {
        const scene = this.engine.scene;
        this.sunLight = new THREE.DirectionalLight(0xfff0d8, 1.25);
        this.sunLight.position.set(-5, 8, 4);
        if (this.engine.tier.shadows) this.sunLight.castShadow = true;
        scene.add(this.sunLight);

        this.hemiLight = new THREE.HemisphereLight(0xffe6c0, 0xcf7a58, 0.75);
        scene.add(this.hemiLight);

        this.fillLight = new THREE.DirectionalLight(0xb8a6ff, 0.35);
        this.fillLight.position.set(6, 3, -5);
        scene.add(this.fillLight);
    },

    // ------------------------------------------------------------------ pools

    _buildPools() {
        const scene = this.engine.scene;

        // particle pool — tinted white glow sprites, reused for every burst
        this.particlePool = [];
        this.activeParticles = [];
        const tex = glowTexture(0xffffff);
        const count = Math.max(16, Math.floor(PARTICLE_POOL * (this.engine.tier.particleScale || 1)));
        for (let i = 0; i < count; i++) {
            const mat = new THREE.SpriteMaterial({
                map: tex, transparent: true, opacity: 0, depthWrite: false, fog: false,
            });
            const sprite = new THREE.Sprite(mat);
            sprite.visible = false;
            scene.add(sprite);
            this.particlePool.push({ sprite, mat, vel: new THREE.Vector3(), life: 0, maxLife: 1, size: 0.3, gravity: 0 });
        }

        // debris pool — unit cubes scaled to the sliced overhang
        this.debrisPool = [];
        this.activeDebris = [];
        for (let i = 0; i < DEBRIS_POOL; i++) {
            const mat = new THREE.MeshStandardMaterial({
                color: 0xffffff, roughness: 0.9, flatShading: true, transparent: true, opacity: 1,
            });
            const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), mat);
            mesh.visible = false;
            scene.add(mesh);
            this.debrisPool.push({ mesh, mat, vel: new THREE.Vector3(), angVel: new THREE.Vector3(), life: 0 });
        }

        // cloud pool — soft white blobs drifting past at altitude
        this.clouds = [];
        const cloudTex = glowTexture(0xffffff);
        for (let i = 0; i < CLOUD_COUNT; i++) {
            const mat = new THREE.SpriteMaterial({
                map: cloudTex, transparent: true, opacity: 0, depthWrite: false, color: 0xffffff, fog: false,
            });
            const sprite = new THREE.Sprite(mat);
            const w = 2.4 + Math.random() * 2.2;
            sprite.scale.set(w, w * 0.38, 1);
            sprite.visible = false;
            scene.add(sprite);
            this.clouds.push({
                sprite, mat,
                speed: 0.18 + Math.random() * 0.25,
                targetOpacity: 0.28 + Math.random() * 0.2,
                yOffset: 0, active: false,
            });
        }
    },

    // ------------------------------------------------------------- textures

    _getLabelTexture(skill) {
        const key = skill.id != null ? skill.id : skill.label;
        if (this.labelTextureCache.has(key)) return this.labelTextureCache.get(key);

        const meta = groupMeta(skill.group);
        // 2x resolution (512x256) + anisotropic filtering below — as the
        // tower narrows, upper blocks physically shrink, so the same fixed
        // texture gets squeezed onto a small face viewed at an angle; without
        // both of these the text goes soft/blurry exactly on those blocks.
        const W = 512, H = 256;
        const canvas = document.createElement('canvas');
        canvas.width = W;
        canvas.height = H;
        const c = canvas.getContext('2d');

        // Always a near-black panel behind the text — a light group color
        // (e.g. leadership gold) put white text on a BRIGHT background and
        // the text nearly vanished. A dark panel guarantees strong contrast
        // no matter which group color the block belongs to; the group color
        // still shows as a bold accent stripe across the top for identity.
        c.fillStyle = '#141021';
        c.fillRect(0, 0, W, H);
        c.fillStyle = hexCss(meta.color);
        c.fillRect(0, 0, W, 28);

        const label = skill.label || skill.name || String(skill.id || '');
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        let fontSize = 72;
        c.font = '800 ' + fontSize + 'px Inter, system-ui, sans-serif';
        const maxWidth = W - 56;
        while (c.measureText(label).width > maxWidth && fontSize > 28) {
            fontSize -= 4;
            c.font = '800 ' + fontSize + 'px Inter, system-ui, sans-serif';
        }
        // subtle dark outline (crisps edges on small textures) then bright
        // white fill — on the guaranteed-dark panel this reads clearly.
        c.lineJoin = 'round';
        c.strokeStyle = 'rgba(0,0,0,0.6)';
        c.lineWidth = Math.max(6, fontSize * 0.1);
        c.strokeText(label, W / 2, H / 2 + 16, maxWidth);
        c.fillStyle = '#ffffff';
        c.fillText(label, W / 2, H / 2 + 16, maxWidth);

        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        // Anisotropic filtering is what actually fixes blur on a texture
        // viewed at a shallow/oblique angle (exactly how block faces are
        // seen from this camera) — mipmaps alone don't correct for that.
        const maxAniso = this.engine && this.engine.renderer
            ? this.engine.renderer.capabilities.getMaxAnisotropy() : 1;
        texture.anisotropy = maxAniso;
        texture.needsUpdate = true;
        this.labelTextureCache.set(key, texture);
        return texture;
    },

    // ------------------------------------------------------------------ state

    resetGame() {
        // fully restore scene + state (used by init and the Play-again CTA)
        while (this.towerGroup.children.length) {
            this._disposeMesh(this.towerGroup.children[0]);
        }
        this.activeParticles.forEach((p) => { p.sprite.visible = false; p.mat.opacity = 0; });
        this.particlePool.push(...this.activeParticles);
        this.activeParticles = [];
        this.activeDebris.forEach((d) => { d.mesh.visible = false; });
        this.debrisPool.push(...this.activeDebris);
        this.activeDebris = [];
        this.clouds.forEach((c) => { c.active = false; c.sprite.visible = false; c.mat.opacity = 0; });
        if (this.beacon) { this._disposeMesh(this.beacon); this.beacon = null; }

        this.placedBlocks = [];
        this.activeBlock = null;
        this.footprint = { x: BASE_SIZE, z: BASE_SIZE };
        this.currentIndex = 0;
        this.height = 0;
        this.placedCount = 0;
        this.perfectCount = 0;
        this.combo = 0;
        this.bestCombo = 0;
        this.score = 0;
        this.axis = 'x';
        this.gameOver = false;
        this.state = 'idle';
        this.best = readBest();
        this.anims = [];
        this.wobbleAngle = 0;
        this.wobbleVel = 0;
        this.towerGroup.rotation.set(0, 0, 0);
        this.shake = 0;
        this.camRadiusKiss = 0;
        this.camHeight = 3.4;
        this.camLookY = 0.7;
        this.skyColor.copy(SKY_LOW);
        this.fogColor.copy(FOG_LOW);
        this.starMat.opacity = 0;

        this._spawnNextActiveBlock();
        this._updateHud();
    },

    _currentSkill() { return this.skills[this.currentIndex]; },

    _isLastOfGroup(index) {
        const skill = this.skills[index];
        if (!skill) return false;
        const next = this.skills[index + 1];
        return !next || next.group !== skill.group;
    },

    _spawnNextActiveBlock() {
        if (this.currentIndex >= this.skills.length) {
            this._onVictory();
            return;
        }

        const skill = this._currentSkill();
        const meta = groupMeta(skill.group);
        const y = this.height * BLOCK_HEIGHT + BLOCK_HEIGHT / 2;

        // MeshBasicMaterial is deliberate: it's unlit, so the block's color
        // renders exactly as authored regardless of light angle — no muddy
        // shading. Combo "glow" is done by lerping .color toward white below.
        const geo = new THREE.BoxGeometry(this.footprint.x, BLOCK_HEIGHT, this.footprint.z);
        const mat = new THREE.MeshBasicMaterial({ color: shade(meta.color, 0.22) });
        mat.userData.baseHex = shade(meta.color, 0.22);
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(0, y, 0);
        this.towerGroup.add(mesh);

        const edges = addEdges(mesh, shade(meta.color, 0.55), 0.9);

        const isBase = this.placedBlocks.length === 0;
        const extent = axisExtent(this.footprint, this.axis);
        const halfRange = isBase ? 0 : Math.max(extent * SLIDE_RANGE_FACTOR, SLIDE_RANGE_MIN);
        const speed = Math.min(SPEED_BASE + this.placedCount * SPEED_RAMP, SPEED_CAP);

        this.activeBlock = {
            mesh, mat, edges, skill,
            axis: this.axis,
            phase: isBase ? 0 : Math.random() * Math.PI * 2,
            halfRange, speed, isBase,
        };

        this.state = 'moving';
        this._applyComboGlow();
        this._updateHud();

        // first block = static base, auto-placed: first real decision is #2
        if (isBase) this._dropBlock();
    },

    _applyComboGlow() {
        if (!this.activeBlock) return;
        // Combo "glow" on an unlit material = lerp the color toward white
        // instead of an emissive channel MeshBasicMaterial doesn't have.
        const t = Math.min(this.combo * 0.12, 0.55);
        const base = new THREE.Color(this.activeBlock.mat.userData.baseHex);
        this.activeBlock.mat.color.copy(base).lerp(new THREE.Color(0xffffff), t);
        this.activeBlock.edges.material.opacity = Math.min(0.9 + this.combo * 0.02, 1);
    },

    // ---------------------------------------------------------------- update

    _update(dt) {
        if (this.input.consumePause()) {
            this.paused = !this.paused;
            if (this.paused) { this.hud.setTopLeft('Paused'); this.hud.announce('Paused'); }
            else this._updateHud();
        }
        if (this.paused) return;

        this.elapsed += dt;

        // edge-detect the action key (space/enter held state -> press event)
        const action = !!this.input.state.action;
        if (action && !this.prevAction) this._triggerDrop();
        this.prevAction = action;

        if (this.activeBlock && this.state === 'moving') {
            const b = this.activeBlock;
            b.phase += dt * b.speed;
            const offset = Math.sin(b.phase) * b.halfRange;
            if (b.axis === 'x') b.mesh.position.x = offset;
            else b.mesh.position.z = offset;
        }

        this._updateAnims(dt);
        this._updateWobble(dt);
        this._updateDebris(dt);
        this._updateParticles(dt);
        this._updateClouds(dt);
        this._updateSky(dt);
        this._updateCamera(dt);
    },

    _updateAnims(dt) {
        for (let i = this.anims.length - 1; i >= 0; i--) {
            const a = this.anims[i];
            a.t += dt;
            const k = Math.min(1, a.t / a.dur);
            a.update(k);
            if (k >= 1) {
                if (a.done) a.done();
                this.anims.splice(i, 1);
            }
        }
    },

    _addAnim(dur, update, done) {
        this.anims.push({ t: 0, dur, update, done });
    },

    _updateWobble(dt) {
        // damped spring on towerGroup z-rotation — the "landing thud"
        const k = 60, damping = 7;
        this.wobbleVel += (-k * this.wobbleAngle - damping * this.wobbleVel) * dt;
        this.wobbleAngle += this.wobbleVel * dt;
        this.towerGroup.rotation.z = this.wobbleAngle;
    },

    _updateSky(dt) {
        // journey: sky shifts hue with height, stars fade in near the top
        const t = Math.min(1, this.height / Math.max(1, this.skills.length));
        this.skyColor.lerpColors(SKY_LOW, SKY_HIGH, t);
        this.fogColor.lerpColors(FOG_LOW, FOG_HIGH, t);
        this.engine.scene.fog.color.copy(this.fogColor);
        // Night sky from the ground up now (matching Career Constellation),
        // so stars are visible from the start and simply intensify with height.
        const starTarget = 0.35 + t * 0.55;
        this.starMat.opacity += (starTarget - this.starMat.opacity) * Math.min(1, dt * 2);
        this.stars.position.y = this.camHeight * 0.6;
    },

    _updateCamera(dt) {
        const camera = this.engine.camera;
        const towerTop = this.height * BLOCK_HEIGHT;

        const targetH = 2.6 + towerTop * 0.82;
        const targetLook = Math.max(0.7, towerTop * 0.72);
        const lerpAmt = Math.min(1, dt * 2.6);
        this.camHeight += (targetH - this.camHeight) * lerpAmt;
        this.camLookY += (targetLook - this.camLookY) * lerpAmt;

        // subtle orbital drift for life (skipped under reduceMotion)
        const drift = this.reduceMotion ? 0 : Math.sin(this.elapsed * 0.22) * 0.075;
        const az = this.camAzimuth + drift;
        const r = this.camRadius + this.camRadiusKiss;

        camera.position.set(Math.sin(az) * r, this.camHeight, Math.cos(az) * r);

        // decay the camera-kiss pulse
        this.camRadiusKiss += (0 - this.camRadiusKiss) * Math.min(1, dt * 2.2);

        // tiny shake on sloppy landings
        if (this.shake > 0.001) {
            camera.position.x += (Math.random() - 0.5) * this.shake;
            camera.position.y += (Math.random() - 0.5) * this.shake;
            this.shake *= Math.pow(0.02, dt); // fast exponential decay
        } else {
            this.shake = 0;
        }

        camera.lookAt(0, this.camLookY, 0);
    },

    _updateDebris(dt) {
        for (let i = this.activeDebris.length - 1; i >= 0; i--) {
            const d = this.activeDebris[i];
            d.life += dt;
            d.vel.y -= 9.8 * dt;
            d.mesh.position.addScaledVector(d.vel, dt);
            d.mesh.rotation.x += d.angVel.x * dt;
            d.mesh.rotation.z += d.angVel.z * dt;
            d.mat.opacity = Math.max(0, 1 - d.life / 1.1);
            if (d.life >= 1.1 || d.mesh.position.y < -6) {
                d.mesh.visible = false;
                this.activeDebris.splice(i, 1);
                this.debrisPool.push(d);
            }
        }
    },

    _updateParticles(dt) {
        for (let i = this.activeParticles.length - 1; i >= 0; i--) {
            const p = this.activeParticles[i];
            p.life += dt;
            p.vel.y -= p.gravity * dt;
            p.sprite.position.addScaledVector(p.vel, dt);
            const t = Math.min(1, p.life / p.maxLife);
            p.mat.opacity = Math.max(0, 1 - t);
            const s = p.size * (1 - t * 0.45);
            p.sprite.scale.set(s, s, 1);
            if (p.life >= p.maxLife) {
                p.sprite.visible = false;
                this.activeParticles.splice(i, 1);
                this.particlePool.push(p);
            }
        }
    },

    _updateClouds(dt) {
        const camY = this.camHeight;
        const wantClouds = camY > 4.2;
        this.clouds.forEach((c, i) => {
            if (!c.active && wantClouds) {
                c.active = true;
                c.sprite.visible = true;
                c.yOffset = -1.5 + (i / CLOUD_COUNT) * 5 + Math.random();
                c.sprite.position.set(-11 - Math.random() * 4, camY + c.yOffset, -2 - (i % 3) * 2.4);
                c.mat.opacity = 0;
            }
            if (!c.active) return;
            c.sprite.position.x += c.speed * dt;
            c.sprite.position.y = camY + c.yOffset;
            const target = wantClouds ? c.targetOpacity : 0;
            c.mat.opacity += (target - c.mat.opacity) * Math.min(1, dt * 0.8);
            if (c.sprite.position.x > 12) {
                c.sprite.position.x = -12 - Math.random() * 3;
                c.yOffset = -1.5 + Math.random() * 4.5;
            }
            if (!wantClouds && c.mat.opacity < 0.01) {
                c.active = false;
                c.sprite.visible = false;
            }
        });
    },

    // ----------------------------------------------------------------- input

    _triggerDrop() {
        const now = performance.now();
        if (now - this.lastDropAt < DROP_COOLDOWN_MS) return; // tap + cluster + key can't double-drop
        if (this.paused || this.gameOver) return;
        if (!this.activeBlock || this.state !== 'moving') return;
        this.lastDropAt = now;
        this._dropBlock();
    },

    // ------------------------------------------------------------------ drop

    _dropBlock() {
        if (this.state !== 'moving') return; // state-machine guard
        this.state = 'settling';

        const b = this.activeBlock;
        const { skill, axis, mesh } = b;
        const meta = groupMeta(skill.group);

        const prev = this.placedBlocks[this.placedBlocks.length - 1];
        const prevCenter = prev ? prev.center : { x: 0, z: 0 };
        const prevSize = prev ? prev.size : { x: this.footprint.x, z: this.footprint.z };

        const curCenter = { x: mesh.position.x, z: mesh.position.z };
        const curSize = { x: this.footprint.x, z: this.footprint.z };

        const curExtent = axisExtent(curSize, axis);
        const prevExtent = axisExtent(prevSize, axis);
        const curPos = axis === 'x' ? curCenter.x : curCenter.z;
        const prevPos = axis === 'x' ? prevCenter.x : prevCenter.z;

        const isPerfect = b.isBase || Math.abs(curPos - prevPos) <= curExtent * PERFECT_WINDOW;

        let newExtent, newPos;
        if (isPerfect) {
            // snap onto center; small grow-back reward, capped at base size
            newExtent = Math.min(curExtent + BASE_SIZE * PERFECT_GROWBACK, BASE_SIZE);
            newPos = prevPos;
        } else {
            const overlapMin = Math.max(curPos - curExtent / 2, prevPos - prevExtent / 2);
            const overlapMax = Math.min(curPos + curExtent / 2, prevPos + prevExtent / 2);
            const rawOverlap = overlapMax - overlapMin;
            const floor = curExtent * MIN_OVERLAP_RATIO;
            if (rawOverlap >= floor) {
                newExtent = rawOverlap;
                newPos = (overlapMin + overlapMax) / 2;
            } else {
                // forgiveness floor: keep 40% of the extent hugging the near edge
                newExtent = floor;
                const side = curPos >= prevPos ? 1 : -1;
                newPos = prevPos + side * Math.max(0, prevExtent / 2 - floor / 2);
            }
            // absolute floor: the tower can narrow but never into a sliver —
            // the run always stays playable until every skill is placed
            if (newExtent < MIN_EXTENT_ABS) newExtent = MIN_EXTENT_ABS;
        }

        const newSize = { x: curSize.x, z: curSize.z };
        const newCenter = { x: curCenter.x, z: curCenter.z };
        if (axis === 'x') { newSize.x = newExtent; newCenter.x = newPos; }
        else { newSize.z = newExtent; newCenter.z = newPos; }

        // sliced overhang tumbles away as debris
        if (!isPerfect && curExtent - newExtent > 0.02) {
            this._spawnDebris(axis, curCenter, curSize, newCenter, newSize, mesh.position.y, meta.color);
        }

        this._finalizePlacedBlock(mesh, newCenter, newSize, skill, meta, isPerfect);
        this.placedBlocks.push({ mesh, center: newCenter, size: newSize, skill });

        this.footprint = { x: newSize.x, z: newSize.z };
        this.height += 1;
        this.placedCount += 1;
        this.axis = axis === 'x' ? 'z' : 'x';
        this.score += 1;

        // combo / score bookkeeping (the auto-placed base doesn't count)
        if (isPerfect && !b.isBase) {
            this.perfectCount += 1;
            this.combo += 1;
            this.bestCombo = Math.max(this.bestCombo, this.combo);
            this.score += 2 + Math.max(0, this.combo - 1); // perfect + combo bonus
            this._spawnBurst(mesh.position, [meta.color, shade(meta.color, 0.4), 0xffffff], 10, 0.6);
        } else if (!b.isBase) {
            this.combo = 0;
            this.shake = Math.max(this.shake, 0.09);
        }

        // landing juice: wobble + squash-stretch
        if (!this.reduceMotion) {
            this.wobbleVel += (Math.random() < 0.5 ? -1 : 1) * (isPerfect ? 0.05 : 0.1);
            const m = mesh;
            m.scale.set(1.12, 0.62, 1.12);
            this._addAnim(0.32, (k) => {
                const e = easeOutBack(k);
                m.scale.set(1.12 + (1 - 1.12) * e, 0.62 + (1 - 0.62) * e, 1.12 + (1 - 1.12) * e);
            }, () => m.scale.set(1, 1, 1));
        }

        const finishedGroupIndex = this.currentIndex;
        this.currentIndex += 1;
        this.activeBlock = null;

        // Skill-name popup on every drop (base block excluded — nothing was
        // "chosen" for it) — fires FIRST so it always claims the top "up"
        // slot, since the skill itself matters more than the group label.
        // Same banner style as "{Group} complete!", with a perfect/combo
        // prefix when it applies and a random color from the game's own
        // accent set each time for variety.
        if (!b.isBase) {
            const label = skill.label || skill.id || '';
            let prefix = '';
            if (isPerfect) prefix = this.combo >= 2 ? 'Perfect x' + this.combo + '! ' : 'Perfect! ';
            const bannerColors = GROUP_ORDER.map((g) => GROUP_META[g].color);
            const randomColor = bannerColors[Math.floor(Math.random() * bannerColors.length)];
            try { this._showBanner(prefix + label, randomColor); } catch (e) {}
        }

        // group milestone: banner (stacks "down" below the skill banner
        // above, if that also fired) + confetti + width restore toward base
        if (this._isLastOfGroup(finishedGroupIndex) && this.currentIndex < this.skills.length) {
            this._onGroupComplete(skill.group, mesh.position);
        }

        // height milestone every 5 blocks: camera kiss + a real stat
        if (this.placedCount > 1 && this.placedCount % 5 === 0) {
            this.camRadiusKiss = this.reduceMotion ? 0 : 1.4;
            const stat = STATS[(this.placedCount / 5 - 1) % STATS.length];
            try { toast(this.container, stat); } catch (e) {}
        }

        this._updateBestIfNeeded();
        this._updateHud();
        this._spawnNextActiveBlock();
    },

    _onGroupComplete(group, position) {
        const meta = groupMeta(group);

        // group bonus: restore footprint 15% toward base on both axes,
        // animated so the reward is visible
        const from = { x: this.footprint.x, z: this.footprint.z };
        const to = {
            x: Math.min(BASE_SIZE, from.x + (BASE_SIZE - from.x) * GROUP_BONUS + BASE_SIZE * 0.02),
            z: Math.min(BASE_SIZE, from.z + (BASE_SIZE - from.z) * GROUP_BONUS + BASE_SIZE * 0.02),
        };
        this.footprint = to;

        this._showBanner(meta.label + ' complete!', meta.color);
        this.hud.announce(meta.label + ' complete');
        this._spawnBurst(position, [meta.color, shade(meta.color, 0.35), 0xffffff], 22, 0.9);

        // pulse the just-placed block's edges
        const top = this.placedBlocks[this.placedBlocks.length - 1];
        if (top && !this.reduceMotion) {
            const m = top.mesh;
            this._addAnim(0.5, (k) => {
                const pulse = 1 + Math.sin(k * Math.PI) * 0.07;
                m.scale.set(pulse, 1, pulse);
            }, () => m.scale.set(1, 1, 1));
        }
    },

    // ---------------------------------------------------------- block visuals

    _finalizePlacedBlock(mesh, center, size, skill, meta, isPerfect) {
        const oldGeo = mesh.geometry;
        mesh.geometry = new THREE.BoxGeometry(size.x, BLOCK_HEIGHT, size.z);
        oldGeo.dispose();
        mesh.position.set(center.x, mesh.position.y, center.z);

        // strip active edge lines
        mesh.children.filter((c) => c.isLineSegments).forEach((l) => {
            mesh.remove(l);
            l.geometry.dispose();
            l.material.dispose();
        });

        // placed material set: deeper group shade + label on the camera-facing
        // +z face. BoxGeometry material order: [+x, -x, +y, -y, +z, -z] and the
        // camera lives on the +x/+z side, so index 4 faces the viewer.
        // MeshBasicMaterial (unlit) throughout — colors and label text render
        // at full authored brightness regardless of the light rig, instead of
        // going muddy/dull under MeshStandardMaterial's lighting response.
        const bodyHex = shade(meta.color, -0.18);
        const topHex = shade(meta.color, 0.1);
        const bodyMat = new THREE.MeshBasicMaterial({ color: bodyHex });
        bodyMat.userData.baseHex = bodyHex;
        const topMat = new THREE.MeshBasicMaterial({ color: topHex });
        topMat.userData.baseHex = topHex;
        const labelMat = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            map: this._getLabelTexture(skill),
        });
        labelMat.userData.baseHex = 0xffffff;

        if (Array.isArray(mesh.material)) mesh.material.forEach((m) => m.dispose());
        else mesh.material.dispose();
        mesh.material = [bodyMat, bodyMat, topMat, bodyMat, labelMat, bodyMat];

        addEdges(mesh, shade(meta.color, -0.45), 0.5);

        if (isPerfect) this._flashPerfect(mesh, meta.color);
    },

    _flashPerfect(mesh) {
        // Unlit-material flash: lerp each face's .color toward white and
        // back, using the color it was actually painted with as the base
        // (not a shared emissive channel MeshBasicMaterial doesn't have).
        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        const bases = materials.map((m) => new THREE.Color(m.userData.baseHex != null ? m.userData.baseHex : m.color.getHex()));
        this._addAnim(0.45, (k) => {
            const t = 0.85 * (1 - easeOutCubic(k));
            materials.forEach((m, i) => { m.color.copy(bases[i]).lerp(new THREE.Color(0xffffff), t); });
        }, () => {
            materials.forEach((m, i) => { m.color.copy(bases[i]); });
        });
    },

    // ------------------------------------------------------ debris / particles

    _spawnDebris(axis, curCenter, curSize, newCenter, newSize, y, colorHex) {
        const d = this.debrisPool.pop();
        if (!d) return;

        let sx, sz, px, pz;
        if (axis === 'x') {
            const discard = curSize.x - newSize.x;
            if (discard <= 0.02) { this.debrisPool.push(d); return; }
            const right = (curCenter.x + curSize.x / 2) > (newCenter.x + newSize.x / 2);
            sx = discard; sz = curSize.z;
            px = right ? newCenter.x + newSize.x / 2 + discard / 2
                       : newCenter.x - newSize.x / 2 - discard / 2;
            pz = curCenter.z;
        } else {
            const discard = curSize.z - newSize.z;
            if (discard <= 0.02) { this.debrisPool.push(d); return; }
            const fwd = (curCenter.z + curSize.z / 2) > (newCenter.z + newSize.z / 2);
            sx = curSize.x; sz = discard;
            px = curCenter.x;
            pz = fwd ? newCenter.z + newSize.z / 2 + discard / 2
                     : newCenter.z - newSize.z / 2 - discard / 2;
        }

        d.mesh.scale.set(sx, BLOCK_HEIGHT, sz);
        d.mesh.position.set(px, y, pz);
        d.mesh.rotation.set(0, 0, 0);
        d.mat.color.setHex(shade(colorHex, -0.1));
        d.mat.opacity = 1;
        d.vel.set((Math.random() - 0.5) * 0.7, 0.4, (Math.random() - 0.5) * 0.7);
        d.angVel.set((Math.random() - 0.5) * 6, 0, (Math.random() - 0.5) * 6);
        d.life = 0;
        d.mesh.visible = true;
        this.activeDebris.push(d);
    },

    _spawnBurst(position, colors, baseCount, spread) {
        if (this.reduceMotion) return;
        const count = Math.max(1, Math.floor(baseCount * (this.engine.tier.particleScale || 1)));
        for (let i = 0; i < count; i++) {
            const p = this.particlePool.pop();
            if (!p) break;
            const color = colors[i % colors.length];
            p.mat.color.setHex(color);
            p.mat.opacity = 1;
            p.sprite.position.copy(position);
            p.sprite.position.y += 0.15;
            const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
            const speed = (1.1 + Math.random() * 1.1) * (spread || 1);
            p.vel.set(Math.cos(angle) * speed, 0.9 + Math.random() * 1.3, Math.sin(angle) * speed);
            p.gravity = 2.2;
            p.life = 0;
            p.maxLife = 0.55 + Math.random() * 0.35;
            p.size = 0.22 + Math.random() * 0.2;
            p.sprite.scale.set(p.size, p.size, 1);
            p.sprite.visible = true;
            this.activeParticles.push(p);
        }
    },

    // -------------------------------------------------------------- victory

    _onVictory() {
        if (this.gameOver) return;
        this.gameOver = true;
        this.state = 'done';

        const topY = this.height * BLOCK_HEIGHT;

        // beacon light from the tower top
        const beaconMat = new THREE.MeshBasicMaterial({
            color: 0xfff3c0, transparent: true, opacity: 0.0,
            blending: THREE.AdditiveBlending, depthWrite: false, fog: false,
        });
        this.beacon = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.22, 9, 12, 1, true), beaconMat);
        this.beacon.position.set(0, topY + 4.5, 0);
        this.engine.scene.add(this.beacon);
        this._addAnim(0.8, (k) => { beaconMat.opacity = 0.55 * easeOutCubic(k); });

        // big multi-color confetti (skipped internally under reduceMotion)
        const allColors = GROUP_ORDER.map((g) => groupMeta(g).color);
        const burstPos = new THREE.Vector3(0, topY + 0.4, 0);
        this._spawnBurst(burstPos, allColors, 34, 1.4);
        this._setTimer(() => this._spawnBurst(burstPos, allColors, 26, 1.1), 350);
        this._setTimer(() => this._spawnBurst(burstPos, allColors, 20, 0.9), 700);

        this._updateBestIfNeeded();
        this._updateHud();
        this.hud.announce('All skills stacked — full stack achieved');

        // results card slightly delayed so the confetti moment lands first
        this._setTimer(() => {
            this.completionCard = infoCard(this.container, {
                title: 'Full-Stack Achieved',
                subtitle: 'Stack the Stack',
                body: 'All ' + this.skills.length + ' skills stacked, ' + this.height +
                    ' blocks tall — ' + this.perfectCount + ' perfects, best combo x' +
                    this.bestCombo + '. Score ' + this.score + ' (best ' + this.best + ').',
                tags: GROUP_ORDER.map((g) => groupMeta(g).label),
                ctaLabel: 'Play again',
                onCta: () => this.resetGame(),
            });
        }, this.reduceMotion ? 200 : 1100);
    },

    _updateBestIfNeeded() {
        if (this.score > this.best) {
            this.best = this.score;
            writeBest(this.best);
        }
    },

    // ------------------------------------------------------------------- HUD

    _updateHud() {
        if (this.gameOver) {
            this.hud.setTopLeft('Full stack achieved');
        } else {
            const skill = this._currentSkill();
            const meta = skill ? groupMeta(skill.group) : FALLBACK_GROUP;
            const dot = '<span style="display:inline-block;width:.65em;height:.65em;' +
                'border-radius:50%;margin-right:.35em;vertical-align:baseline;background:' +
                hexCss(meta.color) + '"></span>';
            this.hud.setTopLeft(dot + 'Now stacking: ' + meta.label);
        }
        const comboHtml = this.combo >= 2
            ? ' &middot; <span class="tower-combo-chip">x' + this.combo + '</span>'
            : '';
        this.hud.setTopRight('Height ' + this.height + ' &middot; Best ' + this.best + comboHtml);
    },

    // --------------------------------------------------------------- helpers

    _disposeMesh(mesh) {
        if (!mesh) return;
        if (mesh.parent) mesh.parent.remove(mesh);
        mesh.traverse((obj) => {
            if (obj.geometry) obj.geometry.dispose();
            if (obj.material) {
                const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
                // material.dispose() does not free .map textures — the label
                // CanvasTextures are cached by skill id and reused across runs
                mats.forEach((m) => { if (m.dispose) m.dispose(); });
            }
        });
    },
};
