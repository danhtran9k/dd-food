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

## Private / public BE - endpoint

Đối với TH BE-endpoint nếu chấp nhận có những endpoint client được gọi trực tiếp
=> sẽ expose env ra public (`NEXT_PUBLIC_`)

# Layout component / global component

-> Cơ bản thì layout là 1 dạng global nhỏ
Tuy nhiên sẽ sửa lại, với các dạng global (ý nghĩa dùng chung) giờ sẽ đưa vào common hết
app-layout nhưng thực chất là layout trên từng page chứ ko theo nghĩa layout lớn toàn app
