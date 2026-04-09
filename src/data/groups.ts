export interface Team {
  name: string;
  flag: string; // emoji
}

export interface GroupMatch {
  date: string; // "2026-06-11"
  time: string; // "21:00" (svensk tid CEST)
  home: string;
  away: string;
  venue: string;
  channel: "SVT" | "TV4";
}

export interface Group {
  id: string; // "A", "B", ...
  teams: Team[];
  matches: GroupMatch[];
}

export const groups: Group[] = [
  {
    id: "A",
    teams: [
      { name: "Mexiko", flag: "🇲🇽" },
      { name: "Sydafrika", flag: "🇿🇦" },
      { name: "Sydkorea", flag: "🇰🇷" },
      { name: "Tjeckien", flag: "🇨🇿" },
    ],
    matches: [
      { date: "2026-06-11", time: "21:00", home: "Mexiko", away: "Sydafrika", venue: "Estadio Azteca, Mexico City", channel: "TV4" },
      { date: "2026-06-12", time: "00:00", home: "Sydkorea", away: "Tjeckien", venue: "SoFi Stadium, Los Angeles", channel: "SVT" },
      { date: "2026-06-15", time: "21:00", home: "Mexiko", away: "Sydkorea", venue: "Rose Bowl, Los Angeles", channel: "TV4" },
      { date: "2026-06-16", time: "00:00", home: "Tjeckien", away: "Sydafrika", venue: "AT&T Stadium, Dallas", channel: "SVT" },
      { date: "2026-06-19", time: "22:00", home: "Mexiko", away: "Tjeckien", venue: "Estadio Azteca, Mexico City", channel: "TV4" },
      { date: "2026-06-19", time: "22:00", home: "Sydafrika", away: "Sydkorea", venue: "Lumen Field, Seattle", channel: "SVT" },
    ],
  },
  {
    id: "B",
    teams: [
      { name: "Kanada", flag: "🇨🇦" },
      { name: "Bosnien-Hercegovina", flag: "🇧🇦" },
      { name: "Qatar", flag: "🇶🇦" },
      { name: "Schweiz", flag: "🇨🇭" },
    ],
    matches: [
      { date: "2026-06-12", time: "03:00", home: "Kanada", away: "Schweiz", venue: "BC Place, Vancouver", channel: "SVT" },
      { date: "2026-06-12", time: "21:00", home: "Bosnien-Hercegovina", away: "Qatar", venue: "Arrowhead Stadium, Kansas City", channel: "SVT" },
      { date: "2026-06-16", time: "00:00", home: "Kanada", away: "Qatar", venue: "BMO Field, Toronto", channel: "SVT" },
      { date: "2026-06-16", time: "21:00", home: "Schweiz", away: "Bosnien-Hercegovina", venue: "MetLife Stadium, New York", channel: "TV4" },
      { date: "2026-06-20", time: "22:00", home: "Kanada", away: "Bosnien-Hercegovina", venue: "BC Place, Vancouver", channel: "TV4" },
      { date: "2026-06-20", time: "22:00", home: "Qatar", away: "Schweiz", venue: "Gillette Stadium, Boston", channel: "SVT" },
    ],
  },
  {
    id: "C",
    teams: [
      { name: "Brasilien", flag: "🇧🇷" },
      { name: "Marocko", flag: "🇲🇦" },
      { name: "Haiti", flag: "🇭🇹" },
      { name: "Skottland", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
    ],
    matches: [
      { date: "2026-06-13", time: "21:00", home: "Brasilien", away: "Marocko", venue: "MetLife Stadium, New York", channel: "SVT" },
      { date: "2026-06-14", time: "00:00", home: "Haiti", away: "Skottland", venue: "SoFi Stadium, Los Angeles", channel: "SVT" },
      { date: "2026-06-17", time: "21:00", home: "Brasilien", away: "Haiti", venue: "Hard Rock Stadium, Miami", channel: "TV4" },
      { date: "2026-06-18", time: "00:00", home: "Skottland", away: "Marocko", venue: "AT&T Stadium, Dallas", channel: "SVT" },
      { date: "2026-06-21", time: "22:00", home: "Brasilien", away: "Skottland", venue: "MetLife Stadium, New York", channel: "TV4" },
      { date: "2026-06-21", time: "22:00", home: "Marocko", away: "Haiti", venue: "Rose Bowl, Los Angeles", channel: "SVT" },
    ],
  },
  {
    id: "D",
    teams: [
      { name: "USA", flag: "🇺🇸" },
      { name: "Paraguay", flag: "🇵🇾" },
      { name: "Australien", flag: "🇦🇺" },
      { name: "Turkiet", flag: "🇹🇷" },
    ],
    matches: [
      { date: "2026-06-12", time: "21:00", home: "USA", away: "Paraguay", venue: "MetLife Stadium, New York", channel: "TV4" },
      { date: "2026-06-13", time: "00:00", home: "Australien", away: "Turkiet", venue: "AT&T Stadium, Dallas", channel: "SVT" },
      { date: "2026-06-17", time: "00:00", home: "USA", away: "Australien", venue: "Levi's Stadium, San Francisco", channel: "TV4" },
      { date: "2026-06-17", time: "21:00", home: "Turkiet", away: "Paraguay", venue: "Hard Rock Stadium, Miami", channel: "SVT" },
      { date: "2026-06-21", time: "22:00", home: "USA", away: "Turkiet", venue: "MetLife Stadium, New York", channel: "TV4" },
      { date: "2026-06-21", time: "22:00", home: "Paraguay", away: "Australien", venue: "Arrowhead Stadium, Kansas City", channel: "SVT" },
    ],
  },
  {
    id: "E",
    teams: [
      { name: "Tyskland", flag: "🇩🇪" },
      { name: "Curaçao", flag: "🇨🇼" },
      { name: "Elfenbenskusten", flag: "🇨🇮" },
      { name: "Ecuador", flag: "🇪🇨" },
    ],
    matches: [
      { date: "2026-06-13", time: "21:00", home: "Tyskland", away: "Elfenbenskusten", venue: "Gillette Stadium, Boston", channel: "TV4" },
      { date: "2026-06-14", time: "00:00", home: "Ecuador", away: "Curaçao", venue: "Lumen Field, Seattle", channel: "SVT" },
      { date: "2026-06-18", time: "00:00", home: "Tyskland", away: "Ecuador", venue: "SoFi Stadium, Los Angeles", channel: "TV4" },
      { date: "2026-06-18", time: "21:00", home: "Curaçao", away: "Elfenbenskusten", venue: "Lincoln Financial Field, Philadelphia", channel: "SVT" },
      { date: "2026-06-22", time: "22:00", home: "Tyskland", away: "Curaçao", venue: "MetLife Stadium, New York", channel: "TV4" },
      { date: "2026-06-22", time: "22:00", home: "Elfenbenskusten", away: "Ecuador", venue: "Rose Bowl, Los Angeles", channel: "SVT" },
    ],
  },
  {
    id: "F",
    teams: [
      { name: "Nederländerna", flag: "🇳🇱" },
      { name: "Japan", flag: "🇯🇵" },
      { name: "Sverige", flag: "🇸🇪" },
      { name: "Tunisien", flag: "🇹🇳" },
    ],
    matches: [
      { date: "2026-06-14", time: "21:00", home: "Nederländerna", away: "Sverige", venue: "Lincoln Financial Field, Philadelphia", channel: "TV4" },
      { date: "2026-06-15", time: "00:00", home: "Japan", away: "Tunisien", venue: "Estadio Akron, Guadalajara", channel: "SVT" },
      { date: "2026-06-18", time: "21:00", home: "Nederländerna", away: "Japan", venue: "AT&T Stadium, Dallas", channel: "TV4" },
      { date: "2026-06-19", time: "00:00", home: "Sverige", away: "Tunisien", venue: "Levi's Stadium, San Francisco", channel: "SVT" },
      { date: "2026-06-22", time: "22:00", home: "Nederländerna", away: "Tunisien", venue: "Hard Rock Stadium, Miami", channel: "TV4" },
      { date: "2026-06-22", time: "22:00", home: "Sverige", away: "Japan", venue: "Gillette Stadium, Boston", channel: "SVT" },
    ],
  },
  {
    id: "G",
    teams: [
      { name: "Belgien", flag: "🇧🇪" },
      { name: "Egypten", flag: "🇪🇬" },
      { name: "Iran", flag: "🇮🇷" },
      { name: "Nya Zeeland", flag: "🇳🇿" },
    ],
    matches: [
      { date: "2026-06-15", time: "21:00", home: "Belgien", away: "Egypten", venue: "Hard Rock Stadium, Miami", channel: "SVT" },
      { date: "2026-06-16", time: "00:00", home: "Iran", away: "Nya Zeeland", venue: "Lumen Field, Seattle", channel: "SVT" },
      { date: "2026-06-19", time: "21:00", home: "Belgien", away: "Iran", venue: "MetLife Stadium, New York", channel: "SVT" },
      { date: "2026-06-20", time: "00:00", home: "Nya Zeeland", away: "Egypten", venue: "Arrowhead Stadium, Kansas City", channel: "SVT" },
      { date: "2026-06-23", time: "22:00", home: "Belgien", away: "Nya Zeeland", venue: "BC Place, Vancouver", channel: "TV4" },
      { date: "2026-06-23", time: "22:00", home: "Egypten", away: "Iran", venue: "AT&T Stadium, Dallas", channel: "SVT" },
    ],
  },
  {
    id: "H",
    teams: [
      { name: "Spanien", flag: "🇪🇸" },
      { name: "Kap Verde", flag: "🇨🇻" },
      { name: "Saudiarabien", flag: "🇸🇦" },
      { name: "Uruguay", flag: "🇺🇾" },
    ],
    matches: [
      { date: "2026-06-15", time: "00:00", home: "Spanien", away: "Uruguay", venue: "Rose Bowl, Los Angeles", channel: "SVT" },
      { date: "2026-06-15", time: "21:00", home: "Kap Verde", away: "Saudiarabien", venue: "Arrowhead Stadium, Kansas City", channel: "SVT" },
      { date: "2026-06-19", time: "00:00", home: "Spanien", away: "Kap Verde", venue: "SoFi Stadium, Los Angeles", channel: "SVT" },
      { date: "2026-06-19", time: "21:00", home: "Saudiarabien", away: "Uruguay", venue: "Estadio Akron, Guadalajara", channel: "SVT" },
      { date: "2026-06-23", time: "22:00", home: "Spanien", away: "Saudiarabien", venue: "MetLife Stadium, New York", channel: "TV4" },
      { date: "2026-06-23", time: "22:00", home: "Uruguay", away: "Kap Verde", venue: "Levi's Stadium, San Francisco", channel: "SVT" },
    ],
  },
  {
    id: "I",
    teams: [
      { name: "Frankrike", flag: "🇫🇷" },
      { name: "Senegal", flag: "🇸🇳" },
      { name: "Irak", flag: "🇮🇶" },
      { name: "Norge", flag: "🇳🇴" },
    ],
    matches: [
      { date: "2026-06-16", time: "21:00", home: "Frankrike", away: "Senegal", venue: "MetLife Stadium, New York", channel: "TV4" },
      { date: "2026-06-17", time: "00:00", home: "Irak", away: "Norge", venue: "AT&T Stadium, Dallas", channel: "SVT" },
      { date: "2026-06-20", time: "21:00", home: "Frankrike", away: "Irak", venue: "Rose Bowl, Los Angeles", channel: "TV4" },
      { date: "2026-06-21", time: "00:00", home: "Norge", away: "Senegal", venue: "Lumen Field, Seattle", channel: "SVT" },
      { date: "2026-06-24", time: "22:00", home: "Frankrike", away: "Norge", venue: "Hard Rock Stadium, Miami", channel: "TV4" },
      { date: "2026-06-24", time: "22:00", home: "Senegal", away: "Irak", venue: "Gillette Stadium, Boston", channel: "SVT" },
    ],
  },
  {
    id: "J",
    teams: [
      { name: "Argentina", flag: "🇦🇷" },
      { name: "Algeriet", flag: "🇩🇿" },
      { name: "Österrike", flag: "🇦🇹" },
      { name: "Jordanien", flag: "🇯🇴" },
    ],
    matches: [
      { date: "2026-06-16", time: "00:00", home: "Argentina", away: "Algeriet", venue: "MetLife Stadium, New York", channel: "TV4" },
      { date: "2026-06-16", time: "21:00", home: "Österrike", away: "Jordanien", venue: "SoFi Stadium, Los Angeles", channel: "SVT" },
      { date: "2026-06-20", time: "00:00", home: "Argentina", away: "Österrike", venue: "Hard Rock Stadium, Miami", channel: "TV4" },
      { date: "2026-06-20", time: "21:00", home: "Jordanien", away: "Algeriet", venue: "Estadio Akron, Guadalajara", channel: "SVT" },
      { date: "2026-06-24", time: "22:00", home: "Argentina", away: "Jordanien", venue: "MetLife Stadium, New York", channel: "TV4" },
      { date: "2026-06-24", time: "22:00", home: "Algeriet", away: "Österrike", venue: "Arrowhead Stadium, Kansas City", channel: "SVT" },
    ],
  },
  {
    id: "K",
    teams: [
      { name: "Portugal", flag: "🇵🇹" },
      { name: "DR Kongo", flag: "🇨🇩" },
      { name: "Uzbekistan", flag: "🇺🇿" },
      { name: "Colombia", flag: "🇨🇴" },
    ],
    matches: [
      { date: "2026-06-17", time: "21:00", home: "Portugal", away: "Uzbekistan", venue: "Lincoln Financial Field, Philadelphia", channel: "TV4" },
      { date: "2026-06-18", time: "00:00", home: "DR Kongo", away: "Colombia", venue: "Gillette Stadium, Boston", channel: "SVT" },
      { date: "2026-06-21", time: "21:00", home: "Portugal", away: "DR Kongo", venue: "AT&T Stadium, Dallas", channel: "TV4" },
      { date: "2026-06-22", time: "00:00", home: "Colombia", away: "Uzbekistan", venue: "BC Place, Vancouver", channel: "SVT" },
      { date: "2026-06-25", time: "22:00", home: "Portugal", away: "Colombia", venue: "MetLife Stadium, New York", channel: "TV4" },
      { date: "2026-06-25", time: "22:00", home: "Uzbekistan", away: "DR Kongo", venue: "Rose Bowl, Los Angeles", channel: "SVT" },
    ],
  },
  {
    id: "L",
    teams: [
      { name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { name: "Kroatien", flag: "🇭🇷" },
      { name: "Ghana", flag: "🇬🇭" },
      { name: "Panama", flag: "🇵🇦" },
    ],
    matches: [
      { date: "2026-06-17", time: "00:00", home: "England", away: "Panama", venue: "Hard Rock Stadium, Miami", channel: "TV4" },
      { date: "2026-06-17", time: "21:00", home: "Kroatien", away: "Ghana", venue: "SoFi Stadium, Los Angeles", channel: "SVT" },
      { date: "2026-06-21", time: "00:00", home: "England", away: "Kroatien", venue: "MetLife Stadium, New York", channel: "TV4" },
      { date: "2026-06-22", time: "21:00", home: "Ghana", away: "Panama", venue: "Levi's Stadium, San Francisco", channel: "SVT" },
      { date: "2026-06-25", time: "22:00", home: "England", away: "Ghana", venue: "Gillette Stadium, Boston", channel: "TV4" },
      { date: "2026-06-25", time: "22:00", home: "Panama", away: "Kroatien", venue: "Arrowhead Stadium, Kansas City", channel: "SVT" },
    ],
  },
];
