/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Auto-hébergement (homelab) : Next produit un serveur Node autonome avec
  // seulement les dépendances utiles, ce que le Dockerfile recopie tel quel.
  // Sans effet sur Vercel, qui ignore ce réglage.
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "github.com" },
      { protocol: "https", hostname: "raw.githubusercontent.com" },
    ],
  },
  // Force Vercel's node-file-trace to include the OG logo in the serverless
  // function bundle. Without this, the file is in the source tree but not
  // copied to the function, so readFile at runtime fails.
  outputFileTracingIncludes: {
    "/opengraph-image": ["./app/og-logo.png"],
    "/fr/opengraph-image": ["./app/og-logo.png"],
  },

  /**
   * Canonicalisation du domaine, faite ici plutôt que par une règle Cloudflare :
   * versionnée, testable, et indépendante de l'interface du dashboard.
   *
   * - `lolskinpicker.nanodev.app` : ancien domaine, redirigé en 301 pour
   *   transférer le référencement et ne pas laisser deux sites identiques se
   *   déclarer canoniques (l'incident du duplicata Vercel).
   * - `www` : redirigé vers l'apex, même raison.
   *
   * ⚠️ `/riot.txt` est EXCLU de la redirection : le dossier Riot Games est en
   * cours de validation avec l'ancienne URL comme Product URL, et leur robot
   * doit continuer d'y lire le jeton en 200. Un 301 pourrait faire échouer la
   * vérification.
   */
  async redirects() {
    const versNouveauDomaine = (host) => ({
      source: "/:chemin((?!riot\\.txt).*)",
      has: [{ type: "host", value: host }],
      destination: "https://skinpicker.app/:chemin",
      permanent: true,
    });
    return [
      versNouveauDomaine("lolskinpicker.nanodev.app"),
      versNouveauDomaine("www.skinpicker.app"),
    ];
  },
};

export default nextConfig;
