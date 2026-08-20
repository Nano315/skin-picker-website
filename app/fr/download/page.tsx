import type { Metadata } from "next";
import { fetchLatestRelease } from "@/lib/github";
import { getDict } from "@/lib/i18n/dict";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import DownloadStarter from "@/components/sections/DownloadStarter";
import InstallReplay from "@/components/sections/InstallReplay";
import UnsignedNotice from "@/components/sections/UnsignedNotice";
import VerifyCard from "@/components/sections/VerifyCard";
import SafetyNudge from "@/components/sections/SafetyNudge";

export const revalidate = 600;

const dict = getDict("fr");

export const metadata: Metadata = {
  title: dict.downloadPage.metaTitle,
  description: dict.downloadPage.metaDescription,
  alternates: {
    canonical: "/fr/download",
    languages: {
      en: "/download",
      fr: "/fr/download",
      "x-default": "/download",
    },
  },
  openGraph: {
    title: dict.downloadPage.metaTitle,
    description: dict.downloadPage.metaDescription,
    type: "website",
    locale: "fr_FR",
  },
};

export default async function FrenchDownloadPage() {
  const release = await fetchLatestRelease();

  return (
    <>
      <Nav dict={dict} lang="fr" />
      <InstallReplay
        dict={dict}
        fileName={release.fileName}
        aside={
          <DownloadStarter release={release} dict={dict} locale="fr" />
        }
      />
      <UnsignedNotice dict={dict} />
      <VerifyCard release={release} dict={dict} />
      <SafetyNudge dict={dict} lang="fr" />
      <Footer dict={dict} lang="fr" />
    </>
  );
}
