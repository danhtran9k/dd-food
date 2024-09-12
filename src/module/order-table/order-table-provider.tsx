'use client'

import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState
} from 'react'

type TOrderTableContext = {
  orderIdEdit: number | undefined
  setOrderIdEdit: (_TValue: number | undefined) => void
}

const OrderTableContext = createContext<TOrderTableContext | undefined>(
  undefined
)

export function OrderTableProvider({ children }: PropsWithChildren) {
  const [orderIdEdit, setOrderIdEdit] = useState<number | undefined>(undefined)

  const value = useMemo(
    () => ({
      orderIdEdit,
      setOrderIdEdit
    }),
    [orderIdEdit, setOrderIdEdit]
  )

  return (
    <OrderTableContext.Provider value={value}>
      {children}
    </OrderTableContext.Provider>
  )
}

export function useOrderTableContext() {
  const context = useContext(OrderTableContext)

  if (context === undefined) {
    throw new Error(
      'useOrderTableContext must be used within a OrderTableProvider'
    )
  }
  return context
}
