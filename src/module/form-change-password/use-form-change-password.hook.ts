import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  ChangePasswordBody,
  ChangePasswordBodyType
} from '@app/api-next/accounts/account-update.dto'

export const useFormChangePassword = () => {
  const form = useForm<ChangePasswordBodyType>({
    resolver: zodResolver(ChangePasswordBody),
    defaultValues: {
      oldPassword: '',
      password: '',
      confirmPassword: ''
    }
  })
  return form
}
