import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  iconEyebrow?: ReactNode;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
}

export function SectionHeading({
  iconEyebrow,
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  const alignment =
    align === "center" ? "mx-auto text-center items-center" : "text-left items-start";

  return (
    <Reveal
      className={`flex max-w-2xl flex-col gap-4 ${alignment}`}
      stagger
    >
      {eyebrow && (
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium uppercase tracking-wider text-accent">
          {iconEyebrow && iconEyebrow}
          {eyebrow}
        </span>
      )}
      <h2 className="text-balance text-4xl font-bold tracking-tight th:tracking-normal sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="text-balance text-lg text-muted font-extralight">{description}</p>
      )}
    </Reveal>
  );
}
