import { ShieldCheck } from "lucide-react";
import type { Dict } from "@/lib/i18n/dict";

/**
 * Explication de l'avertissement Windows, placee APRES la rediffusion.
 *
 * Elle etait au depart dans l'en-tete de la page, ou elle repoussait
 * l'animation de 270 px sous la ligne de flottaison : personne ne voyait les
 * ecrans sans scroller, alors que c'est la raison d'etre de la page. Elle est
 * aussi mieux placee ici sur le fond, parce qu'elle repond a une question que
 * la demonstration vient de poser plutot qu'a une question que le visiteur ne
 * s'est pas encore posee.
 */
export default function UnsignedNotice({ dict }: { dict: Dict }) {
  const t = dict.downloadPage.why;

  return (
    <section className="relative pb-4">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-2xl border border-accent/20 bg-accent/[0.04] p-5 sm:p-6">
          <div className="flex gap-3">
            <ShieldCheck
              className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-strong"
              aria-hidden
            />
            <p className="text-sm leading-relaxed text-ink/85">
              <strong className="font-semibold text-ink">{t.title}.</strong>{" "}
              {t.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
