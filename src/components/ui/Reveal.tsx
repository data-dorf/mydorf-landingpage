"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface RevealProps {
  children: ReactNode;
  /** Rendered element/tag. Defaults to a div. */
  as?: ElementType;
  className?: string;
  /** Delay before the reveal starts, in seconds. */
  delay?: number;
  /** Stagger direct children instead of animating the wrapper as one block. */
  stagger?: boolean;
  /** Vertical travel distance in px. */
  y?: number;
}

/**
 * Scroll-triggered reveal. Uses `useGSAP` for safe cleanup in React Strict Mode
 * and targets elements via a scoped ref rather than global selectors.
 */
export function Reveal({
  children,
  as,
  className,
  delay = 0,
  stagger = false,
  y = 24,
}: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const targets = stagger
        ? (gsap.utils.toArray(scope.current!.children) as HTMLElement[])
        : [scope.current!];

      gsap.from(targets, {
        y,
        autoAlpha: 0,
        duration: 0.9,
        ease: "power3.out",
        delay,
        stagger: stagger ? 0.12 : 0,
        scrollTrigger: {
          trigger: scope.current,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope },
  );

  return (
    <Tag ref={scope} className={className}>
      {children}
    </Tag>
  );
}
