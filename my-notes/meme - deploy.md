# Build step note

- package sharp dùng cho production tối ưu image

## With i18n

Khi dùng Suspense thì sẽ bị vô hiệu hóa ssr
Có 1 trick là dùng 1 component logic ảo để setState params vào và chỉ cần bọc suspense cho chính nó
Chưa rõ có ảnh hưởng gì nặng ko nhưng cứ tạm vậy trước

Thêm lưu ý là component logic này ko nên lạm dụng, có vài page PROXY ui ko quan trọng ko cần dùng
Phải check build file mới biết chính xác setup có hiệu quả hay ko

useSearchParams() -> xài khá nhiều trong table Pagination

# Google OAuth

## Step 1

cloud console -> create prj -> APIs - Services -> OAuth consent screen
External app -> fill vào, skip logo - khỏi verfify phiền Những trường ko required skip hết, mail thì lấy chính mail đang đăng kí
Scope -> chọn email và profile Có thể skip test user => vào lại dashboard -> chọn Publish App

## Step 2

Credentials -> create Credentials -> OAuth client Id Authorized redirect URIS -> multi được, cho local + development riêng ok http://localhost:[PORT]/api/auth/callback/google

# SEO

## Cơ bản về SEO

- SEO là viết tắt của Search Engine Optimization => tối ưu hóa công cụ tìm kiếm.

- Mục tiêu là giúp website đạt thứ hạng cao khi người dùng search các từ khóa trên Google, Bing, Yahoo, ...

- SEO không chỉ tồn tại ở website, nó có thể là SEO Video Youtube, SEO App trên Google Play

- SEO chia làm 2 loại

  - SEO Onpage: Tối ưu cấu trúc web (SSR, đi link thông minh, meta, title, h1, h2, h3, ảnh, video)
  - SEO Offpage: Backlink, Traffic,...

- Content is King, Backlink is Queen

## Fact về SEO

- SEO được coi là 1 ngành nghề riêng biệt, dev web thì nên biết về SEO để đưa chọn công nghệ cho đúng, nhưng không cần chuyên sâu SEO.

- Web quản lý thì không cần tập trung vào SEO

- SEO onpage tốt nhưng content dỡ thì cũng không lên được TOP

- SEO là free, nhưng để lên được TOP thì cần rất nhiều công sức, thời gian, tiền bạc => Hiện nay SEO không dành cho nhà nghèo

- Việc bạn lên top hay không không chỉ phụ thuộc vào web bạn, còn phụ thuộc vào chính sách Google và sự cạnh tranh của từ khóa đó

- Client side rendering SEO không tốt, những trang cần SEO thì nên là Server side rendering

- Next.js PR là tốt cho SEO, nhưng thật sự chỉ là cải thiện SEO của React thôi. Chứ so với việc dùng Multiple page truyền thống thì thật sự Next.js kém hơn. Lý do chủ yếu nằm ở việc hạn chế kỹ thuật trong framework Next.js và tốc độ load trang chậm, JS bundle lớn.

- Đừng tin vào điểm SEO Google Lighthouse => Nó không mạnh về SEO

## Checklist SEO

- Content nào muốn SEO thì viewsource phải thấy
- Page phải đầy đủ thẻ các thẻ title, meta description
- Cung cấp Open Graph phục vụ các mạng xã hội Facebook, Twitter (cái này chỉ cần ở mức độ cơ bản là được)
- Thêm các metadata file: robots.txt, sitemap.xml, favicon.ico
- Thêm website vào google search console, google analytics
