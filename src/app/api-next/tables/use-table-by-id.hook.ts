import { useQuery } from '@tanstack/react-query'

import { SERVER_API_TABLES } from '@app/api-next/_core/api-endpoint'
import { httpClient } from '@app/api-next/_core/http/http.client'

import { TableResType } from '@app/api-next/tables/tables.dto'

const queryFnTableById = (id: number) =>
  httpClient<TableResType>('GET', SERVER_API_TABLES.byId.api(id))

export const useTableById = (id: number, enabled = true) => {
  return useQuery({
    queryKey: SERVER_API_TABLES.byId.key(id),
    queryFn: () => queryFnTableById(id),
    enabled: enabled && !!id
  })
}