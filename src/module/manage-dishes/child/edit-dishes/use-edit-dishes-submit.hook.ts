import { UseFormSetError } from 'react-hook-form'

import { toast } from '@core/app-shadcn/use-toast'
import { handleErrorApi } from '@core/hook-form-error.utils'
import { encodeTag } from '@core/utils'

import { SERVER_API_DISHES } from '@app/api-next/_core/api-endpoint'

import { UpdateDishBodyType } from '@app/api-next/dishes/mutate/mutate-dishes.dto'
import { useUpdateDishMutation } from '@app/api-next/dishes/mutate/use-mutation-update-dish.hook'
import { useMediaMutation } from '@app/api-next/media/use-media-mutation.hook'
import { revalidateApiClient } from '@app/api-next/revalidate/revalidate.client'

type TUseEditDishesSubmit = {
  id: number | undefined
  file: File | null
  reset: () => void
  setError: UseFormSetError<any>
  onSubmitSuccess?: () => void
}

export const useEditDishesSubmit = ({
  id,
  file,
  reset,
  setError,
  onSubmitSuccess
}: TUseEditDishesSubmit) => {
  const updateDishMutation = useUpdateDishMutation()
  const uploadMediaMutation = useMediaMutation()

  const onSubmit = async (values: UpdateDishBodyType) => {
    if (updateDishMutation.isPending || !id) return

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

      const result = await updateDishMutation.mutateAsync({ id, body })
      await revalidateApiClient(encodeTag(SERVER_API_DISHES.nextTags))

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
