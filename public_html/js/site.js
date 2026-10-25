// site.js — page behaviour. Everything is progressive: with JS off the page is plain, readable HTML.
const root = document.documentElement;
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const seen = (() => { try { return !!sessionStorage.getItem('akt-seen'); } catch (e) { return false; } })();
const heroSrc = document.currentScript ? document.currentScript.dataset.hero : (document.querySelector('script[data-hero]') || {}).dataset.hero;

const gsap = window.gsap;
const ScrollTrigger = window.ScrollTrigger;
if (gsap && ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

/* ---------- toast + copy ---------- */
const toastEl = $('#toast');
let toastTimer;
function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-on'), 2200);
}
async function copyText(text) {
    try { await navigator.clipboard.writeText(text); return true; } catch (e) { /* fall through */ }
    try {
        const ta = document.createElement('textarea');
        ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        const ok = document.execCommand('copy');
        ta.remove();
        return ok;
    } catch (e) { return false; }
}
$$('[data-copy]').forEach((b) => b.addEventListener('click', async () => {
    const ok = await copyText(b.dataset.copy);
    toast(ok ? b.dataset.label || 'Copied' : 'Copy failed, select the text manually');
}));

/* ---------- Dubai clock ---------- */
const clockEl = $('#dubaiTime');
function tick() {
    try { clockEl.textContent = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Dubai' }).format(new Date()); } catch (e) { /* ignore */ }
}
if (clockEl) { tick(); setInterval(tick, 20000); }

/* ---------- nav ---------- */
const nav = $('#nav');
const toggle = $('#navToggle');
const menu = $('#menu');
let lastY = 0;
let lenis = null;

function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (open) { menu.hidden = false; requestAnimationFrame(() => menu.classList.add('is-open')); }
    else { menu.classList.remove('is-open'); menu.hidden = true; }
    document.body.style.overflow = open ? 'hidden' : '';
    if (lenis) open ? lenis.stop() : lenis.start();
    if (open) $('a', menu).focus();
}
toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
$$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setMenu(false); toggle.focus(); }
    if (e.key === 'Tab' && toggle.getAttribute('aria-expanded') === 'true') {
        const f = [toggle, ...$$('a', menu)];
        const i = f.indexOf(document.activeElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
    }
});
window.matchMedia('(min-width: 900px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });

function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle('is-solid', y > 80);
    nav.classList.toggle('is-hidden', y > 400 && y > lastY + 4 && toggle.getAttribute('aria-expanded') !== 'true');
    if (y < lastY - 4 || y < 400) nav.classList.remove('is-hidden');
    lastY = y;
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// active section
const links = $$('.nav-links a[href^="#"]');
const secs = links.map((a) => $(a.getAttribute('href'))).filter(Boolean);
if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
        if (en.isIntersecting) links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id));
    }), { rootMargin: '-45% 0px -50% 0px' });
    secs.forEach((s) => io.observe(s));
}

/* ---------- reveals (work even without GSAP) ---------- */
if ('IntersectionObserver' in window && !reduce) {
    const rio = new IntersectionObserver((entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('is-in'); rio.unobserve(en.target); }
    }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    $$('.reveal').forEach((el) => rio.observe(el));
} else {
    $$('.reveal').forEach((el) => el.classList.add('is-in'));
}

