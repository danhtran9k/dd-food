import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from '@core/app-shadcn/use-toast'
import { handleErrorApi } from '@core/hook-form-error.utils'

import { SERVER_API_DISHES } from '@app/api-next/_core/api-endpoint'
import { httpClient } from '@app/api-next/_core/http/http.client'

import { DishResType } from '@app/api-next/dishes/dishes.dto'

const deleteDish = (id: number) =>
  httpClient<DishResType>('DELETE', SERVER_API_DISHES.byId.api(id))

export function useMutationDeleteDish() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteDish,
    onSuccess: (data) => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({
        queryKey: SERVER_API_DISHES.key,
        exact: true
      })

      // Show success toast
      toast({
        title: data.payload.message || 'Dish deleted successfully'
      })
    },
    onError: (error) => {
      handleErrorApi({ error })
    }
  })
}
