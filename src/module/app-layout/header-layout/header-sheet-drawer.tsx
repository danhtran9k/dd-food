import { Menu, Package2 } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@core/app-shadcn/button'
import { Sheet, SheetContent, SheetTrigger } from '@core/app-shadcn/sheet'
import { ROUTE_PATH } from '@core/path.const'

import { NavItems } from './nav-item'

type THeaderSheetDrawer = {
  side?: 'left' | 'right' | 'top' | 'bottom'
}

export const HeaderSheetDrawer = ({ side = 'left' }: THeaderSheetDrawer) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' size='icon' className='shrink-0 md:hidden'>
          <Menu className='h-5 w-5' />

          <span className='sr-only'>Toggle navigation menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side={side}>
        <nav className='grid gap-6 text-lg font-medium'>
          <Link
            href={ROUTE_PATH.PLACEHOLDER}
            className='flex items-center gap-2 text-lg font-semibold'
          >
            <Package2 className='h-6 w-6' />
            <span className='sr-only'>Big boy</span>
          </Link>

          <NavItems className='text-muted-foreground transition-colors hover:text-foreground' />
        </nav>
      </SheetContent>
    </Sheet>
  )
}
