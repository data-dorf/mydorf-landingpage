import { ArrowRight } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";
import type { Dictionary } from "@/i18n";

export function CTA({ dict }: { dict: Dictionary["cta"] }) {
  return (
    <section id="contact" className="pb-24 pt-8">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-20 text-center">
          <div className="glow-accent pointer-events-none absolute inset-x-0 top-0 h-full opacity-80" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              {dict.title}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-balance text-lg text-muted">
              {dict.description}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="#pricing" className="px-6 py-3 text-base">
                {dict.primary}
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Button>
              <Button href="#how" variant="secondary" className="px-6 py-3 text-base">
                {dict.secondary}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
