import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getFilteredRowModel,
  getSortedRowModel
} from '@tanstack/react-table'
import { useState } from 'react'

export const useAccountTableFeature = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    { id: 'email', value: '' }
  ])

  const accountTableFeatureOptions = {
    // FUlL options behavior
    // Kích hoạt khi muốn dùng
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    // hàm control behavior, có thể truyền override lại
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    // Có thể overrid nếu muốn
    onColumnFiltersChange: setColumnFilters,

    state: {
      sorting,
      rowSelection,
      columnVisibility,
      columnFilters
    }
  }

  return {
    accountTableFeatureOptions,
    columnFilters,
    setColumnFilters
  }
}
