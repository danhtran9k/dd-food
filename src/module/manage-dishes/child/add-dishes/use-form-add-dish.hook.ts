import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { DishStatus } from '@app/api-next/dishes/dishes.dto'
import {
  CreateDishBody,
  CreateDishBodyType
} from '@app/api-next/dishes/mutate/mutate-dishes.dto'

export const useFormAddDish = () => {
  const form = useForm<CreateDishBodyType>({
    resolver: zodResolver(CreateDishBody),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      image: undefined,
      status: DishStatus.Unavailable
    }
  })

  return form
}
