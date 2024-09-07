import { useQuery } from '@tanstack/react-query'

import { SERVER_API_DISHES } from '@app/api-next/_core/api-endpoint'
import { httpClient } from '@app/api-next/_core/http/http.client'

import { DishResType } from '@app/api-next/dishes/dishes.dto'

const queryFnDishById = (id: number) =>
  httpClient<DishResType>('GET', SERVER_API_DISHES.byId.api(id))

export const useDishById = (id: number, enabled = true) => {
  return useQuery({
    queryKey: SERVER_API_DISHES.byId.key(id),
    queryFn: () => queryFnDishById(id),
    enabled: enabled && !!id
  })
}
