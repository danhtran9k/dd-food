import { Minus, Plus } from 'lucide-react'
import { ChangeEvent } from 'react'

import { Button } from '@core/app-shadcn/button'
import { Input } from '@core/app-shadcn/input'

type OrdersQuantityProps = {
  onChange: (_TValue: number) => void
  value: number
}

export function OrdersQuantity({ onChange, value }: OrdersQuantityProps) {
  const handleMinus = () => {
    if (value === 0) {
      return
    }
    onChange(value - 1)
  }

  const handlePlus = () => {
    onChange(value + 1)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const numberValue = Number(value)
    if (isNaN(numberValue)) {
      return
    }
    onChange(numberValue)
  }

  return (
    <div className='flex gap-1 '>
      <Button
        className='h-6 w-6 p-0'
        disabled={value === 0}
        onClick={handleMinus}
      >
        <Minus className='w-3 h-3' />
      </Button>

      <Input
        type='text'
        inputMode='numeric'
        pattern='[0-9]*'
        className='h-6 p-1 w-8 text-center'
        value={value}
        onChange={handleChange}
      />

      <Button className='h-6 w-6 p-0' onClick={handlePlus}>
        <Plus className='w-3 h-3' />
      </Button>
    </div>
  )
}
