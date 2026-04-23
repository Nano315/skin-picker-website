"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Github } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "@/components/ui/Logo";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import type { Dict } from "@/lib/i18n/dict";
import type { Lang } from "@/lib/i18n/types";
import { trackGithubClicked } from "@/lib/analytics";

export default function Nav({ dict, lang }: { dict: Dict; lang: Lang }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const home = lang === "fr" ? "/fr" : "/";
  const t = dict.nav;

  const links = [
    { href: "#features", label: t.features },
    { href: "#install", label: t.install },
    { href: "#download", label: t.download },
  ];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between px-4 transition-all duration-300",
          "rounded-full border",
          scrolled
            ? "glass border-white/10 mx-3 sm:mx-auto px-4 py-2"
            : "border-transparent px-4 py-2"
        )}
      >
        <Link
          href={home}
          className="flex items-center gap-2 text-sm font-semibold tracking-tight"
        >
          <Logo className="h-7 w-7" />
          <span>Skin Picker</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher lang={lang} />
          <a
            href="https://github.com/Nano315/lol-skin-picker"
            target="_blank"
            rel="noreferrer noopener"
            onClick={() => trackGithubClicked("nav")}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-ink/90 transition-all hover:border-white/20 hover:bg-white/10"
          >
            <Github className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}
