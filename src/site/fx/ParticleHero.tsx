import { useEffect, useRef } from 'react';

/*
  Generative hero (web-design-skills · field-io recipe): a particle field that flies in and
  resolves into the real <h1>, then hands over to the live text and dissolves into a slow,
  cursor-reactive drift. Canvas 2D, no library.

  - The headline is always real DOM text (SEO, screen readers). It is hidden only while the
    particles assemble, and shown at once without JS, under reduced motion, or on any error.
  - Pauses when the hero is off screen or the tab is hidden; capped pixel ratio.
*/

type P = { x: number; y: number; tx: number; ty: number; vx: number; vy: number; d: number; c: string; s: number };

const CORAL = [255, 74, 54];
const MAGENTA = [255, 61, 139];
const CYAN = [25, 211, 255];

function mix(a: number[], b: number[], t: number) {
  return a.map((v, i) => Math.round(v + (b[i] - v) * t));
}
function tone(t: number) {
  const c = t < 0.5 ? mix(CORAL, MAGENTA, t * 2) : mix(MAGENTA, CYAN, (t - 0.5) * 2);
  return `${c[0]},${c[1]},${c[2]}`;
}
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

/** Sample the headline's visible words as points, in the canvas's coordinate space. */
function sampleHeadline(h1: HTMLElement, host: DOMRect, step: number) {
  const off = document.createElement('canvas');
  off.width = Math.ceil(host.width);
  off.height = Math.ceil(host.height);
  const ctx = off.getContext('2d', { willReadFrequently: true });
  if (!ctx) return [];
  const walker = document.createTreeWalker(h1, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  let node: Node | null;
  while ((node = walker.nextNode())) {
    const text = node.nodeValue || '';
    const el = node.parentElement!;
    const cs = getComputedStyle(el);
    ctx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    if ('letterSpacing' in ctx) (ctx as unknown as { letterSpacing: string }).letterSpacing = cs.letterSpacing === 'normal' ? '0px' : cs.letterSpacing;
    ctx.fillStyle = '#fff';
    ctx.textBaseline = 'alphabetic';
    ctx.direction = (getComputedStyle(h1).direction as CanvasDirection) || 'ltr';
    const re = /\S+/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(text))) {
      range.setStart(node, m.index);
      range.setEnd(node, m.index + m[0].length);
      const r = range.getBoundingClientRect();
      if (!r.width) continue;
      const met = ctx.measureText(m[0]);
      const asc = met.fontBoundingBoxAscent ?? r.height * 0.8;
      const desc = met.fontBoundingBoxDescent ?? r.height * 0.2;
      const y = r.top - host.top + (r.height - (asc + desc)) / 2 + asc;
      ctx.textAlign = ctx.direction === 'rtl' ? 'right' : 'left';
      ctx.fillText(m[0], ctx.direction === 'rtl' ? r.right - host.left : r.left - host.left, y);
    }
  }
  const { data, width, height } = ctx.getImageData(0, 0, off.width, off.height);
  const pts: [number, number][] = [];
  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      if (data[(y * width + x) * 4 + 3] > 140) pts.push([x, y]);
    }
  }
  return pts;
}

