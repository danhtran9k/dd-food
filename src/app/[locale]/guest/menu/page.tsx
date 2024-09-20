import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

import { MenuOrders } from '@module/orders-menu'

type TMenuPage = {
  params: { locale: string }
}

export default async function MenuPage({ params: { locale } }: TMenuPage) {
  unstable_setRequestLocale(locale)
  const t = await getTranslations()

  return (
    <div className='max-w-[400px] mx-auto space-y-4'>
      <h1 className='text-center text-xl font-bold'>{t('GuestMenu.title')}</h1>

      <MenuOrders />
    </div>
  )
}
