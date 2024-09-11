import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { ROUTE_PATH } from '@core/path.const'

import { Role } from '@app/api-next/_core/api-type.const'
import { jwtDecode } from '@app/api-next/_core/jwt'

// Gọi là guest nhưng thực chất là ROLE_GUEST (authed)
const guestPaths = [ROUTE_PATH.GUEST.BASE]
const managePaths = [ROUTE_PATH.MANAGE.BASE]

// đây là path chỉ khi ko login mới được vào
// Khác với path public là log hay ko vẫn vào được
const nonAuthOnlyPaths = [ROUTE_PATH.LOGIN]
const privatePaths = [...guestPaths, ...managePaths]

// logic chỉ chặn cho path buộc phải auth và chưa auth
// Còn đúng nghĩa public (auth hay ko auth đều vào được)
// -> middleware sẽ skip, ko cần handle case này (NextResponse.next())
// Nếu vào case đặc biệt có thể cho fall (hang) luôn để debug hoặc throw error
export const config = {
  // [...privatePaths, ...nonAuthOnlyPaths]
  // Cách path trong config bắt buộc phải hard-code
  // Check docs Next
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher

  matcher: ['/guest/:path*', '/manage/:path*', '/login']
}

// Middleware helper ko nên extract ra file khác
const checkPathEnter = (pathname: string) => ({
  isEnterGuestPath: guestPaths.some((path) => pathname.startsWith(path)),
  isEnterManagePath: managePaths.some((path) => pathname.startsWith(path)),

  isEnterPrivatePath: privatePaths.some((path) => pathname.startsWith(path)),
  isEnterNonAuthOnlyPath: nonAuthOnlyPaths.some((path) =>
    pathname.startsWith(path)
  )
})

// https://nextjs.org/docs/app/building-your-application/routing/middleware#convention
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Cookie chỉ lấy value ra, ko validate
  // Validate trong route / API_SERVER
  const accessToken = request.cookies.get('accessToken')?.value
  const refreshToken = request.cookies.get('refreshToken')?.value

  const {
    isEnterGuestPath,
    isEnterManagePath,
    isEnterPrivatePath,
    isEnterNonAuthOnlyPath
  } = checkPathEnter(pathname)

  // accessToken khi exprired sẽ tự xoá khỏi client nhờ cookie
  // => phải check qua refreshToken
  // ko có refreshToken thì ko cho vào private path và redirect về login
  // kèm trigger PROXY page để clear token
  if (isEnterPrivatePath && !refreshToken) {
    const url = new URL(ROUTE_PATH.LOGIN, request.url)
    url.searchParams.set('clearTokens', 'true')
    return NextResponse.redirect(url)
  }

  // =========================================================
  // !(A & B) = !A || !B
  //  - CASE_A: hoặc ko phải privatePath
  //    - A_1: ko refresh -> pass
  //    - A_2: refresh -> check xem có phải nonAuthOnlyPath hay ko
  //  - CASE_B: có refreshToken (path vẫn thuộc config mdw)
  // =========================================================

  // Case_A1
  if (!refreshToken) return

  // CASE_A2 + B
  // -> chắc chắn có refreshToken

  // Case_A2
  // Đăng nhập rồi thì sẽ không cho vào login nữa, tránh loop
  // Có phân tích trong httpClient
  if (isEnterNonAuthOnlyPath) {
    return NextResponse.redirect(new URL(ROUTE_PATH.ROOT, request.url))
  }

  // CASE_B: về logic chắn chắn sẽ có refreshToken
  // Nếu ko có thể throw error thì config path thiếu

  // Trường hợp đăng nhập rồi, AT hết hạn nhưng RT còn
  // Đúng flow của AT-RT thì sẽ đẩy về route refresh token
  if (isEnterPrivatePath && !accessToken) {
    // force logout ở đây là sai
    // const url = new URL('/logout', request.url)
    // url.searchParams.set('refreshToken', refreshToken)

    // route refresh cần 2 thông tin -> check phân tích trong notes thêm
    const url = new URL(ROUTE_PATH.REFRESH_TOKEN, request.url)
    url.searchParams.set('refreshToken', refreshToken)
    url.searchParams.set('redirect', pathname)

    return NextResponse.redirect(url)
  }

  // Guard value pass -> guard role ngay trong middleware ?
  // Không đúng role, redirect về trang chủ
  const [{ role }] = jwtDecode([refreshToken])
  const isGuest = role === Role.Guest
  // Guest nhưng cố vào route owner
  const isGuestEnterManagePath = isGuest && isEnterManagePath

  // Không phải Guest nhưng cố vào route guest
  const isNotGuestEnterGuestPath = !isGuest && isEnterGuestPath

  if (isGuestEnterManagePath || isNotGuestEnterGuestPath) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Path authorization role check pass
  return NextResponse.next()
}
