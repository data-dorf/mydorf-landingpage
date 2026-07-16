import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

interface TextGradientProps<T extends ElementType> {
  /** Element/tag to render. Defaults to a span. */
  as?: T;
  className?: string;
  children: ReactNode;
  /** Gradient angle in degrees. */
  angle?: number;
  /** Override the gradient stops (any valid CSS colors). */
  from?: string;
  to?: string;
}

export function TextGradient<T extends ElementType = "span">({
  as,
  className = "",
  children,
  angle = -15,
  from = "var(--accent)",
  to = "var(--accent-2)",
  ...props
}: TextGradientProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof TextGradientProps<T>>) {
  const Tag = (as ?? "span") as ElementType;

  return (
    <Tag
      className={`bg-clip-text text-transparent [-webkit-background-clip:text] ${className}`}
      style={{
        backgroundImage: `linear-gradient(${angle}deg, ${from}, ${to})`,
      }}
      {...props}
    >
      {children}
    </Tag>
  );
}
