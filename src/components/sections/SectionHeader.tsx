import { cn } from "@/lib/utils";
import { Heading } from "@/components/ui/Heading";
import { TYPOGRAPHY } from "@/design-system/tokens";

type SectionHeaderSize = "sm" | "md" | "lg";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  /** Visual scale: lg for above-fold / key differentiator sections */
  size?: SectionHeaderSize;
  align?: "left" | "center";
  className?: string;
}

const titleSizeClasses: Record<SectionHeaderSize, string> = {
  sm: "text-2xl font-bold sm:text-3xl",
  md: "font-[family-name:var(--font-dm-sans)] text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem]",
  lg: "font-[family-name:var(--font-dm-sans)] text-3xl font-bold tracking-tight sm:text-5xl lg:text-[3rem]",
};

const subtitleSizeClasses: Record<SectionHeaderSize, string> = {
  sm: "text-base sm:text-lg leading-relaxed text-muted-foreground font-medium",
  md: TYPOGRAPHY.lead,
  lg: "text-lg sm:text-xl leading-relaxed text-muted-foreground font-medium",
};

export function SectionHeader({
  title,
  subtitle,
  size = "md",
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
      <Heading level="h2" as="h2" className={cn("text-foreground", titleSizeClasses[size])}>
        {title}
      </Heading>
      {subtitle && (
        <p className={cn("mt-4 max-w-2xl", align === "center" ? "mx-auto" : "", subtitleSizeClasses[size])}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
