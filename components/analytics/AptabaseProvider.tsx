"use client";

import { useEffect } from "react";
import { initAnalytics } from "@/lib/analytics";

/**
 * Initializes Aptabase once on the client. Rendered inside the root layout so
 * every route benefits from it. SSR-safe: all work happens in useEffect.
 *
 * Renders nothing.
 */
export default function AptabaseProvider() {
  useEffect(() => {
    initAnalytics();
  }, []);
  return null;
}
