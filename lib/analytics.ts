// lib/analytics.ts
//
// Thin typed wrapper around `@aptabase/web`. Initialization happens once from
// `components/analytics/AptabaseProvider.tsx` (mounted in the root layout);
// everything else just imports `track*` helpers.
//
// Aptabase auto-enriches every event with: random install ID (persistent per
// browser/device), session ID, app version, OS, browser, locale and country
// (derived from IP, IP is not stored). We never push any of those manually.
//
// The app key is exposed via NEXT_PUBLIC_APTABASE_APP_KEY so it's inlined in
// the client bundle. This is intended: Aptabase app keys are designed to be
// public (they identify the app, not the user).
import { init, trackEvent } from "@aptabase/web";

type EventName =
  | "landing_viewed"
  | "download_clicked"
  | "github_clicked"
  | "language_switched"
  | "release_notes_clicked";

type EventProps = Record<string, string | number | boolean>;

const APP_KEY = process.env.NEXT_PUBLIC_APTABASE_APP_KEY;
const HOST = process.env.NEXT_PUBLIC_APTABASE_HOST;

let initialized = false;

export function initAnalytics(): void {
  if (initialized) return;
  if (typeof window === "undefined") return; // SSR guard
  if (!APP_KEY) {
    // No key means telemetry disabled — this is normal in dev / preview.
    return;
  }
  try {
    init(APP_KEY, HOST ? { host: HOST } : undefined);
    initialized = true;
  } catch {
    // Analytics must never break the site.
  }
}

export function track(name: EventName, props?: EventProps): void {
  if (!initialized) return;
  try {
    // @aptabase/web's trackEvent returns a promise but we fire-and-forget.
    void trackEvent(name, props);
  } catch {
    // Silently swallow — analytics must never break a click.
  }
}

// Typed helpers so call sites stay readable.
export const trackLandingViewed = (locale: "en" | "fr") =>
  track("landing_viewed", { locale });

export const trackDownloadClicked = (opts: {
  source: "hero" | "cta";
  version?: string;
  hasDirectDownload: boolean;
}) =>
  track("download_clicked", {
    source: opts.source,
    version: opts.version ?? "unknown",
    hasDirectDownload: opts.hasDirectDownload,
  });

export const trackGithubClicked = (
  source: "nav" | "hero" | "footer" | "release_notes" | "version_pill"
) => track("github_clicked", { source });

export const trackLanguageSwitched = (to: "en" | "fr") =>
  track("language_switched", { to });
