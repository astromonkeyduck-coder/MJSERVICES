import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display, Cormorant_Garamond, Great_Vibes } from "next/font/google";
import { seo, company } from "@/content/site-data";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

// Use deployment URL so og:image matches the shared link (fixes social previews on beta/preview URLs)
const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
  company.url;

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: company.url,
    siteName: company.name,
    locale: "en_US",
    type: "website",
    images: [{ url: "/api/og?v=4", width: 1200, height: 630, alt: seo.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: ["/api/og?v=4"],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "theme-color": "#161B22",
    "geo.region": "US-FL",
    "geo.placename": company.location.city,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmSerif.variable} ${cormorant.variable} ${greatVibes.variable}`}>
      <body className="antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: company.name,
              description: seo.description,
              url: company.url,
              telephone: company.contact.phone1Raw,
              email: company.contact.email,
              address: {
                "@type": "PostalAddress",
                streetAddress: `${company.location.street} ${company.location.suite}`,
                addressLocality: company.location.city,
                addressRegion: company.location.state,
                postalCode: company.location.zip,
                addressCountry: "US",
              },
              areaServed: {
                "@type": "City",
                name: company.location.city,
              },
              founder: {
                "@type": "Person",
                name: company.founder.name,
                jobTitle: company.founder.title,
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
