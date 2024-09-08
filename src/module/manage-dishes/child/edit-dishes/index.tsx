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

import {
  EDIT_DISH_FORM_ID,
  EditDishDialogLayout
} from './edit-dish-dialog-layout'
import { useEditDishesSubmit } from './use-edit-dishes-submit.hook'
import { useFormEditDish } from './use-form-edit-dish.hook'

type EditDishesProps = {
  onSubmitSuccess?: () => void
}

const FORM_ITEM_DIV_CLASSNAME =
  'grid grid-cols-4 items-center justify-items-start gap-4'
const FORM_ITEM_CHILD_CLASSNAME = 'col-span-3 w-full space-y-2'

export function EditDishes({ onSubmitSuccess }: EditDishesProps) {
  const { form, id, setId } = useFormEditDish()

  const [image, name] = form.watch(['image', 'name'])

  const {
    file,
    setFile,
    previewFileUrl: previewImageFromFile
  } = useFilePreviewInput(image)

  const reset = () => {
    form.reset()
    setFile(null)
    setId(undefined)
  }

  const { onSubmit } = useEditDishesSubmit({
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
    <EditDishDialogLayout open={Boolean(id)} onOpenChange={onOpenChange}>
      <Form {...form}>
        <form
          noValidate
          className='grid auto-rows-max items-start gap-4 md:gap-8'
          id={EDIT_DISH_FORM_ID}
          onSubmit={form.handleSubmit(onSubmit, console.log)}
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
                    previewAvatarFromFile={previewImageFromFile}
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
                  <div className={FORM_ITEM_DIV_CLASSNAME}>
                    <Label htmlFor='name'>Tên món ăn</Label>
                    <div className={FORM_ITEM_CHILD_CLASSNAME}>
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
                  <div className={FORM_ITEM_DIV_CLASSNAME}>
                    <Label htmlFor='price'>Giá</Label>
                    <div className={FORM_ITEM_CHILD_CLASSNAME}>
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
                  <div className={FORM_ITEM_DIV_CLASSNAME}>
                    <Label htmlFor='description'>Mô tả sản phẩm</Label>
                    <div className={FORM_ITEM_CHILD_CLASSNAME}>
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
                  <div className={FORM_ITEM_DIV_CLASSNAME}>
                    <Label htmlFor='status'>Trạng thái</Label>
                    <div className={FORM_ITEM_CHILD_CLASSNAME}>
                      {/* https://ui.shadcn.com/docs/components/select */}
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
    </EditDishDialogLayout>
  )
}
