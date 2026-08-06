import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const BASE = SITE_URL;

/**
 * Chaque entree declare ses variantes de langue, `x-default` compris : c'est
 * lui qui determine la page servie a un visiteur ni anglophone ni francophone,
 * et l'audience de League of Legends est mondiale.
 */
function entry(
  enPath: string,
  frPath: string,
  priority: number
): MetadataRoute.Sitemap[number] {
  return {
    url: `${BASE}${enPath}`,
    changeFrequency: "weekly",
    priority,
    alternates: {
      languages: {
        en: `${BASE}${enPath}`,
        fr: `${BASE}${frPath}`,
        "x-default": `${BASE}${enPath}`,
      },
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    entry("/", "/fr", 1),
    { ...entry("/", "/fr", 0.9), url: `${BASE}/fr` },
    entry("/safety", "/fr/safety", 0.8),
    { ...entry("/safety", "/fr/safety", 0.7), url: `${BASE}/fr/safety` },
    entry("/privacy", "/fr/privacy", 0.3),
    { ...entry("/privacy", "/fr/privacy", 0.3), url: `${BASE}/fr/privacy` },
  ];
}
