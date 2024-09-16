'use client'

import {
  ColumnFiltersState,
  RowSelectionState,
  SortingState,
  VisibilityState,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'

import { DishItem } from '@app/api-next/dishes/dishes.dto'

import {
  PAGE_SIZE,
  TTanStackHookOption,
  TUseTanStackTable,
  useTanStackTable
} from '@module/app-vendor/tanstack-table'

type TUseOrderEditTable = TUseTanStackTable<string, DishItem>

export const useOrderEditTable = ({ data, columns }: TUseOrderEditTable) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState({
    pageIndex: 0, // Gía trị mặc định ban đầu, không có ý nghĩa khi data được fetch bất đồng bộ
    pageSize: PAGE_SIZE //default page size
  })

  const tableOption = {
    autoResetPageIndex: false,

    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,

    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    onColumnFiltersChange: setColumnFilters,

    state: {
      sorting,
      pagination,
      rowSelection,
      columnVisibility,
      columnFilters
    }
  } satisfies TTanStackHookOption<DishItem>

  const { table } = useTanStackTable({
    data,
    columns,
    option: tableOption
  })

  const useFilterField = (columnId: string) => {
    const value = table.getColumn(columnId)?.getFilterValue() as string
    const handleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
      table.getColumn(columnId)?.setFilterValue(event.target.value)
      table.setPageIndex(0)
    }

    return [value, handleValue] as const
  }

  useEffect(() => {
    table.setPagination({
      pageIndex: 0,
      pageSize: PAGE_SIZE
    })
  }, [table])

  const customClass = {
    row: () => 'cursor-pointer'
  }

  return { table, useFilterField, customClass }
}
