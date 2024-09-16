import Image from 'next/image'

import { Badge } from '@core/app-shadcn/badge'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@core/app-shadcn/popover'
import { mapDefaultPortUrl } from '@core/debug/debug.utils'
import { formatCurrency } from '@core/utils'

import { TOrderTableCellContext } from '@module/order-table'

export const PopoverDishesImage = ({ row }: TOrderTableCellContext) => {
  const imgSrc = mapDefaultPortUrl(row.original.dishSnapshot.image)

  return (
    <div className='flex items-center gap-2'>
      <Popover>
        <PopoverTrigger asChild>
          <Image
            src={imgSrc}
            alt={row.original.dishSnapshot.name}
            width={50}
            height={50}
            className='rounded-md object-cover w-[50px] h-[50px] cursor-pointer'
          />
        </PopoverTrigger>

        <PopoverContent>
          <div className='flex flex-wrap gap-2'>
            <Image
              src={imgSrc}
              alt={row.original.dishSnapshot.name}
              width={100}
              height={100}
              className='rounded-md object-cover w-[100px] h-[100px]'
            />

            <div className='space-y-1 text-sm'>
              <h3 className='font-semibold'>
                {row.original.dishSnapshot.name}
              </h3>

              <div className='italic'>
                {formatCurrency(row.original.dishSnapshot.price)}
              </div>

              <div>{row.original.dishSnapshot.description}</div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <div className='space-y-2'>
        <div className='flex items-center gap-2'>
          <span>{row.original.dishSnapshot.name}</span>
          <Badge className='px-1' variant={'secondary'}>
            x{row.original.quantity}
          </Badge>
        </div>
        <span className='italic'>
          {formatCurrency(
            row.original.dishSnapshot.price * row.original.quantity
          )}
        </span>
      </div>
    </div>
  )
}
