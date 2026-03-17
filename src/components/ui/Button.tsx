import Link from "next/link";
import { cn } from "@/lib/utils";
import { BUTTON_VARIANTS, BUTTON_SIZES } from "@/design-system/tokens";

type ButtonVariant = keyof typeof BUTTON_VARIANTS;
type ButtonSize = keyof typeof BUTTON_SIZES;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  type?: "button" | "submit" | "reset";
}

export function Button({
  variant = "primary",
  size = "md",
  asChild,
  children,
  className,
  href,
  onClick,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  const combined = cn(
    base,
    BUTTON_VARIANTS[variant],
    BUTTON_SIZES[size],
    className
  );

  if (asChild && href) {
    return (
      <Link href={href} className={combined} onClick={onClick}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <Link href={href} className={combined} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={combined}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
