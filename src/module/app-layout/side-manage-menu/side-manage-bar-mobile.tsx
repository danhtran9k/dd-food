'use client'

import { PanelLeft } from 'lucide-react'

import { usePathname } from '@core/app-i18n/routing'
import { Link } from '@core/app-i18n/routing'
import { useAuthContext } from '@core/app-provider/auth-provider'
import { Button } from '@core/app-shadcn/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger
} from '@core/app-shadcn/sheet'
import { cn } from '@core/utils'

import { menuItems } from './child/menu-item'
import { SideManageIconMobile } from './child/side-manage-icon-mobile'

export function SideManageBarMobile() {
  const pathname = usePathname()
  const { role } = useAuthContext()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size='icon' variant='outline' className='sm:hidden'>
          <PanelLeft className='h-5 w-5' />
          <span className='sr-only'>Toggle Menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side='left' className='sm:max-w-xs'>
        <div className='hidden'>
          <SheetTitle className='hidden'>Side Sheet</SheetTitle>
          <SheetDescription />
        </div>

        <nav className='grid gap-6 text-lg font-medium'>
          <SideManageIconMobile />

          {menuItems.map((Item) => {
            const isActive = pathname === Item.href
            if (!Item.roles.includes(role as any)) return null

            return (
              <Link
                key={Item.title}
                href={Item.href}
                className={cn(
                  'flex items-center gap-4 px-2.5  hover:text-foreground',
                  {
                    'text-foreground': isActive,
                    'text-muted-foreground': !isActive
                  }
                )}
              >
                <Item.Icon className='h-5 w-5' />
                {Item.title}
              </Link>
            )
          })}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
