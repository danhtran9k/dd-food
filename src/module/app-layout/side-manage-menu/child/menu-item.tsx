import {
  Home,
  Key,
  LineChart,
  Salad,
  ShoppingCart,
  Table,
  Users2
} from 'lucide-react'

export const menuItems = [
  {
    title: 'Dashboard',
    Icon: Home,
    href: '/manage/dashboard'
  },
  {
    title: 'Đơn hàng',
    Icon: ShoppingCart,
    href: '/manage/orders'
  },
  {
    title: 'Bàn ăn',
    Icon: Table,
    href: '/manage/tables'
  },
  {
    title: 'Món ăn',
    Icon: Salad,
    href: '/manage/dishes'
  },

  {
    title: 'Phân tích',
    Icon: LineChart,
    href: '/manage/analytics'
  },
  {
    title: 'Nhân viên',
    Icon: Users2,
    href: '/manage/accounts'
  },
  // Check layout home có ăn auth global state ko
  {
    title: 'HOME',
    Icon: Key,
    href: '/'
  }
]
