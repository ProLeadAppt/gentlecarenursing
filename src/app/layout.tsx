import type { Metadata, Viewport } from "next";
import "./fonts.css";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCta } from "@/components/layout/MobileCta";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { FormModalProvider } from "@/contexts/FormModalContext";
import { FormModal } from "@/components/ui/FormModal";
import { getLocalBusinessSchema, getWebsiteSchema } from "@/lib/schema";
import { ServiceWorkerRegister } from "@/components/pwa/ServiceWorkerRegister";
import { FloatingContact } from "@/components/ui/FloatingContact";
import { INTEGRATIONS } from "@/config/integrations";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gentlecarenursing.com.au";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // Title template uses the full entity name "Gentle Care Nursing Services".
  // This is the canonical brand suffix Google and AI engines use to
  // disambiguate the entity. Don't shorten to "Gentle Care" — that loses
  // the "Nursing Services" entity-defining keyword pair sitewide.
  title: {
    default: "Gentle Care Nursing Services | In-Home Nursing & Care",
    template: "%s | Gentle Care Nursing Services",
  },
  description:
    "Personalised in-home nursing and care services. Registered NDIS provider and DVA Contracted Community Nursing Provider. Trusted by families, support coordinators, and healthcare professionals.",
  authors: [{ name: "Gentle Care Nursing Services" }],
  openGraph: {
    type: "website",
    siteName: "Gentle Care Nursing Services",
    locale: "en_AU",
    images: [{ url: "/images/og/default.png", width: 1200, height: 630, alt: "Gentle Care Nursing Services. In-home nursing and care" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/og/default.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.webmanifest",
  applicationName: "Gentle Care Nursing Services",
  appleWebApp: {
    capable: true,
    title: "Gentle Care",
    statusBarStyle: "default",
  },
  icons: {
    // Gentle Care heart-handshake mark, served as proper PNGs at common
    // browser sizes plus the existing webp/jpg as fallbacks. This replaces
    // the previous "GC NURSING" placeholder set.
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/images/gentle%20care%20nursing%20favicon.webp", type: "image/webp" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#3D0A11",
};

const gaId = INTEGRATIONS.analytics.gaId;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className="font-source-sans font-dm-sans font-cormorant" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/fonts/13971731025ec697-s.p.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/692df4da22e71021-s.p.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/7b89a4fd5e90ede0-s.p.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        {/* Google tag (gtag.js) */}
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        ) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              getLocalBusinessSchema(),
              getWebsiteSchema(),
            ]),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased" suppressHydrationWarning>
        <FormModalProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            Skip to main content
          </a>
          <Header />
          <main id="main-content" className="flex-1" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <MobileCta />
          <ScrollToTop />
          <FormModal />
          <FloatingContact />
          <ServiceWorkerRegister />
        </FormModalProvider>
      </body>
    </html>
  );
}
