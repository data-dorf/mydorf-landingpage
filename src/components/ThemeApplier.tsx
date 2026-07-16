"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

// The persisted theme is applied before paint by an inline script on the
// initial load, but client-side navigation (e.g. switching locale) doesn't
// re-run it and can drop the `data-theme` attribute. This re-applies the
// stored preference after every navigation so the UI and the rendered theme
// never disagree. useLayoutEffect keeps it flash-free on the client.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function ThemeApplier() {
  const pathname = usePathname();

  useIsomorphicLayoutEffect(() => {
    try {
      const stored = localStorage.getItem("mydorf-theme");
      const root = document.documentElement;
      if (stored === "light" || stored === "dark") {
        root.setAttribute("data-theme", stored);
      } else {
        root.removeAttribute("data-theme");
      }
    } catch {
      /* ignore storage failures */
    }
  }, [pathname]);

  return null;
}
