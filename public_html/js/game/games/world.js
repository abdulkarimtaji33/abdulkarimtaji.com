// world.js — "Career Constellation" v2.
//
// A dreamy night-sky diorama: five floating islands (one per company) rise in a
// chronological spiral through a star field, each with craggy rock, grass,
// trees, a tiny glowing landmark and drifting shards beneath. Skill crystals
// orbit each island, project ships cruise between them, and soft constellation
// lines link the career path. Everything is tappable and opens a NON-blocking
// side panel — the scene never pauses and never gets covered by a modal.
//
// The module deliberately ignores the site theme (onThemeChange is a no-op)
// and paints with its own cohesive space palette.

import * as THREE from 'three';
import { addEdges, glowTexture } from '../core/theme.js';
import { toast } from '../core/ui.js';

// ---------------------------------------------------------------------------
// Palette — "Monument Valley meets night sky". Deep indigo ground, purple
// nebula haze, cyan / magenta / gold accents, fresh green island tops.
// ---------------------------------------------------------------------------
const PAL = {
    bg: 0x12123f,          // deep indigo night
    fog: 0x12123f,
    nebulaPurple: 0x6b4fd8,
    nebulaCyan: 0x2fd6e8,
    nebulaMagenta: 0xd84fd8,
    starWhite: 0xeef2ff,
    starBlue: 0xa9c4ff,
    moon: 0xf4ecd8,
    moonGlow: 0xd8cfae,

    rockSide: 0x4a3b55,    // dusky violet-brown rock
    rockDark: 0x352a40,
    grass: 0x4fca6e,       // fresh green
    grassDark: 0x38a656,
    trunk: 0x6e4a37,
    treeGreenA: 0x35b364,
    treeGreenB: 0x2a9a72,
    treeAutumn: 0xe8944a,
    bush: 0x2f9a5c,
    stone: 0x8d86a8,

    building: 0x3c3560,
    buildingLight: 0x554d85,
    roof: 0xc75b74,
    window: 0xffd98a,      // warm lit windows

    beacon: 0xffc857,      // warm gold "you are here"
    line: 0x8f7fe0,        // soft purple constellation lines
    lineLit: 0xffd98a,

    accentCyan: 0x3fe0f0,
    accentMagenta: 0xf05fd0,
    accentGold: 0xffc857,
    accentPurple: 0x9d7bff,
    accentGreen: 0x5fe89a,

    panelText: '#f0f2ff',
    panelBg: 'rgba(15,16,53,0.92)',
};

const ISLAND_ACCENTS = [PAL.accentCyan, PAL.accentPurple, PAL.accentMagenta, PAL.accentGreen, PAL.accentGold];
const CRYSTAL_ACCENTS = [PAL.accentCyan, PAL.accentMagenta, PAL.accentGold];
const TARGET = new THREE.Vector3(0, 2.2, 0);
const MAX_SHIPS = 7;

function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

// Deterministic pseudo-random from a seed — keeps island crags stable per load.
function mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
        a |= 0; a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

// Position-hash jitter so duplicated seam vertices deform identically (no cracks).
function hashJitter(x, y, z, salt) {
    const n = Math.sin(x * 12.9898 + y * 78.233 + z * 37.719 + salt * 91.17) * 43758.5453;
    return (n - Math.floor(n)) - 0.5;
}

function hexCss(hex) { return '#' + hex.toString(16).padStart(6, '0'); }

