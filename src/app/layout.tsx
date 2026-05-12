import type { Metadata, Viewport } from "next";
import { Source_Sans_3, DM_Sans, Cormorant_Garamond } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCta } from "@/components/layout/MobileCta";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { FormModalProvider } from "@/contexts/FormModalContext";
import { FormModal } from "@/components/ui/FormModal";
import { getLocalBusinessSchema, getWebsiteSchema, getOrganizationSchema } from "@/lib/schema";
import { ServiceWorkerRegister } from "@/components/pwa/ServiceWorkerRegister";
import { FloatingContact } from "@/components/ui/FloatingContact";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

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

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sourceSans.variable} ${dmSans.variable} ${cormorant.variable}`} suppressHydrationWarning>
      <head>
        {/* Google tag (gtag.js) */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-SZ2588QL1J" strategy="beforeInteractive" />
        <Script id="google-analytics" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-SZ2588QL1J');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              getOrganizationSchema(),
              getLocalBusinessSchema(),
              getWebsiteSchema(),
            ]),
          }}
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "wmn8hytn79");
            `,
          }}
        />
        {/*
          SearchAtlas OTTO dynamic-optimization loader. The data: src decodes to
          a tiny script that appends the real https://dashboard.searchatlas.com
          loader to <head>. The data: URI src and the dashboard.searchatlas.com
          load both need to be permitted by Content-Security-Policy (see
          netlify.toml) or OTTO will be blocked and silently fail to pick up
          the page.
        */}
        <script
          type="text/javascript"
          id="sa-dynamic-optimization"
          data-uuid="1ca3ea08-0eb4-40c3-9058-7ee1a1f845d9"
          src="data:text/javascript;base64,dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoInNjcmlwdCIpO3NjcmlwdC5zZXRBdHRyaWJ1dGUoIm5vd3Byb2NrZXQiLCAiIik7c2NyaXB0LnNldEF0dHJpYnV0ZSgibml0cm8tZXhjbHVkZSIsICIiKTtzY3JpcHQuc3JjID0gImh0dHBzOi8vZGFzaGJvYXJkLnNlYXJjaGF0bGFzLmNvbS9zY3JpcHRzL2R5bmFtaWNfb3B0aW1pemF0aW9uLmpzIjtzY3JpcHQuZGF0YXNldC51dWlkID0gIjFjYTNlYTA4LTBlYjQtNDBjMy05MDU4LTdlZTFhMWY4NDVkOSI7c2NyaXB0LmlkID0gInNhLWR5bmFtaWMtb3B0aW1pemF0aW9uLWxvYWRlciI7ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpOw=="
          {...{ nowprocket: "", "nitro-exclude": "" }}
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
