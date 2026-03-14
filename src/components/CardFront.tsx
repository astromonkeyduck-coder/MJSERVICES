import { company } from "@/content/site-data";
import { MonogramSeal } from "./MonogramSeal";

export function CardFront({ isFlipped }: { isFlipped?: boolean }) {
  return (
    <div className={`absolute inset-0 backface-hidden bg-paper rounded-xl overflow-hidden flex text-left ${isFlipped ? "pointer-events-none" : ""}`} style={{ transform: "translateZ(0)" }}>
      {/* Contact info */}
      <div className="flex-1 pt-3 pl-3 pr-3 pb-4 sm:pt-4 sm:pl-4 sm:pr-5 sm:pb-5 flex flex-col justify-between relative z-10">
        <div>
          <h2 className="font-serif text-charcoal text-xl sm:text-2xl font-normal leading-tight">
            {company.founder.name}
          </h2>
          <p className="text-[11px] sm:text-xs tracking-[0.2em] text-graphite mt-0.5 uppercase">
            {company.founder.title}
          </p>
          <div className="w-10 h-[2px] bg-sage mt-1.5" />
        </div>

        <div className="space-y-3 mt-4 text-xs sm:text-sm text-graphite">
          <a href={`tel:${company.contact.phone1Raw}`} className="flex items-center gap-3 group">
            <PhoneIcon />
            <span className="group-hover:text-charcoal transition-colors">
              {company.contact.phone1}
              <br />
              {company.contact.phone2}
            </span>
          </a>
          <a href={`mailto:${company.contact.email}`} className="flex items-center gap-3 group">
            <EnvelopeIcon />
            <span className="group-hover:text-charcoal transition-colors">{company.contact.email}</span>
          </a>
          <div className="flex items-start gap-3">
            <LocationIcon />
            <span className="leading-snug">
              {company.location.street} {company.location.suite}
              <br />
              {company.location.city}, {company.location.state} {company.location.zip}
            </span>
          </div>
        </div>
      </div>

      {/* Brand logo */}
      <div className="w-[45%] relative flex flex-col items-end justify-between pt-4 pl-4 pr-4 pb-8 sm:pt-6 sm:pl-6 sm:pr-6 sm:pb-10">
        <MonogramSeal size={140} className="sm:w-[160px] sm:h-[160px]" />

        <div className="text-right relative z-10">
          <p className="font-serif text-charcoal text-base sm:text-lg leading-snug whitespace-nowrap">
            MJ Concierge Services
          </p>
          <div className="w-8 h-[1px] bg-sage/50 ml-auto mt-1.5 mb-1.5" />
          <p className="text-[9px] sm:text-[10px] tracking-[0.08em] text-graphite/60 uppercase leading-relaxed">
            Cleaning · Chauffeurs · Photography
          </p>
        </div>
      </div>

      {/* Corner accent */}
      <div className="absolute bottom-0 right-0 w-20 h-16 overflow-hidden" aria-hidden="true">
        <div className="absolute bottom-0 right-0 w-32 h-12 bg-charcoal-deep origin-bottom-right -rotate-[20deg] translate-x-4 translate-y-1" />
        <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[40px] border-b-sage border-l-[40px] border-l-transparent" />
      </div>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--sage)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function EnvelopeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--sage)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--sage)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
