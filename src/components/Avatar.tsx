import { AvatarConfig, DEFAULT_AVATAR } from "@/lib/tippa-types";

function HairPath({ style, color }: { style: AvatarConfig["hairStyle"]; color: string }) {
  switch (style) {
    case "short":
      return <path d="M25 28 Q25 18 40 16 Q55 18 55 28" fill={color} />;
    case "curly":
      return <path d="M23 30 Q22 15 32 14 Q36 10 40 12 Q44 10 48 14 Q58 15 57 30 Q55 22 40 20 Q25 22 23 30Z" fill={color} />;
    case "long":
      return <>
        <path d="M24 28 Q24 16 40 14 Q56 16 56 28" fill={color} />
        <path d="M24 28 Q22 40 24 50" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M56 28 Q58 40 56 50" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" />
      </>;
    case "mohawk":
      return <path d="M36 12 Q38 4 40 2 Q42 4 44 12 Q42 14 40 14 Q38 14 36 12Z" fill={color} />;
    case "bald":
    default:
      return null;
  }
}

function AccessoryOverlay({ type, jerseyColor }: { type: AvatarConfig["accessory"]; jerseyColor: string }) {
  switch (type) {
    case "sunglasses":
      return <>
        <rect x="29" y="28" width="8" height="6" rx="2" fill="#1a1a1a" />
        <rect x="43" y="28" width="8" height="6" rx="2" fill="#1a1a1a" />
        <line x1="37" y1="30" x2="43" y2="30" stroke="#1a1a1a" strokeWidth="1.5" />
      </>;
    case "cap":
      return <>
        <path d="M24 24 Q24 14 40 12 Q56 14 56 24 Z" fill={jerseyColor} />
        <rect x="20" y="22" width="24" height="4" rx="1" fill={jerseyColor} />
      </>;
    case "headband":
      return <rect x="24" y="22" width="32" height="4" rx="2" fill={jerseyColor} />;
    default:
      return null;
  }
}

export default function Avatar({ config, size = 40 }: { config?: AvatarConfig | null; size?: number }) {
  const c = config ?? DEFAULT_AVATAR;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Head */}
      <circle cx="40" cy="28" r="16" fill={c.skinTone} />

      {/* Hair */}
      <HairPath style={c.hairStyle} color={c.hairColor} />

      {/* Eyes */}
      <circle cx="34" cy="30" r="2" fill="#1a1a1a" />
      <circle cx="46" cy="30" r="2" fill="#1a1a1a" />

      {/* Mouth */}
      <path d="M36 36 Q40 40 44 36" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Accessory */}
      <AccessoryOverlay type={c.accessory} jerseyColor={c.jerseyColor} />

      {/* Neck */}
      <rect x="37" y="43" width="6" height="6" fill={c.skinTone} rx="1" />

      {/* Jersey */}
      <path d="M22 50 L28 46 L37 48 L43 48 L52 46 L58 50 L58 72 L22 72 Z" fill={c.jerseyColor} rx="4" />
      {/* Jersey collar */}
      <path d="M35 48 Q40 52 45 48" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" fill="none" />
      {/* Jersey sleeves */}
      <path d="M22 50 L14 56 L18 62 L28 56" fill={c.jerseyColor} />
      <path d="M58 50 L66 56 L62 62 L52 56" fill={c.jerseyColor} />
      {/* Jersey shadow */}
      <path d="M22 50 L58 50 L58 72 L22 72 Z" fill="rgba(0,0,0,0.05)" />

      {/* Shorts */}
      <rect x="26" y="72" width="28" height="12" fill="white" rx="2" />
      <line x1="40" y1="72" x2="40" y2="84" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />

      {/* Legs */}
      <rect x="28" y="84" width="10" height="14" fill={c.skinTone} rx="2" />
      <rect x="42" y="84" width="10" height="14" fill={c.skinTone} rx="2" />

      {/* Socks & Shoes */}
      <rect x="28" y="90" width="10" height="4" fill={c.jerseyColor} rx="1" />
      <rect x="42" y="90" width="10" height="4" fill={c.jerseyColor} rx="1" />
      <rect x="27" y="94" width="12" height="4" fill="#1a1a1a" rx="2" />
      <rect x="41" y="94" width="12" height="4" fill="#1a1a1a" rx="2" />

      {/* Arms */}
      <rect x="12" y="56" width="6" height="4" fill={c.skinTone} rx="2" />
      <rect x="62" y="56" width="6" height="4" fill={c.skinTone} rx="2" />
    </svg>
  );
}
