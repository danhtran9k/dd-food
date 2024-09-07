'use client'

import { Upload } from 'lucide-react'
import { useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@core/app-shadcn/avatar'
import { Form, FormField, FormItem, FormMessage } from '@core/app-shadcn/form'
import { Input } from '@core/app-shadcn/input'
import { Label } from '@core/app-shadcn/label'

import {
  BtnFileInput,
  useFilePreviewInput
} from '@module/app-common/btn-file-input'

import { EmployeeFormLayout } from './employee-add-layout'
import { useFormEmployeeAdd } from './use-form-employee-add.hook'
import { useFormSubmit } from './use-form-submit.hook'

export function AddEmployee() {
  const [open, setOpen] = useState(false)

  const form = useFormEmployeeAdd()
  const avatar = form.watch('avatar')
  const name = form.watch('name')

  const {
    file,
    setFile,
    previewFileUrl: previewAvatarFromFile
  } = useFilePreviewInput(avatar)

  // Phải manual pass field name vào
  // const onFileSelected = (file: File) => {
  //   setFile(file)
  //   form.setValue('avatar', 'http://localhost:3000/' + file.name)
  // }

  const reset = () => {
    form.reset()
    setFile(null)
  }

  const { onSubmit } = useFormSubmit({
    file,
    reset,
    setOpen,
    setError: form.setError
  })

  return (
    <EmployeeFormLayout open={open} onOpenChange={setOpen}>
      <Form {...form}>
        <form
          noValidate
          className='grid auto-rows-max items-start gap-4 md:gap-8'
          id='add-employee-form'
          onSubmit={form.handleSubmit(onSubmit, (e) => {
            console.log(e)
          })}
          onReset={reset}
        >
          <div className='grid gap-4 py-4'>
            <FormField
              control={form.control}
              name='avatar'
              render={({ field }) => (
                <FormItem>
                  <div className='flex gap-2 items-start justify-start'>
                    <Avatar className='aspect-square w-[100px] h-[100px] rounded-md object-cover'>
                      <AvatarImage src={previewAvatarFromFile} />
                      <AvatarFallback className='rounded-none'>
                        {name || 'Avatar'}
                      </AvatarFallback>
                    </Avatar>

                    <BtnFileInput
                      accept='image/*'
                      onFileSelected={(file) => {
                        // Nếu extract ra hàm riêng phải manual truyền field name vào
                        setFile(file)
                        field.onChange('http://localhost:3000/' + file.name)
                      }}
                      className='flex aspect-square w-[100px] items-center justify-center rounded-md border border-dashed'
                    >
                      <Upload className='h-4 w-4 text-muted-foreground' />
                      <span className='sr-only'>Upload</span>
                    </BtnFileInput>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <div className='grid grid-cols-4 items-center justify-items-start gap-4'>
                    <Label htmlFor='name'>Tên</Label>
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
              name='email'
              render={({ field }) => (
                <FormItem>
                  <div className='grid grid-cols-4 items-center justify-items-start gap-4'>
                    <Label htmlFor='email'>Email</Label>
                    <div className='col-span-3 w-full space-y-2'>
                      <Input id='email' className='w-full' {...field} />
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <div className='grid grid-cols-4 items-center justify-items-start gap-4'>
                    <Label htmlFor='password'>Mật khẩu</Label>
                    <div className='col-span-3 w-full space-y-2'>
                      <Input
                        id='password'
                        className='w-full'
                        type='password'
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
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <div className='grid grid-cols-4 items-center justify-items-start gap-4'>
                    <Label htmlFor='confirmPassword'>Xác nhận mật khẩu</Label>
                    <div className='col-span-3 w-full space-y-2'>
                      <Input
                        id='confirmPassword'
                        className='w-full'
                        type='password'
                        {...field}
                      />
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </EmployeeFormLayout>
  )
}
