import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://kollavm.se/hemma" },
  title: "Kolla VM hemma – produkter för VM-känslan – KollaVM",
  description: "Hitta utemöbler, dryckeskylar, TV-stativ, ljud och dekorationer för att skapa den perfekta VM-upplevelsen hemma under fotbolls-VM 2026.",
  openGraph: {
    title: "Kolla VM hemma – KollaVM",
    description: "Produkter för den perfekta VM-känslan hemma under fotbolls-VM 2026.",
    url: "https://kollavm.se/hemma",
    siteName: "KollaVM",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "KollaVM – Kolla VM hemma" }],
  },
};

export default function HemmaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
