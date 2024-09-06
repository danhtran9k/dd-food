'use client'

import { createContext, useContext, useMemo, useState } from 'react'

import { AccountItem } from '@app/api-next/accounts/account.dto'

/* eslint-disable no-unused-vars */
type TAccountTableContext = {
  employeeIdEdit: number | undefined
  setEmployeeIdEdit: (value: number | undefined) => void
  employeeDelete: AccountItem | null
  setEmployeeDelete: (value: AccountItem | null) => void
}

const AccountTableContext = createContext<TAccountTableContext>({
  employeeIdEdit: undefined,
  setEmployeeIdEdit: (value: number | undefined) => {},
  employeeDelete: null,
  setEmployeeDelete: (value: AccountItem | null) => {}
})

// Vì table gọi PopUp + nhiều item con nên bọc Provider luôn
// Tuy nhiên đánh đổi lại là table ko tái sử dụng được
export const AccountTableProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [employeeIdEdit, setEmployeeIdEdit] = useState<number | undefined>()
  const [employeeDelete, setEmployeeDelete] = useState<AccountItem | null>(null)

  const contextValue = useMemo(
    () => ({
      employeeIdEdit,
      setEmployeeIdEdit,
      employeeDelete,
      setEmployeeDelete
    }),
    [employeeIdEdit, setEmployeeIdEdit, employeeDelete, setEmployeeDelete]
  )

  return (
    <AccountTableContext.Provider value={contextValue}>
      {children}
    </AccountTableContext.Provider>
  )
}

export const useAccountTableContext = () => {
  const context = useContext(AccountTableContext)

  if (!context) {
    throw new Error(
      'useAccountTable must be used within a AccountTableProvider'
    )
  }

  return context
}
