'use client'

import { useLocale, useTranslations } from 'next-intl'

import { Locale, locales } from '@core/app-i18n/locale-config'
import { usePathname, useRouter } from '@core/app-i18n/routing'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@core/app-shadcn/select'

export function SwitchLanguage() {
  const t = useTranslations('SwitchLanguage')
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  return (
    <Select
      value={locale}
      onValueChange={(value) => {
        // 1. Without i18n routing
        // hook setLocaleCookie chỉ dùng với dạng ko routing only
        // setLocaleCookie(value as Locale)
        // ==============================================
        // 2. Using default router from next/navigation
        // const locale = params.locale as Locale
        // const newPathname = pathname.replace(`/${locale}`, `/${value}`)
        // const fullUrl = `${newPathname}?${searchParams?.toString()}`
        // router.replace(fullUrl)
        // ==============================================
        // 3. https://next-intl-docs.vercel.app/docs/routing/navigation#userouter
        router.replace(pathname, {
          locale: value as Locale
        })
        router.refresh()
      }}
    >
      <SelectTrigger className='w-[140px]'>
        <SelectValue placeholder={t('title')} />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {locales.map((locale) => (
            <SelectItem value={locale} key={locale}>
              {t(locale)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
