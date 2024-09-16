import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@core/app-shadcn/popover'

import {
  OrderGuestDetail,
  TOrderTableCellContext,
  useOrderTableContext
} from '@module/order-table'

export const PopoverGuest = ({ row }: TOrderTableCellContext) => {
  const {
    orderStats: { orderByGuestId }
  } = useOrderTableContext()
  const guest = row.original.guest

  return (
    <div>
      {guest ? (
        <Popover>
          <PopoverTrigger>
            <div>
              <span>{guest.name}</span>
              <span className='font-semibold'>(#{guest.id})</span>
            </div>
          </PopoverTrigger>
          <PopoverContent className='w-[320px] sm:w-[440px]'>
            <OrderGuestDetail guest={guest} orders={orderByGuestId[guest.id]} />
          </PopoverContent>
        </Popover>
      ) : (
        <div>
          <span>Đã bị xóa</span>
        </div>
      )}
    </div>
  )
}
