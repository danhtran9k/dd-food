'use client'

import { AccountType } from '@app/api-next/accounts/account.dto'

import { Avatar, AvatarFallback, AvatarImage } from '@core/app-shadcn/avatar'
import { Button } from '@core/app-shadcn/button'

type TDropDownAvatarTrigger = {
  account?: AccountType
}
export const DropdownAvatarTrigger = ({ account }: TDropDownAvatarTrigger) => {
  return (
    <Button
      variant='outline'
      size='icon'
      className='overflow-hidden rounded-full'
    >
      <Avatar>
        <AvatarImage src={account?.avatar ?? undefined} alt={account?.name} />
        <AvatarFallback>
          {account?.name.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    </Button>
  )
}
