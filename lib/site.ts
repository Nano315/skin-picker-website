/**
 * URL publique du site, en un seul endroit.
 *
 * Elle sert de base aux métadonnées (canonical, Open Graph), au sitemap et au
 * robots.txt : si elle est fausse, Google et les aperçus de liens pointent
 * ailleurs. Définie au BUILD par `NEXT_PUBLIC_SITE_URL` (Docker/homelab) et
 * retombe sur l'ancien déploiement Vercel, qui reste valable tant qu'il vit.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://skin-picker-website.vercel.app"
).replace(/\/$/, "");
