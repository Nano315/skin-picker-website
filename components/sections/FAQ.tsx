"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plus, ShieldCheck } from "lucide-react";
import type { Dict } from "@/lib/i18n/dict";
import { cn } from "@/lib/utils";
import Reveal from "@/components/ui/Reveal";

export default function FAQ({ dict }: { dict: Dict }) {
  const t = dict.faq;

  return (
    <section id="faq" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-muted">
            <ShieldCheck className="h-3.5 w-3.5" />
            {t.eyebrow}
          </div>
          <h2 className="mt-5 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            {t.title}
          </h2>
        </Reveal>

        <dl className="space-y-3">
          {t.items.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} index={i} />
          ))}
        </dl>
      </div>
    </section>
  );
}

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  return (
    <Reveal delay={index * 0.06}>
      <div
        className={cn(
          "overflow-hidden rounded-2xl border transition-colors duration-200",
          open
            ? "border-white/15 bg-white/[0.05]"
            : "border-white/8 bg-white/[0.025] hover:border-white/12 hover:bg-white/[0.04]"
        )}
      >
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        >
          <dt className="text-base font-semibold leading-snug text-ink">{q}</dt>
          <span
            className={cn(
              "flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-white/10 transition-all duration-300",
              open
                ? "rotate-45 border-accent/40 bg-accent/10 text-accent-strong"
                : "text-muted"
            )}
          >
            <Plus className="h-3.5 w-3.5" />
          </span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="body"
              initial={reduced ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={reduced ? undefined : { height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              style={{ overflow: "hidden" }}
            >
              <dd className="px-6 pb-6 text-sm leading-relaxed text-muted">
                {a}
              </dd>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}
