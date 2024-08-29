import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const privatePaths = ['/manage']
// đây là path chỉ khi ko login mới được vào
// Khác với path public là log hay ko vẫn vào được
const nonAuthOnlyPaths = ['/login']

// https://nextjs.org/docs/app/building-your-application/routing/middleware#convention
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // TODO: Token có validate bởi Next ko
  // cookie này có validate không hay chỉ get value ra
  const isAuth = Boolean(request.cookies.get('accessToken')?.value)

  if (privatePaths.some((path) => pathname.startsWith(path)) && !isAuth) {
    // Chưa đăng nhập thì không cho vào private paths
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Đăng nhập rồi thì sẽ không cho vào login nữa
  if (nonAuthOnlyPaths.some((path) => pathname.startsWith(path)) && isAuth) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/manage/:path*', '/login']
}
