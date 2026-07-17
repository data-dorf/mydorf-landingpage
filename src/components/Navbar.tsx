"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/Button";
import { PreferencesMenu } from "./PreferencesMenu";
import type { Dictionary } from "@/i18n";
import logoMark from "@/../public/images/logo/logo-only.svg";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SECTION_HREFS = [
  "#features",
  "#pricing",
  "#how",
  // "#testimonials",
  "#contact",
];

export function Navbar({ dict, locale }: { dict: Dictionary; locale: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the link whose section owns the middle of the
  // viewport. The sections live in sibling components, so they're looked up by
  // id rather than by ref. Sections in between that have no id simply leave the
  // previous link highlighted, which reads fine.
  useGSAP(() => {
    SECTION_HREFS.forEach((href) => {
      const el = document.querySelector(href);
      if (!el) return;
      ScrollTrigger.create({
        trigger: el,
        start: "top 50%",
        end: "bottom 50%",
        onToggle: (self) => {
          if (self.isActive) setActiveHref(href);
        },
      });
    });
  });

  const navLinks = dict.nav.links.map((label, i) => ({
    label,
    href: SECTION_HREFS[i] ?? "#",
  }));

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container-x">
        <nav
          className={`mt-4 flex items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-300 ${
            scrolled
              ? "border-border bg-surface/80 backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
        >
          <div className="flex items-center gap-18">
            <Link href={`/${locale}`} className="flex items-center gap-2 pl-2">
              <Image
                src={logoMark}
                alt="Mydorf"
                priority
                className="h-9 w-auto"
              />
              <span className="font-jakarta text-lg font-bold tracking-tight">
                Mydorf
              </span>
            </Link>

            <ul className="hidden items-center gap-7 lg:flex">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    aria-current={activeHref === link.href ? "true" : undefined}
                    className={`text-base transition-all ease-in-out duration-100 ${
                      activeHref === link.href
                        ? "text-accent font-bold tracking-wide text-lg"
                        : "text-muted font-medium hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <PreferencesMenu
              locale={locale}
              theme={dict.theme}
              language={dict.language}
              className="mr-1"
            />
            <Button href="https://app.mydorf.com" variant="ghost">
              {dict.nav.login}
            </Button>
            <Button href="#pricing">{dict.nav.cta}</Button>
          </div>

          <button
            aria-label="Menu"
            className="grid h-9 w-9 place-items-center rounded-full text-foreground lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {open && (
          <div className="mt-2 rounded-2xl border border-border bg-surface/95 p-4 backdrop-blur-xl lg:hidden">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={activeHref === link.href ? "true" : undefined}
                    className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                      activeHref === link.href
                        ? "bg-surface-2 font-semibold text-accent"
                        : "text-muted hover:bg-surface-2 hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between gap-2">
              <PreferencesMenu
                locale={locale}
                theme={dict.theme}
                language={dict.language}
              />
              <Button href="#pricing" className="flex-1">
                {dict.nav.cta}
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
