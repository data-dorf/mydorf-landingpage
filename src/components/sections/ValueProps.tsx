import Image from "next/image";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import type { Dictionary } from "@/i18n";

// Unsplash photos (free license, commercial use OK, no attribution required),
// matched to dict.cards by index. Sized/cropped by Unsplash before Next
// optimises them. `alt` comes from the card title so it stays translated.
const IMAGES = [
  // ดูดออเดอร์ภายใน 1 วินาที — filming a live on a phone
  "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=800&q=80",
  // ย้ายระบบได้ เราทำให้ — a helping hand / team support
  "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=800&q=80",
  // สร้างแคมเปญ โปรโมชั่น — a discount sign
  "https://images.unsplash.com/photo-1561069934-eee225952461?auto=format&fit=crop&w=800&q=80",
  // ลูกค้าสะสมคะแนน — a happy repeat customer
  "https://images.unsplash.com/photo-1713256752744-fad1d7a8684c?auto=format&fit=crop&w=800&q=80",
  // วิเคราะห์ข้อมูลได้ลึกทุกมิติ — an analytics dashboard
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
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
          {dict.cards.map((card, i) => (
            <div key={card.title} className="group rounded-2xl">
              <div className="flex h-72 w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface-2/50 pl-6 pt-4 transition-colors group-hover:border-accent/40">
                <h4 className="text-base font-bold">{card.title}</h4>

                <div className="relative mt-4 flex-1 overflow-hidden rounded-tl-lg">
                  <Image
                    src={IMAGES[i] ?? IMAGES[0]}
                    alt={card.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
              </div>
              <h3 className="mt-5 text-xl font-bold tracking-tight">
                {card.title}
              </h3>
              <p className="mt-2 text-muted font-extralight">{card.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
