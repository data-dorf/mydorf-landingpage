"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Check } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import type { Dictionary } from "@/i18n";
// Static imports: Next reads each PNG's dimensions and builds a blur
// placeholder. Paired with dict.pipeline.tools by index — add a tool and drop
// its image here.
import absorbComment from "@/../public/images/Pipeline/absorb_comment.png";
import orderManagement from "@/../public/images/Pipeline/order_management.png";
import trackingShipping from "@/../public/images/Pipeline/tracking_shipping.png";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const IMAGES = [absorbComment, orderManagement, trackingShipping];

export function Pipeline({ dict }: { dict: Dictionary["pipeline"] }) {
  const [active, setActive] = useState(0);
  const scope = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      itemsRef.current.forEach((el, i) => {
        if (!el) return;

        // Scroll-spy: whichever block owns the middle of the viewport wins.
        // onToggle fires in both scroll directions, so no separate enter/back.
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            if (self.isActive) setActive(i);
          },
        });

        // Focus effect, scrubbed to the scroll position: the block scales up
        // and fades in on the way to centre, holds while in focus, then scales
        // back down and fades out as it leaves.
        gsap
          .timeline({
            scrollTrigger: {
              trigger: el,
              start: "top 95%",
              end: "bottom 30%",
              scrub: 0.6,
            },
            defaults: { transformOrigin: "center center" },
          })
          .fromTo(
            el,
            { opacity: 0.15, scale: 0.75 },
            { opacity: 1, scale: 1, ease: "power2.out", duration: 2 },
          )
          .to(el, { opacity: 1, scale: 1, duration: 1.2 }) // hold in focus
          .to(el, { opacity: 0.15, scale: 0.9, ease: "power2.in", duration: 1 });
      });
    },
    { scope },
  );

  function goTo(i: number) {
    // scroll-mt-32 on the target keeps it clear of the fixed navbar.
    itemsRef.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section id="how" ref={scope} className="py-24">
      <div className="container-x">
        <div className="grid gap-y-10 lg:grid-cols-[minmax(240px,450px)_1fr] lg:gap-x-16">
          {/* Sticky rail — heading and nav pin together as one unit. Sticky can
              only travel inside its own grid area, so they must share one. */}
          <div className="lg:sticky lg:top-28 lg:col-start-1 lg:self-start">
            <SectionHeading
              eyebrow={dict.eyebrow}
              title={dict.title}
              align="left"
            />

            <nav className="mt-10 flex flex-col" aria-label={dict.title}>
              {dict.tools.map((tool, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={tool.title}
                    onClick={() => goTo(i)}
                    aria-current={isActive ? "true" : undefined}
                    className={`border-l-2 py-3 pl-8 text-left transition-all duration-300 ${
                      isActive
                        ? "border-accent font-bold text-accent text-lg tracking-wide"
                        : "border-border font-extralight text-sm text-muted hover:border-muted hover:text-foreground"
                    }`}
                  >
                    {tool.title}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="lg:col-start-2">
            <div
              aria-hidden
              className="pointer-events-none hidden select-none opacity-0 lg:block"
            >
              <SectionHeading
                eyebrow={dict.eyebrow}
                title={dict.title}
                align="left"
              />
            </div>

            {/* Every tool stacked, one block each.
                lg:mt-10 mirrors the nav's mt-10 so the two line up. */}
            <div className="flex flex-col gap-20 lg:mt-10 lg:gap-28">
            {dict.tools.map((tool, i) => {
              const image = IMAGES[i];
              return (
                <div
                  key={tool.title}
                  ref={(el) => {
                    itemsRef.current[i] = el;
                  }}
                  className="scroll-mt-32 will-change-[transform,opacity]"
                >
                  <h3 className="mt-5 text-2xl font-bold tracking-tight th:tracking-normal">
                    {tool.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-muted font-extralight">{tool.body}</p>

                  <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                    {tool.points.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-sm">
                        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                          <Check size={12} strokeWidth={3} />
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>

                  <div className="relative mt-8 aspect-16/10 overflow-hidden rounded-2xl border border-border bg-surface">
                    <div className="glow-accent pointer-events-none absolute inset-x-0 top-0 z-10 h-40 opacity-60" />
                    {image && (
                      <Image
                        src={image}
                        alt={tool.title}
                        fill
                        placeholder="blur"
                        sizes="(min-width: 1024px) 60vw, 100vw"
                        className="object-cover"
                      />
                    )}
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
