"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface SectionFocusProps {
  children: ReactNode;
  className?: string;
  /** Scale while the section sits outside the focus zone. */
  restScale?: number;
  /** Opacity while the section sits outside the focus zone. */
  restOpacity?: number;
}

/**
 * Scrubbed focus effect for a whole section: scales up and reaches full opacity
 * on the way into the viewport centre, holds, then scales back down and dims as
 * it leaves. Scrubbed rather than played once, so it also reverses on scroll up.
 *
 * Note: this applies a transform, which makes the wrapper a containing block —
 * don't wrap sections that rely on `position: sticky` inside them.
 */
export function SectionFocus({
  children,
  className,
  restScale = 0.85,
  restOpacity = 0.5,
}: SectionFocusProps) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = scope.current;
      if (!el) return;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "bottom 10%",
            scrub: 0.6,
          },
          defaults: { transformOrigin: "center center" },
        })
        .fromTo(
          el,
          { opacity: restOpacity, scale: restScale },
          { opacity: 1, scale: 1, ease: "power2.out", duration: 1 },
        )
        .to(el, { opacity: 1, scale: 1, duration: 1.4 }) // hold in focus
        .to(el, {
          opacity: restOpacity,
          scale: restScale,
          ease: "power2.in",
          duration: 1,
        });
    },
    { scope },
  );

  return (
    <div ref={scope} className={`will-change-[transform,opacity] ${className ?? ""}`}>
      {children}
    </div>
  );
}
