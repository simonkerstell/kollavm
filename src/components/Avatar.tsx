import { AvatarConfig, DEFAULT_AVATAR } from "@/lib/tippa-types";

function HairPath({ style, color }: { style: AvatarConfig["hairStyle"]; color: string }) {
  switch (style) {
    case "short":
      return <path d="M25 28 Q25 17 40 15 Q55 17 55 28" fill={color} />;
    case "buzz":
      return <path d="M26 28 Q26 19 40 17 Q54 19 54 28" fill={color} opacity="0.7" />;
    case "curly":
      return <path d="M22 32 Q20 13 30 12 Q35 8 40 11 Q45 8 50 12 Q60 13 58 32 Q55 20 40 18 Q25 20 22 32Z" fill={color} />;
    case "long":
      return <>
        <path d="M23 28 Q23 14 40 12 Q57 14 57 28" fill={color} />
        <path d="M23 28 Q20 42 23 55" stroke={color} strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M57 28 Q60 42 57 55" stroke={color} strokeWidth="5" fill="none" strokeLinecap="round" />
      </>;
    case "afro":
      return <ellipse cx="40" cy="22" rx="22" ry="18" fill={color} />;
    case "mohawk":
      return <path d="M35 14 Q37 2 40 0 Q43 2 45 14 Q43 16 40 16 Q37 16 35 14Z" fill={color} />;
    case "bald":
    default:
      return null;
  }
}

function BeardOverlay({ type, hairColor, skinTone }: { type: AvatarConfig["beard"]; hairColor: string; skinTone: string }) {
  const beardColor = hairColor + "99"; // semi-transparent
  switch (type) {
    case "stubble":
      return <>
        <rect x="30" y="35" width="20" height="6" rx="3" fill={beardColor} opacity="0.4" />
      </>;
    case "full":
      return <>
        <path d="M28 34 Q28 45 40 48 Q52 45 52 34" fill={beardColor} opacity="0.6" />
        <path d="M30 33 Q30 42 40 44 Q50 42 50 33" fill={skinTone} opacity="0.3" />
      </>;
    case "goatee":
      return <>
        <path d="M35 37 Q35 44 40 46 Q45 44 45 37" fill={beardColor} opacity="0.6" />
      </>;
    default:
      return null;
  }
}

function AccessoryOverlay({ type, jerseyColor }: { type: AvatarConfig["accessory"]; jerseyColor: string }) {
  switch (type) {
    case "sunglasses":
      return <>
        <rect x="28" y="27" width="9" height="7" rx="2" fill="#1a1a1a" />
        <rect x="43" y="27" width="9" height="7" rx="2" fill="#1a1a1a" />
        <line x1="37" y1="30" x2="43" y2="30" stroke="#1a1a1a" strokeWidth="1.5" />
        <line x1="28" y1="29" x2="24" y2="27" stroke="#1a1a1a" strokeWidth="1" />
        <line x1="52" y1="29" x2="56" y2="27" stroke="#1a1a1a" strokeWidth="1" />
      </>;
    case "cap":
      return <>
        <path d="M24 24 Q24 12 40 10 Q56 12 56 24 Z" fill={jerseyColor} />
        <rect x="18" y="22" width="26" height="4" rx="1" fill={jerseyColor} />
        <rect x="18" y="22" width="26" height="1.5" rx="0.5" fill="rgba(0,0,0,0.15)" />
      </>;
    case "headband":
      return <>
        <rect x="24" y="21" width="32" height="4" rx="2" fill={jerseyColor} />
        <rect x="24" y="21" width="32" height="1" rx="0.5" fill="rgba(255,255,255,0.2)" />
      </>;
    case "facepaint":
      return <>
        <rect x="26" y="29" width="8" height="3" rx="1" fill={jerseyColor} opacity="0.8" />
        <rect x="46" y="29" width="8" height="3" rx="1" fill={jerseyColor} opacity="0.8" />
        <rect x="26" y="33" width="8" height="3" rx="1" fill="#002868" opacity="0.8" />
        <rect x="46" y="33" width="8" height="3" rx="1" fill="#002868" opacity="0.8" />
      </>;
    default:
      return null;
  }
}

