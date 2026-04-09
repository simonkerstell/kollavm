import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 6,
          background: "#0a1628",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 900, color: "#f5c518", marginRight: -1 }}>K</span>
        <span style={{ fontSize: 13, fontWeight: 900, color: "#ffffff" }}>V</span>
      </div>
    ),
    { ...size }
  );
}
