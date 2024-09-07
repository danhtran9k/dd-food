'use client'

import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

import { clientLocal } from '@app/api-next/_core/token.helper'

const AuthContext = createContext({
  isAuth: false,
  setIsAuth: (_TIsAuth: boolean) => {}
})

export const useAuthContext = () => {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [isAuth, setIsAuthState] = useState(false)

  const setIsAuth = useCallback((isAuth: boolean) => {
    if (isAuth) {
      setIsAuthState(true)
    } else {
      setIsAuthState(false)
      clientLocal.authTokens.removeAll()
    }
  }, [])

  // https://react.dev/reference/react/useContext#optimizing-re-renders-when-passing-objects-and-functions
  const contextValue = useMemo(
    () => ({
      isAuth,
      setIsAuth
    }),
    [isAuth, setIsAuth]
  )

  useEffect(() => {
    const accessToken = clientLocal.access.getToken()
    if (accessToken) {
      setIsAuthState(true)
    }
  }, [])

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
