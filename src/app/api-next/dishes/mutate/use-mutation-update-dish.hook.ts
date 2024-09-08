import { useMutation, useQueryClient } from '@tanstack/react-query'

import { SERVER_API_DISHES } from '@app/api-next/_core/api-endpoint'
import { httpClient } from '@app/api-next/_core/http/http.client'

import { DishResType } from '@app/api-next/dishes/dishes.dto'
import { UpdateDishBodyType } from '@app/api-next/dishes/mutate/mutate-dishes.dto'

const updateDish = ({
  id,
  body
}: {
  id: number
  body: UpdateDishBodyType
}) =>
  httpClient<DishResType>('PUT', SERVER_API_DISHES.byId.api(id), {
    body
  })

export const useUpdateDishMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateDish,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: SERVER_API_DISHES.key
      })
      queryClient.invalidateQueries({
        queryKey: SERVER_API_DISHES.byId.key(variables.id)
      })
    }
  })
}