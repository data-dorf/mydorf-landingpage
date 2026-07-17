import Link from "next/link";
import Image from "next/image";
import type { Dictionary } from "@/i18n";
import logoMark from "@/../public/images/logo/logo-only.svg";

// hrefs indexed to match dict.footer.columns order (Product, Company, Legal)
// and, within each, the links array. Language-independent — no matching on the
// visible text, which changes per locale.
const PRODUCTS_LINK = ["#features", "#pricing", "#how"];
const COMPANY_LINK = ["https://www.datadorf.co.th/", "#contact"];
const LEGAL_LINK = ["#", "#", "#", "https://app.mydorf.com"];

const COLUMN_HREFS = [PRODUCTS_LINK, COMPANY_LINK, LEGAL_LINK];

export function Footer({
  dict,
  locale,
}: {
  dict: Dictionary["footer"];
  locale: string;
}) {
  return (
    <footer className="border-t border-border">
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link href={`/${locale}`} className="flex items-center gap-2">
              <Image src={logoMark} alt="Mydorf" className="h-8 w-auto" />
              <span className="text-lg font-semibold tracking-tight">Mydorf</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted">{dict.tagline}</p>

            <dl className="mt-6 flex max-w-sm flex-col gap-3">
              {dict.addresses.map((addr) => (
                <div key={addr.label}>
                  <dt className="text-sm font-semibold">{addr.label}</dt>
                  <dd className="mt-0.5 text-sm text-muted">{addr.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {dict.columns.map((col, colIndex) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold">{col.title}</h4>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((link, linkIndex) => {
                  const href = COLUMN_HREFS[colIndex]?.[linkIndex] ?? "#";
                  const external = href.startsWith("http");
                  return (
                    <li key={link}>
                      <Link
                        href={href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        className="text-sm text-muted transition-colors hover:text-foreground"
                      >
                        {link}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} Mydorf. {dict.rights}
          </p>
          <p>{dict.note}</p>
        </div>
      </div>
    </footer>
  );
}
