import { useMutation, useQueryClient } from '@tanstack/react-query'

import { SERVER_API_TABLES } from '@app/api-next/_core/api-endpoint'
import { httpClient } from '@app/api-next/_core/http/http.client'

import { UpdateTableBodyType } from '@app/api-next/tables/mutate/tables-mutate.dto'
import { TableResType } from '@app/api-next/tables/tables.dto'

const updateTable = ({ id, body }: { id: number; body: UpdateTableBodyType }) =>
  httpClient<TableResType>('PUT', SERVER_API_TABLES.byId.api(id), {
    body
  })

export const useUpdateTableMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateTable,
    onSuccess: (_TV, _TVariables) => {
      queryClient.invalidateQueries({
        queryKey: SERVER_API_TABLES.key,
        exact: true
      })
      // queryClient.invalidateQueries({
      //   queryKey: SERVER_API_TABLES.byId.key(_TVariables.id)
      // })
    }
  })
}
