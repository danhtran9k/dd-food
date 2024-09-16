import { DotsHorizontalIcon } from '@radix-ui/react-icons'

import { Button } from '@core/app-shadcn/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@core/app-shadcn/dropdown-menu'

import {
  TOrderTableCellContext,
  useOrderTableContext
} from '@module/order-table'

export function ManageDishesTableAction({ row }: TOrderTableCellContext) {
  const { setOrderIdEdit } = useOrderTableContext()

  const openEditDish = () => {
    setOrderIdEdit(row.original.id)
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

        <DropdownMenuItem onClick={openEditDish}>Sửa</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
