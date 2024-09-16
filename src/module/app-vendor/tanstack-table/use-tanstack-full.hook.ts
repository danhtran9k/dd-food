import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { PAGE_SIZE, TUseTanStackTable } from '@module/app-vendor/tanstack-table'

type TUseTanStackFull<K, T> = TUseTanStackTable<K, T> & {
  urlPagination?: boolean
  pageSizeOverride?: number
}

// Tanstack full internal state self control
// ko export internal pagination state ra
// control hoàn toàn qua table headless
export const useTanStackFull = <K, T>({
  data,
  columns,
  option,
  urlPagination = true,
  pageSizeOverride
}: TUseTanStackFull<K, T>) => {
  // Table internal state init
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const pageSize = pageSizeOverride ?? PAGE_SIZE
  const [pagination, setPagination] = useState({
    pageIndex: 0, // Gía trị mặc định ban đầu, không có ý nghĩa khi data được fetch bất đồng bộ
    pageSize
  })

  const table = useReactTable<T>({
    // FuLL feature setup, tanstack tự control bên dưới
    // Cần tối ưu thì disable đi

    // ref - use-tanstack-pagination.hook.ts, use-account-table-feature.hook.ts
    // order-table, dishes-table
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),

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

    autoResetPageIndex: false,

    defaultColumn: {
      size: 100, //starting column size
      minSize: 50, //enforced during column resizing
      maxSize: 500 //enforced during column resizing
    },

    // Override options
    ...option,
    // state phải để ở dưới để ko bị option override lại
    state: {
      sorting,
      pagination,
      rowSelection,
      columnVisibility,
      columnFilters,

      ...option?.state
    }
  })

  // Merge reload state internal của table
  // logic ko lớn nên merge vào luôn
  const searchParam = useSearchParams()
  const page = searchParam.get('page') ? Number(searchParam.get('page')) : 1
  const pageIndex = page - 1

  // Custom cứng vào ko hay lắm
  // vì sẽ có table dùng internal state hoặc dùng url state
  useEffect(() => {
    if (!urlPagination) return

    // ko dùng internal state thì ko reset theo url pageParams
    table.setPagination({
      pageIndex,
      pageSize
    })
  }, [table, pageIndex, urlPagination, pageSize])

  const useFilterField = <T = string>(columnId: string) => {
    const value = table.getColumn(columnId)?.getFilterValue() as T
    const handleEventInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      table.getColumn(columnId)?.setFilterValue(event.target.value)
    }

    const handleValue = (value: T) => {
      table.getColumn(columnId)?.setFilterValue(value)
      table.setPageIndex(0)
    }

    return [value, handleEventInput, handleValue] as const
  }

  return { table, useFilterField }
}
