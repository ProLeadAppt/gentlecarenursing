import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Home, Stethoscope, Phone, HelpCircle } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-accent/8 blur-[120px]" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[30%] h-[30%] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <Container size="md" className="relative z-10 py-24 text-center">
        {/* Large 404 */}
        <p className="font-[family-name:var(--font-serif)] text-[8rem] sm:text-[10rem] lg:text-[12rem] font-bold leading-none tracking-tight bg-gradient-to-br from-primary/20 via-accent/30 to-primary/10 bg-clip-text text-transparent select-none">
          404
        </p>

        <h1 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl font-bold text-foreground -mt-4">
          This page has wandered off
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-md mx-auto">
          We couldn&apos;t find what you were looking for. It may have been
          moved or no longer exists.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="primary" size="lg" href="/">
            Return Home
          </Button>
          <Button variant="outline" size="lg" href="/services">
            Browse Services
          </Button>
        </div>

        {/* Quick links */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {[
            { href: "/", label: "Home", icon: Home },
            { href: "/services", label: "Services", icon: Stethoscope },
            { href: "/contact", label: "Contact", icon: Phone },
            { href: "/faq", label: "FAQ", icon: HelpCircle },
          ].map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-2 rounded-xl border border-border/50 bg-white p-4 text-sm font-medium text-muted-foreground transition-all hover:border-primary/20 hover:text-primary hover:shadow-sm"
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
