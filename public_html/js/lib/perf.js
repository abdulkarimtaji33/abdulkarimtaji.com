// perf.js — device tiering + a rolling FPS meter. No rendering logic here.

export function detectTier() {
    const memory = navigator.deviceMemory || 4;
    const cores = navigator.hardwareConcurrency || 4;
    const narrow = window.innerWidth < 640;
    const isLow = memory <= 4 || cores <= 4 || narrow;

    return isLow
        ? { tier: 'low', dprCap: 1.5, shadows: false, particleScale: 0.4 }
        : { tier: 'high', dprCap: 2, shadows: true, particleScale: 1 };
}

/**
 * createFpsMeter() -> { tick(), get() }
 * Call tick() once per rendered frame; get() returns the rolling average fps.
 */
export function createFpsMeter(sampleSize = 60) {
    const samples = [];
    let last = performance.now();

    return {
        tick() {
            const now = performance.now();
            const dt = now - last;
            last = now;
            if (dt > 0) {
                samples.push(1000 / dt);
                if (samples.length > sampleSize) samples.shift();
            }
        },
        get() {
            if (!samples.length) return 60;
            return samples.reduce((a, b) => a + b, 0) / samples.length;
        },
    };
}
