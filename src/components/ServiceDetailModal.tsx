import { useEffect, useId, useRef } from "react";

export type ServiceDetailData = {
  title: string;
  summary: string;
  image: {
    src: string;
    alt: string;
    objectClass: string;
  };
  intro: string;
  bullets: readonly string[];
};

type Props = {
  open: boolean;
  service: ServiceDetailData | null;
  onClose: () => void;
};

export function ServiceDetailModal({ open, service, onClose }: Props) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    queueMicrotask(() => closeRef.current?.focus());
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open || !service) return null;

  const onBackdropMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[99] flex animate-fade-in items-end justify-center bg-ascend-ink/45 p-4 backdrop-blur-sm motion-reduce:animate-none motion-reduce:opacity-100 sm:items-center"
      onMouseDown={onBackdropMouseDown}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="max-h-[min(90vh,720px)] w-full max-w-lg animate-service-modal-rise overflow-y-auto rounded-2xl border border-ascend-border bg-white shadow-card outline-none motion-reduce:animate-none motion-reduce:scale-100 motion-reduce:opacity-100"
        style={{ animationFillMode: "both" }}
      >
        <div className="relative h-44 shrink-0 overflow-hidden rounded-t-2xl border-b border-ascend-border sm:h-48">
          <img
            src={service.image.src}
            alt={service.image.alt}
            className={`h-full w-full object-cover ${service.image.objectClass}`}
            loading="eager"
            decoding="async"
          />
        </div>

        <div className="flex items-start justify-between gap-4 border-b border-ascend-border px-6 pb-5 pt-5">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ascend-cyan-dark">Service briefing</p>
            <h2 id={titleId} className="mt-1 font-display text-2xl font-bold tracking-tight text-ascend-ink">
              {service.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ascend-slate">{service.summary}</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-full border border-ascend-border bg-white px-3 py-1.5 text-sm font-medium text-ascend-slate transition hover:border-slate-300 hover:text-ascend-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ascend-ink"
            aria-label="Close service details"
          >
            Close
          </button>
        </div>

        <div className="relative overflow-hidden px-6 pb-6 pt-5">
          <div className="pointer-events-none absolute -right-8 top-0 h-32 w-32 rounded-full bg-ascend-cyan/10 blur-2xl" aria-hidden />
          <p className="relative text-[15px] leading-relaxed text-ascend-slate">{service.intro}</p>
          <ul className="relative mt-4 space-y-2.5 text-[15px] leading-relaxed text-ascend-slate">
            {service.bullets.map((line, idx) => (
              <li key={idx} className="flex gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ascend-cyan-dark/80" aria-hidden />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
