import { useReveal } from "../hooks/useReveal";

const points = [
  {
    title: "Finish that holds up close",
    body: "We spend real time on paint, glass, and brightwork so the aircraft still looks right when someone walks it from a few feet away, not only from across the ramp.",
  },
  {
    title: "Quiet, coordinated ramp work",
    body: "We line up with you or your hangar, show up ready, and keep the job tidy. No loud routines or extra theater that does not help your day.",
  },
  {
    title: "Scheduling that fits real flying",
    body: "Tight turns and short hangar windows are normal. Tell us what you need; we will tell you honestly if the timing works.",
  },
  {
    title: "Walk-through before we pack up",
    body: "Scope is clear up front. At the end we go through the aircraft with you so we agree it is done before we roll up hoses and leave.",
  },
];

export function Why() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="grid gap-5 sm:grid-cols-2 sm:gap-6">
      {points.map((p, i) => (
        <article
          key={p.title}
          className={`rounded-xl border border-ascend-border bg-white p-5 shadow-card-sm transition-[opacity,transform,box-shadow] duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:duration-0 sm:p-6 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          } ${visible ? "hover:border-slate-200 hover:shadow-card" : ""}`}
          style={{ transitionDelay: visible ? `${i * 70}ms` : "0ms" }}
        >
          <span className="mb-4 block h-1 w-9 rounded-full bg-ascend-cyan" aria-hidden />
          <h3 className="font-display text-lg font-bold tracking-tight text-ascend-ink sm:text-xl">{p.title}</h3>
          <p className="mt-2.5 text-[15px] leading-relaxed text-ascend-slate">{p.body}</p>
        </article>
      ))}
    </div>
  );
}
