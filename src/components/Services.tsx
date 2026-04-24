import { useState } from "react";
import { useReveal } from "../hooks/useReveal";
import { ServiceDetailModal, type ServiceDetailData } from "./ServiceDetailModal";

const compactImgFocus = "object-[center_62%] sm:object-[center_64%]";
const imgFocusInterior = "object-[center_68%] sm:object-[center_70%]";
const imgFocusExterior = "object-[center_62%] sm:object-[center_64%]";

type ServiceEntry = {
  title: string;
  body: string;
  image: {
    src: string;
    alt: string;
    objectClass: string;
  };
  details: {
    intro: string;
    bullets: readonly string[];
  };
  /** When false, card shows a quote CTA instead of opening the details modal. */
  opensDetails?: boolean;
};

const standardServices: ServiceEntry[] = [
  {
    title: "Interior detailing",
    body: "Deep cabin reset with aviation-appropriate products, tight Q/A, and attention to touchpoints, trim, and finishes that should read like new.",
    image: {
      src: "/services-interior-detail.png",
      alt: "Blueprint-style illustration of a luxury aircraft cabin interior",
      objectClass: imgFocusInterior,
    },
    details: {
      intro:
        "Your cabin is reset with the restraint aircraft interiors demand: delicate attention where avionics live, restorative care on leathers and textiles, and sanitation where passengers actually touch, finished with a walk-through that catches what a rushed pass never would.",
      bullets: [
        "Cockpit and displays: controlled, low-risk techniques that clean without inviting moisture or chemistry where it does not belong.",
        "Leather, vinyl, and soft trim: conditioned for a supple, uniform look; carpets extracted when extraction is the right lever.",
        "Galleys, lavs, and tray tables: disinfected to a consistent standard so the cabin reads fresh, not merely wiped down.",
        "Elevated add-ons when you need them: structured disinfection sweeps, biological mess response with proper containment, and allergy-directed galley programs, scoped and priced up front.",
      ],
    },
  },
  {
    title: "Basic exterior detailing",
    body: "Structured exterior program to restore clarity and cleanliness, with an optional wet wash when timing, environment, and aircraft condition allow.",
    image: {
      src: "/services-exterior-detail.png",
      alt: "Blueprint-style illustration of a technician detailing a small aircraft on the tarmac",
      objectClass: imgFocusExterior,
    },
    details: {
      intro:
        "A nose-to-tail exterior that reads deliberate: walk-first mindset, careful protection of sensitive areas, and wash discipline that lifts contamination without stressing paint, glass, or brightwork-adjacent edges.",
      bullets: [
        "Heavy lifting where traffic is ugly: degrease and wash-down sequencing tuned for grease, exhaust film, and ramp grime.",
        "Wings and windscreen handled with technique that respects glass: controlled passes where bugs and grit like to hide.",
        "Belly and underbody work that breaks grease free, then cleans back to a neutral surface: no half-step residue story at tie-down.",
        "Final refinish pass and QC so you leave with even reflectivity and nothing you regret under hangar lights.",
      ],
    },
  },
];

