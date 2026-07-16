"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Radio, Receipt, Truck, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import type { Dictionary } from "@/i18n";

const ICONS = [Radio, Receipt, Truck];

export function Pipeline({ dict }: { dict: Dictionary["pipeline"] }) {
  const [active, setActive] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        panelRef.current,
        { autoAlpha: 0, x: 16 },
        { autoAlpha: 1, x: 0, duration: 0.6, ease: "power3.out" },
      );
    },
    { dependencies: [active] },
  );

  const ActiveIcon = ICONS[active] ?? Radio;
  const activeTool = dict.tools[active];

  return (
    <section id="how" className="py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow={dict.eyebrow}
          title={dict.title}
          description={dict.description}
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-[1fr_1.15fr]">
          <div className="flex flex-col gap-3">
            {dict.tools.map((tool, i) => {
              const isActive = i === active;
              const Icon = ICONS[i] ?? Radio;
              return (
                <button
                  key={tool.title}
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-4 rounded-2xl border p-5 text-left transition-all duration-300 ${
                    isActive
                      ? "border-accent/50 bg-surface"
                      : "border-border bg-surface/40 hover:border-border hover:bg-surface"
                  }`}
                >
                  <span
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-colors ${
                      isActive
                        ? "bg-accent-solid text-accent-foreground"
                        : "bg-surface-2 text-muted"
                    }`}
                  >
                    <Icon size={20} />
                  </span>
                  <span className="flex-1">
                    <span className="block font-semibold tracking-tight">
                      {tool.title}
                    </span>
                    <span
                      className={`mt-0.5 block text-sm text-muted transition-all ${
                        isActive ? "opacity-100" : "opacity-70"
                      }`}
                    >
                      {tool.body}
                    </span>
                  </span>
                  <ArrowUpRight
                    size={18}
                    className={`shrink-0 transition-colors ${
                      isActive ? "text-accent" : "text-muted"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <div
            ref={panelRef}
            className="relative flex min-h-[340px] flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface p-8"
          >
            <div className="glow-accent pointer-events-none absolute inset-x-0 top-0 h-40 opacity-60" />
            <div className="relative">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent-solid text-accent-foreground">
                <ActiveIcon size={26} />
              </span>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">
                {activeTool.title}
              </h3>
              <p className="mt-3 max-w-md text-muted">{activeTool.body}</p>
            </div>
            <ul className="relative mt-8 grid gap-3">
              {activeTool.points.map((p) => (
                <li key={p} className="flex items-center gap-3 text-sm">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-accent/15 text-accent">
                    ✓
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
