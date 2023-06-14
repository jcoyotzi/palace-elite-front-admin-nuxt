import { LocalePageBPG } from "~/src/app/bpg/domain/enum/localePageBPG";

export function getAffiliationLangToLocale(lang: string, defaultLocale: string): string {
  switch (lang) {
  case LocalePageBPG.SPANISH:
    return 'es';
  case LocalePageBPG.PORTUGUESE:
    return 'pt';
  case LocalePageBPG.ENGLISH:
    return 'en';
  default:
    return defaultLocale
  }
}