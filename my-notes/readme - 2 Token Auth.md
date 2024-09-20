# Refresh token trong Next.js

Các API yêu cầu Authentication có thể được gọi ở 2 nơi

1. Server Component: Ví dụ page `/account/me` cần gọi API `/me` ở server component để lấy thông tin profile của user
2. Client Component: Ví dụ page `/account/me` cần gọi API `/me` ở client component để lấy thông tin profile của user

=> Hết hạn token có thể xảy ra ở Server Component và Client Component

## Các trường hợp hết hạn access token

### Đang dùng thì hết hạn:

Chúng ta sẽ không để trường hợp này xảy ra,
bằng cách có 1 `setinterval check token` liên tục để refresh token trước khi nó hết hạn

### Lâu ngày không vào web, vào lại thì hết hạn:

Khi vào lại website thì `middleware.ts` sẽ được gọi đầu tiên.
Chúng ta sẽ kiểm tra xem access token còn không (vì access token sẽ bị xóa khi hết hạn),
-> nếu không còn thì chúng ta sẽ gọi cho `redirect về page refresh client component `
-> useEffect trong page gọi API refresh token và redirect ngược về trang cũ (sẽ flash load navigate)

## Lưu ý để tránh bị bug khi thực hiện Đang dùng thì hết hạn

- Không để refresh token bị gọi duplicate
- Khi refresh token bị lỗi ở route handler => trả về 401 bất kể lỗi gì
- Khi refrest token bị lỗi ở _useEffect client => ngừng interval ngay_
- Đưa logic check vào layout ở trang authenticated:
  -> Không cho chạy refresh token ở những trang mà unauthenticated như: login, logout
- Kiểm tra logic flow trong middleware

# Combo phối hợp - key Elements AT - RT - Next proxy

=> 2 khái niệm là proxy Next + proxy Page

## middleware -> Proxy Next ROUTE (interceptor)

- chỉ có tác dụng điều phối set / clear token
- set thêm vào params xuống các proxy page ở FE

## http Next/Client + utils

- interceptor mọi request
- tiếp tục gọi vào proxy Next / page

## Proxy page

Logout Page + Refresh-Token Page  
=> Cấp page proxy nhận từ Next proxy trả thêm search params để validate

## AppProvider + RenewAccessToken

Pooling check expired liên tục, re-new ngầm
=> thuần client, chạy useEffect interval check để renew liên tục
=> áp dụng lên toàn app, concept cứ sau INTERVAL lại tính toán lại thời gian cảm thấy ko hay lắm
auto nhưng trade off quan trọng ở việc decode token lâu ko
hoặc có thể tối ưu bằng cache token khỏi decode token lại

# Google OAuth

## Step 1

cloud console -> create prj -> APIs - Services -> OAuth consent screen
External app -> fill vào, skip logo - khỏi verfify phiền Những trường ko required skip hết, mail thì lấy chính mail đang đăng kí
Scope -> chọn email và profile Có thể skip test user => vào lại dashboard -> chọn Publish App

## Step 2

Credentials -> create Credentials -> OAuth client Id Authorized redirect URIS -> multi được, cho local + development riêng ok http://localhost:[PORT]/api/auth/callback/google
