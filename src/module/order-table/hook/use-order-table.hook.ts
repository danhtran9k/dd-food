'use client'

import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import {
  PAGE_SIZE,
  TUseTanStackTable,
  useTanStackTable
} from '@module/app-vendor/tanstack-table'

export const useOrderTable = <K, T>({
  data,
  columns
}: TUseTanStackTable<K, T>) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState({})
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

    getCoreRowModel: getCoreRowModel(),
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
  }

  const { table } = useTanStackTable({
    data,
    columns,
    option: tableOption
  })

  const searchParam = useSearchParams()
  const page = searchParam.get('page') ? Number(searchParam.get('page')) : 1
  const pageIndex = page - 1

  useEffect(() => {
    table.setPagination({
      pageIndex,
      pageSize: PAGE_SIZE
    })
  }, [table, pageIndex])

  const useFilterField = (columnId: string) => {
    const value = table.getColumn(columnId)?.getFilterValue() as string
    const handleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
      table.getColumn(columnId)?.setFilterValue(event.target.value)
    }

    return [value, handleValue] as const
  }

  return { table, useFilterField }
}
