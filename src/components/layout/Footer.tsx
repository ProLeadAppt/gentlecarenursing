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
      className="border-t border-border bg-card"
      role="contentinfo"
    >
      <Container>
        <Grid cols={4} gap="lg" className="py-12">
          <FooterColumn>
            <Link
              href="/"
              className="text-lg font-semibold text-foreground transition-colors hover:text-primary"
            >
              {SITE.name}
            </Link>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {SITE.tagline}
            </p>
          </FooterColumn>

          <FooterColumn title="Services" links={serviceLinks} />
          <FooterColumn title="Information" links={infoLinks} />

          <FooterColumn title="Get in touch">
            <div className="flex flex-col gap-2">
              <Link
                href={CTA_LINKS.requestCare.href}
                className="text-sm font-medium text-primary transition-colors hover:underline"
              >
                {CTA_LINKS.requestCare.label}
              </Link>
              <Link
                href={CTA_LINKS.contact.href}
                className="text-sm font-medium text-primary transition-colors hover:underline"
              >
                {CTA_LINKS.contact.label}
              </Link>
            </div>
          </FooterColumn>
        </Grid>

        <div className="border-t border-border py-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
