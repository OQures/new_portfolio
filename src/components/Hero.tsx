import { Button } from "./Button";

type Props = {
  onQuoteClick: () => void;
};

function HeroDecor() {
  return (
    <div
      className="pointer-events-none relative hidden h-[min(420px,50vh)] w-full overflow-hidden rounded-[2rem] ring-1 ring-ascend-border/60 shadow-sm animate-fade-in select-none transition duration-700 hover:ring-ascend-cyan/25 motion-reduce:animate-none motion-reduce:opacity-100 lg:block lg:max-w-md"
      style={{ animationDelay: "320ms", animationFillMode: "both" }}
      aria-hidden
    >
      <div className="absolute -right-6 top-12 z-0 h-40 w-40 animate-pulseSlow rounded-full bg-ascend-cyan/20 blur-3xl motion-reduce:animate-none" />
      <div className="absolute -left-8 bottom-20 z-0 h-36 w-36 animate-float rounded-full bg-ascend-accent/15 blur-3xl motion-reduce:animate-none" />
      <img
        src="/hero-aviation-decor.png"
        alt=""
        className="relative z-10 h-full w-full object-cover object-center"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

export function Hero({ onQuoteClick }: Props) {
  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.75fr)] lg:gap-16">
          <div className="max-w-3xl">
            <p
              className="mb-5 inline-flex animate-fade-in-up items-center rounded-full border border-ascend-border bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-ascend-slate shadow-sm motion-reduce:animate-none motion-reduce:opacity-100"
              style={{ animationDelay: "0ms", animationFillMode: "both" }}
            >
              Based in the DMV · Serving Pennsylvania &amp; D.C.
            </p>
            <div className="w-full">
              <h1
                className="animate-headline-reveal text-balance font-display text-[2.55rem] font-extrabold leading-[1.18] tracking-[-0.02em] motion-reduce:animate-none motion-reduce:[clip-path:none] sm:text-5xl sm:leading-[1.15] sm:tracking-[-0.03em] md:text-6xl md:leading-[1.14] lg:text-[3.5rem] lg:leading-[1.16] pb-0.5"
                style={{ animationDelay: "100ms", animationFillMode: "both" }}
              >
                <span
                  className="text-gradient inline-block bg-[length:280%_100%] animate-hero-gradient-sweep bg-no-repeat motion-reduce:animate-none motion-reduce:bg-[length:100%_100%] motion-reduce:bg-[position:0%_50%]"
                  style={{ animationDelay: "120ms", animationFillMode: "both" }}
                >
                  Elevate your aircraft
                </span>
              </h1>
              <div className="relative mt-5 h-[3px] w-full sm:mt-6" aria-hidden>
                <div className="absolute inset-0 rounded-full bg-ascend-border/50" />
                <div className="relative h-[3px] w-full overflow-hidden rounded-full">
                  <div
                    className="h-full w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-ascend-cyan via-ascend-cyan-dark to-ascend-accent/60 animate-bar-grow motion-reduce:scale-x-100 motion-reduce:animate-none"
                    style={{ animationDelay: "120ms", animationFillMode: "both" }}
                  />
                </div>
              </div>
            </div>
            <p
              className="mt-6 max-w-2xl animate-fade-in-up text-lg leading-relaxed text-ascend-slate motion-reduce:animate-none motion-reduce:opacity-100 md:text-xl"
              style={{ animationDelay: "620ms", animationFillMode: "both" }}
            >
              Premium aviation refinement services that bring your aircraft to showroom condition. From meticulous
              interior detailing to flawless exterior polishing, we deliver excellence at every altitude.
            </p>
            <div
              className="mt-10 flex animate-fade-in-up flex-col gap-3 motion-reduce:animate-none motion-reduce:opacity-100 sm:flex-row sm:items-center"
              style={{ animationDelay: "720ms", animationFillMode: "both" }}
            >
              <Button variant="primary" className="animate-quote-cta-attn" onClick={onQuoteClick}>
                Request free quote
              </Button>
              <button
                type="button"
                onClick={scrollToServices}
                className="inline-flex min-h-[44px] items-center justify-center rounded-full px-6 py-3 text-[15px] font-semibold text-ascend-ink transition duration-200 ease-out hover:translate-x-0.5 hover:text-ascend-cyan-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ascend-ink active:scale-[0.98] motion-reduce:hover:translate-x-0"
              >
                View services →
              </button>
            </div>
          </div>

          <HeroDecor />
        </div>
      </div>
    </section>
  );
}
