'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Moteur d'animations SAAR Lab (porté de la classe DCLogic du prototype).
 * - canvas[data-field] : réseau de particules (hero)
 * - canvas[data-art="wave|grid|pulse|orbit"] : vignettes génératives
 * - [data-reveal] : apparition au scroll
 * - [data-spin] : rotation lente du logo
 * Re-scanne à chaque navigation (dépendance usePathname). Aucun rendu DOM.
 */
export default function SaarMotion() {
  const pathname = usePathname();
  const reduceRef = useRef(false);
  const rafRef = useRef(0);

  // Boucle de dessin (montée une fois) — interroge le DOM vivant à chaque frame.
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    reduceRef.current = reduce;
    const fnodes = new WeakMap<HTMLCanvasElement, { x: number; y: number; vx: number; vy: number }[]>();

    const size = (c: HTMLCanvasElement) => {
      const r = c.getBoundingClientRect();
      const d = Math.min(2, window.devicePixelRatio || 1);
      const w = Math.max(1, Math.round(r.width * d));
      const h = Math.max(1, Math.round(r.height * d));
      if (c.width !== w) c.width = w;
      if (c.height !== h) c.height = h;
    };

    const field = (x: CanvasRenderingContext2D, W: number, H: number, t: number, c: HTMLCanvasElement) => {
      let nodes = fnodes.get(c);
      if (!nodes) {
        const n = Math.round(Math.min(90, (W * H) / 26000));
        nodes = Array.from({ length: n }, () => ({ x: Math.random(), y: Math.random(), vx: (Math.random() - 0.5) * 0.02, vy: (Math.random() - 0.5) * 0.02 }));
        fnodes.set(c, nodes);
      }
      const L = Math.min(W, H) * 0.22;
      const P = nodes.map((p) => ({ x: (((p.x + p.vx * t) % 1) + 1) % 1 * W, y: (((p.y + p.vy * t) % 1) + 1) % 1 * H }));
      x.lineWidth = 1;
      for (let i = 0; i < P.length; i++)
        for (let j = i + 1; j < P.length; j++) {
          const d = Math.hypot(P[i].x - P[j].x, P[i].y - P[j].y);
          if (d < L) { x.strokeStyle = `rgba(21,86,240,${0.22 * (1 - d / L)})`; x.beginPath(); x.moveTo(P[i].x, P[i].y); x.lineTo(P[j].x, P[j].y); x.stroke(); }
        }
      x.fillStyle = 'rgba(21,86,240,0.5)';
      P.forEach((p) => { x.beginPath(); x.arc(p.x, p.y, 2.2, 0, 7); x.fill(); });
    };

    const drawArt = (x: CanvasRenderingContext2D, k: string | undefined, W: number, H: number, t: number) => {
      const m = Math.min(W, H);
      if (k === 'wave') {
        for (let i = 0; i < 14; i++) {
          x.beginPath();
          for (let px = 0; px <= W; px += 6) {
            const y = H / 2 + Math.sin((px / W) * 6 + t * 1.2 + i * 0.35) * H * 0.18 * Math.sin((i / 14) * Math.PI) + (i - 7) * H * 0.012;
            px ? x.lineTo(px, y) : x.moveTo(px, y);
          }
          x.strokeStyle = `rgba(${41 + i * 6},${120 + i * 6},255,${0.25 + i / 28})`;
          x.lineWidth = Math.max(1, m / 220); x.stroke();
        }
      } else if (k === 'grid') {
        const n = 7, s = W / n;
        for (let i = 0; i < n; i++) for (let j = 0; j < Math.ceil(H / s); j++) {
          const v = (Math.sin(i * 1.3 + j * 0.9 + t * 1.5) + 1) / 2;
          x.fillStyle = `rgba(41,151,255,${0.08 + v * 0.6})`;
          x.fillRect(i * s + s * 0.18, j * s + s * 0.18, s * 0.64, s * 0.64);
        }
      } else if (k === 'pulse') {
        for (let i = 0; i < 4; i++) {
          const p = (t * 0.5 + i / 4) % 1;
          x.beginPath(); x.arc(W / 2, H / 2, p * m * 0.5, 0, 7);
          x.strokeStyle = `rgba(41,151,255,${1 - p})`; x.lineWidth = m / 30; x.stroke();
        }
      } else {
        for (let i = 0; i < 3; i++) {
          const a = t * (0.8 + i * 0.3) + i * 2;
          x.beginPath(); x.ellipse(W / 2, H / 2, m * (0.18 + i * 0.1), m * (0.08 + i * 0.05), a, 0, 7);
          x.strokeStyle = `rgba(41,151,255,${0.9 - i * 0.25})`; x.lineWidth = m / 40; x.stroke();
        }
      }
    };

    const loop = (ms: number) => {
      const t = reduce ? 0 : ms / 1000;
      document.querySelectorAll<HTMLCanvasElement>('canvas[data-field],canvas[data-art]').forEach((c) => {
        const r = c.getBoundingClientRect();
        if (r.width === 0 || r.bottom < 0 || r.top > window.innerHeight) return;
        size(c);
        const x = c.getContext('2d'); if (!x) return;
        const W = c.width, H = c.height; x.clearRect(0, 0, W, H);
        if (c.dataset.field) { field(x, W, H, t, c); return; }
        x.fillStyle = '#000'; x.fillRect(0, 0, W, H);
        drawArt(x, c.dataset.art, W, H, t);
      });
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Reveal + spin : (re)câblés à chaque navigation.
  useEffect(() => {
    const reduce = reduceRef.current;
    if (!reduce) {
      document.querySelectorAll<HTMLElement>('[data-spin]').forEach((el) => {
        if (el.dataset.spun) return;
        el.dataset.spun = '1';
        el.animate([{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }], { duration: 40000, iterations: Infinity });
      });
    }
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        (e.target as HTMLElement).style.opacity = '1';
        (e.target as HTMLElement).style.transform = 'none';
      }),
      { threshold: 0.12 }
    );
    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      if (el.dataset.wired) return;
      el.dataset.wired = '1';
      if (reduce) return;
      const d = +(el.dataset.reveal || 0) || 0;
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = `opacity .9s cubic-bezier(.2,.7,.2,1) ${d * 80}ms, transform 1s cubic-bezier(.2,.7,.2,1) ${d * 80}ms`;
      io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
