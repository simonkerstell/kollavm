import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://kollavm.se/tippa" },
  title: "Tippa VM 2026 – tävla mot vänner – KollaVM",
  description: "Tippa matchresultat, gruppspel och slutspel i fotbolls-VM 2026. Skapa ligor och tävla mot dina vänner om vem som tippar bäst.",
  openGraph: {
    title: "Tippa VM 2026 – KollaVM",
    description: "Tippa matchresultat och tävla mot vänner i fotbolls-VM 2026.",
    url: "https://kollavm.se/tippa",
    siteName: "KollaVM",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "KollaVM – Tippa VM 2026" }],
  },
};

export default function TippaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
