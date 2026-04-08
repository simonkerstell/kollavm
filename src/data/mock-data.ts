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

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  emoji: string;
  image: string;
  affiliateLink: string;
  retailer?: string;
  price?: string;
}

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
  // TV-ställ
  {
    id: "1",
    name: "TV-ställ på hjul – Flexibel montering",
    description: "Smidigt TV-ställ med hjul för enkel omplacering. Passar TV-apparater upp till 75 tum.",
    category: "TV-ställ på hjul",
    emoji: "📺",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f4834a?w=600&q=80",
    affiliateLink: "#affiliate",
    retailer: "Elgiganten",
    price: "1 299 kr",
  },

  // Utemöbler & loungegrupper
  {
    id: "2a",
    name: "Loungeset AGERMOSE 6-sits",
    description: "Stort 6-sits loungeset i svart konstrotting med tjocka vädertåliga dynor. Perfekt för VM-kvällar på uteplatsen med hela gänget.",
    category: "Utemöbler & loungegrupper",
    emoji: "🪑",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80",
    affiliateLink: "https://jysk.se/utemobler/loungeset",
    retailer: "JYSK",
    price: "4 995 kr",
  },
  {
    id: "2b",
    name: "NÄMMARÖ 4-sits möbelgrupp",
    description: "Skandinaviskt formgiven loungegrupp i akaciaträ med beige kuddar. Tål väder och vind – lämna den ute hela sommaren.",
    category: "Utemöbler & loungegrupper",
    emoji: "🪑",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    affiliateLink: "https://www.ikea.com/se/sv/cat/loungeset-21960/",
    retailer: "IKEA",
    price: "3 666 kr",
  },
  {
    id: "2c",
    name: "TALLSKÄR 4-sits loungeset",
    description: "Svart metall-loungeset med flätad sits. Stilren design som passar både modern och klassisk uteplats. Finns i flera färger.",
    category: "Utemöbler & loungegrupper",
    emoji: "🪑",
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&q=80",
    affiliateLink: "https://www.ikea.com/se/sv/cat/loungeset-21960/",
    retailer: "IKEA",
    price: "3 515 kr",
  },
  {
    id: "2d",
    name: "Connect Utegrupp med soffa & pall",
    description: "Grå rattangrupp med rymlig soffa, pall med förvaringsutrymme och soffbord. Regntåliga dynor ingår – kasta på dem och börja kolla match.",
    category: "Utemöbler & loungegrupper",
    emoji: "🪑",
    image: "https://images.unsplash.com/photo-1653624533654-3c0cf5fae08f?w=600&q=80",
    affiliateLink: "https://www.mio.se/uteliv/utemobler/loungemobler",
    retailer: "MIO",
    price: "6 990 kr",
  },
  {
    id: "2e",
    name: "Mallorca Utegrupp med ropflätad soffa",
    description: "Stilren loungegrupp med handflätad rop-detalj och cement-fiberbord. Djupt sittdjup – sjunker ner och missa aldrig en sekund.",
    category: "Utemöbler & loungegrupper",
    emoji: "🪑",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
    affiliateLink: "https://www.mio.se/uteliv/utemobler/loungemobler",
    retailer: "MIO",
    price: "8 490 kr",
  },
  {
    id: "2f",
    name: "Loungeset 4-sits – Budgetvänligt",
    description: "Enkelt och prisvärt loungeset i stål med dynor. Från Biltema – perfekt om du vill ha fler sittplatser utan att spräcka budgeten.",
    category: "Utemöbler & loungegrupper",
    emoji: "🪑",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    affiliateLink: "https://www.biltema.se/fritid/tradgard/tradgardsmobler/utemobler/loungeset-2000042063",
    retailer: "Biltema",
    price: "1 499 kr",
  },
  {
    id: "2g",
    name: "Maxime Utegrupp – Aluminium & tyg",
    description: "Skandinavisk design med lackat aluminiumram och tjocka snabbtorkande dynor. Hållbar, lätt och enkel att flytta till bästa matchplats.",
    category: "Utemöbler & loungegrupper",
    emoji: "🪑",
    image: "https://images.unsplash.com/photo-1599598425947-5202edd56fdc?w=600&q=80",
    affiliateLink: "https://www.mio.se/uteliv/utemobler/loungemobler",
    retailer: "MIO",
    price: "9 990 kr",
  },
  {
    id: "2h",
    name: "Loungesoffa ONDRUP m/schäslong 3-sits",
    description: "Stor 3-sits loungesoffa med schäslong i grå konstrotting. Rymlig nog för hela laget – lägg upp benen i halvlek.",
    category: "Utemöbler & loungegrupper",
    emoji: "🪑",
    image: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=600&q=80",
    affiliateLink: "https://jysk.se/utemobler/loungemobler/loungesoffa",
    retailer: "JYSK",
    price: "3 495 kr",
  },

  // Kylboxar
  {
    id: "3",
    name: "Coleman 50L Kylbox",
    description: "Storsäljaren! Håller isen i upp till 5 dagar. Rymmer 72 burkar.",
    category: "Ice coolers & kylboxar",
    emoji: "🧊",
    image: "https://images.unsplash.com/photo-1534361960057-19f4434a01d7?w=600&q=80",
    affiliateLink: "#affiliate",
    retailer: "Biltema",
    price: "799 kr",
  },

  // Öltappar
  {
    id: "4",
    name: "BeerTender Hemöltapp",
    description: "Häll upp perfekt kylt öl hemma. Passar 5-liters fat. Enkel att rengöra.",
    category: "Öltappar & bardiskar",
    emoji: "🍺",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    affiliateLink: "#affiliate",
    retailer: "Elgiganten",
    price: "1 990 kr",
  },

  // Dekorationer
  {
    id: "5",
    name: "VM-flaggset 32 nationer",
    description: "Komplett set med flaggor för alla 32 VM-nationer. Perfekt för att dekorera festen.",
    category: "Dekorationer & VM-flaggor",
    emoji: "🎉",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&q=80",
    affiliateLink: "#affiliate",
    retailer: "Amazon",
    price: "299 kr",
  },

  // Högtalare
  {
    id: "6",
    name: "JBL Charge 5 – Utomhushögtalare",
    description: "Kraftfull vattentålig Bluetooth-högtalare. 20 timmars batteritid. Perfekt utomhus.",
    category: "Utomhushögtalare",
    emoji: "🔊",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80",
    affiliateLink: "#affiliate",
    retailer: "Elgiganten",
    price: "1 799 kr",
  },
];
