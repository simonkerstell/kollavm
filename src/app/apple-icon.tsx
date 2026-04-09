import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 36,
          background: "#0a1628",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <span style={{ fontSize: 72, fontWeight: 900, color: "#f5c518", marginRight: -2 }}>K</span>
        <span style={{ fontSize: 72, fontWeight: 900, color: "#ffffff" }}>V</span>
      </div>
    ),
    { ...size }
  );
}
