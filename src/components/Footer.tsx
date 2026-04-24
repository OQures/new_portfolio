import { useReveal } from "../hooks/useReveal";

const EMAIL = "ascendaviationrefinement@gmail.com";
const PHONE_DISPLAY = "(805) 710-5901";
const PHONE_TEL = "+18057105901";

export function Footer() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <footer className="relative border-t border-white/10 bg-black py-16 text-white">
      <div
        ref={ref}
        className={`mx-auto max-w-6xl px-4 reveal-ease motion-reduce:translate-y-0 motion-reduce:opacity-100 sm:px-6 lg:px-8 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-start md:gap-16">
          <div>
            <p className="font-display text-2xl font-bold tracking-tight">Ascend Aviation Refinement</p>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/70">
              Premium aircraft detailing and refinement for owners and operators. Based in the DMV, with service
              across Pennsylvania and Washington, D.C. as well.
            </p>
          </div>
          <div className="flex flex-col gap-4 text-[15px]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ascend-cyan">Contact</p>
              <a
                href={`mailto:${EMAIL}`}
                className="mt-2 block font-medium text-white transition duration-200 hover:text-ascend-cyan"
              >
                {EMAIL}
              </a>
              <a
                href={`tel:${PHONE_TEL}`}
                className="mt-1 block font-medium text-white/90 transition duration-200 hover:text-ascend-cyan"
              >
                {PHONE_DISPLAY}
              </a>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ascend-cyan">Coverage</p>
              <p className="mt-2 text-white/70">
                Based in the DMV (D.C., Maryland, Virginia). Pennsylvania and Washington, D.C. by appointment.
              </p>
            </div>
          </div>
        </div>
        <p className="mt-14 border-t border-white/10 pt-8 text-center text-xs text-white/45">
          © {new Date().getFullYear()} Ascend Aviation Refinement. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
