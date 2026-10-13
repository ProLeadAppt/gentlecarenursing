/**
 * One-off generator for static OG cards.
 * Run: npx tsx tools/generate-og-cards.tsx
 * Commits the PNGs in public/images/og/.
 *
 * This script is NOT wired into `npm run build`. Re-run only when copy/branding changes.
 */
import { ImageResponse } from "next/og";
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import sharp from "sharp";

let logoData: string;

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
          background: "#f8f4ef",
          color: "#3D0A11",
          padding: "64px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 28, opacity: 0.85 }}>
          {/* Existing site logo and established cream/burgundy palette; no invented mark. */}
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse embeds local PNG bytes */}
          <img src={logoData} width={400} height={98} alt="Gentle Care Nursing Services" />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.1, maxWidth: "85%" }}>
            {card.title}
          </div>
          <div style={{ fontSize: 28, marginTop: 16, opacity: 0.9, maxWidth: "85%" }}>
            {card.subtitle}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 22, opacity: 1 }}>
          <span>gentlecarenursing.com.au</span>
          <span>NDIS Registered · DVA Contracted</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

async function main() {
  // The existing logo.png contains WebP bytes. Normalise for ImageResponse,
  // preserving the approved artwork and leaving the source asset unchanged.
  const logoPng = await sharp(readFileSync(resolve(process.cwd(), "public/images/logo.png"))).png().toBuffer();
  logoData = `data:image/png;base64,${logoPng.toString("base64")}`;
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
