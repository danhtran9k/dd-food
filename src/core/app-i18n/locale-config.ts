export type Locale = (typeof locales)[number]

export const locales = ['en', 'vi'] as const
export const defaultLocale: Locale = 'vi'

export const COOKIE_NAME = 'NEXT_LOCALE'
