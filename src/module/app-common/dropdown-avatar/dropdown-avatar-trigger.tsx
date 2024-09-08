'use client'

import { forwardRef } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@core/app-shadcn/avatar'
import { Button } from '@core/app-shadcn/button'

import { AccountType } from '@app/api-next/accounts/account.dto'

type TDropDownAvatarTrigger = {
  account?: AccountType
}

// https://www.radix-ui.com/primitives/docs/guides/composition#your-component-must-forward-ref
export const DropdownAvatarTrigger = forwardRef<
  HTMLButtonElement,
  TDropDownAvatarTrigger
>(({ account, ...props }, ref) => {
  return (
    <Button
      variant='outline'
      size='icon'
      className='overflow-hidden rounded-full'
      ref={ref}
      {...props}
    >
      <Avatar>
        <AvatarImage src={account?.avatar ?? undefined} alt={account?.name} />
        <AvatarFallback>
          {account?.name.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    </Button>
  )
})

DropdownAvatarTrigger.displayName = 'DropdownAvatarTrigger'
