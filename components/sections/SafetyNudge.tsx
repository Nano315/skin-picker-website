import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import type { Dict } from "@/lib/i18n/dict";
import type { Lang } from "@/lib/i18n/types";

/**
 * Rappel de la question du ban, en bas de /download.
 *
 * Quelqu'un qui vient de passer un ecran de securite Windows a la tete a la
 * securite : c'est le moment ou la deuxieme inquietude, celle du compte
 * sanctionne, remonte. Autant y repondre la plutot que d'attendre qu'il aille
 * la chercher ailleurs.
 */
export default function SafetyNudge({
  dict,
  lang,
}: {
  dict: Dict;
  lang: Lang;
}) {
  const t = dict.downloadPage.ban;
  const safetyHref = lang === "fr" ? "/fr/safety" : "/safety";

  return (
    <section className="relative pb-20 sm:pb-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-xl sm:p-8">
          <div className="flex gap-4">
            <ShieldCheck
              className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-strong"
              aria-hidden
            />
            <div>
              <h2 className="text-base font-semibold tracking-tight text-ink">
                {t.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t.body}</p>
              <Link
                href={safetyHref}
                className="group mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-strong transition-colors hover:text-ink"
              >
                {t.cta}
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
