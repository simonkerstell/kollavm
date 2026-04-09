import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Restauranger & sportbarer för VM 2026 – KollaVM",
  description: "Hitta de bästa restaurangerna och sportbarerna att se fotbolls-VM 2026 på i Stockholm, Göteborg, Malmö och fler städer.",
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
