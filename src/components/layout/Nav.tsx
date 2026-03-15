"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/constants";
import type { NavItem } from "@/types";

interface NavProps {
  links: readonly NavItem[];
  cta?: { href: string; label: string };
  className?: string;
}

function DesktopDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  function handleEnter() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  }

  function handleLeave() {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        type="button"
        className="inline-flex items-center gap-1 text-sm font-medium text-foreground/70 transition-colors hover:text-primary"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        onFocus={handleEnter}
      >
        {item.label}
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-150",
            open && "rotate-180"
          )}
        />
      </button>

      <div
        className={cn(
          "absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 transition-all duration-150",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        )}
        onFocus={handleEnter}
        onBlur={(e) => {
          if (!containerRef.current?.contains(e.relatedTarget as Node)) {
            setOpen(false);
          }
        }}
      >
        <div className="w-56 overflow-hidden rounded-xl border border-border/60 bg-white p-2 shadow-lg">
          {item.children?.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="block rounded-lg px-3.5 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-primary/5 hover:text-primary"
              onClick={() => setOpen(false)}
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Nav({ links, cta, className }: NavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  return (
    <div className={cn("flex items-center", className)}>
      {/* Desktop nav */}
      <nav
        className="hidden items-center gap-8 lg:flex"
        aria-label="Main navigation"
      >
        {links.map((item) =>
          item.children ? (
            <DesktopDropdown key={item.href} item={item} />
          ) : (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          )
        )}
      </nav>

      {/* Desktop right side: phone + CTA */}
      <div className="ml-8 hidden items-center gap-4 lg:flex">
        {SITE.phone && (
          <a
            href={`tel:${SITE.phone.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/70 transition-colors hover:text-primary"
          >
            <Phone className="h-4 w-4" />
            {SITE.phone}
          </a>
        )}
        {cta && (
          <Button href={cta.href} size="sm" variant="secondary">
            {cta.label}
          </Button>
        )}
      </div>

      {/* Mobile toggle */}
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground/70 transition-colors hover:bg-muted lg:hidden"
        aria-expanded={mobileOpen}
        aria-controls="mobile-nav"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <span className="sr-only">Toggle menu</span>
        {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile panel */}
      <div
        id="mobile-nav"
        className={cn(
          "fixed inset-x-0 top-[64px] z-40 overflow-y-auto border-t border-border/40 bg-white transition-all duration-200 lg:hidden",
          mobileOpen
            ? "max-h-[calc(100vh-64px)] opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="mx-auto max-w-[72rem] px-4 py-4 sm:px-6">
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {links.map((item) =>
              item.children ? (
                <div key={item.href}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted"
                    aria-expanded={mobileServicesOpen}
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-muted-foreground transition-transform duration-150",
                        mobileServicesOpen && "rotate-180"
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-200",
                      mobileServicesOpen ? "max-h-96" : "max-h-0"
                    )}
                  >
                    <div className="ml-3 border-l-2 border-primary/10 pl-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/70 transition-colors hover:bg-muted hover:text-primary"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="mt-4 border-t border-border/40 pt-4">
            {SITE.phone && (
              <a
                href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                className="mb-3 flex items-center gap-2 rounded-lg px-3 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-muted"
                onClick={() => setMobileOpen(false)}
              >
                <Phone className="h-5 w-5 text-primary" />
                {SITE.phone}
              </a>
            )}
            {cta && (
              <Button
                href={cta.href}
                size="md"
                className="w-full"
                onClick={() => setMobileOpen(false)}
              >
                {cta.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
