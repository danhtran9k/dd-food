import { UseFormSetError } from 'react-hook-form'

import { toast } from '@core/app-shadcn/use-toast'
import { handleErrorApi } from '@core/hook-form-error.utils'

import { UpdateEmployeeAccountBodyType } from '@app/api-next/accounts/crud/accounts-crud.dto'
import { useUpdateAccountMutation } from '@app/api-next/accounts/crud/use-mutation-update-account.hook'
import { useMediaMutation } from '@app/api-next/media/use-media-mutation.hook'

type TUseForm = {
  id: number | undefined
  file: File | null
  reset: () => void
  setError: UseFormSetError<any>
  onSubmitSuccess?: () => void
}

export const useFormSubmit = ({
  id,
  file,
  reset,
  setError,
  onSubmitSuccess
}: TUseForm) => {
  const updateAccountMutation = useUpdateAccountMutation()
  const uploadMediaMutation = useMediaMutation()

  const onSubmit = async (values: UpdateEmployeeAccountBodyType) => {
    if (updateAccountMutation.isPending || !id) return

    let body = values
    try {
      if (file) {
        const formData = new FormData()
        formData.append('file', file)

        const uploadImageResult =
          await uploadMediaMutation.mutateAsync(formData)

        const imageUrl = uploadImageResult.payload.data
        body = {
          ...body,
          avatar: imageUrl
        }
      }

      const result = await updateAccountMutation.mutateAsync({ id, body })
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
