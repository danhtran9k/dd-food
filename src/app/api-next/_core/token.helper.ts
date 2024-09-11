import { RoleType } from '@app/api-next/_core/api-type.const'
import { jwtDecode } from '@app/api-next/_core/jwt'

export const INTERVAL_RENEW = 1000
export const INTERVAL_PERCENT_TRIGGER = 3
// Nếu logic này gọi ở cả rsc thì cần check,
// tuy nhiên rsc sẽ bị mismatch -> dùng ở useEffect
// nếu chỉ dùng trong useEff thì nên xài local trực tiếp

// Hạn chế xài hàm rộng vậy nếu kiểm soát được scope gọi
// const getClientAccessToken = () =>
//   isClient() ? localStorage.getItem('accessToken') : null

// const getClientRefreshToken = () =>
//   isClient() ? localStorage.getItem('refreshToken') : null

// Ko dùng keyword get / set tránh nhầm lẫn với getter / setter
// https://www.w3schools.com/js/js_object_accessors.asp
export const clientLocal = {
  access: {
    getToken: () => localStorage.getItem('accessToken'),
    setToken: (token: string) => localStorage.setItem('accessToken', token),
    removeToken: () => localStorage.removeItem('accessToken')
  },
  refresh: {
    getToken: () => localStorage.getItem('refreshToken'),
    setToken: (token: string) => localStorage.setItem('refreshToken', token),
    removeToken: () => localStorage.removeItem('refreshToken')
  },
  authTokens: {
    getAll: () => ({
      accessToken: clientLocal.access.getToken(),
      refreshToken: clientLocal.refresh.getToken()
    }),
    removeAll: () => {
      clientLocal.access.removeToken()
      clientLocal.refresh.removeToken()
    }
  }
}

export const tokenToHeader = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`
  }
})

type TCheckCanRenew =
  | {
      isExpired: null
      canRenew: false
      role: undefined
    }
  | {
      isExpired: true
      canRenew: false
      role: RoleType
    }
  | {
      isExpired: false
      canRenew: boolean
      role: RoleType
    }

// thực thi side-eff khi isExpired true - clear token
// Có thể nested 2 lớp, khỏi return condition check
// tuy nhiên khi đó hàm khá phức tạp, nested logic
// Hàm ko re-used nhiều, ko nên generalize quá

// onError?: () => void;
// onSuccess?: () => void;
export const checkCanRenewWithRoleOrClearLocal = (): TCheckCanRenew => {
  const { accessToken, refreshToken } = clientLocal.authTokens.getAll()
  if (!accessToken || !refreshToken) {
    return { isExpired: null, canRenew: false, role: undefined }
  }

  const [decodedAccessToken, decodedRefreshToken] = jwtDecode([
    accessToken,
    refreshToken
  ])

  const role = decodedAccessToken.role

  const now = Math.round(new Date().getTime() / 1000)
  if (now >= decodedRefreshToken.exp) {
    clientLocal.authTokens.removeAll()
    return { isExpired: true, canRenew: false, role }
    // return param?.onError && param.onError();
  }

  if (
    (decodedAccessToken.exp - decodedAccessToken.iat) /
      INTERVAL_PERCENT_TRIGGER >
    decodedAccessToken.exp - now
  ) {
    return { isExpired: false, canRenew: true, role }

    // refresh Token phải xử lý nested bên trong, dạng global

    // try {
    //   const res = await authApiRequest.refreshToken();
    //   setAccessTokenToLocalStorage(res.payload.data.accessToken);
    //   setRefreshTokenToLocalStorage(res.payload.data.refreshToken);
    //   param?.onSuccess && param.onSuccess();
    // } catch (error) {
    //   param?.onError && param.onError();
    // }
  }

  return { isExpired: false, canRenew: false, role }
}
