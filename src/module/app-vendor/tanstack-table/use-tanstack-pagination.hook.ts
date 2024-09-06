import { getPaginationRowModel } from '@tanstack/react-table'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { PAGE_SIZE } from './tanstack-table.type'

export const useTanStackPagination = () => {
  const searchParam = useSearchParams()
  // Cách 2 gọn hơn
  // const params = Object.fromEntries(searchParam.entries())
  const page = searchParam.get('page') ? Number(searchParam.get('page')) : 1
  const pageIndex = page - 1

  const [tablePagination, setTablePagination] = useState({
    pageIndex: 1,
    // không có ý nghĩa khi data được fetch bất đồng bộ
    // Gía trị mặc định ban đầu,
    pageSize: PAGE_SIZE //default page size
  })

  const handleChangePage = (page: number) => {
    setTablePagination({
      pageIndex: page - 1,
      pageSize: PAGE_SIZE
    })
  }

  useEffect(() => {
    setTablePagination({
      pageIndex,
      pageSize: PAGE_SIZE
    })
  }, [pageIndex])

  // const totalPage = Math.ceil(total / PAGE_SIZE)
  // total -> table.getPageCount()

  // const currentDisplay = Math.min(PAGE_SIZE, total - pageIndex * PAGE_SIZE)
  // currentDisplay -> table.getPaginationRowModel().rows.length

  // pagination.pageIndex -> table.getState().pagination.pageIndex + 1

  // Khi filter thì phải tự tính toán lại logic riêng
  // Nhưng cần có object table hoặc full control
  // totalFiltered -> table.getFilteredRowModel().rows.length

  const tanStackPaginationOptions = {
    autoResetPageIndex: false,

    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setTablePagination,

    state: {
      pagination: tablePagination
    }
  }

  return {
    tablePagination,
    setTablePagination,
    handleChangePage,
    tanStackPaginationOptions
  }
}