const specializedServices: ServiceEntry[] = [
  {
    title: "Paint polish",
    body: "Measured defect removal and gloss recovery, calibrated for aircraft substrates and the realities of ramp operations.",
    image: {
      src: "/services-paint-polish.png",
      alt: "Blueprint-style illustration of a technician power-polishing an aircraft nose cowling",
      objectClass: compactImgFocus,
    },
    details: {
      intro:
        "Paint restored in disciplined stages: the surface is confirmed clean, then polished methodically so gloss returns without the lottery of aggressive single-step shortcuts.",
      bullets: [
        "Section-by-section machine work with staged abrasives and pads matched to what the finish can safely give.",
        "Inter-stage cleaning so each grade starts on honest skin: less carryover, more predictable depth recovery.",
        "Finishing passes that tighten micro-scratch chatter and leave paint that looks intentional from nose to empennage.",
        "Signed-off inspection under moving light, with a surface ready for protection or show.",
      ],
    },
  },
  {
    title: "Ceramic coating",
    body: "Durable protection where it fits your operation, with improved slickness and easier washdowns while preserving depth.",
    image: {
      src: "/services-ceramic-coating.png",
      alt: "Blueprint-style illustration of a technician applying coating to an aircraft fuselage",
      objectClass: compactImgFocus,
    },
    details: {
      intro:
        "Protection you can feel: professional ceramic systems applied in controlled tiles so coverage is even, cure is respected, and the result is slick, coherent depth, not patchy high spots.",
      bullets: [
        "Film tier matched to how hard you fly the aircraft and the level of investment you want on the wall.",
        "Strict prep and small-area application patterns that chase uniformity over speed.",
        "Flash- and buff-controlled finishing for a glass-smooth feel and consistent water behavior across the job.",
        "Straight talk on what ceramic improves for day-two maintenance, and what it never pretends to fix.",
      ],
    },
  },
  {
    title: "Brightwork",
    body: "Metalwork refined to a controlled shine with disciplined masking, consistent directionality, and expectations set up front.",
    image: {
      src: "/services-brightwork.png",
      alt: "Blueprint-style illustration of a technician polishing aircraft brightwork on the wing leading edge",
      objectClass: compactImgFocus,
    },
    details: {
      intro:
        "Leading edges and bright metal brought back with aviation-grade patience: aggressive work only where it earns the right, adjacent structure protected like insurance, and finish lines you are proud to park under lights.",
      bullets: [
        "Precision masking and draping so paint, seals, and composites stay out of the polishing line of fire.",
        "Multi-grade progression from correction to finish: each step earns the next instead of skipping to shine.",
        "Machine passes kept in a controlled envelope so metal heats and cools predictably: less drama, more control.",
        "Final hand-back cleaning and an even specular line that reads premium from approach to walk-around.",
      ],
    },
  },
  {
    title: "Other specialized work",
    body: "If you do not see your service here, ask anyway. We often take related jobs, from small touch-ups to longer services. Use the quote form and we will be straight with you about fit, timing, and how we would handle it.",
    image: {
      src: "/services-specialized-more.png",
      alt: "Blueprint-style illustration of professional detailing tools and supplies",
      objectClass: compactImgFocus,
    },
    details: {
      intro: "",
      bullets: [] as const,
    },
    opensDetails: false,
  },
];

const cardBase =
  "group relative flex h-full min-h-[clamp(23.5rem,36dvh,30rem)] max-h-[min(38rem,82dvh)] flex-col overflow-hidden rounded-2xl border border-ascend-border bg-white p-7 shadow-card-sm motion-reduce:translate-y-0 motion-reduce:opacity-100 transition-[opacity,transform,box-shadow,border-color] duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-slate-200 hover:shadow-card motion-reduce:duration-0";

const compactImageStrip =
  "-mx-7 -mt-7 mb-5 h-40 shrink-0 overflow-hidden rounded-t-2xl border-b border-ascend-border bg-ascend-muted/30 sm:h-44";

const detailsBtnCompact =
  "mt-auto inline-flex min-h-[44px] shrink-0 translate-y-1 items-center gap-2 rounded-lg pt-4 text-sm font-semibold text-ascend-cyan-dark opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ascend-cyan-dark motion-reduce:translate-y-0 motion-reduce:opacity-100";

const quoteCtaBtn =
  "animate-quote-cta-attn mt-auto inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-lg pt-4 text-sm font-semibold text-ascend-cyan-dark underline-offset-4 transition hover:text-ascend-ink hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ascend-cyan-dark";

const tierLabelClass =
  "font-display text-lg font-bold tracking-tight text-ascend-ink sm:text-xl lg:max-w-[11rem]";

