import { cookies } from 'next/headers'

import { SERVER_API_ACCOUNT } from '@app/api-next/_core/api-endpoint'
import { httpNext } from '@app/api-next/_core/http/http.next'
import { tokenToHeader } from '@app/api-next/_core/token.helper'

import { AccountResType } from '@app/api-next/accounts/account.dto'

const queryFnMe = (accessToken: string) =>
  httpNext<AccountResType>('GET', SERVER_API_ACCOUNT.me.api(), {
    options: tokenToHeader(accessToken)
  })

export async function DummyAuthRsc() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')?.value!
  let name = ''

  try {
    const result = await queryFnMe(accessToken)
    name = result.payload.data.name
  } catch (error: any) {
    // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
    // Vì httpNext gặp 401 -> gọi redirect và throw NEXT_REDIRECT
    // Hoặc ko dùng try catch hoặc gặp error thì throw ngược ra để hàm ko return JSX dưới

    // Đúng ra code re-direct nên ở page
    // Đặt trong component thì sẽ có quyền đẩy toàn trang ra Logout
    // Nhưng ko còn cách nào khác, vì flow httpNext đúng là để đẩy logout
    if (error.digest.startsWith('NEXT_REDIRECT')) {
      throw error
    }
  }
  return <div>Dashboard {name}</div>
}
