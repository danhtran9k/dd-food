import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, unstable_setRequestLocale } from 'next-intl/server'
import './globals.css'

import { locales } from '@core/app-i18n/locale-config'
import { ProviderData } from '@core/app-provider/provider-data'
import { ProviderUi } from '@core/app-provider/provider-ui'
import { cn } from '@core/utils'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

export const metadata: Metadata = {
  title: 'NextJs Restaurant',
  description: 'Next with Fastify'
}

// https://next-intl-docs.vercel.app/docs/getting-started/app-router/with-i18n-routing#add-generatestaticparams-to-applocalelayouttsx
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

type TRootLayout = {
  children: React.ReactNode
  params: { locale: string }
}

// Phải setup tương tự vào tất cả các Page unstable_setRequestLocale để thành static rendering nếu được
// Với component phải dùng hook trung gian để lấy locale
// tạm thời sẽ chỉ setup demo với các page có dùng tới i18n để demo

export default async function RootLayout({
  children,
  params: { locale }
}: TRootLayout) {
  unstable_setRequestLocale(locale)

  // https://next-intl-docs.vercel.app/docs/getting-started/app-router/without-i18n-routing#layout
  const messages = await getMessages()

  // Next Provider là 1 async Provider đặc biệt của i18ntl Next
  // Tạm ko gom vào ProviderData

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <ProviderData>
            <ProviderUi>{children}</ProviderUi>
          </ProviderData>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
