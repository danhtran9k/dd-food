import { Package2 } from 'lucide-react'
import Link from 'next/link'

import { ROUTE_PATH } from '@core/path.const'

export const IconHeaderLayout = () => {
  return (
    <Link
      href={ROUTE_PATH.PLACEHOLDER}
      className='flex items-center gap-2 text-lg font-semibold md:text-base'
    >
      <Package2 className='h-6 w-6' />
      <span className='sr-only'>Big boy</span>
    </Link>
  )
}
