export type Locale = (typeof locales)[number]

export const locales = ['en', 'vi'] as const
export const defaultLocale: Locale = 'vi'

export const COOKIE_NAME = 'NEXT_LOCALE'

// type export for quick use
// -> just for ref, đôi khi dup code lại tốt hơn cố gắng DRY tối đa
export type TI18nLocale = {
  locale: string
}

export type TI18nParamsOnly = {
  params: { locale: string }
}

// Just for short, có thể backfire nếu dùng các params khác
export type TI18nWithChildren = TI18nParamsOnly & {
  children: React.ReactNode
}
