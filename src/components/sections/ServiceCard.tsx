import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  /** Optional icon or badge */
  badge?: string;
  /** Card variant */
  variant?: "default" | "elevated" | "bordered" | "muted";
  className?: string;
}

/**
 * Standalone service card. Use ServiceCards for a grid of services.
 */
export function ServiceCard({
  title,
  description,
  href,
  badge,
  variant = "default",
  className,
}: ServiceCardProps) {
  return (
    <Card href={href} variant={variant} className={cn("flex flex-col", className)}>
      {badge && (
        <span className="mb-3 inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {badge}
        </span>
      )}
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </Card>
  );
}
