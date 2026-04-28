import { ImageResponse } from "next/og";
import { getAreaContentBySlug } from "@/content/areas-content";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "In-home nursing across Sydney — Gentle Care Nursing Services";

export default async function AreaOgImage({ params }: { params: Promise<{ region: string }> }) {
  const { region: slug } = await params;
  const area = getAreaContentBySlug(slug);

  const regionName = area?.region ?? "Sydney";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #1e3a5f 0%, #2d5a8a 100%)",
          color: "white",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 26, opacity: 0.85, letterSpacing: "0.05em", fontWeight: 600 }}>
          GENTLE CARE NURSING
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 36, opacity: 0.85, marginBottom: 12 }}>In-home nursing in</div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              lineHeight: 1.05,
              maxWidth: "90%",
            }}
          >
            {regionName}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, opacity: 0.85 }}>
          <span>Registered NDIS & DVA provider</span>
          <span>gentlecarenursing.com.au</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
