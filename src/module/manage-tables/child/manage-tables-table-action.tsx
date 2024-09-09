'use client'

import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { CellContext } from '@tanstack/react-table'

import { Button } from '@core/app-shadcn/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@core/app-shadcn/dropdown-menu'

import { TableItem } from '@app/api-next/tables/tables.dto'

import { useManageTablesContext } from '@module/manage-tables'

export function ManageTablesTableAction({
  row
}: CellContext<TableItem, string>) {
  const { setTableIdEdit, setTableDelete } = useManageTablesContext()

  const openEditTable = () => {
    setTableIdEdit(row.original.number)
  }

  const openDeleteTable = () => {
    setTableDelete(row.original)
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

        <DropdownMenuItem onClick={openEditTable}>Sửa</DropdownMenuItem>
        <DropdownMenuItem onClick={openDeleteTable}>Xóa</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
