'use client'

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
import { Switch } from '@core/app-shadcn/switch'
import { getUrlImage } from '@core/utils'

import { Role, RoleValues } from '@app/api-next/_core/api-type.const'

import {
  FileInputAndPreview,
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
              name='role'
              render={({ field }) => (
                <FormItem>
                  <div className='grid grid-cols-4 items-center justify-items-start gap-4'>
                    <Label htmlFor='role'>Chức vụ</Label>
                    <div className='col-span-3 w-full space-y-2'>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Chọn chức vụ' />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {RoleValues.map((role) =>
                            // ko cho phép set user ngược lại thành guest -> sai logic business
                            role === Role.Guest ? null : (
                              <SelectItem key={role} value={role}>
                                {role}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />

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
                            autoComplete='on'
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
