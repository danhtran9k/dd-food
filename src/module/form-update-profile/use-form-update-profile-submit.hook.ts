import { UseFormSetError } from 'react-hook-form'

import { toast } from '@core/app-shadcn/use-toast'
import { handleErrorApi } from '@core/hook-form-error.utils'

import { UpdateMeBodyType } from '@app/api-next/accounts/account-update.dto'
import { useUpdateMeMutation } from '@app/api-next/accounts/use-account-mutation.hook'
import { useMediaMutation } from '@app/api-next/media/use-media-mutation.hook'

type TUseForm = {
  reload: () => void
  file: File | null
  setError: UseFormSetError<any>
}

export const useFormUpdateProfileSubmit = ({
  file,
  reload,
  setError
}: TUseForm) => {
  const mutateMe = useUpdateMeMutation()
  const mutateMedia = useMediaMutation()

  const onSubmit = async (formValues: UpdateMeBodyType) => {
    if (mutateMe.isPending) return

    try {
      // Upload image trước -> success rồi mới update profile
      // Vì 2 api riêng -> logic này hơi dở
      // Đúng ra BE nên cấp api chung để xứ lý, hoặc có thể do limit thư viện ở BE khó quản lý
      // FE phải tự handle-fake-transactions
      let body = formValues
      if (file) {
        const formData = new FormData()
        formData.append('file', file)

        const uploadImageResult = await mutateMedia.mutateAsync(formData)
        const imageUrl = uploadImageResult.payload.data
        body = {
          ...formValues,
          avatar: imageUrl
        }
      }

      const result = await mutateMe.mutateAsync(body)
      toast({
        description: result.payload.message
      })
      reload()
    } catch (error) {
      handleErrorApi({
        error,
        setError
      })
    }
  }

  return { onSubmit }
}
