"use client";
import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number; phase: number; c: string };
type Pulse = { a: number; b: number; t: number; speed: number };

// teal, sky, violet, rose, amber, mint
const PALETTE = ["118, 205, 190", "128, 172, 236", "176, 150, 240", "236, 146, 172", "236, 196, 120", "150, 220, 170"];

const LINK_DIST = 160;
const MOUSE_DIST = 220;
const MAX_PULSES = 14;

export default function DynamicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let links: [number, number][] = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    let running = true;
    let lastSpawn = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(Math.min(95, Math.max(30, (width * height) / 18000)));
      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.4 + 0.7,
        phase: Math.random() * Math.PI * 2,
        c: PALETTE[i % PALETTE.length],
      }));
      pulses = [];
    };

    const glow = (x: number, y: number, radius: number, c: string, alpha: number) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
      g.addColorStop(0, `rgba(${c}, ${alpha})`);
      g.addColorStop(1, `rgba(${c}, 0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;

      for (const n of nodes) {
        if (reduceMotion) continue;
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;

        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < MOUSE_DIST && d > 0.1) {
          const f = (1 - d / MOUSE_DIST) * 0.35;
          n.x += (dx / d) * f;
          n.y += (dy / d) * f;
        }
      }

      links = [];
      ctx.lineWidth = 0.75;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > LINK_DIST) continue;
          links.push([i, j]);
          const mx = (a.x + b.x) / 2 - mouse.x;
          const my = (a.y + b.y) / 2 - mouse.y;
          const near = Math.max(0, 1 - Math.hypot(mx, my) / MOUSE_DIST);
          const alpha = (1 - d / LINK_DIST) * (0.1 + near * 0.25);
          const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          grad.addColorStop(0, `rgba(${a.c}, ${alpha})`);
          grad.addColorStop(1, `rgba(${b.c}, ${alpha})`);
          ctx.strokeStyle = grad;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Signals travelling along the network
      if (!reduceMotion) {
        if (t - lastSpawn > 320 && pulses.length < MAX_PULSES && links.length) {
          const [a, b] = links[Math.floor(Math.random() * links.length)];
          pulses.push(Math.random() < 0.5 ? { a, b, t: 0, speed: 0.006 + Math.random() * 0.008 } : { a: b, b: a, t: 0, speed: 0.006 + Math.random() * 0.008 });
          lastSpawn = t;
        }
        pulses = pulses.filter(p => {
          const a = nodes[p.a];
          const b = nodes[p.b];
          if (!a || !b || Math.hypot(a.x - b.x, a.y - b.y) > LINK_DIST * 1.3) return false;
          p.t += p.speed;
          if (p.t >= 1) {
            // hop onward to a neighbour for a chain-reaction feel
            const next = links.filter(([i, j]) => (i === p.b && j !== p.a) || (j === p.b && i !== p.a));
            if (next.length && Math.random() < 0.6) {
              const [i, j] = next[Math.floor(Math.random() * next.length)];
              p.a = p.b;
              p.b = i === p.b ? j : i;
              p.t = 0;
              return true;
            }
            return false;
          }
          const x = a.x + (b.x - a.x) * p.t;
          const y = a.y + (b.y - a.y) * p.t;
          const tx = a.x + (b.x - a.x) * Math.max(0, p.t - 0.18);
          const ty = a.y + (b.y - a.y) * Math.max(0, p.t - 0.18);
          const trail = ctx.createLinearGradient(tx, ty, x, y);
          trail.addColorStop(0, `rgba(${b.c}, 0)`);
          trail.addColorStop(1, `rgba(${b.c}, 0.55)`);
          ctx.strokeStyle = trail;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(tx, ty);
          ctx.lineTo(x, y);
          ctx.stroke();
          glow(x, y, 7, b.c, 0.5);
          return true;
        });
      }

      for (const n of nodes) {
        const near = Math.max(0, 1 - Math.hypot(n.x - mouse.x, n.y - mouse.y) / MOUSE_DIST);
        const pulse = reduceMotion ? 0.5 : 0.5 + 0.5 * Math.sin(t * 0.0012 + n.phase);
        if (n.r > 1.7) glow(n.x, n.y, 9 + pulse * 4, n.c, 0.12 + near * 0.2);
        ctx.fillStyle = `rgba(${n.c}, ${0.3 + pulse * 0.25 + near * 0.4})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + near * 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      if (running && !reduceMotion) raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => { mouse.tx = e.clientX; mouse.ty = e.clientY; };
    const onLeave = () => { mouse.tx = -9999; mouse.ty = -9999; };
    const onVisibility = () => {
      running = !document.hidden;
      cancelAnimationFrame(raf);
      if (running) raf = requestAnimationFrame(draw);
    };
    const onResize = () => { resize(); if (reduceMotion) draw(0); };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="dyn-bg" aria-hidden>
      <div className="aurora aurora-1" />
      <div className="aurora aurora-2" />
      <div className="aurora aurora-3" />
      <div className="aurora aurora-4" />
      <div className="aurora aurora-5" />
      <canvas ref={canvasRef} className="dyn-canvas" />
      <div className="dyn-grain" />
      <div className="dyn-vignette" />
    </div>
  );
}