export default function Avatar({ config, size = 40 }: { config?: AvatarConfig | null; size?: number }) {
  const c = { ...DEFAULT_AVATAR, ...config };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Head shadow */}
      <ellipse cx="40" cy="29" rx="16" ry="16" fill="rgba(0,0,0,0.1)" />

      {/* Head */}
      <circle cx="40" cy="28" r="16" fill={c.skinTone} />

      {/* Ears */}
      <ellipse cx="24" cy="30" rx="3" ry="4" fill={c.skinTone} />
      <ellipse cx="56" cy="30" rx="3" ry="4" fill={c.skinTone} />
      <ellipse cx="24" cy="30" rx="2" ry="3" fill="rgba(0,0,0,0.05)" />
      <ellipse cx="56" cy="30" rx="2" ry="3" fill="rgba(0,0,0,0.05)" />

      {/* Hair (behind accessories) */}
      <HairPath style={c.hairStyle} color={c.hairColor} />

      {/* Eyebrows */}
      <path d="M30 26 Q33 24 36 26" stroke={c.hairColor} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M44 26 Q47 24 50 26" stroke={c.hairColor} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />

      {/* Eyes */}
      <ellipse cx="34" cy="30" rx="2.5" ry="2.5" fill="white" />
      <ellipse cx="46" cy="30" rx="2.5" ry="2.5" fill="white" />
      <circle cx="34" cy="30" r="1.5" fill="#1a1a1a" />
      <circle cx="46" cy="30" r="1.5" fill="#1a1a1a" />
      {/* Eye shine */}
      <circle cx="35" cy="29" r="0.6" fill="white" />
      <circle cx="47" cy="29" r="0.6" fill="white" />

      {/* Nose */}
      <path d="M39 32 Q40 34 41 32" stroke="rgba(0,0,0,0.15)" strokeWidth="1" fill="none" strokeLinecap="round" />

      {/* Mouth */}
      <path d="M35 37 Q40 41 45 37" stroke="#c0392b" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Beard */}
      <BeardOverlay type={c.beard} hairColor={c.hairColor} skinTone={c.skinTone} />

      {/* Accessory */}
      <AccessoryOverlay type={c.accessory} jerseyColor={c.jerseyColor} />

      {/* Neck */}
      <rect x="36" y="43" width="8" height="7" fill={c.skinTone} rx="2" />

      {/* Jersey body */}
      <path d="M22 50 L28 46 L37 48 L43 48 L52 46 L58 50 L58 74 Q58 76 56 76 L24 76 Q22 76 22 74 Z" fill={c.jerseyColor} />
      {/* Jersey collar */}
      <path d="M34 48 Q40 53 46 48" stroke="rgba(0,0,0,0.15)" strokeWidth="2" fill="none" />
      {/* Jersey V-neck detail */}
      <path d="M37 48 L40 52 L43 48" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />
      {/* Jersey sleeves */}
      <path d="M22 50 L12 58 L16 64 L28 56" fill={c.jerseyColor} />
      <path d="M58 50 L68 58 L64 64 L52 56" fill={c.jerseyColor} />
      {/* Sleeve cuffs */}
      <path d="M12 58 L16 64" stroke="rgba(0,0,0,0.1)" strokeWidth="2" />
      <path d="M68 58 L64 64" stroke="rgba(0,0,0,0.1)" strokeWidth="2" />
      {/* Jersey number area hint */}
      <circle cx="40" cy="64" r="6" fill="rgba(255,255,255,0.08)" />

      {/* Shorts */}
      <path d="M24 76 L56 76 L54 88 Q54 89 53 89 L42 89 L42 86 Q42 85 40 85 Q38 85 38 86 L38 89 L27 89 Q26 89 26 88 Z" fill="white" />
      {/* Shorts stripe */}
      <rect x="24" y="76" width="32" height="2" fill={c.jerseyColor} opacity="0.3" />

      {/* Legs */}
      <rect x="28" y="86" width="10" height="8" fill={c.skinTone} rx="2" />
      <rect x="42" y="86" width="10" height="8" fill={c.skinTone} rx="2" />

      {/* Socks */}
      <rect x="27" y="90" width="12" height="5" fill={c.jerseyColor} rx="1" />
      <rect x="41" y="90" width="12" height="5" fill={c.jerseyColor} rx="1" />
      {/* Sock stripe */}
      <rect x="27" y="92" width="12" height="1" fill="rgba(255,255,255,0.3)" rx="0.5" />
      <rect x="41" y="92" width="12" height="1" fill="rgba(255,255,255,0.3)" rx="0.5" />

      {/* Shoes */}
      <path d="M26 95 L39 95 Q40 95 40 96 L40 98 Q40 99 39 99 L26 99 Q25 99 25 98 L25 96 Q25 95 26 95Z" fill="#1a1a1a" />
      <path d="M41 95 L54 95 Q55 95 55 96 L55 98 Q55 99 54 99 L41 99 Q40 99 40 98 L40 96 Q40 95 41 95Z" fill="#1a1a1a" />
      {/* Shoe detail */}
      <rect x="26" y="95" width="13" height="1" fill="rgba(255,255,255,0.15)" rx="0.5" />
      <rect x="41" y="95" width="13" height="1" fill="rgba(255,255,255,0.15)" rx="0.5" />

      {/* Hands */}
      <circle cx="13" cy="64" r="3.5" fill={c.skinTone} />
      <circle cx="67" cy="64" r="3.5" fill={c.skinTone} />
    </svg>
  );
}
