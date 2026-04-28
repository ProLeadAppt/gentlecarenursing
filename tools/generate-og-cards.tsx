/**
 * One-off generator for static OG cards.
 * Run: npx tsx tools/generate-og-cards.tsx
 * Commits the PNGs in public/images/og/.
 *
 * This script is NOT wired into `npm run build`. Re-run only when copy/branding changes.
 */
import { ImageResponse } from "next/og";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";

const OUT_DIR = resolve(process.cwd(), "public", "images", "og");

interface CardConfig {
  output: string;
  title: string;
  subtitle: string;
}

const CARDS: CardConfig[] = [
  { output: "default.png",         title: "Gentle Care Nursing Services",           subtitle: "In-home nursing & care across Sydney" },
  { output: "home.png",            title: "Personalised In-Home Nursing & Care",    subtitle: "Trusted across Sydney" },
  { output: "ndis.png",            title: "NDIS Nursing & Care",                     subtitle: "Registered NDIS provider" },
  { output: "dva.png",             title: "DVA & Community Nursing",                 subtitle: "DVA Contracted Community Nursing Provider" },
  { output: "aged-care.png",       title: "Aged Care at Home",                       subtitle: "Support at Home, CHSP, DVA, and private support" },
  { output: "private-nursing.png", title: "Private Nursing & Personal Care",         subtitle: "One-off or ongoing support, your way" },
  { output: "services.png",        title: "In-Home Services",                        subtitle: "Nursing, personal care, complex care, and more" },
  { output: "referrers.png",       title: "For Referrers",                           subtitle: "Fast, reliable care referrals for your clients" },
];

function renderCard(card: CardConfig) {
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
        <div style={{ display: "flex", alignItems: "center", fontSize: 28, opacity: 0.85 }}>
          <span style={{ fontWeight: 600, letterSpacing: "0.05em" }}>GENTLE CARE NURSING</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.1, maxWidth: "85%" }}>
            {card.title}
          </div>
          <div style={{ fontSize: 32, marginTop: 24, opacity: 0.9, maxWidth: "85%" }}>
            {card.subtitle}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24, opacity: 0.8 }}>
          <span>gentlecarenursing.com.au</span>
          <span>NDIS Registered · DVA Contracted</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  for (const card of CARDS) {
    const response = renderCard(card);
    const buffer = Buffer.from(await response.arrayBuffer());
    const outPath = resolve(OUT_DIR, card.output);
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, buffer);
    console.log(`✓ ${card.output}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
