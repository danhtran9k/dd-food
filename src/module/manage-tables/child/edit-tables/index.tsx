'use client'

import { Link } from '@core/app-i18n/routing'
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
import { getTableLink } from '@core/path.const'

import {
  TableStatusValues,
  getVietnameseTableStatus
} from '@app/api-next/tables/tables.dto'

import { QRCodeTable } from '../qr-code-table'

import {
  EDIT_TABLE_FORM_ID,
  EditTablesDialogLayout
} from './edit-tables-dialog-layout'
import { useEditTablesSubmit } from './use-edit-tables-submit.hook'
import { useFormEditTables } from './use-form-edit-tables.hook'

type EditTablesProps = {
  onSubmitSuccess?: () => void
}

const FORM_ITEM_DIV_CLASSNAME =
  'grid grid-cols-4 items-center justify-items-start gap-4'
const FORM_ITEM_CHILD_CLASSNAME = 'col-span-3 w-full space-y-2'

export function EditTables({ onSubmitSuccess }: EditTablesProps) {
  const { form, id, setId, data } = useFormEditTables()

  const reset = () => {
    form.reset()
    setId(undefined)
  }

  const { onSubmit } = useEditTablesSubmit({
    id,
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
    <EditTablesDialogLayout open={Boolean(id)} onOpenChange={onOpenChange}>
      <Form {...form}>
        <form
          noValidate
          className='grid auto-rows-max items-start gap-4 md:gap-8'
          onSubmit={form.handleSubmit(onSubmit, console.log)}
          id={EDIT_TABLE_FORM_ID}
        >
          <div className='grid gap-4 py-4'>
            <div className={FORM_ITEM_DIV_CLASSNAME}>
              <Label htmlFor='name'>Số hiệu bàn</Label>
              <div className={FORM_ITEM_CHILD_CLASSNAME}>
                <Input
                  id='number'
                  type='number'
                  className='w-full'
                  value={data?.number ?? 0}
                  readOnly
                />
                <FormMessage />
              </div>
            </div>

            <FormField
              control={form.control}
              name='capacity'
              render={({ field }) => (
                <FormItem>
                  <div className={FORM_ITEM_DIV_CLASSNAME}>
                    <Label htmlFor='price'>Sức chứa (người)</Label>
                    <div className={FORM_ITEM_CHILD_CLASSNAME}>
                      <Input
                        id='capacity'
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
              name='status'
              render={({ field }) => (
                <FormItem>
                  <div className={FORM_ITEM_DIV_CLASSNAME}>
                    <Label htmlFor='description'>Trạng thái</Label>
                    <div className={FORM_ITEM_CHILD_CLASSNAME}>
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

            <FormField
              control={form.control}
              name='changeToken'
              render={({ field }) => (
                <FormItem>
                  <div className={FORM_ITEM_DIV_CLASSNAME}>
                    <Label htmlFor='price'>Đổi QR Code</Label>
                    <div className={FORM_ITEM_CHILD_CLASSNAME}>
                      <div className='flex items-center space-x-2'>
                        <Switch
                          id='changeToken'
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </div>
                    </div>

                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <div className={FORM_ITEM_DIV_CLASSNAME}>
              <Label>QR Code</Label>
              <div className={FORM_ITEM_CHILD_CLASSNAME}>
                {data && (
                  <QRCodeTable token={data.token} tableNumber={data.number} />
                )}
              </div>
            </div>

            <div className={FORM_ITEM_DIV_CLASSNAME}>
              <Label>URL gọi món</Label>
              <div className={FORM_ITEM_CHILD_CLASSNAME}>
                {data && (
                  <Link
                    href={getTableLink({
                      token: data.token,
                      tableNumber: data.number
                    })}
                    target='_blank'
                    className='break-all text-gray-500'
                  >
                    {getTableLink({
                      token: data.token,
                      tableNumber: data.number
                    })}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </form>
      </Form>
    </EditTablesDialogLayout>
  )
}
