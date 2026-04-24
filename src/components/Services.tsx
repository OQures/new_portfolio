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
    body: "A full cabin refresh with aircraft-safe products. We clean what people touch, care for leather and trim, and walk the cabin with you before we wrap.",
    image: {
      src: "/services-interior-detail.png",
      alt: "Blueprint-style illustration of a luxury aircraft cabin interior",
      objectClass: imgFocusInterior,
    },
    details: {
      intro:
        "We work carefully around avionics and sensitive areas, bring leather and fabrics back to a neat, even look, and sanitize galleys, lavs, and tray tables to a steady standard. When we are done, we review the cabin with you so nothing obvious gets missed.",
      bullets: [
        "Cockpit and displays: careful cleaning that avoids extra moisture or harsh chemicals where they do not belong.",
        "Leather, vinyl, and soft trim: cleaned and conditioned so it looks even, not dry or patchy; carpets shampooed when it helps.",
        "Galleys, lavs, and tray tables: wiped and disinfected so the cabin feels fresh, not just “quick wiped.”",
        "Add-ons when you need them: deeper disinfection, help after a messy spill (with containment), or galley-focused work for allergies, priced clearly up front.",
      ],
    },
  },
  {
    title: "Basic exterior detailing",
    body: "Nose-to-tail exterior cleaning to clear dirt and film. We add a wet wash only when it is safe for your paint, the weather, and where the plane sits.",
    image: {
      src: "/services-exterior-detail.png",
      alt: "Blueprint-style illustration of a technician detailing a small aircraft on the tarmac",
      objectClass: imgFocusExterior,
    },
    details: {
      intro:
        "We start with a walk-around, tape or cover what needs protection, then wash and rinse in an order that pulls grease and ramp grime off without beating up paint, glass, or polished metal edges.",
      bullets: [
        "Degrease and wash where exhaust and ramp dirt build up, starting with wings, fuselage, and high-traffic areas.",
        "Windscreen and windows: slower passes so grit does not scratch the glass.",
        "Belly and gear areas: grease broken down, then rinsed so you are not left with streaky residue.",
        "Final wipe-down and quick check in good light so the finish looks even before you fly.",
      ],
    },
  },
];

const specializedServices: ServiceEntry[] = [
  {
    title: "Paint polish",
    body: "We remove light swirls and oxidation and bring back gloss, using steps and pads suited to aircraft paint and real ramp conditions.",
    image: {
      src: "/services-paint-polish.png",
      alt: "Blueprint-style illustration of a technician power-polishing an aircraft nose cowling",
      objectClass: compactImgFocus,
    },
    details: {
      intro:
        "After the paint is clean and dry, we polish in stages: milder steps first, then only what the finish can handle. The goal is clearer paint without chasing a “quick fix” that thins the clearcoat.",
      bullets: [
        "Work in sections with pads and compounds chosen for what your paint can take.",
        "Rinse or wipe between stages so each step starts on a clean surface.",
        "Finishing passes to calm fine scratches and even out the shine from nose to tail.",
        "Final look under a moving light so you can see the job before wax, sealant, or coating.",
      ],
    },
  },
  {
    title: "Ceramic coating",
    body: "A long-lasting coating that beads water and makes washing easier when it fits how you use the aircraft.",
    image: {
      src: "/services-ceramic-coating.png",
      alt: "Blueprint-style illustration of a technician applying coating to an aircraft fuselage",
      objectClass: compactImgFocus,
    },
    details: {
      intro:
        "We apply professional ceramic products in small areas at a time so coverage stays even, cure times are respected, and you do not end up with dull highs and shiny lows.",
      bullets: [
        "Product level matched to how often you fly and how much protection you want.",
        "Prep first: wash, decontaminate, and polish only if the paint needs it so the coating bonds well.",
        "Apply and level by hand so the surface feels smooth and water sheets evenly.",
        "We tell you plainly what ceramic helps with day to day, and what it does not fix on its own.",
      ],
    },
  },
  {
    title: "Brightwork",
    body: "Polished metal brought back to a clean shine. We mask nearby paint and seals, keep strokes even, and set expectations before we start.",
    image: {
      src: "/services-brightwork.png",
      alt: "Blueprint-style illustration of a technician polishing aircraft brightwork on the wing leading edge",
      objectClass: compactImgFocus,
    },
    details: {
      intro:
        "Leading edges and bright trim get patient, step-by-step work. We only cut hard where it is needed, keep paint and seals covered, and aim for a steady shine you are happy to show under hangar lights.",
      bullets: [
        "Mask and drape so paint, plastic, and composites stay clear of polish splatter.",
        "Start with coarser steps only where needed, then refine so the metal looks even, not wavy.",
        "Steady machine speed and pressure so the metal does not overheat.",
        "Final wipe and walk-around so the reflection looks even from a few steps back.",
      ],
    },
  },
  {
    title: "Other specialized work",
    body: "Do not see your job listed? Ask anyway. We take many related tasks, from small touch-ups to longer projects. Request a quote, and we will be honest about timing, fit, and how we would tackle it.",
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
  "animate-quote-cta-attn-services inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-ascend-cyan/25 bg-white px-4 py-2.5 text-sm font-semibold text-ascend-ink shadow-sm transition duration-200 ease-out hover:border-ascend-cyan-dark/35 hover:bg-ascend-muted/40 hover:text-ascend-cyan-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ascend-cyan-dark";

const quoteCtaRow = "mt-auto flex shrink-0 justify-end pt-3 -me-2 -mb-2 sm:-me-3 sm:-mb-2.5";

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
          <div className={quoteCtaRow}>
            <button type="button" className={quoteCtaBtn} onClick={onQuoteClick}>
              <span>Request free quote</span>
              <span aria-hidden>→</span>
            </button>
          </div>
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
          <div className="grid min-h-0 min-w-0 flex-1 auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-2 lg:gap-8">
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
