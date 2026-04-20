import { OG_SIZE, renderOgImage } from "@/lib/og/render";

export const runtime = "nodejs";
export const revalidate = 600;

export const alt =
  "Skin Picker — Roll et synchro des skins League of Legends en champ select";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function OGImage() {
  return renderOgImage({
    headlineLine1: "Ton prochain skin,",
    headlineLine2: "déjà choisi.",
    subtitle:
      "Tire, relance et synchronise tes skins LoL avec ton équipe en champ select. Gratuit, open-source, Windows.",
    chips: [
      "Tirage auto au lock",
      "Synchro couleur",
      "Synchro Skin Line",
      "Tourne dans le tray",
    ],
    fallbackBadge: "Gratuit · Open source",
  });
}
