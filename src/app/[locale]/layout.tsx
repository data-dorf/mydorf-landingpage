import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "../globals.css";
import { locales, isLocale, ogLocales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { siteUrl, siteName, languageAlternates } from "@/lib/site";
import { ThemeApplier } from "@/components/ThemeApplier";

// Plus Jakarta Sans — exposed as a CSS variable so `.font-jakarta` can use it.
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

// Sukhumvit Set — self-hosted so every platform renders it identically.
// Note the folder name is "SukhunmvitSet" (as provided).
const sukhumvit = localFont({
  variable: "--font-sukhumvit",
  display: "swap",
  src: [
    { path: "../../../public/fonts/SukhunmvitSet/SukhumvitSet-Thin.ttf", weight: "100", style: "normal" },
    { path: "../../../public/fonts/SukhunmvitSet/SukhumvitSet-Light.ttf", weight: "300", style: "normal" },
    { path: "../../../public/fonts/SukhunmvitSet/SukhumvitSet-Text.ttf", weight: "400", style: "normal" },
    { path: "../../../public/fonts/SukhunmvitSet/SukhumvitSet-Medium.ttf", weight: "500", style: "normal" },
    { path: "../../../public/fonts/SukhunmvitSet/SukhumvitSet-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../../../public/fonts/SukhunmvitSet/SukhumvitSet-Bold.ttf", weight: "700", style: "normal" },
  ],
});

const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);

  return {
    metadataBase: new URL(siteUrl),
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    applicationName: siteName,
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: languageAlternates(),
    },
    openGraph: {
      type: "website",
      siteName,
      title: dict.meta.title,
      description: dict.meta.description,
      url: `${siteUrl}/${locale}`,
      locale: ogLocales[locale],
      alternateLocale: Object.values(ogLocales).filter(
        (l) => l !== ogLocales[locale],
      ),
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteName,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: dict.meta.description,
    url: `${siteUrl}/${locale}`,
    offers: {
      "@type": "Offer",
      price: "590",
      priceCurrency: "THB",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "2500",
    },
  };

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${sukhumvit.variable} ${jakarta.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {/* Apply the persisted theme before paint to avoid a flash.
            Plain inline script in <body> (the next-themes pattern) — runs on
            the initial server HTML and is not re-rendered on the client. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("mydorf-theme");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t);}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeApplier />
        {children}

        {/* Edge-fade masks: content dissolves into the background at the top
            and bottom of the viewport as the page scrolls. Sit above content
            (z-40) but below the navbar (z-50); non-interactive. */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-x-0 top-0 z-40 h-24 bg-gradient-to-b from-background to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none fixed inset-x-0 bottom-0 z-40 h-24 bg-gradient-to-t from-background to-transparent"
        />
      </body>
    </html>
  );
}
