import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReveal } from "../hooks/useReveal";

const steps = [
  {
    title: "You reach out",
    body: "Share aircraft type, where it sits, when you need it, and what “good enough” and “great” mean to you.",
  },
  {
    title: "We plan it together",
    body: "We talk through scope, surfaces, and risks, then settle on a sequence and day that actually fit your schedule.",
  },
  {
    title: "We do the work",
    body: "We show up ready, keep the job organized on the ramp or in the hangar, and stay in touch if anything needs a quick decision.",
  },
  {
    title: "We walk it with you",
    body: "When it is done, we review the finish with you under hangar or ramp light so we agree it is right before we pack up.",
  },
] as const;

type Step = (typeof steps)[number];

/** Stagger between step highlights and connector segments (aligns with bar-grow pacing on screen). */
const SEGMENT_DURATION_MS = 1400;
const PATH_INITIAL_DELAY_MS = 160;
/** Defer connector (track + line) until cards begin appearing */
const LINE_REVEAL_DELAY_MS = PATH_INITIAL_DELAY_MS + 120;

const CARD_MIN_H = "min-h-[14rem] sm:min-h-[15rem]";
const CARD_TRANSITION_MS = 800;

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

type ProcessDesktopConnectorProps = {
  segmentIndex: number;
  visible: boolean;
  lineVisible: boolean;
  reduceMotion: boolean;
  orientation: "horizontal" | "vertical";
  /** Vertical only: full-width grid row vs stacked mobile column */
  verticalLayout?: "grid" | "stack";
};

/** Hero-style gradient bar: horizontal between columns, vertical between steps. */
function ProcessDesktopConnector({
  segmentIndex,
  visible,
  lineVisible,
  reduceMotion,
  orientation,
  verticalLayout = "grid",
}: ProcessDesktopConnectorProps) {
  const delay = PATH_INITIAL_DELAY_MS + segmentIndex * SEGMENT_DURATION_MS;
  const showAnim = visible && !reduceMotion && lineVisible;
  const fadeCls = lineVisible ? "opacity-100" : "opacity-0";

  if (orientation === "horizontal") {
    return (
      <div
        className={`flex w-11 shrink-0 flex-col justify-center self-center transition-opacity duration-500 ease-out sm:w-14 ${fadeCls}`}
        role="presentation"
        aria-hidden
      >
        <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-ascend-border/50">
          <div
            className={`h-full w-full origin-left rounded-full bg-gradient-to-r from-ascend-cyan via-ascend-cyan-dark to-ascend-accent/60 ${
              reduceMotion ? "scale-x-100" : showAnim ? "scale-x-0 animate-bar-grow" : "scale-x-0"
            }`}
            style={{
              animationDelay: showAnim ? `${delay}ms` : undefined,
              animationFillMode: "both",
            }}
          />
        </div>
      </div>
    );
  }

  const verticalOuter =
    verticalLayout === "grid"
      ? "col-span-3 flex h-12 shrink-0 items-center justify-center py-1"
      : "flex w-full shrink-0 justify-center py-2";

  const verticalTrack = verticalLayout === "grid" ? "h-full w-[3px]" : "h-16 w-[3px]";

  return (
    <div className={`${verticalOuter} transition-opacity duration-500 ease-out ${fadeCls}`} role="presentation" aria-hidden>
      <div className={`relative overflow-hidden rounded-full bg-ascend-border/50 ${verticalTrack}`}>
        <div
          className={`h-full w-full origin-top rounded-full bg-gradient-to-b from-ascend-cyan via-ascend-cyan-dark to-ascend-accent/60 ${
            reduceMotion ? "scale-y-100" : showAnim ? "scale-y-0 animate-bar-grow-y" : "scale-y-0"
          }`}
          style={{
            animationDelay: showAnim ? `${delay}ms` : undefined,
            animationFillMode: "both",
          }}
        />
      </div>
    </div>
  );
}

type ProcessStepCardProps = {
  step: Step;
  n: number;
  isLit: boolean;
  revealDelay: number;
  visible: boolean;
};

function ProcessStepCard({ step, n, isLit, revealDelay, visible }: ProcessStepCardProps) {
  return (
    <article
      className={`relative z-0 flex min-h-0 w-full flex-col rounded-xl border bg-white p-6 text-center shadow-card-sm transition-[opacity,transform,box-shadow,ring] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:duration-0 sm:p-8 ${CARD_MIN_H} ${
        isLit ? "border-slate-200/90 ring-1 ring-ascend-cyan-dark/30" : "border-ascend-border"
      } ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"} ${
        visible && isLit ? "hover:shadow-card" : visible ? "hover:border-slate-200 hover:shadow-card" : ""
      }`}
      style={{
        transitionDuration: `${CARD_TRANSITION_MS}ms`,
        transitionDelay: `${revealDelay}ms`,
      }}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ascend-cyan-dark">Step {n}</p>
      <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-ascend-ink sm:text-2xl">{step.title}</h3>
      <p className="mt-3 max-w-2xl flex-1 self-center text-[15px] leading-relaxed text-ascend-slate sm:text-base">
        {step.body}
      </p>
    </article>
  );
}

