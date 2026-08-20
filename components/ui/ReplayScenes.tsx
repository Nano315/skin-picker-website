"use client";

/**
 * Reproductions animees des ecrans que Windows met devant l'utilisateur entre
 * le clic sur « Telecharger » et l'app installee.
 *
 * Pourquoi du HTML plutot qu'un GIF ou une capture video : les libelles
 * viennent du dictionnaire, donc la scene est deja traduite et suit la langue
 * de la page, alors qu'une capture est figee dans la langue de la machine qui
 * l'a enregistree. Elle pese quelques kilo-octets contre plusieurs mega-octets,
 * reste nette sur un ecran haute densite, et se met a jour toute seule quand le
 * nom du fichier change de version.
 *
 * Toutes les scenes sont dessinees dans un repere fixe de DESIGN_W x DESIGN_H
 * pixels, mis a l'echelle par `Stage`. C'est ce qui permet de placer le faux
 * curseur en coordonnees absolues : ses cibles et les elements qu'il vise
 * partagent le meme systeme, donc le clic tombe juste quelle que soit la
 * largeur reelle de la boite.
 */

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, Download, MoreVertical, ShieldAlert } from "lucide-react";
import type { Dict } from "@/lib/i18n/dict";

export const DESIGN_W = 880;
export const DESIGN_H = 520;

export type SceneId = "keep" | "run" | "moreinfo" | "runanyway" | "done";

/** Duree d'affichage de chaque scene avant l'enchainement automatique (ms). */
export const SCENE_DURATIONS: Record<SceneId, number> = {
  keep: 4600,
  run: 3200,
  moreinfo: 3400,
  runanyway: 3600,
  done: 2600, // puis retour a la premiere scene : la lecture boucle
};

type SceneProps = {
  dict: Dict;
  fileName: string;
  browserName: string;
  /** Vrai si l'utilisateur a demande moins d'animations : on montre l'etat final. */
  reduced: boolean;
};

/* -------------------------------------------------------------------------- */
/*  Mise a l'echelle                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Rend ses enfants dans une boite de DESIGN_W x DESIGN_H px, mise a l'echelle
 * pour occuper toute la largeur disponible. Les tailles de police suivent donc
 * la boite, ce qu'un simple positionnement en pourcentages ne ferait pas.
 */
// useLayoutEffect previent le flash d'une scene rendue a sa taille de design
// avant la mise a l'echelle, mais il n'existe pas au rendu serveur : on retombe
// sur useEffect la-bas pour eviter l'avertissement de React.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Rectangle du repere de design sur lequel cadrer quand la place manque. */
export type Focus = { x: number; y: number; w: number; h: number };

/**
 * Sous cette largeur, le cadre large tombe autour de 0,5 d'echelle et son texte
 * passe sous 7 px : on resserre alors sur le strict necessaire, quitte a rogner
 * les bords de la fenetre ou de la boite de dialogue.
 */
const NARROW_BELOW_PX = 420;

/**
 * Proportions de la boite qui accueille les scenes. Elles sont FIXES et
 * independantes de la scene affichee.
 *
 * Sans ca, la boite prenait les proportions de chaque cadrage : 1,7 pour le
 * panneau du navigateur, 1,0 pour la boite SmartScreen. En passant de l'etape
 * 02 a l'etape 03, sa hauteur bondissait de 250 px et poussait tout le contenu
 * en dessous, en plein milieu de la lecture automatique. Une boite de taille
 * constante ou chaque scene vient se loger supprime ce saut.
 */
const STAGE_RATIO = 1.5;
const STAGE_RATIO_NARROW = 1.35;

