import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { useAuthContext } from '@core/app-provider/auth-provider'

export function useClearTokenParams() {
  const searchParams = useSearchParams()
  const clearTokens = searchParams.get('clearTokens')
  const { setIsAuth } = useAuthContext()

  useEffect(() => {
    if (clearTokens) {
      setIsAuth(false)
    }
  }, [clearTokens, setIsAuth])
}
