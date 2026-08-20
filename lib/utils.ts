import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(bytes: number): string {
  if (!bytes) return "—";
  const mb = bytes / (1024 * 1024);
  if (mb >= 1024) return `${(mb / 1024).toFixed(2)} GB`;
  return `${mb.toFixed(1)} MB`;
}

export function formatDate(iso: string, lang: "en" | "fr" = "en"): string {
  const locale = lang === "fr" ? "fr-FR" : "en-US";
  return new Date(iso).toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Ajoute les parametres UTM sur un lien de telechargement.
 *
 * Vit ici plutot que dans un composant parce que le marquage doit etre le meme
 * partout ou l'installeur est servi : une divergence entre deux points de
 * depart rendrait les statistiques de source ininterpretables.
 */
export function withDownloadUtm(url: string, content?: string): string {
  if (!url) return url;
  const u = new URL(url, "https://placeholder.invalid");
  u.searchParams.set("utm_source", "skinpicker-website");
  u.searchParams.set("utm_medium", "web");
  u.searchParams.set("utm_campaign", "download");
  if (content) u.searchParams.set("utm_content", content);
  // URL absolue : on la reconstruit. URL relative : seul le chemin nous interesse.
  return url.startsWith("http")
    ? `${u.origin}${u.pathname}${u.search}`
    : `${u.pathname}${u.search}`;
}
