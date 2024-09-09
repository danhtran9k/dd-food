import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
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

// tương tự manage dishes table hook 100%
// check import cũng sẽ thấy ko có phụ thuộc gì
// giống 1 hook table full-feature internal state full manage
export const useManageTablesTable = <K, T>({
  data,
  columns
}: TUseTanStackTable<K, T>) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: PAGE_SIZE
  })

  const tableOption = {
    autoResetPageIndex: false,

    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,

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

  // Merge reload state internal của table
  // logic ko lớn nên merge vào luôn
  const searchParam = useSearchParams()
  const page = searchParam.get('page') ? Number(searchParam.get('page')) : 1
  const pageIndex = page - 1

  useEffect(() => {
    table.setPagination({
      pageIndex,
      pageSize: PAGE_SIZE
    })
  }, [table, pageIndex])

  return table
}
