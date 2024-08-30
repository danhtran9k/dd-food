import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { NEXT_API } from '@app/api-next/_core/api-endpoint'
import { httpClient } from '@app/api-next/_core/http/http.client'

import { LoginResType } from '@app/api-next/auth/auth.dto'
import { LoginBodyType } from '@app/api-next/auth/login/login.type'

import { toast } from '@core/app-shadcn/use-toast'
import { ROUTE_PATH } from '@core/path.const'

const loginMutateFn = (body: LoginBodyType) =>
  httpClient<LoginResType>('POST', NEXT_API.AUTH.LOGIN.api(), { body })

export const useLoginMutation = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: loginMutateFn,
    // TODO: Check xem thử có nên setup mutation cache global cho mọi mutate ko
    onSuccess: (result) => {
      toast({
        description: result.payload.message
      })
      router.push(ROUTE_PATH.MANAGE.DASHBOARD())
    }
  })
}
