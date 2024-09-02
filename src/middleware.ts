import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { ROUTE_PATH } from '@core/path.const'

const privatePaths = [ROUTE_PATH.MANAGE.BASE]

// đây là path chỉ khi ko login mới được vào
// Khác với path public là log hay ko vẫn vào được
const nonAuthOnlyPaths = [ROUTE_PATH.LOGIN]

// Middleware helper ko nên extract ra file khác
const checkPathEnter = (pathname: string) => ({
  isEnterPrivatePath: privatePaths.some((path) => pathname.startsWith(path)),
  isEnterNonAuthOnlyPath: nonAuthOnlyPaths.some((path) =>
    pathname.startsWith(path)
  )
})

// https://nextjs.org/docs/app/building-your-application/routing/middleware#convention
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // TODO: Token có validate bởi Next ko
  // cookie này có validate không hay chỉ get value ra
  const accessToken = request.cookies.get('accessToken')?.value
  const refreshToken = request.cookies.get('refreshToken')?.value

  const { isEnterPrivatePath, isEnterNonAuthOnlyPath } =
    checkPathEnter(pathname)

  // Đăng nhập rồi thì sẽ không cho vào login nữa, tránh loop
  // Có phân tích trong httpClient
  if (isEnterNonAuthOnlyPath && refreshToken) {
    return NextResponse.redirect(new URL(ROUTE_PATH.ROOT, request.url))
  }

  // accessToken khi exprired sẽ tự xoá khỏi client nhờ cookie
  // => phải check qua refreshToken
  if (isEnterPrivatePath && !refreshToken) {
    const url = new URL(ROUTE_PATH.LOGIN, request.url)
    return NextResponse.redirect(url)
  }

  // Trường hợp đăng nhập rồi, AT hết hạn nhưng RT còn
  // Đúng flow của AT-RT thì sẽ đẩy về route refresh token
  if (isEnterPrivatePath && refreshToken && !accessToken) {
    // force logout ở đây là sai
    // const url = new URL('/logout', request.url)
    // url.searchParams.set('refreshToken', refreshToken)

    // route refresh cần 2 thông tin -> check phân tích trong notes thêm
    const url = new URL(ROUTE_PATH.REFRESH_TOKEN, request.url)
    url.searchParams.set('refreshToken', refreshToken)
    url.searchParams.set('redirect', pathname)

    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

// Cách path trong config bắt buộc phải hard-code
// Check docs Next
// https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ['/manage/:path*', '/login']
}
