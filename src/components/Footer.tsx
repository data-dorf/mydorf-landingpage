import Link from "next/link";
import Image from "next/image";
import type { Dictionary } from "@/i18n";
import logoMark from "@/../public/images/logo/logo-only.svg";

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
              <Image src={logoMark} alt="Mydorf" className="h-7 w-auto" />
              <span className="text-lg font-semibold tracking-tight">Mydorf</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted">{dict.tagline}</p>
          </div>

          {dict.columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold">{col.title}</h4>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
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
