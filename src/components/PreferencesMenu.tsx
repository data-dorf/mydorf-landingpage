"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, ChevronDown, Monitor, Moon, Sun } from "lucide-react";
import { locales, localeLabels, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";

/* ---- theme store (localStorage) — SSR-safe, no setState-in-effect ---- */

type ThemeMode = "light" | "dark" | "system";
const STORAGE_KEY = "mydorf-theme";
const EVENT = "mydorf-theme-change";

function applyMode(mode: ThemeMode) {
  const root = document.documentElement;
  if (mode === "system") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", mode);
}
function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}
function getSnapshot(): ThemeMode {
  const s = localStorage.getItem(STORAGE_KEY);
  return s === "light" || s === "dark" ? s : "system";
}
function getServerSnapshot(): ThemeMode {
  return "system";
}
function setThemeMode(next: ThemeMode) {
  applyMode(next);
  try {
    if (next === "system") localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* ignore storage failures */
  }
  window.dispatchEvent(new Event(EVENT));
}

/** Rounded SVG flags — reliable across platforms (unlike flag emoji). */
function Flag({ locale }: { locale: Locale }) {
  const clipId = `flag-clip-${locale}`;
  if (locale === "th") {
    return (
      <svg viewBox="0 0 60 40" className="h-4 w-6 shrink-0 rounded-[3px]" aria-hidden>
        <rect width="60" height="40" fill="#fff" />
        <rect width="60" height="6.67" fill="#A51931" />
        <rect y="33.33" width="60" height="6.67" fill="#A51931" />
        <rect y="13.33" width="60" height="13.33" fill="#2D2A4A" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 60 40" className="h-4 w-6 shrink-0 rounded-[3px]" aria-hidden>
      <clipPath id={clipId}>
        <rect width="60" height="40" rx="3" />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <rect width="60" height="40" fill="#012169" />
        <path d="M0 0 60 40M60 0 0 40" stroke="#fff" strokeWidth="8" />
        <path d="M0 0 60 40M60 0 0 40" stroke="#C8102E" strokeWidth="4" />
        <path d="M30 0V40M0 20H60" stroke="#fff" strokeWidth="12" />
        <path d="M30 0V40M0 20H60" stroke="#C8102E" strokeWidth="7" />
      </g>
    </svg>
  );
}

export function PreferencesMenu({
  locale,
  theme,
  language,
  className = "",
}: {
  locale: string;
  theme: Dictionary["theme"];
  language: Dictionary["language"];
  className?: string;
}) {
  const pathname = usePathname() || `/${locale}`;
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function hrefFor(loc: Locale) {
    const segments = pathname.split("/");
    segments[1] = loc;
    return segments.join("/") || `/${loc}`;
  }

  const activeLocale = (locale as Locale) ?? "th";
  const themeOptions: { mode: ThemeMode; label: string; Icon: typeof Sun }[] = [
    { mode: "light", label: theme.light, Icon: Sun },
    { mode: "dark", label: theme.dark, Icon: Moon },
    { mode: "system", label: theme.system, Icon: Monitor },
  ];

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`${language.label} · ${theme.label}`}
        className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1.5 text-muted transition-colors hover:text-foreground"
      >
        <Flag locale={activeLocale} />
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-border bg-surface p-1.5 shadow-lg shadow-black/20"
        >
          {/* Language */}
          <p className="px-2.5 pb-1 pt-1 text-xs font-medium uppercase tracking-wider text-muted">
            {language.label}
          </p>
          {locales.map((loc) => {
            const active = loc === locale;
            return (
              <Link
                key={loc}
                href={hrefFor(loc)}
                hrefLang={loc}
                role="menuitemradio"
                aria-checked={active}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors ${
                  active
                    ? "bg-surface-2 text-foreground"
                    : "text-muted hover:bg-surface-2 hover:text-foreground"
                }`}
              >
                <Flag locale={loc} />
                <span className="flex-1">{localeLabels[loc]}</span>
                {active && <Check size={15} className="text-accent" />}
              </Link>
            );
          })}

          <div className="my-1.5 h-px bg-border" />

          {/* Theme */}
          <p className="px-2.5 pb-1.5 text-xs font-medium uppercase tracking-wider text-muted">
            {theme.label}
          </p>
          <div
            role="radiogroup"
            aria-label={theme.label}
            className="flex items-center gap-1 rounded-lg bg-surface-2 p-1"
          >
            {themeOptions.map(({ mode: m, label, Icon }) => {
              const active = mode === m;
              return (
                <button
                  key={m}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setThemeMode(m)}
                  className={`flex flex-1 flex-col items-center gap-1 rounded-md py-1.5 text-[11px] transition-colors ${
                    active
                      ? "bg-accent-solid text-accent-foreground"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  <Icon size={15} />
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
