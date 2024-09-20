import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'

import { locales } from '@core/app-i18n/locale-config'

// https://next-intl-docs.vercel.app/docs/getting-started/app-router/without-i18n-routing#i18n-request

// Can be imported from a shared config
export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound()

  // với dạng có routing thì ko return locale nữa
  return {
    messages: (await import(`./messages/${locale}.json`)).default
  }
})
