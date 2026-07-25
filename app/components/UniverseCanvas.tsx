"use client";

import { useEffect, useRef } from "react";

type Star = { x: number; y: number; size: number; phase: number; depth: number };
type Particle = { angle: number; radius: number; speed: number; size: number; phase: number; ice: boolean };

function seededRandom(seed: number) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let next = value;
    next = Math.imul(next ^ (next >>> 15), next | 1);
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61);
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}

function heartPoint(angle: number, scale: number) {
  return {
    x: 16 * Math.sin(angle) ** 3 * scale,
    y: -(13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle)) * scale,
  };
}

export function UniverseCanvas({ className, paused = false, replayKey = 0 }: { className?: string; paused?: boolean; replayKey?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const random = seededRandom(888);
    const stars: Star[] = Array.from({ length: 150 }, () => ({
      x: random() * 2 - 1,
      y: random() * 2 - 1,
      size: random() * 1.45 + 0.35,
      phase: random() * Math.PI * 2,
      depth: random(),
    }));
    const particles: Particle[] = Array.from({ length: 88 }, (_, index) => {
      const ice = index < 44;
      return {
        angle: random() * Math.PI * 2,
        radius: 28 + random() * 78,
        speed: (0.0025 + random() * 0.006) * (ice ? 1 : -1),
        size: random() * 1.8 + 0.45,
        phase: random() * Math.PI * 2,
        ice,
      };
    });

    let width = 0;
    let height = 0;
    let frame = 0;
    let raf = 0;
    const pointer = { x: 0, y: 0 };
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const drawCore = (x: number, y: number, ice: boolean, pulse: number) => {
      const radius = 12 + pulse * 2.5;
      const glow = context.createRadialGradient(x, y, 0, x, y, radius * 4.3);
      glow.addColorStop(0, ice ? "rgba(219,244,255,.98)" : "rgba(255,248,214,.98)");
      glow.addColorStop(.24, ice ? "rgba(75,177,255,.82)" : "rgba(255,117,62,.82)");
      glow.addColorStop(.58, ice ? "rgba(33,105,234,.24)" : "rgba(226,49,49,.24)");
      glow.addColorStop(1, "transparent");
      context.fillStyle = glow;
      context.beginPath();
      context.arc(x, y, radius * 4.3, 0, Math.PI * 2);
      context.fill();
    };

    const render = () => {
      const time = reducedMotion ? 1.2 : frame * .008;
      const cx = width / 2;
      const cy = height / 2;
      context.clearRect(0, 0, width, height);
      const bg = context.createRadialGradient(cx, cy, 12, cx, cy, Math.max(width, height) * .72);
      bg.addColorStop(0, "#142750");
      bg.addColorStop(.38, "#09152f");
      bg.addColorStop(1, "#020712");
      context.fillStyle = bg;
      context.fillRect(0, 0, width, height);

      stars.forEach((star) => {
        const shimmer = .35 + .65 * ((Math.sin(time * 2 + star.phase) + 1) / 2);
        const x = cx + star.x * width * .52 + pointer.x * 8 * star.depth;
        const y = cy + star.y * height * .58 + pointer.y * 8 * star.depth;
        context.fillStyle = `rgba(205,229,255,${shimmer * .72})`;
        context.beginPath();
        context.arc(x, y, star.size * shimmer, 0, Math.PI * 2);
        context.fill();
      });

      const orbit = Math.min(width, height) * .15;
      const angle = time * .32;
      const iceX = cx + Math.cos(angle) * orbit + pointer.x * 10;
      const iceY = cy + Math.sin(angle) * orbit * .42 + pointer.y * 8;
      const fireX = cx + Math.cos(angle + Math.PI) * orbit + pointer.x * 10;
      const fireY = cy + Math.sin(angle + Math.PI) * orbit * .42 + pointer.y * 8;

      for (let thread = 0; thread < 10; thread += 1) {
        context.beginPath();
        for (let step = 0; step <= 34; step += 1) {
          const progress = step / 34;
          const baseX = iceX + (fireX - iceX) * progress;
          const baseY = iceY + (fireY - iceY) * progress;
          const wave = Math.sin(progress * Math.PI * 3 + time * 2.4 + thread * .63) * (5 + thread * .7) * Math.sin(progress * Math.PI);
          const x = baseX + wave * Math.cos(angle + Math.PI / 2);
          const y = baseY + wave * Math.sin(angle + Math.PI / 2) * .4;
          if (step === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        const link = context.createLinearGradient(iceX, iceY, fireX, fireY);
        link.addColorStop(0, "rgba(90,190,255,.2)");
        link.addColorStop(.5, "rgba(244,169,222,.13)");
        link.addColorStop(1, "rgba(255,114,66,.2)");
        context.strokeStyle = link;
        context.lineWidth = .7;
        context.stroke();
      }

      const heartScale = Math.min(width, height) * .011;
      for (let index = 0; index < 46; index += 1) {
        const point = heartPoint((index / 46) * Math.PI * 2 + time * .4, heartScale);
        context.fillStyle = `rgba(255,162,215,${.12 + (index % 5) * .02})`;
        context.beginPath();
        context.arc(cx + point.x + pointer.x * 4, cy + point.y + pointer.y * 4, .7 + (index % 3) * .25, 0, Math.PI * 2);
        context.fill();
      }

      particles.forEach((particle) => {
        if (!reducedMotion) particle.angle += particle.speed;
        const centerX = particle.ice ? iceX : fireX;
        const centerY = particle.ice ? iceY : fireY;
        const radius = particle.radius + Math.sin(time + particle.phase) * 7;
        const x = centerX + Math.cos(particle.angle) * radius;
        const y = centerY + Math.sin(particle.angle) * radius * .48;
        context.fillStyle = particle.ice ? "rgba(118,205,255,.56)" : "rgba(255,132,65,.56)";
        context.beginPath();
        context.arc(x, y, particle.size, 0, Math.PI * 2);
        context.fill();
      });

      const pulse = .5 + .5 * Math.sin(time * 2);
      drawCore(iceX, iceY, true, pulse);
      drawCore(fireX, fireY, false, pulse);

      context.textAlign = "center";
      context.font = "700 10px ui-monospace, monospace";
      context.fillStyle = "rgba(173,222,255,.82)";
      context.fillText("ICE / 2D CORE", iceX, iceY + 34);
      context.fillStyle = "rgba(255,181,132,.82)";
      context.fillText("FIRE / 2D CORE", fireX, fireY + 34);
      context.fillStyle = "rgba(255,225,173,.58)";
      context.font = "18px serif";
      context.fillText("◇", cx + pointer.x * 3, cy + pointer.y * 3 + 5);

      if (!reducedMotion && !paused) {
        frame += 1;
        raf = window.requestAnimationFrame(render);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / Math.max(1, bounds.width) - .5) * 2;
      pointer.y = ((event.clientY - bounds.top) / Math.max(1, bounds.height) - .5) * 2;
      if (paused || reducedMotion) render();
    };
    const onPointerLeave = () => { pointer.x = 0; pointer.y = 0; if (paused || reducedMotion) render(); };
    const observer = new ResizeObserver(() => { resize(); if (reducedMotion) render(); });
    observer.observe(canvas);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);
    resize();
    render();

    return () => {
      observer.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      window.cancelAnimationFrame(raf);
    };
  }, [paused, replayKey]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
