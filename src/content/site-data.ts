export const company = {
  name: "MJ Concierge Services",
  slogan: "Use your time for things that matter.",
  description: "Cleaning, chauffeur, and photography services in Orlando.",
  url: "https://www.mjconciergeservices.com",
  location: {
    city: "Orlando",
    state: "FL",
    stateFullName: "Florida",
    zip: "32804",
    street: "1317 Edgewater Dr.",
    suite: "Suite 1276",
    full: "1317 Edgewater Dr. Suite 1276, Orlando, FL 32804",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=1317+Edgewater+Dr+Suite+1276+Orlando+FL+32804",
  },
  contact: {
    phone1: "(321) 427-5709",
    phone1Raw: "+13214275709",
    phone2: "(321) 872-5693",
    phone2Raw: "+13218725693",
    email: "info@mjconciergeservices.com",
  },
  founder: {
    name: "Marcel Joseph",
    title: "CEO & Co-Founder",
  },
} as const;

export const services = [
  {
    id: "cleaning",
    name: "Cleaning",
    short: "Detail-focused cleaning, handled with care.",
    detail:
      "We bring attention and care to every detail. Reach out to discuss your cleaning needs and schedule.",
    cta: "Inquire About Cleaning",
    images: {
      main: "/images/blackcarclean.jpg",
      secondary: "/images/graycarclean.jpg",
      accent: "/images/shinycarreflection.jpg",
      gallery: ["/images/blackcarclean.jpg", "/images/graycarclean.jpg", "/images/shinycarreflection.jpg"],
    },
  },
  {
    id: "chauffeurs",
    name: "Private Chauffeurs",
    short: "Professional private chauffeur service in Orlando.",
    detail:
      "Professional drivers, punctual pickups, and comfortable rides for any occasion.",
    cta: "Book a Chauffeur",
    images: {
      main: "/images/cherrr3.JPG",
      secondary: "/images/gettingoutofcar.jpg",
      gallery: ["/images/cherrr3.JPG", "/images/gettingoutofcar.jpg", "/images/chauffer.jpg"],
    },
  },
  {
    id: "photography",
    name: "Photography",
    short: "Lifestyle and event photography.",
    detail:
      "Polished imagery for personal milestones, brand shoots, and special occasions.",
    cta: "Discuss Photography",
    images: {
      main: "/images/gettingoutofcar.jpg",
      secondary: "/images/graycarclean.jpg",
      gallery: ["/images/gettingoutofcar.jpg", "/images/graycarclean.jpg", "/images/blackcarclean.jpg"],
    },
  },
] as const;

export type Service = (typeof services)[number];

export const navigation = [
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
] as const;

export const seo = {
  title:
    "MJ Concierge Services | Cleaning, Private Chauffeurs & Photography in Orlando, FL",
  description:
    "Professional cleaning, private chauffeur, and photography services in Orlando, Florida. Use your time for things that matter.",
} as const;
