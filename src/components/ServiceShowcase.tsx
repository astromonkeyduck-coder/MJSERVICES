"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "@/content/site-data";
import { useImageRotation, CrossfadeImage } from "./RotatingImage";

export function ServiceShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = services[activeIdx];
  const gallery = active.images.gallery;

  const { index, containerRef, onMouseEnter, onMouseLeave, prefersReduced } =
    useImageRotation({
      count: gallery.length,
      interval: 3000,
      resetKey: active.id,
    });

  const mainSrc = gallery[index % gallery.length];
  const secondarySrc = gallery[(index + 1) % gallery.length];
  const accentSrc = gallery[(index + 2) % gallery.length];

  return (
    <section id="services" className="relative bg-charcoal-deep section-padding py-16 md:py-24">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sage/20 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <p className="text-sage text-[11px] tracking-[0.3em] uppercase font-medium mb-8">
          Our Services
        </p>

        <div className="flex gap-1 mb-10 md:mb-14 border-b border-white/[0.06]">
          {services.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActiveIdx(i)}
              className={`relative pb-3 px-4 md:px-6 text-sm md:text-base tracking-wide transition-colors ${
                i === activeIdx
                  ? "text-paper font-medium"
                  : "text-line/40 hover:text-line/70"
              }`}
            >
              {s.name}
              {i === activeIdx && (
                <motion.div
                  layoutId="service-underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-sage"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              ref={containerRef}
              className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              {/* Images */}
              <div className="md:col-span-3 grid grid-cols-5 gap-3">
                {/* Main image */}
                <div className="col-span-3 relative aspect-[3/4] rounded-lg overflow-hidden">
                  <CrossfadeImage
                    src={mainSrc}
                    alt={active.name}
                    sizes="(max-width: 768px) 60vw, 35vw"
                    prefersReduced={!!prefersReduced}
                    showIndicators
                    indicatorCount={gallery.length}
                    activeIndicator={index}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/40 to-transparent pointer-events-none z-[1]" />
                </div>

                {/* Secondary image */}
                <div className="col-span-2 relative aspect-[3/4] rounded-lg overflow-hidden">
                  <CrossfadeImage
                    src={secondarySrc}
                    alt={`${active.name} detail`}
                    sizes="(max-width: 768px) 40vw, 20vw"
                    quality={75}
                    prefersReduced={!!prefersReduced}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/30 to-transparent pointer-events-none z-[1]" />
                </div>

                {/* Accent image strip (only for cleaning) */}
                {"accent" in active.images && active.images.accent && (
                  <div className="col-span-5 relative h-28 md:h-36 rounded-lg overflow-hidden">
                    <CrossfadeImage
                      src={accentSrc}
                      alt={`${active.name} accent`}
                      sizes="(max-width: 768px) 90vw, 55vw"
                      quality={75}
                      prefersReduced={!!prefersReduced}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-charcoal-deep/50 via-transparent to-charcoal-deep/50 pointer-events-none z-[1]" />
                  </div>
                )}
              </div>

              {/* Content panel */}
              <div className="md:col-span-2 flex flex-col justify-center">
                <h3 className="font-serif text-paper text-2xl md:text-3xl mb-3">
                  {active.name}
                </h3>
                <div className="w-10 h-[2px] bg-sage mb-5" />
                <p className="text-line/60 text-sm leading-relaxed mb-4">
                  {active.detail}
                </p>
                <p className="text-line/40 text-xs mb-8">
                  {active.short}
                </p>

                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 text-sage text-sm font-medium hover:text-sage-light transition-colors"
                >
                  Inquire about {active.name.toLowerCase()}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
