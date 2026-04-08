# KollaVM – Fotbolls-VM 2026

Den självklara sajten för att följa fotbolls-VM 2026. Matchschema, live-resultat, restaurangtips och produkter för VM-känsla hemma.

## Kom igång

### 1. Installera beroenden

```bash
npm install
```

### 2. Konfigurera miljövariabler

Kopiera exempelfilen och fyll i din API-nyckel:

```bash
cp .env.local.example .env.local
```

Redigera `.env.local` och lägg till din nyckel från [football-data.org](https://www.football-data.org/):

```
NEXT_PUBLIC_FOOTBALL_API_KEY=din_riktiga_nyckel_här
```

> **OBS:** Om ingen API-nyckel anges används automatiskt mockad data.

### 3. Starta utvecklingsservern

```bash
npm run dev
```

Öppna [http://localhost:3000](http://localhost:3000) i din webbläsare.

## Sidor

| Sida | URL | Beskrivning |
|------|-----|-------------|
| Startsida | `/` | Hero med countdown-timer |
| Matchschema | `/matcher` | Alla VM-matcher med live-resultat |
| VM hemma | `/hemma` | Produkter för VM-känsla hemma |
| Restauranger | `/restauranger` | Sökbara restaurangtips |
| Artiklar | `/artiklar` | Blogg med tips och guider |

## Teknikstack

- **Next.js 16** med App Router
- **TypeScript**
- **Tailwind CSS v4**
- **Lucide React** för ikoner
- **football-data.org API** för live-data

## Deployment

Sajten kan enkelt driftsättas på [Vercel](https://vercel.com):

```bash
npx vercel
```

Kom ihåg att lägga till `NEXT_PUBLIC_FOOTBALL_API_KEY` som miljövariabel i Vercel-projektet.
