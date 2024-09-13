import { io } from 'socket.io-client'

import envConfig from '@core/config'

import { clientLocal } from '@app/api-next/_core/token.helper'

export const socketInstance = io(envConfig.NEXT_PUBLIC_API_ENDPOINT, {
  auth: {
    Authorization: `Bearer ${clientLocal.access.getToken()}`
  }
})
