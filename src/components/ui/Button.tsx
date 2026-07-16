import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "gradient";

interface ButtonProps extends Omit<ComponentProps<typeof Link>, "href"> {
  href?: string;
  variant?: Variant;
  children: ReactNode;
}

const base =
  "group inline-flex items-center justify-center rounded-full text-base font-medium " +
  "px-6.5 py-2.5 transition-all duration-300 ease-out will-change-transform " +
  "hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none " +
  "focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-background";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent-solid text-accent-foreground hover:shadow-[0_8px_30px_-8px_var(--color-accent-solid)]",
  secondary:
    "bg-surface-2 text-foreground border border-border hover:border-accent/50 hover:bg-surface",
  ghost: "text-foreground/80 hover:text-foreground",
  // The gradient is drawn at 200% width so background-position can slide it on
  // hover — unlike swapping gradient direction, position actually animates.
  gradient:
    "bg-gradient-to-br from-accent-2 to-accent-solid to-[48%] text-accent-foreground px-8 " +
    "bg-[length:200%_200%] bg-[position:0%_50%] hover:bg-[position:20%_50%] " +
    "shadow-[0_8px_30px_-8px] shadow-accent-solid/40",
};

// Two stacked copies of the label. On hover the stack rolls up by exactly one
// label height, so the duplicate lands where the original was.
const labelBase =
  "col-start-1 row-start-1 flex items-center justify-center gap-2 " +
  "transition-transform duration-300 ease-out";

export function Button({
  href = "#",
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative inline-grid overflow-hidden">
        <span className={`${labelBase} group-hover:-translate-y-full`}>
          {children}
        </span>
        <span
          aria-hidden
          className={`${labelBase} translate-y-full group-hover:translate-y-0`}
        >
          {children}
        </span>
      </span>
    </Link>
  );
}
