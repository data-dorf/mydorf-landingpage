import "server-only";
import type { Locale } from "./config";

/* ---------------------------------------------------------------------------
   Dictionary shape — every locale file must satisfy this interface so TH and
   EN never drift apart. Icons/colors/prices live in the components; the
   dictionary only holds translatable text, merged by array index.
--------------------------------------------------------------------------- */

export interface Dictionary {
  meta: {
    title: string;
    description: string;
    /** Comma-free keyword list, informed by Google Trends (TH social commerce). */
    keywords: string[];
    ogAlt: string;
  };
  nav: {
    links: string[];
    login: string;
    cta: string;
  };
  theme: {
    label: string;
    light: string;
    dark: string;
    system: string;
  };
  language: { label: string };
  hero: {
    badge: string;
    titleLead: string;
    titleAccent: string;
    titleTail: string;
    subtitle: string;
    ctaTrial: string;
    noCard: string;
    trust: string;
    stats: { value: string; label: string }[];
  };
  valueProps: {
    eyebrow: string;
    title: string;
    description: string;
    cards: { title: string; body: string }[];
  };
  pipeline: {
    eyebrow: string;
    title: string;
    description: string;
    tools: { title: string; body: string; points: string[] }[];
  };
  bento: {
    eyebrow: string;
    title: string;
    description: string;
    features: { title: string; body: string }[];
  };
  analytics: {
    eyebrow: string;
    title: string;
    description: string;
    items: { title: string; body: string }[];
    chart: {
      revenueLabel: string;
      delta: string;
      stats: { label: string; value: string }[];
    };
  };
  testimonials: {
    eyebrow: string;
    title: string;
    items: { metricLabel: string; quote: string; name: string; role: string }[];
  };
  /** Chrome only — the packages themselves live in contexts/PricingPackage.ts */
  pricing: {
    eyebrow: string;
    title: string;
    description: string;
    /** Tab labels */
    monthly: string;
    credits: string;
    perUnit: string;
    /** Shown as the price when a plan's monthlyPrice is 0. */
    free: string;
    mostPopular: string;
    trialCta: string;
    /** Credits tab */
    creditsUnit: string;
    bonusLabel: string;
    creditsNote: string;
    topUpCta: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    description?: string;
    items: { q: string; a: string }[];
  };
  cta: {
    title: string;
    description: string;
    primary: string;
    secondary: string;
  };
  footer: {
    tagline: string;
    /** Company / office addresses shown under the tagline. */
    addresses: { label: string; value: string }[];
    columns: { title: string; links: string[] }[];
    rights: string;
    note: string;
  };
}

const dictionaries: Record<Locale, () => Promise<{ default: Dictionary }>> = {
  th: () => import("./dictionaries/th"),
  en: () => import("./dictionaries/en"),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const loader = dictionaries[locale] ?? dictionaries.th;
  return (await loader()).default;
}
