import Link from "next/link";
import { cn } from "@/lib/utils";

export interface FooterLink {
  href: string;
  label: string;
}

interface FooterColumnProps {
  title?: string;
  links?: FooterLink[];
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
        <h3 className="font-[family-name:var(--font-dm-sans)] text-sm font-semibold uppercase tracking-wider text-white/50">
          {title}
        </h3>
      )}
      {links ? (
        <ul className={cn("space-y-2.5", title && "mt-4")}>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-white/60 transition-colors hover:text-white"
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
