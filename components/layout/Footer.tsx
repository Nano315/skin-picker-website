import Link from "next/link";
import Logo from "@/components/ui/Logo";
import FooterGithubLink from "@/components/layout/FooterLink";
import type { Dict } from "@/lib/i18n/dict";
import type { Lang } from "@/lib/i18n/types";

export default function Footer({ dict, lang }: { dict: Dict; lang: Lang }) {
  const t = dict.footer;
  const home = lang === "fr" ? "/fr" : "/";

  return (
    <footer className="relative z-10 mt-20 border-t border-white/5 bg-black/20">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-5">
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
            {/*
              Ancres prefixees par la home : le Footer est aussi monte sur les
              pages de contenu (/safety, /privacy), ou "#features" resoudrait
              vers "/safety#features" — un lien qui ne mene nulle part.
            */}
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={`${home}#features`}
                  className="text-ink/80 hover:text-ink"
                >
                  {t.productLinks.features}
                </a>
              </li>
              <li>
                <a
                  href={`${home}#download`}
                  className="text-ink/80 hover:text-ink"
                >
                  {t.productLinks.download}
                </a>
              </li>
              <li>
                <a
                  href={`${home}#install`}
                  className="text-ink/80 hover:text-ink"
                >
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
                <FooterGithubLink
                  href="https://github.com/Nano315/lol-skin-picker"
                  source="footer"
                  className="text-ink/80 hover:text-ink"
                >
                  {t.projectLinks.github}
                </FooterGithubLink>
              </li>
              <li>
                <FooterGithubLink
                  href="https://github.com/Nano315/lol-skin-picker/releases"
                  source="footer"
                  className="text-ink/80 hover:text-ink"
                >
                  {t.projectLinks.releases}
                </FooterGithubLink>
              </li>
              <li>
                <FooterGithubLink
                  href="https://github.com/Nano315/lol-skin-picker/issues"
                  source="footer"
                  className="text-ink/80 hover:text-ink"
                >
                  {t.projectLinks.issues}
                </FooterGithubLink>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
              {t.legalHeader}
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={lang === "fr" ? "/fr/safety" : "/safety"}
                  className="text-ink/80 hover:text-ink"
                >
                  {t.legalLinks.safety}
                </Link>
              </li>
              <li>
                <Link
                  href={lang === "fr" ? "/fr/privacy" : "/privacy"}
                  className="text-ink/80 hover:text-ink"
                >
                  {t.legalLinks.privacy}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="section-divider my-10" />

        <div className="flex flex-col-reverse items-start justify-between gap-4 text-xs text-muted md:flex-row md:items-start">
          <p className="shrink-0">
            {t.copyright.replace("{year}", String(new Date().getFullYear()))}
          </p>
          <p className="max-w-2xl leading-relaxed md:text-right">
            {t.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}
