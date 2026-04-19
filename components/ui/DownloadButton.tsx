"use client";

import { Download, Github } from "lucide-react";
import { motion } from "framer-motion";
import { cn, formatBytes } from "@/lib/utils";
import type { ReleaseInfo } from "@/lib/github";

type DownloadButtonProps = {
  release: ReleaseInfo;
  size?: "md" | "lg";
  className?: string;
};

export default function DownloadButton({
  release,
  size = "lg",
  className,
}: DownloadButtonProps) {
  const hasDownload = !!release.downloadUrl;
  const href = release.downloadUrl ?? release.htmlUrl;

  return (
    <motion.a
      href={href}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 24 }}
      className={cn(
        "shine group relative inline-flex items-center gap-3 rounded-full font-semibold",
        "bg-gradient-to-b from-accent-strong to-accent text-white",
        "shadow-accent-glow ring-1 ring-white/20",
        "transition-shadow hover:shadow-[0_15px_60px_-8px_rgba(168,85,247,0.75)]",
        size === "lg" ? "px-7 py-4 text-base" : "px-5 py-2.5 text-sm",
        className
      )}
    >
      {hasDownload ? (
        <>
          <Download className={size === "lg" ? "h-5 w-5" : "h-4 w-4"} />
          <span className="flex flex-col leading-tight">
            <span>Download for Windows</span>
            {size === "lg" && release.version && (
              <span className="text-[11px] font-normal text-white/80">
                v{release.version}
                {release.sizeBytes
                  ? ` · ${formatBytes(release.sizeBytes)}`
                  : ""}
              </span>
            )}
          </span>
        </>
      ) : (
        <>
          <Github className={size === "lg" ? "h-5 w-5" : "h-4 w-4"} />
          <span>View releases on GitHub</span>
        </>
      )}
    </motion.a>
  );
}
