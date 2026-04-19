const REPO = "Nano315/lol-skin-picker";
const RELEASE_URL = `https://api.github.com/repos/${REPO}/releases/latest`;

export type ReleaseInfo = {
  version: string;
  tagName: string;
  publishedAt: string;
  htmlUrl: string;
  repoUrl: string;
  downloadUrl: string | null;
  fileName: string | null;
  sizeBytes: number | null;
};

type GhAsset = {
  name: string;
  size: number;
  browser_download_url: string;
  content_type: string;
};

type GhRelease = {
  tag_name: string;
  name: string | null;
  published_at: string;
  html_url: string;
  prerelease: boolean;
  draft: boolean;
  assets: GhAsset[];
};

function pickWindowsInstaller(assets: GhAsset[]): GhAsset | null {
  const installers = assets.filter(
    (a) =>
      a.name.toLowerCase().endsWith(".exe") &&
      !a.name.toLowerCase().endsWith(".blockmap")
  );
  if (installers.length === 0) return null;
  const setup = installers.find((a) => /setup/i.test(a.name));
  return setup ?? installers[0];
}

/**
 * Fetch the latest non-prerelease release from GitHub.
 * The `/releases/latest` endpoint already excludes prereleases and drafts.
 * Server-side only — called from Server Components with ISR.
 */
export async function fetchLatestRelease(): Promise<ReleaseInfo> {
  const fallback: ReleaseInfo = {
    version: "",
    tagName: "",
    publishedAt: "",
    htmlUrl: `https://github.com/${REPO}/releases/latest`,
    repoUrl: `https://github.com/${REPO}`,
    downloadUrl: null,
    fileName: null,
    sizeBytes: null,
  };

  try {
    const res = await fetch(RELEASE_URL, {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
      next: { revalidate: 600 },
    });

    if (!res.ok) return fallback;

    const data = (await res.json()) as GhRelease;
    if (data.prerelease || data.draft) return fallback;

    const installer = pickWindowsInstaller(data.assets ?? []);
    const version = (data.tag_name ?? "").replace(/^v/i, "");

    return {
      version,
      tagName: data.tag_name ?? "",
      publishedAt: data.published_at ?? "",
      htmlUrl: data.html_url ?? fallback.htmlUrl,
      repoUrl: fallback.repoUrl,
      downloadUrl: installer?.browser_download_url ?? null,
      fileName: installer?.name ?? null,
      sizeBytes: installer?.size ?? null,
    };
  } catch {
    return fallback;
  }
}
