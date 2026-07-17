"use client";

import { useState } from "react";
import { Check, X, Coins } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import {
  pricingPackage,
  creditPackage,
  formatPrice,
  formatTHB,
  localizePackage,
  totalCredits,
  bonusPercent,
  type PricingTab,
} from "@/contexts/PricingPackage";

const POPULAR_CARD = "border-2 border-accent/50 bg-surface shadow-[0_8px_30px_-8px] shadow-accent-solid/40";
const PLAIN_CARD = "border border-border bg-surface/50";

export function Pricing({
  dict,
  locale,
}: {
  dict: Dictionary["pricing"];
  locale: Locale;
}) {
  const [tab, setTab] = useState<PricingTab>("subscription");

  return (
    <section id="pricing" className="py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow={dict.eyebrow}
          title={dict.title}
          description={dict.description}
        />

        <Reveal className="mt-8 flex justify-center">
          <div
            role="tablist"
            aria-label={dict.eyebrow}
            className="inline-flex items-center gap-1 rounded-full border border-border bg-surface p-1"
          >
            {(["subscription", "credits"] as const).map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  tab === t
                    ? "bg-accent-solid text-accent-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {t === "subscription" ? dict.monthly : dict.credits}
              </button>
            ))}
          </div>
        </Reveal>

        {tab === "subscription" ? (
          <Reveal
            stagger
            className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2"
          >
            {pricingPackage.map((pkg) => {
              const plan = localizePackage(pkg, locale);
              return (
                <div
                  key={plan.id}
                  className={`relative flex flex-col overflow-hidden rounded-2xl p-8 ${
                    plan.popular ? POPULAR_CARD : PLAIN_CARD
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute right-0 top-0 rounded-bl-lg bg-accent-solid/90 px-6 py-2 text-sm font-medium uppercase tracking-wide text-accent-foreground">
                      {dict.mostPopular}
                    </span>
                  )}
                  <h3 className="text-xl font-bold tracking-tight">{plan.name}</h3>
                  <p className="mt-1 text-sm text-muted">{plan.description}</p>

                  <div className="mt-6 flex items-end gap-1">
                    <span className="text-5xl font-semibold tracking-tight">
                      {formatPrice(pkg)}
                    </span>
                    <span className="mb-1.5 text-sm text-muted">{dict.perUnit}</span>
                  </div>

                  <ul className="mt-8 flex flex-col gap-3">
                    {plan.features.map((f) => (
                      <li
                        key={f.id}
                        className={`flex items-center gap-3 text-sm ${
                          f.included ? "" : "text-muted/60"
                        }`}
                      >
                        <span
                          className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                            !f.included
                              ? "bg-surface-2 text-muted/60"
                              : plan.popular
                                ? "bg-accent-solid text-accent-foreground"
                                : "bg-surface-2 text-accent"
                          }`}
                        >
                          {f.included ? (
                            <Check size={12} strokeWidth={3} />
                          ) : (
                            <X size={12} strokeWidth={3} />
                          )}
                        </span>
                        {f.label}
                      </li>
                    ))}
                  </ul>

                  <Button
                    href="#"
                    variant={plan.popular ? "gradient" : "secondary"}
                    className="mt-8 w-full py-3"
                  >
                    {dict.trialCta}
                  </Button>
                </div>
              );
            })}
          </Reveal>
        ) : (
          <>
            <Reveal className="mx-auto mt-8 max-w-xl text-center">
              <p className="text-balance text-sm text-muted">{dict.creditsNote}</p>
            </Reveal>

            <Reveal
              stagger
              className="mx-auto mt-8 grid max-w-4xl gap-5 sm:grid-cols-3"
            >
              {creditPackage.map((pack) => {
                const bonus = bonusPercent(pack);
                return (
                  <div
                    key={pack.id}
                    className={`relative flex flex-col overflow-hidden rounded-2xl p-8 text-center ${
                      pack.popular ? POPULAR_CARD : PLAIN_CARD
                    }`}
                  >
                    {bonus > 0 && (
                      <span className="absolute right-0 top-0 rounded-bl-lg bg-accent-solid/90 px-4 py-1.5 text-xs font-semibold text-accent-foreground">
                        +{bonus}% {dict.bonusLabel}
                      </span>
                    )}

                    <span className="mx-auto grid h-11 w-11 place-items-center rounded-xl border border-border bg-surface-2 text-accent">
                      <Coins size={20} />
                    </span>

                    <div className="mt-5 text-3xl font-bold tracking-tight">
                      {totalCredits(pack).toLocaleString()}
                    </div>
                    <div className="text-sm text-muted">{dict.creditsUnit}</div>

                    <div className="mt-4 text-2xl font-semibold tracking-tight">
                      {formatTHB(pack.price)}
                    </div>

                    <Button
                      href="#"
                      variant={pack.popular ? "gradient" : "secondary"}
                      className="mt-6 w-full py-3"
                    >
                      {dict.topUpCta}
                    </Button>
                  </div>
                );
              })}
            </Reveal>
          </>
        )}
      </div>
    </section>
  );
}
