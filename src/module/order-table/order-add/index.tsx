'use client'

import { PlusCircle } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@core/app-shadcn/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@core/app-shadcn/dialog'
import { Label } from '@core/app-shadcn/label'
import { Switch } from '@core/app-shadcn/switch'
import { formatCurrency } from '@core/utils'

import { GetListGuestsResType } from '@app/api-next/accounts/crud/account-guest-crud.dto'
import { DishStatus } from '@app/api-next/dishes/dishes.dto'

import { MenuOrdersItem, useMenuOrder } from '@module/orders-menu'

import { NewGuestOrderForm } from './new-guest-order-form'
import { SelectGuestTableDialog } from './select-guest-table-dialog'
import { useNewGuestOrderForm } from './use-new-guest-order-form.hook'

export const OrderAdd = () => {
  const [open, setOpen] = useState(false)

  const [isNewGuest, setIsNewGuest] = useState(true)
  const [selectedGuest, setSelectedGuest] = useState<
    GetListGuestsResType['data'][0] | null
  >(null)

  const { dishes, orders, totalPrice, handleQuantityChange, setOrders } =
    useMenuOrder()

  const { form, submitOrder } = useNewGuestOrderForm({
    orders,
    isNewGuest,
    selectedGuest
  })

  const reset = () => {
    form.reset()
    setSelectedGuest(null)
    setIsNewGuest(true)
    setOrders([])
    setOpen(false)
  }

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      reset()
    }
    setOpen(value)
  }

  const handleSubmit = async () => {
    await submitOrder()
    reset()
  }

  return (
    <Dialog onOpenChange={handleOpenChange} open={open}>
      <DialogTrigger asChild>
        <Button size='sm' className='h-7 gap-1'>
          <PlusCircle className='h-3.5 w-3.5' />
          <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
            Tạo đơn hàng
          </span>
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[600px] max-h-screen overflow-auto'>
        <DialogHeader>
          <DialogTitle>Tạo đơn hàng</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <div className='grid grid-cols-4 items-center justify-items-start gap-4'>
          <Label htmlFor='isNewGuest'>Khách hàng mới</Label>
          <div className='col-span-3 flex items-center'>
            <Switch
              id='isNewGuest'
              checked={isNewGuest}
              onCheckedChange={setIsNewGuest}
            />
          </div>
        </div>

        {isNewGuest ? (
          <NewGuestOrderForm form={form} />
        ) : (
          <SelectGuestTableDialog
            onRowSelect={(guest) => {
              setSelectedGuest(guest)
            }}
          />
        )}

        {!isNewGuest && selectedGuest && (
          <div className='grid grid-cols-4 items-center justify-items-start gap-4'>
            <Label htmlFor='selectedGuest'>Khách đã chọn</Label>
            <div className='col-span-3 w-full gap-4 flex items-center'>
              <div>
                {selectedGuest.name} (#{selectedGuest.id})
              </div>
              <div>Bàn: {selectedGuest.tableNumber}</div>
            </div>
          </div>
        )}

        {(dishes ?? [])
          .filter((dish) => dish.status !== DishStatus.Hidden)
          .map((dish) => {
            const onChangeQuantities = handleQuantityChange(dish.id)
            return (
              <MenuOrdersItem
                key={dish.id}
                dish={dish}
                orders={orders}
                onChangeQuantities={onChangeQuantities}
              />
            )
          })}

        <DialogFooter>
          <Button
            className='w-full justify-between'
            disabled={orders.length === 0}
            onClick={handleSubmit}
          >
            <span>Đặt hàng · {orders.length} món</span>
            <span>{formatCurrency(totalPrice)}</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
