import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

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
          We couldn&apos;t find this page
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

        <nav className="mt-12 max-w-2xl mx-auto" aria-labelledby="not-found-care-heading">
          <h2 id="not-found-care-heading" className="text-xl font-semibold text-foreground">
            Looking for care information?
          </h2>
          <p className="mt-3 text-muted-foreground">
            These links explain our home-based services. They may help you find a next step,
            even if the page you followed is no longer available.
          </p>
          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { href: "/dva", label: "DVA community nursing" },
              { href: "/private-nursing", label: "Private nursing and personal care" },
              { href: "/services/nursing-care", label: "Nursing care at home" },
              { href: "/aged-care", label: "In-home aged care" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="flex h-full items-center justify-between gap-3 rounded-xl border border-border/50 bg-white p-4 text-left text-sm font-medium text-primary transition-all hover:border-primary/30 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {label}
                  <ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="mt-8 text-sm text-muted-foreground">
          Need help finding information?{" "}
          <Link href="/contact" className="text-primary underline underline-offset-4">Contact us</Link>
          {" "}or read our{" "}
          <Link href="/faq" className="text-primary underline underline-offset-4">frequently asked questions</Link>.
        </p>
      </Container>
    </section>
  );
}
