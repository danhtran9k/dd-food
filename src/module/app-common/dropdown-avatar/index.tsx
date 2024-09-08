'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useAuthContext } from '@core/app-provider/auth-provider'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@core/app-shadcn/dropdown-menu'
import { ROUTE_PATH } from '@core/path.const'

import { useAccountMe } from '@app/api-next/accounts/use-account.hook'
import { useLogoutMutation } from '@app/api-next/auth/logout/use-logout-mutate.hook'

import { DropdownAvatarTrigger } from './dropdown-avatar-trigger'

export function DropdownAvatar() {
  const { setIsAuth } = useAuthContext()
  const { isPending, mutate } = useLogoutMutation()
  const { data } = useAccountMe()
  const router = useRouter()

  const account = data?.payload.data

  const logout = async () => {
    if (isPending) return

    mutate(undefined, {
      onSuccess: () => {
        setIsAuth(false)
        router.push(ROUTE_PATH.ROOT)
      }
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <DropdownAvatarTrigger account={account} />
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>{account?.name}</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href={ROUTE_PATH.MANAGE.SETTING()} className='cursor-pointer'>
            Cài đặt
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Hỗ trợ</DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={logout}>Đăng xuất</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
