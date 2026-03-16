import type { Metadata, Viewport } from "next";
import { Source_Sans_3, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCta } from "@/components/layout/MobileCta";
import { FormModalProvider } from "@/contexts/FormModalContext";
import { FormModal } from "@/components/ui/FormModal";
import { getLocalBusinessSchema, getWebsiteSchema } from "@/lib/schema";

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gentlecarenursing.com.au";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Gentle Care Nursing | In-Home Nursing & Care Services",
    template: "%s | Gentle Care Nursing",
  },
  description:
    "Personalised in-home nursing and care services. Registered NDIS and DVA provider. Trusted by families, support coordinators, and healthcare professionals.",
  keywords: [
    "NDIS nursing",
    "in-home care",
    "community nursing",
    "aged care",
    "DVA care",
    "personal care",
    "in-home nursing",
    "registered NDIS provider",
    "DVA provider",
  ],
  authors: [{ name: "Gentle Care Nursing" }],
  openGraph: {
    type: "website",
    siteName: "Gentle Care Nursing",
    locale: "en_AU",
    images: [{ url: "/images/hero-hands.webp", width: 1200, height: 630, alt: "Gentle Care Nursing. In-home nursing and care" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/hero-hands.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1e3a5f",
};

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sourceSans.variable} ${dmSans.variable}`}>
      <head>
        <link rel="preload" href="/images/hero-hands.webp" as="image" />
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
      <body className="min-h-screen flex flex-col antialiased">
        <FormModalProvider>
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-16 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg transition focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <MobileCta />
        <FormModal />

        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        )}
        </FormModalProvider>
      </body>
    </html>
  );
}
