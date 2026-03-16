import { Container } from "@/components/layout/Container";
import { TrustBadge } from "./TrustBadge";
import { cn } from "@/lib/utils";

export interface TrustItem {
  label: string;
  variant?: "default" | "trust" | "outline" | "solid";
}

const defaultTrustItems: TrustItem[] = [
  { label: "Registered NDIS Provider", variant: "trust" },
  { label: "Registered DVA Provider", variant: "trust" },
  { label: "In-Home Nursing & Care", variant: "default" },
  { label: "Personalised Support", variant: "default" },
];

interface TrustBarProps {
  items?: TrustItem[];
  /** Optional line below badges (e.g. response time promise) */
  responseTimeLine?: string;
  variant?: "default" | "muted";
  className?: string;
}

export function TrustBar({
  items = defaultTrustItems,
  responseTimeLine,
  variant = "default",
  className,
}: TrustBarProps) {
  return (
    <section
      className={cn(
        "border-y py-8",
        variant === "muted"
          ? "border-border/80 bg-accent/[0.04]"
          : "border-border bg-card/80",
        className
      )}
    >
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {items.map((item) => (
            <TrustBadge
              key={item.label}
              label={item.label}
              variant={item.variant ?? "default"}
            />
          ))}
        </div>
        {responseTimeLine && (
          <p className="mt-4 text-center text-sm text-muted-foreground">
            {responseTimeLine}
          </p>
        )}
      </Container>
    </section>
  );
}
