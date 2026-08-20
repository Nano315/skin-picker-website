"use client";

/**
 * Fiche de verification du fichier telecharge.
 *
 * L'empreinte vient du champ `digest` renvoye par l'API GitHub sur chaque
 * asset : elle est donc calculee par GitHub sur le binaire reellement servi,
 * pas recopiee a la main quelque part, et elle suit chaque nouvelle version
 * sans intervention.
 */

import { useState } from "react";
import {
  Check,
  Copy,
  FileCheck2,
  Github,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import type { ReleaseInfo } from "@/lib/github";
import type { Dict } from "@/lib/i18n/dict";
import { cn, formatBytes } from "@/lib/utils";
import Reveal from "@/components/ui/Reveal";
import { trackChecksumCopied } from "@/lib/analytics";

export default function VerifyCard({
  release,
  dict,
}: {
  release: ReleaseInfo;
  dict: Dict;
}) {
  const t = dict.downloadPage.verify;
  const [copied, setCopied] = useState(false);

  // Un rapport non vierge n'est pas affiche. Les gens qui lisent cette page
  // sont deja inquiets : un « 2/72 » se lit chez eux comme une confirmation,
  // alors que l'absence de la ligne ne coute rien. Le verdict complet reste
  // consultable dans l'asset virustotal.json de la release.
  const vt = release.virusTotal;
  const vtClean = vt && vt.malicious === 0 && vt.suspicious === 0 ? vt : null;

  const copyHash = async () => {
    if (!release.sha256) return;
    try {
      await navigator.clipboard.writeText(release.sha256);
      setCopied(true);
      trackChecksumCopied(release.version);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Presse-papiers refuse (contexte non securise, permission) : l'empreinte
      // reste selectionnable a la main, donc rien a signaler a l'utilisateur.
    }
  };

  return (
    <section id="verify" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 backdrop-blur-xl sm:p-10">
            <div className="flex items-center gap-2.5">
              <FileCheck2 className="h-5 w-5 text-accent-strong" aria-hidden />
              <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                {t.title}
              </h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">{t.intro}</p>

            <dl className="mt-8 space-y-5">
              {release.fileName && (
                <Row label={t.fileLabel}>
                  <span className="break-all font-mono text-[13px] text-ink">
                    {release.fileName}
                  </span>
                </Row>
              )}

              {release.sizeBytes && (
                <Row label={t.sizeLabel}>
                  <span className="text-[13px] text-ink">
                    {formatBytes(release.sizeBytes)}
                  </span>
                </Row>
              )}

              {release.sha256 && (
                <Row label={t.hashLabel}>
                  <div className="flex flex-wrap items-start gap-2">
                    <code className="break-all rounded-lg bg-white/[0.04] px-2.5 py-1.5 font-mono text-[11.5px] leading-relaxed text-ink/90">
                      {release.sha256}
                    </code>
                    <button
                      type="button"
                      onClick={copyHash}
                      className={cn(
                        "inline-flex flex-shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] font-medium transition-colors",
                        copied
                          ? "border-accent/40 bg-accent/10 text-accent-strong"
                          : "border-white/10 bg-white/[0.03] text-muted hover:border-white/20 hover:text-ink"
                      )}
                    >
                      {copied ? (
                        <Check className="h-3 w-3" aria-hidden />
                      ) : (
                        <Copy className="h-3 w-3" aria-hidden />
                      )}
                      {copied ? t.copied : t.copy}
                    </button>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    {t.hashHelp}
                  </p>
                </Row>
              )}

              {vtClean && (
                <Row label={t.virusTotalLabel}>
                  <span className="text-[13px] text-ink">
                    {t.virusTotalClean.replace(
                      "{engines}",
                      String(vtClean.engines)
                    )}
                  </span>
                  <a
                    href={vtClean.permalink}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-medium text-accent-strong transition-colors hover:text-ink"
                  >
                    <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
                    {t.virusTotalCta}
                  </a>
                </Row>
              )}

              <Row label={t.provenanceLabel}>
                <span className="text-[13px] text-ink">
                  {t.provenanceValue.replace("{tag}", release.tagName || "—")}
                </span>
                <a
                  href={release.workflowUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-medium text-accent-strong transition-colors hover:text-ink"
                >
                  <Workflow className="h-3.5 w-3.5" aria-hidden />
                  {t.provenanceCta}
                </a>
              </Row>

              <Row label={t.sourceLabel}>
                <span className="text-[13px] text-ink">{t.sourceValue}</span>
                <a
                  href={release.repoUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-medium text-accent-strong transition-colors hover:text-ink"
                >
                  <Github className="h-3.5 w-3.5" aria-hidden />
                  {t.sourceCta}
                </a>
              </Row>
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-white/[0.07] pt-5 first:border-t-0 first:pt-0 sm:grid sm:grid-cols-[128px_1fr] sm:gap-5">
      <dt className="text-xs font-medium uppercase tracking-wider text-muted">
        {label}
      </dt>
      <dd className="mt-1.5 min-w-0 sm:mt-0">{children}</dd>
    </div>
  );
}
