const REPO = "Nano315/lol-skin-picker";
const RELEASE_URL = `https://api.github.com/repos/${REPO}/releases/latest`;

/** Workflow qui compile et publie les installeurs. Sert de preuve de
 *  provenance sur la page /download : le binaire n'est pas assemble a la main. */
const RELEASE_WORKFLOW_URL = `https://github.com/${REPO}/actions/workflows/release-front.yml`;

/** Asset depose par l'etape VirusTotal du workflow de release. */
const VT_ASSET_NAME = "virustotal.json";

export type VirusTotalReport = {
  malicious: number;
  suspicious: number;
  /** Moteurs ayant reellement rendu un avis, hors timeouts et non supportes. */
  engines: number;
  analyzedAt: string;
  permalink: string;
};

export type ReleaseInfo = {
  version: string;
  tagName: string;
  publishedAt: string;
  htmlUrl: string;
  repoUrl: string;
  workflowUrl: string;
  downloadUrl: string | null;
  fileName: string | null;
  sizeBytes: number | null;
  /** Empreinte SHA-256 de l'installeur, sans le prefixe "sha256:". */
  sha256: string | null;
  /** Verdict VirusTotal de CETTE version, ou null si absent ou perime. */
  virusTotal: VirusTotalReport | null;
};

type GhAsset = {
  name: string;
  size: number;
  browser_download_url: string;
  content_type: string;
  /** Ajoute par GitHub, de la forme "sha256:<hex>". Absent sur les vieux assets. */
  digest?: string | null;
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
 * `digest` arrive sous la forme "sha256:<hex>". On ne garde que l'hexa, et on
 * refuse tout ce qui n'est pas un SHA-256 bien forme : la valeur est affichee
 * telle quelle sur le site comme empreinte a verifier, donc mieux vaut ne rien
 * montrer que montrer quelque chose d'inattendu.
 */
function parseSha256(digest: string | null | undefined): string | null {
  if (!digest) return null;
  const hex = digest.replace(/^sha256:/i, "").trim().toLowerCase();
  return /^[0-9a-f]{64}$/.test(hex) ? hex : null;
}

/**
 * Lit le verdict VirusTotal attache a la release par la CI de l'app.
 *
 * Le rapport est ecarte s'il ne porte pas sur l'empreinte de l'installeur
 * reellement propose : un asset oublie d'une version precedente decrirait un
 * autre binaire, et le site afficherait un verdict qui ne concerne pas le
 * fichier telecharge. C'est le seul scenario ou ce lien serait pire que rien.
 */
async function fetchVirusTotalReport(
  assets: GhAsset[],
  installerSha256: string | null
): Promise<VirusTotalReport | null> {
  if (!installerSha256) return null;
  const asset = assets.find((a) => a.name === VT_ASSET_NAME);
  if (!asset) return null;

  try {
    const res = await fetch(asset.browser_download_url, {
      next: { revalidate: 600 },
    });
    if (!res.ok) return null;

    const data = (await res.json()) as Record<string, unknown>;
    const sha =
      typeof data.sha256 === "string" ? data.sha256.toLowerCase() : null;
    if (sha !== installerSha256) return null;

    const malicious = Number(data.malicious);
    const suspicious = Number(data.suspicious);
    const engines = Number(data.engines);
    if (
      !Number.isFinite(malicious) ||
      !Number.isFinite(suspicious) ||
      !Number.isFinite(engines) ||
      engines <= 0
    ) {
      return null;
    }

    return {
      malicious,
      suspicious,
      engines,
      analyzedAt: typeof data.analyzedAt === "string" ? data.analyzedAt : "",
      // Reconstruit a partir de l'empreinte plutot que repris du fichier :
      // l'URL ne peut donc pas pointer ailleurs que sur VirusTotal.
      permalink: `https://www.virustotal.com/gui/file/${installerSha256}`,
    };
  } catch {
    return null;
  }
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
    workflowUrl: RELEASE_WORKFLOW_URL,
    downloadUrl: null,
    fileName: null,
    sizeBytes: null,
    sha256: null,
    virusTotal: null,
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
    const sha256 = parseSha256(installer?.digest);
    const virusTotal = await fetchVirusTotalReport(data.assets ?? [], sha256);

    return {
      version,
      tagName: data.tag_name ?? "",
      publishedAt: data.published_at ?? "",
      htmlUrl: data.html_url ?? fallback.htmlUrl,
      repoUrl: fallback.repoUrl,
      workflowUrl: RELEASE_WORKFLOW_URL,
      downloadUrl: installer?.browser_download_url ?? null,
      fileName: installer?.name ?? null,
      sizeBytes: installer?.size ?? null,
      sha256,
      virusTotal,
    };
  } catch {
    return fallback;
  }
}