export function ParticleHero({ targetId, runKey }: { targetId: string; runKey: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const h1 = document.getElementById(targetId);
    const host = canvas?.parentElement;
    if (!canvas || !h1 || !host) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = canvas.getContext('2d');
    if (!ctx || reduced) {
      h1.classList.remove('is-assembling');
      return;
    }

    const phone = window.innerWidth < 640;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let W = 0, H = 0;
    let parts: P[] = [];
    let raf = 0, running = true, visible = true;
    let t0 = 0;
    let handedOver = false;
    const mouse = { x: -9999, y: -9999 };
    const ASSEMBLE = 1300; // ms to resolve into the headline
    const HOLD = 150;

    const build = () => {
      const r = host.getBoundingClientRect();
      W = r.width;
      H = r.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const pts = sampleHeadline(h1, r, phone ? 4 : 3);
      const minX = Math.min(...pts.map((p) => p[0]), W), maxX = Math.max(...pts.map((p) => p[0]), 0);
      parts = pts.map(([tx, ty]) => {
        const a = Math.random() * Math.PI * 2;
        const rad = Math.max(W, H) * (0.4 + Math.random() * 0.6);
        return {
          x: tx + Math.cos(a) * rad,
          y: ty + Math.sin(a) * rad,
          tx,
          ty,
          vx: 0,
          vy: 0,
          d: Math.random() * 0.45, // stagger
          c: tone((tx - minX) / Math.max(1, maxX - minX)),
          s: 0.9 + Math.random() * 1.1,
        };
      });
      // a sparse ambient field around the words
      const extra = phone ? 140 : 380;
      for (let i = 0; i < extra; i++) {
        const tx = Math.random() * W, ty = Math.random() * H;
        parts.push({ x: tx, y: ty, tx, ty, vx: 0, vy: 0, d: -1, c: tone(Math.random()), s: 0.6 + Math.random() * 0.9 });
      }
    };

    const frame = (now: number) => {
      raf = 0;
      if (!running || !visible) return;
      if (!t0) t0 = now;
      const el = now - t0;
      ctx.clearRect(0, 0, W, H);
      const released = el > ASSEMBLE + HOLD;
      if (released && !handedOver) {
        handedOver = true;
        h1.classList.remove('is-assembling');
      }
      const fade = released ? Math.max(0.22, 1 - (el - ASSEMBLE - HOLD) / 900) : 1;
      for (const p of parts) {
        if (p.d < 0) {
          // ambient dust: slow flow field
          p.x += Math.sin((p.y + now * 0.02) * 0.008) * 0.25;
          p.y += Math.cos((p.x + now * 0.015) * 0.008) * 0.25;
        } else if (!released) {
          const k = easeOutExpo(Math.min(1, Math.max(0, (el / ASSEMBLE - p.d) / (1 - p.d))));
          p.x = p.x + (p.tx - p.x) * (0.06 + 0.5 * k * k);
          p.y = p.y + (p.ty - p.y) * (0.06 + 0.5 * k * k);
        } else {
          // released: drift with a soft flow, and give way to the cursor
          p.vx += Math.sin((p.ty + now * 0.03) * 0.01) * 0.012;
          p.vy += Math.cos((p.tx + now * 0.025) * 0.01) * 0.012 - 0.004;
          p.vx *= 0.96;
          p.vy *= 0.96;
          p.x += p.vx;
          p.y += p.vy;
        }
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 14400) {
          const f = (1 - d2 / 14400) * 2.4;
          const d = Math.sqrt(d2) || 1;
          p.x += (dx / d) * f;
          p.y += (dy / d) * f;
        }
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;
        const a = p.d < 0 ? 0.35 : fade;
        ctx.fillStyle = `rgba(${p.c},${a})`;
        ctx.fillRect(p.x, p.y, p.s, p.s);
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (!raf && running && visible) raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      start();
    });
    const onVis = () => {
      running = !document.hidden;
      start();
    };
    let resizeT = 0;
    const onResize = () => {
      clearTimeout(resizeT);
      resizeT = window.setTimeout(() => {
        build();
        if (handedOver) for (const p of parts) if (p.d >= 0) { p.x = p.tx; p.y = p.ty; }
      }, 150);
    };

    const go = () => {
      try {
        build();
        if (!parts.length) throw new Error('no glyphs sampled');
        io.observe(host);
        start();
      } catch {
        h1.classList.remove('is-assembling');
      }
    };
    // wait for the display face so the sampled shape matches the real text
    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    Promise.race([fontsReady, new Promise((r) => setTimeout(r, 600))]).then(go);
    // safety net: never leave the headline hidden
    const safety = window.setTimeout(() => h1.classList.remove('is-assembling'), ASSEMBLE + HOLD + 2500);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(safety);
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('resize', onResize);
      h1.classList.remove('is-assembling');
    };
  }, [targetId, runKey]);

  return <canvas ref={ref} className="particles" aria-hidden="true" />;
}
