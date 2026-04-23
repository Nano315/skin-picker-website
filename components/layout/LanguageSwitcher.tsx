"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import type { Lang } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";
import { trackLanguageSwitched } from "@/lib/analytics";

export default function LanguageSwitcher({ lang }: { lang: Lang }) {
  const pathname = usePathname() || "/";

  // Compute the alternate-language URL while preserving the sub-path after /fr
  const isFr = pathname === "/fr" || pathname.startsWith("/fr/");
  const stripped = isFr ? pathname.replace(/^\/fr/, "") || "/" : pathname;
  const enHref = stripped;
  const frHref =
    stripped === "/" ? "/fr" : `/fr${stripped.startsWith("/") ? "" : "/"}${stripped}`;

  return (
    <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 p-0.5 text-[11px] font-medium">
      <Languages className="ml-2 mr-1 h-3 w-3 text-muted" aria-hidden />
      <Link
        href={enHref}
        prefetch={false}
        aria-current={lang === "en" ? "page" : undefined}
        onClick={() => lang !== "en" && trackLanguageSwitched("en")}
        className={cn(
          "rounded-full px-2 py-1 transition-colors",
          lang === "en"
            ? "bg-white/10 text-ink"
            : "text-muted hover:text-ink"
        )}
      >
        EN
      </Link>
      <Link
        href={frHref}
        prefetch={false}
        aria-current={lang === "fr" ? "page" : undefined}
        onClick={() => lang !== "fr" && trackLanguageSwitched("fr")}
        className={cn(
          "rounded-full px-2 py-1 transition-colors",
          lang === "fr"
            ? "bg-white/10 text-ink"
            : "text-muted hover:text-ink"
        )}
      >
        FR
      </Link>
    </div>
  );
}
