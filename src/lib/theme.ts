/**
 * Theme.ts — single source of truth for Mydorf design tokens.
 *
 * Based on the supplied purple / indigo + cyan palette, with a few
 * accessibility-driven additions (marked "// adjusted"):
 *
 *  - The dark accent `#341CE9` scores only ~2.2:1 as text on `#131313`,
 *    so `accent` (used for text/icons/highlights) is brightened to `#7B5CFF`
 *    in dark mode, while `accentSolid` keeps the original `#341CE9` for
 *    button fills (white text on it scores ~8.5:1).
 *  - `foreground` / `muted` / `surface` / `border` were not in the original
 *    spec and are derived so text stays readable on the deep backgrounds.
 *
 * These values are mirrored as CSS custom properties in `globals.css`.
 * Import this file when you need the tokens in TS/JS (charts, canvas, etc.).
 */

export interface ThemeTokens {
  /** Page background (the "primary" surface). */
  background: string;
  /** Elevated surface — cards, panels. */
  surface: string;
  /** Second elevation — inputs, chips, bar fills. */
  surface2: string;
  /** Deep brand surface for gradient panels / hero wells. */
  secondary: string;
  /** Primary text color. */
  foreground: string;
  /** Secondary / supporting text. */
  muted: string;
  /** Hairline borders and dividers. */
  border: string;
  /** Interactive accent used for text, icons and highlights. */
  accent: string;
  /** Solid accent for filled buttons / badges (pair with accentForeground). */
  accentSolid: string;
  /** Text/icon color that sits on top of `accentSolid`. */
  accentForeground: string;
  /** Cyan secondary accent (glows, subtle highlights). */
  accent2: string;
  /** Ready-to-use translucent cyan glow (the "5%" tint from the spec). */
  accentGlow: string;
}

export const lightTheme: ThemeTokens = {
  background: "#F5F1FF", // spec: primary
  surface: "#FFFFFF", // adjusted
  surface2: "#FBF9FF", // adjusted
  secondary: "#151256", // spec: secondary
  foreground: "#151256", // adjusted (reuses secondary — 13.6:1 on bg)
  muted: "#6A6795", // adjusted
  border: "#E6DEFA", // adjusted
  accent: "#6A48F7", // spec: accent (4.9:1 as text on bg)
  accentSolid: "#6A48F7", // spec: accent
  accentForeground: "#FFFFFF",
  accent2: "#26C9E8", // spec: cyan
  accentGlow: "rgba(38, 201, 232, 0.05)", // spec: #26C9E8 @ 5%
};

export const darkTheme: ThemeTokens = {
  background: "#131313", // spec: primary
  surface: "#1A1A1E", // adjusted
  surface2: "#232329", // adjusted
  secondary: "#0D0C31", // spec: secondary
  foreground: "#F4F3F8", // adjusted
  muted: "#9C9AA8", // adjusted
  border: "#2A2A31", // adjusted
  accent: "#7B5CFF", // adjusted (brightened from #341CE9 → 4.3:1 as text)
  accentSolid: "#341CE9", // spec: accent (white on it = 8.5:1)
  accentForeground: "#FFFFFF",
  accent2: "#52E1FC", // spec: cyan
  accentGlow: "rgba(82, 225, 252, 0.05)", // spec: #52E1FC @ 5%
};

export const theme = {
  light: lightTheme,
  dark: darkTheme,
} as const;

export type ThemeName = keyof typeof theme;

export default theme;
