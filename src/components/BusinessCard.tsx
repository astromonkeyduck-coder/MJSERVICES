"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { CardFront } from "./CardFront";
import { CardBack } from "./CardBack";
import { playFlip } from "@/lib/sounds";

const CARD_WIDTH = "min(580px, 90vw)";
const FRONT_HEIGHT = 331;
const BACK_HEIGHT = 580;

export function BusinessCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || isFlipped) return;
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY, prefersReducedMotion, isFlipped]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const flipCard = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    playFlip();
    setIsFlipped((prev) => !prev);
  }, [mouseX, mouseY]);

  const handleCardClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (isFlipped && (
      target.tagName === "INPUT" ||
      target.tagName === "SELECT" ||
      target.tagName === "TEXTAREA" ||
      target.tagName === "BUTTON" ||
      target.tagName === "OPTION" ||
      target.tagName === "A" ||
      target.tagName === "LI" ||
      target.closest("form") ||
      target.closest("button") ||
      target.closest("a") ||
      target.closest("[data-dropdown]")
    )) {
      return;
    }
    flipCard();
  }, [isFlipped, flipCard]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        if (document.activeElement === cardRef.current) {
          e.preventDefault();
          flipCard();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [flipCard]);

  useEffect(() => {
    const handleFlipToBack = () => setIsFlipped(true);
    window.addEventListener("flipCardToBack", handleFlipToBack);
    return () => window.removeEventListener("flipCardToBack", handleFlipToBack);
  }, []);

  const idleAnimation = prefersReducedMotion
    ? {}
    : {
        y: [0, -6, 0],
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      };

  return (
    <div id="business-card" className="relative w-full flex items-center justify-center group">
      <motion.div
        animate={idleAnimation}
        className="relative"
        style={{ perspective: "1200px" }}
      >
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleCardClick}
          tabIndex={0}
          role="button"
          aria-label={isFlipped ? "View front of business card" : "Flip to see back of business card"}
          className="relative cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-4 focus-visible:ring-offset-navy rounded-xl"
          style={{
            width: CARD_WIDTH,
            transformStyle: "preserve-3d",
            rotateX: prefersReducedMotion || isFlipped ? 0 : rotateX,
            rotateY: prefersReducedMotion || isFlipped ? 0 : rotateY,
          }}
          animate={{ height: isFlipped ? BACK_HEIGHT : FRONT_HEIGHT }}
          transition={{ height: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
        >
          <motion.div
            className="w-full h-full"
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ rotateY: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
          >
            <div
              className="absolute inset-0 card-shadow rounded-xl pointer-events-none"
              style={{ transform: "translateZ(-2px)" }}
              aria-hidden="true"
            />
            <CardFront isFlipped={isFlipped} />
            <CardBack isFlipped={isFlipped} />
          </motion.div>
        </motion.div>

        <p className="text-center text-[10px] text-paper/70 mt-3 tracking-widest uppercase [text-shadow:0_2px_4px_rgba(0,0,0,0.7),0_0_12px_rgba(0,0,0,0.5)] md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
          {isFlipped ? "Tap card edge to flip back" : "Tap to flip"}
        </p>
      </motion.div>
    </div>
  );
}
