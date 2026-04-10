export interface SwedishPlayer {
  name: string;
  position: "GK" | "DF" | "MF" | "FW";
  club: string;
}

// Sannolik VM-trupp 2026 (uppdateras när officiell trupp presenteras)
export const swedenSquad: SwedishPlayer[] = [
  // Målvakter
  { name: "Viktor Johansson", position: "GK", club: "Stoke City" },
  { name: "Kristoffer Nordfeldt", position: "GK", club: "AIK" },
  { name: "Jacob Widell Zetterström", position: "GK", club: "Derby County" },

  // Backar
  { name: "Victor Nilsson Lindelöf", position: "DF", club: "Aston Villa" },
  { name: "Isak Hien", position: "DF", club: "Atalanta" },
  { name: "Carl Starfelt", position: "DF", club: "Celta Vigo" },
  { name: "Gustaf Lagerbielke", position: "DF", club: "Braga" },
  { name: "Emil Holm", position: "DF", club: "Bologna" },
  { name: "Gabriel Gudmundsson", position: "DF", club: "Leeds United" },
  { name: "Daniel Svensson", position: "DF", club: "Borussia Dortmund" },

  // Mittfältare
  { name: "Dejan Kulusevski", position: "MF", club: "Tottenham" },
  { name: "Hugo Larsson", position: "MF", club: "Eintracht Frankfurt" },
  { name: "Yasin Ayari", position: "MF", club: "Brighton" },
  { name: "Lucas Bergvall", position: "MF", club: "Tottenham" },
  { name: "Mattias Svanberg", position: "MF", club: "Wolfsburg" },
  { name: "Jesper Karlström", position: "MF", club: "Udinese" },
  { name: "Roony Bardghji", position: "MF", club: "FC Barcelona" },

  // Anfallare
  { name: "Viktor Gyökeres", position: "FW", club: "Sporting CP" },
  { name: "Alexander Isak", position: "FW", club: "Liverpool" },
  { name: "Anthony Elanga", position: "FW", club: "Newcastle" },
  { name: "Benjamin Nygren", position: "FW", club: "Celtic" },
  { name: "Isac Lidberg", position: "FW", club: "Darmstadt" },
];

// Formation positions (4-3-3) with x,y coordinates (percentage)
export const formationPositions: Record<string, { x: number; y: number; label: string }> = {
  gk: { x: 50, y: 90, label: "MV" },
  lb: { x: 15, y: 70, label: "VB" },
  cb1: { x: 35, y: 72, label: "MB" },
  cb2: { x: 65, y: 72, label: "MB" },
  rb: { x: 85, y: 70, label: "HB" },
  cm1: { x: 25, y: 50, label: "CM" },
  cm2: { x: 50, y: 48, label: "CM" },
  cm3: { x: 75, y: 50, label: "CM" },
  lw: { x: 18, y: 25, label: "VY" },
  st: { x: 50, y: 20, label: "ST" },
  rw: { x: 82, y: 25, label: "HY" },
};

export const positionSlots = ["gk", "lb", "cb1", "cb2", "rb", "cm1", "cm2", "cm3", "lw", "st", "rw"] as const;
