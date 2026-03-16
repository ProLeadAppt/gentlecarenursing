import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { FaqAccordion, type FaqItem } from "./FaqAccordion";
import { Button } from "@/components/ui/Button";

interface FaqPreviewProps {
  title?: string;
  subtitle?: string;
  items: readonly { id: string; question: string; answer: string }[];
  viewAllHref?: string;
  viewAllLabel?: string;
  /** Optional section background variant (used by homepage for alternation) */
  sectionVariant?: "default" | "muted" | "card" | "primary" | "accent" | "gradient" | "teal";
}

export function FaqPreview({
  title = "Common Questions",
  subtitle,
  items,
  viewAllHref = "/faq",
  viewAllLabel = "View all FAQs",
  sectionVariant = "muted",
}: FaqPreviewProps) {
  const faqItems: FaqItem[] = items.map((item) => ({
    id: item.id,
    question: item.question,
    answer: item.answer,
  }));

  return (
    <Section variant={sectionVariant} size="lg">
      <Container>
        <Reveal>
          <SectionHeader title={title} subtitle={subtitle} />
        </Reveal>
        <div className="mx-auto mt-12 max-w-2xl">
          <FaqAccordion items={faqItems} allowMultiple={false} />
          <div className="mt-8 flex justify-center">
            <Button href={viewAllHref} variant="outline" size="md">
              {viewAllLabel}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
