import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  alternates: { canonical: "https://kollavm.se/vm-matcher" },
  title: "VM-schema 2026 – Matchschema fotbolls-VM alla matcher & tider",
  description: "Komplett VM-schema för fotbolls-VM 2026. Alla matcher, datum, avsparkstider i svensk tid och TV-kanaler. Gruppspel och slutspel.",
};

export default function VmSchemaPage() {
  redirect("/vm-matcher");
}
