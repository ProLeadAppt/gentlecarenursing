import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  badge?: string;
  variant?: "default" | "elevated" | "bordered" | "muted" | "accent";
  className?: string;
}

export function ServiceCard({
  title,
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
        "group flex flex-col border-t-4 border-t-primary/20 hover:border-t-primary/60",
        className
      )}
    >
      {badge && (
        <span className="mb-3 inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {badge}
        </span>
      )}
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
      <div className="mt-auto flex items-center gap-1 pt-4 text-sm font-medium text-primary">
        Learn more
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Card>
  );
}
