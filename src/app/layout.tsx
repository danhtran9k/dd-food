import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import './globals.css'

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

export default async function RootLayout({
  children
}: Readonly<React.PropsWithChildren>) {
  // https://next-intl-docs.vercel.app/docs/getting-started/app-router/without-i18n-routing#layout
  const locale = await getLocale()
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
