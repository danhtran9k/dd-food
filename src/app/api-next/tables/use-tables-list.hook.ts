import { useQuery } from '@tanstack/react-query'

import { SERVER_API_TABLES } from '@app/api-next/_core/api-endpoint'
import { httpClient } from '@app/api-next/_core/http/http.client'

import { TableListResType } from '@app/api-next/tables/tables.dto'

type TQueryFnTablesList = Awaited<ReturnType<typeof queryFnTablesList>>

const queryFnTablesList = () =>
  httpClient<TableListResType>('GET', SERVER_API_TABLES.api)

export const useTablesList = <TData = TQueryFnTablesList>(
  select?: (_TData: TQueryFnTablesList) => TData
) => {
  return useQuery({
    queryKey: SERVER_API_TABLES.key,
    queryFn: queryFnTablesList,
    select: select
  })
}