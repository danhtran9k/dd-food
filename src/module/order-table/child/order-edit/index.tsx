import { useEffect, useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@core/app-shadcn/avatar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@core/app-shadcn/form'
import { Input } from '@core/app-shadcn/input'
import { Label } from '@core/app-shadcn/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@core/app-shadcn/select'
import { mapDefaultPortUrl } from '@core/debug/debug.utils'

import { DishListResType } from '@app/api-next/dishes/dishes.dto'
import {
  getVietnameseOrderStatus,
  OrderStatus
} from '@app/api-next/orders/orders.dto'

import { useOrderTableContext } from '@module/order-table'

import { OrderEditDialogLayout } from './order-edit-dialog-layout'
import { OrderEditTableDialog } from './order-edit-table-dialog'
import { useOrderEditForm } from './use-order-edit-form.hook'
import { useOrderEditSubmit } from './use-order-edit-submit.hook'

type TEditOrder = {
  onSubmitSuccess?: () => void
}

export function EditOrder({ onSubmitSuccess }: TEditOrder) {
  const { orderIdEdit, setOrderIdEdit } = useOrderTableContext()
  const { form, dataPayload } = useOrderEditForm(orderIdEdit as number)

  const [selectedDish, setSelectedDish] = useState<
    DishListResType['data'][0] | null
  >(null)
  useEffect(() => {
    if (dataPayload) {
      setSelectedDish(dataPayload.dishSnapshot)
    }
  }, [dataPayload])

  const reset = () => {
    setOrderIdEdit(undefined)
  }

  const onOpenChange = (value: boolean) => {
    if (!value) {
      reset()
    }
  }

  const { onSubmit } = useOrderEditSubmit({
    orderIdEdit,
    onSubmitSuccess,
    onError: console.log,
    reset
  })

  return (
    <OrderEditDialogLayout
      open={Boolean(orderIdEdit)}
      onOpenChange={onOpenChange}
    >
      <Form {...form}>
        <form
          noValidate
          className='grid auto-rows-max items-start gap-4 md:gap-8'
          id='edit-order-form'
          onSubmit={form.handleSubmit(onSubmit, console.log)}
        >
          <div className='grid gap-4 py-4'>
            <FormField
              control={form.control}
              name='dishId'
              render={({ field }) => (
                <FormItem className='grid grid-cols-4 items-center justify-items-start gap-4'>
                  <FormLabel>Món ăn</FormLabel>

                  <div className='flex items-center col-span-2 space-x-4'>
                    <Avatar className='aspect-square w-[50px] h-[50px] rounded-md object-cover'>
                      <AvatarImage
                        src={mapDefaultPortUrl(selectedDish?.image ?? '')}
                      />
                      <AvatarFallback className='rounded-none'>
                        {selectedDish?.name}
                      </AvatarFallback>
                    </Avatar>

                    <div>{selectedDish?.name}</div>
                  </div>

                  <OrderEditTableDialog
                    onChoose={(dish) => {
                      field.onChange(dish.id)
                      setSelectedDish(dish)
                    }}
                  />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='quantity'
              render={({ field }) => (
                <FormItem>
                  <div className='grid grid-cols-4 items-center justify-items-start gap-4'>
                    <Label htmlFor='quantity'>Số lượng</Label>

                    <div className='col-span-3 w-full space-y-2'>
                      <Input
                        id='quantity'
                        inputMode='numeric'
                        pattern='[0-9]*'
                        className='w-16 text-center'
                        {...field}
                        value={field.value}
                        onChange={(e) => {
                          let value = e.target.value
                          const numberValue = Number(value)
                          if (isNaN(numberValue)) {
                            return
                          }
                          field.onChange(numberValue)
                        }}
                      />
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem>
                  <div className='grid grid-cols-4 items-center justify-items-start gap-4'>
                    <FormLabel>Trạng thái</FormLabel>

                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl className='col-span-3'>
                        <SelectTrigger className='w-[200px]'>
                          <SelectValue placeholder='Trạng thái' />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {Object.values(OrderStatus).map((status) => (
                          <SelectItem key={status} value={status}>
                            {getVietnameseOrderStatus(status)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </OrderEditDialogLayout>
  )
}
