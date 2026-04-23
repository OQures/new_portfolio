import { useReveal } from "../hooks/useReveal";

const points = [
  {
    title: "Precision-first craft",
    body: "We treat every panel, seam, and trim line as part of the story your aircraft tells on arrival.",
  },
  {
    title: "Discretion by default",
    body: "Quiet coordination, minimal drama on the ramp, and crews who understand high-expectation environments.",
  },
  {
    title: "Scheduling that respects ops",
    body: "We build around your calendar — tight turns, hangar windows, and the realities of owner/operator life.",
  },
  {
    title: "Results you can audit",
    body: "Clear scope, documented approach, and a final walkthrough so expectations land as cleanly as the finish.",
  },
];

export function Why() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="divide-y divide-ascend-border overflow-hidden rounded-2xl border border-ascend-border bg-white shadow-card-sm">
      {points.map((p, i) => (
        <div
          key={p.title}
          className={`flex flex-col gap-8 p-6 transition-[opacity,transform] duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:duration-0 sm:flex-row sm:items-start sm:gap-12 sm:p-8 md:p-10 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          } ${i % 2 === 1 ? "bg-ascend-muted/40" : "bg-white"}`}
          style={{ transitionDelay: visible ? `${i * 90}ms` : "0ms" }}
        >
          <div className="flex shrink-0 items-start gap-4 sm:w-44 sm:flex-col sm:gap-0">
            <span className="font-display text-3xl font-extrabold leading-none tracking-tight text-slate-400 sm:text-4xl">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="hidden h-1 w-10 rounded-full bg-ascend-cyan sm:block sm:mt-4" aria-hidden />
          </div>
          <div className="min-w-0 flex-1 border-l-0 sm:border-l sm:border-ascend-border sm:pl-10">
            <h3 className="font-display text-xl font-bold tracking-tight text-ascend-ink">{p.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-ascend-slate">{p.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
