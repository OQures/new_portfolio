import { useEffect, useId, useRef, useState } from "react";
import { Button } from "./Button";

const NETLIFY_FORM_NAME = "quote-request";

const serviceOptions = [
  "Interior detailing",
  "Basic exterior detailing (wet wash optional)",
  "Paint polish",
  "Ceramic coating",
  "Brightwork",
  "Multiple / not sure",
] as const;

type Props = {
  open: boolean;
  onClose: () => void;
};

type FormStatus = "idle" | "loading" | "success" | "error";

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

const inputClass =
  "mt-1.5 w-full rounded-xl border border-ascend-border bg-white px-4 py-3 text-sm text-ascend-ink outline-none ring-ascend-cyan/30 placeholder:text-slate-400 focus:border-ascend-cyan-dark focus:ring-2";

export function QuoteModal({ open, onClose }: Props) {
  const titleId = useId();
  const firstFieldRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [aircraft, setAircraft] = useState("");
  const [service, setService] = useState<string>(serviceOptions[0]);
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorText, setErrorText] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    queueMicrotask(() => firstFieldRef.current?.focus());
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setStatus("idle");
      setErrorText(null);
      setFieldErrors({});
    }
  }, [open]);

  if (!open) return null;

  const validate = () => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Please enter your name.";
    if (!email.trim()) next.email = "Please enter your email.";
    else if (!isValidEmail(email)) next.email = "Please enter a valid email.";
    if (!phone.trim()) next.phone = "Please enter your phone number.";
    if (!message.trim()) next.message = "Please add a short message with what you need.";
    if (!consent) next.consent = "Please confirm we may contact you about this request.";
    setFieldErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async () => {
    setErrorText(null);
    if (!validate()) return;

    setStatus("loading");

    const params = new URLSearchParams();
    params.set("form-name", NETLIFY_FORM_NAME);
    params.set("bot-field", "");
    params.set("name", name.trim());
    params.set("email", email.trim());
    params.set("phone", phone.trim());
    if (aircraft.trim()) params.set("aircraft", aircraft.trim());
    params.set("service", service);
    params.set("message", message.trim());
    params.set("service_region", "DMV / PA / DC");
    if (consent) params.set("consent", "yes");

    const devHint = import.meta.env.DEV
      ? " On localhost use `netlify dev`, or submit from your deployed Netlify URL."
      : "";

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      const raw = await res.text();

      if (!res.ok) {
        let apiErr: string | undefined;
        try {
          if (raw.trimStart().startsWith("{")) {
            const d = JSON.parse(raw) as { error?: string };
            if (d.error) apiErr = String(d.error);
          }
        } catch {
          /* ignore */
        }
        setStatus("error");
        setErrorText(
          apiErr || `Something went wrong (${res.status}). Please try again.${devHint}`
        );
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorText(`Network error. Check your connection and try again.${devHint}`);
    }
  };

  const onBackdropMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex animate-fade-in items-end justify-center bg-ascend-ink/40 p-4 backdrop-blur-sm motion-reduce:animate-none motion-reduce:opacity-100 sm:items-center"
      onMouseDown={onBackdropMouseDown}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="max-h-[min(92vh,860px)] w-full max-w-lg animate-scale-in overflow-y-auto rounded-2xl border border-ascend-border bg-white shadow-card outline-none motion-reduce:animate-none motion-reduce:opacity-100"
        style={{ animationFillMode: "both" }}
      >
        {status !== "success" ? (
          <div className="flex items-start justify-between gap-4 border-b border-ascend-border p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ascend-cyan-dark">Free quote</p>
              <h2 id={titleId} className="mt-1 font-display text-2xl font-bold tracking-tight text-ascend-ink">
                Tell us about your aircraft
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ascend-slate">
                We serve the DMV, Pennsylvania, and D.C. We&apos;ll follow up with availability and next steps.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-ascend-border bg-white px-3 py-1.5 text-sm font-medium text-ascend-slate transition hover:border-slate-300 hover:text-ascend-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ascend-ink"
              aria-label="Close quote form"
            >
              Close
            </button>
          </div>
        ) : null}

        <div className="p-6">
          {status === "success" ? (
            <div className="rounded-xl border border-ascend-border bg-ascend-muted p-6 text-center">
              <h2 id={titleId} className="font-display text-xl font-bold text-ascend-ink">
                Submission received!
              </h2>
              <p className="mt-3 text-base font-medium text-ascend-ink">We&apos;ll be in touch shortly!</p>
              <p className="mt-3 text-sm leading-relaxed text-ascend-slate">
                If you don&apos;t hear from us within one business day, email{" "}
                <a
                  className="font-semibold text-ascend-cyan-dark underline-offset-4 hover:underline"
                  href="mailto:ascendaviationrefinement@gmail.com"
                >
                  ascendaviationrefinement@gmail.com
                </a>
                .
              </p>
              <Button variant="primary" className="mt-6 w-full" onClick={onClose}>
                Done
              </Button>
            </div>
          ) : (
            <form
              name={NETLIFY_FORM_NAME}
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                void submit();
              }}
            >
              <input type="hidden" name="form-name" value={NETLIFY_FORM_NAME} />
              <input
                type="text"
                name="bot-field"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                className="pointer-events-none absolute left-[-10000px] h-px w-px opacity-0"
              />
              <div>
                <label htmlFor="q-name" className="text-sm font-medium text-ascend-ink">
                  Full name
                </label>
                <input
                  ref={firstFieldRef}
                  id="q-name"
                  name="name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                  placeholder="Jordan Avery"
                />
                {fieldErrors.name ? <p className="mt-1 text-xs text-red-600">{fieldErrors.name}</p> : null}
              </div>

              <div>
                <label htmlFor="q-email" className="text-sm font-medium text-ascend-ink">
                  Email
                </label>
                <input
                  id="q-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                  placeholder="you@company.com"
                />
                {fieldErrors.email ? <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p> : null}
              </div>

              <div>
                <label htmlFor="q-phone" className="text-sm font-medium text-ascend-ink">
                  Phone
                </label>
                <input
                  id="q-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputClass}
                  placeholder="(301) 555-0123"
                />
                {fieldErrors.phone ? <p className="mt-1 text-xs text-red-600">{fieldErrors.phone}</p> : null}
              </div>

              <div>
                <label htmlFor="q-aircraft" className="text-sm font-medium text-ascend-ink">
                  Aircraft type / tail number <span className="font-normal text-ascend-slate-soft">(optional)</span>
                </label>
                <input
                  id="q-aircraft"
                  name="aircraft"
                  value={aircraft}
                  onChange={(e) => setAircraft(e.target.value)}
                  className={inputClass}
                  placeholder="e.g. G650 / N123AB"
                />
              </div>

              <div>
                <label htmlFor="q-service" className="text-sm font-medium text-ascend-ink">
                  Service interest
                </label>
                <select
                  id="q-service"
                  name="service"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className={inputClass}
                >
                  {serviceOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="q-message" className="text-sm font-medium text-ascend-ink">
                  Project details
                </label>
                <textarea
                  id="q-message"
                  name="message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`${inputClass} resize-y`}
                  placeholder="Airport or hangar, timeline, condition notes, and any must-haves."
                />
                {fieldErrors.message ? <p className="mt-1 text-xs text-red-600">{fieldErrors.message}</p> : null}
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-ascend-border bg-ascend-muted/80 p-4">
                <input
                  id="q-consent"
                  name="consent"
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-ascend-border text-ascend-ink focus:ring-ascend-cyan-dark"
                />
                <label htmlFor="q-consent" className="text-sm leading-relaxed text-ascend-slate">
                  I agree Ascend Aviation Refinement may contact me about this quote request.
                </label>
              </div>
              {fieldErrors.consent ? <p className="text-xs text-red-600">{fieldErrors.consent}</p> : null}

              {errorText ? (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">{errorText}</div>
              ) : null}

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Button type="button" variant="ghost" className="sm:order-1" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" className="sm:order-2" disabled={status === "loading"}>
                  {status === "loading" ? "Sending…" : "Submit request"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
