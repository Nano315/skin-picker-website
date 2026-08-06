import type { Metadata } from "next";
import Link from "next/link";
import { getDict } from "@/lib/i18n/dict";
import ContentPage from "@/components/layout/ContentPage";

export const metadata: Metadata = {
  title:
    "Un skin changer LoL fait-il bannir ? En quoi Skin Picker est différent — LoL Skin Picker",
  description:
    "Les skin changers qui débloquent des skins non possédés font bannir. Skin Picker n'en est pas un : il passe par l'API locale du client League et ne tire que parmi les skins que vous possédez déjà. Voici la différence technique, sourcée.",
  alternates: {
    canonical: "/fr/safety",
    languages: { en: "/safety", fr: "/fr/safety", "x-default": "/safety" },
  },
  openGraph: {
    title: "Un skin changer LoL fait-il bannir ? En quoi Skin Picker est différent",
    description:
      "La différence technique entre un skin changer et un outil qui passe par l'API du client, sourcée sur la documentation de Riot.",
    type: "article",
    locale: "fr_FR",
  },
};

export default function SafetyPageFr() {
  const dict = getDict("fr");

  return (
    <ContentPage
      dict={dict}
      lang="fr"
      eyebrow="Sécurité"
      title="Est-ce que Skin Picker peut te faire bannir ?"
      intro="Non — et tu ne devrais pas me croire sur parole. Skin Picker ne touche aucun fichier de jeu, n'injecte aucun code, ne lit jamais la mémoire, et ne peut sélectionner que des cosmétiques que ton compte possède déjà. Voici exactement comment il fonctionne, ce que dit la documentation de Riot, et la part que je ne peux pas te garantir."
      updatedLabel="Mis à jour le 6 août 2026"
    >
      <h2>La réponse courte</h2>
      <p>
        Skin Picker parle au <strong>client League</strong> via l&apos;API locale
        que le client expose lui-même, sur ta propre machine. Quand il tire un
        skin, il envoie la même requête que le client envoie quand tu cliques ce
        skin toi-même. Il ne peut pas sélectionner un skin que tu ne possèdes
        pas, puisqu&apos;il lit ta collection et ne tire que dedans.
      </p>
      <p>
        Ce qui fait bannir, c&apos;est une catégorie d&apos;outils
        fondamentalement différente : les <strong>skin changers</strong>, qui
        affichent des skins non achetés. Pour y arriver, ils doivent modifier les
        fichiers du jeu ou injecter du code dans le processus en cours
        d&apos;exécution — précisément ce que l&apos;anti-triche est conçu pour
        détecter.
      </p>

      <h2>Les trois catégories, et où se situe chacune</h2>
      <table>
        <thead>
          <tr>
            <th>Fonctionnement</th>
            <th>Modifie le jeu</th>
            <th>Affiche du contenu non possédé</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Injection mémoire</strong> — du code injecté dans le
              processus du jeu
            </td>
            <td>Oui</td>
            <td>Oui</td>
            <td>Détecté et sanctionné</td>
          </tr>
          <tr>
            <td>
              <strong>Remplacement de fichiers</strong> — modèles ou textures
              échangés sur le disque
            </td>
            <td>Oui</td>
            <td>Oui</td>
            <td>Contraire aux conditions d&apos;utilisation</td>
          </tr>
          <tr>
            <td>
              <strong>API du client</strong> — demander au client League de
              changer ta propre sélection
            </td>
            <td>Non</td>
            <td>Non</td>
            <td>Ce que fait Skin Picker</td>
          </tr>
        </tbody>
      </table>
      <p>
        Les deux premières changent ce que voient <em>les autres joueurs</em>, ou
        affichent du contenu qui n&apos;a jamais été acheté. La troisième ne
        change rien qu&apos;un joueur ne pourrait changer en cliquant dans le
        client — elle le fait juste plus vite, et avec un coup de dé.
      </p>

      <h2>Ce que dit la documentation de Riot</h2>
      <p>
        À l&apos;arrivée de Vanguard sur League of Legends, Riot a publié une FAQ
        destinée aux développeurs tiers. Deux phrases comptent ici. Les apps
        construites sur l&apos;API du client, y lit-on, «&nbsp;are still expected
        to work&nbsp;». Et : «&nbsp;External tools reading memory will no longer
        work.&nbsp;» C&apos;est là que passe la ligne — pas entre «&nbsp;outils
        tiers&nbsp;» et «&nbsp;aucun outil&nbsp;», mais entre les outils qui
        utilisent l&apos;interface locale officielle et ceux qui lisent ou
        modifient le jeu.
      </p>
      <p>
        Tu peux lire cette page toi-même plutôt que me croire :{" "}
        <a
          href="https://www.riotgames.com/en/DevRel/vanguard-faq"
          target="_blank"
          rel="noopener noreferrer"
        >
          la FAQ Vanguard de Riot pour les développeurs
        </a>
        .
      </p>
      <p>
        Skin Picker est par ailleurs{" "}
        <strong>enregistré sur le Riot Developer Portal</strong>, où les endpoints
        qu&apos;il utilise sont déclarés. Cet enregistrement est actuellement en
        cours d&apos;examen. Pour être précis sur ce que ça veut dire et ne veut
        pas dire : enregistrer un produit n&apos;est pas une approbation, et Riot
        écrit explicitement que cela «&nbsp;does not constitute endorsement,
        certification or approval&nbsp;». Ça veut dire que Riot sait que le
        produit existe et ce qu&apos;il fait.
      </p>

      <h2>Ce que Skin Picker ne fera jamais</h2>
      <ul>
        <li>Modifier, remplacer ou patcher un fichier de jeu</li>
        <li>Injecter du code dans le jeu ou lire sa mémoire</li>
        <li>
          T&apos;afficher, ou afficher à quelqu&apos;un d&apos;autre, un skin que
          ton compte ne possède pas
        </li>
        <li>Automatiser quoi que ce soit dans la façon dont la partie se joue</li>
        <li>Révéler une information que le client ne te montre pas déjà</li>
      </ul>
      <p>
        Le code source est public, donc rien de tout ça n&apos;a besoin
        d&apos;être pris pour argent comptant —{" "}
        <a
          href="https://github.com/Nano315/lol-skin-picker"
          target="_blank"
          rel="noopener noreferrer"
        >
          lis-le sur GitHub
        </a>
        .
      </p>

      <h2>Ce que je ne peux pas te garantir</h2>
      <p>
        Toutes les pages que tu trouveras sur le sujet t&apos;affirment que
        c&apos;est sûr à 100&nbsp;%. La plupart cherchent à te vendre un compte.
        Voici la version honnête.
      </p>
      <ul>
        <li>
          <strong>Riot n&apos;a aucune liste blanche.</strong> Ils l&apos;ont dit
          clairement : aucun outil tiers n&apos;est whitelisté, le mien compris.
          Il n&apos;existe aucun certificat que je puisse te montrer.
        </li>
        <li>
          <strong>L&apos;API du client n&apos;est pas officiellement
          supportée.</strong> Riot la documente comme non supportée pour un usage
          tiers et ne garantit pas qu&apos;elle continuera de fonctionner. Une
          mise à jour du client pourrait casser Skin Picker sans prévenir —
          c&apos;est un risque de fonctionnement, pas un risque de bannissement,
          mais il est réel.
        </li>
        <li>
          <strong>Les règles changent.</strong> Ce qui est acceptable aujourd&apos;hui
          a été écrit par Riot et peut être réécrit par Riot. Si elles bougent,
          l&apos;app s&apos;y conforme ou s&apos;arrête.
        </li>
        <li>
          <strong>Je ne suis pas Riot.</strong> Rien ici n&apos;est une garantie
          délivrée en leur nom. C&apos;est la description de ce que fait le
          logiciel, que tu peux vérifier dans le code.
        </li>
      </ul>

      <h2>Et l&apos;avertissement Windows ?</h2>
      <p>
        L&apos;installateur n&apos;est pas encore signé avec un certificat payant,
        donc SmartScreen affiche un avertissement — comme pour tout programme non
        signé, quel que soit son contenu. C&apos;est une information sur un
        certificat, pas sur le logiciel. Chaque version est construite
        automatiquement depuis le dépôt public par GitHub Actions : ce que tu
        télécharges correspond donc à du code source que tu peux lire. La
        signature de code est en cours.
      </p>

      <p>
        <Link href="/fr">← Retour à Skin Picker</Link>
      </p>
    </ContentPage>
  );
}
