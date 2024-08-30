'use client'

import { Button } from '@core/app-shadcn/button'
import { Card, CardContent, CardHeader, CardTitle } from '@core/app-shadcn/card'
import { Form, FormField, FormItem, FormMessage } from '@core/app-shadcn/form'
import { Input } from '@core/app-shadcn/input'
import { Label } from '@core/app-shadcn/label'

import { useFormChangePassword } from './use-form-change-password.hook'

export default function ChangePasswordForm() {
  const form = useFormChangePassword()

  return (
    <Form {...form}>
      <form
        noValidate
        className='grid auto-rows-max items-start gap-4 md:gap-8'
      >
        <Card className='overflow-hidden' x-chunk='dashboard-07-chunk-4'>
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
                <Button variant='outline' size='sm'>
                  Hủy
                </Button>
                <Button size='sm'>Lưu thông tin</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  )
}