export function Process() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const reduceMotion = usePrefersReducedMotion();
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [lineVisible, setLineVisible] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useLayoutEffect(() => {
    if (!visible) {
      setActiveStep(null);
      setLineVisible(false);
      return;
    }
    if (reduceMotion) {
      setActiveStep(3);
      setLineVisible(true);
      return;
    }
    setActiveStep(0);
    setLineVisible(false);
  }, [visible, reduceMotion]);

  useEffect(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    if (!visible) return;

    if (reduceMotion) return;

    const schedule = (ms: number, fn: () => void) => {
      const t = window.setTimeout(fn, ms);
      timersRef.current.push(t);
    };

    schedule(LINE_REVEAL_DELAY_MS, () => setLineVisible(true));

    schedule(PATH_INITIAL_DELAY_MS + SEGMENT_DURATION_MS, () => setActiveStep(1));
    schedule(PATH_INITIAL_DELAY_MS + 2 * SEGMENT_DURATION_MS, () => setActiveStep(2));
    schedule(PATH_INITIAL_DELAY_MS + 3 * SEGMENT_DURATION_MS, () => setActiveStep(3));

    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, [visible, reduceMotion]);

  const highlightLevel = !visible ? -1 : reduceMotion ? 3 : (activeStep ?? -1);

  const card = (stepIndex: number) => {
    const s = steps[stepIndex];
    const n = stepIndex + 1;
    const revealDelay = PATH_INITIAL_DELAY_MS + stepIndex * SEGMENT_DURATION_MS;
    const isLit = stepIndex <= highlightLevel;
    return <ProcessStepCard step={s} n={n} isLit={isLit} revealDelay={revealDelay} visible={visible} />;
  };

  return (
    <div ref={ref} className="relative mx-auto max-w-6xl px-3 sm:px-6 lg:px-8">
      <ol className="m-0 mx-auto flex w-full max-w-4xl list-none flex-col items-stretch gap-y-7 p-0 sm:max-w-5xl sm:gap-y-8 lg:hidden">
        {steps.map((s, stepIndex) => {
          const n = stepIndex + 1;
          const revealDelay = PATH_INITIAL_DELAY_MS + stepIndex * SEGMENT_DURATION_MS;
          const isLit = stepIndex <= highlightLevel;
          const seg = stepIndex > 0 ? stepIndex - 1 : -1;

          return (
            <li key={s.title} className="relative z-0 w-full hover:z-30 focus-within:z-30">
              {stepIndex > 0 ? (
                <ProcessDesktopConnector
                  segmentIndex={seg}
                  visible={visible}
                  lineVisible={lineVisible}
                  reduceMotion={reduceMotion}
                  orientation="vertical"
                  verticalLayout="stack"
                />
              ) : null}
              <ProcessStepCard step={s} n={n} isLit={isLit} revealDelay={revealDelay} visible={visible} />
            </li>
          );
        })}
      </ol>

      <div
        className="mx-auto hidden w-full max-w-5xl grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-x-4 gap-y-5 lg:grid lg:gap-x-6"
        role="list"
        aria-label="How it works steps"
      >
        <div className="relative z-0 min-w-0 hover:z-30 focus-within:z-30" role="listitem">
          {card(0)}
        </div>
        <ProcessDesktopConnector
          segmentIndex={0}
          visible={visible}
          lineVisible={lineVisible}
          reduceMotion={reduceMotion}
          orientation="horizontal"
        />
        <div className="relative z-0 min-w-0 hover:z-30 focus-within:z-30" role="listitem">
          {card(1)}
        </div>

        <ProcessDesktopConnector
          segmentIndex={1}
          visible={visible}
          lineVisible={lineVisible}
          reduceMotion={reduceMotion}
          orientation="vertical"
          verticalLayout="grid"
        />

        <div className="relative z-0 min-w-0 hover:z-30 focus-within:z-30" role="listitem">
          {card(2)}
        </div>
        <ProcessDesktopConnector
          segmentIndex={2}
          visible={visible}
          lineVisible={lineVisible}
          reduceMotion={reduceMotion}
          orientation="horizontal"
        />
        <div className="relative z-0 min-w-0 hover:z-30 focus-within:z-30" role="listitem">
          {card(3)}
        </div>
      </div>
    </div>
  );
}
