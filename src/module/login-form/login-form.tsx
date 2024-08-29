'use client'

import { LoginBodyType } from '@app/api-next/auth/login/login.type'
import { useLoginMutation } from '@app/api-next/auth/login/use-login-mutation.hook'

import { Button } from '@core/app-shadcn/button'
import { Card, CardContent } from '@core/app-shadcn/card'
import { Form, FormField, FormItem, FormMessage } from '@core/app-shadcn/form'
import { Input } from '@core/app-shadcn/input'
import { Label } from '@core/app-shadcn/label'
import { toast } from '@core/app-shadcn/use-toast'
import { handleErrorApi } from '@core/hook-form-error.utils'

import { LoginCardHeader } from './login-card-header'
import { useLoginForm } from './use-login-form.hook'

export function LoginForm() {
  const form = useLoginForm()
  const { isPending, mutate } = useLoginMutation()

  const onSubmit = async (data: LoginBodyType) => {
    // Khi nhấn submit thì React hook form sẽ validate cái form bằng zod schema ở client trước
    // Nếu không pass qua vòng này thì sẽ không gọi api
    if (isPending) return

    // Có thể dùng style mutateAsync nhưng cảm thấy ko cần
    mutate(data, {
      // TODO: Check xem thử có nên setup mutation cache global cho mọi mutate ko
      onSuccess: (result) => {
        toast({
          description: result.payload.message
        })
      },
      // TODO: Khá khó refactor vấn đề setError ở đây
      // ko dùng useFormContext được vì shadcn nhà form vào Jsx
      // Ngoài ra component cũng đứng ngoài form
      onError: (error: any) => {
        handleErrorApi({
          error,
          setError: form.setError
        })
      }
    })
  }

  const handleLogin = form.handleSubmit(onSubmit, console.log)

  return (
    <Card className='mx-auto max-w-sm'>
      <LoginCardHeader />

      <CardContent>
        <Form {...form}>
          <form
            className='space-y-2 max-w-[600px] flex-shrink-0 w-full'
            noValidate
            onSubmit={handleLogin}
          >
            <div className='grid gap-4'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <div className='grid gap-2'>
                      <Label htmlFor='email'>Email</Label>
                      <Input
                        id='email'
                        type='email'
                        placeholder='m@example.com'
                        required
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
                    <div className='grid gap-2'>
                      <div className='flex items-center'>
                        <Label htmlFor='password'>Password</Label>
                      </div>
                      <Input
                        id='password'
                        type='password'
                        required
                        {...field}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Button type='submit' className='w-full'>
                Đăng nhập
              </Button>
              <Button variant='outline' className='w-full' type='button'>
                Đăng nhập bằng Google
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
