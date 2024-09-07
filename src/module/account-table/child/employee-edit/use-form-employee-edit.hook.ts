import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import {
  UpdateEmployeeAccountBody,
  UpdateEmployeeAccountBodyType
} from '@app/api-next/accounts/crud/accounts-crud.dto'
import { useGetAccountById } from '@app/api-next/accounts/crud/use-get-account-by-id.hook'

import { useAccountTableContext } from '@module/account-table'

export const useFormEmployeeEdit = () => {
  const { employeeIdEdit: id, setEmployeeIdEdit: setId } =
    useAccountTableContext()

  const { data } = useGetAccountById({
    id: id as number,
    enabled: Boolean(id),
    select: (data) => data.payload.data
  })

  const form = useForm<UpdateEmployeeAccountBodyType>({
    resolver: zodResolver(UpdateEmployeeAccountBody),
    defaultValues: {
      name: '',
      email: '',
      avatar: undefined,
      password: undefined,
      confirmPassword: undefined,
      changePassword: false
    }
  })

  useEffect(() => {
    if (data) {
      const { name, avatar, email } = data
      form.reset({
        name,
        avatar: avatar ?? undefined,
        email,
        changePassword: form.getValues('changePassword'),
        password: form.getValues('password'),
        confirmPassword: form.getValues('confirmPassword')
      })
    }
  }, [data, form])

  return { form, setId, id }
}
