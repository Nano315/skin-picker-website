import Link from "next/link";
import Logo from "@/components/ui/Logo";
import type { Dict } from "@/lib/i18n/dict";
import type { Lang } from "@/lib/i18n/types";

export default function Footer({ dict, lang }: { dict: Dict; lang: Lang }) {
  const t = dict.footer;
  const home = lang === "fr" ? "/fr" : "/";

  return (
    <footer className="relative z-10 mt-20 border-t border-white/5 bg-black/20">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href={home} className="inline-flex items-center gap-2">
              <Logo className="h-7 w-7" />
              <span className="font-semibold">Skin Picker</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {t.tagline}
            </p>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
              {t.productHeader}
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#features" className="text-ink/80 hover:text-ink">
                  {t.productLinks.features}
                </a>
              </li>
              <li>
                <a href="#download" className="text-ink/80 hover:text-ink">
                  {t.productLinks.download}
                </a>
              </li>
              <li>
                <a href="#install" className="text-ink/80 hover:text-ink">
                  {t.productLinks.install}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
              {t.projectHeader}
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/Nano315/lol-skin-picker"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-ink/80 hover:text-ink"
                >
                  {t.projectLinks.github}
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Nano315/lol-skin-picker/releases"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-ink/80 hover:text-ink"
                >
                  {t.projectLinks.releases}
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Nano315/lol-skin-picker/issues"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-ink/80 hover:text-ink"
                >
                  {t.projectLinks.issues}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="section-divider my-10" />

        <div className="flex flex-col-reverse items-start justify-between gap-4 text-xs text-muted md:flex-row md:items-center">
          <p>{t.copyright.replace("{year}", String(new Date().getFullYear()))}</p>
          <p className="max-w-md leading-relaxed">{t.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