/* ---------- counters ---------- */
function runCount(el) {
    const end = Number(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    if (reduce || !end) { el.textContent = end + suffix; return; }
    const t0 = performance.now();
    const dur = 1400;
    (function step(now) {
        const p = Math.min(1, (now - t0) / dur);
        const e = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.round(end * e) + suffix;
        if (p < 1) requestAnimationFrame(step);
    })(t0);
}
if ('IntersectionObserver' in window) {
    const cio = new IntersectionObserver((entries) => entries.forEach((en) => {
        if (en.isIntersecting) { runCount(en.target); cio.unobserve(en.target); }
    }), { threshold: 0.6 });
    $$('[data-count]').forEach((el) => { el.textContent = '0' + (el.dataset.suffix || ''); cio.observe(el); });
}

/* ---------- skills: spotlight + facts ---------- */
$$('.spot').forEach((c) => c.addEventListener('pointermove', (e) => {
    const r = c.getBoundingClientRect();
    c.style.setProperty('--mx', e.clientX - r.left + 'px');
    c.style.setProperty('--my', e.clientY - r.top + 'px');
}));
$$('.bento .card').forEach((card) => {
    const out = $('.fact', card);
    const show = (b) => {
        $$('.skill', card).forEach((s) => s.classList.toggle('is-on', s === b));
        out.textContent = b.dataset.fact;
        out.classList.add('is-on');
    };
    $$('.skill', card).forEach((b) => {
        b.addEventListener('click', () => show(b));
        b.addEventListener('focus', () => show(b));
        if (finePointer) b.addEventListener('pointerenter', () => show(b));
    });
});

/* ---------- project filters ---------- */
const cards = $$('#projectGrid .pcard');
$$('.pill').forEach((p) => p.addEventListener('click', () => {
    $$('.pill').forEach((x) => { x.classList.toggle('is-on', x === p); x.setAttribute('aria-pressed', String(x === p)); });
    const f = p.dataset.filter;
    cards.forEach((c) => c.classList.toggle('is-off', f !== 'all' && c.dataset.cat !== f));
    if (ScrollTrigger) ScrollTrigger.refresh();
}));

/* ---------- Lenis (desktop fine pointers only) ---------- */
if (window.Lenis && finePointer && !reduce && gsap) {
    lenis = new window.Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    $$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        const target = id.length > 1 ? $(id) : null;
        if (!target && id !== '#home') return;
        e.preventDefault();
        lenis.scrollTo(id === '#home' ? 0 : target, { offset: -10 });
    }));
}

/* ---------- custom cursor + magnetic ---------- */
if (finePointer && gsap) {
    const cur = $('#cursor');
    const dot = $('i', cur), ring = $('b', cur);
    const xd = gsap.quickTo(dot, 'x', { duration: 0.05 }), yd = gsap.quickTo(dot, 'y', { duration: 0.05 });
    const xr = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3' }), yr = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3' });
    window.addEventListener('pointermove', (e) => { xd(e.clientX); yd(e.clientY); xr(e.clientX); yr(e.clientY); }, { passive: true });
    document.addEventListener('pointerover', (e) => cur.classList.toggle('is-hot', !!e.target.closest('a, button, .skill')));
    if (!reduce) {
        $$('.magnetic').forEach((el) => {
            const mx = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' }), my = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
            el.addEventListener('pointermove', (e) => {
                const r = el.getBoundingClientRect();
                mx((e.clientX - (r.left + r.width / 2)) * 0.22);
                my((e.clientY - (r.top + r.height / 2)) * 0.3);
            });
            el.addEventListener('pointerleave', () => { mx(0); my(0); });
        });
    }
}

/* ---------- GSAP scroll choreography ---------- */
if (gsap && ScrollTrigger && !reduce) {
    // portrait parallax
    const img = $('[data-parallax]');
    if (img) gsap.fromTo(img, { yPercent: -7 }, { yPercent: 7, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });

    // timeline line + lit dots
    const fill = $('#tlFill');
    const tl = $('#timeline');
    if (fill && tl) {
        gsap.to(fill, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: tl, start: 'top 70%', end: 'bottom 60%', scrub: true } });
        $$('.tl-item', tl).forEach((it) => ScrollTrigger.create({ trigger: it, start: 'top 62%', onEnter: () => it.classList.add('is-lit'), onLeaveBack: () => it.classList.remove('is-lit') }));
    }
}

