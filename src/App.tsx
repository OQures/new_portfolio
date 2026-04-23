import { useState } from "react";
import { useReveal } from "./hooks/useReveal";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { PageBackdrop } from "./components/PageBackdrop";
import { Process } from "./components/Process";
import { QuoteModal } from "./components/QuoteModal";
import { Section } from "./components/Section";
import { Services } from "./components/Services";
import { Why } from "./components/Why";

function QuoteSection({ onOpen }: { onOpen: () => void }) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="quote" className="relative scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`reveal-ease motion-reduce:translate-y-0 motion-reduce:opacity-100 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="relative overflow-hidden rounded-3xl bg-ascend-ink px-8 py-12 text-white shadow-card transition duration-500 hover:shadow-[0_40px_100px_-30px_rgba(90,200,250,0.15)] md:px-14 md:py-16 motion-reduce:hover:shadow-card">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 animate-pulseSlow rounded-full bg-ascend-cyan/25 blur-3xl motion-reduce:animate-none" />
            <div className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 animate-float rounded-full bg-ascend-accent/20 blur-3xl motion-reduce:animate-none" />
            <div className="relative max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ascend-cyan">Get started</p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Request your free quote.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-white/75 md:text-xl">
                Share a few details and we&apos;ll respond with availability, a suggested scope, and pricing direction.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={onOpen}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-white px-6 py-3 text-[15px] font-semibold text-ascend-ink shadow-card-sm transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.98] motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100"
                >
                  Open quote form
                </button>
                <a
                  href="mailto:ascendaviationrefinement@gmail.com?subject=Quote%20request%20%E2%80%94%20Ascend%20Aviation%20Refinement"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-white/25 bg-transparent px-6 py-3 text-[15px] font-semibold text-white transition duration-200 ease-out hover:border-white/50 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.98] motion-reduce:active:scale-100"
                >
                  Email us instead
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <PageBackdrop />
      <Navbar onQuoteClick={() => setQuoteOpen(true)} />
      <main>
        <Hero onQuoteClick={() => setQuoteOpen(true)} />

        <Section
          id="services"
          eyebrow="Services"
          title="Everything you need to keep your aircraft presentation-ready."
          subtitle="Five focused programs — scoped clearly, executed consistently, and tuned for the way you operate in the DMV, Pennsylvania, and D.C."
          tone="muted"
        >
          <Services />
        </Section>

        <Section
          id="why"
          eyebrow="Why Ascend"
          title="Operational polish, not just cosmetic shine."
          subtitle="We built Ascend around the moments that matter: arrival presence, cabin first impressions, and finishes that hold up to real-world scrutiny."
        >
          <Why />
        </Section>

        <Section
          id="process"
          eyebrow="How it works"
          title="From inquiry to sign-off, without surprises."
          subtitle="Clear communication, tight sequencing, and a finish you can approve with confidence."
          tone="muted"
        >
          <Process />
        </Section>

        <QuoteSection onOpen={() => setQuoteOpen(true)} />
      </main>
      <Footer />
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
}
