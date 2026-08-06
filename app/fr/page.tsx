import type { Metadata } from "next";
import { fetchLatestRelease } from "@/lib/github";
import { getDict } from "@/lib/i18n/dict";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import InstallGuide from "@/components/sections/InstallGuide";
import FAQ from "@/components/sections/FAQ";
import DownloadCta from "@/components/sections/DownloadCta";
import LandingViewTracker from "@/components/analytics/LandingViewTracker";

export const revalidate = 600;

// Cf. layout.tsx : le nom est toujours qualifie, jamais « Skin Picker » nu.
export const metadata: Metadata = {
  title:
    "LoL Skin Picker — Un skin au hasard parmi les tiens, appliqué en champ select",
  description:
    "Tire un skin et un chroma au hasard parmi ceux que tu possèdes déjà et les applique en champ select, via l'API du client League. Synchronise toute une premade sur une même skin line. Gratuit, open-source, Windows.",
  alternates: {
    canonical: "/fr",
    languages: { en: "/", fr: "/fr", "x-default": "/" },
  },
  openGraph: {
    title: "LoL Skin Picker",
    description:
      "Il ne suggère pas un skin. Il le met — parmi ceux que tu possèdes déjà, pour toi et toute ta premade.",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "LoL Skin Picker",
    description:
      "Il ne suggère pas un skin. Il le met — parmi ceux que tu possèdes déjà, pour toi et toute ta premade.",
  },
};

export default async function FrenchPage() {
  const release = await fetchLatestRelease();
  const dict = getDict("fr");

  return (
    <>
      <LandingViewTracker locale="fr" />
      <Nav dict={dict} lang="fr" />
      <Hero release={release} dict={dict} lang="fr" utmContent="hero" />
      <Features dict={dict} />
      <InstallGuide dict={dict} />
      <FAQ dict={dict} />
      <DownloadCta release={release} dict={dict} lang="fr" utmContent="cta" />
      <Footer dict={dict} lang="fr" />
    </>
  );
}
