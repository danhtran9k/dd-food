import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  CreateEmployeeAccountBody,
  CreateEmployeeAccountBodyType
} from '@app/api-next/accounts/crud/accounts-crud.dto'

export const useFormEmployeeAdd = () => {
  const form = useForm<CreateEmployeeAccountBodyType>({
    resolver: zodResolver(CreateEmployeeAccountBody),
    defaultValues: {
      name: '',
      email: '',
      avatar: undefined,
      password: '',
      confirmPassword: ''
    }
  })

  return form
}
