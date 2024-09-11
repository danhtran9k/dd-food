import {
  Home,
  Key,
  LineChart,
  Salad,
  ShoppingCart,
  Table,
  Users2
} from 'lucide-react'

import { ROUTE_PATH } from '@core/path.const'

export const menuItems = [
  {
    title: 'Dashboard',
    Icon: Home,
    href: ROUTE_PATH.MANAGE.DASHBOARD()
  },
  {
    title: 'Đơn hàng',
    Icon: ShoppingCart,
    href: ROUTE_PATH.MANAGE.ORDERS()
  },
  {
    title: 'Bàn ăn',
    Icon: Table,
    href: ROUTE_PATH.MANAGE.TABLES()
  },
  {
    title: 'Món ăn',
    Icon: Salad,
    href: ROUTE_PATH.MANAGE.DISHES()
  },
  {
    title: 'Phân tích',
    Icon: LineChart,
    href: ROUTE_PATH.MANAGE.ANALYTICS()
  },
  {
    title: 'Nhân viên',
    Icon: Users2,
    href: ROUTE_PATH.MANAGE.ACCOUNTS()
  },
  // Check layout home có ăn auth global state ko
  {
    title: 'HOME',
    Icon: Key,
    href: ROUTE_PATH.ROOT
  }
]
