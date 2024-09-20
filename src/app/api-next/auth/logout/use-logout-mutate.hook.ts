import { useMutation } from '@tanstack/react-query'

import { useAuthContext } from '@core/app-provider/auth-provider'
import { handleErrorApi } from '@core/hook-form-error.utils'

import { NEXT_API } from '@app/api-next/_core/api-endpoint'
import { httpClient } from '@app/api-next/_core/http/http.client'
import { socketInstance } from '@app/api-next/_core/socket'

// Gọi vào Next Proxy -> gọi tiếp vào
// không cần truyền AT và RT vào body vì đính kèm cookie
const logoutMutateFn = () => httpClient('POST', NEXT_API.AUTH.LOGOUT.api())

export const useLogoutMutation = () => {
  // Next/Navigation , ko du2ng Next/router
  const { setRoleAuth } = useAuthContext()

  return useMutation({
    mutationFn: logoutMutateFn,
    onError: (err: any) => {
      // Logout chỉ là 1 btn click nên ko cần setField
      handleErrorApi(err)
    },
    onSuccess: () => {
      // Xóa cookie -> Next response về tự set header
      // Xóa local storage, auth context
      // -> đang xử lý trong mutate async để tránh Next navigate nhanh
      socketInstance.disconnect()
      socketInstance.removeAllListeners()
      setRoleAuth()
    }
  })
}
