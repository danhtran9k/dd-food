import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  UpdateMeBody,
  UpdateMeBodyType
} from '@app/api-next/accounts/account-update.dto'

export const useFormUpdateProfile = () => {
  const form = useForm<UpdateMeBodyType>({
    resolver: zodResolver(UpdateMeBody),
    defaultValues: {
      name: '',
      avatar: ''
    }
  })
  return form
}
