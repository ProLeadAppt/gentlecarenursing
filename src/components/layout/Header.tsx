"use client";

import Link from "next/link";
import { Container } from "./Container";
import { Nav } from "./Nav";
import { NAV_LINKS, CTA_LINKS, SITE } from "@/lib/constants";

interface HeaderProps {
  cta?: { href: string; label: string };
}

export function Header({ cta = CTA_LINKS.requestCare }: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border/60 bg-white/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/85"
      role="banner"
    >
      <Container>
        <div className="flex h-16 items-center justify-between lg:h-20">
          <Link
            href="/"
            className="font-[family-name:var(--font-dm-sans)] text-xl font-bold text-primary transition-colors hover:text-primary/80 lg:text-2xl"
          >
            {SITE.name}
          </Link>
          <Nav links={NAV_LINKS} cta={cta} />
        </div>
      </Container>
    </header>
  );
}
