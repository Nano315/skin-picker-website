"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Dices,
  History,
  Palette,
  Star,
  Users,
  Wand2,
  Zap,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import ScreenshotFrame from "@/components/ui/ScreenshotFrame";

export default function Features() {
  return (
    <section id="features" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-muted">
            <Wand2 className="h-3.5 w-3.5" />
            What it does
          </div>
          <h2 className="mt-5 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Two modes. One goal:
            <br />
            <span className="text-muted">skins you actually want to see.</span>
          </h2>
        </Reveal>

        <div className="mt-12 space-y-10">
          <SoloBlock />
          <RoomsBlock />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Solo ---------------- */

function SoloBlock() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="grid items-center gap-6 lg:grid-cols-5"
    >
      {/* Screenshot card */}
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0c0d12] shadow-glass lg:col-span-3">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <ScreenshotFrame
          src="/screenshots/solo.png"
          alt="Skin Picker solo experience with live skin preview and reroll controls"
          aspect="1266/735"
          fallback={<SoloPlaceholder />}
        />
      </div>

      {/* Text */}
      <div className="flex flex-col justify-center lg:col-span-2">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-strong">
          Solo
        </span>
        <h3 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          The skin lottery, finally won.
        </h3>
        <p className="mt-4 text-base leading-relaxed text-muted">
          Lock your champion and Skin Picker rolls a skin and chroma you own —
          instantly. Reroll anytime, favor the skins you love, bury the ones you
          don&apos;t. History-aware: it won&apos;t throw you the same skin three
          games in a row.
        </p>

        <ul className="mt-6 space-y-3 text-sm">
          <Bullet icon={Zap} title="Auto-roll on lock">
            Skin and chroma rolled the moment you lock in.
          </Bullet>
          <Bullet icon={Dices} title="One-click reroll">
            Reroll skin or chroma independently — as many times as you want.
          </Bullet>
          <Bullet icon={Star} title="Weighted priorities">
            Favorites roll ×3, deprioritized skins ×0.3. Persisted per champion.
          </Bullet>
          <Bullet icon={History} title="History-aware">
            Avoids your last N picks so every game feels fresh.
          </Bullet>
        </ul>
      </div>
    </motion.div>
  );
}

/* ---------------- Rooms ---------------- */

function RoomsBlock() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="grid items-center gap-6 lg:grid-cols-5"
    >
      {/* Text */}
      <div className="flex flex-col justify-center lg:order-1 lg:col-span-2">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-strong">
          Rooms · Multiplayer
        </span>
        <h3 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          Coordinated skins,
          <br />
          no Discord needed.
        </h3>
        <p className="mt-4 text-base leading-relaxed text-muted">
          Create a room, share a 6-char code with your team, and watch everyone
          sync in real-time. Pick a color — everybody matches. Pick a Skin Line
          — everybody goes PROJECT, Star Guardian or Arcana together. The
          server auto-applies combos when the lobby is ready.
        </p>

        <ul className="mt-6 space-y-3 text-sm">
          <Bullet icon={Users} title="Up to 5 players, live">
            Live dashboard with everyone&apos;s current pick.
          </Bullet>
          <Bullet icon={Palette} title="Color sync">
            Owner picks a theme (Blue, Red, Golden…) — teammates&apos; chromas
            align.
          </Bullet>
          <Bullet icon={Wand2} title="Skin Line sync">
            Detects coverage of thematic lines (PROJECT, Star Guardian…) and
            picks coordinated combos.
          </Bullet>
          <Bullet icon={Zap} title="Auto-apply">
            Once every member has locked, the best combo applies itself.
          </Bullet>
        </ul>
      </div>

      {/* Screenshot card */}
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0c0d12] shadow-glass lg:order-2 lg:col-span-3">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <ScreenshotFrame
          src="/screenshots/rooms.png"
          alt="Skin Picker Rooms multiplayer view with team members and Skin Line synergies"
          aspect="1266/735"
          fallback={<RoomsPlaceholder />}
        />
      </div>
    </motion.div>
  );
}

/* ---------------- Shared ---------------- */

