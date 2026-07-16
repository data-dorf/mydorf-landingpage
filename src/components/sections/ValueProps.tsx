import { Radio, ShoppingCart, Truck } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import type { Dictionary } from "@/i18n";

const ICONS = [Radio, ShoppingCart, Truck];

export function ValueProps({ dict }: { dict: Dictionary["valueProps"] }) {
  return (
    <section id="features" className="py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow={dict.eyebrow}
          title={dict.title}
          description={dict.description}
        />

        <Reveal stagger className="mt-14 grid gap-5 md:grid-cols-3">
          {dict.cards.map((card, i) => {
            const Icon = ICONS[i] ?? Radio;
            return (
              <div
                key={card.title}
                className="group rounded-2xl border border-border bg-surface p-7 transition-colors hover:border-accent/40"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl border border-border bg-surface-2 text-accent transition-colors group-hover:border-accent/40">
                  <Icon size={22} />
                </span>
                <h3 className="mt-5 text-xl font-semibold tracking-tight">
                  {card.title}
                </h3>
                <p className="mt-2 text-muted">{card.body}</p>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
