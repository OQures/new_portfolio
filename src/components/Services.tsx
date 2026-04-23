import { useReveal } from "../hooks/useReveal";

/** Shared image framing for compact (top-strip) cards */
const compactImgFocus = "object-[center_62%] sm:object-[center_64%]";
/** Featured right-panel: interior (vertical emphasis) vs exterior-style scenes */
const featuredImgFocusInterior = "object-[center_68%] sm:object-[center_70%]";
const featuredImgFocusExterior = "object-[center_62%] sm:object-[center_64%]";

const services = [
  {
    title: "Interior detailing",
    body: "Deep cabin reset with aviation-appropriate products, tight Q/A, and attention to touchpoints, trim, and finishes that should read like new.",
    featured: true,
    image: {
      src: "/services-interior-detail.png",
      alt: "Blueprint-style illustration of a luxury aircraft cabin interior",
      objectClass: featuredImgFocusInterior,
    },
  },
  {
    title: "Basic exterior detailing",
    body: "Structured exterior program to restore clarity and cleanliness — with an optional wet wash when timing, environment, and aircraft condition allow.",
    featured: true,
    image: {
      src: "/services-exterior-detail.png",
      alt: "Blueprint-style illustration of a technician detailing a small aircraft on the tarmac",
      objectClass: featuredImgFocusExterior,
    },
  },
  {
    title: "Paint polish",
    body: "Measured defect removal and gloss recovery, calibrated for aircraft substrates and the realities of ramp operations.",
    featured: false,
    image: {
      src: "/services-paint-polish.png",
      alt: "Blueprint-style illustration of a technician power-polishing an aircraft nose cowling",
      objectClass: compactImgFocus,
    },
  },
  {
    title: "Ceramic coating",
    body: "Durable protection where it fits your operation — improved slickness and easier washdowns while preserving depth.",
    featured: false,
    image: {
      src: "/services-ceramic-coating.png",
      alt: "Blueprint-style illustration of a technician applying coating to an aircraft fuselage",
      objectClass: compactImgFocus,
    },
  },
  {
    title: "Brightwork",
    body: "Metalwork refined to a controlled shine with disciplined masking, consistent directionality, and expectations set up front.",
    featured: false,
    image: {
      src: "/services-paint-polish.png",
      alt: "Representative blueprint-style illustration of aircraft exterior refinement work",
      objectClass: compactImgFocus,
    },
  },
] as const;

const cardBase =
  "group relative flex flex-col overflow-hidden rounded-2xl border border-ascend-border bg-white shadow-card-sm motion-reduce:translate-y-0 motion-reduce:opacity-100 transition-[opacity,transform,box-shadow,border-color] duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-slate-200 hover:shadow-card motion-reduce:duration-0";

const featuredPadding = "p-8 lg:col-span-2 lg:flex-row lg:items-stretch lg:gap-10 lg:p-10";
const compactPadding = "p-7";

const compactImageStrip =
  "-mx-7 -mt-7 mb-5 h-40 overflow-hidden rounded-t-2xl border-b border-ascend-border bg-ascend-muted/30 sm:h-44";

const featuredImageShell =
  "relative h-44 w-full max-w-sm overflow-hidden rounded-2xl border border-ascend-border shadow-inner ring-1 ring-black/[0.03] transition duration-500 group-hover:border-ascend-cyan/30 sm:h-48 lg:h-52 lg:max-w-md";

export function Services() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
      {services.map((s, i) => (
        <article
          key={s.title}
          className={`${cardBase} ${
            visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          } ${s.featured ? featuredPadding : compactPadding} ${
            s.title === "Brightwork" ? "lg:col-span-2" : ""
          }`}
          style={{ transitionDelay: visible ? `${i * 75}ms` : "0ms" }}
        >
          {s.featured ? (
            <>
              <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-ascend-cyan/10 blur-3xl transition duration-500 group-hover:bg-ascend-cyan/15" />
              <div className="relative flex min-w-0 flex-1 flex-col justify-center lg:max-w-[58%] lg:pr-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ascend-cyan-dark">Featured</p>
                <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-ascend-ink md:text-3xl">
                  {s.title}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-ascend-slate md:text-base">{s.body}</p>
              </div>
              <div className="relative mt-8 flex flex-1 items-stretch justify-start lg:mt-0 lg:min-h-[220px] lg:items-center lg:justify-center">
                <div className={featuredImageShell}>
                  <img
                    src={s.image.src}
                    alt={s.image.alt}
                    className={`h-full w-full object-cover ${s.image.objectClass}`}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={compactImageStrip}>
                <img
                  src={s.image.src}
                  alt={s.image.alt}
                  className={`h-full w-full object-cover ${s.image.objectClass}`}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h3 className="font-display text-lg font-bold tracking-tight text-ascend-ink">{s.title}</h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ascend-slate">{s.body}</p>
              <div className="mt-6 flex translate-y-1 items-center gap-2 text-sm font-semibold text-ascend-cyan-dark opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100">
                <span>Details</span>
                <span aria-hidden>→</span>
              </div>
            </>
          )}
        </article>
      ))}
    </div>
  );
}
