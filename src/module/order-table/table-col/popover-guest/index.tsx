import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@core/app-shadcn/popover'

import { TOrderTableCellContext } from '@module/order-table'

export const PopoverGuest = ({ row }: TOrderTableCellContext) => {
  const guest = row.original.guest
  return (
    <div>
      {!guest && (
        <div>
          <span>Đã bị xóa</span>
        </div>
      )}
      {guest && (
        <Popover>
          <PopoverTrigger>
            <div>
              <span>{guest.name}</span>
              <span className='font-semibold'>(#{guest.id})</span>
            </div>
          </PopoverTrigger>
          <PopoverContent className='w-[320px] sm:w-[440px]'>
            OrderGuestDetail
          </PopoverContent>
        </Popover>
      )}
    </div>
  )
}
