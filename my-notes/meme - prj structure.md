# Quyền hạn các role trong dự án

- Owner: có quyền thao tác mọi chức năng quản lý trên hệ thống, ngoại trừ việc gọi api order với vai trò là Guest
- Employee: Tương tự Owner nhưng không có chức năng quản lý tài khoản nhân viên
- Guest: Chỉ có quyền tạo order

<!-- ============================== -->

# Request vs endpoint - ORIGIN

Đối với http instance, chỉ phân biệt origin gọi

- (.client) gọi từ client -> BE / next
- (.next / .server) chỉ gọi từ nextServer -> BE

Đối với endpoint, chỉ phân biệt nơi gọi tới

- (.next) Gọi vào next (chỉ có client gọi vào)
- (.server) Gọi vào BE (có thể từ client hoặc từ next gọi vào)
  -> dùng .client ở đây sẽ rất dể nhầm lẫn

=> Đối với endPoint gọi vào Next -> baseUrl fix
=> đối với endPoint gọi vào BE -> baseUrl có thể thay đổi
(liên quan tới việc getFullUrl)

## WARNING:

với TH của http ko thể tạo 1 file index.ts chung và export 1 server only + 1 chung ra

- sẽ báo lỗi, chấp nhận đường dẫn dài

## Private / public BE - endpoint

Đối với TH BE-endpoint nếu chấp nhận có những endpoint client được gọi trực tiếp
=> sẽ expose env ra public (`NEXT_PUBLIC_`)

<!-- ============================== -->

# Layout component / global component

-> Cơ bản thì layout là 1 dạng global nhỏ
Tuy nhiên sẽ sửa lại, với các dạng global (ý nghĩa dùng chung) giờ sẽ đưa vào common hết
app-layout nhưng thực chất là layout trên từng page chứ ko theo nghĩa layout lớn toàn app

<!-- ============================== -->

# Với vấn đề socket

- code cũ setup quá tệ tự lấy jwt localStorage vào auth cho socket
- Phát sinh vấn đề logout - login thì cùng app, socket instance chỉ khởi tạo 1 lần

Phải override lại auth của socket hoặc tạo 1 instance mới
Tuy nhiên có 1 solution rất đơn giản là tracking qua cookie Header của socket

<!-- ============================== -->

# Đa ngôn ngữ trong Next.js

Rộng hơn đa ngôn ngữ thì chúng ta có "Quốc tế hóa": đa ngôn ngữ, đa múi giờ, đa định dạng số,...
Quốc tế hóa = Internationalization = i18n (18 là số lượng ký tự giữa i và n)

Khi làm 1 website đa ngôn ngữ thì phải có sự phối hợp giữa Frontend và Backend.
FrontEnd xử lý text cố định, Backend xử lý nội dụng API
-> nếu xác định scale lớn ngay từ đầu BE phải thiết kế db support đa ngôn ngữ trước

- nếu ko mở rộng về sau khó
- Trick dùng google dịch api để khác phục khuyết điểm ko tính scale lúc đầu

## 2 style đa ngôn ngữ trong phạm vi Next JS

- i18n Routing: Mỗi ngôn ngữ sẽ có 1 route riêng. Ví dụ `duthanhduoc.com/en`, `duthanhduoc.com/vi`, hoặc `en.duthanhduoc.com`, `vi.duthanhduoc.com`
- i18n không Routing: Mỗi ngôn ngữ sẽ không có route riêng, mà sẽ dựa vào ngôn ngữ hiện tại để hiển thị nội dung tương ứng.

i18n Routing sẽ tốt hơn cho SEO, vì sẽ có mỗi version website riêng cho từng quốc gia.
i18n không Routing sẽ dễ làm hơn, nếu website bạn chỉ phục vụ trong quốc gia bạn thì nên làm cái này.

### Đối với style ko route

Nếu làm kiểu truyền thống qua state thì ko ổn thì mọi text đều cần state -> use client global ??
Nếu dùng kiểu server action thì kéo theo toàn app dynamic rendering vẫn ảnh hưởng
=> ko tối ưu và tận dụng được sức mạnh của Next
