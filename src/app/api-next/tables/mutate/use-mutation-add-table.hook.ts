import { useMutation, useQueryClient } from '@tanstack/react-query'

import { SERVER_API_TABLES } from '@app/api-next/_core/api-endpoint'
import { httpClient } from '@app/api-next/_core/http/http.client'

import { CreateTableBodyType } from '@app/api-next/tables/mutate/tables-mutate.dto'
import { TableResType } from '@app/api-next/tables/tables.dto'

const mutateFnAddTable = (body: CreateTableBodyType) =>
  httpClient<TableResType>('POST', SERVER_API_TABLES.api, {
    body
  })

export const useAddTableMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: mutateFnAddTable,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: SERVER_API_TABLES.key
      })
    }
  })
}
