import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import {
  UpdateMeBody,
  UpdateMeBodyType
} from '@app/api-next/accounts/account-update.dto'
import { useAccountMe } from '@app/api-next/accounts/use-account.hook'

export const useFormUpdateProfile = () => {
  const form = useForm<UpdateMeBodyType>({
    resolver: zodResolver(UpdateMeBody),
    defaultValues: {
      name: '',
      avatar: undefined
    }
  })

  const query = useAccountMe()
  const { data } = query

  useEffect(() => {
    if (data) {
      const { name, avatar } = data.payload.data
      form.reset({
        name,
        avatar: avatar ?? undefined
      })
    }
  }, [form, data])

  // query use to get other field, if not need then on
  return { form, query }
}
