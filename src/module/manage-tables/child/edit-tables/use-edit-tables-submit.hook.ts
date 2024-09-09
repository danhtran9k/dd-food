import { UseFormSetError } from 'react-hook-form'

import { toast } from '@core/app-shadcn/use-toast'
import { handleErrorApi } from '@core/hook-form-error.utils'

import { UpdateTableBodyType } from '@app/api-next/tables/mutate/tables-mutate.dto'
import { useUpdateTableMutation } from '@app/api-next/tables/mutate/use-mutation-update-table.hook'

type TUseEditDishesSubmit = {
  id: number | undefined
  reset: () => void
  setError: UseFormSetError<any>
  onSubmitSuccess?: () => void
}

export const useEditTablesSubmit = ({
  id,
  reset,
  setError,
  onSubmitSuccess
}: TUseEditDishesSubmit) => {
  const updateDishMutation = useUpdateTableMutation()

  const onSubmit = async (values: UpdateTableBodyType) => {
    if (updateDishMutation.isPending || !id) return

    let body = { id, ...values }

    try {
      const result = await updateDishMutation.mutateAsync({ id, body })
      toast({
        description: result.payload.message
      })

      reset()
      onSubmitSuccess && onSubmitSuccess()
    } catch (error) {
      handleErrorApi({
        error,
        setError
      })
    }
  }

  return { onSubmit }
}
