import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import FloatingNav from "@/components/FloatingNav";
import { ThemeProvider } from "@/components/ThemeProvider";
import Clock from "@/components/Clock";

// Preload Google Font Outfit for fast, layout-shift-free loading
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "800"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Varun Gaur | AI Video Creator & Visual Storyteller",
  description: "Portfolio of Varun Gaur — AI Video Creator, Visual Storyteller, and Creative Designer specializing in cinematic AI content, commercials, and visual campaigns.",
  keywords: ["AI Video Creator", "Visual Storyteller", "Creative Designer", "Kling AI", "Cinematic AI", "Brand Campaigns"],
  authors: [{ name: "Varun Gaur" }],
  openGraph: {
    title: "Varun Gaur | AI Video Creator",
    description: "Portfolio of Varun Gaur — AI Video Creator, Visual Storyteller, and Creative Designer.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${outfit.variable} font-sans bg-obsidian text-foreground antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {/* Global Cinematic Elements */}
          <div className="noise-overlay" />
          
          <SmoothScroll>
            <FloatingNav />
            <main className="relative z-10 w-full min-h-screen px-4 md:px-8 max-w-6xl mx-auto pt-24 pb-16">
              {children}
            </main>
          </SmoothScroll>
          <Clock />
        </ThemeProvider>
      </body>
    </html>
  );
}
