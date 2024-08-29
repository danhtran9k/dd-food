import { ROUTE_PATH } from '@core/path.const'

// undefined -> public
// false -> chỉ hiện khi chưa auth (login)
// true ->  chỉ hiện khi đã auth
export const menuItems = [
  {
    title: 'Món ăn',
    href: ROUTE_PATH.MENU
  },
  {
    title: 'Đơn hàng',
    href: ROUTE_PATH.ORDERS,
    shouldShowWhenAuth: true
  },
  {
    title: 'Đăng nhập',
    href: ROUTE_PATH.LOGIN,
    shouldShowWhenAuth: false
  },
  {
    title: 'Quản lý',
    href: ROUTE_PATH.MANAGE.DASHBOARD(),
    shouldShowWhenAuth: true
  }
]
