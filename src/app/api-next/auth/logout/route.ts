import { cookies } from 'next/headers'

import { SERVER_API } from '@app/api-next/_core/api-endpoint'
import { httpNext } from '@app/api-next/_core/http/http.next'

type TLogoutPayload = {
  accessToken: string
  refreshToken: string
}

const logoutFn = ({ accessToken, refreshToken }: TLogoutPayload) =>
  httpNext('POST', SERVER_API.LOGOUT.api(), {
    body: {
      refreshToken
    },
    options: {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  })

// TODO: Logic Proxy xử lý ở Cookie nhưng FE lại có lưu kèm ở localStorage
// Ngoài ra ko gọi BE thành công nhưng vẫn xóa cookie ??
// Nếu db dùng Session thì có thể bị kẹt key lại -> lỗ hổng
export async function POST() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')?.value
  const refreshToken = cookieStore.get('refreshToken')?.value
  // Next đóng vai trò Proxy sẽ tự xóa cookie ở client
  // Ko quan tâm db gọi có thành công hay ko ??
  cookieStore.delete('accessToken')
  cookieStore.delete('refreshToken')

  if (!accessToken || !refreshToken) {
    return Response.json(
      {
        message: 'Không nhận được access token hoặc refresh token'
      },
      {
        // TODO: có nên gọi db thành công rồi mới xóa cookie ko?
        // Logic FE vẫn có chứa 1 key dup ở localStorage nữa
        status: 200
      }
    )
  }

  try {
    const result = await logoutFn({ accessToken, refreshToken })
    return Response.json(result.payload)
  } catch (error) {
    return Response.json(
      {
        message: 'Lỗi khi gọi API đến server backend'
      },
      {
        status: 200
      }
    )
  }
}
