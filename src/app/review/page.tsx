import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ReviewFunnel } from "@/components/review/ReviewFunnel";
import { INTEGRATIONS } from "@/config/integrations";

// /review is a private, noindex page — Gemma sends the link directly
// to clients she has worked with. It is NOT in the main nav, sitemap,
// or robots crawl surface.
export const metadata: Metadata = {
  title: "Share Your Experience",
  description:
    "Share your experience with Gentle Care Nursing Services. Your honest feedback helps us improve and helps other families find care that feels right.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  alternates: {
    canonical: `${INTEGRATIONS.siteUrl}/review`,
  },
};

export default function ReviewPage() {
  return (
    <main id="main-content" className="bg-background">
      <Section size="xl" variant="clinical-white">
        <Container size="md">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/80">
              Your Feedback
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-serif)] text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-foreground">
              Thank you for{" "}
              <span className="text-primary">choosing Gentle Care</span>
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Your honest feedback helps us improve — and helps other families
              find care that feels right.
            </p>
          </div>

          <div className="mt-12 sm:mt-16">
            <ReviewFunnel />
          </div>
        </Container>
      </Section>
    </main>
  );
}
