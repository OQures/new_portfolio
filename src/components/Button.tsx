import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  className = "",
  type = "button",
  children,
  ...rest
}: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[15px] font-semibold leading-none transition duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ascend-ink min-h-[44px] sm:px-6 sm:py-3 motion-reduce:transition-none";
  const styles =
    variant === "primary"
      ? "bg-ascend-ink text-white shadow-card-sm hover:-translate-y-0.5 hover:bg-[#0b2f52] hover:shadow-card active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100"
      : "border border-ascend-border bg-white text-ascend-ink shadow-sm hover:border-slate-300 hover:shadow-md active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 motion-reduce:active:scale-100";

  return (
    <button type={type} className={`${base} ${styles} ${className}`.trim()} {...rest}>
      {children}
    </button>
  );
}
