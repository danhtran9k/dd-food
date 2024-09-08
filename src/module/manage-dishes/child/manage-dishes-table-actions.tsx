import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { CellContext } from '@tanstack/react-table'

import { DishItem } from '@app/api-next/dishes/dishes.dto'

import { Button } from '@core/app-shadcn/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@core/app-shadcn/dropdown-menu'

import { useManageDishesContext } from '@module/manage-dishes'

export function ManageDishesTableAction({
  row
}: CellContext<DishItem, string>) {
  const { setDishIdEdit, setDishDelete } = useManageDishesContext()

  const openEditDish = () => {
    setDishIdEdit(row.original.id)
  }

  const openDeleteDish = () => {
    setDishDelete(row.original)
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
        <DropdownMenuItem onClick={openDeleteDish}>Xóa</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
