import type { Locale } from "@/i18n/config";

/**
 * Pricing catalogue — the single source of truth.
 *
 * Two things are sold:
 *   1. `pricingPackage` — the monthly subscription plans.
 *   2. `creditPackage`  — prepaid credit top-ups, spent when a feature hits
 *                         the plan's limit (extra orders, add-ons, etc.).
 *
 * Every plan renders the SAME feature rows (in `featureRows` order) so the
 * cards read as a comparison. A plan either:
 *   - omits a feature / sets `false`  → row is greyed out (shows the default label)
 *   - sets `true`                     → included, shows the default label
 *   - sets `{ th, en }`               → included, with wording specific to that plan
 */

/** Which tab of the pricing section is showing. */
export type PricingTab = "subscription" | "credits";

/** Currency symbol shown next to prices. */
export const CURRENCY = "฿";

/** Formats a THB amount, e.g. "฿1,290". */
export function formatTHB(amount: number): string {
  return `${CURRENCY}${amount.toLocaleString()}`;
}

/* -------------------------------------------------------------------------
   Feature rows — shared by every subscription card
------------------------------------------------------------------------- */

/** Order here is the order rendered on every card. */
export const FEATURE_IDS = [
  "live-capture",
  "orders",
  "couriers",
  "reports",
  "slip-cod",
] as const;

export type FeatureId = (typeof FEATURE_IDS)[number];

export interface FeatureRow {
  id: FeatureId;
  /** Shown when a plan doesn't override the wording (and when it's excluded). */
  label: Record<Locale, string>;
}

export const featureRows: FeatureRow[] = [
  {
    id: "live-capture",
    label: { th: "ดักคอมเมนต์ไลฟ์", en: "Live comment capture" },
  },
  { id: "orders", label: { th: "จำนวนออเดอร์", en: "Orders" } },
  { id: "reports", label: { th: "รายงานยอดขาย", en: "Sales reports" } },
  {
    id: "slip-cod",
    label: { th: "ยืนยันสลิปอัตโนมัติ", en: "Auto slip verification" },
  },
  { id: "couriers", label: { th: "เชื่อมขนส่ง", en: "Courier connections" } },
];

/* -------------------------------------------------------------------------
   Subscription plans (billed monthly)
------------------------------------------------------------------------- */

/** `false`/omitted = excluded, `true` = included, object = included w/ custom wording. */
export type PackageFeature = boolean | Record<Locale, string>;

export interface PricingPackage {
  /** Stable id — used as the React key. Never translate this. */
  id: string;
  /** Highlights the card and marks it "most popular". Only one should be true. */
  popular?: boolean;
  /** Price per month in THB. */
  monthlyPrice: number;
  name: Record<Locale, string>;
  description: Record<Locale, string>;
  features: Partial<Record<FeatureId, PackageFeature>>;
}

