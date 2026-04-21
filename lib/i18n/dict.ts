import type { Lang } from "./types";

export type Dict = {
  nav: {
    features: string;
    install: string;
    download: string;
  };
  hero: {
    latestRelease: string;
    checkGithub: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    viewGithub: string;
    free: string;
    autoUpdates: string;
    updated: string;
    screenshotAlt: string;
  };
  download: {
    forWindows: string;
    viewReleases: string;
  };
  features: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    solo: {
      eyebrow: string;
      title: string;
      body: string;
      bullets: {
        autoRoll: { title: string; body: string };
        reroll: { title: string; body: string };
        weighted: { title: string; body: string };
        history: { title: string; body: string };
      };
      screenshotAlt: string;
    };
    rooms: {
      eyebrow: string;
      titleLine1: string;
      titleLine2: string;
      body: string;
      bullets: {
        live: { title: string; body: string };
        color: { title: string; body: string };
        skinLine: { title: string; body: string };
        autoApply: { title: string; body: string };
      };
      screenshotAlt: string;
    };
  };
  install: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: Array<{
      n: string;
      title: string;
      body: string;
      screenshotAlt: string;
    }>;
    transparencyLabel: string;
    transparencyBody: string;
  };
  cta: {
    title: string;
    subtitle: string;
    releaseNotes: string;
    stats: {
      version: string;
      size: string;
      released: string;
      platform: string;
      platformValue: string;
    };
  };
  footer: {
    tagline: string;
    productHeader: string;
    projectHeader: string;
    productLinks: { features: string; download: string; install: string };
    projectLinks: { github: string; releases: string; issues: string };
    copyright: string;
    disclaimer: string;
  };
  winPlaceholder: {
    title: string;
    description: string;
    app: string;
    publisher: string;
    publisherUnknown: string;
    moreInfo: string;
    runAnyway: string;
    dontRun: string;
    installed: string;
    installedNote: string;
  };
  languageSwitcher: {
    label: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: Array<{ q: string; a: string }>;
  };
};

