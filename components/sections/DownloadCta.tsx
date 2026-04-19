"use client";

import { Github } from "lucide-react";
import type { ReleaseInfo } from "@/lib/github";
import { formatDate, formatBytes } from "@/lib/utils";
import DownloadButton from "@/components/ui/DownloadButton";
import Reveal from "@/components/ui/Reveal";

export default function DownloadCta({ release }: { release: ReleaseInfo }) {
  return (
    <section id="download" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-accent/10 via-white/[0.02] to-transparent p-10 backdrop-blur-xl sm:p-14">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/25 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />

            <div className="relative">
              <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to roll?
              </h2>
              <p className="mt-3 max-w-xl text-balance text-base leading-relaxed text-muted">
                One installer, then the app keeps itself up to date. Windows 10
                & 11.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <DownloadButton release={release} />
                <a
                  href={release.htmlUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-ink/90 transition-all hover:border-white/20 hover:bg-white/[0.06]"
                >
                  <Github className="h-4 w-4" />
                  Release notes
                </a>
              </div>

              <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
                <Stat
                  label="Version"
                  value={release.version ? `v${release.version}` : "—"}
                />
                <Stat
                  label="Size"
                  value={
                    release.sizeBytes ? formatBytes(release.sizeBytes) : "—"
                  }
                />
                <Stat
                  label="Released"
                  value={
                    release.publishedAt ? formatDate(release.publishedAt) : "—"
                  }
                />
                <Stat label="Platform" value="Windows 10/11" />
              </dl>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wider text-muted">
        {label}
      </dt>
      <dd className="mt-1.5 text-sm font-semibold text-ink">{value}</dd>
    </div>
  );
}
