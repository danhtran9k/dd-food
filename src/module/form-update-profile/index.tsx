'use client'

import { Upload } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@core/app-shadcn/avatar'
import { Button } from '@core/app-shadcn/button'
import { Card, CardContent, CardHeader, CardTitle } from '@core/app-shadcn/card'
import { Form, FormField, FormItem, FormMessage } from '@core/app-shadcn/form'
import { Input } from '@core/app-shadcn/input'
import { Label } from '@core/app-shadcn/label'
import envConfig from '@core/config'

import {
  BtnFileInput,
  useFilePreviewInput
} from '@module/app-common/btn-file-input'

import { useFormUpdateProfileSubmit } from './use-form-update-profile-submit.hook'
import { useFormUpdateProfile } from './use-form-update-profile.hook'

export default function UpdateProfileForm() {
  const {
    form,
    query: { refetch }
  } = useFormUpdateProfile()

  const name = form.watch('name')
  const avatar = form.watch('avatar')
  const {
    file,
    setFile,
    previewFileUrl: previewAvatar
  } = useFilePreviewInput(avatar)

  const { onSubmit } = useFormUpdateProfileSubmit({
    file,
    reload() {
      refetch()
    },
    setError: form.setError
  })

  const handleFormSubmit = form.handleSubmit(onSubmit, (e) => {
    console.log(e)
  })

  const reset = () => {
    form.reset()
    setFile(null)
  }

  return (
    <Form {...form}>
      <form
        noValidate
        className='grid auto-rows-max items-start gap-4 md:gap-8'
        onReset={reset}
        onSubmit={handleFormSubmit}
      >
        <Card x-chunk='dashboard-07-chunk-0'>
          <CardHeader>
            <CardTitle>Thông tin cá nhân</CardTitle>
          </CardHeader>

          <CardContent>
            <div className='grid gap-6'>
              <FormField
                control={form.control}
                name='avatar'
                render={({ field }) => {
                  const handleFileSelected = (file: File) => {
                    setFile(file)

                    // hàm xử lý ở ngoài thì ko tận dụng tối đa setup FormField + name setup sẵn
                    field.onChange(`${envConfig.NEXT_PUBLIC_URL}/${field.name}`)
                  }

                  return (
                    <FormItem>
                      <div className='flex gap-2 items-start justify-start'>
                        <Avatar className='aspect-square w-[100px] h-[100px] rounded-md object-cover'>
                          <AvatarImage src={previewAvatar} />
                          <AvatarFallback className='rounded-none'>
                            {name}
                          </AvatarFallback>
                        </Avatar>

                        <BtnFileInput
                          accept='image/*'
                          onFileSelected={handleFileSelected}
                          className='flex aspect-square w-[100px] items-center justify-center rounded-md border border-dashed'
                        >
                          <Upload className='h-4 w-4 text-muted-foreground' />
                          <span className='sr-only'>Upload</span>
                        </BtnFileInput>
                      </div>
                    </FormItem>
                  )
                }}
              />

              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <div className='grid gap-3'>
                      <Label htmlFor='name'>Tên</Label>
                      <Input
                        id='name'
                        type='text'
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
