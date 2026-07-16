import { TrendingUp, Repeat, Share2, Star } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import type { Dictionary } from "@/i18n";
import { SectionHeading } from "../ui/SectionHeading";

const ICONS = [TrendingUp, Repeat, Share2, Star];

export function Analytics({ dict }: { dict: Dictionary["analytics"] }) {
  return (
    <section className="py-24">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal stagger className="flex flex-col gap-6">
            <SectionHeading
              eyebrow={dict.eyebrow}
              title={dict.title}
              description={dict.description}
              align="left"
            />

            <div className="mt-2 grid gap-4 sm:grid-cols-2">
              {dict.items.map((item, i) => {
                const Icon = ICONS[i] ?? Star;
                return (
                  <div key={item.title} className="flex gap-3">
                    <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border bg-surface text-accent">
                      <Icon size={18} />
                    </span>
                    <div>
                      <div className="font-bold">{item.title}</div>
                      <div className="text-sm text-muted font-light">{item.body}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal className="relative">
            <div className="glow-accent pointer-events-none absolute inset-x-0 -top-10 h-40 opacity-70" />
            <div className="relative rounded-2xl border border-border bg-surface p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted">
                    {dict.chart.revenueLabel}
                  </div>
                  <div className="mt-1 text-3xl font-semibold tracking-tight">
                    ฿1.28M
                  </div>
                </div>
                <span className="rounded-full bg-accent/15 px-2.5 py-1 text-xs font-medium text-accent">
                  {dict.chart.delta}
                </span>
              </div>

              <div className="mt-8 flex h-40 items-end gap-2.5">
                {[42, 58, 47, 70, 63, 85, 78, 96].map((h, i) => (
                  <div key={i} className="flex flex-1 flex-col justify-end">
                    <div
                      className={`w-full rounded-t-md ${
                        i === 7 ? "bg-accent-solid" : "bg-surface-2"
                      }`}
                      style={{ height: `${h}%` }}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 border-t border-border pt-4 text-center">
                {dict.chart.stats.map((s) => (
                  <div key={s.label}>
                    <div className="text-lg font-semibold">{s.value}</div>
                    <div className="text-xs text-muted">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
