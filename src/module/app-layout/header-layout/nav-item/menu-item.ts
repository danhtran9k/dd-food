import { ROUTE_PATH } from '@core/path.const'

export const menuItems = [
  {
    title: 'Món ăn',
    href: ROUTE_PATH.MENU
  },
  {
    title: 'Đơn hàng',
    href: ROUTE_PATH.ORDERS
  },
  {
    title: 'Đăng nhập',
    href: ROUTE_PATH.LOGIN,
    authRequired: false
  },
  {
    title: 'Quản lý',
    href: ROUTE_PATH.MANAGE.DASHBOARD(),
    authRequired: true
  }
]
