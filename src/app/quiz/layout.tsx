import { Metadata } from "next";

export const metadata: Metadata = {
  title: "VM-quiz – Testa dina kunskaper om fotbolls-VM",
  description: "Hur mycket kan du om fotbolls-VM? Testa med 10 slumpmässiga frågor om VM-historia, VM 2026 och svensk fotboll. Få 10/10 och lås upp utmärkelsen VM-experten!",
  openGraph: {
    title: "VM-quiz – KollaVM",
    description: "Testa dina kunskaper om fotbolls-VM med 10 frågor!",
    url: "https://kollavm.se/quiz",
  },
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return children;
}
