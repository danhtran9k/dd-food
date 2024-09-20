'use client'

import { useLocale, useTranslations } from 'next-intl'

import { Locale, locales } from '@core/app-i18n/locale-config'
import { setLocaleCookie } from '@core/app-i18n/locale.action'
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

  return (
    <Select
      value={locale}
      onValueChange={(value) => {
        setLocaleCookie(value as Locale)
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
