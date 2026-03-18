import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";
import { Grid } from "./Grid";
import { FooterColumn } from "./FooterColumn";
import { CTA_LINKS, SITE } from "@/lib/constants";
import { Heading } from "@/components/ui/Heading";
import { ShieldCheck, BadgeCheck, Phone, MapPin, Mail, ChevronRight } from "lucide-react";

export interface FooterLink {
  href: string;
  label: string;
}

interface FooterProps {
  serviceLinks?: FooterLink[];
  infoLinks?: FooterLink[];
}

const defaultServiceLinks: FooterLink[] = [
  { href: "/ndis", label: "NDIS Nursing & Support" },
  { href: "/dva", label: "DVA Community Nursing" },
  { href: "/aged-care", label: "Boutique Aged Care" },
  { href: "/private-nursing", label: "Private Clinical Care" },
];

const defaultInfoLinks: FooterLink[] = [
  { href: "/about", label: "Our Story" },
  { href: "/services", label: "Service Directory" },
  { href: "/care-finder", label: "Care Finder Tool" },
  { href: "/referrers", label: "Referral Portal" },
  { href: "/faq", label: "Client FAQ" },
  { href: "/contact", label: "Contact Us" },
];

export function Footer({
  serviceLinks = defaultServiceLinks,
  infoLinks = defaultInfoLinks,
}: FooterProps) {
  return (
    <footer
      id="site-footer"
      className="relative bg-[#3D0A11] text-white/90 pt-24 pb-12 overflow-hidden"
      role="contentinfo"
    >
      {/* Cinematic Background Gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[40%] h-[40%] rounded-full bg-accent/5 blur-[100px]" />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 pb-16 border-b border-white/10">
          {/* Brand & Concierge Info */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="inline-block transition-transform hover:scale-105">
               <Image
                src="/images/logo.png"
                alt={SITE.name}
                width={200}
                height={50}
                className="h-12 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-lg leading-relaxed text-white/60 font-medium">
              A boutique nursing service dedicated to quality over volume. 
              Providing clinical excellence across Sydney since 2014.
            </p>
            
            <div className="flex gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-2xl">
                <ShieldCheck className="h-4 w-4 text-accent" />
                <span className="text-[10px] font-bold uppercase tracking-widest">NDIS Provider</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-2xl">
                <BadgeCheck className="h-4 w-4 text-accent" />
                <span className="text-[10px] font-bold uppercase tracking-widest">DVA Provider</span>
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-1" /> {/* Spacer */}
          
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent mb-8">Specialised Care</h4>
            <ul className="space-y-4">
              {serviceLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm font-medium hover:text-white transition-colors flex items-center group">
                    <ChevronRight className="h-3 w-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent mb-8">Information</h4>
            <ul className="space-y-4">
              {infoLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm font-medium hover:text-white transition-colors flex items-center group">
                    <ChevronRight className="h-3 w-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
             <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent mb-8">Concierge Contact</h4>
             <div className="space-y-6">
                <a href={SITE.phoneHref} className="flex items-center gap-4 group">
                  <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary transition-colors">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/40">Clinical Support</p>
                    <p className="text-sm font-bold">{SITE.phone}</p>
                  </div>
                </a>

                <a href={`mailto:${SITE.email}`} className="flex items-center gap-4 group">
                  <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary transition-colors">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/40">Email Enquiries</p>
                    <p className="text-sm font-bold">{SITE.email}</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 group">
                  <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/40">Sydney Regional HQ</p>
                    <p className="text-sm font-bold">{SITE.address}</p>
                  </div>
                </div>
             </div>
          </div>
        </div>

        {/* Legal & Attribution */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] font-medium tracking-widest uppercase text-white/30">
          <div className="flex items-center gap-6">
            <span>© {new Date().getFullYear()} {SITE.name}</span>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
          
          <div className="flex items-center gap-2">
            <span>Clinical infrastructure by</span>
            <a 
              href="https://munyal.com.au" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:text-white transition-all"
            >
              Munyal
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
