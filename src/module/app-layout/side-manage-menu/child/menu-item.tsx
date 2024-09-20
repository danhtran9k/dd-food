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

import { Role } from '@app/api-next/_core/api-type.const'

export const menuItems = [
  {
    title: 'Dashboard',
    Icon: LineChart,
    href: ROUTE_PATH.MANAGE.DASHBOARD(),
    roles: [Role.Owner, Role.Employee]
  },
  {
    title: 'Đơn hàng',
    Icon: ShoppingCart,
    href: ROUTE_PATH.MANAGE.ORDERS(),
    roles: [Role.Owner, Role.Employee]
  },
  {
    title: 'Bàn ăn',
    Icon: Table,
    href: ROUTE_PATH.MANAGE.TABLES(),
    roles: [Role.Owner, Role.Employee]
  },
  {
    title: 'Món ăn',
    Icon: Salad,
    href: ROUTE_PATH.MANAGE.DISHES(),
    roles: [Role.Owner, Role.Employee]
  },
  {
    title: 'Nhân viên',
    Icon: Users2,
    href: ROUTE_PATH.MANAGE.ACCOUNTS(),
    roles: [Role.Owner]
  },
  {
    title: 'Dummy RSC test',
    Icon: Key,
    href: ROUTE_PATH.MANAGE.ANALYTICS(),
    roles: [Role.Owner, Role.Employee]
  },
  // Check layout home có ăn auth global state ko
  {
    title: 'HOME',
    Icon: Home,
    href: ROUTE_PATH.ROOT,
    roles: [Role.Owner, Role.Employee]
  }
]
