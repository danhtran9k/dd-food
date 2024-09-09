import { UseFormSetError } from 'react-hook-form'

import { toast } from '@core/app-shadcn/use-toast'
import { handleErrorApi } from '@core/hook-form-error.utils'

import { CreateTableBodyType } from '@app/api-next/tables/mutate/tables-mutate.dto'
import { useAddTableMutation } from '@app/api-next/tables/mutate/use-mutation-add-table.hook'

type TUseAddTableSubmit = {
  reset: () => void
  setOpen: (_TOpen: boolean) => void
  setError: UseFormSetError<any>
}

export const useAddTableSubmit = ({
  reset,
  setOpen,
  setError
}: TUseAddTableSubmit) => {
  const addTableMutation = useAddTableMutation()

  const onSubmit = async (values: CreateTableBodyType) => {
    if (addTableMutation.isPending) return

    try {
      const result = await addTableMutation.mutateAsync(values)
      toast({
        description: result.payload.message
      })

      reset()
      setOpen(false)
    } catch (error) {
      handleErrorApi({
        error,
        setError
      })
    }
  }

  return { onSubmit }
}
