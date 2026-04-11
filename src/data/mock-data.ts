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
  categoryKey?: string;
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
    slug: "basta-utemobler-vm-2026",
    title: "Bästa utemöblerna för VM 2026 – loungegrupper & paviljonger",
    excerpt: "VM 2026 spelas mitt i sommaren. Här är de bästa utemöblerna och paviljongerna för att se fotbolls-VM utomhus med vänner och familj.",
    date: "2026-04-01",
    category: "Produkttips",
    categoryKey: "utemobler",
    heroImage: "",
    content: `
## Varför utemöbler är ett måste inför fotbolls-VM 2026

Fotbolls-VM 2026 spelas mellan 11 juni och 19 juli – mitt i den svenska sommaren. Det betyder att du kan se matcherna utomhus på uteplatsen, balkongen eller i trädgården. Men för att verkligen njuta av VM-kvällarna behöver du bekväma sittplatser och ett bra väderskydd.

Oavsett om du planerar att se VM hemma själv eller bjuda hem vänner för att kolla matcherna tillsammans, gör rätt utemöbler hela skillnaden. Här går vi igenom de bästa alternativen.

## Loungegrupper – bekvämt för långa matchkvällar

En loungegrupp är det bästa valet om du vill sitta bekvämt under hela matchen utan att behöva flytta på dig. Med en soffa och stolar ute kan ni vara flera som kollar VM tillsammans utan att trängas.

### vidaXL Loungegrupp i konstrotting med dynor

Denna kompletta loungegrupp i konstrotting levereras med bekväma dynor och tål svenskt sommarväder. Konstrotting är praktiskt eftersom det inte behöver underhållas och torkar snabbt efter regn. Perfekt om du ska ha VM-fest på uteplatsen.

### CASA PRO Balkongmöbler – modulärt soffelement

Bor du i lägenhet och har begränsat med utrymme? Det modulära soffelementet från CASA PRO passar perfekt på balkongen. Du kan bygga ut efter behov och kombinera flera element om du har fler gäster.

### Gecheer Trädgårdsoffa sittuppsättning

En komplett sittuppsättning med soffa och stolar som passar bra i trädgården. Stabil konstruktion och tillräckligt med plats för att samla gänget framför utomhus-TV:n under VM.

## Paviljonger – se VM oavsett väder

Sommaren 2026 kan bjuda på både sol och regn. En paviljong ger dig skugga på soliga dagar och skydd om det börjar regna mitt under en spännande match. Det är den bästa investeringen du kan göra om du planerar att titta på fotbolls-VM utomhus.

### VOUNOT Trädgårdspaviljong – hopfällbart med sandsäckar

Enkel att sätta upp och ta ner, levereras med sandsäckar för säker förankring. Perfekt om du vill ha ett tillfälligt väderskydd under VM-sommaren utan att det behöver stå uppe permanent.

### Trädgårdspaviljong Deluxe med polykarbonattak

Om du vill ha en mer permanent lösning är denna paviljong med polykarbonattak utmärkt. Avtagbara sidor ger flexibilitet – öppet på fina dagar, skyddat när det blåser.

### COSTWAY Trädgårdspaviljong – vinterbeständig

En kraftig paviljong som tål alla väder. Köper du denna inför VM har du nytta av den året runt. Levereras med sandsäckar.

### Paviljong i aluminium & polykarbonat – champagnefärgad

Det mest exklusiva alternativet med aluminiumram och polykarbonattak. Elegant design som dessutom är extremt robust. Passar dig som vill ha en paviljong som håller i många år.

## Tips: Kombinera utemöbler med rätt tillbehör

För den ultimata VM-upplevelsen utomhus behöver du mer än bara sittplatser. Kolla in våra guider om de bästa dryckeskylarna och öltapparna för att hålla dryckerna iskalla, och missa inte vår artikel om TV-stativ och projektorer så att du har en bra bild utomhus. Vill du skapa riktigt VM-stämning? Läs vår guide om dekorationer och supporterprylar.

Har du inte plats hemma? Kolla in våra restaurangtips för att hitta bästa stället att se matchen på.
    `,
  },
  {
    id: "2",
    slug: "basta-dryckeskylare-oltappar-vm-2026",
    title: "Bästa dryckeskylarna & öltapparna inför VM 2026",
    excerpt: "Håll dryckerna iskalla under hela VM-matchen. Vi har samlat de bästa öltapparna, dryckeskylarna, ismaskinerna och ölglasen för VM 2026.",
    date: "2026-04-03",
    category: "Produkttips",
    categoryKey: "dryck",
    heroImage: "",
    content: `
## Kalla drycker under hela matchen – så fixar du det

Det finns få saker som förstör en VM-kväll lika effektivt som ljummen öl. När fotbolls-VM 2026 drar igång i juni vill du vara förberedd med rätt utrustning för att hålla dryckerna iskalla – oavsett om du kollar matchen inomhus eller utomhus.

Här har vi samlat de bästa öltapparna, dryckeskylarna, ismaskinerna och ölglasen så att du kan fokusera på det viktiga: matchen.

## Öldispenser och öltappar – tappa öl som ett proffs

En öltapp hemma tar VM-känslan till en helt ny nivå. Istället för att plocka burkar ur kylen kan du tappa upp en perfekt öl med skum och allt – precis som på puben.

### Mad Monkey Öldispenser – svart

En snygg och prisvärd öldispenser som fungerar bra till hemmabruk. Enkel att använda och ser snygg ut på bordet eller bardisken.

### Öldispenser i tornutförande, 3 liter

Klassisk tornmodell med 3 liters kapacitet. Perfekt som mittpunkt på bordet under VM-kvällen – fyll på och låt gästerna tappa själva.

### Dryckesdispenser i rostfritt stål – dubbla kranar

Dubbla kranar i rostfritt stål gör att du kan servera två sorters öl samtidigt. Ett utmärkt val om ni är många som tittar på VM tillsammans.

### Krups VB700800 BeerTender Öltappmaskin

Det mest avancerade alternativet. Krups BeerTender håller ölet under rätt tryck och temperatur automatiskt. Passar Heineken-fat och ger en pubkänsla varje gång du tappar.

## Dryckeskylar och minikylskåp – håll allt kallt

Om du kollar VM utomhus eller vill ha en extra kylmöjlighet nära soffan är en dryckeskyl ovärderlig.

### Enventor Minikylskåp med kyl- och värmefunktion

Kompakt och bärbar – perfekt att ha på balkongen eller bredvid soffan under matchkvällen. Både kyler och värmer.

### EUHOMY Dryckeskyl med rostfria hyllor

En stilren dryckeskyl med plats för flaskor och burkar. Tyst gång gör att du inte missar kommentatorns analys.

### Coca-Cola Retro Flaskkylskåp

Ikonisk design som blir en samtalsämne i sig. Funktionell och festlig – perfekt för VM-hörnan hemma.

### XXL Uppblåsbar Dryckeskylare – dekorativ ishink

Budget-alternativet som kombinerar kylning med dekoration. Fyll med is och dryck – enkelt och effektivt under en utomhus-match.

### Dryckeskylare med iskubshållare

Praktisk bordsmodell som håller ditt glas kallt under hela matchen med hjälp av iskuber.

## Ismaskiner – aldrig slut på is

Under varma VM-kvällar i juni och juli går isen åt snabbt. En ismaskin hemma ser till att du aldrig behöver springa till affären mitt under matchen.

### EUHOMY Isbitsmaskin – självrengorande

Snabb och enkel med självrengorande funktion. Producerar isbitar i kubform och har bekvämt handtag för enkel förflyttning.

### Cecotec Ismaskin med valbara isbitsstorlekar

Hög kapacitet och möjlighet att välja storlek på isbitarna via kontrollpanelen. Bra om ni är ett stort gäng under VM.

## Ölglas – servera med stil

Rätt ölglas gör faktiskt skillnad för smakupplevelsen. Och det ser betydligt trevligare ut än att dricka ur burken.

### KROSNO Lager Ölglas – set om 6, 400 ml

Eleganta glas i blyfritt kristall som passar perfekt för lager och pilsner. 6-pack så att alla gästerna får varsitt.

### KROSNO Craft Beer-glas – set om 6, 500 ml

Större 500 ml-glas för dig som föredrar craft beer eller IPA. Tål maskindisk och lyfter ölupplevelsen.

## Skapa den kompletta VM-upplevelsen

Med rätt dryckeshantering på plats behöver du bara komplettera med bekväma utemöbler för sittplatser, en bra TV eller projektor för bilden, och lite dekorationer och supporterprylar för stämningen. Kolla även in vårt matchschema så du inte missar någon match.

Föredrar du att se matchen på pub? Kolla våra restaurangtips för de bästa VM-krogarna i Sverige.
    `,
  },
  {
    id: "3",
    slug: "basta-tv-projektor-vm-2026",
    title: "Bästa TV och TV-stativ för att se VM 2026 hemma",
    excerpt: "Rätt TV och placering gör hela skillnaden för VM-upplevelsen. Här är de bästa TV-apparaterna och TV-stativen inför fotbolls-VM 2026.",
    date: "2026-04-05",
    category: "Produkttips",
    categoryKey: "elektronik",
    heroImage: "",
    content: `
## Se fotbolls-VM 2026 med bästa möjliga bild

Bilden är kärnan i VM-upplevelsen. Oavsett om du kollar matchen i vardagsrummet eller utomhus på uteplatsen vill du ha en skarp, stor bild som gör att du ser varje detalj på planen. Här går vi igenom de bästa TV-apparaterna och TV-stativen inför VM 2026.

## TV-apparater – välj rätt storlek och kvalitet

En bra TV gör enorm skillnad, särskilt för sport. Snabb bilduppdatering, hög upplösning och bra färger gör att du ser bollen tydligt även i snabba situationer.

### Samsung QLED TV med AI-processor

Samsung QLED med AI-bildprocessor anpassar bilden automatiskt beroende på vad du tittar på. Under fotbollsmatcher innebär det skarpare gräsmatta, tydligare spelare och bättre kontrast. Integrerat Q-Symphony-ljud ger dessutom bättre ljud utan extra högtalare.

### Samsung QN85D 55" 4K Smart TV

55 tum i 4K-upplösning med Neo Quantum-processor ger kristallklar bild. Perfekt storlek för de flesta vardagsrum och stor nog för att bjuda hem vänner och se VM tillsammans.

## TV-stativ – flexibilitet är nyckeln under VM

Under VM vill du kanske flytta TV:n ut på altanen en solig kväll, eller ställa den i ett annat rum när det är många gäster. Ett mobilt TV-stativ på hjul löser detta smidigt.

### ONKRON Mobilt TV-stativ på hjul

Det mest populära valet – rulla TV:n vart du vill. Stabilt, enkelt att montera och passar de flesta TV-storlekar. Perfekt för att flytta ut TV:n på uteplatsen under VM-sommarens kvällsmatcher.

### AOKCOS TV-stativ – roterbart och lutningsbart

Kompakt bordsstativ som du kan rotera och luta för optimal tittarvinkel. Bra alternativ om du inte vill ha ett golvstativ men ändå vill kunna justera vinkeln beroende på var du sitter.

### ONKRON Mobilt TV-stativ VESA 200x200–1000x600

Stabilt golvstativ med brett VESA-stöd som passar de flesta TV-modeller. Låsbara hjul gör att stativet står stadigt när du väl hittat rätt plats.

### BONTEC Höjdjusterbart TV-stativ, 23–60 tum

Budget-alternativet med höjdjustering. Passar TV-skärmar från 23 till 60 tum och är enkelt att montera. Bra val om du vill ha ett stativ utan att investera för mycket.

## Tips för bästa bildupplevelse under VM

- Placera TV:n så att skärmens mitt är i ögonhöjd när du sitter – ungefär 100–110 cm från golvet
- Undvik direkt solljus på skärmen, särskilt utomhus – använd en paviljong som skydd
- Välj sportläge på TV:n för snabbare bilduppdatering och bättre kontrast
- Komplettera med en soundbar för kristallklart matchljud

## Komplettera VM-upplevelsen

Med rätt bild på plats behöver du bara fixa resten. Kolla in vår guide om utemöbler och paviljonger för bekväma sittplatser, dryckeskylar och öltappar för kalla drycker, och dekorationer och supporterprylar för den rätta VM-stämningen.

Missa inte vårt matchschema för alla tider och resultat. Och om du vill göra VM extra spännande – tippa matcherna och tävla mot dina vänner!
    `,
  },
  {
    id: "4",
    slug: "basta-soundbar-ljud-vm-2026",
    title: "Bästa soundbaren för fotbolls-VM 2026 – förbättra matchljudet",
    excerpt: "Bra ljud gör VM-upplevelsen komplett. Här är vår rekommendation för den bästa soundbaren att se fotbolls-VM 2026 med hemma.",
    date: "2026-04-07",
    category: "Produkttips",
    categoryKey: "ljud",
    heroImage: "",
    content: `
## Varför en soundbar gör VM-upplevelsen så mycket bättre

Bilden får ofta mest uppmärksamhet, men ljudet är minst lika viktigt när du kollar fotbolls-VM. Att höra publikens jubel, kommentatorernas analyser och domslut kristallklart gör att du känner dig närmare matchen. De flesta TV-apparater har tyvärr ganska tunt inbyggt ljud – en soundbar löser det direkt.

## Vår rekommendation

### Philips TAB5109 Soundbar 2.0

En smal och stilren soundbar från Philips med kraftfullt 2.0-ljud. Enkel anslutning via HDMI eller optisk kabel gör att du är igång på minuter. Ljudet lyfter både dialog och surroundkänsla markant jämfört med TV:ns inbyggda högtalare.

Soundbaren passar perfekt under eller framför TV:n utan att ta för mycket plats. Vill du flytta ut TV:n på uteplatsen med ett mobilt TV-stativ kan soundbaren enkelt följa med.

## Tips för bästa ljud under VM

- Placera soundbaren framför dig, riktad mot sittplatsen – inte åt sidan
- Om du kollar VM utomhus, placera soundbaren nära och höj volymen – ljudet försvinner snabbare utomhus
- Välj sportläge om din soundbar har det – det förstärker kommentatorsröster och publikljud
- Stäng av fönster om du kollar inomhus för att slippa eko och störande ljud

## Kombinera med rätt bild

En soundbar ger mest effekt tillsammans med en bra TV. Kolla vår guide om TV och TV-stativ för att hitta rätt skärm. Komplettera med bekväma utemöbler om du kollar ute, kalla drycker från våra bästa dryckeskylar och öltappar, och lite VM-dekorationer för den perfekta stämningen.

Se alla matcher i vårt matchschema och gör VM ännu roligare genom att tippa VM mot dina vänner.
    `,
  },
  {
    id: "5",
    slug: "basta-vm-dekorationer-supporterprylar-2026",
    title: "VM-dekorationer & supporterprylar 2026 – skapa matchstämning",
    excerpt: "Skapa den perfekta VM-stämningen hemma med ljusslingor, Sverige-tröjor, kepsar och belysning. Här är de bästa supporterprylarna inför fotbolls-VM 2026.",
    date: "2026-04-09",
    category: "Produkttips",
    categoryKey: "dekorationer",
    heroImage: "",
    content: `
## Skapa äkta VM-känsla hemma med rätt dekorationer

Det behövs inte mycket för att förvandla vardagsrummet eller uteplatsen till en riktig VM-arena. Med rätt belysning, flaggor och supporterprylar skapar du en stämning som gör varje match till en upplevelse – oavsett om Sverige spelar eller inte.

Här har vi samlat de bästa dekorationerna och supporterprylarna inför fotbolls-VM 2026.

## Utomhusbelysning – stämning för kvällsmatcher

VM-matcherna i juni och juli spelas ofta på kvällen svensk tid. Rätt belysning utomhus skapar en mysig och festlig atmosfär för kvällsmatcherna.

### G40 Utomhusljusslinga – vattentät och utbyggbar

En varm utomhusljusslinga med G40-glödlampor som tål väder och vind. Häng över uteplatsen eller runt paviljongen för en härlig känsla under kvällsmatcherna. Den är utbyggbar så du kan koppla ihop flera slingor.

### Trädgårdsbelysningssats – varmvitt och vattentätt

En komplett belysningssats med eleganta armaturer i varmvitt ljus. IP-klassad och vattentålig, så den tål svensk sommar utan problem. Placera längs gången eller runt sittplatsen.

## Supporterkläder – visa ditt stöd för Sverige

VM utan supportertröja? Det funkar inte. Klä dig rätt och visa stöd för det svenska landslaget.

### Sverige Fotbollströja – supportertröja

En klassisk supportertröja i Sverige-design tillverkad i andningsbart polyestermaterial. Perfekt att ha på sig under matcherna – både hemma i soffan och på restaurangen.

### OM3 Sverige Fotbollsfanshirt

En snygg Sverige-fanshirt i fotbollsdesign. Lite mer casual stil som funkar både under matchen och efter.

### Broderad Sverige-keps

En broderad keps med Sverige-emblem som sitter bra och skyddar mot solen under utomhusmatcherna. Finns som klassisk baseballkeps och truckerkeps.

## Tips för bästa VM-stämningen hemma

- Häng upp flaggor från alla deltagande länder för en internationell känsla
- Använd ljusslingor runt TV-hörnan eller uteplatsen för stämningsbelysning
- Ställ fram snacks och dryck i VM-tema – flaggpinnar i maten gör mycket
- Spela VM-hymnen eller klassiska fotbollslåtar innan matchen startar

## Komplettera med rätt utrustning

Dekorationerna sätter stämningen, men för den kompletta VM-upplevelsen behöver du också bekväma utemöbler, en bra TV med rätt stativ, en soundbar för matchljudet, och kalla drycker med våra dryckeskylar och öltappar.

Missa inte heller att kolla in vårt matchschema för alla VM-matcher, och tippa VM mot dina vänner för att göra varje match lite extra spännande.
    `,
  },
  {
    id: "6",
    slug: "vem-sander-vm-2026-svt-tv4",
    title: "Vem sänder fotbolls-VM 2026? SVT och TV4 delar på matcherna",
    excerpt: "SVT och TV4 sänder alla matcher under fotbolls-VM 2026. Här är allt du behöver veta om vilka kanaler som visar vilka matcher och hur du ser dem.",
    date: "2026-04-10",
    category: "VM-guide",
    heroImage: "",
    content: `
## SVT och TV4 sänder alla VM-matcher 2026

Precis som vid tidigare mästerskap delar SVT och TV4 på sändningarna av fotbolls-VM 2026. Det betyder att alla matcher visas gratis på svensk fri-TV – du behöver ingen betaltjänst för att följa turneringen.

## Vilken kanal visar vilka matcher?

SVT och TV4 har delat upp matcherna mellan sig. Generellt gäller:

- **TV4** sänder de flesta av Sveriges matcher och flera av de största gruppspelsmatcherna
- **SVT** sänder resterande gruppspelsmatcher och delar på slutspelsmatcherna
- **Alla Sveriges matcher** visas på både SVT och TV4 beroende på match – kolla matchschemat för exakt kanal per match

Båda kanalerna har studiosändningar med försnack, analys i halvtid och eftersnack.

## Hur ser jag matcherna?

### På TV
Alla matcher visas gratis via SVT1/SVT2 eller TV4. Du behöver bara en vanlig TV-antenn, kabel-TV eller IPTV.

### Via streaming
- **SVT Play** – streama alla SVT-sända matcher gratis på svtplay.se eller i appen
- **TV4 Play** – streama alla TV4-sända matcher gratis på tv4play.se eller i appen

### Utomhus
Vill du se matcherna utomhus? Kolla vår guide om bästa TV och TV-stativ så du kan flytta ut skärmen på uteplatsen. Komplettera med en soundbar för bra ljud utomhus.

## Tips för bästa tittarupplevelsen

- Kolla vårt matchschema i förväg så du vet exakt vilken kanal och tid som gäller
- Ladda ner SVT Play och TV4 Play på din telefon eller surfplatta som backup
- Om du kollar på restaurang – kolla våra restaurangtips för bästa VM-krogarna

## Gör VM extra kul

Passa på att tippa VM mot dina vänner medan du kollar matcherna. Skapa ett konto och tävla i vår tippliga – det gör varje match lite mer spännande!
    `,
  },
  {
    id: "7",
    slug: "var-spelas-fotbolls-vm-2026",
    title: "Var spelas fotbolls-VM 2026? Alla städer och arenor",
    excerpt: "Fotbolls-VM 2026 spelas i USA, Kanada och Mexiko. Här är alla värdstäder, arenor och vad du behöver veta om turneringens spelplatser.",
    date: "2026-04-11",
    category: "VM-guide",
    heroImage: "",
    content: `
## Fotbolls-VM 2026 spelas i tre länder

FIFA World Cup 2026 är det första VM som arrangeras av tre länder samtidigt: USA, Kanada och Mexiko. Turneringen spelas mellan 11 juni och 19 juli 2026 och är den största någonsin med 48 deltagande lag.

## Värdländer och städer

### USA (flest matcher)
USA står för majoriteten av matcherna, inklusive semifinaler och final. Några av de viktigaste arenorna:

- **MetLife Stadium, New York/New Jersey** – finalarena den 19 juli
- **SoFi Stadium, Los Angeles** – en av de modernaste arenorna i världen
- **AT&T Stadium, Dallas** – enormt stadion med tak
- **Hard Rock Stadium, Miami** – tropisk stämning i Florida
- **Levi's Stadium, San Francisco** – Silicon Valley-arenan
- **Gillette Stadium, Boston** – på USA:s östkust
- **Lincoln Financial Field, Philadelphia** – historisk stad
- **Lumen Field, Seattle** – känd för fantastisk stämning
- **Arrowhead Stadium, Kansas City** – NFL-legendar
- **Rose Bowl, Los Angeles** – klassiker från VM 1994

### Kanada
- **BC Place, Vancouver** – Sveriges närhet om de tar sig långt
- **BMO Field, Toronto** – Kanadas största fotbollsarena

### Mexiko
- **Estadio Azteca, Mexico City** – legendarisk arena som har huserat två VM-finaler (1970 och 1986)
- **Estadio Akron, Guadalajara** – modern arena i Mexikos näst största stad

## Tidsskillnad mot Sverige

Matcherna spelas i nordamerikanska tidszoner, vilket innebär att de flesta matcher visas på kvällen svensk tid:

- **Östkusten (New York, Miami, Boston)** – 6 timmars tidsskillnad. Avspark kl 18 lokal tid = 00:00 svensk tid
- **Centrala USA (Dallas, Kansas City)** – 7 timmars tidsskillnad
- **Västkusten (Los Angeles, San Francisco, Seattle)** – 9 timmars tidsskillnad
- **Mexiko** – 7-8 timmars tidsskillnad

De flesta gruppspelsmatcher har avspark mellan 21:00 och 03:00 svensk tid.

## Sveriges matcher

Sverige spelar i grupp F och har alla sina gruppspelsmatcher i USA. Kolla vår detaljerade guide om Sveriges VM-grupp 2026 för matchdatum och tider, eller se hela matchschemat.

## Se matcherna hemma

Oavsett om du kollar matcherna tidigt eller sent – fixa en bra setup hemma med rätt utemöbler, en bra TV och kalla drycker. Och glöm inte att tippa VM innan matcherna börjar!
    `,
  },
  {
    id: "8",
    slug: "nar-spelar-sverige-vm-2026",
    title: "När spelar Sverige i VM 2026? Alla matcher, tider och kanaler",
    excerpt: "Här är alla Sveriges matcher i fotbolls-VM 2026 med datum, avsparkstider i svensk tid, TV-kanaler och arenor. Missa inte en enda match!",
    date: "2026-04-12",
    category: "VM-guide",
    heroImage: "",
    content: `
## Sveriges matcher i VM 2026

Sverige är tillbaka i fotbolls-VM och spelar i grupp F tillsammans med Nederländerna, Japan och Tunisien. Här är alla Sveriges gruppspelsmatcher med datum, tider och kanaler.

## Match 1: Sverige – Tunisien

- **Datum:** 15 juni 2026
- **Avspark:** 04:00 svensk tid
- **Arena:** Estadio Akron, Guadalajara (Mexiko)
- **Kanal:** SVT

Sveriges första match i VM 2026 spelas tidigt på morgonen svensk tid eftersom den äger rum i Mexiko. Tunisien är ett lag Sverige bör slå om de vill avancera från gruppen.

## Match 2: Nederländerna – Sverige

- **Datum:** 20 juni 2026
- **Avspark:** 19:00 svensk tid
- **Arena:** AT&T Stadium, Dallas
- **Kanal:** TV4

Den stora matchen mot Nederländerna spelas på en bekväm tid svensk tid. En klassisk fotbollsmatch mellan två europeiska tungviktare i Dallas, Texas.

## Match 3: Japan – Sverige

- **Datum:** 26 juni 2026
- **Avspark:** 01:00 svensk tid
- **Arena:** Gillette Stadium, Boston
- **Kanal:** SVT

Sista gruppspelsmatchen mot Japan kan mycket väl bli avgörande för om Sverige går vidare eller inte. Japan har blivit ett riktigt starkt lag de senaste åren och det här blir en nyckelmatch. Matchen spelas sent på kvällen/natten svensk tid.

## Hur ser jag Sveriges matcher?

Alla Sveriges matcher visas gratis på svensk fri-TV. Match 1 och 3 sänds på SVT, match 2 på TV4. Du kan också streama via TV4 Play och SVT Play. Läs mer i vår guide om vilka kanaler som sänder VM 2026.

## Tips inför Sveriges matcher

- Kolla vårt kompletta matchschema för alla tider och resultat
- Tippa resultaten och tävla mot vänner i vår tippliga
- Fixa en bra VM-hörna hemma med rätt utemöbler och en bra TV
- Skaffa supporterprylar som Sverige-tröjor och kepsar – kolla vår guide om VM-dekorationer och supporterprylar
- Eller hitta en bra krog via våra restaurangtips
    `,
  },
  {
    id: "9",
    slug: "sveriges-vm-grupp-2026",
    title: "Sveriges VM-grupp 2026 – Grupp F med Nederländerna, Japan & Tunisien",
    excerpt: "Allt om Sveriges grupp F i fotbolls-VM 2026. Analys av motståndarna Nederländerna, Japan och Tunisien, samt Sveriges chanser att gå vidare.",
    date: "2026-04-13",
    category: "VM-guide",
    heroImage: "",
    content: `
## Grupp F – Sveriges grupp i VM 2026

Sverige har lottats i grupp F i fotbolls-VM 2026 tillsammans med Nederländerna, Japan och Tunisien. Det är en tuff men inte omöjlig grupp – här analyserar vi motståndarna och Sveriges chanser.

## Nederländerna 🇳🇱

Nederländerna är den klara favoriten i gruppen. Med spelare i världens bästa ligor och en lång tradition av framgångsrik fotboll är Oranje ett lag som alltid är farliga. De nådde kvartsfinalen i VM 2022 och har fortsatt att vara ett topplag.

**Styrkor:** Teknisk skicklighet, erfarenhet, bredd i truppen
**Svagheter:** Kan underprestera i stora matcher

## Japan 🇯🇵

Japan har utvecklats enormt de senaste åren och slog ut både Tyskland och Spanien i gruppspelet i VM 2022. De har en välorganiserad spelstil och flera spelare i europeiska toppligor. Japan är ett farligt lag som inte ska underskattas.

**Styrkor:** Taktisk disciplin, snabba omställningar, teknik
**Svagheter:** Kan ha svårt i fysiska matcher

## Tunisien 🇹🇳

Tunisien representerar afrikansk fotboll och har visat att de kan vara konkurrenskraftiga mot de bästa. I VM 2022 slog de Frankrike i gruppspelet. De är välorganiserade defensivt men kan ha svårt att skapa chanser mot bättre lag.

**Styrkor:** Defensiv organisation, stridbarhet, lagets sammanhållning
**Svagheter:** Begränsad offensiv kapacitet mot topplag

## Sveriges chanser

Sverige har en realistisk chans att ta sig vidare från gruppen. Nyckelmatcherna blir mot Tunisien och Japan – där behöver Sverige ta poäng. En förlust mot Nederländerna i premiären behöver inte vara katastrof om de övriga matcherna vinns.

I det nya formatet med 48 lag går de två bästa i varje grupp vidare direkt, plus de åtta bästa treorna. Det betyder att även en tredjeplats kan räcka för avancemang.

## Matchschema för grupp F

- 14 juni: Nederländerna – Japan (TV4, 22:00)
- 15 juni: Sverige – Tunisien (SVT, 04:00)
- 20 juni: Nederländerna – Sverige (TV4, 19:00)
- 21 juni: Tunisien – Japan (SVT, 06:00)
- 26 juni: Japan – Sverige (SVT, 01:00)
- 26 juni: Tunisien – Nederländerna (SVT, 01:00)

Se alla matcher i vårt matchschema och tippa VM mot dina vänner. Läs även vår guide om när Sveriges matcher spelas för mer detaljer om varje match.

## Förbered dig för VM

Se matcherna hemma med bra utemöbler på uteplatsen, en bra TV och kalla drycker. Klä dig i Sveriges färger med våra supporterprylar – kolla vår guide om VM-dekorationer och supporterprylar.

Föredrar du att kolla på krog? Kolla våra restaurangtips.
    `,
  },
  {
    id: "10",
    slug: "tippa-vm-2026-gratis-guide",
    title: "Tippa VM 2026 gratis – komplett guide till VM-tippning",
    excerpt: "Allt du behöver veta för att tippa VM 2026. Så fungerar tippningen, poängsystemet och ligorna på KollaVM – helt gratis.",
    date: "2026-04-11",
    category: "VM-guide",
    heroImage: "",
    content: `
## Tippa VM 2026 – så fungerar det

Fotbolls-VM 2026 närmar sig och det är dags att tippa! På KollaVM kan du tippa VM helt gratis – matchresultat, gruppvinnare, slutspelsträdet, skyttekung och bästa spelare. Tävla mot dina vänner i privata ligor och se vem som tippar bäst.

## Hur tippar man VM på KollaVM?

Att tippa VM på KollaVM är enkelt:

- Skapa ett gratis konto
- Tippa matchresultat för alla 72 gruppspelsmatcher
- Tippa vem som vinner varje grupp och vem som blir tvåa
- Fyll i hela slutspelsträdet från sextondelsfinaler till final
- Tippa Guldskon (skyttekung) och Guldbollen (MVP)

Allt sparas automatiskt och poängen räknas ihop.

## Poängsystem – hur räknas poängen?

### Matchresultat
- **3 poäng** för exakt rätt resultat (t.ex. du tippar 2-1 och det blir 2-1)
- **1 poäng** för rätt utfall (du tippar hemmavinst och det blir hemmavinst, men fel antal mål)
- **0 poäng** för fel utfall

### Gruppspel
- **3 poäng** för rätt gruppsegrare
- **2 poäng** för rätt grupptvåa

### Slutspel
- **2 poäng** per rätt lag i sextondelsfinalerna
- **3 poäng** per rätt lag i åttondelsfinalerna
- **5 poäng** per rätt lag i kvartsfinalerna
- **7 poäng** per rätt lag i semifinalerna
- **10 poäng** för rätt VM-vinnare

### Specialtips
- **10 poäng** för rätt Guldskon-vinnare (skyttekung)
- **10 poäng** för rätt Guldbolle-vinnare (MVP)

## Skapa en liga och bjud in vänner

Det roligaste med att tippa VM är att tävla mot vänner. Så här gör du:

- Gå till Tippa → Mina ligor
- Klicka Skapa liga och välj ett namn
- Dela inbjudningskoden med dina vänner
- De anger koden för att gå med
- Följ ställningen i ligatabellen

Alla registrerade användare tävlar automatiskt i den globala ligan.

## Tips för att tippa bra

- Kolla matchschemat för att se vilka matcher som spelas
- Läs vår analys av Sveriges VM-grupp 2026 för insikter
- Tippa alla matcher tidigt – det är lätt att glömma
- Ha koll på vilka kanaler som sänder VM 2026
- Följ VM-nyheter för att veta vilka spelare som är i form

## Är det gratis att tippa VM?

Ja! Att tippa VM på KollaVM är helt gratis. Inga dolda avgifter, ingen betalning krävs. Skapa ett konto och börja tippa direkt.

Det här är ingen pengatippning – det handlar om ära och att visa att du kan fotboll bättre än dina vänner.

## Börja tippa nu

Missa inte chansen att tippa VM 2026! Ju tidigare du börjar, desto fler matcher kan du tippa. Skapa ett konto på KollaVM och börja tippa VM redan idag.
    `,
  },
];

