import {
  Boxes,
  MessageCircle,
  ReceiptText,
  PackageCheck,
  BarChart3,
  LayoutGrid,
} from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import type { Dictionary } from "@/i18n";

const ICONS = [Boxes, MessageCircle, ReceiptText, PackageCheck, BarChart3, LayoutGrid];
// Wider tiles at index 0 and 3 to create the bento rhythm.
const SPANS: Record<number, string> = { 0: "md:col-span-2", 3: "md:col-span-2" };

export function BentoFeatures({ dict }: { dict: Dictionary["bento"] }) {
  return (
    <section className="py-24">
      <div className="container-x py-6 rounded-2xl">
        <SectionHeading
          eyebrow={dict.eyebrow}
          title={dict.title}
          description={dict.description}
        />

        <Reveal stagger className="mt-14 grid gap-5 md:grid-cols-3">
          {dict.features.map((f, i) => {
            const Icon = ICONS[i] ?? Boxes;
            return (
              <div
                key={f.title}
                className={`group flex flex-col rounded-2xl border border-border bg-surface p-7 transition-colors hover:border-accent/40 ${
                  SPANS[i] ?? ""
                }`}
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-surface-2 text-accent">
                  <Icon size={20} />
                </span>
                <h3 className="mt-5 text-lg font-bold tracking-tight">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-muted font-extralight">{f.body}</p>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
