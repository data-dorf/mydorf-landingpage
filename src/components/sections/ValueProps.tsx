import Image from "next/image";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import type { Dictionary } from "@/i18n";

/**
 * Card media, paired with dict.cards by index. Swap the third entry for
 * `{ video: "/animated/ValueProps/<name>.webm" }` once that clip is finished —
 * nothing else needs to change.
 */
type CardMedia = { video: string } | { image: string };

const MEDIA: CardMedia[] = [
  // ดูดออเดอร์ภายใน 1 วินาที
  { video: "/animated/ValueProps/absorb-comment.webm" },
  // ย้ายระบบได้ เราทำให้
  { video: "/animated/ValueProps/transfer-db.webm" },
  // วิเคราะห์ข้อมูลได้ลึกทุกมิติ
  { video: "/animated/ValueProps/analysis.webm" },
];

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
            const media = MEDIA[i];
            return (
            <div key={card.title} className="group rounded-2xl">
              <div className="flex h-72 w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface-2 pl-6 pt-4 transition-colors group-hover:border-accent/40">
                <h4 className="text-base font-bold">{card.title}</h4>

                <div className="relative mt-4 flex-1 overflow-hidden rounded-tl-lg">
                  {media && "video" in media ? (
                    // Decorative loop: muted is what makes autoplay allowed at
                    // all, and playsInline stops iOS going fullscreen.
                    <video
                      src={media.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      aria-hidden
                      className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-105 pr-8 pb-8 pl-2 pt-2"
                    />
                  ) : (
                    <Image
                      src={media.image}
                      alt={card.title}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  )}
                </div>
              </div>
              <h3 className="mt-5 text-xl font-bold tracking-tight">
                {card.title}
              </h3>
              <p className="mt-2 text-muted font-extralight">{card.body}</p>
            </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
