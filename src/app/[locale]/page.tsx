import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { ValueProps } from "@/components/sections/ValueProps";
import { Pipeline } from "@/components/sections/Pipeline";
import { BentoFeatures } from "@/components/sections/BentoFeatures";
import { Analytics } from "@/components/sections/Analytics";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/Footer";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <Navbar dict={dict} locale={locale} />
      <main className="flex-1">
        <Hero dict={dict.hero} />
        <ValueProps dict={dict.valueProps} />
        <Pipeline dict={dict.pipeline} />
        <BentoFeatures dict={dict.bento} />
        <Analytics dict={dict.analytics} />
        <Pricing dict={dict.pricing} locale={locale} />
        <FAQ dict={dict.faq} />
        <CTA dict={dict.cta} />
      </main>
      <Footer dict={dict.footer} locale={locale} />
    </>
  );
}
