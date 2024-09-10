import { ROUTE_PATH } from '@core/path.const'

import { Role, RoleType, RoleValues } from '@app/api-next/_core/api-type.const'

type TMenuItem = {
  title: string
  href: string
  role: (RoleType | undefined)[]
}

// undefined -> chưa log vẫn xem được
// ko chia thành khái niệm public nữa mà explicit ra luôn
export const menuItems: TMenuItem[] = [
  {
    title: 'Trang chủ',
    href: ROUTE_PATH.ROOT,
    role: [undefined, ...RoleValues]
  },
  {
    title: 'Menu',
    href: ROUTE_PATH.GUEST.MENU(),
    role: [Role.Guest]
  },
  {
    title: 'Đơn hàng',
    href: ROUTE_PATH.GUEST.ORDERS(),
    role: [Role.Guest]
  },
  {
    title: 'Đăng nhập',
    href: ROUTE_PATH.LOGIN,
    role: [undefined]
  },
  {
    title: 'Quản lý',
    href: ROUTE_PATH.MANAGE.DASHBOARD(),
    role: [Role.Owner, Role.Employee]
  }
]
