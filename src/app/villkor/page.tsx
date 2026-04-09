import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Användarvillkor & integritetspolicy – KollaVM",
  description: "Läs KollaVMs användarvillkor och integritetspolicy för fotbolls-VM 2026-sajten.",
};

export default function VillkorPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-black text-white mb-2">
        Användarvillkor <span className="text-[#f5c518]">& integritetspolicy</span>
      </h1>
      <p className="text-gray-400 mb-10">Senast uppdaterad: 9 april 2026</p>

      <div className="prose prose-invert max-w-none space-y-8 text-gray-300 text-sm leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-white mb-3">1. Om KollaVM</h2>
          <p>
            KollaVM (kollavm.se) är en informationssajt som hjälper dig följa fotbolls-VM 2026.
            Sajten drivs som ett privat projekt och erbjuder matchschema, tippning, produkttips
            och restaurangrekommendationer.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">2. Användarkonto</h2>
          <p>
            För att använda tippningsfunktionen krävs ett konto. Vid registrering anger du namn,
            e-postadress och lösenord. Du ansvarar för att hålla dina inloggningsuppgifter säkra.
            Vi förbehåller oss rätten att ta bort konton som missbrukas.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">3. Tippning & ligor</h2>
          <p>
            Tippningsfunktionen är helt gratis och innebär ingen form av pengaspel. Poäng delas
            ut baserat på hur väl dina tips stämmer med faktiska matchresultat. Du kan ändra dina
            tips fram till 5 minuter innan matchstart.
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><span className="text-[#f5c518] font-bold">3 poäng</span> – exakt rätt resultat</li>
            <li><span className="text-white font-bold">1 poäng</span> – rätt utfall (hemma/oavgjort/borta)</li>
            <li><span className="text-gray-500 font-bold">0 poäng</span> – fel utfall</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">4. Affiliate-länkar</h2>
          <p>
            KollaVM innehåller affiliate-länkar till produkter på Amazon och andra återförsäljare.
            När du klickar på en länk och genomför ett köp kan vi få en provision. Detta kostar
            dig ingenting extra och påverkar inte vår redaktionella bedömning eller vilka produkter
            vi rekommenderar.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">5. Personuppgifter & GDPR</h2>
          <p>Vi samlar in och behandlar följande uppgifter:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><span className="text-white font-semibold">Kontouppgifter:</span> namn, e-post och lösenord (krypterat) via Supabase Auth</li>
            <li><span className="text-white font-semibold">Tippningsdata:</span> dina tips och poäng lagras kopplat till ditt konto</li>
            <li><span className="text-white font-semibold">Analysdata:</span> anonymiserad besöksstatistik via Google Analytics (GA4) genom Google Tag Manager</li>
          </ul>
          <p className="mt-3">
            Dina personuppgifter delas inte med tredje part utöver de tjänsteleverantörer som
            krävs för att driva sajten (Supabase för autentisering, Vercel för hosting, Google
            för analys).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">6. Cookies</h2>
          <p>
            KollaVM använder cookies för att hantera inloggningssessioner och för analysändamål
            via Google Tag Manager. Genom att använda sajten godkänner du användningen av cookies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">7. Dina rättigheter</h2>
          <p>Enligt GDPR har du rätt att:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Begära tillgång till dina personuppgifter</li>
            <li>Begära rättelse av felaktiga uppgifter</li>
            <li>Begära radering av ditt konto och tillhörande data</li>
            <li>Invända mot behandling av dina uppgifter</li>
          </ul>
          <p className="mt-3">
            Kontakta oss på <a href="mailto:kontakt@kollavm.se" className="text-[#f5c518] hover:underline">kontakt@kollavm.se</a> för att utöva dina rättigheter.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">8. Ansvarsbegränsning</h2>
          <p>
            KollaVM tillhandahålls i befintligt skick. Vi gör vårt bästa för att hålla matchschema
            och övrig information korrekt, men garanterar inte att all information alltid är
            uppdaterad eller felfri. KollaVM ansvarar inte för eventuella förluster som uppstår
            genom användning av sajten eller köp via affiliate-länkar.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">9. Ändringar</h2>
          <p>
            Vi förbehåller oss rätten att uppdatera dessa villkor. Väsentliga ändringar
            meddelas på sajten. Fortsatt användning efter ändringar innebär att du godkänner
            de uppdaterade villkoren.
          </p>
        </section>
      </div>
    </div>
  );
}
