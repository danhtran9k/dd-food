import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { CellContext } from '@tanstack/react-table'

import { AccountType } from '@app/api-next/accounts/account.dto'

import { Button } from '@core/app-shadcn/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@core/app-shadcn/dropdown-menu'

import { useAccountTableContext } from '../account-table-provider'

export const AccountTableBtnDropdown = ({
  row
}: CellContext<AccountType, string>) => {
  const { setEmployeeIdEdit, setEmployeeDelete } = useAccountTableContext()

  const openEditEmployee = () => {
    setEmployeeIdEdit(row.original.id)
  }

  const openDeleteEmployee = () => {
    setEmployeeDelete(row.original)
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <span className='sr-only'>Open menu</span>
          <DotsHorizontalIcon className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={openEditEmployee}>Sửa</DropdownMenuItem>
        <DropdownMenuItem onClick={openDeleteEmployee}>Xóa</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
