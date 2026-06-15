import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";
import { SITE } from "@/lib/constants";
import { AREAS_SERVED } from "@/content/areas-served";
import { Phone, Mail, MapPin, Facebook, Instagram, Star } from "lucide-react";

export interface FooterLink {
  href: string;
  label: string;
}

interface FooterProps {
  serviceLinks?: FooterLink[];
  infoLinks?: FooterLink[];
  regionLinks?: FooterLink[];
}

const defaultServiceLinks: FooterLink[] = [
  { href: "/ndis", label: "NDIS Nursing & Support" },
  { href: "/dva", label: "DVA Community Nursing" },
  { href: "/services/nursing-care", label: "Clinical Nursing" },
  { href: "/services/personal-care", label: "Personal Care & Daily Living" },
  { href: "/services/complex-care", label: "Complex Care Support" },
  { href: "/aged-care", label: "Aged Care at Home" },
  { href: "/private-nursing", label: "Private Clinical Care" },
];

function regionSlug(region: string): string {
  return region
    .toLowerCase()
    .replace(/\s*&\s*/g, " ")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

const defaultRegionLinks: FooterLink[] = AREAS_SERVED.map((a) => ({
  href: `/areas/${regionSlug(a.region)}`,
  label: a.region,
}));

const defaultInfoLinks: FooterLink[] = [
  { href: "/about", label: "Our Story" },
  { href: "/services", label: "Service Directory" },
  { href: "/contact", label: "Contact Us" },
  { href: "/referrers", label: "Referral Portal" },
  { href: "/faq", label: "Client FAQ" },
  { href: "/review", label: "Leave a Review" },
];

export function Footer({
  serviceLinks = defaultServiceLinks,
  infoLinks = defaultInfoLinks,
  regionLinks = defaultRegionLinks,
}: FooterProps) {
  return (
    <footer
      id="site-footer"
      className="relative bg-[#3D0A11] text-white/90 pt-20 pb-10 overflow-hidden"
      role="contentinfo"
    >
      {/* Cinematic Background Gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[40%] h-[40%] rounded-full bg-accent/5 blur-[100px]" />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 pb-12 border-b border-white/10">
          {/* Brand & Tagline */}
          <div className="space-y-6">
            <Link href="/" className="inline-block transition-transform hover:scale-105">
              <Image
                src="/images/logo.png"
                alt={SITE.name}
                width={200}
                height={50}
                sizes="200px"
                className="h-12 w-auto brightness-0 invert"
                loading="lazy"
              />
            </Link>
            <p className="text-base leading-relaxed text-white/70 max-w-sm">
              Personalised in-home nursing and support, delivered with calm,
              clear communication and a small, attentive care team.
            </p>

            {/* Social + Review */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/review"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-semibold text-white hover:bg-primary hover:border-primary transition-all"
              >
                <Star className="h-4 w-4 fill-accent text-accent" />
                Leave a review
              </Link>
              {SITE.social.facebook && (
                <a
                  href={SITE.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/60 transition-all hover:bg-primary hover:text-white hover:border-primary"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              )}
              {SITE.social.instagram && (
                <a
                  href={SITE.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/60 transition-all hover:bg-primary hover:text-white hover:border-primary"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Sitemap */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h2 className="text-[11px] font-bold uppercase tracking-[0.25em] text-accent mb-5">
                Care
              </h2>
              <ul className="space-y-3">
                {serviceLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-white/75 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-[11px] font-bold uppercase tracking-[0.25em] text-accent mb-5">
                Information
              </h2>
              <ul className="space-y-3">
                {infoLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-white/75 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Concierge Contact */}
          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.25em] text-accent mb-5">
              Get in touch
            </h2>
            <div className="space-y-5">
              <a href={SITE.phoneHref} className="flex items-start gap-3 group">
                <Phone className="h-4 w-4 mt-1 text-accent" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/60">
                    Phone
                  </p>
                  <p className="text-sm font-bold text-white group-hover:text-accent transition-colors">
                    {SITE.phone}
                  </p>
                </div>
              </a>

              <a href={`mailto:${SITE.email}`} className="flex items-start gap-3 group">
                <Mail className="h-4 w-4 mt-1 text-accent" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/60">
                    Email
                  </p>
                  <p className="text-sm font-bold text-white group-hover:text-accent transition-colors break-all">
                    {SITE.email}
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-1 text-accent" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/60">
                    Sydney Regional HQ
                  </p>
                  <p className="text-sm font-bold text-white">{SITE.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-medium tracking-wider uppercase text-white/55">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <span>© {new Date().getFullYear()} {SITE.name}</span>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>

          <span className="text-white/40">A family-run service</span>
        </div>
      </Container>
    </footer>
  );
}
