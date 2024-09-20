import { getRequestConfig } from 'next-intl/server'

import { getLocaleCookie } from './locale.action'

// https://next-intl-docs.vercel.app/docs/getting-started/app-router/without-i18n-routing#i18n-request

// Can be imported from a shared config
export default getRequestConfig(async () => {
  const locale = await getLocaleCookie()

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  }
})
