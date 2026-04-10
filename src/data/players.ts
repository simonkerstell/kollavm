export interface Player {
  name: string;
  country: string;
  flag: string;
  position: "FW" | "MF" | "DF" | "GK";
}

// Star players likely to be at World Cup 2026
// This list can be updated when official squads are confirmed (June 1, 2026)
export const starPlayers: Player[] = [
  // Argentina
  { name: "Lionel Messi", country: "Argentina", flag: "🇦🇷", position: "FW" },
  { name: "Julián Álvarez", country: "Argentina", flag: "🇦🇷", position: "FW" },
  { name: "Lautaro Martínez", country: "Argentina", flag: "🇦🇷", position: "FW" },

  // Frankrike
  { name: "Kylian Mbappé", country: "Frankrike", flag: "🇫🇷", position: "FW" },
  { name: "Antoine Griezmann", country: "Frankrike", flag: "🇫🇷", position: "FW" },

  // Brasilien
  { name: "Vinícius Júnior", country: "Brasilien", flag: "🇧🇷", position: "FW" },
  { name: "Rodrygo", country: "Brasilien", flag: "🇧🇷", position: "FW" },
  { name: "Endrick", country: "Brasilien", flag: "🇧🇷", position: "FW" },

  // England
  { name: "Harry Kane", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "FW" },
  { name: "Jude Bellingham", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "MF" },
  { name: "Bukayo Saka", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "FW" },
  { name: "Phil Foden", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "MF" },

  // Spanien
  { name: "Lamine Yamal", country: "Spanien", flag: "🇪🇸", position: "FW" },
  { name: "Pedri", country: "Spanien", flag: "🇪🇸", position: "MF" },
  { name: "Álvaro Morata", country: "Spanien", flag: "🇪🇸", position: "FW" },

  // Tyskland
  { name: "Florian Wirtz", country: "Tyskland", flag: "🇩🇪", position: "MF" },
  { name: "Jamal Musiala", country: "Tyskland", flag: "🇩🇪", position: "MF" },
  { name: "Kai Havertz", country: "Tyskland", flag: "🇩🇪", position: "FW" },

  // Portugal
  { name: "Cristiano Ronaldo", country: "Portugal", flag: "🇵🇹", position: "FW" },
  { name: "Rafael Leão", country: "Portugal", flag: "🇵🇹", position: "FW" },
  { name: "Bruno Fernandes", country: "Portugal", flag: "🇵🇹", position: "MF" },

  // Nederländerna
  { name: "Cody Gakpo", country: "Nederländerna", flag: "🇳🇱", position: "FW" },
  { name: "Xavi Simons", country: "Nederländerna", flag: "🇳🇱", position: "MF" },

  // Belgien
  { name: "Kevin De Bruyne", country: "Belgien", flag: "🇧🇪", position: "MF" },
  { name: "Jérémy Doku", country: "Belgien", flag: "🇧🇪", position: "FW" },

  // Norge
  { name: "Erling Haaland", country: "Norge", flag: "🇳🇴", position: "FW" },
  { name: "Martin Ødegaard", country: "Norge", flag: "🇳🇴", position: "MF" },

  // Kroatien
  { name: "Luka Modrić", country: "Kroatien", flag: "🇭🇷", position: "MF" },

  // Uruguay
  { name: "Darwin Núñez", country: "Uruguay", flag: "🇺🇾", position: "FW" },
  { name: "Federico Valverde", country: "Uruguay", flag: "🇺🇾", position: "MF" },

  // Colombia
  { name: "Luis Díaz", country: "Colombia", flag: "🇨🇴", position: "FW" },

  // Mexiko
  { name: "Santiago Giménez", country: "Mexiko", flag: "🇲🇽", position: "FW" },

  // USA
  { name: "Christian Pulisic", country: "USA", flag: "🇺🇸", position: "FW" },

  // Japan
  { name: "Takefusa Kubo", country: "Japan", flag: "🇯🇵", position: "FW" },

  // Sydkorea
  { name: "Son Heung-min", country: "Sydkorea", flag: "🇰🇷", position: "FW" },

  // Marocko
  { name: "Achraf Hakimi", country: "Marocko", flag: "🇲🇦", position: "DF" },

  // Senegal
  { name: "Sadio Mané", country: "Senegal", flag: "🇸🇳", position: "FW" },

  // Egypten
  { name: "Mohamed Salah", country: "Egypten", flag: "🇪🇬", position: "FW" },

  // Sverige
  { name: "Viktor Gyökeres", country: "Sverige", flag: "🇸🇪", position: "FW" },
  { name: "Alexander Isak", country: "Sverige", flag: "🇸🇪", position: "FW" },
  { name: "Dejan Kulusevski", country: "Sverige", flag: "🇸🇪", position: "MF" },

  // Ecuador
  { name: "Moisés Caicedo", country: "Ecuador", flag: "🇪🇨", position: "MF" },

  // Kanada
  { name: "Jonathan David", country: "Kanada", flag: "🇨🇦", position: "FW" },

  // Turkiet
  { name: "Arda Güler", country: "Turkiet", flag: "🇹🇷", position: "MF" },

  // Iran
  { name: "Mehdi Taremi", country: "Iran", flag: "🇮🇷", position: "FW" },
];
