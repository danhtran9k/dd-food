import { useMutation } from '@tanstack/react-query'

import { SERVER_API_MEDIA } from '@app/api-next/_core/api-endpoint'
import { httpClient } from '@app/api-next/_core/http/http.client'

import { UploadImageResType } from '@app/api-next/media/media.dto'

const mutateFnMedia = (formData: FormData) =>
  httpClient<UploadImageResType>('POST', SERVER_API_MEDIA.upload.api, {
    body: formData
  })

export const useMediaMutation = () => {
  const mutate = useMutation({
    mutationFn: mutateFnMedia
  })

  return mutate
}
