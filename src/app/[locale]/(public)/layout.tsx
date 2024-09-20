import { unstable_setRequestLocale } from 'next-intl/server'

import { HeaderLayout } from '@module/app-layout/header-layout/'
type TLayout = {
  children: React.ReactNode
  params: { locale: string }
}

export default function Layout({ children, params: { locale } }: TLayout) {
  unstable_setRequestLocale(locale)
  return (
    <div className='flex min-h-screen w-full flex-col relative'>
      <HeaderLayout />

      <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
        {children}
      </main>
    </div>
  )
}