export const pricingPackage: PricingPackage[] = [
  {
    id: "free",
    monthlyPrice: 0,
    name: { th: "ฟรี", en: "free" },
    description: {
      th: "ทดลองใช้งานระบบ",
      en: "Essential tools for a small shop.",
    },
    features: {
      "live-capture": {
        th: "ดักคอมเมนต์ไลฟ์ 1 ช่อง",
        en: "Live capture for 1 channel(TikTok)",
      },
      orders: {
        th: "ออเดอร์สูงสุด 10 รายการ/เดือน",
        en: "Up to 10 orders / month",
      },
      // couriers: { th: "เชื่อมขนส่งพื้นฐาน", en: "Basic courier connections" },
      reports: { th: "รายงานยอดขายพื้นฐาน", en: "Basic sales reports" },
      "slip-cod": {
        th: "ยืนยันสลิปอัตโนมัติ 10 สลิป/เดือน",
        en: "Auto slip verification 10 slips/month",
      },
    },
  },
  {
    id: "starter",
    monthlyPrice: 2900,
    name: { th: "เริ่มต้น", en: "Starter" },
    description: {
      th: "เครื่องมือที่จำเป็นสำหรับร้านเล็ก",
      en: "Essential tools for a small shop.",
    },
    features: {
      "live-capture": {
        th: "ดักคอมเมนต์ไลฟ์ 1 ช่อง(TikTok)",
        en: "Live capture for 1 channel(TikTok)",
      },
      orders: {
        th: "ออเดอร์สูงสุด 1,750 รายการ/เดือน",
        en: "Up to 1,750 orders / month",
      },
      couriers: { th: "เชื่อมขนส่งพื้นฐาน", en: "Basic courier connections" },
      reports: { th: "รายงานยอดขายพื้นฐาน", en: "Basic sales reports" },
      "slip-cod": {
        th: "ยืนยันสลิปอัตโนมัติ 1,750 สลิป/เดือน",
        en: "Auto slip verification 1,750 slips/month",
      },
    },
  },
  {
    id: "pro",
    popular: true,
    monthlyPrice: 6900,
    name: { th: "โปร", en: "Pro" },
    description: {
      th: "ครบทุกฟีเจอร์สำหรับร้านที่กำลังโต",
      en: "Everything you need for a growing shop.",
    },
    features: {
      "live-capture": {
        th: "ดักคอมเมนต์ไลฟ์ไม่จำกัดช่อง (TikTok)",
        en: "Live capture for unlimited channel (TikTok)",
      },
      orders: { th: "ออเดอร์ไม่จำกัด", en: "Unlimited orders" },
      couriers: { th: "เชื่อมขนส่งทุกเจ้า", en: "All courier connections" },
      reports: { th: "รายงานเชิงลึก & วิเคราะห์ธุรกิจ", en: "Advanced reports & Insight Business" },
      "slip-cod": true,
    },
  },
];

/** Monthly price, formatted. */
export function formatPrice(pkg: PricingPackage): string {
  return formatTHB(pkg.monthlyPrice);
}

export interface ResolvedFeature {
  id: FeatureId;
  label: string;
  included: boolean;
}

/**
 * Resolves a package's copy for one locale. `features` always has one entry
 * per row in `featureRows`, so every card renders the same number of rows.
 */
export function localizePackage(pkg: PricingPackage, locale: Locale) {
  const features: ResolvedFeature[] = featureRows.map((row) => {
    const value = pkg.features[row.id];
    return {
      id: row.id,
      included: Boolean(value),
      label: typeof value === "object" ? value[locale] : row.label[locale],
    };
  });

  return {
    id: pkg.id,
    popular: Boolean(pkg.popular),
    name: pkg.name[locale],
    description: pkg.description[locale],
    features,
  };
}

/* -------------------------------------------------------------------------
   Credit top-ups — top up baht, spend credits on limited features
------------------------------------------------------------------------- */

export interface CreditPackage {
  /** Stable id — used as the React key. */
  id: string;
  /** What the customer pays, in THB. */
  price: number;
  /** Base credits granted. */
  credits: number;
  /** Extra credits granted on top as a promo. Omit for none. */
  bonusCredits?: number;
  /** Highlights the card. Only one should be true. */
  popular?: boolean;
}

export const creditPackage: CreditPackage[] = [
  { id: "credit-500", price: 500, credits: 500 },
  { id: "credit-1000", price: 1000, credits: 1000, bonusCredits: 100, popular: true },
  { id: "credit-3000", price: 3000, credits: 3000, bonusCredits: 500 },
];

/** Base + bonus credits. */
export function totalCredits(pack: CreditPackage): number {
  return pack.credits + (pack.bonusCredits ?? 0);
}

/** Bonus as a percentage of the base, e.g. 10 for "+10%". 0 when no bonus. */
export function bonusPercent(pack: CreditPackage): number {
  if (!pack.bonusCredits) return 0;
  return Math.round((pack.bonusCredits / pack.credits) * 100);
}
