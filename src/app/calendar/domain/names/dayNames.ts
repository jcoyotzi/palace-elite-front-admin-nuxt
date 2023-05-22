import {LocaleStructure} from './locales'

export const weekdayLocales: LocaleStructure<string[]> = {
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  es: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
}

export function weekdayName(day: number, locale: string): string {
  return weekdayLocales[locale][day]
}
