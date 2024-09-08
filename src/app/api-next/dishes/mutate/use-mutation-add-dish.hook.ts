import { useMutation, useQueryClient } from '@tanstack/react-query'

import { SERVER_API_DISHES } from '@app/api-next/_core/api-endpoint'
import { httpClient } from '@app/api-next/_core/http/http.client'

import { DishResType } from '@app/api-next/dishes/dishes.dto'
import { CreateDishBodyType } from '@app/api-next/dishes/mutate/mutate-dishes.dto'

const mutateFnAddDish = (body: CreateDishBodyType) =>
  httpClient<DishResType>('POST', SERVER_API_DISHES.api, {
    body
  })

export const useAddDishMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: mutateFnAddDish,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: SERVER_API_DISHES.key
      })
    }
  })
}
