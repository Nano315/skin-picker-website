"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Info, MousePointerClick, Shield, ShieldCheck } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import ScreenshotFrame from "@/components/ui/ScreenshotFrame";

const STEPS = [
  {
    n: "01",
    title: "Run the installer",
    body: "Double-click the file you just downloaded. Windows SmartScreen will show a warning screen because the app isn't code-signed yet — that's normal at this stage.",
    icon: MousePointerClick,
    screenshot: "/screenshots/win-1.png",
    cue: { label: "More info", at: { x: 32, y: 70 } },
    placeholder: <WinPlaceholderA />,
  },
  {
    n: "02",
    title: "Click \u201cMore info\u201d",
    body: "SmartScreen hides the Run button by default. Click the small \u201cMore info\u201d link — the publisher details then expand and the Run anyway button appears.",
    icon: Info,
    screenshot: "/screenshots/win-2.png",
    cue: { label: "Run anyway", at: { x: 28, y: 76 } },
    placeholder: <WinPlaceholderB />,
  },
  {
    n: "03",
    title: "Click \u201cRun anyway\u201d",
    body: "The installer launches and sets up Skin Picker like any other Windows app. From now on, updates are automatic — no more warning, no more re-download.",
    icon: ShieldCheck,
    screenshot: null,
    cue: null,
    placeholder: <WinPlaceholderC />,
  },
];

export default function InstallGuide() {
  return (
    <section id="install" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-muted">
            <Shield className="h-3.5 w-3.5" />
            Install in 30 seconds
          </div>
          <h2 className="mt-5 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            About the Windows warning
          </h2>
          <p className="mt-5 text-balance text-lg leading-relaxed text-muted">
            Skin Picker is a small personal project, not signed with a paid
            Microsoft certificate yet. Windows shows a safety warning for any
            unsigned app — it doesn&apos;t mean the app is unsafe. Here&apos;s
            how to get through it.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {STEPS.map((step, idx) => (
            <StepCard key={step.n} step={step} index={idx} />
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-10 rounded-2xl border border-accent/20 bg-accent/[0.04] p-5 text-sm leading-relaxed text-ink/85">
            <div className="flex gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-strong" />
              <p>
                <strong className="font-semibold text-ink">
                  Transparency:
                </strong>{" "}
                the entire source code is public on GitHub. You can read it,
                build it yourself, or audit every release. The installer is
                published automatically from the repo via GitHub Actions — no
                manual handling, no hidden binaries.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

type Step = (typeof STEPS)[number];

function StepCard({ step, index }: { step: Step; index: number }) {
  const reduced = useReducedMotion();
  const Icon = step.icon;

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
        {step.screenshot ? (
          <ScreenshotFrame
            src={step.screenshot}
            alt={`Step ${step.n} — ${step.title}`}
            aspect="1/1"
            fit="contain"
            fallback={step.placeholder}
          />
        ) : (
          <div className="aspect-square">{step.placeholder}</div>
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

function WinPlaceholderA() {
  return (
    <WinBase>
      <div className="flex items-center gap-2 text-[#ffd966]">
        <div className="h-5 w-5 rounded-sm bg-[#ffd966]/20 ring-1 ring-[#ffd966]/40" />
        <span className="font-semibold">Windows protected your PC</span>
      </div>
      <p className="mt-2 text-[10px] leading-snug text-white/70">
        Microsoft Defender SmartScreen prevented an unrecognized app from
        starting.
      </p>
      <div className="mt-3 space-y-1 text-[10px] text-white/50">
        <div>App: LoL-Skin-Picker-Setup.exe</div>
        <div>Publisher: Unknown publisher</div>
      </div>
      <div className="mt-3 inline-block rounded-sm border border-accent/60 bg-accent/10 px-2 py-1 text-[10px] font-semibold text-accent-strong">
        More info
      </div>
    </WinBase>
  );
}

function WinPlaceholderB() {
  return (
    <WinBase>
      <div className="flex items-center gap-2 text-[#ffd966]">
        <div className="h-5 w-5 rounded-sm bg-[#ffd966]/20 ring-1 ring-[#ffd966]/40" />
        <span className="font-semibold">Windows protected your PC</span>
      </div>
      <p className="mt-2 text-[10px] leading-snug text-white/70">
        Microsoft Defender SmartScreen prevented an unrecognized app from
        starting.
      </p>
      <div className="mt-3 space-y-1 text-[10px] text-white/60">
        <div>App: LoL-Skin-Picker-Setup.exe</div>
        <div>Publisher: Unknown publisher</div>
      </div>
      <div className="mt-3 flex gap-2">
        <div className="rounded-sm border border-accent/60 bg-accent/15 px-2 py-1 text-[10px] font-semibold text-accent-strong">
          Run anyway
        </div>
        <div className="rounded-sm border border-white/20 bg-white/5 px-2 py-1 text-[10px] text-white/70">
          Don&apos;t run
        </div>
      </div>
    </WinBase>
  );
}

function WinPlaceholderC() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-accent/15 to-transparent p-4">
      <ShieldCheck className="h-10 w-10 text-accent-strong" />
      <p className="mt-3 text-center text-sm font-semibold">Installed!</p>
      <p className="mt-1 text-center text-[11px] text-muted">
        Auto-updates handled by the app.
      </p>
    </div>
  );
}
