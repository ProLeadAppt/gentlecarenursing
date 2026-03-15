import Link from "next/link";
import { cn } from "@/lib/utils";

export interface FooterLink {
  href: string;
  label: string;
}

interface FooterColumnProps {
  title?: string;
  links?: FooterLink[];
  /** Custom content instead of links */
  children?: React.ReactNode;
  className?: string;
}

export function FooterColumn({
  title,
  links,
  children,
  className,
}: FooterColumnProps) {
  return (
    <div className={cn("", className)}>
      {title && (
        <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
          {title}
        </h3>
      )}
      {links ? (
        <ul className={cn("space-y-2", title && "mt-4")}>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className={cn(title && "mt-4")}>{children}</div>
      )}
    </div>
  );
}
