'use client'

import { Upload } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@core/app-shadcn/avatar'
import { Form, FormField, FormItem, FormMessage } from '@core/app-shadcn/form'
import { Input } from '@core/app-shadcn/input'
import { Label } from '@core/app-shadcn/label'
import { Switch } from '@core/app-shadcn/switch'

import {
  BtnFileInput,
  useFilePreviewInput
} from '@module/app-common/btn-file-input'

import {
  EDIT_EMPLOYEE_FORM_ID,
  EmployeeEditLayout
} from './employee-edit-layout'
import { useFormEmployeeEdit } from './use-form-employee-edit.hook'
import { useFormSubmit } from './use-form-submit.hook'

type EditEmployeeProps = {
  onSubmitSuccess?: () => void
}

export function EditEmployee({ onSubmitSuccess }: EditEmployeeProps) {
  const { form, id, setId } = useFormEmployeeEdit()

  const [avatar, name, changePassword] = form.watch([
    'avatar',
    'name',
    'changePassword'
  ])

  const {
    file,
    setFile,
    previewFileUrl: previewAvatarFromFile
  } = useFilePreviewInput(avatar)

  const reset = () => {
    form.reset()
    setFile(null)
    setId(undefined)
  }

  const { onSubmit } = useFormSubmit({
    id,
    file,
    reset,
    setError: form.setError,
    onSubmitSuccess
  })

  const onOpenChange = (value: boolean) => {
    if (!value) {
      reset()
    }
  }

  return (
    <EmployeeEditLayout open={Boolean(id)} onOpenChange={onOpenChange}>
      <Form {...form}>
        <form
          noValidate
          className='grid auto-rows-max items-start gap-4 md:gap-8'
          id={EDIT_EMPLOYEE_FORM_ID}
          onSubmit={form.handleSubmit(onSubmit, console.log)}
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

            {(['name', 'email'] as const).map((fieldName) => (
              <FormField
                key={fieldName}
                control={form.control}
                name={fieldName}
                render={({ field }) => (
                  <FormItem>
                    <div className='grid grid-cols-4 items-center justify-items-start gap-4'>
                      <Label htmlFor={fieldName}>
                        {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                      </Label>
                      <div className='col-span-3 w-full space-y-2'>
                        <Input id={fieldName} className='w-full' {...field} />
                        <FormMessage />
                      </div>
                    </div>
                  </FormItem>
                )}
              />
            ))}

            <FormField
              control={form.control}
              name='changePassword'
              render={({ field }) => (
                <FormItem>
                  <div className='grid grid-cols-4 items-center justify-items-start gap-4'>
                    <Label htmlFor='changePassword'>Đổi mật khẩu</Label>
                    <div className='col-span-3 w-full space-y-2'>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />

            {changePassword &&
              (['password', 'confirmPassword'] as const).map((fieldName) => (
                <FormField
                  key={fieldName}
                  control={form.control}
                  name={fieldName}
                  render={({ field }) => (
                    <FormItem>
                      <div className='grid grid-cols-4 items-center justify-items-start gap-4'>
                        <Label htmlFor={fieldName}>
                          {fieldName === 'confirmPassword'
                            ? 'Xác nhận mật khẩu mới'
                            : 'Mật khẩu mới'}
                        </Label>
                        <div className='col-span-3 w-full space-y-2'>
                          <Input
                            id={fieldName}
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
              ))}
          </div>
        </form>
      </Form>
    </EmployeeEditLayout>
  )
}
