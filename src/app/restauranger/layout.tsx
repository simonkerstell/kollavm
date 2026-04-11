import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://kollavm.se/restauranger" },
  title: "Restauranger som visar VM 2026 – sportbarer i hela Sverige – KollaVM",
  description: "Vilka restauranger visar VM 2026? Hitta sportbarer och krogar som visar fotbolls-VM i Stockholm, Göteborg, Malmö och 12 fler städer.",
  openGraph: {
    title: "Restauranger & sportbarer – KollaVM",
    description: "Hitta bästa stället att se VM-matcherna på i Sverige.",
    url: "https://kollavm.se/restauranger",
    siteName: "KollaVM",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "KollaVM – Restaurangtips VM 2026" }],
  },
};

export default function RestaurangerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
