import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
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
];

/** Must match `process-path-seg` duration in tailwind.config.ts */
const SEGMENT_DURATION_MS = 1400;
const PATH_INITIAL_DELAY_MS = 160;
/** Defer connector (track + line) until cards begin appearing */
const LINE_REVEAL_DELAY_MS = PATH_INITIAL_DELAY_MS + 120;

const CARD_MIN_H = "min-h-[14rem] sm:min-h-[15rem]";
const CARD_TRANSITION_MS = 800;

const vPath = "M 12 6 L 12 94";

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

type ConnectorProps = {
  gradientId: string;
  segmentIndex: number;
  visible: boolean;
  lineVisible: boolean;
  reduceMotion: boolean;
};

function ProcessConnector({ gradientId, segmentIndex, visible, lineVisible, reduceMotion }: ConnectorProps) {
  const delay = PATH_INITIAL_DELAY_MS + segmentIndex * SEGMENT_DURATION_MS;
  const showAnim = visible && !reduceMotion && lineVisible;

  return (
    <div
      className={`flex shrink-0 justify-center py-2 transition-opacity duration-500 ease-out ${
        lineVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden
    >
      <svg className="mx-auto h-16 w-7" viewBox="0 0 24 100" fill="none">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5AC8FA" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#2f9fd4" stopOpacity="0.95" />
            <stop offset="100%" stopColor="rgb(99, 91, 255)" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <path
          d={vPath}
          fill="none"
          stroke="#e3e8ef"
          strokeWidth="2"
          strokeLinecap="round"
          pathLength={1}
          vectorEffect="non-scaling-stroke"
          style={{ strokeDasharray: 1, strokeDashoffset: 0 }}
          opacity={0.55}
        />
        <path
          d={vPath}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="2"
          strokeLinecap="round"
          pathLength={1}
          vectorEffect="non-scaling-stroke"
          className={showAnim ? "animate-process-path-seg" : ""}
          style={{
            strokeDasharray: 1,
            strokeDashoffset: !visible ? 1 : reduceMotion ? 0 : undefined,
            animationDelay: showAnim ? `${delay}ms` : undefined,
            animationFillMode: "both",
          }}
        />
      </svg>
    </div>
  );
}

export function Process() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const reduceMotion = usePrefersReducedMotion();
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [lineVisible, setLineVisible] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const gradBase = useId().replace(/:/g, "");

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

  return (
    <div ref={ref} className="relative mx-auto max-w-6xl px-3 sm:px-6 lg:px-8">
      <ol className="m-0 mx-auto flex w-full max-w-4xl list-none flex-col items-stretch gap-y-7 p-0 sm:max-w-5xl sm:gap-y-8">
        {steps.map((s, stepIndex) => {
          const n = stepIndex + 1;
          const revealDelay = PATH_INITIAL_DELAY_MS + stepIndex * SEGMENT_DURATION_MS;
          const isLit = stepIndex <= highlightLevel;
          const seg = stepIndex > 0 ? stepIndex - 1 : -1;
          const gradId = `${gradBase}-v${seg}`;

          return (
            <li key={s.title} className="relative z-0 w-full hover:z-30 focus-within:z-30">
              {stepIndex > 0 ? (
                <ProcessConnector
                  gradientId={gradId}
                  segmentIndex={seg}
                  visible={visible}
                  lineVisible={lineVisible}
                  reduceMotion={reduceMotion}
                />
              ) : null}
              <article
                className={`relative z-0 flex min-h-0 w-full flex-col rounded-xl border bg-white p-6 text-center shadow-card-sm transition-[opacity,transform,box-shadow,ring] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:duration-0 sm:p-8 ${CARD_MIN_H} ${
                  isLit
                    ? "border-slate-200/90 ring-1 ring-ascend-cyan-dark/30"
                    : "border-ascend-border"
                } ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"} ${
                  visible && isLit ? "hover:shadow-card" : visible ? "hover:border-slate-200 hover:shadow-card" : ""
                }`}
                style={{
                  transitionDuration: `${CARD_TRANSITION_MS}ms`,
                  transitionDelay: `${revealDelay}ms`,
                }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ascend-cyan-dark">Step {n}</p>
                <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-ascend-ink sm:text-2xl">{s.title}</h3>
                <p className="mt-3 max-w-2xl flex-1 self-center text-[15px] leading-relaxed text-ascend-slate sm:text-base">
                  {s.body}
                </p>
              </article>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
