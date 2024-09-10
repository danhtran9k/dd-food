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
    title: 'Menu',
    href: ROUTE_PATH.GUEST.MENU(),
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
