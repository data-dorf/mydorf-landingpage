import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { siteUrl, languageAlternates } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified,
    changeFrequency: "weekly",
    priority: locale === "th" ? 1 : 0.9,
    alternates: { languages: languageAlternates() },
  }));
}
