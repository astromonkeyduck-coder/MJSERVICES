"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { company, navigation } from "@/content/site-data";
import { MonogramSeal } from "./MonogramSeal";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy/90 backdrop-blur-md shadow-[0_1px_0_rgba(143,190,142,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="section-padding flex items-center justify-between h-14 md:h-16 max-w-[1200px] mx-auto">
        <a href="#" className="flex items-center gap-2.5" aria-label="MJ Concierge Services home">
          <MonogramSeal size={32} variant="light" />
          <span className="hidden sm:block font-serif text-paper text-base tracking-tight">
            {company.name}
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-line/60 hover:text-paper transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href={`tel:${company.contact.phone1Raw}`}
            className="ml-1 px-5 py-2 bg-sage text-charcoal-deep text-sm font-medium rounded-full hover:bg-sage-light transition-colors"
          >
            Call Now
          </a>
        </nav>

        <button
          className="md:hidden flex flex-col gap-[5px] p-2 -mr-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <span className={`block w-5 h-[1.5px] bg-paper transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
          <span className={`block w-5 h-[1.5px] bg-paper transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-[1.5px] bg-paper transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 top-14 bg-navy/98 backdrop-blur-lg z-40"
          >
            <nav className="flex flex-col items-center justify-center gap-8 pt-20" aria-label="Mobile navigation">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-xl font-serif text-paper"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={`tel:${company.contact.phone1Raw}`}
                onClick={() => setMobileOpen(false)}
                className="mt-4 px-8 py-3 bg-sage text-charcoal-deep text-sm font-medium rounded-full"
              >
                Call Now
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
