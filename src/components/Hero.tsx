"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { company } from "@/content/site-data";
import { BusinessCard } from "./BusinessCard";
import { AudioVisualizer } from "./audio/AudioVisualizer";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const fade = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden"
    >
      {/* Cinematic background image */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/cherrr3.JPG"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={85}
        />
        {/* No overlay — full image visibility */}
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: prefersReducedMotion ? 0 : 0.15 }}
        className="relative z-10 section-padding max-w-5xl mx-auto w-full flex flex-col items-center gap-8 md:gap-10 pt-24 pb-16 md:pt-28 md:pb-20"
      >
        {/* Text + CTAs */}
        <motion.div
          variants={fade}
          className="flex flex-col items-center text-center gap-5"
        >
          <div className="rounded-2xl px-6 py-5 bg-black/20 backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.08)]">
            <p className="text-sage text-[11px] sm:text-xs tracking-[0.3em] uppercase font-medium mb-3 [text-shadow:0_2px_4px_rgba(0,0,0,0.7),0_0_20px_rgba(0,0,0,0.5)]">
              Orlando, Florida
            </p>
            <h1 className="font-accent italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-paper leading-[1.1] tracking-tight [text-shadow:0_3px_6px_rgba(0,0,0,0.7),0_0_24px_rgba(0,0,0,0.5)]">
              {company.slogan}
            </h1>
            <p className="text-line/60 text-sm sm:text-base mt-3 max-w-md mx-auto [text-shadow:0_2px_4px_rgba(0,0,0,0.7),0_0_16px_rgba(0,0,0,0.5)]">
              {company.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            <a
              href={`tel:${company.contact.phone1Raw}`}
              className="px-7 py-3 bg-sage text-charcoal-deep text-sm font-medium tracking-wide rounded-full hover:bg-sage-light transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.5),0_2px_8px_rgba(0,0,0,0.4)] focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              Call Now
            </a>
            <button
              onClick={() => {
                const card = document.getElementById("business-card");
                if (card) card.scrollIntoView({ behavior: "smooth", block: "center" });
                setTimeout(() => window.dispatchEvent(new CustomEvent("flipCardToBack")), 400);
              }}
              className="px-6 py-2.5 bg-black/30 border border-paper/30 text-paper text-sm tracking-wide rounded-lg hover:border-sage/50 hover:text-sage-light transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.5),0_2px_8px_rgba(0,0,0,0.4)] focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              Contact Us
            </button>
          </div>
        </motion.div>

        {/* 3D Card */}
        <motion.div variants={fade}>
          <BusinessCard />
        </motion.div>
      </motion.div>

      {/* Audio-reactive visualizer waves */}
      <AudioVisualizer />

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy to-transparent pointer-events-none z-[2]"
        aria-hidden="true"
      />
    </section>
  );
}
