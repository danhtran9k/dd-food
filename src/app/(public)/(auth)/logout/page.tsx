'use client'

import { useRouter } from 'next/navigation'
import { Suspense, useEffect, useRef } from 'react'

import { useIsParamTokenMatch } from '@core/app-hook/use-is-param-token-match.hook'
import { useAuthContext } from '@core/app-provider/auth-provider'
import { ROUTE_PATH } from '@core/path.const'
import { getUrlWithParams } from '@core/utils'

import { useLogoutMutation } from '@app/api-next/auth/logout/use-logout-mutate.hook'

function ProxyComponentLogout() {
  // Bắt buộc phải destruct tra chứ ko đuọc mutate.mutateAsync
  // obj mutate lớn bị thay đổi và dùng trong eff dep gây loop
  const { mutateAsync } = useLogoutMutation()
  const { setIsAuth } = useAuthContext()
  const router = useRouter()

  // Dùng 1 ref ngầm + timeOut để né React strict mode, de-duplicate request
  // Solution tạm, vì abort Controller chỉ cancel ở FE
  // TRADE-OFF
  const ref = useRef<unknown>(null)

  const { checkTokenParamMatch } = useIsParamTokenMatch()
  useEffect(() => {
    const { hasAndMatchAccessToken } = checkTokenParamMatch()
    // Dùng DK thoả if cho đơn giản, vì logic check undefined hơi rộng
    // Vì route này chỉ chạy khi được Next proxy vào kèm token
    // Check match tránh việc bị vào ngẫu nhiên
    const url = getUrlWithParams(ROUTE_PATH.LOGIN, { navBy: 'logout-page' })

    // Với case còn RT ban đầu trong middleware
    // Guard lại bằng cách đẩy qua PROXY PAGE renew / refresh token
    // Sẽ ko có logic check refreshToken ở đây
    if (!ref.current && hasAndMatchAccessToken) {
      ref.current = mutateAsync

      // TODO: debug tại sao mutate ko chạy mà phải dùng mutateAsync
      // mutate(undefined, {
      //   onSuccess: () => {
      //     console.count('🚀🚀 mutate success')
      //     // Viết dạng mutate async thì phải đưa vào trong .then(res => {...})
      //     setTimeout(() => {
      //       ref.current = null
      //     }, 1000)

      //     // Bắt buộc để cuối
      //     setIsAuth(false)
      //     router.push(url)
      //   }
      // })

      // Dùng mutate như trên lại ko redirect về login dc
      mutateAsync().then(() => {
        setTimeout(() => {
          ref.current = null
        }, 1000)
        setIsAuth(false)
        router.push(url)
      })
    } else {
      // Nếu không match token, redirect về login
      router.push(
        getUrlWithParams(ROUTE_PATH.ROOT, { debug: 'logout-PAGE-PROXY-fail' })
      )
    }
  }, [checkTokenParamMatch, mutateAsync, router, setIsAuth])
  return <div>Log out....</div>
}

export default function LogoutPage() {
  return (
    <Suspense>
      <ProxyComponentLogout />
    </Suspense>
  )
}
