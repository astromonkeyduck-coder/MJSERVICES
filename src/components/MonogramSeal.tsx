"use client";

import { useId } from "react";

export function MonogramSeal({ size = 80, className = "", variant = "dark" }: { size?: number; className?: string; variant?: "dark" | "light" }) {
  const centerFill = variant === "light" ? "var(--paper)" : "var(--charcoal)";
  const uid = useId();
  const topId = `topArc-${uid}`;
  const bottomId = `bottomArc-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="MJ Concierge Services monogram"
      role="img"
    >
      <circle cx="60" cy="60" r="56" stroke="var(--sage)" strokeWidth="1.5" fill="none" />
      <circle cx="60" cy="60" r="52" stroke="var(--sage)" strokeWidth="0.5" fill="none" opacity="0.5" />

      <path
        d="M 20 54 A 40 40 0 0 1 100 54"
        fill="none"
        stroke="none"
        id={topId}
      />
      <text fontSize="8" fill="var(--sage)" letterSpacing="3" fontFamily="var(--font-dm-sans), sans-serif" fontWeight="500">
        <textPath href={`#${topId}`} startOffset="50%" textAnchor="middle">
          MJ CONCIERGE
        </textPath>
      </text>

      <path
        d="M 22 70 A 40 40 0 0 0 98 70"
        fill="none"
        stroke="none"
        id={bottomId}
      />
      <text fontSize="8" fill="var(--sage)" letterSpacing="3" fontFamily="var(--font-dm-sans), sans-serif" fontWeight="500">
        <textPath href={`#${bottomId}`} startOffset="50%" textAnchor="middle">
          SERVICES
        </textPath>
      </text>

      <text
        x="60"
        y="66"
        textAnchor="middle"
        fontFamily="var(--font-cormorant), Georgia, serif"
        fontStyle="italic"
        fontSize="28"
        fill={centerFill}
        fontWeight="600"
      >
        Mj
      </text>
    </svg>
  );
}
