"use client";

import Link from "next/link";
import { Download, Github } from "lucide-react";
import { motion } from "framer-motion";
import { cn, formatBytes } from "@/lib/utils";
import type { ReleaseInfo } from "@/lib/github";
import type { Dict } from "@/lib/i18n/dict";
import type { Lang } from "@/lib/i18n/types";
import { trackDownloadClicked } from "@/lib/analytics";

const MotionLink = motion.create(Link);

type DownloadButtonProps = {
  release: ReleaseInfo;
  dict: Dict;
  lang: Lang;
  /** Identifies which button triggered the download (e.g. "hero", "cta"). */
  utmContent?: string;
  size?: "md" | "lg";
  className?: string;
};

export default function DownloadButton({
  release,
  dict,
  lang,
  utmContent,
  size = "lg",
  className,
}: DownloadButtonProps) {
  const hasDownload = !!release.downloadUrl;

  // utmContent is "hero" | "cta" at call sites. Narrow for analytics typing;
  // default to "cta" so a typo doesn't drop the event.
  const source: "hero" | "cta" = utmContent === "hero" ? "hero" : "cta";
  const onClick = () =>
    trackDownloadClicked({
      source,
      version: release.version,
      hasDirectDownload: hasDownload,
    });

  /**
   * Le bouton n'envoie plus directement sur l'asset GitHub : il passe par
   * /download, qui lance le fichier ET explique l'ecran SmartScreen pendant
   * qu'il descend. Sans cette page, l'utilisateur quitte le site au moment
   * precis ou il va rencontrer l'avertissement, donc sans rien pour le
   * rassurer.
   *
   * `auto=1` distingue une arrivee depuis un bouton du site d'une arrivee
   * depuis un resultat de recherche : seule la premiere declenche le
   * telechargement automatiquement.
   */
  const downloadHref = `${lang === "fr" ? "/fr" : ""}/download?auto=1`;

  const motionProps = {
    whileHover: { y: -2 },
    whileTap: { y: 0, scale: 0.98 },
    transition: { type: "spring" as const, stiffness: 400, damping: 24 },
    className: cn(
      "shine group relative inline-flex items-center gap-3 rounded-full font-semibold",
      "bg-gradient-to-b from-accent-strong to-accent text-white",
      "shadow-accent-glow ring-1 ring-white/20",
      "transition-shadow hover:shadow-[0_15px_60px_-8px_rgba(168,85,247,0.75)]",
      size === "lg" ? "px-7 py-4 text-base" : "px-5 py-2.5 text-sm",
      className
    ),
  };

  // Pas d'installeur dans la derniere release (API GitHub muette, asset
  // manquant) : on renvoie vers la page des releases plutot que vers une page
  // /download qui n'aurait rien a telecharger.
  if (!hasDownload) {
    return (
      <motion.a
        href={release.htmlUrl}
        target="_blank"
        rel="noreferrer noopener"
        onClick={onClick}
        {...motionProps}
      >
        <Github className={size === "lg" ? "h-5 w-5" : "h-4 w-4"} />
        <span>{dict.download.viewReleases}</span>
      </motion.a>
    );
  }

  return (
    <MotionLink href={downloadHref} onClick={onClick} {...motionProps}>
      <Download className={size === "lg" ? "h-5 w-5" : "h-4 w-4"} />
      <span className="flex flex-col leading-tight">
        <span>{dict.download.forWindows}</span>
        {size === "lg" && release.version && (
          <span className="text-[11px] font-normal text-white/80">
            v{release.version}
            {release.sizeBytes ? ` · ${formatBytes(release.sizeBytes)}` : ""}
          </span>
        )}
      </span>
    </MotionLink>
  );
}
