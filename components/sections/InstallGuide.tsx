"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Info, MousePointerClick, Shield, ShieldCheck } from "lucide-react";
import type { Dict } from "@/lib/i18n/dict";
import Reveal from "@/components/ui/Reveal";
import ScreenshotFrame from "@/components/ui/ScreenshotFrame";

const STEP_META = [
  {
    icon: MousePointerClick,
    screenshot: "/screenshots/win-1.png",
    placeholder: (dict: Dict) => <WinPlaceholderA dict={dict} />,
  },
  {
    icon: Info,
    screenshot: "/screenshots/win-2.png",
    placeholder: (dict: Dict) => <WinPlaceholderB dict={dict} />,
  },
  {
    icon: ShieldCheck,
    screenshot: null as string | null,
    placeholder: (dict: Dict) => <WinPlaceholderC dict={dict} />,
  },
] as const;

export default function InstallGuide({ dict }: { dict: Dict }) {
  const t = dict.install;

  return (
    <section id="install" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-muted">
            <Shield className="h-3.5 w-3.5" />
            {t.eyebrow}
          </div>
          <h2 className="mt-5 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            {t.title}
          </h2>
          <p className="mt-5 text-balance text-lg leading-relaxed text-muted">
            {t.intro}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {t.steps.map((step, idx) => (
            <StepCard
              key={step.n}
              step={step}
              meta={STEP_META[idx]}
              index={idx}
              dict={dict}
            />
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-10 rounded-2xl border border-accent/20 bg-accent/[0.04] p-5 text-sm leading-relaxed text-ink/85">
            <div className="flex gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-strong" />
              <p>
                <strong className="font-semibold text-ink">
                  {t.transparencyLabel}
                </strong>{" "}
                {t.transparencyBody}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

type StepText = Dict["install"]["steps"][number];
type StepMeta = (typeof STEP_META)[number];

function StepCard({
  step,
  meta,
  index,
  dict,
}: {
  step: StepText;
  meta: StepMeta;
  index: number;
  dict: Dict;
}) {
  const reduced = useReducedMotion();
  const Icon = meta.icon;
  const placeholder = meta.placeholder(dict);

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-xl transition-all hover:border-white/15"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-muted">{step.n}</span>
        <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-accent-strong">
          <Icon className="h-4 w-4" />
        </div>
      </div>

      <h3 className="mt-4 text-lg font-semibold tracking-tight">
        {step.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>

      <div className="mt-5 overflow-hidden rounded-xl border border-white/10 bg-[#1e1e1e]">
        {meta.screenshot ? (
          <ScreenshotFrame
            src={meta.screenshot}
            alt={step.screenshotAlt}
            aspect="1/1"
            fit="contain"
            fallback={placeholder}
          />
        ) : (
          <div className="aspect-square">{placeholder}</div>
        )}
      </div>
    </motion.div>
  );
}

function WinBase({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-[#1e1e1e] p-4">
      <div className="w-full max-w-[280px] rounded-sm border border-white/10 bg-[#2b2b2b] p-4 text-[11px] text-white/90 shadow-2xl">
        {children}
      </div>
    </div>
  );
}

function WinPlaceholderA({ dict }: { dict: Dict }) {
  const w = dict.winPlaceholder;
  return (
    <WinBase>
      <div className="flex items-center gap-2 text-[#ffd966]">
        <div className="h-5 w-5 rounded-sm bg-[#ffd966]/20 ring-1 ring-[#ffd966]/40" />
        <span className="font-semibold">{w.title}</span>
      </div>
      <p className="mt-2 text-[10px] leading-snug text-white/70">
        {w.description}
      </p>
      <div className="mt-3 space-y-1 text-[10px] text-white/50">
        <div>
          {w.app}: LoL-Skin-Picker-Setup.exe
        </div>
        <div>
          {w.publisher}: {w.publisherUnknown}
        </div>
      </div>
      <div className="mt-3 inline-block rounded-sm border border-accent/60 bg-accent/10 px-2 py-1 text-[10px] font-semibold text-accent-strong">
        {w.moreInfo}
      </div>
    </WinBase>
  );
}

function WinPlaceholderB({ dict }: { dict: Dict }) {
  const w = dict.winPlaceholder;
  return (
    <WinBase>
      <div className="flex items-center gap-2 text-[#ffd966]">
        <div className="h-5 w-5 rounded-sm bg-[#ffd966]/20 ring-1 ring-[#ffd966]/40" />
        <span className="font-semibold">{w.title}</span>
      </div>
      <p className="mt-2 text-[10px] leading-snug text-white/70">
        {w.description}
      </p>
      <div className="mt-3 space-y-1 text-[10px] text-white/60">
        <div>
          {w.app}: LoL-Skin-Picker-Setup.exe
        </div>
        <div>
          {w.publisher}: {w.publisherUnknown}
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <div className="rounded-sm border border-accent/60 bg-accent/15 px-2 py-1 text-[10px] font-semibold text-accent-strong">
          {w.runAnyway}
        </div>
        <div className="rounded-sm border border-white/20 bg-white/5 px-2 py-1 text-[10px] text-white/70">
          {w.dontRun}
        </div>
      </div>
    </WinBase>
  );
}

function WinPlaceholderC({ dict }: { dict: Dict }) {
  const w = dict.winPlaceholder;
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-accent/15 to-transparent p-4">
      <ShieldCheck className="h-10 w-10 text-accent-strong" />
      <p className="mt-3 text-center text-sm font-semibold">{w.installed}</p>
      <p className="mt-1 text-center text-[11px] text-muted">
        {w.installedNote}
      </p>
    </div>
  );
}
