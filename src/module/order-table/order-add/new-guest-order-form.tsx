import { UseFormReturn } from 'react-hook-form'

import { Form, FormField, FormItem, FormMessage } from '@core/app-shadcn/form'
import { Input } from '@core/app-shadcn/input'
import { Label } from '@core/app-shadcn/label'

import { GuestLoginBodyType } from '@app/api-next/guest/guest.dto'

import { SelectOrderTableDialog } from './select-order-table-dialog'

type NewGuestOrderFormProps = {
  form: UseFormReturn<GuestLoginBodyType>
}
export const NewGuestOrderForm = ({ form }: NewGuestOrderFormProps) => {
  return (
    <Form {...form}>
      <form
        noValidate
        className='grid auto-rows-max items-start gap-4 md:gap-8'
        id='add-employee-form'
      >
        <div className='grid gap-4 py-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <div className='grid grid-cols-4 items-center justify-items-start gap-4'>
                  <Label htmlFor='name'>Tên khách hàng</Label>
                  <div className='col-span-3 w-full space-y-2'>
                    <Input id='name' className='w-full' {...field} />
                    <FormMessage />
                  </div>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='tableNumber'
            render={({ field }) => (
              <FormItem>
                <div className='grid grid-cols-4 items-center justify-items-start gap-4'>
                  <Label htmlFor='tableNumber'>Chọn bàn</Label>
                  <div className='col-span-3 w-full space-y-2'>
                    <div className='flex items-center gap-4'>
                      <div>{field.value}</div>

                      <SelectOrderTableDialog
                        onRowSelect={(table) => {
                          field.onChange(table.number)
                        }}
                      />
                    </div>
                  </div>
                </div>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  )
}
