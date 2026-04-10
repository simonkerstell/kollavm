import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://kollavm.se/drommelva" },
  title: "Bygg din drömelva – Sveriges VM-lag 2026",
  description: "Välj din drömelva för Sverige i fotbolls-VM 2026. Placera spelarna i en 4-3-3-formation och dela din uppställning med vänner.",
  openGraph: {
    title: "Bygg din drömelva – KollaVM",
    description: "Välj din dröm-startelva för Sverige i VM 2026!",
    url: "https://kollavm.se/drommelva",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
