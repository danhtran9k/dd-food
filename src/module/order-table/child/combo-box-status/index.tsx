import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@core/app-shadcn/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@core/app-shadcn/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@core/app-shadcn/popover'
import { cn } from '@core/utils'

import {
  getVietnameseOrderStatus,
  OrderStatus,
  TOrderStatus
} from '@app/api-next/orders/orders.dto'

type TComboBoxStatus = {
  statusValue: string
  handleStatusValue: (_TValue: string) => void
}
const COMBO_WIDTH = 'w-[250px]'

export const ComboBoxStatus = ({
  statusValue,
  handleStatusValue
}: TComboBoxStatus) => {
  // State này nếu muốn control tốt hơn nên code ra phía ngoài rồi truyền vào
  // Tuy nhiên component này sẽ cheat
  const [isOpen, setIsOpen] = useState(false)

  // https://ui.shadcn.com/docs/components/combobox
  // https://www.npmjs.com/package/cmdk?activeTab=readme
  const customFilterByDisplay = (value: string, search: string) => {
    const normlizeInput = search.toLowerCase()
    const normlizeDisplay = getVietnameseOrderStatus(
      value as TOrderStatus
    ).toLowerCase()

    return normlizeDisplay.includes(normlizeInput) ? 1 : 0
  }

  const boxStatusDisplay =
    statusValue &&
    Object.values(OrderStatus as unknown as string[]).includes(statusValue)
      ? getVietnameseOrderStatus(statusValue as TOrderStatus)
      : 'Trạng thái'

  const handleSelectStatus = (value: string) => {
    // select lại value cũ thì toggle đi
    handleStatusValue(value === statusValue ? '' : value)
    setIsOpen(false)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          role='combobox'
          variant='outline'
          aria-expanded={isOpen}
          className={cn('text-sm justify-between', COMBO_WIDTH)}
        >
          {boxStatusDisplay}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>

      <PopoverContent className={cn('p-0', COMBO_WIDTH)}>
        <Command filter={customFilterByDisplay}>
          <CommandInput placeholder='Search framework...' />
          <CommandEmpty>No framework found.</CommandEmpty>

          <CommandGroup>
            <CommandList>
              {Object.values(OrderStatus).map((status) => (
                <CommandItem
                  key={status}
                  value={status}
                  onSelect={handleSelectStatus}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      statusValue === status ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {getVietnameseOrderStatus(status)}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
