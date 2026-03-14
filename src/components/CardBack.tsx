"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "@/content/site-data";
import { MonogramSeal } from "./MonogramSeal";
import { playSuccess, playError } from "@/lib/sounds";

type FormStatus = "idle" | "sending" | "sent" | "error";

export function CardBack({ isFlipped }: { isFlipped?: boolean }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  const minMessageLength = 50;
  const canSubmit = name.trim() && email.trim() && service && message.trim().length >= minMessageLength;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!canSubmit) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, service, message }),
      });
      if (res.ok) {
        setStatus("sent");
        playSuccess();
      } else {
        setStatus("error");
        playError();
      }
    } catch {
      setStatus("error");
      playError();
    }
  }

  const inputBase =
    "w-full pl-8 pr-3 py-2.5 rounded-lg bg-white/[0.06] border border-white/[0.08] text-paper text-xs placeholder:text-line/25 focus:outline-none focus:border-sage/40 focus:ring-1 focus:ring-sage/20 focus:bg-white/[0.09] transition-all";

  return (
    <div
      className={`absolute inset-0 backface-hidden bg-charcoal-deep rounded-xl overflow-hidden flex flex-col text-left ${isFlipped ? "" : "pointer-events-none"}`}
      style={{ transform: "rotateY(180deg) translateZ(0)" }}
    >
      {/* Image strip header */}
      <div className="relative h-[52px] shrink-0 overflow-hidden">
        <Image
          src="/images/graycarclean.jpg"
          alt=""
          fill
          className="object-cover object-[50%_35%]"
          sizes="580px"
          quality={50}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-deep/60 via-charcoal-deep/80 to-charcoal-deep" />
        <div className="absolute inset-0 flex items-center px-5 sm:px-7">
          <div>
            <p className="text-sage text-[10px] sm:text-xs tracking-[0.2em] uppercase font-medium">
              Get in touch
            </p>
            <div className="w-8 h-[1px] bg-sage/40 mt-1" />
          </div>
        </div>
      </div>

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <MonogramSeal size={180} className="opacity-[0.025] [&_circle]:!stroke-sage/10 [&_text]:!fill-sage/10" />
      </div>

      {/* Form area */}
      <div className="flex-1 flex flex-col px-5 pt-3 pb-4 sm:px-7 sm:pt-4 sm:pb-5 relative z-10 overflow-visible">
        <AnimatePresence mode="wait">
          {status === "sending" ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center gap-5"
            >
              <Spinner />
              <p className="text-line/60 text-sm tracking-wide">Sending your message...</p>
            </motion.div>
          ) : status === "sent" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 flex flex-col items-center justify-center gap-4 text-center"
            >
              <AnimatedCheck />
              <div>
                <p className="text-paper text-xl sm:text-2xl font-serif">Message Sent</p>
                <p className="text-line/50 text-sm mt-2">
                  We&apos;ll get back to you within 24 hours.
                </p>
                <p className="text-sage/50 text-xs mt-1">
                  A confirmation has been sent to your email.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col"
            >
              <p className="text-line/30 text-[9px] sm:text-[10px] mb-3">
                We&apos;ll respond within 24 hours.
              </p>

              <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} className="flex flex-col gap-2.5 flex-1">
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <UserIcon />
                    <input
                      type="text"
                      placeholder="Name *"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className={inputBase}
                    />
                  </div>
                  <div className="relative">
                    <MailIcon />
                    <input
                      type="email"
                      placeholder="Email *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className={inputBase}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <PhoneIcon />
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={inputBase}
                    />
                  </div>
                  <ServiceDropdown value={service} onChange={setService} />
                </div>

                <div className="relative flex-1">
                  <MessageIcon />
                  <textarea
                    placeholder="Tell us about your needs... (min. 50 characters)"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    minLength={minMessageLength}
                    className={`${inputBase} resize-none flex-1 min-h-[60px] h-full pt-2.5`}
                  />
                  <p
                    className={`text-xs font-medium mt-2 ${
                      message.length >= minMessageLength ? "text-sage" : "text-line"
                    }`}
                  >
                    {message.length}/{minMessageLength} characters minimum
                  </p>
                </div>

                {status === "error" && (
                  <p className="text-red-400 text-[10px]">
                    Something went wrong. Please try again or call us directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="w-full py-3 rounded-lg bg-sage text-charcoal-deep text-xs sm:text-sm font-medium hover:bg-sage-light transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(143,190,142,0.12)] hover:shadow-[0_0_30px_rgba(143,190,142,0.2)] flex items-center justify-center gap-2"
                >
                  Send Message
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </button>
              </form>

              <p className="text-[8px] sm:text-[9px] tracking-[0.12em] text-line/20 uppercase text-center mt-2">
                Orlando, FL
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function UserIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--sage)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--sage)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--sage)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--sage)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-2.5 top-3.5 pointer-events-none z-10" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--sage)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true">
      <path d="M16 3h5v5" />
      <path d="M8 3H3v5" />
      <path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872l-3.535-3.535" />
      <path d="m15 9 6-6" />
    </svg>
  );
}

function Spinner() {
  return (
    <div className="relative w-14 h-14">
      <svg className="w-14 h-14 animate-spin" viewBox="0 0 56 56" fill="none" aria-hidden="true">
        <circle cx="28" cy="28" r="24" stroke="var(--sage)" strokeWidth="3" opacity="0.2" />
        <path
          d="M28 4a24 24 0 0 1 24 24"
          stroke="var(--sage)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function AnimatedCheck() {
  return (
    <div className="relative w-16 h-16">
      <svg className="w-16 h-16 absolute inset-0" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <motion.circle
          cx="32"
          cy="32"
          r="28"
          stroke="var(--sage)"
          strokeWidth="2.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <motion.circle
          cx="32"
          cy="32"
          r="28"
          fill="var(--sage)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        />
      </svg>
      <svg className="w-16 h-16 absolute inset-0" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <motion.path
          d="M20 33l8 8 16-16"
          stroke="var(--sage)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.4, duration: 0.4, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
}

function ServiceDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleOutside);
    }
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [open]);

  return (
    <div ref={ref} className="relative" data-dropdown>
      <ListIcon />
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        className={`w-full pl-8 pr-3 py-2.5 rounded-lg bg-white/[0.06] border text-left text-xs flex items-center justify-between transition-all ${
          open ? "border-sage/40 ring-1 ring-sage/20 bg-white/[0.09]" : "border-white/[0.08]"
        } ${value ? "text-paper" : "text-line/25"}`}
      >
        <span className="truncate">{value || "Service *"}</span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--sage-light)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`shrink-0 ml-1 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full mt-1 bg-charcoal rounded-lg border border-white/[0.1] shadow-lg z-50 overflow-hidden"
          >
            {services.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(s.name);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 text-xs transition-colors ${
                    value === s.name
                      ? "bg-sage/20 text-sage-light"
                      : "text-line hover:bg-white/[0.06] hover:text-paper"
                  }`}
                >
                  {s.name}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
