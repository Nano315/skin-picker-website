"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Github, Shield, Sparkles } from "lucide-react";
import type { ReleaseInfo } from "@/lib/github";
import { formatDate } from "@/lib/utils";
import type { Dict } from "@/lib/i18n/dict";
import type { Lang } from "@/lib/i18n/types";
import DownloadButton from "@/components/ui/DownloadButton";
import GradientText from "@/components/ui/GradientText";
import ScreenshotFrame from "@/components/ui/ScreenshotFrame";

export default function Hero({
  release,
  dict,
  lang,
  utmContent,
}: {
  release: ReleaseInfo;
  dict: Dict;
  lang: Lang;
  utmContent?: string;
}) {
  const reduced = useReducedMotion();
  const t = dict.hero;

  return (
    <section className="relative pt-32 pb-10 sm:pt-40 sm:pb-14">
      <div className="mx-auto max-w-6xl px-6">
        {/* Version pill */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-7 flex justify-center"
        >
          <a
            href={release.htmlUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-ink/90 backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/[0.06]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-strong" />
            </span>
            <span className="text-muted">{t.latestRelease}</span>
            <span className="font-semibold">
              {release.version ? `v${release.version}` : t.checkGithub}
            </span>
            <ArrowRight className="h-3 w-3 text-muted transition-transform group-hover:translate-x-0.5" />
          </a>
        </motion.div>

        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="text-balance text-center text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-[88px] lg:leading-[0.95]"
        >
          {t.titleLine1}
          <br />
          <GradientText>{t.titleLine2}</GradientText>
        </motion.h1>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-7 max-w-2xl text-balance text-center text-lg leading-relaxed text-muted sm:text-xl"
        >
          {t.subtitle}
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <DownloadButton release={release} dict={dict} utmContent={utmContent} />
          <a
            href="https://github.com/Nano315/lol-skin-picker"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-4 text-sm font-medium text-ink/90 backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/[0.06]"
          >
            <Github className="h-4 w-4" />
            {t.viewGithub}
          </a>
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.45 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted"
        >
          <span className="inline-flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5" />
            {t.free}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            {t.autoUpdates}
          </span>
          {release.publishedAt && (
            <span>
              {t.updated} {formatDate(release.publishedAt, lang)}
            </span>
          )}
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-14 w-full max-w-5xl"
        >
          <div
            aria-hidden
            className="absolute inset-x-8 -bottom-8 h-28 rounded-full bg-accent/30 blur-3xl"
          />
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c0d12] shadow-[0_30px_120px_-20px_rgba(139,92,246,0.5)] backdrop-blur-md">
            <ScreenshotFrame
              src="/screenshots/hero.png"
              alt={t.screenshotAlt}
              aspect="1266/735"
              priority
              fallback={<HeroPlaceholder />}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HeroPlaceholder() {
  return (
    <div className="grid h-full grid-cols-12 grid-rows-6 gap-3 bg-[#0c0d12] p-5">
      <div className="col-span-8 row-span-4 rounded-xl bg-gradient-to-br from-accent/20 via-white/5 to-white/[0.02] p-4">
        <div className="mb-2 h-3 w-20 rounded bg-white/10" />
        <div className="h-6 w-40 rounded bg-white/20" />
        <div className="mt-6 h-[calc(100%-60px)] rounded-lg bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.35),transparent_70%)]" />
      </div>
      <div className="col-span-4 row-span-4 rounded-xl bg-white/[0.03] p-4">
        <div className="mb-2 h-3 w-20 rounded bg-white/10" />
        <div className="h-6 w-24 rounded bg-white/20" />
        <div className="mt-5 grid grid-cols-2 gap-3">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-14 rounded-lg border border-white/5 bg-white/[0.02]"
            />
          ))}
        </div>
      </div>
      <div className="col-span-12 row-span-2 rounded-xl bg-white/[0.03] p-4">
        <div className="mb-2 h-3 w-16 rounded bg-white/10" />
        <div className="flex gap-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-10 w-40 rounded-full border border-white/10 bg-white/[0.04]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
