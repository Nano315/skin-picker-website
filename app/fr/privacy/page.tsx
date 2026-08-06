import type { Metadata } from "next";
import Link from "next/link";
import { getDict } from "@/lib/i18n/dict";
import ContentPage from "@/components/layout/ContentPage";

export const metadata: Metadata = {
  title: "Confidentialité & mentions légales — LoL Skin Picker",
  description:
    "Quelles données Skin Picker collecte, lesquelles il ne collecte pas, et qui l'édite. La télémétrie de l'app est opt-in et désactivée par défaut ; le serveur rooms ne garde rien sur disque.",
  alternates: {
    canonical: "/fr/privacy",
    languages: { en: "/privacy", fr: "/fr/privacy", "x-default": "/privacy" },
  },
};

export default function PrivacyPageFr() {
  const dict = getDict("fr");

  return (
    <ContentPage
      dict={dict}
      lang="fr"
      eyebrow="Confidentialité"
      title="Confidentialité & mentions légales"
      intro="Skin Picker n'a ni compte, ni profil, ni publicité. Cette page décrit exactement ce que traitent l'application, le site et le serveur de rooms — et ce qu'aucun des trois ne fait."
      updatedLabel="Mis à jour le 6 août 2026"
    >
      <h2>L&apos;application</h2>
      <p>
        <strong>La télémétrie est opt-in et désactivée par défaut.</strong> Au
        premier lancement, l&apos;app te demande si tu acceptes de partager des
        statistiques d&apos;usage anonymes. Si tu refuses — ou si tu fermes
        simplement la fenêtre — rien n&apos;est jamais envoyé. Tu peux changer
        d&apos;avis à tout moment dans les réglages, dans les deux sens.
      </p>
      <p>
        Si tu acceptes, des événements anonymes transitent par{" "}
        <a
          href="https://aptabase.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Aptabase
        </a>
        , un service d&apos;analytics respectueux de la vie privée. Ces événements
        portent un identifiant aléatoire généré sur ta machine, la version de
        l&apos;app, ton système d&apos;exploitation et ta langue. Ils ne portent
        jamais ton compte Riot, ton nom d&apos;invocateur, ton PUUID, ta
        collection de skins, ni quoi que ce soit qui t&apos;identifie
        personnellement.
      </p>
      <p>
        Tout le reste de ce que fait l&apos;app reste sur ton ordinateur. Elle lit
        le client League via son API locale sur <code>127.0.0.1</code>. Tes
        réglages, tes exclusions et ton historique de tirages sont stockés dans
        des fichiers locaux et ne sont jamais envoyés nulle part.
      </p>

      <h2>Le serveur de rooms</h2>
      <p>
        La fonctionnalité de rooms premade est la seule qui implique un serveur,
        et il n&apos;intervient que pendant que tu es effectivement dans une room.
      </p>
      <ul>
        <li>
          <strong>Rien n&apos;est stocké en base de données — il n&apos;y en a
          pas.</strong> L&apos;état des rooms vit dans la mémoire du serveur et
          disparaît à la fermeture de la room ou au redémarrage du serveur.
        </li>
        <li>
          Pendant qu&apos;une room est ouverte, le serveur détient ce que tu
          acceptes de partager avec tes coéquipiers : ton nom d&apos;invocateur,
          ton identifiant de compte (PUUID) et la liste des skins que tu possèdes{" "}
          <em>pour le champion que tu as lock</em>, afin de calculer la synergie
          entre les cinq joueurs.
        </li>
        <li>
          Des logs de diagnostic sont écrits sur disque. Ils contiennent ton nom
          d&apos;invocateur et un identifiant de compte <strong>tronqué</strong> —
          jamais l&apos;identifiant complet, et jamais le jeton qui authentifie
          tes actions.
        </li>
        <li>
          Le serveur ne contacte jamais Riot. Il ne voit que ce qu&apos;un client
          lui envoie.
        </li>
      </ul>
      <p>
        Si tu n&apos;ouvres ni ne rejoins jamais de room, le serveur
        n&apos;entend jamais parler de toi.
      </p>

      <h2>Ce site</h2>
      <p>
        Le site mesure son audience via Aptabase, le même service que
        l&apos;application. Il enregistre les pages vues et quelques interactions
        — la langue choisie, un clic sur le téléchargement ou sur le lien GitHub.
        Un identifiant aléatoire est conservé dans ton navigateur pour éviter de
        compter deux fois le même visiteur.
      </p>
      <p>
        Aucune publicité, aucun suivi entre différents sites, aucun widget de
        réseau social, aucune donnée revendue à qui que ce soit. Ton pays est
        déduit de ton adresse IP, qui n&apos;est pas conservée.
      </p>
      <p>
        Précision, par souci d&apos;honnêteté : contrairement à
        l&apos;application, le site charge cette mesure sans te demander ton
        accord au préalable. Si tu préfères l&apos;éviter, n&apos;importe quel
        bloqueur de contenu la neutralise, et le site fonctionne exactement
        pareil.
      </p>

      <h2>Tes droits</h2>
      <p>
        Comme il n&apos;y a ni compte ni profil personnel, il n&apos;y a
        généralement rien à te donner, corriger ou effacer — c&apos;est un choix
        de conception, pas un raccourci. Si tu as malgré tout une question ou une
        demande concernant tes données, écris-moi à l&apos;adresse ci-dessous et
        j&apos;y répondrai.
      </p>

      <h2>Mentions légales</h2>
      <ul>
        <li>
          <strong>Éditeur :</strong> Valentin Dumas, éditant à titre de personne
          physique et non professionnel.
        </li>
        <li>
          <strong>Contact :</strong>{" "}
          <a href="mailto:valentin3135@gmail.com">valentin3135@gmail.com</a>
        </li>
        <li>
          <strong>Hébergement :</strong> ce site est auto-hébergé sur
          l&apos;infrastructure de l&apos;éditeur, derrière Cloudflare, Inc.
          (San Francisco, Californie, États-Unis).
        </li>
        <li>
          <strong>Code source :</strong>{" "}
          <a
            href="https://github.com/Nano315/lol-skin-picker"
            target="_blank"
            rel="noopener noreferrer"
          >
            l&apos;application
          </a>{" "}
          et{" "}
          <a
            href="https://github.com/Nano315/skin-picker-rooms-server"
            target="_blank"
            rel="noopener noreferrer"
          >
            le serveur de rooms
          </a>{" "}
          sont open source sous licence MIT. Tout ce que décrit cette page peut y
          être vérifié.
        </li>
      </ul>

      <p>
        <Link href="/fr/safety">
          Lire pourquoi Skin Picker ne te fera pas bannir →
        </Link>
      </p>
      <p>
        <Link href="/fr">← Retour à Skin Picker</Link>
      </p>
    </ContentPage>
  );
}
