import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Shield, Clock, Users, FileCheck } from "lucide-react";

const CREDENTIALS = [
  {
    icon: Shield,
    title: "Registered NDIS provider",
    description: "We meet NDIS quality and safeguarding standards so participants and coordinators can refer with confidence.",
  },
  {
    icon: FileCheck,
    title: "DVA Contracted Community Nursing Provider",
    description: "Contracted to deliver DVA Community Nursing services for eligible Veteran Card holders at home.",
  },
  {
    icon: Clock,
    title: "Quick response window",
    description: "Every enquiry is acknowledged quickly. We aim to respond within 24 hours with clear next steps.",
  },
  {
    icon: Users,
    title: "Coordinators & discharge planners",
    description: "We work closely with support coordinators and hospital discharge teams for seamless referrals and handover.",
  },
] as const;

interface CredentialsSectionProps {
  /** Optional section background variant */
  variant?: "default" | "muted" | "card" | "teal";
  /** Show links to testimonials and FAQ */
  showLinks?: boolean;
}

export function CredentialsSection({
  variant = "muted",
  showLinks = true,
}: CredentialsSectionProps) {
  return (
    <Section variant={variant} size="md">
      <Container>
        <h2 className="text-center font-[family-name:var(--font-dm-sans)] text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Why trust Gentle Care Nursing
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-base text-muted-foreground">
          Credentials and commitments that matter to families, participants, and referral partners.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CREDENTIALS.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-xl border border-border/80 bg-card p-5 shadow-sm"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Icon className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <h3 className="mt-3 font-semibold text-foreground">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </div>
        {showLinks && (
          <p className="mt-8 text-center text-sm text-muted-foreground">
            <Link href="/areas" className="font-medium text-primary hover:underline">
              Areas we serve
            </Link>
            {" · "}
            <Link href="/#testimonials" className="font-medium text-primary hover:underline">
              What families say
            </Link>
            {" · "}
            <Link href="/faq" className="font-medium text-primary hover:underline">
              FAQ
            </Link>
          </p>
        )}
      </Container>
    </Section>
  );
}
