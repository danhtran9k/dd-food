'use client'

import { Button } from '@core/app-shadcn/button'
import { Card, CardContent, CardHeader, CardTitle } from '@core/app-shadcn/card'
import { Form, FormField, FormItem, FormMessage } from '@core/app-shadcn/form'
import { Input } from '@core/app-shadcn/input'
import { Label } from '@core/app-shadcn/label'
import { handleErrorApi } from '@core/hook-form-error.utils'

import { ChangePasswordBodyType } from '@app/api-next/accounts/account-update.dto'
import { useMutatePassword } from '@app/api-next/accounts/password/use-mutate-password.hook'

import { useFormChangePassword } from './use-form-change-password.hook'

export function ChangePasswordForm() {
  const form = useFormChangePassword()
  const { mutate, isPending } = useMutatePassword()

  const reset = () => {
    form.reset()
  }

  const onSubmit = (data: ChangePasswordBodyType) => {
    if (isPending) return
    mutate(data, {
      onError: (error) => {
        handleErrorApi({
          error,
          setError: form.setError
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form
        noValidate
        className='grid auto-rows-max items-start gap-4 md:gap-8'
        onSubmit={form.handleSubmit(onSubmit)}
        onReset={reset}
      >
        <Card className='overflow-hidden'>
          <CardHeader>
            <CardTitle>Đổi mật khẩu</CardTitle>
          </CardHeader>

          <CardContent>
            <div className='grid gap-6'>
              <FormField
                control={form.control}
                name='oldPassword'
                render={({ field }) => (
                  <FormItem>
                    <div className='grid gap-3'>
                      <Label htmlFor='oldPassword'>Mật khẩu cũ</Label>
                      <Input
                        autoComplete='current-password'
                        id='oldPassword'
                        type='password'
                        className='w-full'
                        {...field}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <div className='grid gap-3'>
                      <Label htmlFor='password'>Mật khẩu mới</Label>
                      <Input
                        autoComplete='new-password'
                        id='password'
                        type='password'
                        className='w-full'
                        {...field}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <div className='grid gap-3'>
                      <Label htmlFor='confirmPassword'>
                        Nhập lại mật khẩu mới
                      </Label>
                      <Input
                        autoComplete='new-password'
                        id='confirmPassword'
                        type='password'
                        className='w-full'
                        {...field}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <div className=' items-center gap-2 md:ml-auto flex'>
                <Button variant='outline' size='sm' type='reset'>
                  Hủy
                </Button>
                <Button size='sm' type='submit'>
                  Lưu thông tin
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  )
}
