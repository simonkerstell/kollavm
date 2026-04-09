export interface BracketMatchDef {
  id: string;
  round: "r32" | "r16" | "qf" | "sf" | "final";
  homeLabel: string;
  awayLabel: string;
  // Where does each team come from?
  homeFrom?: string; // matchId of previous match whose winner fills this slot
  awayFrom?: string;
}

// ---- Round of 32 (matches 73-88) ----
// Based on official FIFA 2026 World Cup bracket

const r32: BracketMatchDef[] = [
  // Left side - feeds into M89, M90
  { id: "m74", round: "r32", homeLabel: "Etta E", awayLabel: "Bästa 3:a" },
  { id: "m77", round: "r32", homeLabel: "Etta I", awayLabel: "Bästa 3:a" },
  { id: "m73", round: "r32", homeLabel: "Tvåa A", awayLabel: "Tvåa B" },
  { id: "m75", round: "r32", homeLabel: "Etta F", awayLabel: "Tvåa C" },

  // Left side - feeds into M91, M92
  { id: "m76", round: "r32", homeLabel: "Etta C", awayLabel: "Tvåa F" },
  { id: "m78", round: "r32", homeLabel: "Tvåa E", awayLabel: "Tvåa I" },
  { id: "m79", round: "r32", homeLabel: "Etta A", awayLabel: "Bästa 3:a" },
  { id: "m80", round: "r32", homeLabel: "Etta L", awayLabel: "Bästa 3:a" },

  // Right side - feeds into M93, M94
  { id: "m83", round: "r32", homeLabel: "Tvåa K", awayLabel: "Tvåa L" },
  { id: "m84", round: "r32", homeLabel: "Etta H", awayLabel: "Tvåa J" },
  { id: "m81", round: "r32", homeLabel: "Etta D", awayLabel: "Bästa 3:a" },
  { id: "m82", round: "r32", homeLabel: "Etta G", awayLabel: "Bästa 3:a" },

  // Right side - feeds into M95, M96
  { id: "m86", round: "r32", homeLabel: "Etta J", awayLabel: "Tvåa H" },
  { id: "m88", round: "r32", homeLabel: "Tvåa D", awayLabel: "Tvåa G" },
  { id: "m85", round: "r32", homeLabel: "Etta B", awayLabel: "Bästa 3:a" },
  { id: "m87", round: "r32", homeLabel: "Etta K", awayLabel: "Bästa 3:a" },
];

// ---- Round of 16 (matches 89-96) ----

const r16: BracketMatchDef[] = [
  { id: "m89", round: "r16", homeLabel: "Vinnare M74", awayLabel: "Vinnare M77", homeFrom: "m74", awayFrom: "m77" },
  { id: "m90", round: "r16", homeLabel: "Vinnare M73", awayLabel: "Vinnare M75", homeFrom: "m73", awayFrom: "m75" },
  { id: "m91", round: "r16", homeLabel: "Vinnare M76", awayLabel: "Vinnare M78", homeFrom: "m76", awayFrom: "m78" },
  { id: "m92", round: "r16", homeLabel: "Vinnare M79", awayLabel: "Vinnare M80", homeFrom: "m79", awayFrom: "m80" },
  { id: "m93", round: "r16", homeLabel: "Vinnare M83", awayLabel: "Vinnare M84", homeFrom: "m83", awayFrom: "m84" },
  { id: "m94", round: "r16", homeLabel: "Vinnare M81", awayLabel: "Vinnare M82", homeFrom: "m81", awayFrom: "m82" },
  { id: "m95", round: "r16", homeLabel: "Vinnare M86", awayLabel: "Vinnare M88", homeFrom: "m86", awayFrom: "m88" },
  { id: "m96", round: "r16", homeLabel: "Vinnare M85", awayLabel: "Vinnare M87", homeFrom: "m85", awayFrom: "m87" },
];

// ---- Quarterfinals (matches 97-100) ----

const qf: BracketMatchDef[] = [
  { id: "m97", round: "qf", homeLabel: "Vinnare M89", awayLabel: "Vinnare M90", homeFrom: "m89", awayFrom: "m90" },
  { id: "m98", round: "qf", homeLabel: "Vinnare M93", awayLabel: "Vinnare M94", homeFrom: "m93", awayFrom: "m94" },
  { id: "m99", round: "qf", homeLabel: "Vinnare M91", awayLabel: "Vinnare M92", homeFrom: "m91", awayFrom: "m92" },
  { id: "m100", round: "qf", homeLabel: "Vinnare M95", awayLabel: "Vinnare M96", homeFrom: "m95", awayFrom: "m96" },
];

// ---- Semifinals (matches 101-102) ----

const sf: BracketMatchDef[] = [
  { id: "m101", round: "sf", homeLabel: "Vinnare M97", awayLabel: "Vinnare M98", homeFrom: "m97", awayFrom: "m98" },
  { id: "m102", round: "sf", homeLabel: "Vinnare M99", awayLabel: "Vinnare M100", homeFrom: "m99", awayFrom: "m100" },
];

// ---- Final (match 103) ----

const final: BracketMatchDef[] = [
  { id: "m103", round: "final", homeLabel: "Vinnare M101", awayLabel: "Vinnare M102", homeFrom: "m101", awayFrom: "m102" },
];

export const bracketRounds = [
  { key: "r32", label: "Sextondelsfinaler", points: "2p per rätt", matches: r32 },
  { key: "r16", label: "Åttondelsfinaler", points: "3p per rätt", matches: r16 },
  { key: "qf", label: "Kvartsfinaler", points: "5p per rätt", matches: qf },
  { key: "sf", label: "Semifinaler", points: "7p per rätt", matches: sf },
  { key: "final", label: "Final", points: "10p", matches: final },
] as const;

export const allBracketMatches: BracketMatchDef[] = [...r32, ...r16, ...qf, ...sf, ...final];
