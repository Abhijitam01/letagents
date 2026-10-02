import { ImageResponse } from "next/og"

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = "image/png"

export function OgCard() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F5F4F0",
          color: "#111111",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 8 }}>LETAGENTS</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 88, lineHeight: 0.92, letterSpacing: -3 }}>
          <div style={{ display: "flex" }}>Let agents</div>
          <div style={{ display: "flex" }}>run the cloud.</div>
        </div>
      </div>
    ),
    { ...ogSize },
  )
}
