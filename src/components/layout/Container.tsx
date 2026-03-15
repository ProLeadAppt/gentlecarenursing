import { cn } from "@/lib/utils";
import { CONTAINER, CONTAINER_PADDING } from "@/design-system/tokens";

type ContainerSize = "sm" | "md" | "lg" | "full";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Max width — sm: 48rem, md: 64rem, lg: 72rem, full: 72rem */
  size?: ContainerSize;
  /** Semantic element override */
  as?: "div" | "main" | "article" | "section";
}

const sizeStyles: Record<ContainerSize, string> = {
  sm: CONTAINER.sm,
  md: CONTAINER.md,
  lg: CONTAINER.lg,
  full: CONTAINER.full,
};

export function Container({
  size = "full",
  as: Component = "div",
  className,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full",
        CONTAINER_PADDING,
        sizeStyles[size],
        className
      )}
      {...props}
    />
  );
}
