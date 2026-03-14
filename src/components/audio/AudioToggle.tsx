"use client";

import { useAudio } from "./AudioProvider";
import { motion, AnimatePresence } from "framer-motion";

function SoundWaveIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <motion.rect
        x="4" y="10" width="2" rx="1"
        fill="var(--sage)"
        animate={{ height: [4, 10, 6, 12, 4], y: [10, 7, 9, 6, 10] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.rect
        x="8" y="8" width="2" rx="1"
        fill="var(--sage)"
        animate={{ height: [8, 4, 12, 6, 8], y: [8, 10, 6, 9, 8] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
      />
      <motion.rect
        x="12" y="6" width="2" rx="1"
        fill="var(--sage)"
        animate={{ height: [12, 6, 8, 14, 12], y: [6, 9, 8, 5, 6] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      />
      <motion.rect
        x="16" y="9" width="2" rx="1"
        fill="var(--sage)"
        animate={{ height: [6, 10, 4, 8, 6], y: [9, 7, 10, 8, 9] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: 0.45 }}
      />
    </svg>
  );
}

function MutedIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--line)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="none" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

export function AudioToggle() {
  const { isPlaying, isMuted, toggleMute } = useAudio();

  if (!isPlaying) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onClick={toggleMute}
      aria-label={isMuted ? "Unmute music" : "Mute music"}
      className={`fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md border ${
        isMuted
          ? "bg-charcoal-deep/70 border-white/[0.06]"
          : "bg-charcoal-deep/80 border-sage/20 shadow-[0_0_20px_rgba(143,190,142,0.08)]"
      }`}
    >
      <AnimatePresence mode="wait">
        {isMuted ? (
          <motion.div
            key="muted"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.15 }}
          >
            <MutedIcon />
          </motion.div>
        ) : (
          <motion.div
            key="playing"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.15 }}
          >
            <SoundWaveIcon />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
