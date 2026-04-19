import { fetchLatestRelease } from "@/lib/github";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import InstallGuide from "@/components/sections/InstallGuide";
import DownloadCta from "@/components/sections/DownloadCta";

// Refresh GitHub release data at most every 10 minutes.
export const revalidate = 600;

export default async function Page() {
  const release = await fetchLatestRelease();

  return (
    <>
      <Hero release={release} />
      <Features />
      <InstallGuide />
      <DownloadCta release={release} />
    </>
  );
}
