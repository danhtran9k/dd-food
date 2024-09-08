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
import { Textarea } from '@core/app-shadcn/text-area'
import { getUrlImage } from '@core/utils'

import {
  DishStatusValues,
  getVietnameseDishStatus
} from '@app/api-next/dishes/dishes.dto'

import {
  FileInputAndPreview,
  useFilePreviewInput
} from '@module/app-common/btn-file-input'

import { ADD_DISH_FORM_ID, AddDishDialogLayout } from './add-dish-dialog-layout'
import { useAddDishesSubmit } from './use-add-dishes-submit.hook'
import { useFormAddDish } from './use-form-add-dish.hook'

export function AddDishes() {
  const [open, setOpen] = useState(false)

  const form = useFormAddDish()
  const [avatar, name] = form.watch(['image', 'name'])

  const {
    file,
    setFile,
    previewFileUrl: previewAvatarFromFile
  } = useFilePreviewInput(avatar)

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      form.reset()
    }
    setOpen(value)
  }

  const reset = () => {
    form.reset()
    setFile(null)
  }

  const { onSubmit } = useAddDishesSubmit({
    file,
    reset,
    setOpen,
    setError: form.setError
  })

  return (
    <AddDishDialogLayout open={open} onOpenChange={handleOpenChange}>
      <Form {...form}>
        <form
          noValidate
          className='grid auto-rows-max items-start gap-4 md:gap-8'
          id={ADD_DISH_FORM_ID}
          onSubmit={form.handleSubmit(onSubmit, (e) => {
            console.log(e)
          })}
          onReset={reset}
        >
          <div className='grid gap-4 py-4'>
            <FormField
              control={form.control}
              name='image'
              render={({ field }) => {
                const handleFileSelected = (file: File) => {
                  setFile(file)
                  field.onChange(getUrlImage(file.name))
                }

                return (
                  <FileInputAndPreview
                    previewAvatarFromFile={previewAvatarFromFile}
                    previewFallback={name || 'Avatar'}
                    handleFileSelected={handleFileSelected}
                  />
                )
              }}
            />

            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <div className='grid grid-cols-4 items-center justify-items-start gap-4'>
                    <Label htmlFor='name'>Tên món ăn</Label>
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
              name='price'
              render={({ field }) => (
                <FormItem>
                  <div className='grid grid-cols-4 items-center justify-items-start gap-4'>
                    <Label htmlFor='price'>Giá</Label>
                    <div className='col-span-3 w-full space-y-2'>
                      <Input
                        id='price'
                        className='w-full'
                        {...field}
                        type='number'
                      />
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <div className='grid grid-cols-4 items-center justify-items-start gap-4'>
                    <Label htmlFor='description'>Mô tả sản phẩm</Label>
                    <div className='col-span-3 w-full space-y-2'>
                      <Textarea
                        id='description'
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
                    <Label htmlFor='description'>Trạng thái</Label>
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
                          {DishStatusValues.map((status) => (
                            <SelectItem key={status} value={status}>
                              {getVietnameseDishStatus(status)}
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
    </AddDishDialogLayout>
  )
}
