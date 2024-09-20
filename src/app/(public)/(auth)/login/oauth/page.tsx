'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { useAuthContext } from '@core/app-provider/auth-provider'
import { toast } from '@core/app-shadcn/use-toast'
import { ROUTE_PATH } from '@core/path.const'

import { jwtDecode } from '@app/api-next/_core/jwt'

import { useAuthToken } from '@app/api-next/auth/token/use-auth-token.hook'

export default function OAuthPage() {
  const { mutateAsync } = useAuthToken()
  const router = useRouter()
  const { setRoleAuth } = useAuthContext()
  const searchParams = useSearchParams()

  const ref = useRef<unknown>(null)

  useEffect(() => {
    const accessToken = searchParams.get('accessToken')
    const refreshToken = searchParams.get('refreshToken')
    const message = searchParams.get('message')

    if (accessToken && refreshToken) {
      if (!ref.current) {
        const [{ role }] = jwtDecode([accessToken])

        ref.current = mutateAsync({ accessToken, refreshToken })
          .then(() => {
            setRoleAuth(role)
          })
          .catch((e) => {
            toast({
              description: e.message ?? 'Có lỗi xảy ra'
            })
          })
          .finally(() => {
            ref.current = null
            router.push(ROUTE_PATH.MANAGE.DASHBOARD())
          })
      }
    } else {
      console.log(message)
      toast({
        description: message ?? 'Có lỗi xảy ra'
      })
    }
  }, [searchParams, router, setRoleAuth, mutateAsync])

  return <div>Redirecting...</div>
}
