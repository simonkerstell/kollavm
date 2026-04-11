export const SKIN_TONES = ["#FDEBD0", "#F5D0A9", "#D4A574", "#C68642", "#8D5524", "#5C3A1E"];

export const HAIR_COLORS = ["#1C1C1C", "#3B2F2F", "#8B6914", "#D4A017", "#A0522D", "#C0C0C0", "#E8E8E8", "#B22222"];

export const HAIR_STYLES = [
  { id: "short" as const, label: "Kort" },
  { id: "buzz" as const, label: "Rakat" },
  { id: "curly" as const, label: "Lockigt" },
  { id: "long" as const, label: "Långt" },
  { id: "afro" as const, label: "Afro" },
  { id: "mohawk" as const, label: "Mohawk" },
  { id: "bald" as const, label: "Kal" },
];

export const BEARDS = [
  { id: "none" as const, label: "Inget" },
  { id: "stubble" as const, label: "Stubb" },
  { id: "full" as const, label: "Helskägg" },
  { id: "goatee" as const, label: "Pipskägg" },
];

// Only teams that are in World Cup 2026
export const JERSEY_PRESETS = [
  { country: "Sverige", color: "#F5C518", flag: "🇸🇪" },
  { country: "Argentina", color: "#75AADB", flag: "🇦🇷" },
  { country: "Brasilien", color: "#FFDF00", flag: "🇧🇷" },
  { country: "Frankrike", color: "#002395", flag: "🇫🇷" },
  { country: "England", color: "#FFFFFF", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { country: "Spanien", color: "#C60B1E", flag: "🇪🇸" },
  { country: "Tyskland", color: "#FFFFFF", flag: "🇩🇪" },
  { country: "Nederländerna", color: "#FF6600", flag: "🇳🇱" },
  { country: "Portugal", color: "#006600", flag: "🇵🇹" },
  { country: "Belgien", color: "#ED2939", flag: "🇧🇪" },
  { country: "Kroatien", color: "#FF0000", flag: "🇭🇷" },
  { country: "Uruguay", color: "#5DADE2", flag: "🇺🇾" },
  { country: "USA", color: "#002868", flag: "🇺🇸" },
  { country: "Mexiko", color: "#006341", flag: "🇲🇽" },
  { country: "Japan", color: "#002B5C", flag: "🇯🇵" },
  { country: "Sydkorea", color: "#CD2E3A", flag: "🇰🇷" },
  { country: "Marocko", color: "#006233", flag: "🇲🇦" },
  { country: "Norge", color: "#BA0C2F", flag: "🇳🇴" },
  { country: "Colombia", color: "#FCD116", flag: "🇨🇴" },
  { country: "Kanada", color: "#FF0000", flag: "🇨🇦" },
];

export const ACCESSORIES = [
  { id: "none" as const, label: "Ingen" },
  { id: "sunglasses" as const, label: "Solglasögon" },
  { id: "cap" as const, label: "Keps" },
  { id: "headband" as const, label: "Pannband" },
  { id: "facepaint" as const, label: "Ansiktsmålning" },
];
