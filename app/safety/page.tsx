import type { Metadata } from "next";
import Link from "next/link";
import { getDict } from "@/lib/i18n/dict";
import ContentPage from "@/components/layout/ContentPage";

export const metadata: Metadata = {
  // Cible l'intention de recherche reelle ("is a lol skin changer bannable"),
  // pas le nom du produit : c'est la question que les joueurs tapent avant
  // d'installer quoi que ce soit qui touche au client.
  title:
    "Is a LoL skin changer bannable? How Skin Picker is different | LoL Skin Picker",
  description:
    "Skin changers that unlock skins you don't own get accounts banned. Skin Picker isn't one: it goes through the League Client's own local API and only ever picks among skins you already own. The technical difference, sourced from Riot's documentation.",
  alternates: {
    canonical: "/safety",
    languages: { en: "/safety", fr: "/fr/safety", "x-default": "/safety" },
  },
  openGraph: {
    title: "Is a LoL skin changer bannable? How Skin Picker is different",
    description:
      "The technical difference between a skin changer and a client-API tool, sourced from Riot's documentation.",
    type: "article",
  },
};

export default function SafetyPage() {
  const dict = getDict("en");

  return (
    <ContentPage
      dict={dict}
      lang="en"
      eyebrow="Safety"
      title="Can Skin Picker get you banned?"
      intro="No, and you shouldn't take my word for it either. Skin Picker never touches a game file, never injects code, never reads game memory, and can only ever select cosmetics your account already owns. Here's how it works, what Riot's documentation actually says, and the parts I can't promise you."
      updatedLabel="Last updated 6 August 2026"
    >
      <h2>The short answer</h2>
      <p>
        Skin Picker talks to the <strong>League Client</strong> through the local
        API the client itself exposes on your own machine. When it rolls a skin,
        it sends the same request the client sends when you click that skin
        yourself. It cannot select a skin you don&apos;t own, because it reads
        your collection and only rolls from what&apos;s in it.
      </p>
      <p>
        What gets accounts banned is a different category of tool entirely:{" "}
        <strong>skin changers</strong>, which display skins you have not
        purchased. To do that they have to modify the game&apos;s files or inject
        code into the running game. That is precisely what anti-cheat is built to
        detect.
      </p>

      <h2>The three categories, and where each one stands</h2>
      <table>
        <thead>
          <tr>
            <th>How it works</th>
            <th>Modifies the game</th>
            <th>Shows content you don&apos;t own</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Memory injection</strong>: code injected into the running
              game process
            </td>
            <td>Yes</td>
            <td>Yes</td>
            <td>Detected and actioned</td>
          </tr>
          <tr>
            <td>
              <strong>Game file replacement</strong>: model or texture files
              swapped on disk
            </td>
            <td>Yes</td>
            <td>Yes</td>
            <td>Against the terms of use</td>
          </tr>
          <tr>
            <td>
              <strong>Client API</strong>: asking the League Client to change
              your own selection
            </td>
            <td>No</td>
            <td>No</td>
            <td>What Skin Picker does</td>
          </tr>
        </tbody>
      </table>
      <p>
        The first two change what <em>other players</em> see, or show you content
        that was never bought. The third changes nothing a player couldn&apos;t
        change by clicking around in the client. It just does it faster, and at
        random.
      </p>

      <h2>What Riot&apos;s own documentation says</h2>
      <p>
        When Vanguard arrived in League of Legends, Riot published a FAQ for
        third-party developers. Two sentences matter here. Apps built on the
        client API, it says, &ldquo;are still expected to work&rdquo;. And:
        &ldquo;External tools reading memory will no longer work.&rdquo; That is
        where the line sits. Not third-party tools on one side and no tools on
        the other, but tools that go through the official local interface against
        tools that read or modify the game.
      </p>
      <p>
        You can read that page yourself rather than take my word for it:{" "}
        <a
          href="https://www.riotgames.com/en/DevRel/vanguard-faq"
          target="_blank"
          rel="noopener noreferrer"
        >
          Riot&apos;s Vanguard FAQ for developers
        </a>
        .
      </p>
      <p>
        Skin Picker is also <strong>registered on the Riot Developer Portal</strong>,
        where the endpoints it uses are declared. That registration is currently
        under review. Don&apos;t read more into it than there is: Riot says
        plainly that registering &ldquo;does not constitute endorsement,
        certification or approval&rdquo;. It means Riot knows the product exists
        and knows what it does.
      </p>

      <h2>What Skin Picker will never do</h2>
      <ul>
        <li>Modify, replace or patch any game file</li>
        <li>Inject code into the game or read its memory</li>
        <li>Show you, or anyone else, a skin your account doesn&apos;t own</li>
        <li>Automate anything about how the game is played</li>
        <li>Reveal information the client doesn&apos;t already show you</li>
      </ul>
      <p>
        The source code is public, so none of this has to be taken on trust:{" "}
        <a
          href="https://github.com/Nano315/lol-skin-picker"
          target="_blank"
          rel="noopener noreferrer"
        >
          read it on GitHub
        </a>
        .
      </p>

      <h2>What I can&apos;t promise you</h2>
      <p>
        Every other page on this subject swears the thing is 100% safe. Most of
        them are trying to sell you an account. So, honestly:
      </p>
      <ul>
        <li>
          <strong>Riot has no allow-list.</strong> No third-party tool is
          whitelisted, mine included. There is no certificate I can show you.
        </li>
        <li>
          <strong>The client API is not officially supported.</strong> Riot
          documents it as unsupported for third-party use and offers no guarantee
          it will keep working. A client update could break Skin Picker
          overnight. That&apos;s a risk to whether it works, not to your account,
          but it&apos;s real.
        </li>
        <li>
          <strong>Policies change.</strong> What&apos;s acceptable today was
          written by Riot and can be rewritten by Riot. If the rules move, this
          app follows them or stops.
        </li>
        <li>
          <strong>I am not Riot.</strong> Nothing here is a guarantee issued on
          their behalf. It&apos;s a description of what the software does, which
          you can verify in the source.
        </li>
      </ul>

      <h2>What about the Windows warning?</h2>
      <p>
        The installer isn&apos;t signed with a paid certificate yet, so
        SmartScreen warns about it, the way it warns about any unsigned program,
        whatever that program contains. The warning is about a certificate, not
        about the software. Every release is built automatically from the public
        repository by GitHub Actions, so what you download matches source code
        you can read. A signing certificate is on the list.
      </p>

      <p>
        <Link href="/">← Back to Skin Picker</Link>
      </p>
    </ContentPage>
  );
}
