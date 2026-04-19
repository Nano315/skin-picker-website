"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ScreenshotFrameProps = {
  src: string;
  alt: string;
  aspect?: string;
  priority?: boolean;
  fallback: ReactNode;
  className?: string;
  fit?: "cover" | "contain";
};

export default function ScreenshotFrame({
  src,
  alt,
  aspect = "16/10",
  priority,
  fallback,
  className,
  fit = "cover",
}: ScreenshotFrameProps) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // If the image was already cached before React hydrated, onLoad won't fire.
  // Sync the state from the DOM once mounted.
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    if (img.complete) {
      if (img.naturalWidth > 0) setLoaded(true);
      else setFailed(true);
    }
  }, [src]);

  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      style={{ aspectRatio: aspect }}
    >
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          onError={() => setFailed(true)}
          onLoad={() => setLoaded(true)}
          className={cn(
            "absolute inset-0 h-full w-full transition-opacity duration-500",
            fit === "cover" ? "object-cover" : "object-contain",
            loaded ? "opacity-100" : "opacity-0"
          )}
        />
      )}
      {(failed || !loaded) && (
        <div
          aria-hidden={!failed}
          className={cn(
            "absolute inset-0 transition-opacity duration-500",
            failed ? "opacity-100" : loaded ? "opacity-0" : "opacity-100"
          )}
        >
          {fallback}
        </div>
      )}
    </div>
  );
}
