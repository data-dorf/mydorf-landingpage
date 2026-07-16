import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import type { Dictionary } from "@/i18n";

// Locale-neutral visuals paired with translated copy by index.
const VISUALS = [
  { metric: "50%", avatar: "#6a48f7" },
  { metric: "2.3×", avatar: "#26c9e8" },
];

export function Testimonials({ dict }: { dict: Dictionary["testimonials"] }) {
  return (
    <section id="testimonials" className="py-24">
      <div className="container-x">
        <SectionHeading eyebrow={dict.eyebrow} title={dict.title} />

        <Reveal stagger className="mt-14 grid gap-5 md:grid-cols-2">
          {dict.items.map((t, i) => {
            const v = VISUALS[i] ?? VISUALS[0];
            return (
              <figure
                key={t.name}
                className="flex flex-col justify-between rounded-2xl border border-border bg-surface p-8"
              >
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-5xl font-semibold tracking-tight text-accent">
                      {v.metric}
                    </span>
                    <span className="text-sm text-muted">{t.metricLabel}</span>
                  </div>
                  <blockquote className="mt-6 text-lg leading-relaxed text-foreground/90">
                    “{t.quote}”
                  </blockquote>
                </div>
                <figcaption className="mt-8 flex items-center gap-3">
                  <span
                    className="h-10 w-10 rounded-full"
                    style={{ background: v.avatar }}
                  />
                  <div>
                    <div className="font-medium">{t.name}</div>
                    <div className="text-sm text-muted">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
