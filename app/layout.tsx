import type { Metadata } from "next";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://hoanganhluong.dev";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hoang Anh Luong - Front-end Developer",
    template: "%s | HAL",
  },
  description:
    "Front-end developer building Next.js apps, design systems, and the web's quieter corners. App Router, Server Components, and the modern React stack.",
  keywords: [
    "front-end developer",
    "Next.js",
    "React",
    "TypeScript",
    "design systems",
    "UI engineer",
    "Ho Chi Minh City",
  ],
  authors: [{ name: "Hoang Anh Luong", url: SITE_URL }],
  creator: "Hoang Anh Luong",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Hoang Anh Luong",
    title: "Hoang Anh Luong - Front-end Developer",
    description:
      "Front-end developer building Next.js apps, design systems, and the web's quieter corners.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hoang Anh Luong - Front-end Developer",
    description:
      "Front-end developer building Next.js apps, design systems, and the web's quieter corners.",
    creator: "@hal_dev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: SITE_URL },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* No-FOUC theme bootstrap - reads localStorage before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t='dark';try{t=localStorage.getItem('hal-theme')||(window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');}catch(e){}document.documentElement.setAttribute('data-theme',t);var a=function(){if(document.body)document.body.setAttribute('data-theme',t);};a();if(!document.body)document.addEventListener('DOMContentLoaded',a);})();`,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
        {children}
      </body>

      {/* Vercel analytic tools */}
      <SpeedInsights />
      <Analytics />
    </html>
  );
}
