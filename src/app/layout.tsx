import type { Metadata, Viewport } from "next";
import { Source_Sans_3, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
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
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />

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
      </body>
    </html>
  );
}
