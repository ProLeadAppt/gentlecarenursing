/**
 * One-off generator for PWA icons.
 * Run: npx tsx tools/generate-pwa-icons.tsx
 *
 * Outputs to public/icons/. Renders the "GCN" monogram on the brand maroon
 * background. Standard sizes for Web App Manifest plus maskable variants
 * with safe-zone padding (per W3C maskable spec).
 *
 * Not wired into the build. Re-run only when icon design changes.
 */
import { ImageResponse } from "next/og";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const OUT_DIR = resolve(process.cwd(), "public", "icons");
const BRAND_BG = "#3D0A11";
const TEXT_COLOR = "#ffffff";
const ACCENT = "#c4704b";

interface IconConfig {
  output: string;
  size: number;
  /** Maskable safe-zone padding (W3C: minimum 10% on each side; we use 12%). */
  maskable?: boolean;
}

const ICONS: IconConfig[] = [
  { output: "icon-192.png", size: 192 },
  { output: "icon-512.png", size: 512 },
  { output: "icon-maskable-192.png", size: 192, maskable: true },
  { output: "icon-maskable-512.png", size: 512, maskable: true },
  { output: "apple-touch-icon.png", size: 180 },
];

function renderIcon(cfg: IconConfig) {
  const padding = cfg.maskable ? cfg.size * 0.12 : 0;
  const innerSize = cfg.size - padding * 2;
  const fontSize = innerSize * 0.42;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: BRAND_BG,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: innerSize,
            height: innerSize,
            color: TEXT_COLOR,
            fontFamily: "serif",
            lineHeight: 1,
          }}
        >
          <div
            style={{
              fontSize: fontSize,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              fontStyle: "italic",
            }}
          >
            GC
          </div>
          <div
            style={{
              fontSize: fontSize * 0.18,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginTop: fontSize * 0.15,
              color: ACCENT,
            }}
          >
            Nursing
          </div>
        </div>
      </div>
    ),
    { width: cfg.size, height: cfg.size }
  );
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  for (const cfg of ICONS) {
    const response = renderIcon(cfg);
    const buffer = Buffer.from(await response.arrayBuffer());
    const outPath = resolve(OUT_DIR, cfg.output);
    writeFileSync(outPath, buffer);
    console.log(`✓ ${cfg.output} (${cfg.size}x${cfg.size}${cfg.maskable ? ", maskable" : ""})`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
