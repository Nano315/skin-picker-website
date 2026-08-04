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
    items: Array<{
      q: string;
      a: string;
      link?: { href: string; label: string };
    }>;
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
    titleLine1: "Stop scrolling",
    titleLine2: "the skin list.",
    subtitle:
      "Skin Picker rolls a skin you own the second you lock in, and syncs the rest of your team if they're running it too.",
    viewGithub: "View on GitHub",
    free: "Free & open-source",
    autoUpdates: "Updates itself",
    updated: "Updated",
    screenshotAlt: "Skin Picker home screen with the champion skin preview",
  },
  download: {
    forWindows: "Download for Windows",
    viewReleases: "View releases on GitHub",
  },
  features: {
    eyebrow: "What it does",
    titleLine1: "Two ways to use it:",
    titleLine2: "alone, or with the squad.",
    solo: {
      eyebrow: "Solo",
      title: "Lock in, get a skin.",
      body: "Lock your champion and Skin Picker rolls a skin and chroma you own. Don't like it? Reroll. You can weight the skins you love upward and push the ones you never want down, and it remembers what you've played recently, so you won't get the same skin three games in a row.",
      bullets: {
        autoRoll: {
          title: "Auto-roll on lock",
          body: "The roll happens the moment you lock your champion.",
        },
        reroll: {
          title: "One-click reroll",
          body: "Reroll the skin, the chroma, or both. No limit.",
        },
        weighted: {
          title: "Weighted priorities",
          body: "Favorites roll ×3, buried skins ×0.3. Saved per champion.",
        },
        history: {
          title: "Won't repeat itself",
          body: "Skips your last few picks so games stop looking alike.",
        },
      },
      screenshotAlt:
        "Skin Picker in solo mode, with the skin preview and the reroll buttons",
    },
    rooms: {
      eyebrow: "Rooms · Multiplayer",
      titleLine1: "Team skins,",
      titleLine2: "without the Discord call.",
      body: "Create a room and invite the friends you're already queuing with. Nobody has to add anyone: the invite lands in their app and they accept. From there everything syncs live. Pick a color and the team's chromas follow. Pick a skin line and everyone goes PROJECT, Star Guardian or Arcana together. When the lobby is ready, the server applies the combo for you.",
      bullets: {
        live: {
          title: "Up to 5 players, live",
          body: "One dashboard with everyone's current pick on it.",
        },
        color: {
          title: "Color sync",
          body: "The room owner picks a theme (blue, red, gold…) and the chromas fall in line.",
        },
        skinLine: {
          title: "Skin line sync",
          body: "Works out which thematic lines you all own between you, then picks a matching set.",
        },
        autoApply: {
          title: "Auto-apply",
          body: "Once everyone has locked, the combo applies itself.",
        },
      },
      screenshotAlt:
        "Skin Picker Rooms view with the team members and their skin line matches",
    },
  },
  install: {
    eyebrow: "Install in 30 seconds",
    title: "About the Windows warning",
    intro:
      "Skin Picker is a personal project and I haven't paid for a Microsoft signing certificate yet. Windows warns about any unsigned app, which tells you nothing about what the app actually does. Here's how to get past it.",
    steps: [
      {
        n: "01",
        title: "Run the installer",
        body: "Double-click the file you just downloaded. SmartScreen throws up a warning because the app isn't signed. That's expected.",
        screenshotAlt: "Step 01 — Windows SmartScreen warning screen",
      },
      {
        n: "02",
        title: 'Click "More info"',
        body: "SmartScreen hides the Run button behind that small link. Click it, the publisher details expand and the Run anyway button shows up.",
        screenshotAlt:
          "Step 02 — More info link revealing the Run anyway button",
      },
      {
        n: "03",
        title: 'Click "Run anyway"',
        body: "The installer does its thing and Skin Picker sets up like any other Windows app. Updates are automatic from then on, so this is a one-time detour.",
        screenshotAlt: "Step 03 — App installed, auto-updates handled",
      },
    ],
    transparencyLabel: "Transparency:",
    transparencyBody:
      "the source code is public on GitHub. Read it, build it yourself, check any release you like. The installer is published straight from the repo by GitHub Actions, so nothing gets assembled by hand on my machine.",
  },
  cta: {
    title: "Ready to roll?",
    subtitle:
      "One installer, then it keeps itself up to date. Windows 10 and 11.",
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
      "An open-source Windows app that rolls your League of Legends skins during champ select and syncs them with your team.",
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
      "Skin Picker isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.",
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
    installedNote: "The app updates itself from here.",
  },
  languageSwitcher: {
    label: "Language",
  },
  faq: {
    eyebrow: "Safety & FAQ",
    title: "The questions I actually get.",
    items: [
      {
        q: "Can Skin Picker get me banned?",
        a: "No, and here's the reasoning. Skin Picker talks to the League client through its official local API, the LCU. It sends the same requests the client sends when you click a skin yourself, and it can only ever select skins and chromas you already own. It doesn't touch game files, inject code or read game memory. That last part is what Vanguard looks for, and it's why the skin changers that unlock skins you don't own get people banned. Skin Picker sits in the same category as Blitz, Porofessor or OP.GG. Riot's developer FAQ on Vanguard says apps built on the LCU API \"are still expected to work\", and Skin Picker is registered with Riot through their Developer Portal.",
        link: {
          href: "https://www.riotgames.com/en/DevRel/vanguard-faq",
          label: "Read Riot's Vanguard FAQ for developers",
        },
      },
      {
        q: "Why does Windows show a red security popup?",
        a: 'The installer isn\'t signed with a paid Microsoft code-signing certificate. Windows shows that popup for every unsigned executable no matter what it does, so it isn\'t a verdict on the app. Click "More info", then "Run anyway". And if you\'d rather check for yourself, the whole source code is on GitHub.',
      },
      {
        q: "Does it work while I'm in-game?",
        a: "No. Its job is finished by the end of champion select. Once the match loads, the window goes to the tray and the app sits there: no overlay, no hooks, nothing anywhere near your FPS. It just keeps an eye on the client's local API so it knows when you're back in a lobby.",
      },
      {
        q: "Is any data collected?",
        a: "Not unless you say yes. On first launch you choose whether to send anonymous usage stats through Aptabase, a privacy-focused analytics service that never sees your account or anything personal, and you can flip that setting whenever you want. Beyond that, the app only talks to Riot's local client API, plus the Rooms server while you're actually in a room.",
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
    titleLine1: "Arrête de scroller",
    titleLine2: "la liste des skins.",
    subtitle:
      "Skin Picker tire un skin que tu possèdes dès que tu lock, et synchronise le reste de l'équipe si elle l'a aussi.",
    viewGithub: "Voir sur GitHub",
    free: "Gratuit & open-source",
    autoUpdates: "Se met à jour tout seul",
    updated: "Mis à jour le",
    screenshotAlt:
      "Écran d'accueil de Skin Picker avec l'aperçu du skin du champion",
  },
  download: {
    forWindows: "Télécharger pour Windows",
    viewReleases: "Voir les releases sur GitHub",
  },
  features: {
    eyebrow: "Ce qu'il fait",
    titleLine1: "Deux façons de l'utiliser :",
    titleLine2: "seul, ou avec la team.",
    solo: {
      eyebrow: "Solo",
      title: "Tu lock, tu as ton skin.",
      body: "Tu lock ton champion, Skin Picker tire un skin et un chroma que tu possèdes. Ça te plaît pas ? Relance. Tu peux monter le poids des skins que tu adores, descendre celui de ceux que tu ne veux plus voir, et l'app retient tes derniers tirages, donc pas de même skin trois games d'affilée.",
      bullets: {
        autoRoll: {
          title: "Tirage auto au lock",
          body: "Le tirage part dès que tu lock ton champion.",
        },
        reroll: {
          title: "Relance en un clic",
          body: "Relance le skin, le chroma, ou les deux. Sans limite.",
        },
        weighted: {
          title: "Priorités pondérées",
          body: "Favoris ×3, skins enterrés ×0.3. Sauvegardé par champion.",
        },
        history: {
          title: "Anti-répétition",
          body: "Écarte tes derniers picks pour que les games ne se ressemblent pas.",
        },
      },
      screenshotAlt:
        "Skin Picker en mode solo, avec l'aperçu du skin et les boutons de relance",
    },
    rooms: {
      eyebrow: "Rooms · Multijoueur",
      titleLine1: "Des skins d'équipe,",
      titleLine2: "sans l'appel Discord.",
      body: "Crée une room et invite les amis avec qui tu joues déjà. Personne n'a besoin d'ajouter personne : l'invitation arrive dans leur app et ils acceptent. Ensuite tout se synchronise en direct. Choisis une couleur, les chromas de l'équipe suivent. Choisis une skin line et tout le monde part en PROJECT, Star Guardian ou Arcana ensemble. Quand le lobby est prêt, le serveur applique la combo pour vous.",
      bullets: {
        live: {
          title: "Jusqu'à 5 joueurs, en direct",
          body: "Un dashboard avec le pick actuel de chacun dessus.",
        },
        color: {
          title: "Synchro couleur",
          body: "L'owner de la room choisit un thème (bleu, rouge, doré…) et les chromas s'alignent.",
        },
        skinLine: {
          title: "Synchro skin line",
          body: "Regarde quelles lignes thématiques vous possédez tous, puis pick un set assorti.",
        },
        autoApply: {
          title: "Application auto",
          body: "Dès que tout le monde a locké, la combo s'applique toute seule.",
        },
      },
      screenshotAlt:
        "Vue Rooms de Skin Picker avec les membres de l'équipe et leurs skin lines communes",
    },
  },
  install: {
    eyebrow: "Installation en 30 secondes",
    title: "À propos de l'avertissement Windows",
    intro:
      "Skin Picker est un projet perso, et je n'ai pas encore payé de certificat de signature Microsoft. Windows prévient pour toute app non signée, ce qui ne dit rien sur ce que l'app fait vraiment. Voici comment passer outre.",
    steps: [
      {
        n: "01",
        title: "Lance l'installateur",
        body: "Double-clique sur le fichier que tu viens de télécharger. SmartScreen va afficher un avertissement parce que l'app n'est pas signée. C'est normal.",
        screenshotAlt: "Étape 01 — Écran d'avertissement Windows SmartScreen",
      },
      {
        n: "02",
        title:
          "Clique sur \u00ab\u00a0Informations complémentaires\u00a0\u00bb",
        body: "SmartScreen planque le bouton Exécuter derrière ce petit lien. Clique dessus, les détails de l'éditeur se déplient et le bouton Exécuter quand même apparaît.",
        screenshotAlt:
          "Étape 02 — Lien Informations complémentaires révélant le bouton Exécuter quand même",
      },
      {
        n: "03",
        title: "Clique sur \u00ab\u00a0Exécuter quand même\u00a0\u00bb",
        body: "L'installateur fait son travail et Skin Picker s'installe comme n'importe quelle app Windows. Les mises à jour sont automatiques ensuite, donc c'est un détour à faire une seule fois.",
        screenshotAlt: "Étape 03 — App installée, mises à jour auto gérées",
      },
    ],
    transparencyLabel: "Transparence :",
    transparencyBody:
      "le code source est public sur GitHub. Lis-le, compile-le toi-même, vérifie la release que tu veux. L'installateur est publié directement depuis le repo par GitHub Actions, donc rien n'est assemblé à la main sur ma machine.",
  },
  cta: {
    title: "On lance ça ?",
    subtitle:
      "Un installateur, et après l'app se met à jour toute seule. Windows 10 et 11.",
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
      "Une app Windows open-source qui tire tes skins League of Legends pendant le champ select et les synchronise avec ton équipe.",
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
      "Skin Picker isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.",
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
    installedNote: "L'app se met à jour toute seule à partir de là.",
  },
  languageSwitcher: {
    label: "Langue",
  },
  faq: {
    eyebrow: "Sécurité & FAQ",
    title: "Les questions qu'on me pose vraiment.",
    items: [
      {
        q: "Est-ce que Skin Picker peut me faire ban ?",
        a: "Non, et voici le raisonnement. Skin Picker parle au client League via son API locale officielle, la LCU. Il envoie les mêmes requêtes que le client quand tu cliques toi-même sur un skin, et il ne peut sélectionner que des skins et chromas que tu possèdes déjà. Il ne touche pas aux fichiers du jeu, n'injecte pas de code et ne lit pas la mémoire. C'est ce dernier point que Vanguard surveille, et c'est pour ça que les skin changers qui débloquent des skins non possédés font bannir. Skin Picker est dans la même catégorie que Blitz, Porofessor ou OP.GG. La FAQ développeurs de Riot sur Vanguard dit que les apps construites sur l'API LCU « are still expected to work », et Skin Picker est enregistré auprès de Riot via leur Developer Portal.",
        link: {
          href: "https://www.riotgames.com/en/DevRel/vanguard-faq",
          label: "Lire la FAQ Vanguard de Riot pour les développeurs",
        },
      },
      {
        q: "Pourquoi Windows affiche un popup rouge ?",
        a: "L'installateur n'est pas signé avec un certificat de signature Microsoft payant. Windows affiche ce popup pour tout exécutable non signé, quoi qu'il fasse, donc ce n'est pas un verdict sur l'app. Clique sur « Informations complémentaires », puis « Exécuter quand même ». Et si tu préfères vérifier toi-même, tout le code source est sur GitHub.",
      },
      {
        q: "Est-ce que ça fonctionne en jeu ?",
        a: "Non. Son travail s'arrête à la fin du champion select. Une fois la partie chargée, la fenêtre passe dans la barre des tâches et l'app ne bouge plus : pas d'overlay, pas de hook, rien qui approche tes FPS. Elle garde juste un œil sur l'API locale du client pour savoir quand tu reviens en lobby.",
      },
      {
        q: "Mes données sont-elles collectées ?",
        a: "Pas sans ton accord. Au premier lancement, tu choisis si tu veux envoyer des statistiques d'usage anonymes via Aptabase, un service d'analytics respectueux de la vie privée qui ne voit jamais ton compte ni la moindre info perso, et tu peux changer ce réglage quand tu veux. À part ça, l'app ne parle qu'à l'API locale du client Riot, plus au serveur Rooms quand tu es effectivement dans une room.",
      },
    ],
  },
};

export const dictionaries: Record<Lang, Dict> = { en, fr };

export function getDict(lang: Lang): Dict {
  return dictionaries[lang];
}
