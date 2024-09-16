import { BookX, CookingPot, HandCoins, Loader, Truck } from 'lucide-react'

import { cn } from '@core/utils'

import { OrderStatus, TOrderStatus } from '@app/api-next/orders/orders.dto'

const statusIcons = {
  [OrderStatus.Pending]: Loader,
  [OrderStatus.Processing]: CookingPot,
  [OrderStatus.Rejected]: BookX,
  [OrderStatus.Delivered]: Truck,
  [OrderStatus.Paid]: HandCoins
}

type CustomClass = Partial<Record<TOrderStatus, string>>

interface OrderStatusIconProps {
  status: TOrderStatus
  className?: string
  customClass?: CustomClass
}

export const OrderStatusIcon = ({
  status,
  className,
  customClass
}: OrderStatusIconProps) => {
  const Icon = statusIcons[status]
  return <Icon className={cn(className, customClass?.[status])} />
}
