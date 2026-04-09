export interface Restaurant {
  id: string;
  name: string;
  city: string;
  description: string;
  screens: number;
  hasOutdoor: boolean;
  address: string;
  website?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: "Hemma-tips" | "VM-guide" | "Produkttips" | "Affiliate";
  content: string;
  heroImage: string;
}

export interface ProductCategory {
  key: string;
  label: string;
  emoji: string;
  description: string;
  heroImage: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  categoryKey: string;
  emoji: string;
  image: string;
  affiliateLink: string;
  retailer?: string;
  price?: string;
}

export const productCategories: ProductCategory[] = [
  {
    key: "utemobler",
    label: "Utemöbler",
    emoji: "🪑",
    description: "Loungegrupper, soffor och stolar för uteplatsen",
    heroImage: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80",
  },
  {
    key: "dryck",
    label: "Dryck & kylning",
    emoji: "🍺",
    description: "Öltappar, kylboxar och bardiskar",
    heroImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  },
  {
    key: "elektronik",
    label: "Elektronik & TV",
    emoji: "📺",
    description: "TV-ställ, projektorer och tillbehör",
    heroImage: "https://images.unsplash.com/photo-1593359677879-a4bb92f4834a?w=600&q=80",
  },
  {
    key: "ljud",
    label: "Ljud",
    emoji: "🔊",
    description: "Utomhushögtalare och soundbars",
    heroImage: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80",
  },
  {
    key: "dekorationer",
    label: "Dekorationer",
    emoji: "🎉",
    description: "VM-flaggor, lyktor och feststämning",
    heroImage: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&q=80",
  },
];

export const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "Bishops Arms",
    city: "Stockholm",
    description: "Klassisk engelsk pub med massor av skärmar och fantastisk VM-stämning. Stor uteplats sommartid.",
    screens: 12,
    hasOutdoor: true,
    address: "Vasagatan 1, Stockholm",
    website: "#",
  },
  {
    id: "2",
    name: "O'Learys Göteborg",
    city: "Göteborg",
    description: "Sports bar med storbild och heltäckande VM-sändningar. Boka bord i förväg!",
    screens: 20,
    hasOutdoor: false,
    address: "Avenyn 10, Göteborg",
    website: "#",
  },
  {
    id: "3",
    name: "Kvarnen",
    city: "Stockholm",
    description: "Historisk stockholmsk krog med stor pub-känsla och bra skärmar.",
    screens: 6,
    hasOutdoor: false,
    address: "Tjärhovsgatan 4, Stockholm",
    website: "#",
  },
  {
    id: "4",
    name: "Harrys Malmö",
    city: "Malmö",
    description: "Populär sports bar i hjärtat av Malmö med generösa VM-kampanjer.",
    screens: 15,
    hasOutdoor: true,
    address: "Stortorget 8, Malmö",
    website: "#",
  },
  {
    id: "5",
    name: "Sturehof",
    city: "Stockholm",
    description: "Stockholms ikoniska krog – visar stormatchers VM på storbildsskärm.",
    screens: 4,
    hasOutdoor: true,
    address: "Stureplan 2, Stockholm",
    website: "#",
  },
  {
    id: "6",
    name: "Pustervik",
    city: "Göteborg",
    description: "Kulturhus och bar i Göteborg som förvandlas till VM-arena under turneringen.",
    screens: 3,
    hasOutdoor: true,
    address: "Järntorget 2, Göteborg",
    website: "#",
  },
];

