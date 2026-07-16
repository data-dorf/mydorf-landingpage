"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import type { Dictionary } from "@/i18n";

export function FAQ({ dict }: { dict: Dictionary["faq"] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24">
      <div className="container-x flex">
        <SectionHeading eyebrow={dict.eyebrow} title={dict.title} description={dict.description} align="left"/>

        <Reveal className="ml-auto w-full max-w-2xl">
          <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
            {dict.items.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className={`${isOpen ? "font-bold text-xl" : "font-medium"}`}>{item.q}</span>
                    <Plus
                      size={20}
                      className={`shrink-0 text-accent transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    />
                  </button>
                  <div
                    className="grid transition-all duration-300 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-muted font-extralight">{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