export function Stage({
  focus,
  focusNarrow,
  children,
}: {
  focus?: Focus;
  focusNarrow?: Focus;
  children: React.ReactNode;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(DESIGN_W);

  useIsomorphicLayoutEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const measure = () => setWidth(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Le cadrage est systematique, pas reserve aux petits ecrans : la colonne qui
  // accueille la scene fait environ 600 px meme sur un grand ecran, ou la boite
  // complete tomberait a 68 % et rendrait son texte illisible. Cadrer toujours
  // sur la zone utile donne le meme resultat lisible a toutes les largeurs.
  const narrow = width < NARROW_BELOW_PX;
  const view =
    (narrow ? focusNarrow ?? focus : focus) ?? {
      x: 0,
      y: 0,
      w: DESIGN_W,
      h: DESIGN_H,
    };

  // La zone cadree est logee dans la boite sans etre rognee, puis centree : la
  // scene large touche les bords gauche et droit, la scene haute touche le haut
  // et le bas, et aucune des deux ne deborde.
  const height = width / (narrow ? STAGE_RATIO_NARROW : STAGE_RATIO);
  const scale = Math.min(width / view.w, height / view.h);
  const offsetX = (width - view.w * scale) / 2;
  const offsetY = (height - view.h * scale) / 2;

  return (
    <div
      ref={outerRef}
      className="relative w-full overflow-hidden bg-[#0c0d12]"
      style={{ aspectRatio: `${narrow ? STAGE_RATIO_NARROW : STAGE_RATIO}` }}
    >
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{
          width: DESIGN_W,
          height: DESIGN_H,
          transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale}) translate(${-view.x}px, ${-view.y}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Curseur et surbrillance                                                   */
/* -------------------------------------------------------------------------- */

type Waypoint = {
  /** Coordonnees dans le repere de design, en pixels. */
  x: number;
  y: number;
  /** Instant d'arrivee, en secondes depuis le debut de la scene. */
  at: number;
  click?: boolean;
};

function CursorGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      className="block drop-shadow-[0_2px_5px_rgba(0,0,0,0.7)]"
      aria-hidden
    >
      <path
        d="M5 2.5 L5 19.5 L9.6 15.2 L12.4 21.5 L15.4 20.1 L12.7 14 L19 13.6 Z"
        fill="#ffffff"
        stroke="#111827"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Faux curseur qui parcourt les etapes de la scene. En mouvement reduit il est
 * simplement pose sur la derniere cible : l'utilisateur voit ou il faut
 * cliquer, sans trajet anime.
 */
function Cursor({ path, reduced }: { path: Waypoint[]; reduced: boolean }) {
  const last = path[path.length - 1];

  if (reduced) {
    return (
      <div
        className="pointer-events-none absolute z-30"
        style={{ left: last.x, top: last.y }}
      >
        <CursorGlyph />
      </div>
    );
  }

  const total = last.at + 0.8;
  const clicks = path.filter((p) => p.click);

  return (
    <motion.div
      className="pointer-events-none absolute z-30"
      initial={{ left: path[0].x, top: path[0].y }}
      animate={{ left: path.map((p) => p.x), top: path.map((p) => p.y) }}
      transition={{
        duration: total,
        times: path.map((p) => p.at / total),
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      <CursorGlyph />
      {clicks.map((c, i) => (
        <motion.span
          key={i}
          className="absolute left-0 top-0 block h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent-strong"
          initial={{ scale: 0.15, opacity: 0 }}
          animate={{ scale: [0.15, 1.9], opacity: [0.95, 0] }}
          transition={{ delay: c.at, duration: 0.6, ease: "easeOut" }}
        />
      ))}
    </motion.div>
  );
}

/** Halo qui designe la cible juste avant que le curseur ne l'atteigne. */
function Highlight({
  x,
  y,
  w,
  h,
  at,
  reduced,
  radius = 6,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  at: number;
  reduced: boolean;
  radius?: number;
}) {
  return (
    <motion.span
      aria-hidden
      className="pointer-events-none absolute z-20 border-2 border-accent-strong"
      style={{
        left: x,
        top: y,
        width: w,
        height: h,
        borderRadius: radius,
        boxShadow: "0 0 0 4px rgba(168,85,247,0.18)",
      }}
      initial={reduced ? false : { opacity: 0, scale: 1.15 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={reduced ? { duration: 0 } : { delay: at, duration: 0.35 }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*  Scenes navigateur                                                         */
/* -------------------------------------------------------------------------- */

/** Fenetre de navigateur factice, commune aux scenes 01 et 02. */
function BrowserChrome({
  browserName,
  children,
}: {
  browserName: string;
  children: React.ReactNode;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-xl border border-white/10 bg-[#202124]">
      {/* Barre d'onglets */}
      <div className="absolute inset-x-0 top-0 h-[38px]">
        <div className="absolute left-3 top-[7px] flex h-[31px] w-[210px] items-center gap-2 rounded-t-lg bg-[#35363a] px-3">
          <span className="h-3 w-3 rounded-full bg-accent-strong/80" />
          <span className="truncate text-[11px] text-white/70">
            {browserName}
          </span>
        </div>
      </div>

      {/* Barre d'outils */}
      <div className="absolute inset-x-0 top-[38px] h-[44px] bg-[#35363a]">
        <div className="absolute left-[18px] top-[14px] h-4 w-4 rounded-full bg-white/15" />
        <div className="absolute left-[46px] top-[14px] h-4 w-4 rounded-full bg-white/10" />
        <div className="absolute left-[74px] top-[14px] h-4 w-4 rounded-full bg-white/10" />
        <div className="absolute left-[104px] top-[10px] flex h-[24px] w-[540px] items-center rounded-full bg-[#202124] px-3 text-[11px] text-white/45">
          skinpicker.app
        </div>
        <Download
          className="absolute left-[752px] top-[13px] h-[18px] w-[18px] text-white/70"
          aria-hidden
        />
        <div className="absolute left-[830px] top-[12px] h-5 w-5 rounded-full bg-white/20" />
      </div>

      {/* Page en arriere-plan, volontairement floue et sans texte lisible */}
      <div className="absolute inset-x-0 bottom-0 top-[82px] bg-[#0c0d12]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(139,92,246,0.22),transparent_60%)]" />
        <div className="absolute left-[60px] top-[70px] h-4 w-[220px] rounded bg-white/10" />
        <div className="absolute left-[60px] top-[102px] h-8 w-[320px] rounded bg-white/[0.07]" />
        <div className="absolute left-[60px] top-[160px] h-9 w-[170px] rounded-full bg-accent/30" />
      </div>

      {children}
    </div>
  );
}

/** Panneau de telechargements, ancre en haut a droite comme dans les navigateurs recents. */
function DownloadsFlyout({
  dict,
  fileName,
  children,
}: {
  dict: Dict;
  fileName: string;
  children: React.ReactNode;
}) {
  const w = dict.winPlaceholder;
  return (
    <div className="absolute left-[470px] top-[92px] h-[200px] w-[390px] rounded-xl border border-white/10 bg-[#292a2d] shadow-[0_20px_60px_rgba(0,0,0,0.65)]">
      <div className="absolute left-[20px] top-[16px] text-[12px] font-semibold text-white/90">
        {w.browserDownloads}
      </div>
      <div className="absolute inset-x-[12px] top-[46px] h-[62px] rounded-lg bg-white/[0.04]" />
      <div className="absolute left-[24px] top-[58px] flex h-[38px] w-[38px] items-center justify-center rounded bg-[#3c4043]">
        <span className="text-[9px] font-bold tracking-wide text-white/60">
          EXE
        </span>
      </div>
      <div className="absolute left-[74px] top-[58px] w-[250px] truncate text-[12px] text-white/90">
        {fileName}
      </div>
      {children}
    </div>
  );
}

function KeepScene({ dict, fileName, browserName, reduced }: SceneProps) {
  const w = dict.winPlaceholder;
  const d = (n: number) => (reduced ? 0 : n);

  return (
    <BrowserChrome browserName={browserName}>
      <DownloadsFlyout dict={dict} fileName={fileName}>
        {/* Ligne d'avertissement, qui disparait une fois le fichier conserve */}
        <motion.div
          className="absolute left-[74px] top-[80px] flex items-center gap-1.5"
          initial={reduced ? false : { opacity: 1 }}
          animate={reduced ? { opacity: 0 } : { opacity: [1, 1, 0] }}
          transition={
            reduced ? { duration: 0 } : { duration: 3, times: [0, 0.78, 0.88] }
          }
        >
          <ShieldAlert className="h-3 w-3 text-[#f0b849]" aria-hidden />
          <span className="text-[10.5px] text-[#f0b849]">{w.browserUncommon}</span>
          <span className="text-[10.5px] text-white/45">
            {w.browserUncommonBody}
          </span>
        </motion.div>

        {/* Etat d'arrivee : le fichier est conserve */}
        <motion.div
          className="absolute left-[74px] top-[80px] flex items-center gap-1.5"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={reduced ? { duration: 0 } : { delay: d(2.7), duration: 0.3 }}
        >
          <Check className="h-3 w-3 text-emerald-400" aria-hidden />
          <span className="text-[10.5px] text-emerald-400">{w.browserKept}</span>
        </motion.div>

        {/* Bouton « plus d'actions » de la ligne */}
        <div
          className="absolute left-[344px] top-[62px] flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white/[0.06]"
          aria-label={w.browserMore}
        >
          <MoreVertical className="h-4 w-4 text-white/70" aria-hidden />
        </div>

        {/* Menu contextuel, ouvert par le premier clic */}
        <motion.div
          className="absolute left-[212px] top-[100px] w-[168px] overflow-hidden rounded-lg border border-white/10 bg-[#35363a] py-1 shadow-[0_18px_50px_rgba(0,0,0,0.7)]"
          initial={reduced ? false : { opacity: 0, y: -8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={
            reduced ? { duration: 0 } : { delay: d(1.05), duration: 0.22 }
          }
        >
          <div className="px-3 py-[7px] text-[11.5px] font-medium text-white/90">
            {w.browserKeep}
          </div>
          <div className="px-3 py-[7px] text-[11.5px] text-white/55">
            {w.browserDelete}
          </div>
        </motion.div>
      </DownloadsFlyout>

      {/* Cibles designees : le bouton « plus d'actions », puis « Conserver » */}
      <Highlight
        x={810}
        y={150}
        w={38}
        h={38}
        at={d(0.65)}
        reduced={reduced}
        radius={19}
      />
      <Highlight
        x={679}
        y={193}
        w={176}
        h={38}
        at={d(1.75)}
        reduced={reduced}
        radius={6}
      />

      <Cursor
        reduced={reduced}
        path={[
          { x: 430, y: 270, at: 0 },
          { x: 830, y: 170, at: 0.95, click: true },
          { x: 740, y: 210, at: 2.1, click: true },
          { x: 740, y: 210, at: 3.0 },
        ]}
      />
    </BrowserChrome>
  );
}

function RunScene({ dict, fileName, browserName, reduced }: SceneProps) {
  const w = dict.winPlaceholder;
  const d = (n: number) => (reduced ? 0 : n);

  return (
    <BrowserChrome browserName={browserName}>
      <DownloadsFlyout dict={dict} fileName={fileName}>
        <div className="absolute left-[74px] top-[80px] flex items-center gap-1.5">
          <Check className="h-3 w-3 text-emerald-400" aria-hidden />
          <span className="text-[10.5px] text-emerald-400">{w.browserKept}</span>
        </div>
        <div className="absolute left-[344px] top-[62px] flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white/[0.06]">
          <MoreVertical className="h-4 w-4 text-white/40" aria-hidden />
        </div>

        {/* Etiquette « double-clic », posee sous la ligne du fichier */}
        <motion.div
          className="absolute left-[74px] top-[112px] rounded-full bg-accent-strong px-2.5 py-[3px] text-[10px] font-semibold text-white"
          initial={reduced ? false : { opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduced ? { duration: 0 } : { delay: d(1.2), duration: 0.25 }}
        >
          {w.browserDoubleClick}
        </motion.div>
      </DownloadsFlyout>

      <Highlight
        x={478}
        y={134}
        w={374}
        h={70}
        at={d(0.6)}
        reduced={reduced}
        radius={10}
      />

      <Cursor
        reduced={reduced}
        path={[
          { x: 430, y: 270, at: 0 },
          { x: 640, y: 168, at: 0.95, click: true },
          { x: 640, y: 168, at: 1.2, click: true },
          { x: 640, y: 168, at: 2.1 },
        ]}
      />
    </BrowserChrome>
  );
}

/* -------------------------------------------------------------------------- */
/*  Scenes SmartScreen                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Boite SmartScreen. Le bleu et la disposition suivent la capture reelle
 * (public/screenshots/win-1.png et win-2.png), le texte vient du dictionnaire.
 */
function SmartScreenDialog({
  dict,
  fileName,
  expanded,
  children,
}: {
  dict: Dict;
  fileName: string;
  expanded: boolean;
  children: React.ReactNode;
}) {
  const w = dict.winPlaceholder;

  return (
    <div className="absolute inset-0 overflow-hidden rounded-xl bg-[#0c0d12]">
      {/* Bureau flou derriere la boite */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(139,92,246,0.18),transparent_60%)]" />

      {/* La vraie boite Windows fait 450x464 et laisse plus de 200 px de vide
          entre le texte et les boutons. Reproduit tel quel, ce vide forcait la
          scene a se reduire pour tenir en hauteur, et son texte tombait a
          10 px. On le supprime : il ne porte aucune information, alors que le
          titre, la couleur et les libelles suffisent a reconnaitre la boite. */}
      <div className="absolute left-[215px] top-[105px] h-[286px] w-[450px] rounded-lg bg-[#153350] shadow-[0_30px_90px_rgba(0,0,0,0.75)]">
        {/* Bandeau de fermeture, plus sombre, comme sur la vraie boite */}
        <div className="absolute right-0 top-0 flex h-[36px] w-[46px] items-center justify-center rounded-tr-lg bg-[#202020] text-[13px] text-white/80">
          ✕
        </div>

        <div className="absolute left-[26px] top-[32px] w-[380px] text-[21px] font-normal leading-tight text-white">
          {w.title}
        </div>
        <div className="absolute left-[26px] top-[82px] w-[390px] text-[12.5px] leading-[1.55] text-white/80">
          {w.description}
        </div>

        {expanded ? (
          <div className="absolute left-[26px] top-[152px] w-[400px] space-y-[6px] text-[12px] text-white/75">
            <div className="flex gap-2">
              <span className="w-[70px] flex-shrink-0">{w.app} :</span>
              <span className="truncate text-white/90">{fileName}</span>
            </div>
            <div className="flex gap-2">
              <span className="w-[70px] flex-shrink-0">{w.publisher} :</span>
              <span>{w.publisherUnknown}</span>
            </div>
          </div>
        ) : (
          <div className="absolute left-[26px] top-[152px] text-[12.5px] text-white underline decoration-white/70 underline-offset-2">
            {w.moreInfo}
          </div>
        )}

        {/* Boutons, ancres en bas a droite */}
        {expanded && (
          <div className="absolute left-[122px] top-[214px] flex h-[34px] w-[168px] items-center justify-center rounded-[3px] border border-white/45 text-[12px] text-white">
            {w.runAnyway}
          </div>
        )}
        <div className="absolute left-[302px] top-[214px] flex h-[34px] w-[124px] items-center justify-center rounded-[3px] border border-white/45 text-[12px] text-white">
          {w.dontRun}
        </div>
      </div>

      {children}
    </div>
  );
}

function MoreInfoScene({ dict, fileName, reduced }: SceneProps) {
  const d = (n: number) => (reduced ? 0 : n);

  return (
    <SmartScreenDialog dict={dict} fileName={fileName} expanded={false}>
      {/* Le lien est a left 215+26 = 241, top 105+152 = 257 dans le repere global */}
      <Highlight
        x={235}
        y={252}
        w={192}
        h={30}
        at={d(0.6)}
        reduced={reduced}
        radius={5}
      />
      <Cursor
        reduced={reduced}
        path={[
          { x: 540, y: 360, at: 0 },
          { x: 320, y: 267, at: 1.0, click: true },
          { x: 320, y: 267, at: 2.0 },
        ]}
      />
    </SmartScreenDialog>
  );
}

function RunAnywayScene({ dict, fileName, reduced }: SceneProps) {
  const d = (n: number) => (reduced ? 0 : n);

  return (
    <SmartScreenDialog dict={dict} fileName={fileName} expanded>
      {/* Bouton « Executer quand meme » : 215+122 = 337, 105+214 = 319 */}
      <Highlight
        x={331}
        y={313}
        w={180}
        h={46}
        at={d(0.6)}
        reduced={reduced}
        radius={5}
      />
      <Cursor
        reduced={reduced}
        path={[
          { x: 300, y: 150, at: 0 },
          { x: 421, y: 336, at: 1.0, click: true },
          { x: 421, y: 336, at: 2.1 },
        ]}
      />
    </SmartScreenDialog>
  );
}

function DoneScene({ dict, reduced }: SceneProps) {
  const w = dict.winPlaceholder;

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-xl bg-[#0c0d12]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(139,92,246,0.28),transparent_62%)]" />
      <motion.div
        className="relative flex h-[92px] w-[92px] items-center justify-center rounded-full border border-accent/40 bg-accent/15"
        initial={reduced ? false : { scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={
          reduced
            ? { duration: 0 }
            : { type: "spring", stiffness: 260, damping: 18 }
        }
      >
        <Check className="h-11 w-11 text-accent-strong" aria-hidden />
      </motion.div>
      <p className="relative mt-6 text-[26px] font-semibold text-white">
        {w.installed}
      </p>
      <p className="relative mt-2 text-[14px] text-white/60">{w.installedNote}</p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

const SCENES: Record<SceneId, React.ComponentType<SceneProps>> = {
  keep: KeepScene,
  run: RunScene,
  moreinfo: MoreInfoScene,
  runanyway: RunAnywayScene,
  done: DoneScene,
};

/**
 * Zone utile de chaque scene. Le cadre navigateur garde volontairement la barre
 * d'outils et l'icone de telechargement : sans ce contexte, le panneau flotte
 * tout seul et on ne reconnait plus son propre navigateur.
 */
const SCENE_FOCUS: Record<SceneId, Focus> = {
  // Les quatre cadrages font 490 px de large, donc toutes les scenes sont
  // rendues a la meme echelle. Sans ca le texte changeait de taille d'une etape
  // a l'autre et la boite SmartScreen paraissait retrecir.
  keep: { x: 380, y: 12, w: 490, h: 292 },
  run: { x: 380, y: 12, w: 490, h: 292 },
  moreinfo: { x: 195, y: 90, w: 490, h: 320 },
  runanyway: { x: 195, y: 90, w: 490, h: 320 },
  done: { x: 195, y: 110, w: 490, h: 300 },
};

/**
 * Cadres resserres pour telephone. On abandonne le contexte (fenetre du
 * navigateur, bords de la boite) au profit de la lisibilite des libelles, qui
 * sont la seule chose que l'utilisateur doit reconnaitre sur son ecran.
 */
const SCENE_FOCUS_NARROW: Record<SceneId, Focus> = {
  keep: { x: 462, y: 86, w: 404, h: 212 },
  run: { x: 462, y: 86, w: 404, h: 212 },
  moreinfo: { x: 228, y: 96, w: 424, h: 304 },
  runanyway: { x: 228, y: 96, w: 424, h: 304 },
  done: { x: 240, y: 140, w: 400, h: 250 },
};

export function Scene({ id, ...props }: SceneProps & { id: SceneId }) {
  const Component = SCENES[id];
  return (
    <Stage focus={SCENE_FOCUS[id]} focusNarrow={SCENE_FOCUS_NARROW[id]}>
      <Component {...props} />
    </Stage>
  );
}

/* -------------------------------------------------------------------------- */
/*  Detection du navigateur                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Nom du navigateur, uniquement pour etiqueter la fenetre factice : voir « Edge »
 * plutot qu'un nom generique aide a reconnaitre son propre ecran. La detection
 * se fait apres montage, donc le rendu serveur et le premier rendu client
 * partagent la meme valeur neutre et l'hydratation ne diverge pas.
 */
export function useBrowserName(fallback: string): string {
  const [name, setName] = useState(fallback);

  useEffect(() => {
    const ua = navigator.userAgent;
    if (/edg\//i.test(ua)) setName("Microsoft Edge");
    else if (/opr\//i.test(ua) || /opera/i.test(ua)) setName("Opera");
    else if (/firefox|fxios/i.test(ua)) setName("Firefox");
    else if (/chrome|chromium|crios/i.test(ua)) setName("Google Chrome");
  }, []);

  return name;
}
