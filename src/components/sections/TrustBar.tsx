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
  /** Section variant */
  variant?: "default" | "muted";
  className?: string;
}

export function TrustBar({
  items = defaultTrustItems,
  variant = "default",
  className,
}: TrustBarProps) {
  return (
    <section
      className={cn(
        "border-y border-border py-6",
        variant === "muted" ? "bg-muted/30" : "bg-card/50",
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
      </Container>
    </section>
  );
}
