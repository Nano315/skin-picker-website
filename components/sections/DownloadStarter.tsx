"use client";

/**
 * Bloc d'accueil de /download : declenche le telechargement et annonce ce qui
 * arrive. Il est rendu dans la colonne de gauche de `InstallReplay`, ou il
 * partage le premier ecran avec la scene animee, et ne porte donc ni sa propre
 * section ni ses propres marges.
 *
 * Le fichier ne part tout seul que si la page a ete atteinte depuis un bouton
 * du site, signale par `?auto=1`. Un visiteur venu d'un resultat de recherche
 * arrive donc sur une page qui explique l'installation sans lui pousser 75 Mo
 * sans prevenir ; il a un bouton explicite a la place.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Download, Github, Loader2 } from "lucide-react";
import type { ReleaseInfo } from "@/lib/github";
import type { Dict } from "@/lib/i18n/dict";
import { cn, formatBytes, withDownloadUtm } from "@/lib/utils";
import {
  trackDownloadPageViewed,
  trackDownloadRetried,
  trackDownloadStarted,
} from "@/lib/analytics";

/** Laisse la page se peindre avant que le navigateur ouvre sa barre de telechargement. */
const AUTO_START_DELAY_MS = 450;

export default function DownloadStarter({
  release,
  dict,
  locale,
}: {
  release: ReleaseInfo;
  dict: Dict;
  locale: "en" | "fr";
}) {
  const t = dict.downloadPage;
  const reduced = useReducedMotion() ?? false;

  const [started, setStarted] = useState(false);
  const [auto, setAuto] = useState<boolean | null>(null);
  const firedRef = useRef(false);

  const start = useCallback(
    (trigger: "auto" | "manual") => {
      if (!release.downloadUrl) return;
      // L'asset GitHub repond en `Content-Disposition: attachment`, donc
      // affecter location.href lance le telechargement sans quitter la page.
      window.location.href = withDownloadUtm(release.downloadUrl, "download-page");
      setStarted(true);
      trackDownloadStarted({ version: release.version, trigger });
    },
    [release.downloadUrl, release.version]
  );

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;

    const isAuto = new URLSearchParams(window.location.search).get("auto") === "1";
    setAuto(isAuto);
    trackDownloadPageViewed({
      locale,
      auto: isAuto,
      hasDirectDownload: !!release.downloadUrl,
    });

    if (!isAuto || !release.downloadUrl) return;
    const timer = setTimeout(() => start("auto"), AUTO_START_DELAY_MS);
    return () => clearTimeout(timer);
  }, [locale, release.downloadUrl, start]);

  const retry = () => {
    trackDownloadRetried(release.version);
    start("manual");
  };

  // `auto` vaut null au premier rendu, avant lecture de l'URL : on affiche le
  // titre neutre plutot qu'annoncer un telechargement qui n'aura peut-etre pas lieu.
  const title = !auto
    ? t.titleManual
    : started
      ? t.titleStarted
      : t.titleStarting;

  const unavailable = !release.downloadUrl;

  return (
    <div>
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-muted backdrop-blur-md"
      >
        {auto && !started ? (
          <Loader2
            className="h-3.5 w-3.5 animate-spin text-accent-strong"
            aria-hidden
          />
        ) : (
          <Download className="h-3.5 w-3.5 text-accent-strong" aria-hidden />
        )}
        {t.eyebrow}
      </motion.div>

      <motion.h1
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        className="mt-5 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-[42px] lg:leading-[1.08]"
      >
        {unavailable ? t.unavailableTitle : title}
      </motion.h1>

      <motion.p
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="mt-4 text-pretty text-base leading-relaxed text-muted"
      >
        {unavailable ? t.unavailableBody : t.subtitle}
      </motion.p>

      {/* Carte du fichier */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="mt-7"
      >
        {unavailable ? (
          <a
            href={release.htmlUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-medium text-ink/90 transition-all hover:border-white/20 hover:bg-white/[0.08]"
          >
            <Github className="h-4 w-4" aria-hidden />
            {dict.download.viewReleases}
          </a>
        ) : (
          <>
            <div className="flex flex-col gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 backdrop-blur-xl sm:flex-row sm:items-center">
              <div
                className={cn(
                  "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl transition-colors",
                  started
                    ? "bg-accent/20 text-accent-strong"
                    : "bg-white/[0.06] text-muted"
                )}
              >
                {started ? (
                  <Check className="h-6 w-6" aria-hidden />
                ) : (
                  <span className="font-mono text-[10px] font-bold tracking-wide">
                    EXE
                  </span>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate font-mono text-[13px] text-ink">
                  {release.fileName}
                </p>
                <p className="mt-1 text-xs text-muted">
                  {[
                    release.sizeBytes ? formatBytes(release.sizeBytes) : null,
                    t.platform,
                    t.noAdmin,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </div>

              {!auto && (
                <button
                  type="button"
                  onClick={() => start("manual")}
                  className="shine group relative inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-b from-accent-strong to-accent px-5 py-2.5 text-sm font-semibold text-white shadow-accent-glow ring-1 ring-white/20 transition-shadow hover:shadow-[0_15px_60px_-8px_rgba(168,85,247,0.75)]"
                >
                  <Download className="h-4 w-4" aria-hidden />
                  {t.startNow}
                </button>
              )}
            </div>

            {auto && (
              <p className="mt-3 text-xs text-muted">
                {t.retryQuestion}{" "}
                <button
                  type="button"
                  onClick={retry}
                  className="font-medium text-accent-strong underline underline-offset-2 transition-colors hover:text-ink"
                >
                  {t.retryCta}
                </button>
              </p>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
}