export const articles: Article[] = [
  {
    id: "1",
    slug: "perfekta-vm-hornan-hemma",
    title: "Så skapar du den perfekta VM-hörnan hemma",
    excerpt: "Förvandla ditt vardagsrum till en riktig VM-arena med dessa enkla tips och smarta produktval.",
    date: "2026-03-15",
    category: "Hemma-tips",
    heroImage: "https://images.unsplash.com/photo-1593359677879-a4bb92f4834a?w=1200&q=80",
    content: `
# Så skapar du den perfekta VM-hörnan hemma

VM 2026 är äntligen här och det är dags att tänka igenom hur du skapar den ultimata tittar-upplevelsen hemma. Med rätt utrustning och lite planering kan ditt vardagsrum förvandlas till en riktig VM-arena.

## Välj rätt TV-placering

Det första steget är att se till att din TV sitter på rätt plats och höjd. Ett TV-ställ på hjul är perfekt eftersom du kan flytta TV:n beroende på hur många ni är och hur ni vill sitta.

**Tips:** Sikta på att skärmens mitt ska vara i ögonhöjd när du sitter ner – ungefär 100–110 cm från golvet.

## Skapa rätt belysning

Belysningen spelar stor roll för tittarupplevelsen. Undvik direkt ljus mot skärmen och använd gärna bakgrundsbelysning bakom TV:n för att minska ögontröttheten vid långa matchkvällar.

## Organisera sittplatser

Se till att alla kan se skärmen bra. Flytta möbler, hämta extra stolar eller lägg ut sittkuddar på golvet. En loungegrupp utomhus fungerar utmärkt för sommarkvällarnas matcher.

## Dryck och mat

Investera i en bra kylbox eller öltapp för att slippa gå in och ut ur köket under pågående match. En bardisk ute på uteplatsen är det ultimata tillskottet.

## Ljud

En bra utomhushögtalare eller soundbar gör stor skillnad. Du vill höra varje jubel och kommentatorns röst kristallklart.

Med dessa tips på plats är du redo att ta emot gäster och njuta av VM 2026 till fullo!
    `,
  },
  {
    id: "2",
    slug: "basta-oltapparna-2026",
    title: "Bästa öltapparna 2026 – vår guide",
    excerpt: "Vi har testat och jämfört de populäraste öltapparna på marknaden. Här är våra toppval inför VM.",
    date: "2026-04-01",
    category: "Produkttips",
    heroImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    content: `
# Bästa öltapparna 2026 – vår guide

En bra öltapp hemma är det perfekta sättet att ta VM-känslan till nästa nivå. Vi har testat de mest populära modellerna på marknaden och här delar vi med oss av våra favoriter.

## Vad ska man tänka på?

Innan du köper en öltapp bör du tänka på:

- **Kapacitet** – Hur många liter ryms i tanken?
- **Kylning** – Håller den ölet kallt länge nog?
- **Kompatibilitet** – Vilka fat/burkar passar?
- **Enkel att rengöra** – Viktigt för hygien och smak

## Våra toppval

### 1. BeerTender Home (Heineken)
Den klassiska hemöltappen. Enkel att använda, passar 5-liters fat och håller ölet vid perfekt 2°C.

**Betyg: 4.5/5**

### 2. DraughtMaster (Carlsberg)
Premium-alternativet med imponerande design. Fungerar med Carlsbergs egna PerfectDraft-fat.

**Betyg: 4/5**

### 3. Krups The Sub
Kompakt och snygg design. Passar utmärkt i mindre kök eller på balkong. Använder Heinekens Sub Torps.

**Betyg: 4/5**

## Sammanfattning

För de flesta hemma-firanden rekommenderar vi BeerTender som bästa kombination av pris och prestanda. Vill du imponera på gästerna är DraughtMaster det självklara valet.

*Som affiliate-partner kan vi tjäna provision på köp via våra länkar.*
    `,
  },
  {
    id: "3",
    slug: "titta-pa-vm-utomhus",
    title: "Titta på VM utomhus – 5 saker du behöver",
    excerpt: "VM spelas under sommaren – passa på att ordna en utomhusvisning! Här är allt du behöver för en lyckad kväll.",
    date: "2026-04-10",
    category: "Hemma-tips",
    heroImage: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1200&q=80",
    content: `
# Titta på VM utomhus – 5 saker du behöver

VM 2026 äger rum under sommaren vilket gör det perfekt att ordna utomhusvisningar. Med rätt utrustning kan du skapa en fantastisk upplevelse i trädgården eller på uteplatsen.

## 1. Portabel projektor eller utomhus-TV

Det finns nu bra portabla projektorer som klarar dagsljus och kan strömma direkt via WiFi. Alternativt kan du välja en vädertålig utomhus-TV.

**Tips:** Placera skärmen i skugga för bästa bild.

## 2. Loungegrupp eller sittmöbler

Bekväma sittplatser är A och O. En loungegrupp med tillräckligt många platser gör att alla kan sitta bekvämt och se matchen utan att klia sig i nacken.

## 3. Kylbox eller öltapp

Håll dryckerna kalla utan att behöva springa in hela tiden. En stor kylbox med hjul eller en portabel öltapp är perfekt för utomhusbruk.

## 4. Utomhushögtalare

Bra ljud utomhus kräver en kraftfull högtalare. Välj en vattentålig modell som tål sommardaggen.

## 5. Belysning och dekorationer

Skapa stämning med solljuslyktor, VM-flaggor och färgglada dekorationer. Det bidrar till VM-känslan och skapar en festlig atmosfär.

## Bonus: Ha en plan B

Sverige är Sverige – ha alltid ett regnskydd redo om vädret sviker. Ett enkelt partytält löser mycket!

Med dessa fem saker på plats är du fullt rustad för att arrangera årets VM-fest!
    `,
  },
];

