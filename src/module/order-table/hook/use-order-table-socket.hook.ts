import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

import { toast } from '@core/app-shadcn/use-toast'

import { SERVER_API_ORDERS } from '@app/api-next/_core/api-endpoint'
import {
  EV_SOCKET,
  socketInstance,
  useSocketConnect
} from '@app/api-next/_core/socket'

import { GuestCreateOrdersResType } from '@app/api-next/guest/orders/guest-order.dto'
import {
  PayGuestOrdersResType,
  UpdateOrderResType
} from '@app/api-next/orders/mutate/mutate-orders.dto'
import { getVietnameseOrderStatus } from '@app/api-next/orders/orders.dto'

type TUseOrderTableSocket = {
  fromDate: Date
  toDate: Date
}

// Control qua fromDate và toDate quá sát, thêm logic check DK
export const useOrderTableSocket = ({
  fromDate,
  toDate
}: TUseOrderTableSocket) => {
  const queryClient = useQueryClient()

  useSocketConnect()

  useEffect(() => {
    // Về logic khi tạo / update thì date sẽ là now, nên ko cần refetch
    function refetch() {
      const now = new Date()
      if (now >= fromDate && now <= toDate) {
        queryClient.invalidateQueries({ queryKey: SERVER_API_ORDERS.key() })
      }
    }

    function onUpdateOrder(data: UpdateOrderResType['data']) {
      const {
        dishSnapshot: { name },
        quantity,
        status
      } = data
      toast({
        description: `Món ${name} (SL: ${quantity}) vừa được cập nhật sang trạng thái "${getVietnameseOrderStatus(
          status
        )}"`
      })
      refetch()
    }

    function onNewOrder(data: GuestCreateOrdersResType['data']) {
      const { guest } = data[0]
      toast({
        description: `${guest?.name} tại bàn ${guest?.tableNumber} vừa đặt ${data.length} đơn`
      })
      refetch()
    }

    function onPayment(data: PayGuestOrdersResType['data']) {
      const { guest } = data[0]
      toast({
        description: `${guest?.name} tại bàn ${guest?.tableNumber} thanh toán thành công ${data.length} đơn`
      })
      refetch()
    }

    socketInstance.on(EV_SOCKET.UPDATE_ORDER, onUpdateOrder)
    socketInstance.on(EV_SOCKET.NEW_ORDER, onNewOrder)
    socketInstance.on(EV_SOCKET.PAYMENT, onPayment)

    return () => {
      socketInstance.off(EV_SOCKET.UPDATE_ORDER, onUpdateOrder)
      socketInstance.off(EV_SOCKET.NEW_ORDER, onNewOrder)
      socketInstance.off(EV_SOCKET.PAYMENT, onPayment)
    }
  }, [fromDate, toDate, queryClient])
}
