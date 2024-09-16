'use client'

import { CellContext } from '@tanstack/react-table'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState
} from 'react'

import { GetOrdersResType, OrderItem } from '@app/api-next/orders/orders.dto'

import { useOrderService } from '@module/order-table'

type TOrderTableContext = {
  orderIdEdit: number | undefined
  setOrderIdEdit: (_TValue: number | undefined) => void
  orderStats: ReturnType<typeof useOrderService>
}

export type TOrderTableCellContext = CellContext<OrderItem, string>

const OrderTableContext = createContext<TOrderTableContext | undefined>(
  undefined
)

type TOrderTableProviderProps = PropsWithChildren<{
  data: GetOrdersResType['data']
}>
export function OrderTableProvider({
  children,
  data
}: TOrderTableProviderProps) {
  const [orderIdEdit, setOrderIdEdit] = useState<number | undefined>(undefined)
  const orderStats = useOrderService(data)

  const value = useMemo(
    () => ({
      orderIdEdit,
      setOrderIdEdit,
      orderStats
    }),
    [orderIdEdit, setOrderIdEdit, orderStats]
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
