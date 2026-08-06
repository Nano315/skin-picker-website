import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import type { Dict } from "@/lib/i18n/dict";
import type { Lang } from "@/lib/i18n/types";

/**
 * Coquille des pages de contenu long (securite, confidentialite).
 *
 * Le site n'utilise pas @tailwindcss/typography : les styles de prose sont donc
 * poses explicitement ici, une seule fois, plutot que repetes sur chaque page.
 */
export default function ContentPage({
  dict,
  lang,
  eyebrow,
  title,
  intro,
  updatedLabel,
  children,
}: {
  dict: Dict;
  lang: Lang;
  eyebrow: string;
  title: string;
  intro?: string;
  updatedLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav dict={dict} lang={lang} />

      <article className="relative mx-auto max-w-3xl px-6 pb-10 pt-32 sm:pt-40">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-muted">
          {eyebrow}
        </div>

        <h1 className="mt-5 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h1>

        {intro && (
          <p className="mt-6 text-lg leading-relaxed text-ink/85">{intro}</p>
        )}

        {updatedLabel && (
          <p className="mt-4 text-xs text-muted">{updatedLabel}</p>
        )}

        <div className="section-divider my-10" />

        {/*
          Styles de prose appliques aux descendants : les pages n'ont ainsi
          qu'a ecrire du HTML semantique.
          `[&_a]` cible aussi les liens dans les listes et les tableaux.
        */}
        <div
          className="
            text-sm leading-relaxed text-muted
            [&_h2]:mb-4 [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-ink
            [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-ink
            [&_p]:mb-4
            [&_ul]:mb-4 [&_ul]:space-y-2 [&_ul]:pl-5
            [&_li]:list-disc [&_li]:marker:text-accent-strong
            [&_strong]:font-semibold [&_strong]:text-ink
            [&_code]:rounded [&_code]:border [&_code]:border-white/10 [&_code]:bg-white/[0.04] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[0.8125rem] [&_code]:text-ink/90
            [&_a]:text-accent-strong [&_a]:underline [&_a]:decoration-accent/40 [&_a]:underline-offset-2 hover:[&_a]:text-ink
            [&_table]:mb-6 [&_table]:w-full [&_table]:border-collapse [&_table]:text-left
            [&_th]:border-b [&_th]:border-white/10 [&_th]:pb-2 [&_th]:pr-4 [&_th]:align-bottom [&_th]:text-xs [&_th]:font-semibold [&_th]:uppercase [&_th]:tracking-wider [&_th]:text-ink
            [&_td]:border-b [&_td]:border-white/5 [&_td]:py-3 [&_td]:pr-4 [&_td]:align-top
          "
        >
          {children}
        </div>
      </article>

      <Footer dict={dict} lang={lang} />
    </>
  );
}
