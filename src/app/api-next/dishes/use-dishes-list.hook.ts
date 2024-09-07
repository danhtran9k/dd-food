import { useQuery } from '@tanstack/react-query'

import { SERVER_API_DISHES } from '@app/api-next/_core/api-endpoint'
import { httpClient } from '@app/api-next/_core/http/http.client'

import { DishListResType } from '@app/api-next/dishes/dishes.dto'

type TQueryFnDishesList = Awaited<ReturnType<typeof queryFnDishesList>>

const queryFnDishesList = () =>
  httpClient<DishListResType>('GET', SERVER_API_DISHES.api)

export const useDishesList = <TData = TQueryFnDishesList>(
  select?: (_TData: TQueryFnDishesList) => TData
) => {
  return useQuery({
    queryKey: SERVER_API_DISHES.key,
    queryFn: queryFnDishesList,
    select: select
  })
}
