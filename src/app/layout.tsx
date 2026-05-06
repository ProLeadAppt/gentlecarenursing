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
  title: {
    default: "Gentle Care Nursing Services | In-Home Nursing & Care",
    template: "%s | Gentle Care Nursing Services",
  },
  description:
    "Personalised in-home nursing and care services. Registered NDIS provider and DVA Contracted Community Nursing Provider. Trusted by families, support coordinators, and healthcare professionals.",
  keywords: [
    "NDIS nursing",
    "in-home care",
    "community nursing",
    "aged care",
    "DVA care",
    "personal care",
    "in-home nursing",
    "registered NDIS provider",
    "DVA contracted community nursing",
  ],
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
    icon: "/images/gentle%20care%20nursing%20favicon.jpg",
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
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-SZ2588QL1J"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-SZ2588QL1J');
            `,
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
