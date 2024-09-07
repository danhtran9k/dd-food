import { UseFormSetError } from 'react-hook-form'

import { CreateEmployeeAccountBodyType } from '@app/api-next/accounts/crud/accounts-crud.dto'
import { useAddAccountMutation } from '@app/api-next/accounts/crud/use-mutation-add-account.hook'
import { useMediaMutation } from '@app/api-next/media/use-media-mutation.hook'

import { toast } from '@core/app-shadcn/use-toast'
import { handleErrorApi } from '@core/hook-form-error.utils'

type TUseForm = {
  reset: () => void
  file: File | null
  setOpen: (_TOpen: boolean) => void
  setError: UseFormSetError<any>
}

export const useFormSubmit = ({ file, reset, setOpen, setError }: TUseForm) => {
  const addAccountMutation = useAddAccountMutation()
  const uploadMediaMutation = useMediaMutation()

  const onSubmit = async (values: CreateEmployeeAccountBodyType) => {
    if (addAccountMutation.isPending) return

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
          avatar: imageUrl
        }
      }

      const result = await addAccountMutation.mutateAsync(body)
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
