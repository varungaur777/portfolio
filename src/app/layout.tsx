import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";
import { MotionProvider } from "@/components/Motion";
import { site } from "@/data/site";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s | Varun Gaur" },
  description: site.description,
  authors: [{ name: "Varun Gaur" }],
  keywords: ["AI video producer", "AI filmmaker", "creative technologist", "AI commercials", "Seedance", "Kling", "New Delhi"],
  openGraph: {
    type: "website",
    url: site.url,
    siteName: "Varun Gaur",
    title: site.title,
    description: site.description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Varun Gaur, AI films and commercials" }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/og.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#070708",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${serif.variable} ${mono.variable} ${sans.variable}`}>
      <body className="bg-ink font-sans text-bone antialiased">
        <noscript>
          <style>{`[data-cut]{display:none!important}[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <MotionProvider>
          {children}
          <Cursor />
        </MotionProvider>
      </body>
    </html>
  );
}
