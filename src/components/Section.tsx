import type { ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";

type Tone = "default" | "muted" | "dark";

type Props = {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  tone?: Tone;
};

export function Section({ id, eyebrow, title, subtitle, children, className = "", tone = "default" }: Props) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  const toneClass =
    tone === "muted"
      ? "bg-ascend-muted"
      : tone === "dark"
        ? "bg-ascend-ink text-white"
        : "bg-transparent";

  const eyebrowClass = tone === "dark" ? "text-ascend-cyan" : "text-ascend-cyan-dark";
  const titleClass = tone === "dark" ? "text-white" : "text-ascend-ink";
  const subtitleClass = tone === "dark" ? "text-white/75" : "text-ascend-slate";

  return (
    <section id={id} className={`relative py-20 md:py-28 ${toneClass} ${className}`.trim()}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`reveal-ease mb-14 max-w-3xl motion-reduce:translate-y-0 motion-reduce:opacity-100 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {eyebrow ? (
            <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.22em] ${eyebrowClass}`}>{eyebrow}</p>
          ) : null}
          <h2
            className={`font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-[1.1] ${titleClass}`}
          >
            {title}
          </h2>
          {subtitle ? (
            <p className={`mt-4 text-lg leading-relaxed md:text-xl ${subtitleClass}`}>{subtitle}</p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
