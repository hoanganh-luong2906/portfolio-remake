import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Hoang Anh Luong — Front-end Developer",
  description:
    "Front-end developer building Next.js apps, design systems, and the web's quieter corners.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* No-FOUC theme bootstrap — reads localStorage before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t='dark';try{t=localStorage.getItem('hal-theme')||(window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');}catch(e){}document.documentElement.setAttribute('data-theme',t);var a=function(){if(document.body)document.body.setAttribute('data-theme',t);};a();if(!document.body)document.addEventListener('DOMContentLoaded',a);})();`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
