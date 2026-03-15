import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "./SectionHeader";
import { Button } from "@/components/ui/Button";
import { GHLWidgets } from "@/components/embeds/GHLWidgets";

interface AiAssistantSectionProps {
  title?: string;
  subtitle?: string;
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
  /** Primary CTA href — AI opens chat (embed-dependent); fallback to /referral */
  primaryCtaHref?: string;
  secondaryCtaHref?: string;
}

export function AiAssistantSection({
  title = "Questions? Our AI Assistant Can Help",
  subtitle = "Get instant answers about our services, eligibility, or how to get started.",
  primaryCtaLabel = "Speak With Our AI Assistant",
  secondaryCtaLabel = "Request Care",
  primaryCtaHref = "#ai-chat",
  secondaryCtaHref = "/referral",
}: AiAssistantSectionProps) {
  return (
    <Section variant="accent">
      <Container>
        <SectionHeader title={title} subtitle={subtitle} />
        <div className="mx-auto mt-10 flex max-w-xl flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button
            href={primaryCtaHref}
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto"
          >
            {primaryCtaLabel}
          </Button>
          <Button
            href={secondaryCtaHref}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            {secondaryCtaLabel}
          </Button>
        </div>
        <div id="ai-chat" className="mt-8">
          <GHLWidgets />
        </div>
      </Container>
    </Section>
  );
}
