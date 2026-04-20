import { OG_SIZE, renderOgImage } from "@/lib/og/render";

export const runtime = "nodejs";
export const revalidate = 600;

export const alt =
  "Skin Picker — Auto-roll and sync League of Legends skins in champ select";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function OGImage() {
  return renderOgImage({
    headlineLine1: "Your next skin,",
    headlineLine2: "already picked.",
    subtitle:
      "Auto-roll, reroll and synchronize LoL skins with your team in champ select. Free, open-source, Windows.",
    chips: [
      "Auto-roll on lock",
      "Team color sync",
      "Skin Line sync",
      "Runs in the tray",
    ],
    fallbackBadge: "Free · Open source",
  });
}
