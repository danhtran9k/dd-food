'use server'

import { cookies } from 'next/headers'

import { SERVER_API } from '@app/api-next/_core/api-endpoint'
import { httpNext } from '@app/api-next/_core/http/http.next'
import { tokenToHeader } from '@app/api-next/_core/token.helper'

export const errNextDebug = () => {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')?.value!

  return httpNext('GET', SERVER_API.DEBUG_401.api(), {
    options: tokenToHeader(accessToken)
  })
}
