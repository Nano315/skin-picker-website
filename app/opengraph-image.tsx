import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { fetchLatestRelease } from "@/lib/github";

export const runtime = "nodejs";
export const revalidate = 600;

export const alt =
  "Skin Picker — Auto-roll and sync League of Legends skins in champ select";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// `public/` is served by the CDN and not copied into Vercel's serverless
// bundle, so the logo lives in `app/og-logo.png`. At runtime we read it from
// the source path; `outputFileTracingIncludes` in next.config.mjs tells Vercel
// to ship this file with the /opengraph-image function.
async function getLogoDataUrl(): Promise<string | null> {
  try {
    const filePath = join(process.cwd(), "app", "og-logo.png");
    const buf = await readFile(filePath);
    return `data:image/png;base64,${buf.toString("base64")}`;
  } catch (err) {
    console.error("[og] logo load failed:", err);
    return null;
  }
}

export default async function OGImage() {
  const [release, logo] = await Promise.all([
    fetchLatestRelease(),
    getLogoDataUrl(),
  ]);

  const badge = release.version ? `v${release.version}` : "Free · Open source";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: 72,
          color: "#f8fafc",
          backgroundColor: "#09090b",
          backgroundImage:
            "radial-gradient(ellipse at 22% 18%, rgba(139,92,246,0.38), transparent 55%), radial-gradient(ellipse at 88% 92%, rgba(168,85,247,0.22), transparent 60%)",
        }}
      >
        {/* Top row: brand + version pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            {logo ? (
              // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
              <img
                src={logo}
                width={56}
                height={56}
                style={{
                  borderRadius: 14,
                  boxShadow: "0 10px 40px -10px rgba(168,85,247,0.8)",
                }}
              />
            ) : (
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 28,
                  fontWeight: 800,
                  color: "white",
                  backgroundImage:
                    "linear-gradient(135deg, #a855f7, #6366f1)",
                  boxShadow: "0 10px 40px -10px rgba(168,85,247,0.8)",
                }}
              >
                SP
              </div>
            )}
            <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: -0.2 }}>
              Skin Picker
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 20,
              padding: "10px 18px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.14)",
              backgroundColor: "rgba(255,255,255,0.04)",
              color: "rgba(248,250,252,0.85)",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                backgroundColor: "#a855f7",
                boxShadow: "0 0 12px rgba(168,85,247,0.9)",
              }}
            />
            {badge}
          </div>
        </div>

        {/* Spacer */}
        <div style={{ display: "flex", flex: 1 }} />

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: -3,
            }}
          >
            Your next skin,
          </div>
          <div
            style={{
              fontSize: 92,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: -3,
              backgroundImage:
                "linear-gradient(120deg, #ffffff 35%, #c084fc 75%, #a855f7 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            already picked.
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 32,
              fontSize: 28,
              lineHeight: 1.4,
              color: "rgba(248,250,252,0.72)",
              maxWidth: 960,
            }}
          >
            Auto-roll, reroll and synchronize LoL skins with your team in champ
            select. Free, open-source, Windows.
          </div>
        </div>

        {/* Spacer */}
        <div style={{ display: "flex", flex: 1 }} />

        {/* Bottom row: chips */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {[
            "Auto-roll on lock",
            "Team color sync",
            "Skin Line sync",
            "Runs in the tray",
          ].map((label) => (
            <div
              key={label}
              style={{
                display: "flex",
                padding: "12px 20px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.1)",
                backgroundColor: "rgba(255,255,255,0.035)",
                fontSize: 22,
                color: "rgba(248,250,252,0.88)",
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