export const products: Product[] = [
  // Utemöbler
  { id: "1", name: "vidaXL Loungegrupp i konstrotting med dynor", description: "Komplett loungegrupp för trädgård eller uteplats med bekväma dynor och konstrottingram som tål väder och vind.", categoryKey: "utemobler", emoji: "🪑", image: "https://m.media-amazon.com/images/I/31rksBZcbUL._AC_SL1500_.jpg", affiliateLink: "https://amzn.to/4spnGy3", retailer: "Amazon" },
  { id: "2", name: "CASA PRO Balkongmöbler – modulärt soffelement", description: "Modulärt soffelement för balkong eller trädgård i vädertåligt material som enkelt kombineras efter behov.", categoryKey: "utemobler", emoji: "🪑", image: "https://m.media-amazon.com/images/I/51fm-FwLjnL._AC_SL1500_.jpg", affiliateLink: "https://amzn.to/4moWi1W", retailer: "Amazon" },
  { id: "3", name: "Gecheer Trädgårdsoffa sittuppsättning", description: "Komplett sittuppsättning för trädgården med soffa och stolar, perfekt för avkoppling på uteplats eller balkong.", categoryKey: "utemobler", emoji: "🪑", image: "https://m.media-amazon.com/images/I/51CvvJKjbkL._AC_SL1500_.jpg", affiliateLink: "https://amzn.to/4cebtpT", retailer: "Amazon" },
  { id: "4", name: "VOUNOT Trädgårdspaviljong – hopfällbart med sandsäckar", description: "Stabilt hopfällbart trädgårdstält med medföljande sandsäckar för säker förankring, lätt att sätta upp och ta ner.", categoryKey: "utemobler", emoji: "⛺", image: "https://m.media-amazon.com/images/I/31Bx3ghtx3L._AC_SL1500_.jpg", affiliateLink: "https://amzn.to/4vkrZxh", retailer: "Amazon" },
  { id: "5", name: "Trädgårdspaviljong Deluxe med polykarbonattak", description: "Exklusiv trädgårdspaviljong med avtagbara sidor och robusta polykarbonatplattor i taket för maximalt väderskydd.", categoryKey: "utemobler", emoji: "⛺", image: "https://m.media-amazon.com/images/I/41GsWW4m8UL._AC_SL1500_.jpg", affiliateLink: "https://amzn.to/3O7cecm", retailer: "Amazon" },
  { id: "6", name: "COSTWAY Trädgårdspaviljong – vinterbeständig", description: "Kraftig trädgårdspaviljong som klarar vinterväder, levereras med sandsäckar för stabil förankring.", categoryKey: "utemobler", emoji: "⛺", image: "https://m.media-amazon.com/images/I/41mcw1Rx5iL._AC_SL1500_.jpg", affiliateLink: "https://amzn.to/4cxF52G", retailer: "Amazon" },
  { id: "7", name: "Paviljong i aluminium & polykarbonat – champagnefärgad", description: "Elegant och robust trädgårdspaviljong med aluminiumram och polykarbonattak i champagnefärg, tål alla väder.", categoryKey: "utemobler", emoji: "⛺", image: "https://m.media-amazon.com/images/I/410F-UwbDlL._AC_SL1500_.jpg", affiliateLink: "https://amzn.to/4miJ5rb", retailer: "Amazon" },

  // Dryck & kylning
  { id: "8", name: "Mad Monkey Öldispenser – svart", description: "Snygg öldispenser i svart utförande för hemmabruk, låter dig tappa öl direkt från behållare eller fat.", categoryKey: "dryck", emoji: "🍺", image: "https://m.media-amazon.com/images/I/315HJEOCqWL._AC_SL1500_.jpg", affiliateLink: "https://amzn.to/4ca8zCp", retailer: "Amazon" },
  { id: "9", name: "Öldispenser i tornutförande, 3 liter", description: "Klassisk öldispenser med 3 liters kapacitet, perfekt för fester och grillkvällar utomhus.", categoryKey: "dryck", emoji: "🍺", image: "https://m.media-amazon.com/images/I/314nVZHp9iL._AC_SL1500_.jpg", affiliateLink: "https://amzn.to/48lLrzK", retailer: "Amazon" },
  { id: "10", name: "Dryckesdispenser i rostfritt stål – dubbla kranar", description: "Elegant dryckesdispenser i rostfritt stål med dubbla tappkranar, passar perfekt för ölservering vid fest.", categoryKey: "dryck", emoji: "🍺", image: "https://m.media-amazon.com/images/I/41-a4-8eJqL._AC_SL1500_.jpg", affiliateLink: "https://amzn.to/4meM6ss", retailer: "Amazon" },
  { id: "11", name: "Krups VB700800 BeerTender Öltappmaskin", description: "Krups BeerTender håller ölet kallt och under rätt tryck för en perfekt servering hemma, passar Heineken-fat.", categoryKey: "dryck", emoji: "🍺", image: "https://m.media-amazon.com/images/I/419kvscJHJL._AC_SL1500_.jpg", affiliateLink: "https://amzn.to/3O75Amq", retailer: "Amazon" },
  { id: "12", name: "Enventor Minikylskåp med kyl- och värmefunktion", description: "Kompakt bärbart minikylskåp som både kyler och värmer, perfekt för sovrum, kontor eller balkong.", categoryKey: "dryck", emoji: "🧊", image: "https://m.media-amazon.com/images/I/3148kih+nIL._AC_SL1500_.jpg", affiliateLink: "https://amzn.to/4cc8YEu", retailer: "Amazon" },
  { id: "13", name: "EUHOMY Dryckeskyl med rostfria hyllor", description: "Tyst dryckeskyl med stilrent rostfritt utförande och justerbara hyllor, idealisk för flaskor och burkar.", categoryKey: "dryck", emoji: "🧊", image: "https://m.media-amazon.com/images/I/51B5PImepKL._AC_SL1500_.jpg", affiliateLink: "https://amzn.to/4tz5PFE", retailer: "Amazon" },
  { id: "14", name: "Coca-Cola Retro Flaskkylskåp", description: "Ikoniskt Coca-Cola-designat retrokylskåp för flaskor och burkar, en festlig och funktionell blickfångare.", categoryKey: "dryck", emoji: "🧊", image: "https://m.media-amazon.com/images/I/41+gjkmLROL._AC_SL1500_.jpg", affiliateLink: "https://amzn.to/4twaTe4", retailer: "Amazon" },
  { id: "15", name: "XXL Uppblåsbar Dryckeskylare – dekorativ ishink", description: "Uppblåsbar XXL-dryckeshink som kombinerar kylning med festdekoration, fyll med is och njut av kalla drycker.", categoryKey: "dryck", emoji: "🧊", image: "https://m.media-amazon.com/images/I/41042uwrGFL._AC_SL1500_.jpg", affiliateLink: "https://amzn.to/4cdaxlH", retailer: "Amazon" },
  { id: "16", name: "Dryckeskylare med iskubshållare", description: "Praktisk bordsmodell för att kyla drycker med iskuber, håller ditt glas kallt länge under festen.", categoryKey: "dryck", emoji: "🧊", image: "https://m.media-amazon.com/images/I/4165kzANvoL._AC_SL1500_.jpg", affiliateLink: "https://amzn.to/4tFj488", retailer: "Amazon" },
  { id: "17", name: "EUHOMY Isbitsmaskin – självrengorande", description: "Kompakt och snabb isbitsmaskin med självrengorande funktion och bekvämt handtag, producerar isbitar i kubform.", categoryKey: "dryck", emoji: "🧊", image: "https://m.media-amazon.com/images/I/41gCLEB5slL._AC_SL1500_.jpg", affiliateLink: "https://amzn.to/4eck7aV", retailer: "Amazon" },
  { id: "18", name: "Cecotec Ismaskin med valbara isbitsstorlekar", description: "Automatisk ismaskin med hög kapacitet och möjlighet att välja isbitsstorlek via kontrollpanel.", categoryKey: "dryck", emoji: "🧊", image: "https://m.media-amazon.com/images/I/41SGmtynj7L._AC_SL1500_.jpg", affiliateLink: "https://amzn.to/4tzKA6L", retailer: "Amazon" },
  { id: "19", name: "KROSNO Lager Ölglas – set om 6, 400 ml", description: "Eleganta ölglas i blyfritt kristall från KROSNO, perfekt för att servera lager och IPA under matchkvällen.", categoryKey: "dryck", emoji: "🍺", image: "https://m.media-amazon.com/images/I/31tIK2ii+vL._AC_SL1500_.jpg", affiliateLink: "https://amzn.to/4t2Afk7", retailer: "Amazon" },
  { id: "20", name: "KROSNO Craft Beer-glas – set om 6, 500 ml", description: "Stora 500 ml craft beer-glas i blyfritt kristall, tål maskindisk och lyfter ölupplevelsen.", categoryKey: "dryck", emoji: "🍺", image: "https://m.media-amazon.com/images/I/31tIK2ii+vL._AC_SL1500_.jpg", affiliateLink: "https://amzn.to/4vj7EIL", retailer: "Amazon" },

  // Elektronik & TV
  { id: "21", name: "ONKRON Mobilt TV-stativ på hjul", description: "Smidigt mobilt TV-stativ på hjul som enkelt kan rullas runt i rummet, passar TV-apparater i standardstorlekar.", categoryKey: "elektronik", emoji: "📺", image: "https://m.media-amazon.com/images/I/31A7D5jo98L._AC_SL1500_.jpg", affiliateLink: "https://amzn.to/4vkZ6AU", retailer: "Amazon" },
  { id: "22", name: "AOKCOS TV-stativ – roterbart och lutningsbart", description: "Justerbart TV-bordsstativ som kan roteras och lutas för optimal tittarvinkel i hemmet.", categoryKey: "elektronik", emoji: "📺", image: "https://m.media-amazon.com/images/I/314nOiYrBjL._AC_SL1500_.jpg", affiliateLink: "https://amzn.to/4t1S02Y", retailer: "Amazon" },
  { id: "23", name: "ONKRON Mobilt TV-stativ VESA 200x200–1000x600", description: "Stabilt mobilt TV-stativ med brett VESA-stöd och låsbara hjul för säker placering var du vill.", categoryKey: "elektronik", emoji: "📺", image: "https://m.media-amazon.com/images/I/41OrZbvtWjL._AC_SL1500_.jpg", affiliateLink: "https://amzn.to/4t1S1E4", retailer: "Amazon" },
  { id: "24", name: "BONTEC Höjdjusterbart TV-stativ, 23–60 tum", description: "Universellt TV-stativ med höjdjustering som passar skärmar från 23 till 60 tum, enkelt att montera.", categoryKey: "elektronik", emoji: "📺", image: "https://m.media-amazon.com/images/I/11n8EiOKbOL._AC_SL1500_.jpg", affiliateLink: "https://amzn.to/47NBtqJ", retailer: "Amazon" },
  { id: "25", name: "Samsung QLED TV med AI-processor", description: "Samsung QLED-TV med avancerad AI-bildprocessor, integrerat Q-Symphony-ljud och Smart TV-funktioner.", categoryKey: "elektronik", emoji: "📺", image: "https://m.media-amazon.com/images/I/41GS8gQvqDL._AC_SL1500_.jpg", affiliateLink: "https://amzn.to/3OpxvOx", retailer: "Amazon" },
  { id: "26", name: "Samsung QN85D 55\" 4K Smart TV", description: "Samsung 55-tums 4K QLED-TV med Neo Quantum-processor för kristallklar bild under varje VM-match.", categoryKey: "elektronik", emoji: "📺", image: "https://m.media-amazon.com/images/I/31+M2OVnRcL._AC_SL1500_.jpg", affiliateLink: "https://amzn.to/4tGJ9nk", retailer: "Amazon" },

  // Ljud
  { id: "27", name: "Philips TAB5109 Soundbar 2.0", description: "Smal och stilren soundbar från Philips med kraftfullt 2.0-ljud och enkel anslutning – ett lyft för TV-upplevelsen.", categoryKey: "ljud", emoji: "🔊", image: "https://m.media-amazon.com/images/I/31N3A1bxrsL._AC_SL1500_.jpg", affiliateLink: "https://amzn.to/4tFfLhd", retailer: "Amazon" },

  // Dekorationer
  { id: "28", name: "G40 Utomhusljusslinga – vattentät och utbyggbar", description: "Dekorativ utomhusljusslinga med varma G40-glödlampor, vattentät och utbyggbar – perfekt för trädgård eller terrass.", categoryKey: "dekorationer", emoji: "💡", image: "https://m.media-amazon.com/images/I/41LWzC7qQML._AC_SL1500_.jpg", affiliateLink: "https://amzn.to/4tD8qi1", retailer: "Amazon" },
  { id: "29", name: "Trädgårdsbelysningssats – varmvitt och vattentätt", description: "Komplett belysningssats för trädgården med eleganta armaturer i varmvitt ljus och IP-klassad vattentätt utförande.", categoryKey: "dekorationer", emoji: "💡", image: "https://m.media-amazon.com/images/I/316II924tYL._AC_SL1500_.jpg", affiliateLink: "https://amzn.to/3O7LrN6", retailer: "Amazon" },
  { id: "30", name: "Sverige Fotbollströja – supportertröja", description: "Supportertröja i Sverige-design tillverkad i andningsbart polyestermaterial, perfekt för matchdagen.", categoryKey: "dekorationer", emoji: "⚽", image: "https://m.media-amazon.com/images/I/4160MhaeS6L._AC_SL1500_.jpg", affiliateLink: "https://amzn.to/4mpboEC", retailer: "Amazon" },
  { id: "31", name: "OM3 Sverige Fotbollsfanshirt", description: "Klassisk Sverige-fanshirt i fotbollsdesign, visa stöd för det svenska landslaget med stil.", categoryKey: "dekorationer", emoji: "⚽", image: "https://m.media-amazon.com/images/I/51FEPgMXJ8L._AC_SL1500_.jpg", affiliateLink: "https://amzn.to/3OcCyBG", retailer: "Amazon" },
  { id: "32", name: "Broderad Sverige-keps", description: "Broderad keps med Sverige-emblem, tillgänglig som klassisk baseballkeps eller truckerkeps i flera utföranden.", categoryKey: "dekorationer", emoji: "🧢", image: "https://m.media-amazon.com/images/I/311iJz69yOL._AC_SL1500_.jpg", affiliateLink: "https://amzn.to/41VrgVL", retailer: "Amazon" },
];
