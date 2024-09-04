'use client'

import Link from 'next/link'

import { useAuthContext } from '@core/app-provider/auth-provider'

import { menuItems } from './menu-item'

// Server: Món ăn, Đăng nhập. Do server không biết trạng thái đăng nhập của user
// CLient: Đầu tiên client sẽ hiển thị là Món ăn, Đăng nhập.
// Nhưng ngay sau đó thì client render ra là Món ăn, Đơn hàng, Quản lý do đã check được trạng thái đăng nhập
// Trong Hook có note thêm

// https://nextjs.org/docs/messages/react-hydration-error
// solution tạm chấp nhận, nếu modified lộ navItem cũng ko sao vì còn middleware và ssr check lần 2
// Solution này chấp nhận flash-UI

// TRADE-OFF
// Dùng cookie thì ko còn static rendering toàn page
// Dùng disable SSR component thì theo course vẫn có lỗi
// Dùng useEffect sẽ flash
export function NavItems({ className }: { className?: string }) {
  const { isAuth } = useAuthContext()

  return menuItems.map((item) => {
    const shouldHide =
      (item.shouldShowWhenAuth === false && isAuth) ||
      (item.shouldShowWhenAuth === true && !isAuth)

    return shouldHide ? null : (
      <Link href={item.href} key={item.href} className={className}>
        {item.title}
      </Link>
    )
  })
}
