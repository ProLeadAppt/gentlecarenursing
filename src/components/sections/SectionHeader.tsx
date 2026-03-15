import { cn } from "@/lib/utils";
import { Heading } from "@/components/ui/Heading";
import { TYPOGRAPHY } from "@/design-system/tokens";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mx-auto max-w-2xl",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      <Heading level="h2" as="h2">
        {title}
      </Heading>
      {subtitle && (
        <p className={cn("mt-4", TYPOGRAPHY.lead)}>{subtitle}</p>
      )}
    </div>
  );
}
