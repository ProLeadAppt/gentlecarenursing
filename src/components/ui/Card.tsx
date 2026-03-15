import Link from "next/link";
import { cn } from "@/lib/utils";
import { CARD_VARIANTS } from "@/design-system/tokens";

type CardVariant = keyof typeof CARD_VARIANTS;

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  href?: string;
  variant?: CardVariant;
}

export function Card({
  className,
  children,
  href,
  variant = "default",
  ...props
}: CardProps) {
  const base = CARD_VARIANTS[variant];
  const combined = cn(base, href && "block cursor-pointer", className);

  if (href) {
    return (
      <Link href={href} className={combined}>
        {children}
      </Link>
    );
  }

  return (
    <div className={combined} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-xl font-semibold text-foreground leading-tight", className)}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("mt-2 text-base leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  );
}
