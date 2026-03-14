"use client";

import { company, services } from "@/content/site-data";
import { MonogramSeal } from "./MonogramSeal";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy section-padding pt-12 pb-24 md:pb-10">
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-sage/15 to-transparent mb-10" />

      <div className="max-w-[1200px] mx-auto">
        {/* 3-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
          {/* Column 1: Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <MonogramSeal size={36} variant="light" className="opacity-60" />
              <span className="font-serif text-paper text-sm tracking-tight">
                {company.name}
              </span>
            </div>
            <p className="text-xs text-line/30 font-accent italic leading-relaxed mb-2">
              {company.slogan}
            </p>
            <p className="text-[10px] text-line/20 tracking-wide">
              {company.location.city}, {company.location.stateFullName}
            </p>
          </div>

          {/* Column 2: Services */}
          <div>
            <p className="text-sage text-[10px] tracking-[0.25em] uppercase font-medium mb-4">
              Services
            </p>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    className="text-xs text-line/40 hover:text-paper transition-colors"
                  >
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <p className="text-sage text-[10px] tracking-[0.25em] uppercase font-medium mb-4">
              Contact
            </p>
            <div className="space-y-2 text-xs text-line/40">
              <a href={`tel:${company.contact.phone1Raw}`} className="block hover:text-paper transition-colors">
                {company.contact.phone1}
              </a>
              <a href={`tel:${company.contact.phone2Raw}`} className="block hover:text-paper transition-colors">
                {company.contact.phone2}
              </a>
              <a href={`mailto:${company.contact.email}`} className="block hover:text-paper transition-colors">
                {company.contact.email}
              </a>
              <a
                href={company.location.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-paper transition-colors leading-snug pt-1"
              >
                {company.location.street} {company.location.suite}
                <br />
                {company.location.city}, {company.location.state} {company.location.zip}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-10 pt-5 border-t border-line/[0.06] text-[10px] text-line/20">
          <p>&copy; {year} {company.name}</p>
          <p>{company.location.city}, {company.location.stateFullName}</p>
        </div>
      </div>
    </footer>
  );
}
