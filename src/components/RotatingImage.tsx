"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/* ─── Hook: drives a shared rotation index for all image slots ─── */

interface UseImageRotationOpts {
  count: number;
  interval?: number;
  resetKey?: string;
}

export function useImageRotation({
  count,
  interval = 2000,
  resetKey = "",
}: UseImageRotationOpts) {
  const prefersReduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const isVisible = useRef(true);
  const isTabActive = useRef(true);
  const isHovered = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setIndex(0);
  }, [resetKey]);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const shouldAnimate = useCallback(() => {
    return (
      !prefersReduced &&
      isVisible.current &&
      isTabActive.current &&
      !isHovered.current &&
      count > 1
    );
  }, [prefersReduced, count]);

  const syncTimer = useCallback(() => {
    clearTimer();
    if (shouldAnimate()) {
      timerRef.current = setInterval(() => {
        setIndex((prev) => (prev + 1) % count);
      }, interval);
    }
  }, [clearTimer, shouldAnimate, count, interval]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
        syncTimer();
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [syncTimer]);

  useEffect(() => {
    const onVisibility = () => {
      isTabActive.current = !document.hidden;
      syncTimer();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [syncTimer]);

  useEffect(() => {
    syncTimer();
    return clearTimer;
  }, [syncTimer, clearTimer]);

  const onMouseEnter = useCallback(() => {
    isHovered.current = true;
    clearTimer();
  }, [clearTimer]);

  const onMouseLeave = useCallback(() => {
    isHovered.current = false;
    syncTimer();
  }, [syncTimer]);

  return { index, containerRef, onMouseEnter, onMouseLeave, prefersReduced };
}

/* ─── Crossfade display component for a single image slot ─── */

const TRANSITION_DURATION = 1.2;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface CrossfadeImageProps {
  src: string;
  alt: string;
  sizes: string;
  quality?: number;
  prefersReduced?: boolean;
  showIndicators?: boolean;
  indicatorCount?: number;
  activeIndicator?: number;
}

export function CrossfadeImage({
  src,
  alt,
  sizes,
  quality = 80,
  prefersReduced = false,
  showIndicators = false,
  indicatorCount = 0,
  activeIndicator = 0,
}: CrossfadeImageProps) {
  if (prefersReduced) {
    return (
      <div className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes={sizes}
          quality={quality}
          priority
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0">
      <AnimatePresence initial={false}>
        <motion.div
          key={src}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: TRANSITION_DURATION, ease: EASE }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes={sizes}
            quality={quality}
          />
        </motion.div>
      </AnimatePresence>

      {showIndicators && indicatorCount > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5" aria-hidden="true">
          {Array.from({ length: indicatorCount }, (_, i) => (
            <span
              key={i}
              className={`block rounded-full transition-all duration-500 ${
                i === activeIndicator
                  ? "w-4 h-[3px] bg-sage/70"
                  : "w-[3px] h-[3px] bg-white/25"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
