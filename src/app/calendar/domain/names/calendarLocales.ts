import {LocaleStructure} from './locales'

export interface CalendarLanguage {
  dayTags: {
    best_price: string
    sold_out: string
  }
}

// eslint-disable-next-line import/prefer-default-export
export const calendarLocales: LocaleStructure<CalendarLanguage> = {
  en: {
    dayTags: {
      best_price: 'Best Price',
      sold_out: 'Sold Out'
    }
  },
  es: {
    dayTags: {
      best_price: 'Oferta',
      sold_out: 'Vendido'
    }
  }
}

export function getCalendarLanguage(locale: string): CalendarLanguage {
  return calendarLocales[locale]
}
