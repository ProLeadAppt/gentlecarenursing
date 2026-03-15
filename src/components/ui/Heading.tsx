import { cn } from "@/lib/utils";
import { TYPOGRAPHY } from "@/design-system/tokens";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Visual level — maps to typography scale */
  level?: HeadingLevel;
  /** Override semantic element (e.g. level="h2" as="h3" for hierarchy) */
  as?: HeadingLevel;
  children: React.ReactNode;
  className?: string;
}

const levelStyles: Record<HeadingLevel, string> = {
  h1: TYPOGRAPHY.heading.h1,
  h2: TYPOGRAPHY.heading.h2,
  h3: TYPOGRAPHY.heading.h3,
  h4: TYPOGRAPHY.heading.h4,
  h5: TYPOGRAPHY.heading.h5,
};

export function Heading({
  level = "h2",
  as,
  children,
  className,
  ...props
}: HeadingProps) {
  const Component = as ?? level;
  const style = levelStyles[level];

  return (
    <Component
      className={cn(style, "text-foreground", className)}
      {...props}
    >
      {children}
    </Component>
  );
}
