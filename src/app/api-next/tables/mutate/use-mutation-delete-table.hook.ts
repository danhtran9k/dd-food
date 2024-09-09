import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from '@core/app-shadcn/use-toast'
import { handleErrorApi } from '@core/hook-form-error.utils'

import { SERVER_API_TABLES } from '@app/api-next/_core/api-endpoint'
import { httpClient } from '@app/api-next/_core/http/http.client'

import { TableResType } from '@app/api-next/tables/tables.dto'

const deleteTable = (id: number) =>
  httpClient<TableResType>('DELETE', SERVER_API_TABLES.byId.api(id))

export function useMutationDeleteTable() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteTable,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: SERVER_API_TABLES.key,
        exact: true
      })

      toast({
        title: data.payload.message || 'Table deleted successfully'
      })
    },
    onError: (error) => {
      handleErrorApi({ error })
    }
  })
}