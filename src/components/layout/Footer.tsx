import Link from "next/link";
import { Container } from "./Container";
import { Grid } from "./Grid";
import { FooterColumn } from "./FooterColumn";
import { CTA_LINKS, SITE } from "@/lib/constants";

export interface FooterLink {
  href: string;
  label: string;
}

interface FooterProps {
  serviceLinks?: FooterLink[];
  infoLinks?: FooterLink[];
}

const defaultServiceLinks: FooterLink[] = [
  { href: "/ndis", label: "NDIS Services" },
  { href: "/dva", label: "DVA & Community" },
  { href: "/aged-care", label: "Aged Care" },
  { href: "/private-nursing", label: "Private Care" },
];

const defaultInfoLinks: FooterLink[] = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
];

export function Footer({
  serviceLinks = defaultServiceLinks,
  infoLinks = defaultInfoLinks,
}: FooterProps) {
  return (
    <footer
      className="bg-[hsl(210,50%,14%)] text-white/90"
      role="contentinfo"
    >
      <Container>
        <Grid cols={4} gap="lg" className="py-14">
          <FooterColumn>
            <Link
              href="/"
              className="font-[family-name:var(--font-dm-sans)] text-xl font-bold text-white transition-colors hover:text-white/80"
            >
              {SITE.name}
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              {SITE.tagline}
            </p>
          </FooterColumn>

          <FooterColumn title="Services" links={serviceLinks} />
          <FooterColumn title="Information" links={infoLinks} />

          <FooterColumn title="Get in touch">
            <div className="flex flex-col gap-2.5">
              <Link
                href={CTA_LINKS.requestCare.href}
                className="text-sm font-medium text-accent-light transition-colors hover:text-white"
              >
                {CTA_LINKS.requestCare.label}
              </Link>
              <Link
                href={CTA_LINKS.contact.href}
                className="text-sm font-medium text-accent-light transition-colors hover:text-white"
              >
                {CTA_LINKS.contact.label}
              </Link>
            </div>
          </FooterColumn>
        </Grid>

        <div className="border-t border-white/10 py-6 text-center text-sm text-white/40">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
