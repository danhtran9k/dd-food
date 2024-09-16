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

import { DishItem } from '@app/api-next/dishes/dishes.dto'
import { useDishesList } from '@app/api-next/dishes/use-dishes-list.hook'

import { ShadcnPagination } from '@module/app-common/shadcn-pagination'
import { TanStackTable } from '@module/app-vendor/tanstack-table'

import { OrderEditTableCol } from './order-edit-table-col'
import { useOrderEditTable } from './use-order-edit-table.hook'

type TOrderEditTable = {
  onChoose: (_TDish: DishItem) => void
}

export const OrderEditTableDialog = ({ onChoose }: TOrderEditTable) => {
  const [open, setOpen] = useState(false)
  const columns = useMemo(() => OrderEditTableCol(), [])
  const { data } = useDishesList((data) => data.payload.data)

  const choose = (dish: DishItem) => {
    onChoose(dish)
    setOpen(false)
  }

  const { table, useFilterField } = useOrderEditTable({
    data: data ?? [],
    columns
  })
  const [value, handleValueChange] = useFilterField('dishName')

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>Thay đổi</Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[600px] max-h-full overflow-auto'>
        <DialogHeader>
          <DialogTitle>Chọn món ăn</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <div>
          <div className='w-full'>
            <div className='flex items-center py-4'>
              <Input
                placeholder='Lọc tên'
                value={value}
                onChange={handleValueChange}
                className='max-w-sm'
              />
            </div>

            <div className='rounded-md border'>
              <TanStackTable table={{ ...table }} onRowSelect={choose} />
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
