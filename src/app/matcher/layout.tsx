import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://kollavm.se/matcher" },
  title: "Matchschema VM 2026 – alla matcher & tider – KollaVM",
  description: "Komplett matchschema för fotbolls-VM 2026 med datum, avsparkstider i svensk tid, TV-kanaler och arenor. Alla 104 matcher.",
  openGraph: {
    title: "Matchschema VM 2026 – KollaVM",
    description: "Komplett matchschema för fotbolls-VM 2026 med alla matcher, tider och kanaler.",
    url: "https://kollavm.se/matcher",
    siteName: "KollaVM",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "KollaVM – Matchschema VM 2026" }],
  },
};

export default function MatcherLayout({ children }: { children: React.ReactNode }) {
  return children;
}