/* ---------- stacking cards (featured work) ---------- */
(function stackCards() {
    const list = $('#stackList');
    if (!list) return;
    const items = $$('.stack-item', list);
    const dots = $$('.rail-dot');
    const nEl = $('#railN'), nameEl = $('#railName');
    const topOf = (el) => parseFloat(getComputedStyle(el).top) || 0;
    const stuck = () => getComputedStyle(items[0]).position === 'sticky';

    // the covered card shrinks and dims as the next one slides over it
    if (gsap && ScrollTrigger && !reduce) {
        items.forEach((it, i) => {
            const next = items[i + 1];
            if (!next) return;
            gsap.to($('.slide', it), {
                scale: 0.93, filter: 'brightness(.5)', ease: 'none',
                scrollTrigger: {
                    trigger: next, start: 'top bottom-=80',
                    end: () => 'top ' + (stuck() ? topOf(next) + 'px' : '-100%'),
                    scrub: true, invalidateOnRefresh: true,
                },
            });
        });
    }

    // which card is on top right now -> counter, name, dots
    let active = -1;
    function sync() {
        let idx = 0;
        if (stuck()) items.forEach((it, i) => { if (it.getBoundingClientRect().top <= topOf(it) + 40) idx = i; });
        else items.forEach((it, i) => { if (it.getBoundingClientRect().top <= window.innerHeight * 0.4) idx = i; });
        if (idx === active) return;
        active = idx;
        if (nEl) nEl.textContent = String(idx + 1).padStart(2, '0');
        if (nameEl && dots[idx]) nameEl.textContent = dots[idx].dataset.name;
        dots.forEach((d, i) => d.classList.toggle('is-on', i === idx));
    }
    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    sync();

    // click a dot -> scroll so that card is the one on top
    dots.forEach((d) => d.addEventListener('click', () => {
        const i = Number(d.dataset.go);
        let y = list.getBoundingClientRect().top + window.scrollY;
        for (let k = 0; k < i; k++) y += items[k].offsetHeight;
        y -= stuck() ? topOf(items[i]) : 90;
        if (lenis) lenis.scrollTo(y); else window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
    }));
})();

/* ---------- intro: preloader + hero entrance ---------- */
function heroIn() {
    const lines = $$('[data-hero="line"]');
    const ups = $$('[data-hero="up"]');
    if (!gsap || reduce) { lines.concat(ups).forEach((e) => { e.style.opacity = 1; }); return; }
    gsap.set(lines, { yPercent: 110, opacity: 1 });
    gsap.to(lines, { yPercent: 0, duration: 1.2, ease: 'expo.out', stagger: 0.1 });
    gsap.fromTo(ups, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'expo.out', stagger: 0.09, delay: 0.25 });
}
function finishIntro() {
    try { sessionStorage.setItem('akt-seen', '1'); } catch (e) { /* ignore */ }
    const pre = $('#preloader');
    if (!seen && pre && gsap && !reduce) {
        gsap.to(pre, { yPercent: -100, duration: 0.9, ease: 'expo.inOut', onComplete: () => { pre.style.display = 'none'; } });
        gsap.delayedCall(0.35, heroIn);
    } else {
        if (pre) pre.style.display = 'none';
        heroIn();
    }
    initHero();
}

/* ---------- WebGL hero (lazy) ---------- */
let heroCtl = null;
function webglOK() {
    try { const c = document.createElement('canvas'); return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl'))); } catch (e) { return false; }
}
function initHero() {
    if (reduce || /[?&]nowebgl\b/.test(location.search) || !webglOK() || !heroSrc) return;
    const run = () => import(heroSrc)
        .then((m) => { heroCtl = m.createHero($('#heroCanvas'), $('#home')); window.__hero = heroCtl; })
        .catch(() => { /* poster stays */ });
    if ('requestIdleCallback' in window) requestIdleCallback(run, { timeout: 1200 }); else setTimeout(run, 200);
}

const delay = seen || reduce || !gsap ? 0 : 1100;
const go = () => setTimeout(finishIntro, delay);
if (document.readyState === 'complete') go(); else window.addEventListener('load', go, { once: true });
