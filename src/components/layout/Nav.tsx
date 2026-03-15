"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavLink {
  href: string;
  label: string;
}

interface NavProps {
  links: NavLink[];
  cta?: { href: string; label: string };
  excludeHomeFromDesktop?: boolean;
  className?: string;
}

export function Nav({
  links,
  cta,
  excludeHomeFromDesktop = true,
  className,
}: NavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const desktopLinks = excludeHomeFromDesktop
    ? links.filter((l) => l.href !== "/")
    : links;

  return (
    <div className={cn("flex flex-1 flex-col lg:flex-row lg:items-center", className)}>
      {/* Desktop */}
      <nav
        className="hidden items-center gap-7 lg:flex"
        aria-label="Main navigation"
      >
        {desktopLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary"
          >
            {link.label}
          </Link>
        ))}
        {cta && (
          <Button href={cta.href} size="sm" variant="secondary">
            {cta.label}
          </Button>
        )}
      </nav>

      {/* Mobile toggle */}
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground/70 transition-colors hover:bg-muted lg:hidden"
        aria-expanded={mobileOpen}
        aria-controls="mobile-nav"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <span className="sr-only">Toggle menu</span>
        {mobileOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Mobile panel */}
      <div
        id="mobile-nav"
        className={cn(
          "overflow-hidden transition-all duration-200 lg:hidden",
          mobileOpen ? "max-h-[80vh] pb-6" : "max-h-0"
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="flex flex-col gap-1 pt-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-muted"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {cta && (
            <Button
              href={cta.href}
              size="md"
              className="mt-3 w-full"
              onClick={() => setMobileOpen(false)}
            >
              {cta.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
