import type { NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import { defaultLocale, locales } from '@core/app-i18n/locale-config'
import { middlewarePath } from '@core/middleware-path'
import { ROUTE_PATH } from '@core/path.const'

import { Role } from '@app/api-next/_core/api-type.const'
import { jwtDecode } from '@app/api-next/_core/jwt'

// logic chỉ chặn cho path buộc phải auth và chưa auth
// Còn đúng nghĩa public (auth hay ko auth đều vào được)
// -> middleware sẽ skip, ko cần handle case này (NextResponse.next())
// Nếu vào case đặc biệt có thể cho fall (hang) luôn để debug hoặc throw error
export const config = {
  // [...privatePaths, ...nonAuthOnlyPaths]
  // Cách path trong config bắt buộc phải hard-code
  // Check docs Next
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher

  // matcher: ['/guest/:path*', '/manage/:path*', '/login']
  matcher: ['/', '/(vi|en)/:path*']
}

// Middleware helper ko nên extract ra file khác
const checkPathEnter = (pathname: string) => ({
  isEnterGuestPath: middlewarePath.guest.some((path) =>
    pathname.startsWith(path)
  ),
  isEnterManagePath: middlewarePath.manage.some((path) =>
    pathname.startsWith(path)
  ),
  isEnterPrivatePath: middlewarePath.private.some((path) =>
    pathname.startsWith(path)
  ),
  isEnterNonAuthOnlyPath: middlewarePath.nonAuthOnly.some((path) =>
    pathname.startsWith(path)
  ),
  isEnterOwnerPath: middlewarePath.owner.some((path) =>
    pathname.startsWith(path)
  )
})

// https://nextjs.org/docs/app/building-your-application/routing/middleware#convention
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const handleI18nRouting = createMiddleware({
    locales: locales,
    defaultLocale: defaultLocale
  })
  // Với I18n middleware bắt buộc phải return response tường minh ra
  const response = handleI18nRouting(request)

  const { pathname } = request.nextUrl

  // Cookie chỉ lấy value ra, ko validate
  // Validate trong route / API_SERVER
  const accessToken = request.cookies.get('accessToken')?.value
  const refreshToken = request.cookies.get('refreshToken')?.value

  const {
    isEnterGuestPath,
    isEnterManagePath,
    isEnterPrivatePath,
    isEnterNonAuthOnlyPath,
    isEnterOwnerPath
  } = checkPathEnter(pathname)

  // accessToken khi exprired sẽ tự xoá khỏi client nhờ cookie
  // => phải check qua refreshToken
  // ko có refreshToken thì ko cho vào private path và redirect về login
  // kèm trigger PROXY page để clear token
  if (isEnterPrivatePath && !refreshToken) {
    const url = new URL(ROUTE_PATH.LOGIN, request.url)
    url.searchParams.set('clearTokens', 'true')
    const urlString = url.toString()
    response.headers.set('x-middleware-rewrite', urlString)
    return response
  }

  // =========================================================
  // !(A & B) = !A || !B ->
  // !A & B (A1) /  !A & !B (A2)
  //  A & !B (B)
  //  - CASE_A: hoặc ko phải privatePath
  //    - A_1: ko refresh -> pass (trong 3 case thì chỉ có 1 TH B)
  //    - A_2: refresh -> check xem có phải nonAuthOnlyPath hay ko
  //  - CASE_B: có refreshToken (path vẫn thuộc config mdw)
  // =========================================================

  // Case_A1 !A & B,
  // theo logic thì chỉ cần check B là đủ vì case A&B đã check trên
  // Theo đúng thì còn accessToken ko nên cho vào nonAuthOnlyPaths
  // !refreshToken & !isEnterPrivatePath, tuy nhiên ko viết tưởng minh ra để ts infer code phía sau
  if (!refreshToken) {
    if (isEnterNonAuthOnlyPath && accessToken) {
      // Bắt buộc dup logic
      const urlString = new URL(ROUTE_PATH.ROOT, request.url).toString()
      response.headers.set('x-middleware-rewrite', urlString)
      return response
    }

    // Các case !refreshToken còn lại hiển nhiên pass
    // !isEnterPrivatePath & !accessToken
    // !isEnterPrivatePath & accessToken & !isEnterNonAuthOnlyPath
    return response
  }

  // CASE_A2 + B
  // -> chắc chắn có refreshToken

  // Case_A2
  // Đăng nhập rồi thì sẽ không cho vào login nữa, tránh loop
  // Có phân tích trong httpClient
  if (isEnterNonAuthOnlyPath) {
    const urlString = new URL(ROUTE_PATH.ROOT, request.url).toString()
    response.headers.set('x-middleware-rewrite', urlString)
    return response
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
    const urlString = url.toString()
    response.headers.set('x-middleware-rewrite', urlString)
    return response
  }

  // Guard value pass -> guard role ngay trong middleware ?
  // Không đúng role, redirect về trang chủ
  const [{ role }] = jwtDecode([refreshToken])
  const isGuest = role === Role.Guest
  // Guest nhưng cố vào route owner
  const isGuestEnterManagePath = isGuest && isEnterManagePath

  // Không phải Guest nhưng cố vào route guest
  const isNotGuestEnterGuestPath = !isGuest && isEnterGuestPath

  const isNotOwnerEnterOwnerPath = role !== Role.Owner && isEnterOwnerPath

  if (
    isGuestEnterManagePath ||
    isNotGuestEnterGuestPath ||
    isNotOwnerEnterOwnerPath
  ) {
    const urlString = new URL('/', request.url).toString()
    response.headers.set('x-middleware-rewrite', urlString)
    return response
  }

  // Path authorization role check pass
  return response
}
