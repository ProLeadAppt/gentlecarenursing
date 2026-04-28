import { ImageResponse } from "next/og";
import { getBlogPostBySlug } from "@/content/blog";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Gentle Care Nursing Services blog post";

export default async function BlogOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  const title = post?.title ?? "Gentle Care Nursing Services";
  const category = post?.category ?? "";
  const author = post?.author?.name ?? "";

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
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 26, opacity: 0.85, letterSpacing: "0.05em", fontWeight: 600 }}>
          GENTLE CARE NURSING
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {category && (
            <div
              style={{
                display: "inline-flex",
                alignSelf: "flex-start",
                fontSize: 22,
                padding: "8px 20px",
                background: "rgba(255,255,255,0.15)",
                borderRadius: "999px",
                marginBottom: 24,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              {category}
            </div>
          )}
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.15,
              maxWidth: "90%",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, opacity: 0.85 }}>
          <span>{author}</span>
          <span>gentlecarenursing.com.au</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