export const products: Product[] = [
  // Utemöbler
  { id: "u1", name: "Loungeset AGERMOSE 6-sits", description: "Stort 6-sits loungeset i svart konstrotting med tjocka vädertåliga dynor. Perfekt för VM-kvällar med hela gänget.", categoryKey: "utemobler", emoji: "🪑", image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80", affiliateLink: "https://jysk.se/utemobler/loungeset", retailer: "JYSK", price: "4 995 kr" },
  { id: "u2", name: "NÄMMARÖ 4-sits möbelgrupp", description: "Skandinaviskt formgiven loungegrupp i akaciaträ med beige kuddar. Tål väder och vind – lämna den ute hela sommaren.", categoryKey: "utemobler", emoji: "🪑", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80", affiliateLink: "https://www.ikea.com/se/sv/cat/loungeset-21960/", retailer: "IKEA", price: "3 666 kr" },
  { id: "u3", name: "TALLSKÄR 4-sits loungeset", description: "Svart metall-loungeset med flätad sits. Stilren design för både modern och klassisk uteplats.", categoryKey: "utemobler", emoji: "🪑", image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&q=80", affiliateLink: "https://www.ikea.com/se/sv/cat/loungeset-21960/", retailer: "IKEA", price: "3 515 kr" },
  { id: "u4", name: "Connect Utegrupp med soffa & pall", description: "Grå rattangrupp med rymlig soffa, pall med förvaringsutrymme och soffbord. Regntåliga dynor ingår.", categoryKey: "utemobler", emoji: "🪑", image: "https://images.unsplash.com/photo-1653624533654-3c0cf5fae08f?w=600&q=80", affiliateLink: "https://www.mio.se/uteliv/utemobler/loungemobler", retailer: "MIO", price: "6 990 kr" },
  { id: "u5", name: "Mallorca Utegrupp med ropflätad soffa", description: "Stilren loungegrupp med handflätad rop-detalj och cementbord. Djupt sittdjup – sjunker ner och missa aldrig en sekund.", categoryKey: "utemobler", emoji: "🪑", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80", affiliateLink: "https://www.mio.se/uteliv/utemobler/loungemobler", retailer: "MIO", price: "8 490 kr" },
  { id: "u6", name: "Loungesoffa ONDRUP m/schäslong 3-sits", description: "Stor 3-sits loungesoffa med schäslong i grå konstrotting. Lägg upp benen i halvlek.", categoryKey: "utemobler", emoji: "🪑", image: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=600&q=80", affiliateLink: "https://jysk.se/utemobler/loungemobler/loungesoffa", retailer: "JYSK", price: "3 495 kr" },
  { id: "u7", name: "Maxime Utegrupp – Aluminium", description: "Skandinavisk design med lackat aluminiumram och snabbtorkande dynor. Hållbar och lätt att flytta.", categoryKey: "utemobler", emoji: "🪑", image: "https://images.unsplash.com/photo-1599598425947-5202edd56fdc?w=600&q=80", affiliateLink: "https://www.mio.se/uteliv/utemobler/loungemobler", retailer: "MIO", price: "9 990 kr" },
  { id: "u8", name: "Loungeset 4-sits – Budgetvänligt", description: "Enkelt och prisvärt loungeset i stål med dynor. Perfekt om du vill ha fler sittplatser utan att spräcka budgeten.", categoryKey: "utemobler", emoji: "🪑", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", affiliateLink: "https://www.biltema.se/fritid/tradgard/tradgardsmobler/utemobler/loungeset-2000042063", retailer: "Biltema", price: "1 499 kr" },

  // Dryck & kylning
  { id: "d1", name: "BeerTender Hemöltapp", description: "Häll upp perfekt kylt öl hemma. Passar 5-liters fat. Enkel att rengöra.", categoryKey: "dryck", emoji: "🍺", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", affiliateLink: "#affiliate", retailer: "Elgiganten", price: "1 990 kr" },
  { id: "d2", name: "Coleman 50L Kylbox", description: "Storsäljaren! Håller isen i upp till 5 dagar. Rymmer 72 burkar – räcker för hela matchen.", categoryKey: "dryck", emoji: "🧊", image: "https://images.unsplash.com/photo-1534361960057-19f4434a01d7?w=600&q=80", affiliateLink: "#affiliate", retailer: "Biltema", price: "799 kr" },
  { id: "d3", name: "DraughtMaster Hemöltapp", description: "Premium-alternativet med imponerande design. Fungerar med PerfectDraft-fat. Imponera på gästerna.", categoryKey: "dryck", emoji: "🍺", image: "https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=600&q=80", affiliateLink: "#affiliate", retailer: "Elgiganten", price: "2 490 kr" },

  // Elektronik & TV
  { id: "e1", name: "TV-ställ på hjul – 75 tum", description: "Smidigt TV-ställ med hjul för enkel omplacering. Passar TV-apparater upp till 75 tum.", categoryKey: "elektronik", emoji: "📺", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f4834a?w=600&q=80", affiliateLink: "#affiliate", retailer: "Elgiganten", price: "1 299 kr" },

  // Ljud
  { id: "l1", name: "JBL Charge 5 – Utomhushögtalare", description: "Kraftfull vattentålig Bluetooth-högtalare. 20 timmars batteritid. Perfekt utomhus.", categoryKey: "ljud", emoji: "🔊", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80", affiliateLink: "#affiliate", retailer: "Elgiganten", price: "1 799 kr" },

  // Dekorationer
  { id: "dec1", name: "VM-flaggset 32 nationer", description: "Komplett set med flaggor för alla 32 VM-nationer. Perfekt för att dekorera festen.", categoryKey: "dekorationer", emoji: "🎉", image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&q=80", affiliateLink: "#affiliate", retailer: "Amazon", price: "299 kr" },

  // Amazon-produkter – Utemöbler
  { id: "az-u1", name: "vidaXL Loungegrupp i konstrotting med dynor", description: "Komplett loungegrupp för trädgård eller uteplats med bekväma dynor och konstrottingram som tål väder och vind.", categoryKey: "utemobler", emoji: "🪑", image: "https://m.media-amazon.com/images/P/B0DJK13TLF.jpg", affiliateLink: "https://amzn.to/4spnGy3", retailer: "Amazon" },
  { id: "az-u2", name: "CASA PRO Balkongmöbler – modulärt soffelement", description: "Modulärt soffelement för balkong eller trädgård i vädertåligt material som enkelt kombineras efter behov.", categoryKey: "utemobler", emoji: "🪑", image: "https://m.media-amazon.com/images/P/B0F22HSVGY.jpg", affiliateLink: "https://amzn.to/4moWi1W", retailer: "Amazon" },
  { id: "az-u3", name: "Gecheer Trädgårdsoffa sittuppsättning", description: "Komplett sittuppsättning för trädgården med soffa och stolar, perfekt för avkoppling på uteplats eller balkong.", categoryKey: "utemobler", emoji: "🪑", image: "https://m.media-amazon.com/images/P/B0CTQJLVLP.jpg", affiliateLink: "https://amzn.to/4cebtpT", retailer: "Amazon" },
  { id: "az-u4", name: "VOUNOT Trädgårdspaviljong – hopfällbart med sandsäckar", description: "Stabilt hopfällbart trädgårdstält med medföljande sandsäckar för säker förankring, lätt att sätta upp och ta ner.", categoryKey: "utemobler", emoji: "⛺", image: "https://m.media-amazon.com/images/P/B0BFD5RPKM.jpg", affiliateLink: "https://amzn.to/4vkrZxh", retailer: "Amazon" },
  { id: "az-u5", name: "Trädgårdspaviljong Deluxe med polykarbonattak", description: "Exklusiv trädgårdspaviljong med avtagbara sidor och robusta polykarbonatplattor i taket för maximalt väderskydd.", categoryKey: "utemobler", emoji: "⛺", image: "https://m.media-amazon.com/images/P/B0BV7C5C7Z.jpg", affiliateLink: "https://amzn.to/3O7cecm", retailer: "Amazon" },
  { id: "az-u6", name: "COSTWAY Trädgårdspaviljong – vinterbeständig", description: "Kraftig trädgårdspaviljong som klarar vinterväder, levereras med sandsäckar för stabil förankring.", categoryKey: "utemobler", emoji: "⛺", image: "https://m.media-amazon.com/images/P/B0FDGTWT2D.jpg", affiliateLink: "https://amzn.to/4cxF52G", retailer: "Amazon" },
  { id: "az-u7", name: "Paviljong i aluminium & polykarbonat – champagnefärgad", description: "Elegant och robust trädgårdspaviljong med aluminiumram och polykarbonattak i champagnefärg, tål alla väder.", categoryKey: "utemobler", emoji: "⛺", image: "https://m.media-amazon.com/images/P/B0863W469B.jpg", affiliateLink: "https://amzn.to/4miJ5rb", retailer: "Amazon" },

  // Amazon-produkter – TV & Elektronik
  { id: "az-e1", name: "ONKRON Mobilt TV-stativ på hjul", description: "Smidigt mobilt TV-stativ på hjul som enkelt kan rullas runt i rummet, passar TV-apparater i standardstorlekar.", categoryKey: "elektronik", emoji: "📺", image: "https://m.media-amazon.com/images/P/B07SJ5RHY1.jpg", affiliateLink: "https://amzn.to/4vkZ6AU", retailer: "Amazon" },
  { id: "az-e2", name: "AOKCOS TV-stativ – roterbart och lutningsbart", description: "Justerbart TV-bordsstativ som kan roteras och lutas för optimal tittarvinkel i hemmet.", categoryKey: "elektronik", emoji: "📺", image: "https://m.media-amazon.com/images/P/B0DLB5TJTT.jpg", affiliateLink: "https://amzn.to/4t1S02Y", retailer: "Amazon" },
  { id: "az-e3", name: "ONKRON Mobilt TV-stativ VESA 200×200–1000×600", description: "Stabilt mobilt TV-stativ med brett VESA-stöd och låsbara hjul för säker placering var du vill.", categoryKey: "elektronik", emoji: "📺", image: "https://m.media-amazon.com/images/P/B0CC2XSVCY.jpg", affiliateLink: "https://amzn.to/4t1S1E4", retailer: "Amazon" },
  { id: "az-e4", name: "BONTEC Höjdjusterbart TV-stativ, 23–60 tum", description: "Universellt TV-stativ med höjdjustering som passar skärmar från 23 till 60 tum, enkelt att montera.", categoryKey: "elektronik", emoji: "📺", image: "https://m.media-amazon.com/images/P/B0BNZXBGJ1.jpg", affiliateLink: "https://amzn.to/47NBtqJ", retailer: "Amazon" },
  { id: "az-e5", name: "Samsung QLED TV med AI-processor", description: "Samsung QLED-TV med avancerad AI-bildprocessor, integrerat Q-Symphony-ljud och inbyggda säkerhetsfunktioner.", categoryKey: "elektronik", emoji: "📺", image: "https://m.media-amazon.com/images/P/B0F9Q2QDJZ.jpg", affiliateLink: "https://amzn.to/3OpxvOx", retailer: "Amazon" },

  // Amazon-produkter – Ljud
  { id: "az-l1", name: "Philips TAB5109 Soundbar 2.0", description: "Smal och stilren soundbar från Philips med kraftfullt 2.0-ljud och enkel anslutning – ett lyft för TV-upplevelsen.", categoryKey: "ljud", emoji: "🔊", image: "https://m.media-amazon.com/images/P/B0CYT7SB92.jpg", affiliateLink: "https://amzn.to/4tFfLhd", retailer: "Amazon" },

  // Amazon-produkter – Dryck & kylning
  { id: "az-d1", name: "Mad Monkey Öldispenser – svart", description: "Snygg öldispenser i svart utförande för hemmabruk, låter dig tappa öl direkt från behållare eller fat.", categoryKey: "dryck", emoji: "🍺", image: "https://m.media-amazon.com/images/P/B0CJYBTRNG.jpg", affiliateLink: "https://amzn.to/4ca8zCp", retailer: "Amazon" },
  { id: "az-d2", name: "Öldispenser i tornutförande, 3 liter", description: "Klassisk öldispenser med 3 liters kapacitet, perfekt för fester och grillkvällar utomhus.", categoryKey: "dryck", emoji: "🍺", image: "https://m.media-amazon.com/images/P/B00DSKY6RW.jpg", affiliateLink: "https://amzn.to/48lLrzK", retailer: "Amazon" },
  { id: "az-d3", name: "Dryckesdispenser i rostfritt stål – dubbla kranar", description: "Elegant dryckesdispenser i rostfritt stål med dubbla tappkranar, passar perfekt för ölservering vid fest.", categoryKey: "dryck", emoji: "🍺", image: "https://m.media-amazon.com/images/P/B0DHZNWTX6.jpg", affiliateLink: "https://amzn.to/4meM6ss", retailer: "Amazon" },
  { id: "az-d4", name: "Krups VB700800 BeerTender Öltappmaskin", description: "Krups BeerTender håller ölet kallt och under rätt tryck för en perfekt servering hemma, passar Heineken-fat.", categoryKey: "dryck", emoji: "🍺", image: "https://m.media-amazon.com/images/P/B01CI2JTDG.jpg", affiliateLink: "https://amzn.to/3O75Amq", retailer: "Amazon" },
  { id: "az-d5", name: "Enventor Minikylskåp med kyl- och värmefunktion", description: "Kompakt bärbart minikylskåp som både kyler och värmer, perfekt för sovrum, kontor eller balkong.", categoryKey: "dryck", emoji: "🧊", image: "https://m.media-amazon.com/images/P/B0DZWTL2FV.jpg", affiliateLink: "https://amzn.to/4cc8YEu", retailer: "Amazon" },
  { id: "az-d6", name: "EUHOMY Dryckeskyl med rostfria hyllor", description: "Tyst dryckeskyl med stilrent rostfritt utförande och justerbara hyllor, idealisk för flaskor och burkar.", categoryKey: "dryck", emoji: "🧊", image: "https://m.media-amazon.com/images/P/B0DQWQXCN7.jpg", affiliateLink: "https://amzn.to/4tz5PFE", retailer: "Amazon" },
  { id: "az-d7", name: "Coca-Cola Retro Flaskkylskåp", description: "Ikoniskt Coca-Cola-designat retrokylskåp för flaskor och burkar, en festlig och funktionell blickfångare.", categoryKey: "dryck", emoji: "🧊", image: "https://m.media-amazon.com/images/P/B0092KXW8Q.jpg", affiliateLink: "https://amzn.to/4twaTe4", retailer: "Amazon" },
  { id: "az-d8", name: "Dryckeskylare med iskubshållare", description: "Praktisk bordsmodell för att kyla drycker med iskuber, håller ditt glas kallt länge under festen.", categoryKey: "dryck", emoji: "🧊", image: "https://m.media-amazon.com/images/P/B077G45VZS.jpg", affiliateLink: "https://amzn.to/4tFj488", retailer: "Amazon" },
  { id: "az-d9", name: "EUHOMY Isbitsmaskin – självrengorande", description: "Kompakt och snabb isbitsmaskin med självrengorande funktion och bekvämt handtag, producerar isbitar i kubform.", categoryKey: "dryck", emoji: "🧊", image: "https://m.media-amazon.com/images/P/B0DQWJNGL5.jpg", affiliateLink: "https://amzn.to/4eck7aV", retailer: "Amazon" },
  { id: "az-d10", name: "Cecotec Ismaskin med valbara isbitsstorlekar", description: "Automatisk ismaskin med hög kapacitet och möjlighet att välja isbitsstorlek via kontrollpanel.", categoryKey: "dryck", emoji: "🧊", image: "https://m.media-amazon.com/images/P/B0BPZDX5RP.jpg", affiliateLink: "https://amzn.to/4tzKA6L", retailer: "Amazon" },
  { id: "az-d11", name: "XXL Uppblåsbar Dryckeskylare – dekorativ ishink", description: "Uppblåsbar XXL-dryckeshink som kombinerar kylning med festdekoration, fyll med is och njut av kalla drycker.", categoryKey: "dryck", emoji: "🧊", image: "https://m.media-amazon.com/images/P/B0D78F7MXS.jpg", affiliateLink: "https://amzn.to/4cdaxlH", retailer: "Amazon" },

  // Amazon-produkter – Dekorationer
  { id: "az-dec1", name: "G40 Utomhusljusslinga – vattentät och utbyggbar", description: "Dekorativ utomhusljusslinga med varma G40-glödlampor, vattentät och utbyggbar – perfekt för trädgård eller terrass.", categoryKey: "dekorationer", emoji: "💡", image: "https://m.media-amazon.com/images/P/B0B59F1ZSQ.jpg", affiliateLink: "https://amzn.to/4tD8qi1", retailer: "Amazon" },
  { id: "az-dec2", name: "Trädgårdsbelysningssats – varmvitt och vattentätt", description: "Komplett belysningssats för trädgården med eleganta armaturer i varmvitt ljus och IP-klassad vattentätt utförande.", categoryKey: "dekorationer", emoji: "💡", image: "https://m.media-amazon.com/images/P/B09NGV1Z5P.jpg", affiliateLink: "https://amzn.to/3O7LrN6", retailer: "Amazon" },
  { id: "az-dec3", name: "Sverige Fotbollströja – supportertröja", description: "Officiell supportertröja i Sverige-design tillverkad i andningsbart polyestermaterial, perfekt för matchdagen.", categoryKey: "dekorationer", emoji: "⚽", image: "https://m.media-amazon.com/images/P/B0DJMNXHCX.jpg", affiliateLink: "https://amzn.to/4mpboEC", retailer: "Amazon" },
  { id: "az-dec4", name: "OM3 Sverige Fotbollsfanshirt", description: "Klassisk Sverige-fanshirt i fotbollsdesign, visa stöd för det svenska landslaget med stil.", categoryKey: "dekorationer", emoji: "⚽", image: "https://m.media-amazon.com/images/P/B01FXGCJL8.jpg", affiliateLink: "https://amzn.to/3OcCyBG", retailer: "Amazon" },
  { id: "az-dec5", name: "Broderad Sverige-keps", description: "Broderad keps med Sverige-emblem, tillgänglig som klassisk baseballkeps eller truckerkeps i flera utföranden.", categoryKey: "dekorationer", emoji: "🧢", image: "https://m.media-amazon.com/images/P/B0FLYGF9SN.jpg", affiliateLink: "https://amzn.to/41VrgVL", retailer: "Amazon" },
];
