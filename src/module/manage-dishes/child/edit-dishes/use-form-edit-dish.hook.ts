import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { DishStatus } from '@app/api-next/dishes/dishes.dto'
import {
  UpdateDishBody,
  UpdateDishBodyType
} from '@app/api-next/dishes/mutate/mutate-dishes.dto'
import { useDishById } from '@app/api-next/dishes/use-dishes-by-id.hook'

import { useManageDishesContext } from '@module/manage-dishes'

export const useFormEditDish = () => {
  const { dishIdEdit: id, setDishIdEdit: setId } = useManageDishesContext()

  const { data } = useDishById(id as number, Boolean(id))

  const form = useForm<UpdateDishBodyType>({
    resolver: zodResolver(UpdateDishBody),
    defaultValues: {
      name: '',
      price: 0,
      description: '',
      image: '',
      status: DishStatus.Unavailable
    }
  })

  useEffect(() => {
    if (data) {
      const { name, price, description, image, status } = data.payload.data
      form.reset({
        name,
        price,
        description,
        image: image ?? undefined,
        status
      })
    }
  }, [data, form])

  return { form, setId, id }
}
