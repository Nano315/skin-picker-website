/**
 * URL publique du site, en un seul endroit.
 *
 * Elle sert de base aux métadonnées (canonical, Open Graph), au sitemap et au
 * robots.txt. Elle est définie au BUILD par `NEXT_PUBLIC_SITE_URL`.
 *
 * Pourquoi un échec bruyant plutôt qu'une valeur de repli : le repli pointait
 * vers l'ancien déploiement Vercel. Un seul build de production sans la
 * variable suffisait donc à faire basculer TOUS les canonicals, hreflang et le
 * sitemap vers un domaine qu'on ne contrôle pas — sans rien casser
 * visuellement, donc sans que personne ne s'en aperçoive. C'est exactement le
 * scénario qui a produit un duplicata complet du site, indexable et
 * auto-canonique, en concurrence avec le vrai domaine sur les mêmes requêtes.
 * Une erreur de build se voit ; une mauvaise canonicalisation, non.
 */
const RAW_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

if (!RAW_SITE_URL && process.env.NODE_ENV === "production") {
  throw new Error(
    "NEXT_PUBLIC_SITE_URL est absente. Elle est obligatoire pour un build de " +
      "production : sans elle, canonicals, hreflang et sitemap pointeraient " +
      "vers une URL arbitraire."
  );
}

// En développement uniquement, on retombe sur le serveur local.
export const SITE_URL = (RAW_SITE_URL ?? "http://localhost:3000").replace(
  /\/$/,
  ""
);
