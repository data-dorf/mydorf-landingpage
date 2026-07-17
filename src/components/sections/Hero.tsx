"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import type { Dictionary } from "@/i18n";
import { TextGradient } from "../ui/TextGradient";
import { BlurText } from "../ui/BlurText";
import { SectionFocus } from "../ui/SectionFocus";
import exampleShot from "@/../public/images/example/index.png";
import { trialLinkProps } from "@/utils/trial";

// const AVATARS = ["#6a48f7", "#26c9e8", "#fca5a5", "#c4b5fd", "#fcd34d"];

export function Hero({ dict }: { dict: Dictionary["hero"] }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 1 },
      });
      // The headline is handled by <BlurText>, so it isn't in this timeline —
      // animating it here too would fight over opacity.
      tl.from(".hero-badge", { y: 20, autoAlpha: 0 })
        .from(".hero-sub", { y: 24, autoAlpha: 0 }, "-=0.7")
        .from(".hero-cta", { y: 24, autoAlpha: 0 }, "-=0.7")
        .from(".hero-trust", { y: 24, autoAlpha: 0 }, "-=0.6")
        .from(".hero-stat", { y: 30, autoAlpha: 0, stagger: 0.1 }, "-=0.5");
    },
    { scope },
  );

  return (
    <section ref={scope} className="relative overflow-hidden pt-40 pb-20 sm:pt-48">
      <div className="glow-accent pointer-events-none absolute inset-x-0 top-0 h-130" />

      <div className="container-x relative">
        <div className="mx-auto max-w-3xl text-center">
          {/* <span className="hero-badge inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {dict.badge}
          </span> */}

          <h1 className="mt-6 text-balance text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl md:text-7xl">
            <BlurText as="span" text={dict.titleLead} className="block" />
            <span className="block">
              {/* BlurText wraps TextGradient rather than sitting inside it —
                  the gradient is painted by TextGradient's own background, so
                  fading a child within it would have no effect. */}
              <BlurText as="span" delay={0.3}>
                <TextGradient>{dict.titleAccent}</TextGradient>
              </BlurText>{" "}
              <BlurText as="span" text={dict.titleTail} delay={0.45} />
            </span>
          </h1>

          <p className="hero-sub mx-auto mt-6 max-w-xl text-balance text-lg font-light text-muted">
            {dict.subtitle}
          </p>

          <div className="hero-cta mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button {...trialLinkProps} variant="gradient" className="px-6 py-3 text-base! font-semibold">
              {dict.ctaTrial}
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Button>
            {/* <span className="text-sm text-muted">{dict.noCard}</span> */}
          </div>

          {/* <div className="hero-trust mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <div className="flex -space-x-2">
              {AVATARS.map((c, i) => (
                <span
                  key={i}
                  className="h-8 w-8 rounded-full border-2 border-background"
                  style={{ background: c }}
                />
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted">
              <span className="flex text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </span>
              {dict.trust}
            </div>
          </div> */}
        </div>

        {/* Sits outside the max-w-3xl text block so it can use the full
            container width rather than being capped at the headline's measure. */}
        <SectionFocus restScale={0.9} restOpacity={0.25} className="mt-14">
          <Image
            src={exampleShot}
            alt="Mydorf"
            placeholder="blur"
            sizes="(min-width: 1216px) 1168px, 100vw"
            className="h-auto w-full rounded-2xl border-8 border-border"
          />
        </SectionFocus>

        {/* <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
          {dict.stats.map((s) => (
            <div key={s.label} className="hero-stat bg-surface px-6 py-8 text-center">
              <div className="text-4xl font-semibold tracking-tight">{s.value}</div>
              <div className="mt-1 text-sm text-muted">{s.label}</div>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
}
