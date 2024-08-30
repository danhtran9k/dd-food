'use client'

import Link from 'next/link'

import { useLogoutMutation } from '@app/api-next/auth/logout/use-logout-mutate.hook'

import { Avatar, AvatarFallback, AvatarImage } from '@core/app-shadcn/avatar'
import { Button } from '@core/app-shadcn/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@core/app-shadcn/dropdown-menu'
import { ROUTE_PATH } from '@core/path.const'

export default function DropdownAvatar() {
  const { isPending, mutate } = useLogoutMutation()

  const logout = async () => {
    if (isPending) return
    mutate()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='icon'
          className='overflow-hidden rounded-full'
        >
          <Avatar>
            <AvatarImage src={account.avatar ?? undefined} alt={account.name} />
            <AvatarFallback>
              {account.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>{account.name}</DropdownMenuLabel>

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

const account = {
  name: 'Nguyễn Văn A',
  avatar: 'https://i.pravatar.cc/150'
}
