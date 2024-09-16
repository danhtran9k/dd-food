import { GuestCreateOrdersResType } from '@app/api-next/guest/orders/guest-order.dto'
import {
  PayGuestOrdersResType,
  UpdateOrderResType
} from '@app/api-next/orders/mutate/mutate-orders.dto'

export const EV_SOCKET = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  UPDATE_ORDER: 'update-order',
  NEW_ORDER: 'new-order',
  PAYMENT: 'payment'
} as const

export type TServerToClientEvents = {
  [EV_SOCKET.UPDATE_ORDER]: (_TData: UpdateOrderResType['data']) => void
  [EV_SOCKET.NEW_ORDER]: (_TData: GuestCreateOrdersResType['data']) => void
  [EV_SOCKET.PAYMENT]: (_TData: PayGuestOrdersResType['data']) => void
}

export type TClientToServerEvents = {}
