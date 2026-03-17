"use client";

import Image from "next/image";
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
      className="glass-morphism sticky top-0 z-50 w-full shadow-sm"
      role="banner"
    >
      <Container>
        <div className="flex h-16 items-center justify-between lg:h-20">
          <Link
            href="/"
            className="shrink-0 transition-opacity hover:opacity-80"
          >
            <Image
              src="/images/logo.png"
              alt={SITE.name}
              width={200}
              height={48}
              className="h-10 w-auto lg:h-12"
              priority
            />
          </Link>
          <Nav links={NAV_LINKS} cta={cta} />
        </div>
      </Container>
    </header>
  );
}
