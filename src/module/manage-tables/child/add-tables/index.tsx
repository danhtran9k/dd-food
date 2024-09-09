'use client'

import { useState } from 'react'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
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

import {
  TableStatusValues,
  getVietnameseTableStatus
} from '@app/api-next/tables/tables.dto'

import {
  ADD_TABLE_FORM_ID,
  AddTableDialogLayout
} from './add-table-dialog-layout'
import { useAddTableSubmit } from './use-add-table-submit.hook'
import { useFormAddTable } from './use-form-add-table.hook'

export function AddTable() {
  const [open, setOpen] = useState(false)

  const form = useFormAddTable()

  const reset = () => {
    form.reset()
  }

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      form.reset()
    }
    setOpen(value)
  }

  const { onSubmit } = useAddTableSubmit({
    reset,
    setOpen,
    setError: form.setError
  })

  return (
    <AddTableDialogLayout open={open} onOpenChange={handleOpenChange}>
      <Form {...form}>
        <form
          noValidate
          className='grid auto-rows-max items-start gap-4 md:gap-8'
          id={ADD_TABLE_FORM_ID}
          onSubmit={form.handleSubmit(onSubmit, console.log)}
          onReset={reset}
        >
          <div className='grid gap-4 py-4'>
            <FormField
              control={form.control}
              name='number'
              render={({ field }) => (
                <FormItem>
                  <div className='grid grid-cols-4 items-center justify-items-start gap-4'>
                    <Label htmlFor='number'>Số hiệu bàn</Label>
                    <div className='col-span-3 w-full space-y-2'>
                      <Input
                        id='number'
                        type='number'
                        className='w-full'
                        {...field}
                      />
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='capacity'
              render={({ field }) => (
                <FormItem>
                  <div className='grid grid-cols-4 items-center justify-items-start gap-4'>
                    <Label htmlFor='capacity'>Sức chứa</Label>
                    <div className='col-span-3 w-full space-y-2'>
                      <Input
                        id='capacity'
                        type='number'
                        className='w-full'
                        {...field}
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
                    <Label htmlFor='status'>Trạng thái</Label>

                    <div className='col-span-3 w-full space-y-2'>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Chọn trạng thái' />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {TableStatusValues.map((status) => (
                            <SelectItem key={status} value={status}>
                              {getVietnameseTableStatus(status)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </AddTableDialogLayout>
  )
}
