import type { Metadata } from "next";
import { fetchLatestRelease } from "@/lib/github";
import { getDict } from "@/lib/i18n/dict";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import InstallGuide from "@/components/sections/InstallGuide";
import DownloadCta from "@/components/sections/DownloadCta";

// Refresh GitHub release data at most every 10 minutes.
export const revalidate = 600;

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: { en: "/", fr: "/fr" },
  },
};

export default async function Page() {
  const release = await fetchLatestRelease();
  const dict = getDict("en");

  return (
    <>
      <Nav dict={dict} lang="en" />
      <Hero release={release} dict={dict} lang="en" />
      <Features dict={dict} />
      <InstallGuide dict={dict} />
      <DownloadCta release={release} dict={dict} lang="en" />
      <Footer dict={dict} lang="en" />
    </>
  );
}
