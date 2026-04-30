import { useEffect, useRef } from "react";

/**
 * Fondo tipo portfolio-eh (red + mouse) con capa extra ambiental y pulso suave.
 * Sin texto/bandas en movimiento en UI — solo partículas sobre el video.
 */

const VIOLET = "139, 124, 246";
const CREAM = "245, 240, 232";

class Particle {
  W = 800;
  H = 600;
  vx: number;
  vy: number;
  x: number;
  y: number;
  size: number;
  alpha: number;
  colorRgb: string;
  /** Factor de velocidad vs. core (portfolio = 1). */
  speedScale: number;

  constructor(
    W: number,
    H: number,
    opts?: { speedScale?: number },
  ) {
    this.W = W;
    this.H = H;
    this.speedScale = opts?.speedScale ?? 1;
    this.vx = 0;
    this.vy = 0;
    this.x = 0;
    this.y = 0;
    this.size = 1;
    this.alpha = 0.3;
    this.colorRgb = VIOLET;
    this.reset();
  }

  setBounds(W: number, H: number) {
    this.W = W;
    this.H = H;
  }

  reset() {
    this.x = Math.random() * this.W;
    this.y = Math.random() * this.H;
    const s = this.speedScale;
    this.vx = (Math.random() - 0.5) * 0.4 * s;
    this.vy = (Math.random() - 0.5) * 0.4 * s;
    this.size = Math.random() * 1.5 + (s < 0.7 ? 1.2 : 0.45);
    this.alpha = Math.random() * 0.35 + (s < 0.7 ? 0.1 : 0.2);
    this.colorRgb = Math.random() > 0.5 ? VIOLET : CREAM;
  }

  update(
    mouse: { x: number | null; y: number | null },
    attract: number,
  ) {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > this.W || this.y < 0 || this.y > this.H) {
      this.reset();
    }
    if (mouse.x != null && mouse.y != null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 180 && dist > 0.01) {
        this.x += (dx / dist) * attract;
        this.y += (dy / dist) * attract;
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.colorRgb}, ${this.alpha})`;
    ctx.fill();
  }
}

function connectParticles(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  maxDist: number,
  baseAlpha: number,
  pulse: number,
  lineTint: "violet" | "mixed",
) {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i];
      const b = particles[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < maxDist) {
        const t = 1 - d / maxDist;
        const hue = lineTint === "mixed" && (i + j) % 3 === 0 ? CREAM : VIOLET;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(${hue}, ${baseAlpha * t * pulse})`;
        ctx.lineWidth = 0.55;
        ctx.stroke();
      }
    }
  }
}

export function MusicParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      canvas.hidden = true;
      return () => {};
    }

    let W = window.innerWidth;
    let H = window.innerHeight;

    /** Capa lejana — partículas grandes, lentas (como bruma + notas sueltas). */
    const ambient: Particle[] = [];
    const AMBIENT_COUNT = 52;
    /** Capa principal — clon lógico de portfolio-eh (140 ≈). */
    const core: Particle[] = [];
    const CORE_COUNT = 118;

    const mouse = { x: null as number | null, y: null as number | null };

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
      ambient.forEach((p) => p.setBounds(W, H));
      core.forEach((p) => p.setBounds(W, H));
    }

    for (let i = 0; i < AMBIENT_COUNT; i++) {
      ambient.push(new Particle(W, H, { speedScale: 0.42 }));
    }
    for (let i = 0; i < CORE_COUNT; i++) {
      core.push(new Particle(W, H));
    }
    resize();

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    let t = 0;

    function loop() {
      t += 1;
      ctx.clearRect(0, 0, W, H);

      /** Pulso muy suave (sin franjas que “giren” — solo intensidad respirante). */
      const pulse = 0.78 + 0.22 * Math.sin(t * 0.018);

      for (const p of ambient) {
        p.update(mouse, 0.0035);
      }
      for (const p of ambient) {
        p.draw(ctx);
      }
      connectParticles(ctx, ambient, 148, 0.055, pulse, "mixed");

      for (const p of core) {
        p.update(mouse, 0.01);
      }
      for (const p of core) {
        p.draw(ctx);
      }
      connectParticles(ctx, core, 100, 0.15, pulse, "violet");

      raf = requestAnimationFrame(loop);
    }

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[6] opacity-[0.72]"
      style={{ mixBlendMode: "screen" }}
      aria-hidden
    />
  );
}
