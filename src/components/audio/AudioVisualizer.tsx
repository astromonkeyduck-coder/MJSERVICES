"use client";

import { useRef, useEffect, useCallback } from "react";
import { useReducedMotion } from "framer-motion";
import { useAudio } from "./AudioProvider";

const SAGE = { r: 154, g: 200, b: 162 };
const LERP_FAST = 0.18;
const LERP_MED = 0.08;
const LERP_SLOW = 0.04;
const BREATH_SPEED = 0.0008;

export function AudioVisualizer() {
  const { analyser, isPlaying, isMuted } = useAudio();
  const prefersReduced = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const smoothFast = useRef<Float32Array | null>(null);
  const smoothMed = useRef<Float32Array | null>(null);
  const smoothSlow = useRef<Float32Array | null>(null);
  const phaseRef = useRef(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !analyser) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    }

    const bufLen = analyser.frequencyBinCount;

    if (!smoothFast.current || smoothFast.current.length !== bufLen) {
      smoothFast.current = new Float32Array(bufLen);
      smoothMed.current = new Float32Array(bufLen);
      smoothSlow.current = new Float32Array(bufLen);
    }

    const raw = new Uint8Array(bufLen);
    analyser.getByteFrequencyData(raw);

    for (let i = 0; i < bufLen; i++) {
      const v = raw[i] / 255;
      smoothFast.current![i] += (v - smoothFast.current![i]) * LERP_FAST;
      smoothMed.current![i] += (v - smoothMed.current![i]) * LERP_MED;
      smoothSlow.current![i] += (v - smoothSlow.current![i]) * LERP_SLOW;
    }

    phaseRef.current += BREATH_SPEED;
    const breath = Math.sin(phaseRef.current) * 0.04 + 0.05;

    ctx.clearRect(0, 0, w, h);

    const useBins = Math.min(bufLen, window.innerWidth < 768 ? 32 : 64);

    drawWave(ctx, smoothSlow.current!, useBins, w, h, breath, 0.08, 6, true, 0.7, 0.75);
    drawWave(ctx, smoothSlow.current!, useBins, w, h, breath, 0.1, 5, true, 0.35, 0.65);
    drawWave(ctx, smoothMed.current!, useBins, w, h, breath, 0.12, 4, true, 0.55, 0.7);
    drawWave(ctx, smoothMed.current!, useBins, w, h, breath, 0.14, 3, true, 0.45, 0.6);
    drawWave(ctx, smoothFast.current!, useBins, w, h, breath, 0.2, 2.5, false, 0.5, 0.65);
    drawWave(ctx, smoothFast.current!, useBins, w, h, breath, 0.16, 2, false, 0.3, 0.75);

    rafRef.current = requestAnimationFrame(draw);
  }, [analyser]);

  const drawWave = (
    ctx: CanvasRenderingContext2D,
    data: Float32Array,
    bins: number,
    w: number,
    h: number,
    breath: number,
    alpha: number,
    lineWidth: number,
    blur: boolean,
    yOffset = 0.5,
    ampScale = 0.5,
  ) => {
    ctx.save();
    if (blur) ctx.filter = `blur(${lineWidth > 3 ? 5 : 3}px)`;

    ctx.beginPath();
    ctx.strokeStyle = `rgba(${SAGE.r}, ${SAGE.g}, ${SAGE.b}, ${alpha})`;
    ctx.lineWidth = lineWidth;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    const mid = h * yOffset;
    const step = w / (bins - 1);
    const phaseShift = yOffset * 4;

    for (let i = 0; i < bins; i++) {
      const v = data[i] || 0;
      const amp = (v + breath) * h * ampScale;
      const x = i * step;
      const y = mid + Math.sin((i / bins) * Math.PI * 2 + phaseRef.current * 3 + phaseShift) * amp;

      if (i === 0) ctx.moveTo(x, y);
      else {
        const pv = data[i - 1] || 0;
        const px = (i - 1) * step;
        const py = mid + Math.sin(((i - 1) / bins) * Math.PI * 2 + phaseRef.current * 3 + phaseShift) * (pv + breath) * h * ampScale;
        const cx = (px + x) / 2;
        const cy = (py + y) / 2;
        ctx.quadraticCurveTo(px, py, cx, cy);
      }
    }

    ctx.stroke();
    ctx.restore();
  };

  useEffect(() => {
    if (prefersReduced || !isPlaying || isMuted || !analyser) {
      cancelAnimationFrame(rafRef.current);
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [prefersReduced, isPlaying, isMuted, analyser, draw]);

  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafRef.current);
      } else if (isPlaying && !isMuted && !prefersReduced) {
        rafRef.current = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying, isMuted, prefersReduced, draw]);

  if (prefersReduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
      aria-hidden="true"
    />
  );
}
