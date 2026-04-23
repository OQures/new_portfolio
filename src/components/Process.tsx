import { useReveal } from "../hooks/useReveal";

const steps = [
  { title: "Inquiry", body: "Tell us aircraft type, location, timeline, and what “done” looks like for you." },
  { title: "Assessment", body: "We align on scope, surfaces, risks, and the right sequence for your schedule." },
  { title: "Service", body: "Controlled execution with disciplined technique — clean edges, clean communication." },
  { title: "Walkthrough", body: "Final review together so the finish reads right under real-world lighting." },
];

export function Process() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="relative mx-auto max-w-3xl">
      <div
        className={`absolute bottom-3 left-[15px] top-3 w-px origin-top bg-gradient-to-b from-ascend-cyan/50 via-ascend-border to-ascend-border transition-transform duration-[900ms] ease-out motion-reduce:scale-y-100 md:left-5 ${
          visible ? "scale-y-100" : "scale-y-0"
        }`}
        aria-hidden
      />

      <ol className="relative">
        {steps.map((s, idx) => (
          <li key={s.title} className="relative pb-12 pl-12 last:pb-0 md:pl-16">
            <div
              className={`absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-ascend-ink text-xs font-bold text-white shadow-md transition-[opacity,transform] duration-500 ease-out motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:duration-0 md:left-1 md:h-9 md:w-9 md:text-sm ${
                visible ? "scale-100 opacity-100" : "scale-75 opacity-0"
              }`}
              style={{ transitionDelay: visible ? `${120 + idx * 100}ms` : "0ms" }}
            >
              {idx + 1}
            </div>
            <div
              className={`rounded-2xl border border-ascend-border bg-white p-6 shadow-card-sm transition-[opacity,transform,box-shadow] duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-card motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:duration-0 md:p-7 ${
                visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: visible ? `${80 + idx * 100}ms` : "0ms" }}
            >
              <h3 className="font-display text-lg font-bold tracking-tight text-ascend-ink">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ascend-slate">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
