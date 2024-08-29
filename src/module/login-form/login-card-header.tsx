import {
    CardDescription,
    CardHeader,
    CardTitle
} from '@core/app-shadcn/card'
  
export const LoginCardHeader = () => {
  return (
    <CardHeader>
      <CardTitle className='text-2xl'>Đăng nhập</CardTitle>
      <CardDescription>
        Nhập email và mật khẩu của bạn để đăng nhập vào hệ thống
      </CardDescription>
    </CardHeader>
  )
}
