import { UseFormSetError } from 'react-hook-form'

import { toast } from '@core/app-shadcn/use-toast'
import { handleErrorApi } from '@core/hook-form-error.utils'

import { CreateDishBodyType } from '@app/api-next/dishes/mutate/mutate-dishes.dto'
import { useAddDishMutation } from '@app/api-next/dishes/mutate/use-mutation-add-dish.hook'
import { useMediaMutation } from '@app/api-next/media/use-media-mutation.hook'

type TUseAddDishesSubmit = {
  reset: () => void
  file: File | null
  setOpen: (_TOpen: boolean) => void
  setError: UseFormSetError<any>
}

export const useAddDishesSubmit = ({
  file,
  reset,
  setOpen,
  setError
}: TUseAddDishesSubmit) => {
  const addDishMutation = useAddDishMutation()
  const uploadMediaMutation = useMediaMutation()

  const onSubmit = async (values: CreateDishBodyType) => {
    if (addDishMutation.isPending) return

    let body = values

    try {
      if (file) {
        const formData = new FormData()
        formData.append('file', file)

        const uploadImageResult =
          await uploadMediaMutation.mutateAsync(formData)

        const imageUrl = uploadImageResult.payload.data
        body = {
          ...values,
          image: imageUrl
        }
      }

      const result = await addDishMutation.mutateAsync(body)
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
