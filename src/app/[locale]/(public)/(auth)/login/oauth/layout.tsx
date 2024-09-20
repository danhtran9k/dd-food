import { unstable_setRequestLocale } from 'next-intl/server'
import { Suspense } from 'react'

type TLayout = {
  children: React.ReactNode
  params: { locale: string }
}

export default function Layout({ children, params: { locale } }: TLayout) {
  unstable_setRequestLocale(locale)
  return <Suspense>{children}</Suspense>
}
