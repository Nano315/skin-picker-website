import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const BASE = SITE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE}/`,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: { en: `${BASE}/`, fr: `${BASE}/fr` } },
    },
    {
      url: `${BASE}/fr`,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: { en: `${BASE}/`, fr: `${BASE}/fr` } },
    },
  ];
}
