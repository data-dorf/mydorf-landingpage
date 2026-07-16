export const locales = ["th", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "th";

export const localeLabels: Record<Locale, string> = {
  th: "ไทย",
  en: "English",
};

/** OpenGraph locale codes for each supported locale. */
export const ogLocales: Record<Locale, string> = {
  th: "th_TH",
  en: "en_US",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
