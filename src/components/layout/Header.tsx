"use client";

import Link from "next/link";
import { Container } from "./Container";
import { Nav } from "./Nav";
import { NAV_LINKS, CTA_LINKS, SITE } from "@/lib/constants";

export interface HeaderLink {
  href: string;
  label: string;
}

export interface HeaderCta {
  href: string;
  label: string;
}

interface HeaderProps {
  /** Override nav links (default: NAV_LINKS) */
  links?: HeaderLink[];
  /** Override CTA (default: Request Care) */
  cta?: HeaderCta;
  /** Hide home from desktop nav */
  excludeHomeFromDesktop?: boolean;
}

export function Header({
  links = [...NAV_LINKS],
  cta = CTA_LINKS.requestCare,
  excludeHomeFromDesktop = true,
}: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80"
      role="banner"
    >
      <Container>
        <div className="flex h-16 items-center justify-between lg:h-20">
          <Link
            href="/"
            className="text-xl font-semibold text-foreground transition-colors hover:text-primary"
          >
            {SITE.name}
          </Link>
          <Nav
            links={links}
            cta={cta}
            excludeHomeFromDesktop={excludeHomeFromDesktop}
          />
        </div>
      </Container>
    </header>
  );
}
