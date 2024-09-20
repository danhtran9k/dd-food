import { useMutation } from '@tanstack/react-query'

import { NEXT_API } from '@app/api-next/_core/api-endpoint'
import { TTokens } from '@app/api-next/_core/cookie.utils'
import { httpClient } from '@app/api-next/_core/http/http.client'

const mutateFnAuthToken = (body: TTokens) => {
  return httpClient('POST', NEXT_API.AUTH.AUTH_TOKEN.api(), {
    body
  })
}

export const useAuthToken = () => {
  return useMutation({
    mutationFn: mutateFnAuthToken
  })
}
