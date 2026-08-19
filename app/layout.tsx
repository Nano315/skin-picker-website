import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Background from "@/components/layout/Background";
import AptabaseProvider from "@/components/analytics/AptabaseProvider";
import { SITE_URL } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// « Skin Picker » seul est un mauvais actif de recherche : la SERP de cette
// chaine est occupee par la dermatillomanie et par Minecraft. On qualifie donc
// toujours le nom — « LoL Skin Picker » ou « Skin Picker for League of
// Legends » — dans les titles, les H1 et les textes de liens.
export const metadata: Metadata = {
  title:
    "LoL Skin Picker | Random skin from the ones you own, applied in champ select",
  description:
    "Rolls a random skin and chroma from the ones you already own and applies it in champ select, through the League Client's own API. Syncs a whole premade on one skin line. Free, open-source, Windows.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      fr: "/fr",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "LoL Skin Picker",
    description:
      "It doesn't suggest a skin. It puts it on, straight from the skins you already own, for you and your whole premade.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LoL Skin Picker",
    description:
      "It doesn't suggest a skin. It puts it on, straight from the skins you already own, for you and your whole premade.",
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
        <AptabaseProvider />
        <Background />
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
