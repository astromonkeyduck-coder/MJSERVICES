"use client";

import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ServiceShowcase } from "@/components/ServiceShowcase";
import { ContactBand } from "@/components/ContactBand";
import { Footer } from "@/components/Footer";
import { MobileActionBar } from "@/components/MobileActionBar";
import { AudioProvider } from "@/components/audio/AudioProvider";
import { AudioToggle } from "@/components/audio/AudioToggle";

export default function Home() {
  return (
    <AudioProvider>
      <Header />
      <main>
        <Hero />
        <ServiceShowcase />
        <ContactBand />
      </main>
      <Footer />
      <MobileActionBar />
      <AudioToggle />
    </AudioProvider>
  );
}
