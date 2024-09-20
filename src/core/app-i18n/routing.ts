import { createSharedPathnamesNavigation } from 'next-intl/navigation'

import { locales } from '@core/app-i18n/locale-config'

// export const routing = defineRouting({
//   // A list of all locales that are supported
//   locales: ['en', 'de'],

//   // Used when no locale matches
//   defaultLocale: 'en'
// })

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration

// https://next-intl-docs.vercel.app/docs/routing/navigation
export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales })
