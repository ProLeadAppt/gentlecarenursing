import type { Metadata, Viewport } from "next";
import { Source_Sans_3, DM_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCta } from "@/components/layout/MobileCta";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { FormModalProvider } from "@/contexts/FormModalContext";
import { FormModal } from "@/components/ui/FormModal";
import { getLocalBusinessSchema, getWebsiteSchema } from "@/lib/schema";
import { FloatingContact } from "@/components/ui/FloatingContact";
import { QaControls } from "@/components/QaControls";

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
    index: false,
    follow: false,
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
          <QaControls />
        </FormModalProvider>
      </body>
    </html>
  );
}
