'use client'

import { Package2 } from 'lucide-react'

import { Link } from '@core/app-i18n/routing'
import { ROUTE_PATH } from '@core/path.const'

export const SideManageIconMobile = () => {
  return (
    <Link
      href={ROUTE_PATH.PLACEHOLDER}
      className='group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base'
    >
      <Package2 className='h-5 w-5 transition-all group-hover:scale-110' />
      <span className='sr-only'>Acme Inc</span>
    </Link>
  )
}
