import { locales, defaultLocale } from "@/i18n/config";

/** Canonical site origin. Override via NEXT_PUBLIC_SITE_URL in production. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mydorf.com"
).replace(/\/$/, "");

export const siteName = "Mydorf";

/** Build the alternates.languages map used for hreflang tags. */
export function languageAlternates(path = "") {
  const entries = Object.fromEntries(
    locales.map((l) => [l, `${siteUrl}/${l}${path}`]),
  );
  return { ...entries, "x-default": `${siteUrl}/${defaultLocale}${path}` };
}
