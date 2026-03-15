import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "./SectionHeader";
import { Button } from "@/components/ui/Button";
import { GHLWidgets } from "@/components/embeds/GHLWidgets";
import { MessageCircle } from "lucide-react";

interface AiAssistantSectionProps {
  title?: string;
  subtitle?: string;
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
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
        <div className="mx-auto flex max-w-xl flex-col items-center text-center">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15">
            <MessageCircle className="h-7 w-7 text-accent" strokeWidth={1.5} />
          </div>
          <SectionHeader title={title} subtitle={subtitle} />
        </div>
        <div className="mx-auto mt-8 flex max-w-xl flex-col items-center gap-4 sm:flex-row sm:justify-center">
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
