"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface BlurTextProps {
  /** Plain text — split into words internally and revealed one by one. */
  text?: string;
  /**
   * JSX to reveal as a single unit instead of word by word. Use this to wrap
   * something that can't be split, e.g. `<TextGradient>`: the animation has to
   * sit *outside* it, because a background-clip:text element paints its colour
   * from its own background, so fading a child inside it does nothing.
   */
  children?: ReactNode;
  /** Element/tag to render. Defaults to a span. */
  as?: ElementType;
  className?: string;
  /** Seconds between each word starting. */
  stagger?: number;
  /** Starting blur, in px. */
  blur?: number;
  /** Delay before the first word, in seconds. */
  delay?: number;
  /** Replay every time it scrolls into view instead of only the first time. */
  repeat?: boolean;
}

/**
 * Reveals text word by word, each one animating from blurred to sharp.
 *
 * Words are split with Intl.Segmenter rather than `split(" ")` because Thai
 * doesn't put spaces between words — a naive split would treat a whole Thai
 * sentence as a single word. Segmenter also keeps vowels and tone marks
 * attached to their base character, which splitting by character would break.
 */
export function BlurText({
  text,
  children,
  as,
  className = "",
  stagger = 0.06,
  blur = 8,
  delay = 0,
  repeat = false,
}: BlurTextProps) {
  const Tag = (as ?? "span") as ElementType;
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const words = scope.current?.querySelectorAll("[data-word]");
      if (!words?.length) return;

      gsap.fromTo(
        words,
        { opacity: 0, filter: `blur(${blur}px)`, y: "0.25em" },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          stagger,
          delay,
          scrollTrigger: {
            trigger: scope.current,
            start: "top 85%",
            toggleActions: repeat
              ? "restart none none reset"
              : "play none none none",
            once: !repeat,
          },
        },
      );
    },
    { scope, dependencies: [text] },
  );

  return (
    <Tag ref={scope} className={className}>
      {text !== undefined ? (
        segmentWords(text).map((word, i) => (
          <span key={i} data-word className="inline-block whitespace-pre">
            {word}
          </span>
        ))
      ) : (
        // One unit — same animation, just a single target.
        <span data-word className="inline-block">
          {children}
        </span>
      )}
    </Tag>
  );
}

/**
 * Splits text into words, keeping the trailing space attached to each word so
 * the spacing survives `inline-block`. Falls back to a space split where
 * Intl.Segmenter isn't available.
 */
function segmentWords(text: string): string[] {
  if (typeof Intl === "undefined" || !("Segmenter" in Intl)) {
    return text.split(/(\s+)/).filter(Boolean);
  }

  const segmenter = new Intl.Segmenter(undefined, { granularity: "word" });
  const out: string[] = [];

  for (const { segment } of segmenter.segment(text)) {
    // Whitespace rides along with the previous word instead of becoming its
    // own inline-block, which would collapse.
    if (/^\s+$/.test(segment) && out.length) out[out.length - 1] += segment;
    else out.push(segment);
  }

  return out;
}