function toDetailPayload(s: ServiceEntry): ServiceDetailData {
  return {
    title: s.title,
    summary: s.body,
    image: s.image,
    intro: s.details.intro,
    bullets: s.details.bullets,
  };
}

type ServiceCardProps = {
  service: ServiceEntry;
  globalIndex: number;
  visible: boolean;
  onDetails: (s: ServiceEntry) => void;
  onQuoteClick: () => void;
};

function ServiceCard({ service: s, globalIndex, visible, onDetails, onQuoteClick }: ServiceCardProps) {
  const showDetails = s.opensDetails !== false;

  return (
    <article
      className={`${cardBase} ${visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
      style={{ transitionDelay: visible ? `${globalIndex * 75}ms` : "0ms" }}
    >
      <div className={compactImageStrip}>
        <img
          src={s.image.src}
          alt={s.image.alt}
          className={`h-full w-full object-cover ${s.image.objectClass}`}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <h3 className="shrink-0 font-display text-lg font-bold tracking-tight text-ascend-ink">{s.title}</h3>
        <p className="mt-3 min-h-0 flex-1 overflow-y-auto text-[15px] leading-relaxed text-ascend-slate [scrollbar-gutter:stable]">
          {s.body}
        </p>
        {showDetails ? (
          <button type="button" className={detailsBtnCompact} onClick={() => onDetails(s)}>
            <span>Details</span>
            <span aria-hidden>→</span>
          </button>
        ) : (
          <button type="button" className={quoteCtaBtn} onClick={onQuoteClick}>
            <span>Request free quote</span>
            <span aria-hidden>→</span>
          </button>
        )}
      </div>
    </article>
  );
}

type ServicesProps = {
  onRequestQuote: () => void;
};

export function Services({ onRequestQuote }: ServicesProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [detail, setDetail] = useState<ServiceDetailData | null>(null);

  const standardOffset = 0;
  const specializedOffset = standardServices.length;

  return (
    <>
      <div ref={ref} className="flex flex-col gap-10 lg:gap-14">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-8">
          <div className="grid min-h-0 min-w-0 flex-1 auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-6">
            {standardServices.map((s, i) => (
              <ServiceCard
                key={s.title}
                service={s}
                globalIndex={standardOffset + i}
                visible={visible}
                onDetails={(svc) => setDetail(toDetailPayload(svc))}
                onQuoteClick={onRequestQuote}
              />
            ))}
          </div>
          <div
            className={`flex shrink-0 flex-col justify-center border-t border-ascend-border pt-6 text-right lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0 ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"} transition-[opacity,transform] duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:translate-y-0 motion-reduce:opacity-100`}
            style={{ transitionDelay: visible ? `${(standardServices.length - 1) * 75 + 80}ms` : "0ms" }}
          >
            <p className={`${tierLabelClass} lg:ml-auto`}>Standard services</p>
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-10 xl:gap-12">
          <div
            className={`flex shrink-0 flex-col justify-center border-b border-ascend-border pb-6 text-left lg:border-b-0 lg:border-r lg:pr-6 lg:pb-0 ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"} transition-[opacity,transform] duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:translate-y-0 motion-reduce:opacity-100`}
            style={{ transitionDelay: visible ? `${specializedOffset * 75}ms` : "0ms" }}
          >
            <p className={tierLabelClass}>Specialized services</p>
          </div>
          <div className="grid min-h-0 min-w-0 flex-1 auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-2 lg:gap-8 2xl:grid-cols-4 2xl:gap-10">
            {specializedServices.map((s, i) => (
              <ServiceCard
                key={s.title}
                service={s}
                globalIndex={specializedOffset + i}
                visible={visible}
                onDetails={(svc) => setDetail(toDetailPayload(svc))}
                onQuoteClick={onRequestQuote}
              />
            ))}
          </div>
        </div>
      </div>
      <ServiceDetailModal open={detail !== null} service={detail} onClose={() => setDetail(null)} />
    </>
  );
}