function escapeHtml(s) {
    return String(s == null ? '' : s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

export default {
    id: 'world',

    // ------------------------------------------------------------------
    // lifecycle
    // ------------------------------------------------------------------
    async init(ctx, data, opts) {
        this.ctx = ctx;
        this.engine = ctx.engine;
        this.hud = ctx.hud;
        this.input = ctx.input;
        this.reduceMotion = !!(opts && opts.reduceMotion);

        // Sort companies chronologically (oldest first — lowest island).
        const companies = Array.isArray(data.companies) ? data.companies.slice() : [];
        companies.sort((a, b) => {
            const af = a.years && a.years.from ? a.years.from : 0;
            const bf = b.years && b.years.from ? b.years.from : 0;
            return af - bf;
        });
        this.companies = companies;
        this.skillIndex = new Map();
        (Array.isArray(data.skills) ? data.skills : []).forEach((s) => this.skillIndex.set(s.id, s));
        this.projects = (Array.isArray(data.projects) ? data.projects : []).slice(0, MAX_SHIPS);

        // State
        this.disposers = [];
        this.pickables = [];          // entries: { mesh(es), kind, label, setHighlight(on), focusPoint() }
        this.pickMeshes = [];         // flat raycast targets, each with userData.pickEntry
        this.focusables = [];
        this.focusIndex = -1;
        this.hoveredEntry = null;
        this.companiesViewed = new Set();
        this.skillsFound = new Set();
        this.skillsTotal = 0;
        this.constellationComplete = false;
        this.celebration = null;      // { t } while the light-up sequence runs
        this.autoRotate = !this.reduceMotion;
        this.userHasDragged = false;
        this.cameraTween = null;
        this.raycaster = new THREE.Raycaster();
        this._time = 0;
        this._ownTextures = [];

        // Own the atmosphere — main.js set site-theme colors; replace them.
        this.engine.scene.background = new THREE.Color(PAL.bg);
        this.engine.scene.fog = new THREE.Fog(PAL.fog, 15, 44);

        this.root = new THREE.Object3D();
        this.engine.scene.add(this.root);

        this._buildSharedAssets();
        this._buildLights();
        this._buildBackdrop();
        this._buildIslands();
        this._buildConstellationLines();
        this._buildShips();
        this._initShootingStars();

        this.camState = { radius: 14, theta: Math.PI * 0.3, phi: 1.08 };
        this._applyCamera();

        this._injectStyles();
        this._buildPanel();
        this._setupInput();
        this._setupKeyboard();
        this._buildA11yButtons();

        this.hud.setTopLeft('Career Constellation');
        this.hud.setBottom('drag to explore · tap anything');
        this._updateHud();
    },

    start() {
        this._unsubUpdate = this.engine.onUpdate((dt) => this._update(dt));
    },

    pause() {},
    resume() {},

    // The game uses its own palette on purpose — the site theme toggle should
    // not repaint the night sky.
    onThemeChange() {},

    dispose() {
        if (this._unsubUpdate) { this._unsubUpdate(); this._unsubUpdate = null; }
        this.disposers.forEach((fn) => { try { fn(); } catch (e) {} });
        this.disposers = [];

        if (this.panelEl && this.panelEl.parentNode) this.panelEl.parentNode.removeChild(this.panelEl);
        if (this.styleEl && this.styleEl.parentNode) this.styleEl.parentNode.removeChild(this.styleEl);
        if (this.a11yList && this.a11yList.parentNode) this.a11yList.parentNode.removeChild(this.a11yList);
        this.panelEl = null;
        this.styleEl = null;
        this.a11yList = null;

        // Free GPU resources — the root may be detached before engine.dispose()
        // traverses the scene, so clean up explicitly here.
        if (this.root) {
            this.root.traverse((obj) => {
                if (obj.geometry) obj.geometry.dispose();
                if (obj.material) {
                    const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
                    mats.forEach((m) => m.dispose());
                }
            });
            if (this.root.parent) this.root.parent.remove(this.root);
        }
        // Only textures created here (labels) — glowTexture() results are a
        // shared module-level cache and must survive remounts.
        this._ownTextures.forEach((t) => { try { t.dispose(); } catch (e) {} });
        this._ownTextures = [];
    },

    // ------------------------------------------------------------------
    // shared geometries / materials
    // ------------------------------------------------------------------
    _buildSharedAssets() {
        const shadows = this.engine.tier.shadows;
        this.shadows = shadows;

        this.geo = {
            trunk: new THREE.CylinderGeometry(0.045, 0.07, 0.2, 5),
            cone: new THREE.ConeGeometry(0.17, 0.46, 6),
            coneSmall: new THREE.ConeGeometry(0.12, 0.3, 6),
            bush: new THREE.SphereGeometry(0.11, 6, 5),
            stone: new THREE.DodecahedronGeometry(0.08, 0),
            shard: new THREE.TetrahedronGeometry(0.16, 0),
            crystal: new THREE.OctahedronGeometry(0.13, 0),
            shipBody: new THREE.BoxGeometry(0.52, 0.11, 0.2),
            shipFin: new THREE.BoxGeometry(0.16, 0.2, 0.03),
            shipNose: new THREE.ConeGeometry(0.09, 0.22, 4),
            beacon: new THREE.CylinderGeometry(0.05, 0.1, 3.4, 6, 1, true),
        };

        const std = (color, extra) => new THREE.MeshStandardMaterial(Object.assign({
            color, roughness: 0.9, metalness: 0, flatShading: true,
        }, extra || {}));

        this.mat = {
            trunk: std(PAL.trunk),
            treeA: std(PAL.treeGreenA),
            treeB: std(PAL.treeGreenB),
            treeAutumn: std(PAL.treeAutumn),
            bush: std(PAL.bush),
            stone: std(PAL.stone),
            shard: std(PAL.rockDark),
            building: std(PAL.building),
            buildingLight: std(PAL.buildingLight),
            roof: std(PAL.roof),
            window: new THREE.MeshBasicMaterial({ color: PAL.window }),
            shipBody: std(0xd8dcf5, { roughness: 0.6 }),
            shipBodyBright: std(0xffffff, {
                roughness: 0.5,
                emissive: new THREE.Color(PAL.accentCyan), emissiveIntensity: 0.5,
            }),
            shipFin: std(0x8f8ac0),
            beacon: new THREE.MeshBasicMaterial({
                color: PAL.beacon, transparent: true, opacity: 0.32,
                blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide,
            }),
        };

        // Crystal materials: a base + bright variant per accent, shared by all
        // crystals of that color (meshes swap materials instead of cloning).
        this.crystalMats = CRYSTAL_ACCENTS.map((hex) => ({
            base: new THREE.MeshStandardMaterial({
                color: hex, roughness: 0.35, metalness: 0.1, flatShading: true,
                emissive: new THREE.Color(hex), emissiveIntensity: 0.35,
            }),
            bright: new THREE.MeshStandardMaterial({
                color: hex, roughness: 0.25, metalness: 0.1, flatShading: true,
                emissive: new THREE.Color(hex), emissiveIntensity: 1.1,
            }),
        }));
    },

    _buildLights() {
        const dir = new THREE.DirectionalLight(0xfff0d8, 1.05);
        dir.position.set(-7, 12, 7);
        if (this.shadows) {
            dir.castShadow = true;
            dir.shadow.mapSize.set(1024, 1024);
        }
        this.root.add(dir);

        // Cool indigo sky light over warm violet bounce keeps shadows moody.
        const hemi = new THREE.HemisphereLight(0x8ea0ff, 0x3a2a55, 0.55);
        this.root.add(hemi);

        const amb = new THREE.AmbientLight(0x4a3f7a, 0.35);
        this.root.add(amb);
    },

    // ------------------------------------------------------------------
    // backdrop — stars, nebulas, moon
    // ------------------------------------------------------------------
    _buildBackdrop() {
        this.starClouds = [];
        const scale = this.engine.tier.particleScale || 1;
        const cloudSpecs = [
            { count: Math.round(220 * scale), size: 0.16, opacity: 0.9, color: PAL.starWhite, spin: 0.004 },
            { count: Math.round(160 * scale), size: 0.26, opacity: 0.6, color: PAL.starBlue, spin: -0.0028 },
            { count: Math.round(120 * scale), size: 0.4, opacity: 0.32, color: PAL.starWhite, spin: 0.0018 },
        ];

        cloudSpecs.forEach((spec) => {
            const positions = new Float32Array(spec.count * 3);
            for (let i = 0; i < spec.count; i++) {
                // Random shell between r 38 and 58, biased above the horizon a bit.
                const r = 38 + Math.random() * 20;
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(2 * Math.random() - 1);
                positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
                positions[i * 3 + 1] = r * Math.cos(phi) * 0.85 + 4;
                positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
            }
            const geo = new THREE.BufferGeometry();
            geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            const mat = new THREE.PointsMaterial({
                color: spec.color, size: spec.size, sizeAttenuation: true,
                transparent: true, opacity: spec.opacity, depthWrite: false, fog: false,
                map: glowTexture(0xffffff), blending: THREE.AdditiveBlending,
            });
            const points = new THREE.Points(geo, mat);
            points.userData.spin = spec.spin;
            this.root.add(points);
            this.starClouds.push(points);
        });

        // Nebula glows — huge additive sprites parked far behind the islands.
        const nebulaSpecs = [
            { color: PAL.nebulaPurple, pos: [-26, 10, -30], scale: 46, opacity: 0.17 },
            { color: PAL.nebulaCyan, pos: [24, 2, -34], scale: 38, opacity: 0.12 },
            { color: PAL.nebulaMagenta, pos: [8, 16, 32], scale: 40, opacity: 0.1 },
            { color: PAL.nebulaPurple, pos: [-14, -6, 30], scale: 34, opacity: 0.12 },
        ];
        nebulaSpecs.forEach((spec) => {
            const mat = new THREE.SpriteMaterial({
                map: glowTexture(spec.color), transparent: true, opacity: spec.opacity,
                blending: THREE.AdditiveBlending, depthWrite: false, fog: false,
            });
            const sprite = new THREE.Sprite(mat);
            sprite.position.set(spec.pos[0], spec.pos[1], spec.pos[2]);
            sprite.scale.setScalar(spec.scale);
            this.root.add(sprite);
        });

        // A small stylized moon in a far corner.
        const moon = new THREE.Mesh(
            new THREE.SphereGeometry(1.7, 16, 12),
            new THREE.MeshBasicMaterial({ color: PAL.moon, fog: false })
        );
        moon.position.set(-26, 16, -28);
        this.root.add(moon);
        const moonGlow = new THREE.Sprite(new THREE.SpriteMaterial({
            map: glowTexture(PAL.moonGlow), transparent: true, opacity: 0.5,
            blending: THREE.AdditiveBlending, depthWrite: false, fog: false,
        }));
        moonGlow.position.copy(moon.position);
        moonGlow.scale.setScalar(8);
        this.root.add(moonGlow);
    },

    // ------------------------------------------------------------------
    // islands
    // ------------------------------------------------------------------
    _buildIslands() {
        this.islandEntries = [];
        const n = this.companies.length;
        const spiralRadius = 5.6;
        const heightSpan = 5.2;
        const baseY = -0.6;

        this.companies.forEach((company, i) => {
            const t = n > 1 ? i / (n - 1) : 0;
            const angle = t * Math.PI * 1.7 + 0.4;
            const radius = spiralRadius * (1.0 - 0.22 * t);
            const pos = new THREE.Vector3(
                Math.cos(angle) * radius,
                baseY + t * heightSpan,
                Math.sin(angle) * radius
            );
            this._buildIsland(company, i, pos);
        });

        this.skillsTotal = 0;
        this.islandEntries.forEach((e) => { this.skillsTotal += e.crystals.length; });
    },

    _buildIsland(company, index, pos) {
        const rand = mulberry32(index * 7919 + 13);
        const isCurrent = !!company.current;
        const accent = isCurrent ? PAL.accentGold : ISLAND_ACCENTS[index % ISLAND_ACCENTS.length];
        const topR = (isCurrent ? 1.35 : 1.05) + rand() * 0.1;

        const group = new THREE.Object3D();
        group.position.copy(pos);
        group.userData.basePos = pos.clone();
        group.userData.bobPhase = rand() * Math.PI * 2;
        this.root.add(group);

        // --- craggy rock base: inverted cone, vertex-jittered ---
        const rockH = 1.7 + rand() * 0.4;
        const rockGeo = new THREE.CylinderGeometry(topR * 0.96, 0.22, rockH, 7, 3);
        rockGeo.translate(0, -rockH / 2, 0); // top ring at y=0
        const rp = rockGeo.attributes.position;
        for (let v = 0; v < rp.count; v++) {
            const x = rp.getX(v), y = rp.getY(v), z = rp.getZ(v);
            if (y > -0.05) continue; // keep the rim clean under the grass
            const amp = 0.16 * Math.min(1, -y / rockH + 0.3);
            rp.setX(v, x + hashJitter(x, y, z, 1) * amp * 2);
            rp.setY(v, y + hashJitter(x, y, z, 2) * amp);
            rp.setZ(v, z + hashJitter(x, y, z, 3) * amp * 2);
        }
        rp.needsUpdate = true;
        const rockMat = new THREE.MeshStandardMaterial({
            color: PAL.rockSide, roughness: 0.95, metalness: 0, flatShading: true,
        });
        const rock = new THREE.Mesh(rockGeo, rockMat);
        rock.castShadow = this.shadows;
        group.add(rock);

        // --- grass cap, slightly wider than the rock ---
        const grassGeo = new THREE.CylinderGeometry(topR * 1.06, topR * 0.9, 0.24, 7);
        const grassMat = new THREE.MeshStandardMaterial({
            color: PAL.grass, roughness: 0.85, metalness: 0, flatShading: true,
            emissive: new THREE.Color(PAL.grass), emissiveIntensity: 0,
        });
        const grass = new THREE.Mesh(grassGeo, grassMat);
        grass.position.y = 0.12;
        grass.castShadow = this.shadows;
        grass.receiveShadow = this.shadows;
        group.add(grass);
        addEdges(grass, PAL.grassDark, 0.35);
        const topY = 0.24;

        // --- trees ---
        const treeCount = 2 + Math.floor(rand() * 3);
        const autumnIsland = index === 2; // one island gets autumn colors
        for (let ti = 0; ti < treeCount; ti++) {
            const a = rand() * Math.PI * 2;
            const r = topR * (0.45 + rand() * 0.4);
            const tx = Math.cos(a) * r, tz = Math.sin(a) * r;
            const tree = new THREE.Object3D();
            tree.position.set(tx, topY, tz);
            const s = 0.75 + rand() * 0.6;
            tree.scale.setScalar(s);
            const trunk = new THREE.Mesh(this.geo.trunk, this.mat.trunk);
            trunk.position.y = 0.1;
            tree.add(trunk);
            const leafMat = autumnIsland ? this.mat.treeAutumn : (rand() > 0.5 ? this.mat.treeA : this.mat.treeB);
            const cone = new THREE.Mesh(this.geo.cone, leafMat);
            cone.position.y = 0.42;
            cone.castShadow = this.shadows;
            tree.add(cone);
            if (rand() > 0.45) {
                const cone2 = new THREE.Mesh(this.geo.coneSmall, leafMat);
                cone2.position.y = 0.68;
                tree.add(cone2);
            }
            group.add(tree);
        }

        // --- bushes and small stones ---
        const propCount = 2 + Math.floor(rand() * 3);
        for (let pi = 0; pi < propCount; pi++) {
            const a = rand() * Math.PI * 2;
            const r = topR * (0.35 + rand() * 0.5);
            const isBush = rand() > 0.4;
            const mesh = new THREE.Mesh(
                isBush ? this.geo.bush : this.geo.stone,
                isBush ? this.mat.bush : this.mat.stone
            );
            mesh.position.set(Math.cos(a) * r, topY + 0.05, Math.sin(a) * r);
            mesh.rotation.y = rand() * Math.PI;
            group.add(mesh);
        }

        // --- landmark building (varies per island) ---
        this._buildLandmark(group, index, topY, topR, rand);

        // --- floating rock shards beneath ---
        const shards = [];
        const shardCount = 3;
        for (let si = 0; si < shardCount; si++) {
            const shard = new THREE.Mesh(this.geo.shard, this.mat.shard);
            const a = rand() * Math.PI * 2;
            const r = 0.3 + rand() * 0.7;
            const base = new THREE.Vector3(Math.cos(a) * r, -rockH - 0.3 - rand() * 0.8, Math.sin(a) * r);
            shard.position.copy(base);
            shard.scale.setScalar(0.5 + rand() * 0.8);
            shard.rotation.set(rand() * Math.PI, rand() * Math.PI, rand() * Math.PI);
            shard.userData.basePos = base;
            shard.userData.phase = rand() * Math.PI * 2;
            group.add(shard);
            shards.push(shard);
        }

        // --- under-glow so the island floats on light ---
        const glow = new THREE.Sprite(new THREE.SpriteMaterial({
            map: glowTexture(accent), transparent: true, opacity: 0.32,
            blending: THREE.AdditiveBlending, depthWrite: false,
        }));
        glow.position.y = -rockH * 0.55;
        glow.scale.setScalar(3.2 + topR);
        group.add(glow);

        // --- current-employer beacon ---
        let beacon = null, beaconGlow = null;
        if (isCurrent) {
            beacon = new THREE.Mesh(this.geo.beacon, this.mat.beacon.clone());
            beacon.position.y = topY + 1.7;
            group.add(beacon);
            beaconGlow = new THREE.Sprite(new THREE.SpriteMaterial({
                map: glowTexture(PAL.beacon), transparent: true, opacity: 0.7,
                blending: THREE.AdditiveBlending, depthWrite: false,
            }));
            beaconGlow.position.y = topY + 0.5;
            beaconGlow.scale.setScalar(2.4);
            group.add(beaconGlow);
        }

        // --- name label sprite ---
        const label = this._makeLabelSprite(company.name || ('Company ' + (index + 1)));
        label.position.y = topY + (isCurrent ? 2.6 : 1.6);
        group.add(label);

        // --- entry / pickability ---
        const entry = {
            kind: 'company',
            company,
            index,
            accent,
            group,
            grassMat: grassMat,
            rockMat: rockMat,
            beacon,
            beaconGlow,
            shards,
            crystals: [],
            label: company.name || ('Company ' + (index + 1)),
            focusPoint: () => {
                const p = new THREE.Vector3();
                group.getWorldPosition(p);
                p.y += 0.6;
                return p;
            },
            setHighlight: (on) => {
                grassMat.emissiveIntensity = on ? 0.45 : 0;
                rockMat.emissive = rockMat.emissive || new THREE.Color(accent);
                rockMat.emissive.setHex(accent);
                rockMat.emissiveIntensity = on ? 0.18 : 0;
            },
        };
        rock.userData.pickEntry = entry;
        grass.userData.pickEntry = entry;
        this.pickMeshes.push(rock, grass);
        this.pickables.push(entry);
        this.focusables.push(entry);
        this.islandEntries.push(entry);

        // --- orbiting skill crystals ---
        this._buildCrystalsForIsland(entry, rand, topR);
    },

    _buildLandmark(group, index, topY, topR, rand) {
        const kind = index % 5;
        const lm = new THREE.Object3D();
        const a = rand() * Math.PI * 2;
        lm.position.set(Math.cos(a) * topR * 0.25, topY, Math.sin(a) * topR * 0.25);
        lm.rotation.y = rand() * Math.PI * 2;
        group.add(lm);

        const addWindow = (parent, w, h, x, y, z, ry) => {
            const win = new THREE.Mesh(new THREE.PlaneGeometry(w, h), this.mat.window);
            win.position.set(x, y, z);
            if (ry) win.rotation.y = ry;
            parent.add(win);
        };

        if (kind === 0) {
            // Little house with a warm window.
            const body = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.3, 0.3), this.mat.building);
            body.position.y = 0.15;
            body.castShadow = this.shadows;
            lm.add(body);
            const roof = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.24, 4), this.mat.roof);
            roof.position.y = 0.42;
            roof.rotation.y = Math.PI / 4;
            lm.add(roof);
            addWindow(lm, 0.09, 0.11, 0, 0.16, 0.152);
        } else if (kind === 1) {
            // Watchtower.
            const tower = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.16, 0.62, 6), this.mat.buildingLight);
            tower.position.y = 0.31;
            tower.castShadow = this.shadows;
            lm.add(tower);
            const cap = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.18, 6), this.mat.roof);
            cap.position.y = 0.7;
            lm.add(cap);
            addWindow(lm, 0.07, 0.09, 0, 0.48, 0.115);
        } else if (kind === 2) {
            // Radio antenna with a blinking tip handled by ambient pulse.
            const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.035, 0.7, 5), this.mat.buildingLight);
            mast.position.y = 0.35;
            lm.add(mast);
            const dish = new THREE.Mesh(new THREE.SphereGeometry(0.09, 6, 4, 0, Math.PI * 2, 0, Math.PI / 2), this.mat.stone);
            dish.position.y = 0.16;
            dish.rotation.z = 0.6;
            lm.add(dish);
            const tip = new THREE.Mesh(new THREE.SphereGeometry(0.035, 6, 5), this.mat.window);
            tip.position.y = 0.72;
            lm.add(tip);
        } else if (kind === 3) {
            // Camp tent + lantern.
            const tent = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.3, 4), this.mat.roof);
            tent.position.y = 0.15;
            tent.rotation.y = Math.PI / 4;
            tent.castShadow = this.shadows;
            lm.add(tent);
            const lantern = new THREE.Mesh(new THREE.SphereGeometry(0.045, 6, 5), this.mat.window);
            lantern.position.set(0.22, 0.08, 0.1);
            lm.add(lantern);
        } else {
            // Observatory dome.
            const base = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.23, 0.2, 8), this.mat.building);
            base.position.y = 0.1;
            lm.add(base);
            const dome = new THREE.Mesh(new THREE.SphereGeometry(0.2, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2), this.mat.buildingLight);
            dome.position.y = 0.2;
            lm.add(dome);
            addWindow(lm, 0.06, 0.1, 0, 0.3, 0.185);
        }
    },

    _buildCrystalsForIsland(islandEntry, rand, topR) {
        const skillIds = Array.isArray(islandEntry.company.skills) ? islandEntry.company.skills : [];
        const count = skillIds.length;
        skillIds.forEach((sid, k) => {
            const skill = this.skillIndex.get(sid) || { id: sid, label: sid, fact: '' };
            const matIdx = k % this.crystalMats.length;
            const mats = this.crystalMats[matIdx];
            const mesh = new THREE.Mesh(this.geo.crystal, mats.base);
            islandEntry.group.add(mesh);

            const orbit = {
                radius: topR + 0.9 + (k % 2) * 0.35,
                angle: (k / Math.max(1, count)) * Math.PI * 2 + rand(),
                speed: (this.reduceMotion ? 0 : 0.25 + rand() * 0.15) * (k % 2 === 0 ? 1 : -1),
                height: 0.55 + rand() * 0.5,
                bobPhase: rand() * Math.PI * 2,
            };
            mesh.position.set(
                Math.cos(orbit.angle) * orbit.radius,
                orbit.height,
                Math.sin(orbit.angle) * orbit.radius
            );

            const key = (islandEntry.company.id || islandEntry.index) + ':' + sid;
            const entry = {
                kind: 'skill',
                skill,
                key,
                mesh,
                orbit,
                mats,
                island: islandEntry,
                label: skill.label || sid,
                focusPoint: () => {
                    const p = new THREE.Vector3();
                    mesh.getWorldPosition(p);
                    return p;
                },
                setHighlight: (on) => {
                    mesh.material = (on || this.skillsFound.has(key)) ? mats.bright : mats.base;
                },
            };
            mesh.userData.pickEntry = entry;
            this.pickMeshes.push(mesh);
            this.pickables.push(entry);
            islandEntry.crystals.push(entry);
        });
        // Keyboard order: islands first, then their crystals get appended after
        // all islands in _buildShips (see focusables assembly there).
    },

    // ------------------------------------------------------------------
    // constellation lines
    // ------------------------------------------------------------------
    _buildConstellationLines() {
        this.constellationLines = [];
        for (let i = 0; i < this.islandEntries.length - 1; i++) {
            const a = this.islandEntries[i].group.userData.basePos;
            const b = this.islandEntries[i + 1].group.userData.basePos;
            const geo = new THREE.BufferGeometry().setFromPoints([
                a.clone().add(new THREE.Vector3(0, 0.4, 0)),
                b.clone().add(new THREE.Vector3(0, 0.4, 0)),
            ]);
            const mat = new THREE.LineBasicMaterial({
                color: PAL.line, transparent: true, opacity: 0.28,
                blending: THREE.AdditiveBlending,
            });
            const line = new THREE.Line(geo, mat);
            this.root.add(line);
            this.constellationLines.push(line);
        }
    },

    // ------------------------------------------------------------------
    // project ships
    // ------------------------------------------------------------------
    _buildShips() {
        this.shipEntries = [];
        const count = this.projects.length;

        this.projects.forEach((project, i) => {
            const ship = new THREE.Object3D();
            const body = new THREE.Mesh(this.geo.shipBody, this.mat.shipBody);
            body.castShadow = this.shadows;
            ship.add(body);
            const fin = new THREE.Mesh(this.geo.shipFin, this.mat.shipFin);
            fin.position.set(-0.18, 0.12, 0);
            ship.add(fin);
            const nose = new THREE.Mesh(this.geo.shipNose, this.mat.shipFin);
            nose.rotation.z = -Math.PI / 2;
            nose.position.x = 0.36;
            ship.add(nose);

            const engineColor = CRYSTAL_ACCENTS[i % CRYSTAL_ACCENTS.length];
            const trail = new THREE.Sprite(new THREE.SpriteMaterial({
                map: glowTexture(engineColor), transparent: true, opacity: 0.75,
                blending: THREE.AdditiveBlending, depthWrite: false,
            }));
            trail.position.x = -0.42;
            trail.scale.set(0.7, 0.28, 1);
            ship.add(trail);
            this.root.add(ship);

            const orbit = {
                radius: 7.4 + (i % 4) * 1.15,
                height: 0.2 + (i / Math.max(1, count - 1)) * 4.6,
                tilt: ((i % 3) - 1) * 0.12,
                angle: (i / Math.max(1, count)) * Math.PI * 2 + i * 0.9,
                speed: (this.reduceMotion ? 0 : 0.09 + (i % 3) * 0.03) * (i % 2 === 0 ? 1 : -1),
            };
            this._placeShip(ship, orbit, 0);

            const entry = {
                kind: 'project',
                project,
                ship,
                body,
                orbit,
                label: project.name || ('Project ' + (i + 1)),
                focusPoint: () => {
                    const p = new THREE.Vector3();
                    ship.getWorldPosition(p);
                    return p;
                },
                setHighlight: (on) => {
                    body.material = on ? this.mat.shipBodyBright : this.mat.shipBody;
                },
            };
            body.userData.pickEntry = entry;
            this.pickMeshes.push(body);
            this.pickables.push(entry);
            this.shipEntries.push(entry);
        });

        // Keyboard cycling order: islands → crystals → ships.
        this.islandEntries.forEach((isl) => {
            isl.crystals.forEach((c) => this.focusables.push(c));
        });
        this.shipEntries.forEach((s) => this.focusables.push(s));
    },

    _placeShip(ship, orbit, dtAhead) {
        const a = orbit.angle + (dtAhead || 0);
        const pos = new THREE.Vector3(
            TARGET.x + Math.cos(a) * orbit.radius,
            TARGET.y + orbit.height + Math.sin(a * 2) * orbit.tilt * orbit.radius * 0.3,
            TARGET.z + Math.sin(a) * orbit.radius
        );
        if (dtAhead === 0) {
            ship.position.copy(pos);
        }
        return pos;
    },

    // ------------------------------------------------------------------
    // shooting stars (pooled)
    // ------------------------------------------------------------------
    _initShootingStars() {
        this.shootingStars = [];
        for (let i = 0; i < 2; i++) {
            const mat = new THREE.SpriteMaterial({
                map: glowTexture(PAL.starWhite), transparent: true, opacity: 0,
                blending: THREE.AdditiveBlending, depthWrite: false, fog: false,
            });
            const sprite = new THREE.Sprite(mat);
            sprite.scale.set(3.2, 0.14, 1);
            sprite.visible = false;
            this.root.add(sprite);
            this.shootingStars.push({ sprite, active: false, t: 0, life: 1.1, from: new THREE.Vector3(), vel: new THREE.Vector3() });
        }
        this.nextShootingStarIn = 8 + Math.random() * 7;
    },

    _fireShootingStar() {
        const star = this.shootingStars.find((s) => !s.active);
        if (!star) return;
        const side = Math.random() > 0.5 ? 1 : -1;
        star.from.set(side * (20 + Math.random() * 10), 14 + Math.random() * 8, -22 + Math.random() * 14);
        star.vel.set(-side * (22 + Math.random() * 8), -(6 + Math.random() * 4), 3);
        star.t = 0;
        star.active = true;
        star.sprite.visible = true;
        star.sprite.material.rotation = Math.atan2(star.vel.y, star.vel.x);
    },

    // ------------------------------------------------------------------
    // DOM — injected styles, side panel, a11y buttons
    // ------------------------------------------------------------------
    _panelContainer() {
        return this.hud.el.parentNode || this.hud.el;
    },

    _injectStyles() {
        const style = document.createElement('style');
        style.id = 'cc-world-style';
        style.textContent =
            '.cc-panel{position:absolute;top:12px;right:12px;bottom:12px;width:min(300px,72%);' +
            'background:' + PAL.panelBg + ';color:' + PAL.panelText + ';border:1px solid rgba(159,143,224,.35);' +
            'border-radius:14px;padding:18px 18px 16px;box-sizing:border-box;overflow-y:auto;z-index:30;' +
            'backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);' +
            'box-shadow:0 10px 40px rgba(0,0,0,.45);font-size:.9rem;line-height:1.5;' +
            'transform:translateX(calc(100% + 24px));transition:transform .3s ease,opacity .3s ease;opacity:0;pointer-events:none;}' +
            '.cc-panel.cc-panel--open{transform:translateX(0);opacity:1;pointer-events:auto;}' +
            '.cc-panel--bottom{top:auto;left:12px;right:12px;bottom:12px;width:auto;max-height:45%;' +
            'transform:translateY(calc(100% + 24px));}' +
            '.cc-panel--bottom.cc-panel--open{transform:translateY(0);}' +
            '.cc-panel-close{position:absolute;top:10px;right:10px;width:30px;height:30px;border:0;border-radius:50%;' +
            'background:rgba(255,255,255,.08);color:' + PAL.panelText + ';cursor:pointer;font-size:1rem;line-height:1;}' +
            '.cc-panel-close:hover{background:rgba(255,255,255,.18);}' +
            '.cc-panel-eyebrow{display:block;font-size:.68rem;letter-spacing:.12em;text-transform:uppercase;' +
            'color:' + hexCss(PAL.accentCyan) + ';margin-bottom:6px;padding-right:28px;}' +
            '.cc-panel-title{margin:0 0 4px;font-size:1.15rem;color:#fff;padding-right:20px;}' +
            '.cc-panel-sub{margin:0 0 10px;font-size:.78rem;color:rgba(240,242,255,.65);}' +
            '.cc-panel-body{margin:0 0 12px;color:rgba(240,242,255,.88);}' +
            '.cc-panel-tags{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px;}' +
            '.cc-panel-tag{display:inline-block;padding:3px 10px;border-radius:999px;font-size:.7rem;' +
            'background:rgba(159,143,224,.18);border:1px solid rgba(159,143,224,.4);color:#cfc6ff;}' +
            '.cc-panel-link{display:inline-block;padding:7px 14px;border-radius:999px;font-size:.8rem;text-decoration:none;' +
            'background:linear-gradient(135deg,' + hexCss(PAL.accentCyan) + ',' + hexCss(PAL.accentPurple) + ');color:#0f1035;font-weight:600;}' +
            '.cc-panel-banner{margin-top:12px;padding:9px 12px;border-radius:10px;font-size:.78rem;' +
            'background:rgba(255,200,87,.14);border:1px solid rgba(255,200,87,.5);color:' + hexCss(PAL.beacon) + ';}';
        document.head.appendChild(style);
        this.styleEl = style;
    },

    _buildPanel() {
        const panel = document.createElement('div');
        panel.className = 'cc-panel';
        panel.setAttribute('role', 'complementary');
        panel.setAttribute('aria-label', 'Details');
        panel.innerHTML =
            '<button type="button" class="cc-panel-close" aria-label="Close details">✕</button>' +
            '<span class="cc-panel-eyebrow"></span>' +
            '<h3 class="cc-panel-title"></h3>' +
            '<p class="cc-panel-sub"></p>' +
            '<p class="cc-panel-body"></p>' +
            '<div class="cc-panel-tags"></div>' +
            '<div class="cc-panel-extra"></div>';
        this._panelContainer().appendChild(panel);
        this.panelEl = panel;
        this.panelOpen = false;

        // Interacting with the panel must not orbit/tap the scene behind it.
        const swallow = (e) => e.stopPropagation();
        panel.addEventListener('pointerdown', swallow);
        panel.addEventListener('pointerup', swallow);
        panel.addEventListener('wheel', swallow);

        const closeBtn = panel.querySelector('.cc-panel-close');
        const onClose = () => this._closePanel();
        closeBtn.addEventListener('click', onClose);

        const onResize = () => this._updatePanelDock();
        window.addEventListener('resize', onResize);
        this.disposers.push(() => window.removeEventListener('resize', onResize));
        this._updatePanelDock();
    },

    _updatePanelDock() {
        if (!this.panelEl) return;
        const w = this._panelContainer().clientWidth || window.innerWidth;
        this.panelEl.classList.toggle('cc-panel--bottom', w < 640);
    },

    _openPanel({ eyebrow, title, sub, body, tags, extraHtml }) {
        const p = this.panelEl;
        if (!p) return;
        p.querySelector('.cc-panel-eyebrow').textContent = eyebrow || '';
        p.querySelector('.cc-panel-title').textContent = title || '';
        const subEl = p.querySelector('.cc-panel-sub');
        subEl.textContent = sub || '';
        subEl.style.display = sub ? '' : 'none';
        p.querySelector('.cc-panel-body').textContent = body || '';
        p.querySelector('.cc-panel-tags').innerHTML = (tags || [])
            .map((t) => '<span class="cc-panel-tag">' + escapeHtml(t) + '</span>').join('');
        let extra = extraHtml || '';
        if (this.constellationComplete) {
            extra += '<div class="cc-panel-banner">★ Career constellation complete</div>';
        }
        p.querySelector('.cc-panel-extra').innerHTML = extra;
        this._updatePanelDock();
        p.classList.add('cc-panel--open');
        this.panelOpen = true;
    },

    _closePanel() {
        if (!this.panelEl || !this.panelOpen) return;
        this.panelEl.classList.remove('cc-panel--open');
        this.panelOpen = false;
        this._setSelected(null);
    },

    _buildA11yButtons() {
        const list = document.createElement('div');
        list.className = 'visually-hidden';
        list.setAttribute('role', 'group');
        list.setAttribute('aria-label', 'Career constellation — companies, skills and projects');
        const kindWord = { company: 'Company', skill: 'Skill', project: 'Project' };
        this.pickables.forEach((entry) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.textContent = (kindWord[entry.kind] || 'Node') + ': ' + entry.label;
            btn.addEventListener('click', () => this._selectEntry(entry));
            list.appendChild(btn);
        });
        this._panelContainer().appendChild(list);
        this.a11yList = list;
    },

    // ------------------------------------------------------------------
    // label sprites
    // ------------------------------------------------------------------
    _makeLabelSprite(text) {
        const w = 512, h = 96;
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const g = canvas.getContext('2d');
        g.clearRect(0, 0, w, h);
        let fontSize = 40;
        g.font = '600 ' + fontSize + 'px "Segoe UI", system-ui, sans-serif';
        while (g.measureText(text).width > w - 60 && fontSize > 18) {
            fontSize -= 2;
            g.font = '600 ' + fontSize + 'px "Segoe UI", system-ui, sans-serif';
        }
        g.textAlign = 'center';
        g.textBaseline = 'middle';
        g.shadowColor = 'rgba(10,10,40,0.9)';
        g.shadowBlur = 10;
        g.shadowOffsetY = 2;
        g.fillStyle = '#f4f6ff';
        g.fillText(text, w / 2, h / 2);

        const tex = new THREE.CanvasTexture(canvas);
        this._ownTextures.push(tex);
        const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
            map: tex, transparent: true, depthWrite: false, fog: false,
        }));
        sprite.scale.set(2.6, 2.6 * (h / w), 1);
        return sprite;
    },

    // ------------------------------------------------------------------
    // input — tap, hover, keyboard
    // ------------------------------------------------------------------
    _setupInput() {
        const unsubTap = this.input.onTap(({ x, y }) => {
            const entry = this._raycastAt(x, y);
            if (entry) this._selectEntry(entry);
        });
        this.disposers.push(unsubTap);
    },

    _raycastAt(clientX, clientY) {
        const canvas = this.engine.renderer.domElement;
        const rect = canvas.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return null;
        if (clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom) return null;
        const ndcX = ((clientX - rect.left) / rect.width) * 2 - 1;
        const ndcY = -((clientY - rect.top) / rect.height) * 2 + 1;
        this.raycaster.setFromCamera({ x: ndcX, y: ndcY }, this.engine.camera);
        const hits = this.raycaster.intersectObjects(this.pickMeshes, false);
        return hits.length ? (hits[0].object.userData.pickEntry || null) : null;
    },

    _setupKeyboard() {
        const canvas = this.engine.renderer.domElement;
        this._keyboardActive = false;
        this._onKeyDown = (e) => {
            const inGame = this._keyboardActive ||
                document.activeElement === canvas ||
                (this.a11yList && this.a11yList.contains(document.activeElement)) ||
                (this.panelEl && this.panelEl.contains(document.activeElement));

            if (e.key === 'Escape') {
                if (this.panelOpen) { e.preventDefault(); this._closePanel(); }
                return;
            }
            if (e.key === 'Tab') {
                if (!inGame) return;
                e.preventDefault();
                this._cycleFocus(e.shiftKey ? -1 : 1);
                this._keyboardActive = true;
                return;
            }
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                if (!inGame && !this._keyboardActive) return;
                e.preventDefault();
                this._cycleFocus(e.key === 'ArrowRight' ? 1 : -1);
                this._keyboardActive = true;
                return;
            }
            if (e.key === 'Enter') {
                if (this.focusIndex >= 0 && this.focusables[this.focusIndex]) {
                    this._selectEntry(this.focusables[this.focusIndex]);
                }
                return;
            }
            if (e.key === '+' || e.key === '=') {
                this.camState.radius = Math.max(7, this.camState.radius - 0.9);
                return;
            }
            if (e.key === '-' || e.key === '_') {
                this.camState.radius = Math.min(22, this.camState.radius + 0.9);
            }
        };
        document.addEventListener('keydown', this._onKeyDown);
        this.disposers.push(() => document.removeEventListener('keydown', this._onKeyDown));
    },

    _cycleFocus(dir) {
        if (!this.focusables.length) return;
        this.focusIndex = (this.focusIndex + dir + this.focusables.length) % this.focusables.length;
        const entry = this.focusables[this.focusIndex];
        this._setSelected(entry);
        this._tweenToEntry(entry);
        this.hud.announce(entry.label + ' focused — press Enter to open');
    },

    // ------------------------------------------------------------------
    // selection / highlight / progress
    // ------------------------------------------------------------------
    _setSelected(entry) {
        if (this._selectedEntry && this._selectedEntry !== entry) {
            this._selectedEntry.setHighlight(false);
        }
        this._selectedEntry = entry || null;
        if (entry) entry.setHighlight(true);
    },

    _setHovered(entry) {
        if (this.hoveredEntry === entry) return;
        if (this.hoveredEntry && this.hoveredEntry !== this._selectedEntry) {
            this.hoveredEntry.setHighlight(false);
        }
        this.hoveredEntry = entry;
        if (entry && entry !== this._selectedEntry) entry.setHighlight(true);
        this.engine.renderer.domElement.style.cursor = entry ? 'pointer' : '';
    },

    _selectEntry(entry) {
        this._setSelected(entry);
        this._tweenToEntry(entry);

        if (entry.kind === 'company') {
            const company = entry.company;
            const tags = (company.skills || []).map((sid) => {
                const s = this.skillIndex.get(sid);
                return s ? s.label : sid;
            });
            this._openPanel({
                eyebrow: company.current ? 'Current · Company' : 'Company',
                title: company.name || '',
                sub: [company.role, company.period].filter(Boolean).join(' · '),
                body: company.blurb || '',
                tags,
            });
            this._markCompanyViewed(entry);
            this.hud.announce((company.name || 'Company') + ' details opened');
        } else if (entry.kind === 'skill') {
            this._openPanel({
                eyebrow: 'Skill crystal · ' + (entry.island.company.name || ''),
                title: entry.skill.label || entry.skill.id,
                sub: entry.skill.group ? ('Discipline: ' + entry.skill.group) : '',
                body: entry.skill.fact || '',
                tags: [],
            });
            this._markSkillFound(entry);
            this.hud.announce((entry.skill.label || 'Skill') + ' discovered');
        } else if (entry.kind === 'project') {
            const project = entry.project;
            const hasLink = project.url && project.url !== '#';
            this._openPanel({
                eyebrow: 'Project ship',
                title: project.name || '',
                sub: project.category || '',
                body: project.description || '',
                tags: [],
                extraHtml: hasLink
                    ? '<a class="cc-panel-link" href="' + escapeHtml(project.url) + '" target="_blank" rel="noopener">Visit site ↗</a>'
                    : '',
            });
            this.hud.announce((project.name || 'Project') + ' details opened');
        }
    },

    _markCompanyViewed(entry) {
        const id = entry.company.id != null ? entry.company.id : entry.index;
        if (this.companiesViewed.has(id)) return;
        this.companiesViewed.add(id);
        this._updateHud();
        if (!this.constellationComplete &&
            this.companies.length > 0 &&
            this.companiesViewed.size >= this.companies.length) {
            this._startCelebration();
        }
    },

    _markSkillFound(entry) {
        if (this.skillsFound.has(entry.key)) return;
        this.skillsFound.add(entry.key);
        entry.mesh.material = entry.mats.bright; // stays lit once discovered
        this._updateHud();
        if (this.skillsFound.size === this.skillsTotal && this.skillsTotal > 0) {
            toast(this._panelContainer(), 'Every skill crystal discovered!');
        }
    },

    _updateHud() {
        this.hud.setTopRight(
            'Companies ' + this.companiesViewed.size + '/' + this.companies.length +
            ' · Skills ' + this.skillsFound.size + '/' + this.skillsTotal
        );
    },

    // ------------------------------------------------------------------
    // celebration — constellation light-up + starburst
    // ------------------------------------------------------------------
    _startCelebration() {
        this.constellationComplete = true;
        this.celebration = { t: 0, burstFired: false, sprites: [] };
        toast(this._panelContainer(), 'Career constellation complete — the whole path is lit!');
        // Refresh the open panel so the banner appears immediately.
        if (this.panelOpen) {
            const extra = this.panelEl.querySelector('.cc-panel-extra');
            if (extra && !extra.querySelector('.cc-panel-banner')) {
                extra.innerHTML += '<div class="cc-panel-banner">★ Career constellation complete</div>';
            }
        }
    },

    _fireStarburst() {
        const top = this.islandEntries[this.islandEntries.length - 1];
        const origin = top ? top.focusPoint() : TARGET.clone();
        const sprites = [];
        for (let i = 0; i < 10; i++) {
            const mat = new THREE.SpriteMaterial({
                map: glowTexture(PAL.beacon), transparent: true, opacity: 0.9,
                blending: THREE.AdditiveBlending, depthWrite: false,
            });
            const s = new THREE.Sprite(mat);
            s.position.copy(origin);
            s.scale.setScalar(0.4);
            const a = (i / 10) * Math.PI * 2;
            s.userData.vel = new THREE.Vector3(Math.cos(a) * 2.4, 1.2 + Math.random(), Math.sin(a) * 2.4);
            this.root.add(s);
            sprites.push(s);
        }
        this.celebration.sprites = sprites;
    },

    _updateCelebration(dt) {
        const c = this.celebration;
        if (!c) return;
        c.t += dt;

        // Sequential gold light-up, one line every 0.45s.
        this.constellationLines.forEach((line, i) => {
            const local = (c.t - i * 0.45) / 0.6;
            if (local <= 0) return;
            const k = Math.min(1, local);
            line.material.color.lerpColors(new THREE.Color(PAL.line), new THREE.Color(PAL.lineLit), k);
            line.material.opacity = 0.28 + 0.62 * k;
        });

        const linesDone = 0.45 * this.constellationLines.length + 0.6;
        if (c.t >= linesDone && !c.burstFired) {
            c.burstFired = true;
            this._fireStarburst();
        }
        if (c.burstFired && c.sprites.length) {
            let alive = false;
            c.sprites.forEach((s) => {
                s.position.addScaledVector(s.userData.vel, dt);
                s.scale.multiplyScalar(1 + dt * 1.4);
                s.material.opacity -= dt * 0.7;
                if (s.material.opacity > 0) alive = true;
                else s.visible = false;
            });
            if (!alive) {
                c.sprites.forEach((s) => {
                    this.root.remove(s);
                    s.material.dispose();
                });
                c.sprites = [];
                this.celebration = null; // lines stay lit — anim state ends
            }
        }
    },

    // ------------------------------------------------------------------
    // camera
    // ------------------------------------------------------------------
    _applyCamera() {
        const { radius, theta, phi } = this.camState;
        this.engine.camera.position.set(
            TARGET.x + radius * Math.sin(phi) * Math.cos(theta),
            TARGET.y + radius * Math.cos(phi),
            TARGET.z + radius * Math.sin(phi) * Math.sin(theta)
        );
        this.engine.camera.lookAt(TARGET);
        this._lookTarget = TARGET.clone();
    },

    _tweenToEntry(entry) {
        const objPos = entry.focusPoint();
        const dist = entry.kind === 'company' ? 4.6 : entry.kind === 'skill' ? 2.4 : 2.8;
        const dir = objPos.clone().sub(TARGET);
        if (dir.lengthSq() < 0.001) dir.set(1, 0.2, 0);
        dir.normalize();
        const framePos = objPos.clone().addScaledVector(dir, dist).add(new THREE.Vector3(0, dist * 0.35, 0));

        this.cameraTween = {
            fromPos: this.engine.camera.position.clone(),
            toPos: framePos,
            fromTarget: this._lookTarget ? this._lookTarget.clone() : TARGET.clone(),
            toTarget: objPos.clone(),
            start: performance.now(),
            duration: 600,
        };
    },

    // ------------------------------------------------------------------
    // per-frame update
    // ------------------------------------------------------------------
    _update(dt) {
        this._time += dt;
        const t = this._time;

        // --- orbit drag ---
        const drag = this.input.consumeDrag();
        if (drag.x !== 0 || drag.y !== 0) {
            if (!this.userHasDragged) {
                this.userHasDragged = true;
                this.autoRotate = false; // never resumes
                this.hud.setBottom('');
            }
            this.camState.theta -= drag.x * 0.005;
            this.camState.phi -= drag.y * 0.005;
            this.camState.phi = Math.max(0.2, Math.min(Math.PI - 0.25, this.camState.phi));
            this.cameraTween = null; // dragging cancels any tween
            // Re-derive the spherical state so post-tween drags feel continuous.
        }

        // --- zoom ---
        const wheel = this.input.consumeWheel();
        if (wheel !== 0) {
            this.camState.radius = Math.max(7, Math.min(22, this.camState.radius + wheel * 0.004));
            this.cameraTween = null;
        }

        if (this.input.consumePause() && this.panelOpen) this._closePanel();

        if (this.autoRotate && !this.cameraTween) {
            this.camState.theta += dt * 0.05;
        }

        // --- ambient motion ---
        if (!this.reduceMotion) {
            this.islandEntries.forEach((entry) => {
                const base = entry.group.userData.basePos;
                entry.group.position.y = base.y + Math.sin(t * 0.7 + entry.group.userData.bobPhase) * 0.09;
                entry.shards.forEach((shard) => {
                    const sb = shard.userData.basePos;
                    shard.position.y = sb.y + Math.sin(t * 0.9 + shard.userData.phase) * 0.12;
                    shard.rotation.y += dt * 0.2;
                });
                entry.crystals.forEach((c) => {
                    c.orbit.angle += dt * c.orbit.speed;
                    c.mesh.position.set(
                        Math.cos(c.orbit.angle) * c.orbit.radius,
                        c.orbit.height + Math.sin(t * 1.1 + c.orbit.bobPhase) * 0.08,
                        Math.sin(c.orbit.angle) * c.orbit.radius
                    );
                    c.mesh.rotation.y += dt * 0.8;
                });
                if (entry.beacon) {
                    const pulse = 0.5 + Math.sin(t * 2.4) * 0.5;
                    entry.beacon.material.opacity = 0.2 + pulse * 0.25;
                    if (entry.beaconGlow) {
                        entry.beaconGlow.material.opacity = 0.45 + pulse * 0.4;
                        entry.beaconGlow.scale.setScalar(2.2 + pulse * 0.5);
                    }
                }
            });

            this.starClouds.forEach((cloud) => {
                cloud.rotation.y += dt * cloud.userData.spin * 10;
            });

            // Ships cruise and face their heading.
            this.shipEntries.forEach((entry) => {
                entry.orbit.angle += dt * entry.orbit.speed;
                this._placeShip(entry.ship, entry.orbit, 0);
                const ahead = this._placeShip(entry.ship, entry.orbit, entry.orbit.speed >= 0 ? 0.08 : -0.08);
                entry.ship.lookAt(ahead);
                entry.ship.rotateY(-Math.PI / 2); // body's long axis is +x
            });

            // Shooting stars.
            this.nextShootingStarIn -= dt;
            if (this.nextShootingStarIn <= 0) {
                this._fireShootingStar();
                this.nextShootingStarIn = 8 + Math.random() * 7;
            }
            this.shootingStars.forEach((star) => {
                if (!star.active) return;
                star.t += dt;
                const k = star.t / star.life;
                if (k >= 1) {
                    star.active = false;
                    star.sprite.visible = false;
                    return;
                }
                star.sprite.position.copy(star.from).addScaledVector(star.vel, star.t);
                star.sprite.material.opacity = 0.85 * Math.sin(Math.min(1, k) * Math.PI);
            });
        }

        // Celebration animation runs even under reduceMotion (it is a one-shot
        // reward, kept short) — but keep the starburst gentle.
        this._updateCelebration(dt);

        // --- hover (desktop, not while dragging) ---
        if (!this.input.state.pointerDown) {
            const px = this.input.state.pointerX, py = this.input.state.pointerY;
            if (px !== 0 || py !== 0) this._setHovered(this._raycastAt(px, py));
        }

        // --- camera: tween or spherical ---
        if (this.cameraTween) {
            const tw = this.cameraTween;
            const k = Math.min(1, (performance.now() - tw.start) / tw.duration);
            const e = easeOutCubic(k);
            this.engine.camera.position.lerpVectors(tw.fromPos, tw.toPos, e);
            const look = new THREE.Vector3().lerpVectors(tw.fromTarget, tw.toTarget, e);
            this.engine.camera.lookAt(look);
            this._lookTarget = look;
            if (k >= 1) {
                this.cameraTween = null;
                // Sync spherical state with where the tween left the camera so
                // the next drag continues smoothly from here.
                const rel = this.engine.camera.position.clone().sub(TARGET);
                this.camState.radius = Math.max(7, Math.min(22, rel.length()));
                this.camState.theta = Math.atan2(rel.z, rel.x);
                this.camState.phi = Math.acos(Math.max(-1, Math.min(1, rel.y / rel.length())));
                this._tweenHold = true; // keep looking at the object until user moves
                this._heldLook = look.clone();
            }
        } else if (this._tweenHold) {
            // Hold framing after a tween until the user drags/zooms again.
            this.engine.camera.lookAt(this._heldLook);
            if (drag.x !== 0 || drag.y !== 0 || wheel !== 0) {
                this._tweenHold = false;
                this._applyCamera();
            }
        } else {
            this._applyCamera();
        }

        // Drag/zoom always breaks the hold immediately (checked above too, but
        // consumeDrag happened before the hold branch on this same frame).
        if (this._tweenHold && (drag.x !== 0 || drag.y !== 0 || wheel !== 0)) {
            this._tweenHold = false;
        }
    },
};