const en: Dict = {
  nav: {
    features: "Features",
    install: "Install guide",
    download: "Download",
  },
  hero: {
    latestRelease: "Latest release",
    checkGithub: "Check GitHub",
    titleLine1: "Your next skin,",
    titleLine2: "already picked.",
    subtitle:
      "Stop arguing about skins during draft. Let Skin Picker auto-pick and sync your whole team in seconds.",
    viewGithub: "View on GitHub",
    free: "Free & open-source",
    autoUpdates: "Auto-updates built-in",
    updated: "Updated",
    screenshotAlt:
      "Skin Picker app home screen with bento grid and champion skin preview",
  },
  download: {
    forWindows: "Download for Windows",
    viewReleases: "View releases on GitHub",
  },
  features: {
    eyebrow: "What it does",
    titleLine1: "Two modes. One goal:",
    titleLine2: "skins you actually want to see.",
    solo: {
      eyebrow: "Solo",
      title: "The skin lottery, finally won.",
      body: "Lock your champion and Skin Picker rolls a skin and chroma you own — instantly. Reroll anytime, favor the skins you love, bury the ones you don't. History-aware: it won't throw you the same skin three games in a row.",
      bullets: {
        autoRoll: {
          title: "Auto-roll on lock",
          body: "Skin and chroma rolled the moment you lock in.",
        },
        reroll: {
          title: "One-click reroll",
          body: "Reroll skin or chroma independently — as many times as you want.",
        },
        weighted: {
          title: "Weighted priorities",
          body: "Favorites roll ×3, deprioritized skins ×0.3. Persisted per champion.",
        },
        history: {
          title: "History-aware",
          body: "Avoids your last N picks so every game feels fresh.",
        },
      },
      screenshotAlt:
        "Skin Picker solo experience with live skin preview and reroll controls",
    },
    rooms: {
      eyebrow: "Rooms · Multiplayer",
      titleLine1: "Coordinated skins,",
      titleLine2: "no Discord needed.",
      body: "Create a room, share a 6-char code with your team, and watch everyone sync in real-time. Pick a color — everybody matches. Pick a Skin Line — everybody goes PROJECT, Star Guardian or Arcana together. The server auto-applies combos when the lobby is ready.",
      bullets: {
        live: {
          title: "Up to 5 players, live",
          body: "Live dashboard with everyone's current pick.",
        },
        color: {
          title: "Color sync",
          body: "Owner picks a theme (Blue, Red, Golden…) — teammates' chromas align.",
        },
        skinLine: {
          title: "Skin Line sync",
          body: "Detects coverage of thematic lines (PROJECT, Star Guardian…) and picks coordinated combos.",
        },
        autoApply: {
          title: "Auto-apply",
          body: "Once every member has locked, the best combo applies itself.",
        },
      },
      screenshotAlt:
        "Skin Picker Rooms multiplayer view with team members and Skin Line synergies",
    },
  },
  install: {
    eyebrow: "Install in 30 seconds",
    title: "About the Windows warning",
    intro:
      "Skin Picker is a small personal project, not signed with a paid Microsoft certificate yet. Windows shows a safety warning for any unsigned app — it doesn't mean the app is unsafe. Here's how to get through it.",
    steps: [
      {
        n: "01",
        title: "Run the installer",
        body: "Double-click the file you just downloaded. Windows SmartScreen will show a warning screen because the app isn't code-signed yet — that's normal at this stage.",
        screenshotAlt: "Step 01 — Windows SmartScreen warning screen",
      },
      {
        n: "02",
        title: "Click \u201cMore info\u201d",
        body: "SmartScreen hides the Run button by default. Click the small \u201cMore info\u201d link — the publisher details then expand and the Run anyway button appears.",
        screenshotAlt: "Step 02 — More info link revealing Run anyway button",
      },
      {
        n: "03",
        title: "Click \u201cRun anyway\u201d",
        body: "The installer launches and sets up Skin Picker like any other Windows app. From now on, updates are automatic — no more warning, no more re-download.",
        screenshotAlt: "Step 03 — App installed, auto-updates handled",
      },
    ],
    transparencyLabel: "Transparency:",
    transparencyBody:
      "the entire source code is public on GitHub. You can read it, build it yourself, or audit every release. The installer is published automatically from the repo via GitHub Actions — no manual handling, no hidden binaries.",
  },
  cta: {
    title: "Ready to roll?",
    subtitle:
      "One installer, then the app keeps itself up to date. Windows 10 & 11.",
    releaseNotes: "Release notes",
    stats: {
      version: "Version",
      size: "Size",
      released: "Released",
      platform: "Platform",
      platformValue: "Windows 10/11",
    },
  },
  footer: {
    tagline:
      "An open-source Windows app that auto-picks, rerolls and synchronizes League of Legends skins with your team during champ select.",
    productHeader: "Product",
    projectHeader: "Project",
    productLinks: {
      features: "Features",
      download: "Download",
      install: "Install guide",
    },
    projectLinks: {
      github: "GitHub",
      releases: "Releases",
      issues: "Report an issue",
    },
    copyright: "© {year} Skin Picker. Free & open-source.",
    disclaimer:
      "Skin Picker isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends.",
  },
  winPlaceholder: {
    title: "Windows protected your PC",
    description:
      "Microsoft Defender SmartScreen prevented an unrecognized app from starting.",
    app: "App",
    publisher: "Publisher",
    publisherUnknown: "Unknown publisher",
    moreInfo: "More info",
    runAnyway: "Run anyway",
    dontRun: "Don't run",
    installed: "Installed!",
    installedNote: "Auto-updates handled by the app.",
  },
  languageSwitcher: {
    label: "Language",
  },
  faq: {
    eyebrow: "Safety & FAQ",
    title: "Honest answers.",
    items: [
      {
        q: "Can Skin Picker get me banned?",
        a: "No. Skin Picker only communicates with the League Client through Riot's official LCU WebSocket/REST API — the same interface used by every approved third-party tool. It doesn't inject code, doesn't modify game files, and has zero interaction with Vanguard. Riot has publicly stated that LCU-based tools are permitted.",
      },
      {
        q: "Why does Windows show a red security popup?",
        a: "The installer isn't yet signed with a paid Microsoft code-signing certificate. Windows shows this warning for any unsigned executable, regardless of what it actually does — it's not a verdict on the app's safety. Click \"More info\" → \"Run anyway\" to proceed. If you'd rather verify yourself, the entire source code is public on GitHub.",
      },
      {
        q: "Does it work while I'm in-game?",
        a: "No. Skin Picker is only active during champion select (draft phase). Once the match starts it goes completely silent — no background processes affecting your FPS, no network calls, nothing.",
      },
      {
        q: "Is any data collected?",
        a: "No telemetry by default. The only network traffic the app generates is local calls to Riot's LCU and, when you're in a Room session, a connection to the Rooms server to sync picks with your team. No analytics, no tracking, no third-party SDKs.",
      },
    ],
  },
};

