"use client";

import Image from "next/image";
import { company } from "@/content/site-data";

export function ContactBand() {
  return (
    <section id="contact" className="relative bg-navy-surface section-padding py-14 md:py-20 overflow-hidden">
      {/* Subtle background image texture */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/graycarclean.jpg"
          alt=""
          fill
          className="object-cover opacity-[0.04]"
          sizes="100vw"
          quality={30}
        />
      </div>

      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sage/15 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto md:flex md:items-start md:justify-between md:gap-12">
        {/* Left: heading + info */}
        <div className="mb-8 md:mb-0 md:flex-1">
          <div className="border-l-2 border-sage pl-4">
            <h2 className="font-serif text-paper text-xl sm:text-2xl">Get in touch</h2>
            <p className="text-line/50 text-sm mt-1">We&apos;re ready when you are.</p>
          </div>

          {/* Founder + location (absorbed from TrustStrip) */}
          <div className="mt-5 pl-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-line/35">
            <span className="font-serif text-paper/60">{company.founder.name}</span>
            <span className="w-px h-3 bg-line/15" />
            <span>{company.founder.title}</span>
            <span className="w-px h-3 bg-line/15" />
            <span>{company.contact.phone2}</span>
          </div>
          <div className="mt-2 pl-4">
            <a
              href={company.location.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-line/30 hover:text-line/60 transition-colors"
            >
              {company.location.full}
            </a>
          </div>
        </div>

        {/* Right: contact links */}
        <div className="flex flex-col gap-4 md:min-w-[260px]">
          <a
            href={`tel:${company.contact.phone1Raw}`}
            className="group flex items-center gap-3 text-paper hover:text-sage transition-colors"
          >
            <span className="flex items-center justify-center w-9 h-9 rounded-full border border-sage/20 group-hover:border-sage/50 transition-colors">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--sage)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </span>
            <span className="text-sm">{company.contact.phone1}</span>
          </a>
          <a
            href={`mailto:${company.contact.email}`}
            className="group flex items-center gap-3 text-line/60 hover:text-sage transition-colors"
          >
            <span className="flex items-center justify-center w-9 h-9 rounded-full border border-line/10 group-hover:border-sage/40 transition-colors">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </span>
            <span className="text-sm">{company.contact.email}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
