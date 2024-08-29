import { useMutation } from '@tanstack/react-query'

import { NEXT_API } from '@app/api-next/_core/api-endpoint'
import { httpClient } from '@app/api-next/_core/http/http.client'

import { LoginResType } from '@app/api-next/auth/auth.dto'
import { LoginBodyType } from '@app/api-next/auth/login/login.type'

const loginMutateFn = (body: LoginBodyType) =>
  httpClient<LoginResType>('POST', NEXT_API.AUTH.LOGIN.api(), { body })

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: loginMutateFn
  })
}
