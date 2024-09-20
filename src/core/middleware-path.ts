import { locales } from '@core/app-i18n/locale-config'
import { ROUTE_PATH } from '@core/path.const'

// Gọi là guest nhưng thực chất là ROLE_GUEST (authed)
const _guestPaths = [ROUTE_PATH.GUEST.BASE] as const
const _managePaths = [ROUTE_PATH.MANAGE.BASE] as const

const _ownerPaths = [ROUTE_PATH.MANAGE.ACCOUNTS()] as const
//

// đây là path chỉ khi ko login mới được vào
// Khác với path public là log hay ko vẫn vào được
const _nonAuthOnlyPaths = [ROUTE_PATH.LOGIN] as const
const _privatePaths = [..._guestPaths, ..._managePaths] as const

// Vì là hàm map tính toán động nên ko ép as const vào được
const pathWithLocalePrefix = (path: string[]) => {
  // for each path in array, add prefix locale from locales, finally flat array
  return path.flatMap((path) => locales.map((locale) => `/${locale}${path}`))
}

export const middlewarePath = {
  guest: pathWithLocalePrefix(_guestPaths as unknown as string[]),
  manage: pathWithLocalePrefix(_managePaths as unknown as string[]),
  owner: pathWithLocalePrefix(_ownerPaths as unknown as string[]),
  nonAuthOnly: pathWithLocalePrefix(_nonAuthOnlyPaths as unknown as string[]),
  private: pathWithLocalePrefix(_privatePaths as unknown as string[])
}
