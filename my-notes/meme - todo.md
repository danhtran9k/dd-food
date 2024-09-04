# Re-write

## Global React - query handle post api

handleErrorApi
handle global việc show toast noti

onSuccess -> toast noti -> global ?

## CSS responsive swap element

Check lại css ẩn hiện ele khi mobile
-> vì là 1 cụm ele liên quan nhau => rất nên đưa vào 1 file

Kiểu logic chồng, nếu theo style của tailwind atomic thì ko hình dung được scopeshee

-> check lại logic css chỗ header-bar và side-manage-bar
-> phần sheet
=> cùng vấn đề tương tự với facenext

# Vids Incomplete

Vid 41 -> toàn vid giải thích việc -1 vào utils nhưng source code cuối ko xài
Setup Provider tại sao ?
middleware set thêm param clear token
AppProvider sẽ bọc 1 wrapper setIsAuth(boolean) kết hợp modified localStorage

Chặn cố tình vào refreshToken mà ko có token đúng thì tự về root
-> path này đúng ra chỉ cho next middleware gọi vào kèm với redirect url xử lý case mất AT còn RT
Page logout vì catch case tương tự nên phải set lại điều kiện

Page login tạo ra 1 hook để đón param clear-token tù middleware
