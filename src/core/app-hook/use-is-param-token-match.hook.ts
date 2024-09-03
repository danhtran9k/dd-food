import { useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

import { clientLocal } from '@app/api-next/_core/token.helper'

export const useIsParamTokenMatch = () => {
  const searchParams = useSearchParams()

  // Không viết dạng value trực tiếp được vì nằm ngoài hook
  // Vẫn sẽ bị thực thi ở server dù có dùng 'use client'
  // đưa về func lazy gọi trong useEffect
  const checkTokenParamMatch = useCallback(() => {
    const accessTokenFromUrl = searchParams.get('accessToken')
    const refreshTokenFromUrl = searchParams.get('refreshToken')

    const hasAndMatchRefreshToken = Boolean(
      refreshTokenFromUrl &&
        refreshTokenFromUrl === clientLocal.refresh.getToken()
    )

    const hasAndMatchAccessToken = Boolean(
      accessTokenFromUrl && accessTokenFromUrl === clientLocal.access.getToken()
    )
    return {
      hasAndMatchRefreshToken,
      hasAndMatchAccessToken
    }
  }, [searchParams])

  return { checkTokenParamMatch, searchParams }
}
