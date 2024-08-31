'use client'

import { PanelLeft } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

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

          {menuItems.map((Item, index) => {
            const isActive = pathname === Item.href
            return (
              <Link
                key={index}
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
