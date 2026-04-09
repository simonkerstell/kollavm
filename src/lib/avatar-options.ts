export const SKIN_TONES = ["#FDEBD0", "#F5D0A9", "#D4A574", "#C68642", "#8D5524", "#5C3A1E"];

export const HAIR_COLORS = ["#1C1C1C", "#3B2F2F", "#8B6914", "#D4A017", "#A0522D", "#C0C0C0"];

export const HAIR_STYLES = [
  { id: "short" as const, label: "Kort" },
  { id: "curly" as const, label: "Lockigt" },
  { id: "long" as const, label: "Långt" },
  { id: "bald" as const, label: "Kal" },
  { id: "mohawk" as const, label: "Mohawk" },
];

export const JERSEY_PRESETS = [
  { country: "Sverige", color: "#F5C518", flag: "🇸🇪" },
  { country: "Brasilien", color: "#FFDF00", flag: "🇧🇷" },
  { country: "Argentina", color: "#75AADB", flag: "🇦🇷" },
  { country: "Frankrike", color: "#002395", flag: "🇫🇷" },
  { country: "Tyskland", color: "#FFFFFF", flag: "🇩🇪" },
  { country: "Spanien", color: "#C60B1E", flag: "🇪🇸" },
  { country: "England", color: "#FFFFFF", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { country: "Nederländerna", color: "#FF6600", flag: "🇳🇱" },
  { country: "Portugal", color: "#006600", flag: "🇵🇹" },
  { country: "Italien", color: "#0066CC", flag: "🇮🇹" },
  { country: "Mexiko", color: "#006341", flag: "🇲🇽" },
  { country: "Japan", color: "#002B5C", flag: "🇯🇵" },
];

export const ACCESSORIES = [
  { id: "none" as const, label: "Ingen" },
  { id: "sunglasses" as const, label: "Solglasögon" },
  { id: "cap" as const, label: "Keps" },
  { id: "headband" as const, label: "Pannband" },
];
