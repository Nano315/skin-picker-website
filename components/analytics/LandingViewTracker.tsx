"use client";

import { useEffect } from "react";
import type { Lang } from "@/lib/i18n/types";
import { trackLandingViewed } from "@/lib/analytics";

/**
 * Fires a `landing_viewed` event once per mount. Aptabase dedupes within a
 * session if needed; here we want one per page load so the locale funnel is
 * measurable.
 */
export default function LandingViewTracker({ locale }: { locale: Lang }) {
  useEffect(() => {
    trackLandingViewed(locale);
  }, [locale]);
  return null;
}
