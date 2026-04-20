import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Background from "@/components/layout/Background";

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
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      fr: "/fr",
    },
  },
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
  // <html lang> stays "en" here so the root layout can be statically rendered;
  // the French page overrides document language via metadata / <head> and the
  // content itself is clearly French, so screen readers still detect it.
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-bg text-ink antialiased font-sans">
        <Background />
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
