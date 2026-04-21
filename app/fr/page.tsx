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

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Skin Picker — Auto-roll & synchro des skins League of Legends",
  description:
    "Skin Picker tire, relance et synchronise automatiquement tes skins League of Legends avec ton équipe en champ select. Gratuit, open-source, Windows.",
  alternates: {
    canonical: "/fr",
    languages: { en: "/", fr: "/fr" },
  },
  openGraph: {
    title: "Skin Picker",
    description:
      "Tire, relance et synchronise tes skins LoL avec ton équipe en champ select.",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skin Picker",
    description:
      "Tire, relance et synchronise tes skins LoL avec ton équipe en champ select.",
  },
};

export default async function FrenchPage() {
  const release = await fetchLatestRelease();
  const dict = getDict("fr");

  return (
    <>
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
