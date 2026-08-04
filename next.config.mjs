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
};

export default nextConfig;
