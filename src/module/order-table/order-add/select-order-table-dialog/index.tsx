import { useMemo, useState } from 'react'

import { Button } from '@core/app-shadcn/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@core/app-shadcn/dialog'
import { Input } from '@core/app-shadcn/input'
import { cn } from '@core/utils'

import { TableItem, TableStatus } from '@app/api-next/tables/tables.dto'
import { useTablesList } from '@app/api-next/tables/use-tables-list.hook'

import { ShadcnPagination } from '@module/app-common/shadcn-pagination'
import {
  TanStackTable,
  useTanStackFull
} from '@module/app-vendor/tanstack-table'

import { SelectOrderTableDialogCol } from './select-order-table-dialog-col'

type TSelectOrderTableDialog = {
  onRowSelect: (_TRow: TableItem) => void
}

export const SelectOrderTableDialog = ({
  onRowSelect
}: TSelectOrderTableDialog) => {
  const [open, setOpen] = useState(false)

  const { data } = useTablesList((data) => data.payload.data)
  const columns = useMemo(() => SelectOrderTableDialogCol(), [])

  const { table, useFilterField } = useTanStackFull({
    data: data ?? [],
    columns
  })
  const [number, setNumber] = useFilterField('number')

  const handleRowSelect = (row: TableItem) => {
    // TODO: business logic liệu có được chọn row đã reserved bất kì ko
    // Logic reserved giải quyết ntn ? phía BE 100% ?

    if (
      row.status === TableStatus.Available ||
      row.status === TableStatus.Reserved
    ) {
      onRowSelect(row)
      setOpen(false)
    }
  }

  const customClass = {
    row: (row: TableItem) =>
      cn({
        'cursor-pointer':
          row.status === TableStatus.Available ||
          row.status === TableStatus.Reserved,
        'cursor-not-allowed': row.status === TableStatus.Hidden
      })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>Thay đổi</Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[600px] max-h-full overflow-auto'>
        <DialogHeader>
          <DialogTitle>Chọn bàn</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <div>
          <div className='w-full'>
            <div className='flex items-center py-4'>
              <Input
                placeholder='Số bàn'
                value={number}
                onChange={setNumber}
                className='w-[80px]'
              />
            </div>

            <div className='rounded-md border'>
              <TanStackTable
                table={{ ...table }}
                onRowSelect={handleRowSelect}
                customClass={customClass}
              />
            </div>

            <div className='flex items-center justify-end space-x-2 py-4'>
              <div className='text-xs text-muted-foreground py-4 flex-1 '>
                Display{' '}
                <strong>
                  {table.getPaginationRowModel().rows.length} /{' '}
                  {table.getFilteredRowModel().rows.length}
                </strong>{' '}
                - Total <strong>{data?.length ?? 0}</strong>
              </div>

              <div>
                <ShadcnPagination
                  page={table.getState().pagination.pageIndex + 1}
                  total={table.getPageCount()}
                  isLink={false}
                  onChange={(e) => {
                    // Number UI index 1
                    table.setPageIndex(e - 1)
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
