export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export const quizQuestions: QuizQuestion[] = [
  { id: "q1", question: "Vilket land vann det allra första fotbolls-VM 1930?", options: ["Brasilien", "Uruguay", "Argentina", "Italien"], correctIndex: 1 },
  { id: "q2", question: "Vilket land har vunnit flest VM-titlar?", options: ["Tyskland", "Italien", "Brasilien", "Argentina"], correctIndex: 2 },
  { id: "q3", question: "Vem är den största målskyttekungen någonsin i VM-historien?", options: ["Ronaldo", "Miroslav Klose", "Pelé", "Just Fontaine"], correctIndex: 1 },
  { id: "q4", question: "I vilken stad spelas finalen i VM 2026?", options: ["Los Angeles", "New York/New Jersey", "Mexico City", "Miami"], correctIndex: 1 },
  { id: "q5", question: "Hur många lag deltar i VM 2026?", options: ["32", "36", "40", "48"], correctIndex: 3 },
  { id: "q6", question: "Vilken arena håller finalen i VM 2026?", options: ["SoFi Stadium", "MetLife Stadium", "Hard Rock Stadium", "Rose Bowl"], correctIndex: 1 },
  { id: "q7", question: "Vilket lag vann VM 2022 i Qatar?", options: ["Frankrike", "Kroatien", "Brasilien", "Argentina"], correctIndex: 3 },
  { id: "q8", question: "Hur många grupper finns det i VM 2026?", options: ["8", "10", "12", "16"], correctIndex: 2 },
  { id: "q9", question: "Vilka tre länder är värdar för VM 2026?", options: ["USA, Kanada, Mexiko", "USA, Brasilien, Argentina", "USA, England, Frankrike", "Kanada, Mexiko, Colombia"], correctIndex: 0 },
  { id: "q10", question: "När spelade Sverige senast i en VM-final?", options: ["1950", "1958", "1994", "2018"], correctIndex: 1 },
  { id: "q11", question: "Vilken plats tog Sverige i VM 1994?", options: ["Guld", "Silver", "Brons", "Kvartsfinal"], correctIndex: 2 },
  { id: "q12", question: "Vem vann Guldbollen för VM 2022?", options: ["Kylian Mbappé", "Lionel Messi", "Luka Modrić", "Emi Martínez"], correctIndex: 1 },
  { id: "q13", question: "I vilket VM introducerades VAR för första gången?", options: ["VM 2010", "VM 2014", "VM 2018", "VM 2022"], correctIndex: 2 },
  { id: "q14", question: "Vilken spelare har gjort flest mål i en enda VM-turnering?", options: ["Gerd Müller (10 mål)", "Just Fontaine (13 mål)", "Ronaldo (8 mål)", "Miroslav Klose (5 mål)"], correctIndex: 1 },
  { id: "q15", question: "Vilket land förlorade VM-finalen 2014?", options: ["Brasilien", "Holland", "Argentina", "Frankrike"], correctIndex: 2 },
  { id: "q16", question: "Vilken grupp spelar Sverige i under VM 2026?", options: ["Grupp D", "Grupp E", "Grupp F", "Grupp G"], correctIndex: 2 },
  { id: "q17", question: "Vem är den yngsta målskyttaren i VM-historien?", options: ["Pelé", "Michael Owen", "Kylian Mbappé", "Lionel Messi"], correctIndex: 0 },
  { id: "q18", question: "Vilket lag slog ut Tyskland i gruppspelet i VM 2018?", options: ["Mexiko", "Sydkorea", "Sverige", "Brasilien"], correctIndex: 1 },
  { id: "q19", question: "Hur många matcher spelas totalt i VM 2026?", options: ["64", "80", "96", "104"], correctIndex: 3 },
  { id: "q20", question: "Vilket var det första afrikanska laget att nå en VM-kvartsfinal?", options: ["Nigeria", "Kamerun", "Ghana", "Senegal"], correctIndex: 1 },
  { id: "q21", question: "I vilket VM ägde 'Hand of God'-situationen rum?", options: ["VM 1982", "VM 1986", "VM 1990", "VM 1994"], correctIndex: 1 },
  { id: "q22", question: "Vilket land har spelat flest VM-finaler utan att vinna?", options: ["Nederländerna", "Ungern", "Tjeckoslovakien", "Sverige"], correctIndex: 0 },
  { id: "q23", question: "Hur många poäng får man för exakt rätt resultat i KollaVM?", options: ["1 poäng", "2 poäng", "3 poäng", "5 poäng"], correctIndex: 2 },
  { id: "q24", question: "Vem ledde Frankrike till VM-guld 2018?", options: ["Zinedine Zidane", "Didier Deschamps", "Laurent Blanc", "Raymond Domenech"], correctIndex: 1 },
  { id: "q25", question: "Vilket land vann VM både 2010 och EM 2008 och 2012?", options: ["Tyskland", "Frankrike", "Spanien", "Italien"], correctIndex: 2 },
  { id: "q26", question: "Hur många lag går vidare från varje grupp i VM 2026?", options: ["1 lag", "2 lag", "2 lag + bästa treor", "3 lag"], correctIndex: 2 },
  { id: "q27", question: "Vilken svensk målvakt blev hjälte i VM 1994?", options: ["Thomas Ravelli", "Magnus Hedman", "Andreas Isaksson", "Karl-Oscar Ricardsson"], correctIndex: 0 },
  { id: "q28", question: "Vilken match kallas 'Mirakel i Bern'?", options: ["VM-finalen 1950", "VM-finalen 1954", "VM-finalen 1966", "VM-finalen 1970"], correctIndex: 1 },
  { id: "q29", question: "Vilket lag möter Sverige i första matchen i VM 2026?", options: ["Japan", "Tunisien", "Nederländerna", "Sydkorea"], correctIndex: 2 },
  { id: "q30", question: "Hur många VM-turneringar har arrangerats i Nordamerika före 2026?", options: ["1", "2", "3", "0"], correctIndex: 2 },
  { id: "q31", question: "I vilken stad spelar Sverige sin första VM-match 2026?", options: ["Boston", "San Francisco", "Philadelphia", "New York"], correctIndex: 2 },
  { id: "q32", question: "Vem gjorde 'Scorpion Kick' i VM 1998?", options: ["René Higuita", "Jorge Campos", "Lev Yashin", "Peter Schmeichel"], correctIndex: 0 },
  { id: "q33", question: "Vilket lag vann VM 2006?", options: ["Frankrike", "Italien", "Tyskland", "Brasilien"], correctIndex: 1 },
  { id: "q34", question: "Hur många poäng ger rätt VM-vinnare i KollaVMs tippning?", options: ["5 poäng", "7 poäng", "10 poäng", "15 poäng"], correctIndex: 2 },
  { id: "q35", question: "Vilken svensk spelare gjorde mål med en akrobatisk cykelspark mot England 2012?", options: ["Henrik Larsson", "Fredrik Ljungberg", "Zlatan Ibrahimović", "Marcus Berg"], correctIndex: 2 },
];

export function getRandomQuestions(count: number = 10): QuizQuestion[] {
  const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
