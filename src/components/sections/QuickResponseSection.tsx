import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { GHLWidgets } from "@/components/embeds/GHLWidgets";
import { Phone, MessageCircle, HelpCircle } from "lucide-react";

const DEFAULT_BENEFITS = [
  { icon: Phone, text: "You'll hear from us within 24 hours" },
  { icon: MessageCircle, text: "Immediate confirmation when you enquire" },
  { icon: HelpCircle, text: "Clear next steps. No waiting in the dark." },
] as const;

export interface QuickResponseSectionProps {
  title?: string;
  subtitle?: string;
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaHref?: string;
  /** Benefit bullets (default: response time, confirmation, next steps) */
  benefits?: readonly string[];
  /** Short line above chat/voice widgets, e.g. optional voice assistant for immediate help */
  voiceAssistantLine?: string;
}

export function QuickResponseSection({
  title = "Get Help Quickly. You're Not Left Waiting.",
  subtitle = "When you reach out, our team is notified straight away. You'll get a personal response within 24 hours, with clear next steps and supportive guidance. No runaround.",
  primaryCtaLabel = "Request Care",
  secondaryCtaLabel = "Contact Us",
  primaryCtaHref = "/referral",
  secondaryCtaHref = "/contact",
  benefits,
  voiceAssistantLine = "Need guidance right now? Use our voice assistant below for immediate help.",
}: QuickResponseSectionProps) {
  const bullets = benefits?.length
    ? benefits.map((text, i) => ({ icon: [Phone, MessageCircle, HelpCircle][i % 3], text }))
    : DEFAULT_BENEFITS;

  return (
    <Section variant="accent">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <h2 className="font-[family-name:var(--font-dm-sans)] text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {subtitle}
              </p>
            )}
            <ul className="mt-6 space-y-3">
              {bullets.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/15">
                    <Icon className="h-4 w-4 text-accent" strokeWidth={1.5} />
                  </span>
                  <span className="font-medium text-foreground">{text}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button href={primaryCtaHref} variant="secondary" size="lg" className="w-full sm:w-auto">
                {primaryCtaLabel}
              </Button>
              <Button href={secondaryCtaHref} variant="outline" size="lg" className="w-full sm:w-auto">
                {secondaryCtaLabel}
              </Button>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-accent/10 blur-2xl" aria-hidden />
              <div className="relative flex h-48 w-64 flex-col justify-end rounded-2xl border border-accent/20 bg-card/80 p-4 shadow-lg backdrop-blur-sm sm:h-52 sm:w-72">
                <div className="space-y-3">
                  <div className="ml-0 mr-8 rounded-2xl rounded-tl-sm bg-muted px-3 py-2 text-sm text-muted-foreground">
                    What happens after I submit?
                  </div>
                  <div className="ml-8 mr-0 rounded-2xl rounded-tr-sm bg-accent/15 px-3 py-2 text-sm text-foreground">
                    We confirm straight away and get back to you within 24 hours.
                  </div>
                  <div className="ml-0 mr-8 rounded-2xl rounded-tl-sm bg-muted px-3 py-2 text-sm text-muted-foreground">
                    Who will I speak to?
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 rounded-full border border-accent/20 bg-background/80 px-3 py-2">
                  <MessageCircle className="h-5 w-5 shrink-0 text-accent" strokeWidth={1.5} />
                  <span className="text-xs font-medium text-muted-foreground">Clear next steps, every time</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="quick-help" className="mt-12">
          {voiceAssistantLine && (
            <p className="mb-4 text-center text-sm text-muted-foreground">{voiceAssistantLine}</p>
          )}
          <GHLWidgets />
        </div>
      </Container>
    </Section>
  );
}
