'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect } from 'react'

import { toast } from '@core/app-shadcn/use-toast'

import { SERVER_API_GUEST } from '@app/api-next/_core/api-endpoint'
import { socketInstance, useSocketConnect } from '@app/api-next/_core/socket'
import { EV_SOCKET } from '@app/api-next/_core/socket/socket.dto'

import {
  PayGuestOrdersResType,
  UpdateOrderResType
} from '@app/api-next/orders/mutate/mutate-orders.dto'
import { getVietnameseOrderStatus } from '@app/api-next/orders/orders.dto'

// Về core thì socket cho mỗi role có thể khác nhau
// Merge chung cũng được nhưng tạo ra 1 noti common
// Tuy nhiên logic manager có filter nên DK refetch sẽ check với filter hiện tại
// -> tạo 1 common chỉ gọn code 1 tí nhưng phức tạp nhiều
// Nên copy lại
export const useQuerySocketOrdersCart = () => {
  const queryClient = useQueryClient()
  const refetch = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: SERVER_API_GUEST.ORDERS.key
    })
  }, [queryClient])

  useSocketConnect()
  useEffect(() => {
    // Hàm có sử dụng re-fetch nên ko extract ra hoàn toàn được
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

    function onPayment(data: PayGuestOrdersResType['data']) {
      const { guest } = data[0]
      toast({
        description: `${guest?.name} tại bàn ${guest?.tableNumber} thanh toán thành công ${data.length} đơn`
      })
      refetch()
    }

    socketInstance.on(EV_SOCKET.UPDATE_ORDER, onUpdateOrder)
    socketInstance.on(EV_SOCKET.PAYMENT, onPayment)
    // WANRNING : check dependency cẩn thận, ko kỹ có thể dính double listen
    // Việc unlisten sẽ được handle ở useSocketConnect
  }, [refetch])
}
