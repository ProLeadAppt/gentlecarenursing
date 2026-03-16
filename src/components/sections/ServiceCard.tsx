import { Card, CardTitle } from "@/components/ui/Card";
import { ArrowRight, HeartPulse } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ServiceCardProps {
  title: string;
  /** One-line benefit statement */
  benefit: string;
  /** Optional supporting description */
  description?: string;
  href: string;
  badge?: string;
  variant?: "default" | "elevated" | "bordered" | "muted" | "accent";
  className?: string;
}

export function ServiceCard({
  title,
  benefit,
  description,
  href,
  badge,
  variant = "elevated",
  className,
}: ServiceCardProps) {
  return (
    <Card
      href={href}
      variant={variant}
      className={cn(
        "group flex h-full flex-col rounded-2xl border border-border/60 bg-card/80 p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md sm:p-8",
        className
      )}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <HeartPulse className="h-6 w-6" aria-hidden="true" />
      </div>
      {badge && (
        <span className="mb-3 inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {badge}
        </span>
      )}
      <CardTitle className="text-xl">{title}</CardTitle>
      <p className="mt-3 text-base font-medium text-foreground">{benefit}</p>
      {description && (
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
      <div className="mt-auto pt-6">
        <div className="inline-flex items-center gap-1 rounded-full bg-primary/5 px-3 py-1.5 text-sm font-medium text-primary">
          Learn more
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Card>
  );
}
