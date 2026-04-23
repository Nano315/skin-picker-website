"use client";

import { trackGithubClicked } from "@/lib/analytics";

/**
 * Client-side wrapper for a Footer link that needs to emit an analytics event
 * before opening the target URL. Keeps the parent Footer component a Server
 * Component while isolating interactivity.
 */
export default function FooterGithubLink({
  href,
  source,
  children,
  className,
}: {
  href: string;
  source: "footer" | "release_notes";
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      onClick={() => trackGithubClicked(source)}
      className={className}
    >
      {children}
    </a>
  );
}
