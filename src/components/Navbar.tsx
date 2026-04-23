import { useEffect, useId, useState } from "react";
import { Button } from "./Button";

type Props = {
  onQuoteClick: () => void;
};

const links = [
  { href: "#services", label: "Services" },
  { href: "#why", label: "Why Ascend" },
  { href: "#process", label: "Process" },
  { href: "#quote", label: "Quote" },
];

function IconMenu({ open }: { open: boolean }) {
  return (
    <span className="relative block h-5 w-6" aria-hidden>
      <span
        className={`absolute left-0 top-0 block h-0.5 w-6 rounded-full bg-ascend-ink transition ${
          open ? "translate-y-2 rotate-45" : ""
        }`}
      />
      <span
        className={`absolute left-0 top-2 block h-0.5 w-6 rounded-full bg-ascend-ink transition ${open ? "opacity-0" : ""}`}
      />
      <span
        className={`absolute left-0 top-4 block h-0.5 w-6 rounded-full bg-ascend-ink transition ${
          open ? "-translate-y-2 -rotate-45" : ""
        }`}
      />
    </span>
  );
}

export function Navbar({ onQuoteClick }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const handleQuote = () => {
    closeMenu();
    onQuoteClick();
  };

  return (
    <header className="relative sticky top-0 z-40 animate-nav-enter border-b border-ascend-border/80 bg-white/90 shadow-nav backdrop-blur-md motion-reduce:animate-none motion-reduce:opacity-100">
      <div className="relative z-10 mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6 lg:px-8">
        <a href="#" className="group flex min-w-0 flex-1 items-center gap-2 sm:gap-3" onClick={closeMenu}>
          <img
            src="/logo.png"
            alt="Ascend Aviation Refinement"
            className="h-11 w-11 shrink-0 object-contain sm:h-12 sm:w-12"
            width={48}
            height={48}
          />
          <span className="hidden min-w-0 sm:block">
            <span className="block truncate font-display text-sm font-bold leading-tight tracking-tight text-ascend-ink sm:text-base">
              Ascend
            </span>
            <span className="block truncate text-[11px] font-medium uppercase tracking-[0.14em] text-ascend-slate-soft">
              Aviation Refinement
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ascend-slate underline-offset-[6px] transition duration-200 ease-out hover:text-ascend-ink hover:underline hover:decoration-ascend-cyan/50"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Button
            variant="primary"
            className="!min-h-[40px] !px-3 !py-2 text-xs sm:!min-h-[44px] sm:!px-5 sm:!text-[15px]"
            onClick={handleQuote}
          >
            Free quote
          </Button>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-ascend-border bg-white text-ascend-ink shadow-sm transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ascend-ink md:hidden"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <IconMenu open={menuOpen} />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-x-0 bottom-0 top-[3.75rem] z-[35] animate-fade-in bg-ascend-ink/25 backdrop-blur-[2px] motion-reduce:animate-none motion-reduce:opacity-100 md:hidden sm:top-16"
            aria-label="Close menu"
            onClick={closeMenu}
          />
          <nav
            id={menuId}
            className="absolute left-0 right-0 top-full z-[45] animate-drawer-enter border-b border-ascend-border bg-white px-4 py-4 shadow-xl motion-reduce:animate-none motion-reduce:opacity-100 md:hidden"
            aria-label="Mobile primary"
          >
            <ul className="flex flex-col gap-1">
              {links.map((l, i) => (
                <li
                  key={l.href}
                  className="animate-fade-in-up motion-reduce:animate-none motion-reduce:opacity-100"
                  style={{ animationDelay: `${60 + i * 45}ms`, animationFillMode: "both" }}
                >
                  <a
                    href={l.href}
                    className="block rounded-lg px-3 py-3 text-base font-medium text-ascend-ink transition duration-200 hover:bg-ascend-muted active:scale-[0.99] motion-reduce:active:scale-100"
                    onClick={closeMenu}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </>
      ) : null}
    </header>
  );
}
