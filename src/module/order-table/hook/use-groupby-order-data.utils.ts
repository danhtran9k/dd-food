import { useMemo } from 'react'

import {
  GetOrdersResType,
  OrderStatus,
  SERVING_STATUS,
  TOrderStatus
} from '@app/api-next/orders/orders.dto'

type TTableId = number
type TGuestId = number
export type StatusCountObject = Record<TOrderStatus, number>

export type TOrderByGuestId = Record<TGuestId, GetOrdersResType['data']>
export type TOrderByTableByGuestId = Record<TTableId, TOrderByGuestId>

// create status object with all status and value 0
export const zeroStats = Object.values(OrderStatus).reduce((acc, status) => {
  acc[status] = 0
  return acc
}, {} as StatusCountObject)

export type Statics = {
  stat: StatusCountObject
  statTable: Record<TTableId, StatusCountObject>
  statTableAndGuestId: Record<TTableId, Record<TGuestId, StatusCountObject>>
}

export const useOrderService = (orderList: GetOrdersResType['data']) => {
  const result = useMemo(() => {
    const orderByGuestId: TOrderByGuestId = {}
    const orderByTableByGuestId: TOrderByTableByGuestId = {}

    const statics: Statics = {
      stat: { ...zeroStats },
      statTable: {},
      statTableAndGuestId: {}
    }

    orderList.forEach((order) => {
      const { tableNumber, guestId, status } = order
      if (!tableNumber || !guestId) {
        console.log('🚀 use-groupby-order-data DEBUG', order)
      }

      // Update status statistics
      // Logic đếm này ko ổn, có thể missmatch với statics.statTableAndGuestId
      statics.stat[status]++
      // Check DK vì table và guest có thể bị xóa
      // orderByTableByGuestId là nested object,
      // Chỉ xử lý khi cả table và guest đều có
      // Đây cũng là DK cần để đếm stat
      if (tableNumber !== null && guestId !== null) {
        // Ko khởi tạo nested object được nên phải check tạo trước
        if (!statics.statTable[tableNumber]) {
          statics.statTable[tableNumber] = { ...zeroStats }
        }
        if (!statics.statTableAndGuestId[tableNumber]) {
          statics.statTableAndGuestId[tableNumber] = {}
        }

        const tableStat = statics.statTableAndGuestId[tableNumber]

        if (!tableStat[guestId]) {
          tableStat[guestId] = {
            ...zeroStats
          }
        }

        tableStat[guestId][status]++
        statics.statTable[tableNumber][status]++

        // Xử lý orderByTableByGuestId
        // Insert vào nếu chưa có
        if (!orderByTableByGuestId[tableNumber]) {
          orderByTableByGuestId[tableNumber] = {}
        }
        if (!orderByTableByGuestId[tableNumber][guestId]) {
          orderByTableByGuestId[tableNumber][guestId] = []
        }

        orderByTableByGuestId[tableNumber][guestId].push(order)
      }

      // orderByGuestId ko nested nên ko cần check tableNumber
      // Chỉ cần order khớp guestId existed là ok

      // WARNING : cùng 1 guestID có thể order tại nhiều bản khác nhau ko
      // Thật ra nếu tính toán orderByGuestId trước orderByTableByGuestId
      // sẽ lúc push data có thể tái sử dụng, khỏi tạo arr lại
      // Tuy nhiên sẽ có logic tableNumber ko tồn tại

      if (guestId) {
        if (!orderByGuestId[guestId]) {
          orderByGuestId[guestId] = []
        }
        orderByGuestId[guestId].push(order)
      }
    })

    // Lọc lại lần 2, dùng giải thuật some
    // Chỉ cần bàn có ít nhất 1 user còn serving
    // Tức là các dơn khác done / reject nhửng chỉ cần 1 isServing
    // add hết toàn bộ list !!!
    // ko thể xử lý trong 1 lần loop ở trên được
    // Dù cắm cờ thì với mỗi orderStatus vẫn phải so sánh

    // Mục tiêu isServing là để tính tiền
    // Nếu các món trong cùng 1 order đã paid hết / reject hết thì ko list ra
    const servingOrderByTable: TOrderByTableByGuestId = {}
    // Loop qua keys -> for ... in
    for (const tableNumber in orderByTableByGuestId) {
      const guestObject = orderByTableByGuestId[tableNumber]
      const tmpServingGuestObject: TOrderByGuestId = {}

      for (const guestId in guestObject) {
        const guestOrders = guestObject[guestId]
        const isServingGuest = guestOrders.some((order) =>
          SERVING_STATUS.includes(order.status as any)
        )
        if (isServingGuest) {
          tmpServingGuestObject[Number(guestId)] = guestOrders
        }
      }

      // Check DK để add tmp vào obj Stat
      // Coi có khách nào đang serving ko
      if (Object.keys(tmpServingGuestObject).length) {
        servingOrderByTable[Number(tableNumber)] = tmpServingGuestObject
      }
    }

    return {
      statics,
      orderList,
      orderByGuestId,
      orderByTableByGuestId,
      servingOrderByTable
    }
  }, [orderList])
  return result
}
