import type { Metadata } from "next";
import Link from "next/link";
import { getDict } from "@/lib/i18n/dict";
import ContentPage from "@/components/layout/ContentPage";

export const metadata: Metadata = {
  title: "Privacy & legal notice — LoL Skin Picker",
  description:
    "What data Skin Picker collects, what it doesn't, and who runs it. The desktop app's telemetry is opt-in and off by default; the rooms server keeps nothing on disk.",
  alternates: {
    canonical: "/privacy",
    languages: { en: "/privacy", fr: "/fr/privacy", "x-default": "/privacy" },
  },
};

export default function PrivacyPage() {
  const dict = getDict("en");

  return (
    <ContentPage
      dict={dict}
      lang="en"
      eyebrow="Privacy"
      title="Privacy & legal notice"
      intro="Skin Picker has no accounts, no profiles and no advertising. This page describes exactly what the app, the website and the rooms server each handle — and what none of them do."
      updatedLabel="Last updated 6 August 2026"
    >
      <h2>The desktop app</h2>
      <p>
        <strong>Telemetry is opt-in and off by default.</strong> On first launch
        the app asks whether you want to share anonymous usage statistics. If you
        decline — or simply close the dialog — nothing is ever sent. You can
        change your mind at any time in Settings, in both directions.
      </p>
      <p>
        If you accept, anonymous events are sent through{" "}
        <a
          href="https://aptabase.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Aptabase
        </a>
        , a privacy-focused analytics service. Those events carry a random
        identifier generated on your machine, the app version, your operating
        system and your locale. They never carry your Riot account, your summoner
        name, your PUUID, your skin collection or anything that identifies you
        personally.
      </p>
      <p>
        Everything else the app does stays on your computer. It reads the League
        Client through its local API on <code>127.0.0.1</code>. Your settings,
        exclusions and pick history are stored in local files on your machine and
        are never uploaded.
      </p>

      <h2>The rooms server</h2>
      <p>
        The premade rooms feature is the only part that involves a server, and it
        only runs while you are actually in a room.
      </p>
      <ul>
        <li>
          <strong>Nothing is stored in a database — there isn&apos;t one.</strong>{" "}
          Room state lives in the server&apos;s memory and disappears when the
          room closes or the server restarts.
        </li>
        <li>
          While a room is open, the server holds what you volunteer to share with
          your teammates: your summoner name, your account identifier (PUUID) and
          the list of skins you own <em>for the champion you locked</em>, so the
          synergy between five players can be computed.
        </li>
        <li>
          Diagnostic logs are written to disk. They contain your summoner name
          and a <strong>truncated</strong> account identifier — never the full
          one, and never the token that authenticates your actions.
        </li>
        <li>
          The server never contacts Riot. It only ever sees what a client sends
          it.
        </li>
      </ul>
      <p>
        If you never open or join a room, the server never hears from you at all.
      </p>

      <h2>This website</h2>
      <p>
        The site measures audience through Aptabase, the same service as the app.
        It records page views and a handful of interactions — which language you
        picked, whether you clicked download or the GitHub link. A random
        identifier is kept in your browser to avoid counting the same visitor
        twice.
      </p>
      <p>
        No advertising, no tracking across other websites, no social network
        widgets, no data resold to anyone. Your country is inferred from your IP
        address, which is not stored.
      </p>
      <p>
        Note, in the interest of being straight with you: unlike the app, the
        website loads this measurement without asking first. If you would rather
        it didn&apos;t, any content blocker will stop it, and the site works
        exactly the same.
      </p>

      <h2>Your rights</h2>
      <p>
        Since there is no account and no personal profile, there is generally
        nothing to give you access to, correct or erase — that is a design
        choice, not a shortcut. If you nonetheless have a question or a request
        about your data, write to me at the address below and I&apos;ll answer.
      </p>

      <h2>Legal notice</h2>
      <ul>
        <li>
          <strong>Publisher:</strong> Valentin Dumas, publishing as an individual
          on a non-professional basis.
        </li>
        <li>
          <strong>Contact:</strong>{" "}
          <a href="mailto:valentin3135@gmail.com">valentin3135@gmail.com</a>
        </li>
        <li>
          <strong>Hosting:</strong> this site is self-hosted on the
          publisher&apos;s own infrastructure, behind Cloudflare, Inc.
          (San Francisco, California, United States).
        </li>
        <li>
          <strong>Source code:</strong>{" "}
          <a
            href="https://github.com/Nano315/lol-skin-picker"
            target="_blank"
            rel="noopener noreferrer"
          >
            the app
          </a>{" "}
          and{" "}
          <a
            href="https://github.com/Nano315/skin-picker-rooms-server"
            target="_blank"
            rel="noopener noreferrer"
          >
            the rooms server
          </a>{" "}
          are open source under the MIT licence. Everything described on this
          page can be verified there.
        </li>
      </ul>

      <p>
        <Link href="/safety">
          Read how Skin Picker avoids getting you banned →
        </Link>
      </p>
      <p>
        <Link href="/">← Back to Skin Picker</Link>
      </p>
    </ContentPage>
  );
}
