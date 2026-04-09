import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "KollaVM – Din guide till fotbolls-VM 2026";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a1628 0%, #0d1f3c 50%, #0a1628 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
          <span style={{ fontSize: 80, fontWeight: 900, color: "#f5c518" }}>Kolla</span>
          <span style={{ fontSize: 80, fontWeight: 900, color: "#ffffff" }}>VM</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "rgba(245, 197, 24, 0.1)",
            border: "2px solid rgba(245, 197, 24, 0.3)",
            borderRadius: 50,
            padding: "8px 24px",
            marginBottom: 32,
          }}
        >
          <span style={{ fontSize: 24, color: "#f5c518" }}>⚽ Fotbolls-VM 2026 · USA, Kanada & Mexiko</span>
        </div>
        <span style={{ fontSize: 36, color: "#9ca3af", textAlign: "center", maxWidth: 800 }}>
          Matchschema · Tippa · VM-guide · Restaurangtips
        </span>
      </div>
    ),
    { ...size }
  );
}
