"use client";

/**
 * Premier ecran de /download : l'annonce du telechargement a gauche, la scene
 * animee a droite, et les etapes en dessous.
 *
 * La scene etait au depart sous l'en-tete, donc a 989 px du haut alors que la
 * ligne de flottaison tombe vers 720 : il fallait scroller pour voir la seule
 * chose que la page existe pour montrer. La mettre a cote de l'en-tete la fait
 * tenir entiere dans le premier ecran, sans sacrifier la confirmation « ton
 * telechargement a demarre », qui doit rester la premiere chose lue.
 *
 * La lecture boucle. Elle reste neanmoins suspendue tant que la section n'est
 * pas a l'ecran, et le bouton Pause l'arrete : une animation qui tourne en
 * permanence a cote d'un texte qu'on essaie de lire fatigue, mais devoir
 * relancer la demonstration a la main pour revoir une etape fatigue davantage.
 */

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Pause, Play } from "lucide-react";
import type { Dict } from "@/lib/i18n/dict";
import { cn } from "@/lib/utils";
import Reveal from "@/components/ui/Reveal";
import {
  Scene,
  SCENE_DURATIONS,
  useBrowserName,
  type SceneId,
} from "@/components/ui/ReplayScenes";
import { trackInstallStepSelected } from "@/lib/analytics";

const SCENE_ORDER: SceneId[] = ["keep", "run", "moreinfo", "runanyway", "done"];

/** Nom affiche dans la fenetre factice tant que le navigateur n'est pas connu. */
const FALLBACK_FILE_NAME = "LoL-Skin-Picker-Setup.exe";

/**
 * Vrai quand la section est sortie de l'ecran, faux par defaut.
 *
 * Le defaut compte : la version precedente demandait a un `useInView` de
 * CONFIRMER que la section etait visible avant de lancer la lecture, donc la
 * demonstration restait figee tant qu'aucun callback d'intersection n'etait
 * arrive. Or elle est desormais dans le premier ecran, ou elle doit tourner
 * des le chargement. On part donc du principe qu'elle est visible et on ne se
 * suspend que sur une sortie d'ecran effectivement signalee, ce qui evite
 * aussi de laisser l'animation tourner dans le vide plus bas dans la page.
 */
function useOffScreen(ref: RefObject<Element | null>): boolean {
  const [offScreen, setOffScreen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setOffScreen(!entry.isIntersecting),
      { rootMargin: "-15% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);

  return offScreen;
}

export default function InstallReplay({
  dict,
  fileName,
  aside,
}: {
  dict: Dict;
  fileName: string | null;
  /** Contenu de la colonne de gauche, en pratique l'annonce du telechargement. */
  aside?: ReactNode;
}) {
  const t = dict.downloadPage.walkthrough;
  const reduced = useReducedMotion() ?? false;
  // Repli neutre avant que le navigateur soit identifie : un onglet intitule
  // « Telechargements » se lit naturellement et ne prete a personne un
  // navigateur qu'il n'utilise pas.
  const browserName = useBrowserName(dict.winPlaceholder.browserDownloads);

  const containerRef = useRef<HTMLDivElement>(null);
  const offScreen = useOffScreen(containerRef);

  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(!reduced);
  // Incremente a chaque saut manuel ou rejeu : sert de cle de remontage pour que
  // la scene rejoue ses animations meme quand on retombe sur le meme identifiant.
  const [run, setRun] = useState(0);

  const scene = SCENE_ORDER[index];

  // Enchainement automatique, suspendu quand la section quitte l'ecran.
  useEffect(() => {
    if (!playing || reduced || offScreen) return;
    const ms = SCENE_DURATIONS[scene];
    if (!ms) return;
    const timer = setTimeout(
      () => setIndex((i) => (i + 1) % SCENE_ORDER.length),
      ms
    );
    return () => clearTimeout(timer);
  }, [scene, playing, reduced, offScreen]);

  const goTo = (i: number, stepId: string) => {
    setIndex(i);
    setPlaying(false);
    setRun((r) => r + 1);
    trackInstallStepSelected({ step: stepId, index: i });
  };

  return (
    <section
      id="steps"
      className="relative pt-24 pb-12 sm:pt-28 sm:pb-16"
      ref={containerRef}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center">
          <div>{aside}</div>

          {/* Scene */}
          <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-2 backdrop-blur-xl">
            <div className="overflow-hidden rounded-xl">
              <Scene
                key={`${scene}-${run}`}
                id={scene}
                dict={dict}
                fileName={fileName ?? FALLBACK_FILE_NAME}
                browserName={browserName}
                reduced={reduced}
              />
            </div>

            <div className="flex items-center justify-between px-3 py-2.5">
              <div className="flex gap-1.5" aria-hidden>
                {SCENE_ORDER.map((id, i) => (
                  <span
                    key={id}
                    className={cn(
                      "h-1 rounded-full transition-all duration-300",
                      i === index ? "w-6 bg-accent-strong" : "w-2 bg-white/15"
                    )}
                  />
                ))}
              </div>

              {/* En mouvement reduit rien ne s'enchaine tout seul : un bouton
                  Lecture / Pause n'aurait aucun effet observable. On laisse la
                  navigation par etapes, qui elle fonctionne. */}
              <button
                type="button"
                hidden={reduced}
                onClick={() => setPlaying((p) => !p)}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-ink/90 transition-colors hover:border-white/20 hover:bg-white/[0.08]"
              >
                {playing ? (
                  <>
                    <Pause className="h-3.5 w-3.5" aria-hidden />
                    {t.pause}
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5" aria-hidden />
                    {t.play}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* En-tete des etapes, sur une seule ligne a partir de `sm` pour ne pas
            repousser la rangee hors du premier ecran. */}
        <Reveal className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <div>
            <span className="text-xs font-medium uppercase tracking-wider text-accent-strong">
              {t.eyebrow}
            </span>
            <h2 className="mt-1.5 text-2xl font-bold tracking-tight sm:text-3xl">
              {t.title}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted sm:text-right">
            {t.intro}
          </p>
        </Reveal>

        <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {t.steps.map((step, i) => {
            const active = i === index;
            const done = i < index;

            return (
              <li key={step.id}>
                <button
                  type="button"
                  onClick={() => goTo(i, step.id)}
                  aria-current={active ? "step" : undefined}
                  className={cn(
                    "flex h-full w-full flex-col rounded-2xl border px-5 py-4 text-left transition-all duration-200",
                    active
                      ? "border-accent/40 bg-accent/[0.07]"
                      : "border-white/[0.07] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]"
                  )}
                >
                  <span className="flex items-center gap-2.5">
                    <span
                      className={cn(
                        "inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full font-mono text-[10px] transition-colors",
                        active
                          ? "bg-accent-strong text-white"
                          : done
                            ? "bg-accent/20 text-accent-strong"
                            : "bg-white/[0.06] text-muted"
                      )}
                    >
                      {done ? (
                        <Check className="h-3.5 w-3.5" aria-hidden />
                      ) : (
                        step.n
                      )}
                    </span>
                    <span className="text-sm font-semibold leading-snug text-ink">
                      {step.title}
                    </span>
                  </span>
                  <motion.span
                    initial={false}
                    animate={{ opacity: active ? 1 : 0.6 }}
                    className="mt-2.5 block text-[13px] leading-relaxed text-muted"
                  >
                    {step.body}
                  </motion.span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
