'use client'

import { CaretSortIcon } from '@radix-ui/react-icons'
import { ColumnDef } from '@tanstack/react-table'

import { Avatar, AvatarFallback, AvatarImage } from '@core/app-shadcn/avatar'
import { Button } from '@core/app-shadcn/button'
import { mapDefaultPortUrl } from '@core/debug/debug.utils'

import { AccountType } from '@app/api-next/accounts/account.dto'

import { AccountTableBtnDropdown } from './child'

export const AccountTableCol = () => {
  return [
    {
      accessorKey: 'id',
      header: 'ID'
    },
    {
      accessorKey: 'avatar',
      header: 'Avatar',
      cell: ({ row }) => (
        <div>
          <Avatar className='aspect-square w-[100px] h-[100px] rounded-md object-cover'>
            <AvatarImage src={mapDefaultPortUrl(row.getValue('avatar'))} />
            <AvatarFallback className='rounded-none'>
              {row.original.name}
            </AvatarFallback>
          </Avatar>
        </div>
      )
    },
    {
      accessorKey: 'name',
      header: 'Tên',
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue('name')}</div>
      )
    },
    {
      accessorKey: 'email',
      header: ({ column }) => {
        const handleSort = () => {
          column.toggleSorting(column.getIsSorted() === 'asc')
        }

        return (
          <Button variant='ghost' onClick={handleSort}>
            Email
            <CaretSortIcon className='ml-2 h-4 w-4' />
          </Button>
        )
      }
      // cell ko define thì tanstack tự lấy row.getValue('email') ra
    },
    {
      accessorKey: 'role',
      header: ({ column }) => {
        const handleSort = () => {
          column.toggleSorting(column.getIsSorted() === 'asc')
        }
        return (
          <Button variant='ghost' onClick={handleSort}>
            Role
            <CaretSortIcon className='ml-2 h-4 w-4' />
          </Button>
        )
      }
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: (cell) => <AccountTableBtnDropdown {...cell} />
    }
  ] satisfies ColumnDef<AccountType, string>[]
}
