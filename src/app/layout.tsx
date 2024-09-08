import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
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

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <ProviderData>
          <ProviderUi>{children}</ProviderUi>
        </ProviderData>
      </body>
    </html>
  )
}
