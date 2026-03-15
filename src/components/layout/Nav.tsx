"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export interface NavLink {
  href: string;
  label: string;
}

interface NavProps {
  links: NavLink[];
  cta?: { href: string; label: string };
  /** Hide home link from desktop nav (often in logo) */
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
        className="hidden items-center gap-8 lg:flex"
        aria-label="Main navigation"
      >
        {desktopLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {link.label}
          </Link>
        ))}
        {cta && (
          <Button href={cta.href} size="sm">
            {cta.label}
          </Button>
        )}
      </nav>

      {/* Mobile toggle */}
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg lg:hidden"
        aria-expanded={mobileOpen}
        aria-controls="mobile-nav"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <span className="sr-only">Toggle menu</span>
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          {mobileOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
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
        <div className="flex flex-col gap-4 pt-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base font-medium text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {cta && (
            <Button
              href={cta.href}
              size="md"
              className="mt-2 w-full"
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
