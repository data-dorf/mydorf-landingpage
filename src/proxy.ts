import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale } from "@/i18n/config";

/**
 * Adds a locale prefix to any path that doesn't already have one.
 * Default is Thai; visitors whose browser prefers English are sent to /en.
 */
function detectLocale(request: NextRequest): string {
  const accept = request.headers.get("accept-language") ?? "";
  const prefersEnglish = accept
    .split(",")
    .some((part) => part.trim().toLowerCase().startsWith("en"));
  return prefersEnglish ? "en" : defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return NextResponse.next();

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip API, Next internals, and any file with an extension (assets).
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
