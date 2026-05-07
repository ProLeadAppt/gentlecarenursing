import { ImageResponse } from "next/og";
import { getServiceRegionPage } from "@/content/service-regions";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Gentle Care Nursing Services. Personalised in-home care across Sydney.";

export default async function ServiceRegionOgImage({
  params,
}: {
  params: Promise<{ service: string; region: string }>;
}) {
  const { service, region } = await params;
  const page = getServiceRegionPage(service, region);

  const serviceTitle = page?.service.title ?? "In-Home Care";
  const regionName = page?.region.region ?? "Sydney";

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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 26,
            opacity: 0.85,
            letterSpacing: "0.05em",
            fontWeight: 600,
          }}
        >
          GENTLE CARE NURSING
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 36, opacity: 0.85, marginBottom: 12 }}>
            {serviceTitle} in
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              lineHeight: 1.05,
              maxWidth: "92%",
            }}
          >
            {regionName}, Sydney
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            opacity: 0.85,
          }}
        >
          <span>Registered NDIS & DVA Contracted</span>
          <span>gentlecarenursing.com.au</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