const fr: Dict = {
  nav: {
    features: "Fonctionnalités",
    install: "Guide d'installation",
    download: "Télécharger",
  },
  hero: {
    latestRelease: "Dernière version",
    checkGithub: "Voir sur GitHub",
    titleLine1: "Ton prochain skin,",
    titleLine2: "déjà choisi.",
    subtitle:
      "Stop de débattre des skins pendant le draft. Skin Picker sélectionne et synchronise toute ton équipe en quelques secondes.",
    viewGithub: "Voir sur GitHub",
    free: "Gratuit & open-source",
    autoUpdates: "Mises à jour auto",
    updated: "Mis à jour le",
    screenshotAlt:
      "Écran d'accueil de Skin Picker avec grille bento et aperçu du skin du champion",
  },
  download: {
    forWindows: "Télécharger pour Windows",
    viewReleases: "Voir les releases sur GitHub",
  },
  features: {
    eyebrow: "Ce qu'il fait",
    titleLine1: "Deux modes. Un seul but :",
    titleLine2: "des skins que t'as vraiment envie de voir.",
    solo: {
      eyebrow: "Solo",
      title: "La loterie des skins, enfin gagnée.",
      body: "Lock ton champion et Skin Picker tire un skin et un chroma que tu possèdes — instantanément. Relance autant que tu veux, mets en avant les skins que tu adores, enterre ceux que tu détestes. Tient compte de l'historique : il ne te refilera pas le même skin trois games d'affilée.",
      bullets: {
        autoRoll: {
          title: "Tirage auto au lock",
          body: "Skin et chroma tirés dès que tu lock.",
        },
        reroll: {
          title: "Relance en un clic",
          body: "Relance le skin ou le chroma indépendamment — autant de fois que tu veux.",
        },
        weighted: {
          title: "Priorités pondérées",
          body: "Favoris ×3, skins déclassés ×0.3. Sauvegardé par champion.",
        },
        history: {
          title: "Anti-répétition",
          body: "Évite tes N derniers picks pour que chaque game soit frais.",
        },
      },
      screenshotAlt:
        "Mode solo de Skin Picker avec aperçu du skin en direct et contrôles de relance",
    },
    rooms: {
      eyebrow: "Rooms · Multijoueur",
      titleLine1: "Des skins coordonnés,",
      titleLine2: "sans passer par Discord.",
      body: "Crée une room, partage un code à 6 caractères avec ton équipe, et regarde tout le monde se synchroniser en temps réel. Choisis une couleur — tout le monde s'aligne. Choisis une Skin Line — tout le monde part en PROJECT, Star Guardian ou Arcana ensemble. Le serveur applique la combo auto quand le lobby est prêt.",
      bullets: {
        live: {
          title: "Jusqu'à 5 joueurs, en direct",
          body: "Dashboard live avec le pick actuel de chacun.",
        },
        color: {
          title: "Synchro couleur",
          body: "L'owner choisit un thème (Bleu, Rouge, Doré…) — les chromas des coéquipiers s'alignent.",
        },
        skinLine: {
          title: "Synchro Skin Line",
          body: "Détecte la couverture des lignes thématiques (PROJECT, Star Guardian…) et pick des combos coordonnés.",
        },
        autoApply: {
          title: "Application auto",
          body: "Dès que tout le monde a locké, la meilleure combo s'applique toute seule.",
        },
      },
      screenshotAlt:
        "Vue multijoueur Rooms de Skin Picker avec membres de l'équipe et synergies Skin Line",
    },
  },
  install: {
    eyebrow: "Installation en 30 secondes",
    title: "À propos de l'avertissement Windows",
    intro:
      "Skin Picker est un petit projet perso, pas encore signé avec un certificat Microsoft payant. Windows affiche un avertissement de sécurité pour toute app non signée — ça ne veut pas dire que l'app est dangereuse. Voici comment passer outre.",
    steps: [
      {
        n: "01",
        title: "Lance l'installateur",
        body: "Double-clique sur le fichier que tu viens de télécharger. Windows SmartScreen va afficher un écran d'avertissement parce que l'app n'est pas encore signée — c'est normal à ce stade.",
        screenshotAlt:
          "Étape 01 — Écran d'avertissement Windows SmartScreen",
      },
      {
        n: "02",
        title: "Clique sur \u00ab\u00a0Informations complémentaires\u00a0\u00bb",
        body: "SmartScreen cache le bouton Exécuter par défaut. Clique sur le petit lien \u00ab\u00a0Informations complémentaires\u00a0\u00bb — les détails de l'éditeur s'affichent et le bouton Exécuter quand même apparaît.",
        screenshotAlt:
          "Étape 02 — Lien Informations complémentaires révélant le bouton Exécuter quand même",
      },
      {
        n: "03",
        title: "Clique sur \u00ab\u00a0Exécuter quand même\u00a0\u00bb",
        body: "L'installateur se lance et installe Skin Picker comme n'importe quelle app Windows. À partir de là, les mises à jour sont automatiques — plus d'avertissement, plus de re-téléchargement.",
        screenshotAlt:
          "Étape 03 — App installée, mises à jour auto gérées",
      },
    ],
    transparencyLabel: "Transparence :",
    transparencyBody:
      "tout le code source est public sur GitHub. Tu peux le lire, le compiler toi-même, ou auditer chaque release. L'installateur est publié automatiquement depuis le repo via GitHub Actions — pas de manipulation manuelle, pas de binaires cachés.",
  },
  cta: {
    title: "Prêt à rouler ?",
    subtitle:
      "Un seul installateur, puis l'app se met à jour toute seule. Windows 10 & 11.",
    releaseNotes: "Notes de version",
    stats: {
      version: "Version",
      size: "Taille",
      released: "Publiée",
      platform: "Plateforme",
      platformValue: "Windows 10/11",
    },
  },
  footer: {
    tagline:
      "Une app Windows open-source qui tire, relance et synchronise automatiquement tes skins League of Legends avec ton équipe pendant le champ select.",
    productHeader: "Produit",
    projectHeader: "Projet",
    productLinks: {
      features: "Fonctionnalités",
      download: "Télécharger",
      install: "Guide d'installation",
    },
    projectLinks: {
      github: "GitHub",
      releases: "Releases",
      issues: "Signaler un bug",
    },
    copyright: "© {year} Skin Picker. Gratuit & open-source.",
    disclaimer:
      "Skin Picker n'est pas approuvé par Riot Games et ne reflète pas les opinions ou avis de Riot Games ou de toute autre personne officiellement impliquée dans la production ou la gestion de League of Legends.",
  },
  winPlaceholder: {
    title: "Windows a protégé votre PC",
    description:
      "Microsoft Defender SmartScreen a empêché une app non reconnue de démarrer.",
    app: "App",
    publisher: "Éditeur",
    publisherUnknown: "Éditeur inconnu",
    moreInfo: "Informations complémentaires",
    runAnyway: "Exécuter quand même",
    dontRun: "Ne pas exécuter",
    installed: "Installé !",
    installedNote: "Mises à jour auto gérées par l'app.",
  },
  languageSwitcher: {
    label: "Langue",
  },
  faq: {
    eyebrow: "Sécurité & FAQ",
    title: "Des réponses honnêtes.",
    items: [
      {
        q: "Est-ce que Skin Picker peut me faire ban ?",
        a: "Non. Skin Picker communique uniquement avec le client League via l'API WebSocket/REST officielle de Riot (la LCU) — le même protocole utilisé par tous les outils tiers autorisés. Pas d'injection de code, pas de modification de fichiers, aucune interaction avec Vanguard. Riot a publiquement confirmé que les outils basés sur la LCU sont tolérés.",
      },
      {
        q: "Pourquoi Windows affiche un popup rouge ?",
        a: "L'installateur n'est pas encore signé avec un certificat de code Microsoft payant. Windows affiche cet avertissement pour tout exécutable non signé — ce n'est pas un jugement sur la sécurité de l'app. Clique sur « Informations complémentaires » → « Exécuter quand même » pour continuer. Si tu préfères vérifier toi-même, le code source complet est public sur GitHub.",
      },
      {
        q: "Est-ce que ça fonctionne en jeu ?",
        a: "Non. Skin Picker est actif uniquement pendant le champion select (phase de draft). Une fois la partie lancée, l'app se met complètement en veille — aucun processus en fond qui impacte ton FPS, aucune requête réseau, rien.",
      },
      {
        q: "Mes données sont-elles collectées ?",
        a: "Aucune télémétrie par défaut. Le seul trafic réseau généré par l'app, c'est les appels locaux vers la LCU de Riot et, quand tu es dans une session Rooms, une connexion au serveur Rooms pour synchroniser les picks avec ton équipe. Zéro analytics, zéro tracking, zéro SDK tiers.",
      },
    ],
  },
};

export const dictionaries: Record<Lang, Dict> = { en, fr };

export function getDict(lang: Lang): Dict {
  return dictionaries[lang];
}
