import { useEffect, useState } from 'react'

import { getClientAccessToken } from './token.helper'

// https://nextjs.org/docs/messages/react-hydration-error
export const useLocalAccessToken = () => {
  // Đối với React bình thường khi render có thể check local ngay tại đó
  // Tuy nhiên với Next vì chạy ở 2 môi trường nên sẽ gây Hydration mismatch
  // WARNING - TODO:
  // fix tạm, logic chỉ đơn giản là check có token hay ko
  // ko xét token valid - expired gì cả
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    setIsAuth(Boolean(getClientAccessToken()))
  }, [])

  return isAuth
}
