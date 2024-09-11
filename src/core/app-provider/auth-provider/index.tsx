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

import { RoleType } from '@app/api-next/_core/api-type.const'
import { jwtDecode } from '@app/api-next/_core/jwt'
import { clientLocal } from '@app/api-next/_core/token.helper'

const AuthContext = createContext({
  isAuth: false,
  role: undefined as RoleType | undefined,
  setRoleAuth: (_TRole?: RoleType | undefined) => {}
})

export const useAuthContext = () => {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [role, setRole] = useState<RoleType | undefined>()

  const setRoleAuth = useCallback((role?: RoleType) => {
    setRole(role)
    if (!role) {
      clientLocal.authTokens.removeAll()
    }
  }, [])

  // https://react.dev/reference/react/useContext#optimizing-re-renders-when-passing-objects-and-functions
  const contextValue = useMemo(
    () => ({
      role,
      setRoleAuth,
      isAuth: !!role
    }),
    [role, setRoleAuth]
  )

  useEffect(() => {
    // accessToken vì được re-fretch nhiều nên sẽ có data mới
    // re-freshToken có thể dính role cũ nếu check ko kỹ
    const accessToken = clientLocal.access.getToken()
    if (accessToken) {
      const [{ role }] = jwtDecode([accessToken])
      setRole(role)
    }
  }, [])

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