function Bullet({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Zap;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-3">
      <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-accent-strong">
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div>
        <span className="font-semibold text-ink">{title}.</span>{" "}
        <span className="text-muted">{children}</span>
      </div>
    </li>
  );
}

function SoloPlaceholder() {
  return (
    <div className="grid h-full grid-cols-12 grid-rows-6 gap-3 p-4">
      <div className="col-span-8 row-span-4 rounded-xl bg-gradient-to-br from-accent/25 via-white/5 to-transparent p-3">
        <div className="mb-1.5 h-2.5 w-16 rounded bg-white/10" />
        <div className="h-4 w-28 rounded bg-white/20" />
        <div className="mt-3 h-[calc(100%-40px)] rounded-lg bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.45),transparent_70%)]" />
      </div>
      <div className="col-span-4 row-span-4 rounded-xl bg-white/[0.03] p-3">
        <div className="mb-1.5 h-2.5 w-14 rounded bg-white/10" />
        <div className="h-4 w-20 rounded bg-white/20" />
        <div className="mt-3 space-y-2">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="rounded-lg border border-white/5 bg-white/[0.02] p-2"
            >
              <div className="h-1.5 w-10 rounded bg-white/10" />
              <div className="mt-1 h-2 w-14 rounded bg-white/20" />
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-12 row-span-2 rounded-xl bg-white/[0.03] p-3">
        <div className="mb-1.5 h-2.5 w-14 rounded bg-white/10" />
        <div className="flex gap-2">
          {["Reroll skin", "Reroll chroma", "Apply"].map((label) => (
            <div
              key={label}
              className="flex h-8 flex-1 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[10px] text-white/70"
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RoomsPlaceholder() {
  const players = ["Nano", "Vex", "Aeri", "Kha", "Yuu"];
  return (
    <div className="grid h-full grid-cols-12 grid-rows-6 gap-3 p-4">
      <div className="col-span-7 row-span-6 rounded-xl bg-white/[0.03] p-3">
        <div className="mb-1.5 h-2.5 w-20 rounded bg-white/10" />
        <div className="h-4 w-32 rounded bg-white/20" />
        <div className="mt-3 grid grid-cols-2 gap-2">
          {players.map((p, i) => (
            <div
              key={p}
              className="rounded-lg border border-white/5 bg-gradient-to-br from-accent/10 to-transparent p-2"
            >
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-white/10" />
                <div className="text-[10px] font-medium text-white/85">
                  {p}
                </div>
              </div>
              <div className="mt-2 h-8 rounded bg-white/5" />
              <div className="mt-1 h-1.5 w-16 rounded bg-white/10" />
              {i === 0 && (
                <div className="mt-1 inline-block rounded bg-accent/25 px-1.5 py-0.5 text-[9px] font-semibold text-accent-strong">
                  Owner
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-5 row-span-3 rounded-xl bg-white/[0.03] p-3">
        <div className="mb-1.5 h-2.5 w-16 rounded bg-white/10" />
        <div className="h-4 w-24 rounded bg-white/20" />
        <div className="mt-3 space-y-2">
          {["Chromas", "Skins", "Both"].map((mode, i) => (
            <div
              key={mode}
              className={
                "flex h-7 items-center justify-between rounded-md px-2 text-[10px] " +
                (i === 2
                  ? "border border-accent/40 bg-accent/15 text-accent-strong"
                  : "border border-white/5 bg-white/[0.02] text-white/70")
              }
            >
              <span>{mode}</span>
              {i === 2 && <span>●</span>}
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-5 row-span-3 rounded-xl bg-gradient-to-br from-accent/15 to-transparent p-3">
        <div className="mb-1.5 h-2.5 w-14 rounded bg-white/10" />
        <div className="h-4 w-28 rounded bg-white/20" />
        <div className="mt-3 space-y-1.5">
          {["Star Guardian", "PROJECT", "Arcana"].map((s, i) => (
            <div
              key={s}
              className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.03] px-2 py-1 text-[10px]"
            >
              <span className="text-white/85">{s}</span>
              <span className="text-accent-strong">{5 - i}/5</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
