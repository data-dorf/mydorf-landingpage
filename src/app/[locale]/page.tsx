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
import { SectionFocus } from "@/components/ui/SectionFocus";

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
        <SectionFocus>
          <ValueProps dict={dict.valueProps} />
        </SectionFocus>
        <Pipeline dict={dict.pipeline} />
        <SectionFocus>
          <BentoFeatures dict={dict.bento} />
        </SectionFocus>
        <SectionFocus>
          <Analytics dict={dict.analytics} />
        </SectionFocus>
        <SectionFocus>
          <Pricing dict={dict.pricing} locale={locale} />
        </SectionFocus>
        <SectionFocus>
          <FAQ dict={dict.faq} />
        </SectionFocus>
        <SectionFocus>
          <CTA dict={dict.cta} />
        </SectionFocus>
      </main>
      <Footer dict={dict.footer} locale={locale} />
    </>
  );
}
