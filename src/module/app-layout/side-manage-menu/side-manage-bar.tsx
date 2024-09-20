'use client'

import { Package2, Settings } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useAuthContext } from '@core/app-provider/auth-provider'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@core/app-shadcn/tooltip'
import { ROUTE_PATH } from '@core/path.const'
import { cn } from '@core/utils'

import { menuItems } from './child/menu-item'

export function SideManageBar() {
  const pathname = usePathname()
  const { role } = useAuthContext()

  // Code chỗ này hơi cheat
  // Provider bọc chung hết mọi tooltip
  // Về cơ bản thì ko sai, chỉ có 1 tooltip cùng 1 lúc
  // Nhưng về jsx thì cứ kì kì, xem như Provider toàn bộ 1 cụm component
  return (
    <TooltipProvider>
      <aside className='fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex'>
        <nav className='flex flex-col items-center gap-4 px-2 py-4'>
          <Link
            href={ROUTE_PATH.PLACEHOLDER}
            className='group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base'
          >
            <Package2 className='h-4 w-4 transition-all group-hover:scale-110' />
            <span className='sr-only'>Acme Inc</span>
          </Link>

          {menuItems.map((Item) => {
            const isActive = pathname === Item.href
            if (!Item.roles.includes(role as any)) return null

            return (
              <Tooltip key={Item.title}>
                <TooltipTrigger asChild>
                  <Link
                    href={Item.href}
                    className={cn(
                      'flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8',
                      isActive
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground'
                    )}
                  >
                    <Item.Icon className='h-5 w-5' />
                    <span className='sr-only'>{Item.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side='right'>{Item.title}</TooltipContent>
              </Tooltip>
            )
          })}
        </nav>

        <nav className='mt-auto flex flex-col items-center gap-4 px-2 py-4'>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={ROUTE_PATH.MANAGE.SETTING()}
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-lg  transition-colors hover:text-foreground md:h-8 md:w-8',
                  pathname === ROUTE_PATH.MANAGE.SETTING()
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground'
                )}
              >
                <Settings className='h-5 w-5' />
                <span className='sr-only'>Cài đặt</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Cài đặt</TooltipContent>
          </Tooltip>
        </nav>
      </aside>
    </TooltipProvider>
  )
}
