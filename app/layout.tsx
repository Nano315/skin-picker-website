import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Background from "@/components/layout/Background";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Skin Picker — Auto-roll & Sync League of Legends skins",
  description:
    "Skin Picker auto-picks, rerolls and synchronizes League of Legends skins across your team in champ select. Free, open-source, Windows.",
  metadataBase: new URL("https://skin-picker-website.vercel.app"),
  openGraph: {
    title: "Skin Picker",
    description:
      "Auto-roll, reroll and synchronize LoL skins with your team in champ select.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skin Picker",
    description:
      "Auto-roll, reroll and synchronize LoL skins with your team in champ select.",
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-bg text-ink antialiased font-sans">
        <Background />
        <Nav />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
