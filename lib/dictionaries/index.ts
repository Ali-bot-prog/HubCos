import { tr } from "./tr";
import { en } from "./en";
import { ar } from "./ar";
import type { Dictionary } from "./tr";

export type Locale = "tr" | "en" | "ar";
export const locales: Locale[] = ["tr", "en", "ar"];
export const defaultLocale: Locale = "tr";

const dictionaries: Record<Locale, Dictionary> = { tr, en, ar };

export function getDictionary(locale: string): Dictionary {
  const validLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : defaultLocale;
  return dictionaries[validLocale];
}
