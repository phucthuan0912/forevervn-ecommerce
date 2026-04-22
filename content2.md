
TRƯỜNG ĐẠI HỌC SƯ PHẠM KHOA TOÁN-TIN









BÁO CÁO THỰC TẬP TỐT NGHIỆP NGÀNH CÔNG NGHỆ THÔNG TIN
ĐỀ TÀI

NGHIÊN CỨU LẬP TRÌNH DI ĐỘNG TRÊN NỀN TẢNG ANDROID ĐỂ XÂY DỰNG ỨNG DỤNG TÌM KIẾM VIỆC LÀM CÔNG NGHỆ THÔNG TIN BẰNG FRAMEWORK FLUTTER VÀ NGÔN NGỮ LẬP TRÌNH DART






Giảng viên hướng dẫn:	TS. Nguyễn Thị Ngọc Anh
Tên sinh viên:	Lê Thị Trang
Lớp:	21CNTT2


Đà Nẵng, tháng 05 năm 2025
 
.................................................................................................................................
.................................................................................................................................
.................................................................................................................................
.................................................................................................................................
.................................................................................................................................
.................................................................................................................................
.................................................................................................................................
.................................................................................................................................
.................................................................................................................................
.................................................................................................................................
.................................................................................................................................
.................................................................................................................................
.................................................................................................................................
.................................................................................................................................
.................................................................................................................................
.................................................................................................................................
.................................................................................................................................
.................................................................................................................................
.................................................................................................................................
.................................................................................................................................
.................................................................................................................................
.................................................................................................................................
.................................................................................................................................
Đà Nẵng, ngày … tháng … năm …
Cán bộ hướng dẫn
 
.................................................................................................................................
.................................................................................................................................
.................................................................................................................................
.................................................................................................................................
.................................................................................................................................
.................................................................................................................................
.................................................................................................................................
.................................................................................................................................
.................................................................................................................................
.................................................................................................................................
.................................................................................................................................
.................................................................................................................................
.................................................................................................................................
.................................................................................................................................
.................................................................................................................................
.................................................................................................................................
.................................................................................................................................
.................................................................................................................................
.................................................................................................................................
.................................................................................................................................
.................................................................................................................................
.................................................................................................................................
.................................................................................................................................
Đà Nẵng, ngày … tháng … năm …
Hội đồng phản biện
 
Em tên là Lê Thị Trang – 21CNTT2. Chúng em xin cam đoan đây là đề tài do em thực hiện. Các nội dung và kết quả nghiên cứu được trình bày trong báo cáo tốt nghiệp này là trung thực và mọi tham khảo đều được trích dẫn, chỉ rõ nguồn tham khảo theo đúng quy định.



Sinh viên thực hiện




Lê Thị Trang
 
LỜI CẢM ƠN
Đầu tiên, em xin chân thành cảm ơn Quý Thầy/Cô trong khoa Tin học, Trường Đại học Sư phạm – Đại học Đà Nẵng, những người đã tận tâm truyền đạt tri thức, định hướng và đồng hành cùng em trong suốt chặng đường học tập. Nhờ sự chỉ bảo tận tình của Quý Thầy/Cô, em đã trang bị được nền tảng kiến thức vững chắc về Công nghệ Thông tin, giúp em tự tin bước tiếp trên con đường nghiên cứu, ứng dụng và sáng tạo các sản phẩm hữu ích phục vụ xã hội.
Với lòng kính trọng và biết ơn sâu sắc, em xin gửi lời cảm ơn đến giảng viên hướng dẫn, TS. Nguyễn Thị Ngọc Anh đã tận tình giúp đỡ chúng em từ những bước đầu tiên khi xây dựng ý tưởng nghiên cứu, đề cương cũng như trong suốt quá trình thực hiện và hoàn thiện báo cáo tốt nghiệp này.
Em cũng xin gửi lời cảm ơn chân thành tới anh/chị đồng nghiệp ở đơn vị thực tập Công Ty Cổ Phần Công Nghệ Thông Tin Toàn Cầu Xanh đã cho phép, tạo điều kiện thuận lợi và giúp đỡ em trong thời gian học tập và nghiên cứu thực hiện báo cáo tốt nghiệp. Sự hướng dẫn và hỗ trợ của anh/chị đồng nghiệp trong suốt thời gian này thực sự là động lực quý báu cho sự phát triển của em.
Mặc dù em đã nổ lực hết mình để hoàn thành báo cáo tốt nghiệp nhưng do giới hạn về thời gian và năng lực, báo cáo này sẽ không tránh khỏi những thiếu sót. Chúng em rất mong nhận được sự thông cảm, góp ý và sự chỉ bảo tận tình từ Quý Thầy/Cô để báo cáo được hoàn thiện nhất.
Em xin chân thành cảm ơn!
Sinh viên thực hiện



Lê Thị Trang
 


MỤC LỤC
 
NHẬN XÉT CỦA CÁN BỘ HƯỚNG DẪN	2
MỤC LỤC	6
DANH MỤC BẢNG BIỂU	10
DANH MỤC HÌNH VẼ	11
LỜI MỞ ĐẦU	14
1.	Lý do chọn đề tài	14
2.	Mục tiêu nghiên cứu	14
3.	Đối tượng và phạm vi nghiên cứu	14
3.1.	Đối tượng nghiên cứu	14
3.2.	Phạm vi nghiên cứu	15
4.	Phương pháp nghiên cứu	15
5.	Ý nghĩa của đề tài	15
6.	Bố cục của đề tài	16
7.	Đóng góp của đồ án	16
CHƯƠNG I: CƠ SỞ LÝ THUYẾT	17
1.1	Tổng quan về ngôn ngữ Dart	17
1.1.1	Khái niệm của Dart	17
1.1.2	Lịch sử hình thành ngôn ngữ Dart	17
1.1.3	Tại sao sử dụng ngôn ngữ Dart	17
1.1.4	Tính năng của Dart	18
1.2	Tổng quan về framework Flutter	19
1.2.1	Khái niệm của Flutter	19
1.2.2	Kiến trúc của Flutter	20
1.2.3	Đặc điểm của Flutter	21
1.2.3.1	Cấu trúc của Flutter	21
1.2.3.2	Ngôn ngữ lập trình được sử dụng trong Flutter	22
1.2.4	Tính năng của Flutter	22
1.2.5	Ưu và nhược điểm của Flutter	23
1.2.5.1	Ưu điểm của Flutter	23
1.2.5.2	Nhược điểm của Flutter	23
1.3	Giới Thiệu tổng quan về cơ sở dữ liệu Supabase Storage	24
1.3.1	Supabase là gì?	24
1.3.2	Ưu điểm và nhược điểm của Supabase	24
1.4	Hệ quản trị cơ sở dữ liệu PostgeSQL	25
1.4.1	Khái niệm về PostgeSQL	25
1.4.2	Tính năng của PostgeSQL	25
1.4.3	Vai trò của PostgeSQL	26
1.4.4	So sánh PostgeSQL và MySQL	26
CHƯƠNG 2 PHÂN TÍCH VÀ THIẾT KẾ HỆ THỐNG	31
2.1	Phân tích yêu cầu đề tài	31
2.1.1	Phát biểu bài toán	31
2.1.2	Yêu cầu bài toán	31
2.1.2.1	Yêu cầu chức năng	31
2.1.2.2	Yêu cầu phi chức năng	33
2.2	Nghiên cứu hiện trạng	33
2.3	Đặc tả hệ thống	37
2.4	Biểu đồ ca sử dụng	38
2.4.1	Ca sử dụng (usecase)	38
2.4.2	Tác nhân (Actor)	39
2.4.3	Đặc tả ca sử dụng	39
2.4.4	Biểu đồ ca sử dụng	39
2.4.5	Biểu đồ ca sử dụng của hệ thống	40
2.5	Biểu đồ hoạt động	40
2.5.1	Biểu đồ hoạt động đăng kí	42
2.5.2	Biểu đồ hoạt động đăng nhập	44
2.5.3	Biểu đồ hoạt động khôi phục mật khẩu	44
2.5.4	Biểu đồ hoạt động tìm kiếm việc làm	46
2.5.5	Biểu đồ hoạt động ứng tuyển trực tuyến	47
2.5.6	Biểu đồ hoạt động quản lý hồ sơ	48
2.5.7	Biểu đồ hoạt động sửa bài tuyển dụng	50
2.5.8	Biểu đồ hoạt động xóa bài tuyển dụng	51
2.5.9	Biểu đồ hoạt động ẩn bài tuyển dụng	51
2.5.10	Biểu đồ hoạt động quản trị duyệt bài tuyển dụng	53
2.5.11	Biểu đồ hoạt động quản trị ẩn bài tuyển dụng	54
2.5.12	Biểu đồ hoạt động quản trị xóa bài tuyển dụng	54
2.5.13	Biểu đồ hoạt động quản trị quản lý tài khoản người dùng	56
2.5.14	Biểu đồ hoạt động quản trị quản lý tài khoản doanh nghiệp	57
2.6	Biểu đồ tuần tự	57
2.6.1	Biểu đồ tuần tự đăng kí	61
2.6.2	Biểu đồ tuần tự đăng nhập	61
2.6.3	Biểu đồ tuần tự khôi phục mật khẩu	63
2.6.4	Biểu đồ tuần tự tìm kiếm việc làm	63
2.6.5	Biểu đồ tuần tự ứng tuyển trực tuyến	65
2.6.6	Biểu đồ tuần tự quản lý hồ sơ	66
2.6.7	Biểu đồ tuần tự thêm bài tuyển dụng	67
2.6.8	Biểu đồ tuần tự chỉnh sửa bài tuyển dụng	67
2.6.9	Biểu đồ tuần tự ẩn bài tuyển dụng	68
2.6.10	Biểu đồ tuần tự quản trị duyệt bài tuyển dụng	68
2.6.11	Biểu đồ tuần tự quản trị ẩn bài tuyển dụng	70
2.6.12	Biểu đồ tuần tự quản trị xóa bài tuyển dụng	71
2.6.13	Biểu đồ tuần tự quản trị quản lý tài khoản người dùng	71
2.6.14	Biểu đồ tuần tự quản trị quản lý tài khoản doanh nghiệp	73
2.7	Thiết kế cơ sở dữ liệu	73
2.7.1	Thiết kế bảng dữ liệu	73
2.7.2	Mô hình thực thể liên kết	76
2.7.3	Thiết kế biểu đồ lớp	76
2.7.4	Mô hình cơ sở dữ liệu	77
CHƯƠNG 3 CÀI ĐẶT CHƯƠNG TRÌNH VÀ KẾT QUẢ	78
3.1	Cài đặt chương trình	78
3.1.1	Môi trường triển khai	78
3.2	Kết quả chương trình	78
3.2.1	Màn hình splash	78
3.2.2	Giao diện onboarding	79
3.2.3	Giao diện đăng ký người dùng và nhà tuyển dụng	80
3.2.4	Giao diện đăng nhập	81
3.2.5	Giao diện quên mật khẩu	82
3.2.6	Giao diện trang chủ	83
3.2.7	Giao diện xem tất cả	84
3.2.8	Giao diện chi tiết công việc	85
3.2.9	Giao diện tìm kiếm	86
3.2.10	Giao diện danh sách công việc yêu thích	87
3.2.11	Giao diện thay đổi thông tin	88
3.2.12	Giao diện đổi mật khẩu	89
3.2.13	Giao diện thay đổi ngôn ngữ	90
3.2.14	Giao diện đăng xuất	91
3.2.15	Giao diện trang chủ doanh nghiệp	92
3.2.16	Giao diện đăng tải công việc	93
3.2.17	Giao diện chi tiết công việc ở vai trò doanh nghiệp	94
3.2.18	Giao diện chỉnh sửa công việc	95
3.2.19	Giao diện xoá công việc	96
3.2.20	Giao diện quản lý hồ sơ doanh nghiệp	97
3.2.21	Giao diện trang quản trị viên	98
3.2.22	Giao diện chức năng duyệt bài đăng	99
3.2.23	Giao diện quản lý tài khoản người dùng	100
3.2.24	Giao diện quản lý màn hình doanh nghiệp	101
3.2.25	Giao diện khóa tài khoản doanh nghiệp	102
CHƯƠNG 4 KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN	104
4.1	Kết quả đạt được	104
4.2	Hạn chế của đề tài	104
4.3	Hướng phát triển	105
TÀI LIỆU THAM KHẢO	107
 
DANH MỤC BẢNG BIỂU
Bảng 1 So sánh PostgeSQL và MySQL	26
Bảng 2 Đặc tả hệ thống	38
Bảng 3 Thực thể Account	74
Bảng 4 Thực thể Users	74
Bảng 5 Thực thể Business	75
Bảng 6 Thực thể Jobs	75
 
DANH MỤC HÌNH VẼ
Hình 1 Tính năng của ngôn ngữ Dart	18
Hình 2	18
Hình 3 Kiến trúc của Flutter	20
Hình 4	20
Hình 5 Cơ sở dữ liêu Supabase	24
Hình 6 Khảo sát nhóm người sử dụng	34
Hình 7 Khảo sát kinh nghiệm làm việc	34
Hình 8 Khảo sát loại công việc	34
Hình 9 Khảo sát các kênh tìm kiếm việc làm	35
Hình 10 Khảo sát khó khăn khi tìm việc	35
Hình 11 Khảo sát mong muốn của người dùng	35
Hình 12 Khảo sát tình trạng người dùng	35
Hình 13 Khảo sát mong muốn trong ứng dụng	36
Hình 14 Khảo sát lĩnh vực của công ty	36
Hình 15 Khảo sát các vị trí tuyển dụng	36
Hình 16 Khảo sát khó khăn khi tuyển dụng	36
Hình 17 Khảo sát những tính năng mong muốn	37
Hình 18 Khảo sát trả phí cho dịch vụ tuyển dụng	37
Hình 19 Các kí hiệu của biểu đồ ca sử dụng	40
Hình 20 Biểu đồ ca sử dụng của hệ thống	40
Hình 21 Kí hiệu các hoạt động trong biểu đồ hoạt động	41
Hình 22 Kí hiệu đồng hoá các hoạt động trong biểu đồ hoạt động	41
Hình 23 Kí hiệu đồng hoá có điều kiện trong biểu đồ hoạt động	41
Hình 24 Kí hiệu quyết định trong biểu đồ hoạt động	42
Hình 25 Kí hiệu quyết định kết hợp trong biểu đồ hoạt động	42
Hình 26 Biểu đồ hoạt động đăng kí	43
Hình 27 Biểu đồ hoạt động đăng nhập	44
Hình 28 Biểu đồ hoạt động khôi phục mật khẩu	45
Hình 29 Biểu đồ hoạt động tìm kiếm việc làm	46
Hình 30 Biểu đồ hoạt động ứng tuyển trực tuyến	47
Hình 31 Biểu đồ hoạt động quản lý hồ sơ	48
Hình 32 Biểu đồ hoạt động thêm bài tuyển dụng	49
Hình 33 Biểu đồ hoạt động chỉnh sửa bài tuyển dụng	50
Hình 34 Biểu đồ hoạt động xóa bài tuyển dụng	51
Hình 35 Biểu đồ hoạt động ẩn bài tuyển dụng	52
Hình 36 Biểu đồ hoạt động quản trị duyệt bài tuyển dụng	53
Hình 37 Biểu đồ hoạt động quản trị ẩn bài tuyển dụng	54
Hình 38 Biểu đồ hoạt động quản trị xóa bài tuyển dụng	55
Hình 39 Biểu đồ hoạt động quản trị quản lý tài khoản người dùng	56
Hình 40 Biểu đồ hoạt động quản trị quản lý tài khoản doanh nghiệp	57
Hình 41 Kí hiệu đối tượng trong biểu đồ tuần tự	58
Hình 42 Kí hiệu thời gian hoạt động trong biểu đồ tuần tự	58
Hình 43 Kí hiệu cách gửi thông điệp trong biểu đồ tuần tự	58
 
Hình 44 Kí hiệu thông điệp trả về trong biểu đồ tuần tự	58
Hình 45 Kí hiệu thông điệp gửi trong biểu đồ tuần tự	59
Hình 46 Kí hiệu tạo/huỷ phương thức trong biểu đồ tuần tự	59
Hình 47 Kí hiệu lặp thông điệp trong biểu đồ tuần tự	59
Hình 48 Kí hiệu lặp thông điệp có điều kiện trong biểu đồ tuần tự	59
Hình 49 Kí hiệu gửi phụ thuộc có điều kiện trong biểu đồ tuần tự	60
Hình 50 Kí hiệu đệ quy trong biểu đồ tuần tự	60
Hình 51 Biểu đồ tuần tự đăng kí	61
Hình 52 Biểu đồ tuần tự đăng nhập	62
Hình 53 Biểu đồ tuần tự khôi phục mật khẩu	63
Hình 54 Biểu đồ tuần tự tìm kiếm việc làm	64
Hình 55 Biểu đồ tuần tự ứng tuyển trực tuyến	65
Hình 56 Biểu đồ tuần tự quản lý hồ sơ	66
Hình 57 Biểu đồ tuần tự thêm bài tuyển dụng	67
Hình 58 Biểu đồ tuần tự chỉnh sửa bài tuyển dụng	67
Hình 59 Biểu đồ tuần tự ẩn bài tuyển dụng	68
Hình 60 Biểu đồ tuần tự quản trị duyệt bài tuyển dụng	69
Hình 61 Biểu đồ tuần tự quản trị ẩn bài tuyển dụng	70
Hình 62 Biểu đồ tuần tự quản trị xóa bài tuyển dụng	71
Hình 63 Biểu đồ tuần tự quản trị quản lý tài khoản người dùng	72
Hình 64 Biểu đồ tuần tự quản trị quản lý tài khoản doanh nghiệp	73
Hình 65 Mô hình thực thể liên kết	76
Hình 66 Biểu đồ lớp của hệ thống	76
Hình 67 Sơ đồ quan hệ cơ sở dữ liệu	77
Hình 68 Giao diện splash	79
Hình 69 Màn hình onboarding1	80
Hình 70 Màn hình onboarding2	80
Hình 71 Màn hình onboarding3	80
Hình 72 Màn hình đăng ký tài khoản user	81
Hình 73 Màn hình tạo tài khoản nhà tuyển dụng	81
Hình 74 Màn hình đăng nhập	82
Hình 75 Màn hình quên mật khẩu	83
Hình 76 Màn hình trang chủ 1	84
Hình 77 Màn hình trang chủ 2	84
Hình 78 Màn hình công việc phổ biến	85
Hình 79 Màn hình công việc gần đây	85
Hình 80 Màn hình chi tiết công việc	86
Hình 81 Giao diện tìm kiếm	87
Hình 82 Màn hình tìm kiếm	87
Hình 83 Màn hình yêu thích công việc khi rỗng	88
Hình 84 Màn hình yêu thích công việc	88
Hình 85 Màn hình thay đổi thông tin người dùng	89
Hình 86 Màn hình sau khi update xong	89
Hình 87 Màn hình đổi mật khẩu	90
Hình 88 Màn hình đang thay đổi mật khẩu	90
 
Hình 89 Màn hình chọn ngôn ngữ tiếng anh	91
Hình 90 Màn hình chọn ngôn ngữ tiếng việt	91
Hình 91 Màn hình có giao diện log out	92
Hình 92 Màn hình log out	92
Hình 93 Màn hình trang chủ doạnh nghiệp	93
Hình 94 Màn hình đăng tải công việc	94
Hình 95 Màn hình chi tiết công việc	95
Hình 96 Màn hình ẩn công việc	95
Hình 97 Màn hình chỉnh công việc (1)	96
Hình 98 Màn hình chỉnh công việc (2)	96
Hình 99 Màn hình xoá công việc (1)	97
Hình 100 Màn hình xóa công việc (2)	97
Hình 101 Màn hình quản lí hồ sơ doanh nghiệp	98
Hình 102 Màn hình quản lý bài đăng(1)	99
Hình 103 Màn hình quản lý bài đăng(2)	99
Hình 104 Màn hình duyệt bài tuyển dụng	100
Hình 105 Màn hình xác nhận duyệt bài tuyển dụng	100
Hình 106 Màn hình quản lý tài khoản user	101
Hình 107 Màn hình quản lý tài khoản recruiter	101
Hình 108 Màn hình quản lý doanh nghiệp	102
Hình 109 Màn hình khóa tài khoản doanh nghiệp	103
 
LỜI MỞ ĐẦU
1.	Lý do chọn đề tài
Trong thời kì chuyển đổi kỹ thuật số hiện nay, khi công nghệ thông tin ngày càng phát triển mạnh mẽ, tạo ra nhu cầu lớn về nguồn lực chất lượng. Song song với đó, việc kết nối giữa nhà tuyển dụng và ứng viên trong lĩnh vực công nghệ thông tin vẫn còn gặp nhiều thách thức. Các ứng dụng hỗ trợ tìm kiếm việc làm công nghệ thông tin đang ngày càng trở nên quan trọng để đáp ứng nhu cầu của nhà tuyển dụng và người tìm việc.
Android với thị phần lớn trên toàn cầu và đặc biệt phổ biến tại Việt Nam, là nền tảng được ưu tiên phát triển ứng dụng. Việc tập trung vào nền tảng này không chỉ giúp ứng dụng dễ dàng tiếp cận với số lượng lớn người dùng mà còn đảm bảo chi phí phát triển hiệu quả. Việc xây dựng một ứng dụng tìm kiếm việc làm chuyên biệt cho ngành công nghệ thông tin trên nền tảng Android là một hướng đi thiết thực và có ý nghĩa.Từ những lí do xuất phá từ thực tiễn kết hợp với các kiến thức về lập trình di động và mong muốn áp dụng những công nghệ hiện đại, em đã quyết định chọn đề tài “Nghiên cứu lập trình di động trên nền tảng Android để xây dựng ứng dụng tìm kiếm việc làm công nghệ thông tin bằng framework Flutter và ngôn ngữ lập trình Dart” Đề tài tập trung phát triển ứng dụng trên nền tảng Android, tạo ra một công cụ hỗ trợ hiệu quả cho người tìm việc trong lĩnh vực công nghệ thông tin, giúp kết nối nhanh chóng với nhà tuyển dụng.
Em hy vọng rằng đề tài nghiên cứu này sẽ không chỉ đáp ứng được nhu cầu thực tế của thị trường lao động trong ngành công nghệ thông tin, mà còn giúp em nâng cao năng lực chuyên môn và kỹ năng phát triển phần mềm trên nền tảng di động Android.
2.	Mục tiêu nghiên cứu
Mục tiêu của đồ án là tạo ra một sản phẩm hữu ích kết nối giữa nhà tuyển dụng và người tìm việc. Các mục tiêu cụ thể của đề tài gồm:
-	Nghiên cứu công nghệ lập trình di động đa nền tảng.
-	Đảm bảo tính hiệu quả và khả năng mở rộng của ứng dụng
-	Phát triển kỹ năng lập trình và nghiên cứu công nghệ di động
-	Lập kế hoạch và chuẩn bị cho việc mở rộng sang iOS
-	Ứng dụng ngôn ngữ Dart và công nghệ Flutter vào xây dựng ứng dụng di động cho tìm kiếm việc làm .
-	Tạo ra một giải pháp kết nối ứng viên và nhà tuyển dụng trong ngành IT
-	Tối ưu hóa hiệu suất và bảo mật người dùng
3.	Đối tượng và phạm vi nghiên cứu
3.1.	Đối tượng nghiên cứu
-	Tập trung nghiên cứu chủ yếu công nghệ sử dụng xây dựng app chủ yếu sử dụng framework Flutter, và các thư viện hỗ trợ xây dựng app khác ...
 

-	Nghiên cứu thị trường làm việc hiện nay tại Việt Nam như các doanh nghiệp cần tuyển dụng ( số lượng tuyển dụng, nhu cầu tuyển dụng, yêu cầu,...) và nhu càu cần tìm kiếm việc làm của xã hội ngày nay.
3.2.	Phạm vi nghiên cứu
-	Phần quan trọng nhất của nghiên cứu sẽ tập trung vào việc phát triển ứng dụng tìm kiếm việc làm trực tuyến. Các chức năng chính bao gồm tìm kiếm công việc, ứng tuyển trực tuyến, quản lý hồ sơ, và cung cấp thông tin chi tiết về các việc làm.
-	Đối tượng nghiên cứu sẽ xây dựng ứng dụng sử dụng framework Flutter để đạt được sự linh hoạt và tích hợp trên nền tảng di động đa dạng, bao gồm cả Android và iOS.
-	Nghiên cứu sẽ tập trung vào cách sử dụng cơ sở dữ liệu Supabase để lưu trữ và quản lý thông tin về người tìm việc, nhà tuyển dụng, và các việc làm. Điều này bao gồm cả thiết kế cơ sở dữ liệu và quá trình tương tác với AP trong ứng dụng Flutter.
-	Phạm vi cũng bao gồm việc nghiên cứu và triển khai các biện pháp an toàn và bảo mật thông tin trong ứng dụng để bảo vệ thông tin cá nhân của người tìm việc và nhà tuyển dụng.
4.	Phương pháp nghiên cứu
-	Phương pháp lý thuyết: Nghiên cứu các tài liệu liên quan đến các nội dung nghiên cứu: Tài liệu về các ngôn lập trình, các framework Flutter, các nhu cầu của nhà tuyển dụng, người tìm việc.
-	Phương pháp thực nghiệm: kiểm tra và thử nghiệm các công nghệ được lựa chọn như flutter, supabase và các thư viện hỗ trợ. Các tính năng của ứng dụng như tìm kiếm công việc, ứng tuyển trực tuyến, quản lý hồ sơ sẽ được thử nghiệm với người dùng thực tế để đánh giá tính khả thi và hiệu quả. Đồng thời phương pháp này cũng bao gồm kiểm tra bảo mật thông tin và kiểm thử hiệu suất ứng dụng để đảm bảo ứng dụng hoạt động mượt và bảo vệ dữ liệu người dùng.
5.	Ý nghĩa của đề tài
Đề tài có ý nghĩa thực tiễn quan trọng khi góp phần giải quyết nhu cầu tìm kiếm việc làm và tuyển dụng trong lĩnh vực Công Nghệ Thông Tin, một lĩnh vực đáng phát triển mạnh mẽ ở Việt Nam nói riêng và thế giới nói chung. Ứng dụng được xây dựng hỗ trợ kết nối hiệu quả giữa người tìm việc và nhà tuyển dụng, giúp tiết kiệm thời gian và tối ưu hóa quá trình tuyển dụng. Đề tài cung cấp kiến thức về việc sử dụng framework Flutter để phát triể ứng dụng di động đa nền tảng, kết hợp với Supabase để quản lý cơ sở dữ liệu và triển khai các biện pháp bảo mật thông tin. Đât là mình chứng cho việc áp dụng công nghệ tiên tiến vào thực tiễn, tạo tiền đề cho các nghiên cứu và ứng dụng tương lai. Ngoài ra, đề tài góp phần thúc đẩy sự phát triển hệ sinh thái việc làm, giúp giảm khoảng cách giữa cung và cầu lao động.
 

6.	Bố cục của đề tài
Trên cơ sở các nội dung nghiên cứu, để đạt mục tiêu đề ra và đảm bảo tính logic, ngoài phần mở đầu và phần kết luận, đồ án được tổ chức thành các chương như sau:
Chương 1. Cơ sở lý thuyết. Chương này trình bày kết quả nghiên cứu về lập trình đa nền tảng; trình bày các cơ sở lí thuyết về ngôn ngữ lập trình: Dart, cùng framework Flutter, Supabase được sử dụng trong việc xây dựng đề tài.
Chương 2: Phân tích và thiết kế hệ thống. Chương này giới thiệu bài toán và đưa ra các mô hình hệ thống; đề xuất các ý tưởng, chức năng cho phần mềm; trình bày các mô hình thực thể quan hệ, sơ đồ phân cấp chức năng. Phân tích chi tiết các chức năng của người sử dụng và người quản lí; thiết kế giao diện người dùng và thiết dữ liệu, chức năng cho hệ thống.
Chương 3: Cài đặt chương trình và kết quả. Trong chương này, nêu kết quả thực hiện được của đề tài và trình bày cách cài đặt chương trình.
7.	Đóng góp của đồ án
Trong đồ án thực tập tốt nghiệp này, em đã vận dụng linh hoạt những kiến thức đã được học trên giảng đường để thực hiện đề tài. Bên cạnh đó, em cũng đã cùng nhau trao đổi, bàn bạc, đưa ra ý tưởng và đề xuất hướng các tác vụ của người dùng cùng với đơn vị thực tập, nhằm xây dựng một đồ án thực tập tốt nghiệp hoàn chỉnh cũng như một sản phẩm thân thiện cho người sử dụng. Những đóng góp chính của đồ án thực tập tốt nghiệp:
-	Đối với người tìm việc là nhóm người dùng chính của hệ thống, đóng vai trò tìm kiếm và ứng tuyển vào các công việc phù hợp trong lĩnh vực công nghệ thông tin. Họ sử dụng ứng dụng để tìm kiếm việc làm thông qua các bộ lọc như vị trí, kỹ năng, mức lương, kinh nghiệm. Ngoài ra, người tìm việc có thể tạo và quản lý hồ sơ cá nhân (CV, chứng chỉ, kỹ năng), gửi hồ sơ ứng tuyển trực tuyến và theo dõi trạng thái ứng tuyển. Hệ thống cung cấp thông báo tự động về các cơ hội làm việc phù hợp, giúp người tìm việc dễ dàng quản lý quá trình tìm việc làm một cách phù hợp.
-	Đối với người tuyển dụng là nhóm người sử dụng có vai trò tìm kiếm và quản lý người tìm việc phù hợp với nhu cầu nhân sự của doanh nghiệp. Họ có thể tạo và đăng tin tuyển dụng với các thông tin chi tiết như yêu cầu công việc, vụ trí tuyển dụng, xem hồ sơ ứng viên đã ứng tuyển và sử dụng công cụ lọc để tìm kiếm ứng viên đáp ứng nhu cầu của nhà tuyển dụng.
 




CHƯƠNG I: CƠ SỞ LÝ THUYẾT
1.1	Tổng quan về ngôn ngữ Dart
1.1.1	Khái niệm của Dart
Dart là một ngôn ngữ lập trình hiện đại có mục đích chung, cấp cao, được phát triển ban đầu bởi Google. Đây là ngôn ngữ lập trình mới xuất hiện vào năm 2011, nhưng phiên bản ổn định của nó đã được phát hành vào tháng 6 năm 2017. Dart không quá phổ biến vào thời điểm đó, nhưng nó đã trở nên phổ biến khi được sử dụng bởi Flutter. [1]
Dart là một ngôn ngữ lập trình động, dựa trên lớp, hướng đối tượng với phạm vi đóng và từ vựng. Về mặt cú pháp, nó khá giống với Java, C và JavaScript. Nếu bạn biết bất kỳ ngôn ngữ lập trình nào trong số này, bạn có thể dễ dàng học ngôn ngữ lập trình Dart. [1]
Dart là một ngôn ngữ lập trình mã nguồn mở được sử dụng rộng rãi để phát triển ứng dụng di động, ứng dụng web hiện đại, ứng dụng máy tính để bàn và Internet of Things (IoT) bằng cách sử dụng khung Flutter. Nó cũng hỗ trợ một số khái niệm nâng cao như giao diện, mixin, lớp trừu tượng, tổng thể trường và giao diện kiểu. Nó là một ngôn ngữ biên dịch và hỗ trợ hai loại kỹ thuật biên dịch. [1]
-	AOT (Ahead of Time) – Nó chuyển đổi mã Dart sang mã JavaScript được tối ưu hóa với sự trợ giúp của trình biên dịch dar2js và chạy trên tất cả các trình duyệt web hiện đại. Nó biên dịch mã tại thời điểm xây dựng. [1]
-	JOT (Just-In-Time) – Nó chuyển đổi mã byte trong mã máy (mã gốc), nhưng chỉ mã cần thiết. [1]
1.1.2	Lịch sử hình thành ngôn ngữ Dart
Dart được tiết lộ lần đầu tiên trong hội nghị GOTO vào tháng 10 – 12 tháng 10 năm 2011 tại Aarhus, Đan Mạch. Ban đầu nó được thiết kế bởi Lars và Kespar và được phát triển bởi Google. Phiên bản 1.0 đầu tiên của Dart được phát hành vào ngày 14 tháng 11 năm 2013, nhằm mục đích thay thế JavaScript. Vào tháng 7 năm 2014, ấn bản đầu tiên của ngôn ngữ Dart đã được Ecma International thông qua tại Đại hội đồng lần thứ 107 của tổ chức này. Phiên bản đầu tiên đã bị chỉ trích do sự cố trên web và kế hoạch này đã bị loại bỏ vào năm 2015 với bản phát hành 1.9 của Dart. Phiên bản thứ hai của Dart 2.0 được phát hành vào tháng 8, bao gồm một hệ thống âm thanh. Phiên bản gần đây Dart 2.7 được bổ sung thêm phương thức mở rộng, cho phép người dùng thêm bất kỳ loại chức năng nào. [1]
1.1.3	Tại sao sử dụng ngôn ngữ Dart
Dart là một ngôn ngữ độc lập với nền tảng và hỗ trợ tất cả các hệ điều hành như Windows, Mac, Linux, v.v. Nó là một ngôn ngữ mã nguồn mở, có nghĩa là
 

nó có sẵn miễn phí cho tất cả mọi người. Nó đi kèm với giấy phép BSD và được công nhận bởi tiêu chuẩn ECMA. Nó là một ngôn ngữ lập trình hướng đối tượng và hỗ trợ tất cả các tính năng của oops như kế thừa, giao diện và các tính năng kiểu tùy chọn. Dart rất hữu ích trong việc xây dựng các ứng dụng thời gian thực vì tính ổn định của nó. Dart đi kèm với trình biên dịch dar2js để truyền mã Dart thành mã JavaScript chạy trên tất cả các trình duyệt web hiện đại. Máy ảo Dart độc lập cho phép mã Dart chạy trong môi trường giao diện dòng lệnh [2]. Mọi thứ trong Dart được coi như một đối tượng bao gồm, số, Boolean, hàm, v.v. giống như Python. Tất cả các đối tượng kế thừa từ lớp Đối tượng. Công cụ Dart có thể báo cáo hai loại sự cố trong khi mã hóa, cảnh báo và lỗi. Cảnh báo là dấu hiệu cho thấy mã của bạn có thể có một số vấn đề, nhưng nó không làm gián đoạn quá trình thực thi của mã, ngược lại lỗi có thể ngăn chặn việc thực thi mã. Dart hỗ trợ gõ âm thanh. [3]
1.1.4	Tính năng của Dart
Dart là một ngôn ngữ lập trình hướng đối tượng, mã nguồn mở, chứa nhiều tính năng hữu ích. Đây là ngôn ngữ lập trình mới và hỗ trợ một loạt các tiện ích lập trình như giao diện, bộ sưu tập, lớp, kiểu gõ động và tùy chọn. Nó được phát triển cho máy chủ cũng như trình duyệt. Dưới đây là danh sách các tính năng quan trọng của Dart. [4]

Hình 1 Tính năng của ngôn ngữ Dart
Mã nguồn mở: Dart là một ngôn ngữ lập trình mã nguồn mở, có nghĩa là nó có sẵn miễn phí. Nó được phát triển bởi Google, được phê duyệt bởi tiêu chuẩn ECMA và đi kèm với giấy phép BSD.[12]
Nền tảng độc lập: Dart hỗ trợ tất cả các hệ điều hành chính như Windows, Linux, Macintosh, v.v. Dart có Máy ảo riêng được gọi là Dart VM, cho phép chúng tôi chạy mã Dart trong mọi hệ điều hành.[13]
Hướng đối tượng: Dart là một ngôn ngữ lập trình hướng đối tượng và hỗ trợ tất cả các khái niệm oops như lớp, kế thừa, giao diện và các tính năng gõ tùy chọn. Nó cũng hỗ trợ các khái niệm nâng cao như mixin, abstract, các lớp, hệ thống kiểu chung được sửa đổi và mạnh mẽ.[13]
Đồng nhất: Dart là một ngôn ngữ lập trình không đồng bộ, có nghĩa là nó hỗ trợ đa luồng sử dụng Isolates. Các vùng cách ly là các thực thể độc lập có
 

liên quan đến các luồng nhưng không chia sẻ bộ nhớ và thiết lập giao tiếp giữa các quá trình bằng cách truyền thông điệp. Thông điệp nên được nối tiếp nhau để tạo hiệu quả truyền thông. Việc tuần tự hóa thông báo được thực hiện bằng cách sử dụng một ảnh chụp nhanh được tạo ra bởi đối tượng đã cho và sau đó truyền đến một vùng cách ly khác để giải mã.[12]
Thư viện mở rộng: Dart bao gồm nhiều thư viện tích hợp hữu ích bao gồm SDK (Bộ phát triển phần mềm), lõi, toán học, không đồng bộ, toán học, chuyển đổi, html, IO, v.v. Nó cũng cung cấp cơ sở để tổ chức mã Dart thành các thư viện với không gian tên riêng. Nó có thể sử dụng lại bằng câu lệnh nhập.[2]
Dễ học: Như chúng ta đã thảo luận trong phần trước, học Dart không phải là nhiệm vụ của Hercules vì cú pháp của Dart tương tự như Java, C #, JavaScript, kotlin,v.v. nếu bạn biết bất kỳ ngôn ngữ nào trong số này thì bạn có thể học Dart dễ dàng. Biên dịch linh hoạt: Dart cung cấp sự linh hoạt để biên dịch mã và nhanh chóng. Nó hỗ trợ hai loại quy trình biên dịch, AOT (Ahead of Time) và JIT (Just- in-Time). Mã Dart được truyền bằng ngôn ngữ khác có thể chạy trong các nhà sản xuất web hiện đại. [2]
Nhập an toàn: Dart là ngôn ngữ an toàn kiểu, có nghĩa là nó sử dụng cả kiểm tra kiểu tĩnh và kiểm tra thời gian chạy để xác nhận rằng giá trị của một biến luôn khớp với kiểu tĩnh của biến, đôi khi nó được gọi là kiểu gõ âm thanh. Mặc dù loại là bắt buộc, nhưng chú thích loại là tùy chọn vì loại nhiễu. Điều này làm cho mã dễ đọc hơn. Ưu điểm khác của ngôn ngữ an toàn kiểu chữ là khi chúng ta thay đổi phần mã, hệ thống sẽ cảnh báo chúng ta về sửa đổi mà chúng ta đã sửa trước đó. [5]
Các đối tượng: Dart coi mọi thứ như một đồ vật. Giá trị gán cho biến là một đối tượng. Các hàm, số và chuỗi cũng là một đối tượng trong Dart. Tất cả các đối tượng kế thừa từ lớp Đối tượng. [5]
Hỗ trợ trình duyệt: Dart hỗ trợ tất cả các trình duyệt web hiện đại. Nó đi kèm với trình biên dịch Dart2JS để chuyển đổi mã Dart thành mã JavaScript được tối ưu hóa phù hợp với tất cả các loại trình duyệt web.[8]
Cộng đồng: Dart có một cộng đồng lớn trên toàn thế giới. Vì vậy, nếu bạn gặp vấn đề trong khi viết mã thì rất dễ dàng tìm được trợ giúp. Nhóm các nhà phát triển chuyên dụng đang làm việc để nâng cao chức năng của nó. [5]
1.2	Tổng quan về framework Flutter
1.2.1	Khái niệm của Flutter
Flutter là một framework lập trình để xây dựng các ứng dụng di động đa nền tảng. Nguồn gốc của nó bắt nguồn từ Google Chrome và những nỗ lực của một nhóm chuyên tinh chỉnh cho web chạy nhanh hơn. Eric Seidel là người sáng lập dự án Flutter và trong cuộc phỏng vấn trên SE Daily, anh kể lại cách anh và một vài đồng nghiệp trong nhóm Chrome quyết định xem họ có thể làm Chrome tải các trang nhanh hơn. Họ đã phát hiện ra rằng phần lớn code của Chrome đang làm chậm việc load trang web và chỉ có để cung cấp khả năng
 

tương thích với một bộ phận các trang web rất nhỏ. Họ loại bỏ những bộ phận đó ra để xem có thể làm nó nhanh như thế nào. Nỗ lực này đã chứng minh rằng có rất nhiều tiềm năng trong việc tạo ra một framework giao diện người dùng đa nền tảng thực sự nhanh chóng. Không may, nếu Eric và nhóm của anh ấy muốn nhanh chóng đưa framework UI đa nền tảng vào tay các lập trình viên thì đó sẽ phải là một thứ gì đó không phải là web, vì họ nhận ra rằng web cập nhật rất chậm khi áp dụng các tiêu chuẩn mới. Do đó, dự án Flutter ra đời. [6]
Flutter là một SDK mới của Google dành cho các thiết bị di động giúp developers và designers xây dựng nhanh chóng ứng dụng dành cho các thiết bị di động (Android, iOS). Flutter là dự án mã nguồn mở đang trong giai đoạn thử nghiệm. Flutter bao gồm Reactive framework và công nghệ hiển thị 2D (2D rendering engine) và các công cụ phát trển (development tool). Các thành phần này làm việc cùng nhau giúp ta thiết kế, xây dựng, test, debug ứng dụng. Không có gì ngạc nhiên khi Flutter giúp các nhà phát triển tạo ra các ứng dụng native đẹp mắt và giúp họ phát triển các ứng dụng đa nền tảng một cách dễ dàng. [6]
Flutter thường bao gồm 2 thành phần chính quan trọng như sau:
-	Một SDK (Software Development Kit): Đây là một bộ sưu tập bao gồm các công cụ có thể hỗ trợ cho người dùng có thể phát triển được các ứng dụng nền của mình. Những điều này thường bao gồm các công cụ có trình để biên dịch mã thành các mã gốc dành riêng cho hệ điều hành iOS và Android. [5]
-	Một Framework (UI Library based on widgets): Mỗi một tập hợp những thành phần giao diện của người dùng đều có thể thực hiện tái sử dụng vô cùng dễ dàng nên người sử dụng có thể cá nhân hóa tùy theo nhu cầu riêng của bản thân mình. [6]
1.2.2	Kiến trúc của Flutter

Hình 3 Kiến trúc của Flutter
Vẽ pixel trên màn hình là mục tiêu của tất cả các framework UI. Flutter khác với các framework nền tảng chéo khác ở chỗ nó hiển thị trực tiếp lên màn hình thông qua OpenGL. Các cách tiếp cận khác hoạt động ở mức độ trừu tượng cao hơn, nói chuyện với các framework UI của các hệ thống cơ bản tương ứng, từ đó điều khiển render pixel của các thành phần UI. [6]
Ưu điểm của phương pháp này là cần ít giao tiếp qua lại giữa mã cơ bản và mã Flutter. Có một số sự chậm chạp có thể xảy ra do phải kết nối giữa các ngôn ngữ, theo quan sát của Eric, và cách tiếp cận của Flutter tránh được phần lớn sự chậm chạp này [6].
 

Nhược điểm là không còn có thể dựa vào vật lý hoạt hình đã được tích hợp trong iOS và Android. Mỗi nền tảng có một cách tiếp cận khác nhau một cách tinh tế đối với cách UI phản hồi khi cuộn, tải trang, v.v. Và như Eric nhớ lại, việc viết tương tác vật lý của riêng bạn là khó khăn nhưng cần thiết để đáp ứng sự mong đợi của người dùng về một điều gì đó về tương tác trong việc sử dụng từng nền tảng tương ứng. [5]
Flutter chạy tất cả mã của nó trên một luồng riêng biệt từ các khía cạnh cụ thể của hệ điều hành của ứng dụng. Giao tiếp giữa mã Dart và mã cụ thể của hệ điều hành thông qua một JSON đơn giản.[7]
Về mặt đồ họa trên màn hình, Flutter sử dụng Skia, đây là thư viện đồ họa tương tự được sử dụng trên Chrome và Android. Để bố trí văn bản, Flutter mượn mã đã được phát triển cho Android.
Từ góc độ software stack, Flutter có thể được coi là bao gồm các lớp sau:
-	Lớp thấp nhất là lớp runtime được xây dựng trong C++, cần nói chuyện với HĐH theo một số cách hạn chế – đến Open GL, API truy cập, tệp và mạng IO, v.v … Phía trên cùng của lớp này là API chuyển sang mã Dart. [7]
-	Một lớp liên kết chủ yếu là cho thiết lập ban đầu.
-	Một lớp render là một mô hình view điển hình với các đối tượng tồn tại lâu. Lớp này xử lý những thứ như bố cục, vẽ, chỉnh sửa văn bản, cử chỉ, v.v.
-	Một lớp widget bao gồm các thứ có thời gian tồn tại ngắn mô tả giao diện người dùng sẽ trông như thế nào trong một framework duy nhất. Flutter áp dụng mô hình lập trình reactive trong đó UI được xây dựng lại mỗi khi trạng thái thay đổi.
-	Một lớp thể hiện thẩm mỹ thiết kế cụ thể, ví dụ Thiết kế Vật liệu cho Android.
1.2.3	Đặc điểm của Flutter
1.2.3.1	Cấu trúc của Flutter
-	Dart Platform: Tất cả các ứng dụng từ Flutter được viết bởi ngôn ngữ lập trình riêng là Dart. Trên Windows, MacOS và Linux, Flutter chạy bằng ngôn ngữ máy ảo Dart (giả lập mobile), cho phép thực thi JIT (Just-in-Time). [7]
-	Flutter Engine: Cung cấp hỗ trợ kết xuất mức thấp bằng cách sử dụng thư viện đồ họa Skia của Google. Ngoài ra, nó kết nối với các SDK dành riêng cho nền tảng, như các SDK được cung cấp bởi Android và iOS. [7]
-	Flutter Framework: Tập hợp nền tảng, bố cục, và các widgets.
-	Foundation Library: Cung cấp các lớp và các hàm cơ bản để sử dụng trong việc xây dựng các ứng dụng từ Flutter.
-	Môi thứ đều là widget, ngay cả bản thân Flutter cũng là một widget. Widgets trong Flutter là một phức hợp gồm các widget liên kết với nhau. Người dùng có thể thay đổi, sắp xếp các widget để tạo ra phức hợp Widgets tùy vào ý thích và nhu cầu, từ đó phát triển ứng dụng của mình.
 

1.2.3.2	Ngôn ngữ lập trình được sử dụng trong Flutter
Để lập trình với Flutter, bạn cần sử dụng một ngôn ngữ lập trình gọi là Dart. Dart là ngôn ngữ lập trình còn khá mới và chưa thông dụng bằng các ngôn ngữ khác như C, C++ hay Python, Java… Tuy nhiên, Dart luôn được cải thiện kể từ khi được Google tạo ra vào năm 2011. Là ngôn ngữ dùng để xây dựng Flutter Framework. Dart tập trung phát triển Front-end, với tiêu chí xây dựng nên các ứng dụng đa nền tảng, từ ứng dụng di động đến ứng dụng web. [6]
Ngôn ngữ Dart như là sự kết hợp giữa Java và Javascript nên những người đã có nền tảng hai ngôn ngữ trên sẽ dễ học hơn. Dart không dùng để thay thế Javascript, mà là một lựa chọn cải tiến hơn, hỗ trợ cả hai trình biên dịch AOT và JIT. Trong khi ngôn ngữ gõ tĩnh chỉ có trình biên dịch AOT. Dart tuy là một ngôn ngữ mới so với các loại ngôn ngữ khác nhưng lại có phần vượt trội hơn về trình biên dịch, nó có cả trình biên dịch AOT (chỉ có ở những ngôn ngữ tĩnh) và JIT (chỉ có ở những ngôn ngữ động) [6].
Một số khía cạnh của Dart khiến nó phù hợp với Flutter là:
-	Nó có một garbage collector thế hệ rất nhanh. Điều này rất hữu ích vì Flutter tuân theo mô hình lập trình reactive trong đó các đối tượng UI được tạo và hủy nhanh chóng.
-	Trình biên dịch trước thời hạn của Dart cho phép biên dịch trực tiếp mã. Điều này cho phép khởi động nhanh và đạt hiệu suất phù hợp.
-	Dart tập trung vào trải nghiệm tốt cho lập trình viên.
-	Dart có thuật toán tree shaking – chỉ các phần của framework Flutter đã được sử dụng mới được đưa vào ứng dụng cuối cùng.
1.2.4	Tính năng của Flutter
Tính năng phát triển nhanh chóng các ứng dụng: Hầu hết, mọi tính năng hot reload của Flutter giúp cho người dùng có thể sử dụng thử nghiệm nhanh chóng và dễ dàng hơn rất nhiều. Với khả năng xây dựng giao diện cho người dùng cộng thêm các tính năng về sửa lỗi nhanh chóng nên Flutter đang thu hút không ít người sử dụng lựa chọn. Ngoài ra, các trải nghiệm về thực hiện tải lại lần thứ hai đều rất dễ dàng mà không làm mất đi trạng thái ở trên emulator, simulator và device cho cả iOS và Android. [6]
UI đẹp mắt và có tính biểu cảm: Flutter thỏa mãn người sử dụng nhờ các widget built-in vô cùng đẹp mắt dựa theo Material Design và Cupertino (iOS- flavor), thì các API sẽ thực hiện chuyển động theo nhiều hướng phong phú, scroll tự nhiên và mượt mà nên có thể tự động nhận thức được các nền tảng cần thiết. [6]
Quá trình truy cập với nhiều tính năng và SDK native: Nhờ vậy, các ứng dụng sẽ trở nên sống động hơn rất nhiều nhờ vào API của platform, SDK của các bên thứ ba và native code. Từ đó, nó sẽ cho phép lập trình viên sử dụng lại được mã Java, Swift và ObjC hiện tại của mình. Nhờ vậy, các truy cập sẽ thực hiện được mọi tính năng mà SDK native dựa trên iOS và Android. [5]
 

Có khả năng phát triển các ứng dụng thống nhất: Nhờ sở hữu các công cụ cũng như thư viện nên người sử dụng có thể dễ dàng đưa ra được ý tưởng của mình vào chính trong cuộc sống trên hệ điều hành iOS và Android. Chính vì thế, nếu là người chưa có nhiều kinh nghiệm cho mục đích phát triển các thiết bị di động thì việc lựa chọn Flutter được xem là một phương pháp dễ dàng và rất nhanh chóng trong việc xây dựng ra một ứng dụng di động tuyệt đẹp. Ngoài ra, nếu là một nhà phát triển cho iOS hoặc Android có kinh nghiệm lâu đời thì bạn hoàn toàn có thể sử dụng Flutter dành cho các View. Từ đó tận dụng việc viết ra nhiều code từ Java/Kotlin /ObjC/Swift hiện có [5].
1.2.5	Ưu và nhược điểm của Flutter
1.2.5.1	Ưu điểm của Flutter
-	Flutter được đánh giá cao nhờ khả năng mạnh về hiệu ứng cũng như hiệu suất ứng dụng cao.
-	Sở hữu khả năng giao tiếp gần như được xem là trực tiếp với hệ thống.
-	Là dạng ngôn ngữ kiểu tĩnh với các cú pháp hiện đại tương tự như JS, Python, Java... Ngoài ra, compiler còn được đánh giá là linh động ngay khi dùng AOT (dành cho các sản phẩm cuối) và JIT (dành cho các quá trình này phát triển với các hot reload) [6]
-	Flutter có thể chạy được trên các giả lập mobile ngay trên trang web có thể tiện cho việc phát triển. Các bộ đo lường thường chỉ các hiệu suất được hỗ trợ giúp cho lập trình viên có thể kiểm soát tốt hơn các hiệu suất của ứng dụng. Ngoài ra, nó còn thể sử dụng để xây dựng được các nền tảng gắn với ứng dụng native để có thể gia tăng hiệu suất. [6]
1.2.5.2	Nhược điểm của Flutter
-	Bộ render UI đã được nhóm phát triển viết lại hầu hết nên thường không còn liên quan tới UI đã có sẵn trong UI Framework native. Từ đó, dẫn đến việc memorsẽ sử dụng tương đối nhiều. Ngoài ra, các UI sẽ không còn đi chung với OS mà chủ yếu chỉ được phát triển riêng và chúng có thể được xem cùng một phiên bản Futter ngay khi tạo ra được ứng dụng dành riêng cho iOS thì iOS 8.x
12.x đều sẽ tương tự nhau và tương tự như với Android. Tuy nhiên, các UI của Android đương nhiên sẽ khác hơn rất nhiều so với iOS [5].
-	Bổ sung thường xuyên ngôn ngữ DART: Theo điều tra thì số lượng lập trình viên biết về DART là không lớn và có nhiều rủi ro rằng khi học xong DART thì Developer có thể sẽ dính liền luôn với DART ở công việc phát triển cho các ứng dụng mobile. Chính vì vậy, vấn đề làm việc uyển chuyển JS hay Python hay có thể linh động qua lại giữa front, back hay AI…sẽ không còn khả năng thực hiện. [7]
-	Một mô hình dữ liệu hoàn toàn mới: Khi hướng đến phát triển React Native thì bạn sẽ mất rất nhiều thời gian cho việc học thêm các mô hình dữ liệu trong Flutter, đây là một công việc không bị đánh giá khó.
-	Chính vì Flutter là con cưng được sản xuất bởi Google nên sẽ dính phải
 

nhiều phốt là điều vô cùng dễ dàng, chính vì vậy bạn cần cân nhắc khi sử dụng. Tuy nhiên, vẫn nhiều chuyên gia khẳng định rằng Flutter rất tốt và được cho là tốt hơn rất nhiều lần so với Angular mà Google đã từng làm ra trước đây.
1.3	Giới Thiệu tổng quan về cơ sở dữ liệu Supabase Storage
1.3.1	Supabase là gì?
•	Supabase là một nền tảng phát triển ứng dụng đa nền tảng (cross- platform) mở, tự triển khai và dựa trên PostgreSQL. Được phát triển với mục tiêu là cung cấp các dịch vụ cơ sở dữ liệu và xác thực mạnh mẽ cho việc phát triển ứng dụng web và di động một cách dễ dàng.[8]

Hình 5 Cơ sở dữ liêu Supabase
1.3.2	Ưu điểm và nhược điểm của Supabase
•	Ưu điểm
-	Dựa trên PostgreSQL: Supabase sử dụng PostgreSQL, một trong những hệ quản trị cơ sở dữ liệu quan hệ phổ biến và mạnh mẽ nhất. Điều này đảm bảo tính ổn định, hiệu suất cao và tính mở rộng cho cơ sở dữ liệu của bạn. [8]
-	Open Source và Miễn phí: Supabase là một dự án mã nguồn mở, cho phép bạn triển khai và sử dụng nó miễn phí. Điều này giúp giảm chi phí và tạo điều kiện thuận lợi cho các dự án khởi nghiệp và cá nhân.[8]
-	API dễ sử dụng: Supabase cung cấp các API dễ sử dụng, cho phép bạn tương tác với cơ sở dữ liệu một cách linh hoạt và tiện lợi từ các ứng dụng web và di động. [9]
-	Realtime Database: Tính năng cơ sở dữ liệu thời gian thực của Supabase cho phép bạn theo dõi các thay đổi trên dữ liệu của mình và nhận các cập nhật ngay lập tức khi dữ liệu thay đổi, tạo ra trải nghiệm tương tác và đồng bộ cao. [8]
-	Xác thực người dùng tích hợp: Supabase cung cấp các tính năng xác thực người dùng tích hợp, giúp bạn quản lý người dùng, phân quyền và bảo mật truy cập vào dữ liệu của mình một cách dễ dàng. [9]
•	Nhược điểm
-	Còn mới và chưa phát triển hoàn chỉnh: Supabase là một dự án mới, vẫn đang trong giai đoạn phát triển và có thể chưa đạt đến mức độ ổn định và hoàn chỉnh như các dịch vụ cơ sở dữ liệu lâu đời khác. [6]
-	Tính mở rộng và hiệu suất có thể bị hạn chế: Mặc dù sử dụng PostgreSQL, nhưng tính mở rộng và hiệu suất của Supabase có thể bị
 

hạn chế so với các dịch vụ đám mây lớn hơn như AWS RDS hoặc Google Cloud SQL. [5]
-	Hỗ trợ và tài liệu có thể hạn chế: Do là một dự án mới, có thể gặp khó khăn trong việc tìm kiếm hỗ trợ và tài liệu hữu ích từ cộng đồng hoặc nhóm phát triển chính thức của Supabase. [5]
1.4	Hệ quản trị cơ sở dữ liệu PostgeSQL
1.4.1	Khái niệm về PostgeSQL
PostgreSQL là một hệ thống quản trị cơ sở dữ liệu quan hệ và đối tượng (object-relational database management system) miễn phí và nguồn mở (RDBMS)tiên tiến nhất hiện nay. khả năng mở rộng cao và tuân thủ các tiêu chuẩn kỹ thuật. Nó được thiết kế để xử lý một loạt các khối lượng công việc lớn, từ các máy tính cá nhân đến kho dữ liệu hoặc dịch vụ Web có nhiều người dùng đồng thời[13].
-	PostgreSQL được phát triển bởi PostgreSQL Global Development Group, Phát hành lần đầu: 08/07/1996.
-	PostgreSQL linh động có thể chạy được trên nhiều nền tảng khác nhau như Mac OS X, Solaris và Windows.
-	PostgreSQL là một phần mềm mã nguồn mở miễn phí bởi vậy PostgreSQL có thể được dùng, sửa đổi và phổ biến bởi bất kỳ ai cho bất kỳ mục đích nào.
-	PostgreSQL có tính ổn định cao.
-	PostgreSQL là hệ thống quản lý cơ sở dữ liệu đầu tiên triển khai tính năng kiểm soát đồng thời nhiều phiên bản (MVCC).
1.4.2	Tính năng của PostgeSQL
PostgreSQL cung cấp cho người dùng nhiều tính năng hiện đại, khả năng ổn định cao, tốc độ tuyệt vời, chính vì vậy mà PostgreSQL trở nên phổ biến, ngoài ra có nhiều ứng dụng khác như[13]:
-	Kiểu dữ liệu: nguyên hàm (các nguyên số, boolean, số, chuỗi); cấu trúc (UUID, Phạm vi, Array, Date/time); Hình học; Tùy chỉnh; Document.
-	Toàn vẹn dữ liệu: Ràng buộc loại từ, Primary Keys, Foreign Keys, UNIQUE, NOT NULL, Khóa khuyến nghị/ Advisory Locks, Khóa hàm số/ Explicit Locks,…
-	Hiệu suất, đồng quy: Tính năng lập danh mục, lập danh mục nâng cao, trình lập kế hoạch, trình tối ưu hóa truy cập phức tạp, thống kê số liệu trên nhiều cột, quét index – only, giao tác – giao tác dạng test, điều khiển đồng thời nhiều phiên bản (MVCC), phân vùng bảng, truy vấn đọc song song, độ tin cậy, phục hồi sau thảm họa, nhật ký ghi trước (Write-ahead Logging – WAL), replication, khôi phục điểm – thời gian, bảng.
-	Chức năng bảo mật: Bảo mật, xác thực (SCRAM-SHA-256, SSPI,
 

LDAP, GSSAPI, Certificate và các hình thức khác), hệ thống kiểm soát truy cập mạnh mẽ, bảo mật cấp độ cột – hàng.
-	Khả năng mở rộng: phương pháp lưu trữ, ngôn ngữ thủ tục (PL / PGSQL, Python, Perl, và nhiều ngôn ngữ khác), PostGIS, tính năng kết nối cơ sở dữ liệu hoặc luồng khác với giao diện SQL chuẩn, cùng nhiều tính năng mở rộng khác[13].
-	Tìm kiếm văn bản: Tìm kiếm văn bản đầy đủ, hệ thống các bộ ký tự quốc tế (thông qua ICU collations).
-	Tính năng khác: Khả năng quản lý số lượng người dùng đang thao tác cùng lúc, phù hợp với môi trường sản xuất quản lý nhiều terabyte và petabyte.
1.4.3	Vai trò của PostgeSQL
PostgreSQL là một hệ thống quản trị dữ liệu mở dành cho các doanh nghiệp. Hệ thống quản lý này tương thích với nhiều nền tảng khác nhau, sử dụng được đa dạng  ngôn  ngữ  và  phần  mềm  trung  gian  phổ  biến  hiện  nay. Bởi vậy, PostgreSQL được áp dụng nhiều trong các ngành dữ liệu GIS của chính phủ, tài chính ngân hàng, sản xuất – kinh doanh, công nghệ web và các công việc thu thập dữ liệu khoa học. [10]
PostgreSQL là mã nguồn mở miễn phí. Bởi vậy, bạn không cần trả bất cứ chi phí gì khi sử dụng dịch vụ này. Tuy nhiên, hệ quản trị cơ sở dữ liệu PostgreSQL lại không thuộc sở hữu của bất kỳ tổ chức nào cũng là một nhược điểm. Người dùng khó khăn khi đưa tên mình ra khỏi đó mặc dù có đủ các tính năng như hệ thống DBMS khác. [10]
1.4.4	So sánh PostgeSQL và MySQL
Hai hệ thống quản trị cơ sở dữ liệu phổ biến được sử dụng hiện nay phải kể đến đó là MySQL và PostgreSQL. Phân tích một số tiêu chí quan trọng sau đây [11]:









Bảng 1 So sánh PostgeSQL và MySQL

Đặc điểm	MySQL	PostgreSQL
 

Non-blocking trong DDL	Thực thi thao tác nhiều DDL bằng Non – blocking.
Chức năng Non – Blocking có từ phiên bản MySQL 5.6.
Trong trường hợp Alter table (thay đổi, điều chỉnh cột, hàng,
… trong bảng), chỉ những cột đối tượng cần xử lý thì không tạo bảng từ con số không. Bởi vậy, tốc độ xử lý nhanh, kéo thiểu việc giảm tải cho máy chủ server.	PostgreSQL sẽ tùy thuộc vào những cậu lệnh thực thi thao tác DDL nào.
Thao tác write, chẳng hạn như thêm cột, nó sẽ phát sinh block đến bảng, khiến bạn không thể tham chiếu thêm nữa.
Có thể thấy, PostgreSQL thao tác DDL là Alter table không phải non – blocking. Để sử dụng được, bạn cần sự hỗ trợ của các tool. Ví dụ như pg_repack, tool này chuyên dùng cho maintain, giúp thực thi các thao tác alter table một phần hoặc tiến hành reindex bằng cách block tối thiểu.
 

Performance của		DML (thao	tác	dữ liệu)	MySQL có thuật toán sort không tốt bằng PostgreSQL. Bởi vậy MySQL sẽ bị chậm hơn.
MySQL chuyên về use case. Ví dụ, lấy da 10 hay 100 dữ liệu đầu tiền (như cách của Twitter) sẽ nhanh hơn so với PostgreSQL.
UPDATE thì performance của MySQL tốt hơn so với PostgreSQL. Bởi MySQL ghi đè đối tượng được update, đúng nghĩa cập nhật.
MySQL delete chậm do sau khi xóa dữ liệu nó sẽ thực hiện đánh lại secondary index xử lý đồng bộ nên tốn thời gian hơn. Từ phiên bản 5.5 trở lên sẽ cải thiện tình trạng này tốt hơn.	Câu SELECT cần phải sort lượng dữ liệu lớn sau khi ORDER BY thì PostgreSQL sẽ làm việc nhanh hơn.
Chậm hơn.
PostgreSQL khi update sẽ xử lý tương tự như insert. Tức là nó sẽ đánh dấu flag như delete vào dòng trước khi thay đổi, rồi thêm dòng mới có dữ liệu sau khi thay đổi.
Xoá nhanh hơn.
 

Thuật toán JOIN	MySQL chủ yếu sử dụng thuật toán Support Nested Loop Join, bởi hệ quản trị cơ sở dữ liệu này thiết kế đúng theo tiêu chí thuật toán đơn giản.	PostgreSQL support cả 3 loại Hash Join, Nested Loop Join, Sort Merge Join.
Trong đó:
Sử dụng dữ liệu cần join nhiều thì dùng Hash Join và Sort Merge join.
Dữ liệu đã được sort thì sử dụng Sort Merge Join.
Dữ liệu của các bảng được Join ít hoặc bảng ít bảng nhiều, bạn có thể dùng Nested Loop Join.
Xử lý transaction	MySQL mặc định xử lý transaction là repeatable read. Phương thức này giúp giữ nguyên dữ liệu đọc, không lo thay đổi, mất ở một transaction khác.
Trong trường hợp thêm dữ liệu bởi transaction khác sẽ được thấy khi chạy transaction với phantom-read. Để cải thiện tình trạng này, khi sử dụng MySQL cần dùng Next Key Locking.	PostgreSQL có tính năng Read – committed, hình thức này có khả năng xảy ra vấn đề phantom-read hoặc non – repeatable – read (hiện tượng cùng một transaction đọc cùng dữ liệu mà giá trị thay đổi).
Trường hợp đổi sang Repeatable – read sẽ không có next key locking nên tránh được tình trạng phantom – read. Bởi vậy PostgreSQL dễ tránh conflict ngon hơn MySQL.
Store procedure, Trigger	MySQL chỉ sử dụng được SQL. Trên mỗi SQL không thực thi step của store procedure được.
Bản MySQL 5.6 có điểm yếu là mỗi một bảng chỉ gán được	Ngoài SQL, PostgreSQL còn sử dụng được cả procedure bên ngoài như python.
 

	tối đa 6 trigger. Nếu không thì chúng chỉ có for each row.	
Dạng logic và vật lý của replication	MySQL có replication dạng logic và vật lý. Dạng logic được setting mặc định. Từ phiên bản 5.7 về sau thì dạng vật lý là mặc định.	PostgreSQL chỉ có dạng vật lý. Nhưng từ phiên bản release beta version 10 có thể sử dụng được cả dạng logic.
Chức năng tiện lợi	MySQL chưa có chức năng này.
MySQL thì có backup vật online còn Xtrabackup hoặc enterprise backup không thực hiện được base backup online hay trên remote.	PostgreSQL có hàm window, có thể apply hàm tổng, hợp thành set kết quả và phân chia thành từng phần.
Mệnh đề with có thể subquery trước khi select. Bởi vậy, chức năng tiện lợi của postgreSQL mạnh hơn.
Chức năng Query song song giúp tăng tốc độ xử lý bằng cách sử dụng nhiều CPU để chạy query. PostgreSQL có đa dạng các tool từ OSS, PostGIS.
Chức năng Pg_basebackup có thể sử dụng online hoặc dùng trên remote đều được.
 

CHƯƠNG 2 PHÂN TÍCH VÀ THIẾT KẾ HỆ THỐNG
2.1	Phân tích yêu cầu đề tài
2.1.1	Phát biểu bài toán
Tên bài toán: “Nghiên cứu lập trình di động trên nền tảng Android để xây dựng ứng dụng tìm kiếm việc làm công nghệ thông tin bằng framework Flutter và ngôn ngữ lập trình Dart”
Dự án này tập trung vào việc xây dựng một ứng dụng tìm kiếm việc làm trực tuyến nhằm kết nối người tìm việc và nhà tuyển dụng một cách thuận tiện và hiệu quả. Hiện nay, người tìm việc gặp nhiều khó khăn trong việc tìm kiếm công việc phù hợp với kỹ năng, kinh nghiệm và mong muốn của họ. Quản lý thông tin về các vị trí tuyển dụng trên nhiều nền tảng khác nhau cũng là một thách thức, làm mất nhiều thời gian và công sức. Về phía nhà tuyển dụng, họ mong muốn tiếp cận ứng viên tiềm năng, nhưng việc quảng bá thông tin tuyển dụng và quản lý quá trình tuyển chọn cũng tiêu tốn nhiều nguồn lực.
Giải pháp của dự án là phát triển một ứng dụng di động đa nền tảng sử dụng Flutter, giúp tạo ra một hệ sinh thái tuyển dụng đơn giản và trực quan. Ứng dụng sẽ cung cấp một nền tảng tìm kiếm linh hoạt, cho phép người tìm việc dễ dàng tra cứu và lọc các công việc theo tiêu chí cụ thể như vị trí, ngành nghề, mức lương và hình thức làm việc. Người tìm việc có thể tạo hồ sơ cá nhân, tải lên CV, theo dõi các công việc đã ứng tuyển và nhận thông báo khi có phản hồi từ nhà tuyển dụng. Đồng thời, nhà tuyển dụng có thể đăng tin tuyển dụng, tìm kiếm hồ sơ ứng viên phù hợp và quản lý quá trình tuyển dụng ngay trên ứng dụng.
Ứng dụng không chỉ giúp người tìm việc tiếp cận các cơ hội nghề nghiệp nhanh chóng mà còn giúp nhà tuyển dụng tiết kiệm thời gian, tối ưu quá trình tuyển dụng và đảm bảo chất lượng ứng viên. Việc phát triển ứng dụng với Flutter giúp đảm bảo khả năng hoạt động trên nhiều nền tảng, mang đến trải nghiệm mượt mà và ổn định cho người dùng.
2.1.2	Yêu cầu bài toán
Hệ thống có chức năng ủy quyền người dùng, do đó:
2.1.2.1	Yêu cầu chức năng
•	Chức năng đăng ký:
-	Người dùng thực hiện đăng ký tài khoản bằng email của mình, yêu cầu người dùng xác thực email bằng mã OTP và mật khẩu phải nhìu hơn 6 ký tự.
•	Chức năng đăng nhập:
-	Đăng nhập bằng email và mật khẩu đã được đăng ký. Sau khi đăng nhập thành công sẽ lưu trạng thái đăng nhập, lần sau vào app bỏ qua bước đăng nhập.
•	Chức năng đăng xuất:
 

-	Người dùng thực hiện đăng xuất tài khoản xóa thông tin người dùng đang cần ở ứng dụng và không còn được phép sử dụng các chức năng của ứng dụng.
•	Chức năng tìm kiếm việc làm:
-	Người dùng có thể tìm kiếm các vị trí việc làm theo từ khóa, vị trí, lĩnh vực công việc và nhiều tiêu chí khác.
•	Chức năng xem thông tin chi tiết:
-	Người dùng có thể xem thông tin chi tiết về các vị trí việc làm bao gồm mô tả công việc, yêu cầu công việc, lợi ích và thông tin liên hệ.
•	Chức năng ứng tuyển trực tuyến:
-	Cung cấp cho người dùng tính năng ứng tuyển ngay từ ứng dụng, giúp tiết kiệm thời gian và tăng tính tiện lợi.
•	Chức năng hiển thị vị trí công việc trên bản đồ:
-	Cho phép người dùng xem các vị trí doanh nghiệp cần tuyển trên bản đồ.
•	Chức năng theo dõi công việc yêu thích:
-	Cho phép người dùng thêm công việc vào danh sách yêu thích.
•	Chức năng chỉnh sửa hồ sơ:
-	Cung cấp tùy chọn cho người dùng chỉnh sửa thông tin trong hồ sơ cá nhân của họ, bao gồm cả thông tin cơ bản và thông tin chi tiết về kinh nghiệm, học vấn, kỹ năng, v.v.
-	Cho phép người dùng thay đổi mật khẩu hiện tại bằng một mật khẩu mới.
•	Chức năng thay đổi ngôn ngữ:
-	Cho phép người dùng thay đổi ngôn ngữ muốn sử dụng trong ứng dụng.
•	Chức năng tạo bài đăng tuyển dụng:
-	Cho phép doanh nghiệp tạo mới bài đăng tuyển dụng bằng cách điền thông tin về vị trí công việc, yêu cầu công việc, mô tả công việc, lợi ích, v.v.
•	Chức năng quản lý bài đăng tuyển dụng:
-	Cung cấp tùy chọn cho doanh nghiệp chỉnh sửa thông tin trong bài đăng tuyển dụng của họ, bao gồm cả thông tin cơ bản và thông tin chi tiết về vị trí công việc.
-	Cung cấp tùy chọn cho doanh nghiệp chọn ẩn hoặc hiện bài đăng tuyển dụng của họ.
 

-	Hiển thị danh sách ứng viên đã nộp đơn cho vị trí công việc và cung cấp tùy chọn quản lý, bao gồm xem hồ sơ, liên hệ và tương tác với ứng viên.
-	Cho phép doanh nghiệp xóa bài đăng tuyển dụng nếu họ không còn muốn tiếp tục tuyển dụng cho vị trí đó.
•	Chức năng quản lý bài đăng:
-	Cung cấp tùy chọn cho người quản trị phê duyệt hoặc từ chối bài đăng dựa trên nội dung và tiêu chí xác định trước và xóa bài đăng không phù hợp.
•	Chức năng quản lý tài khoản người dùng:
-	Cho phép người quản trị thêm người dùng mới hoặc xóa người dùng vi phạm.
•	Chức năng quản lý doanh nghiệp
-	Cho phép người quản trị thêm doanh nghiệp mới và xóa doanh nghiệp vi phạm.
2.1.2.2	Yêu cầu phi chức năng
•	Bảo mật:
-	Hệ thống phải đảm bảo tính bảo mật cao, bao gồm bảo vệ thông tin cá nhân của người dùng và dữ liệu nhạy cảm như thông tin tài khoản và thông tin tuyển dụng.
•	Hiệu suất và Tốc độ:
-	Hệ thống cần phải có hiệu suất cao và tốc độ xử lý nhanh để cung cấp trải nghiệm người dùng mượt mà và không gián đoạn.
•	Tương thích đa nền tảng:
-	Ứng dụng cần phải tương thích với hệ điều hành Adroid & IOS.
•	Hỗ trợ Ngôn ngữ và Văn hóa
-	Cung cấp hỗ trợ cho nhiều ngôn ngữ và văn hóa khác nhau để đáp ứng nhu cầu của người dùng toàn cầu.
•	Sự ổn định và đáng tin cậy
-	Ứng dụng cần phải ổn định và đáng tin cậy, tránh các lỗi và sự cố xảy ra thường xuyên.
2.2	Nghiên cứu hiện trạng
•	Về người tìm việc
 


 
Hình 6 Khảo sát nhóm người sử dụng

Hình 7 Khảo sát kinh nghiệm làm việc

Hình 8 Khảo sát loại công việc
 


 
Hình 9 Khảo sát các kênh tìm kiếm việc làm


Hình 10 Khảo sát khó khăn khi tìm việc


Hình 11 Khảo sát mong muốn của người dùng


Hình 12 Khảo sát tình trạng người dùng
 


 

Hình 13 Khảo sát mong muốn trong ứng dụng
•	Về nhà tuyển dụng


Hình 14 Khảo sát lĩnh vực của công ty


Hình 15 Khảo sát các vị trí tuyển dụng


Hình 16 Khảo sát khó khăn khi tuyển dụng
 


 

Hình 17 Khảo sát những tính năng mong muốn


Hình 18 Khảo sát trả phí cho dịch vụ tuyển dụng

2.3	Đặc tả hệ thống


Vai trò	Mô tả

Quản trị viên	Là người có vai trò cao nhất trong hệ thống:
-	Duyệt và kích hoạt tài khoản nhà tuyển dụng.
-	Duyệt bài viết của nhà tuyển dụng.
-	Quản lý danh mục công việc.
-	Xem báo cáo và thống kê về hoạt động của hệ thống ( số lượng công việc)
-	Quản lý các thông báo và tin tức của hệ thống.
 















Người dùng	




Người tìm việc	Thao tác trực tiếp trên hệ thống với các chức năng:
-	Đăng kí/đăng nhập tài khoản (có thể tạo thông qua mạng xã hội: Google),
-	Tạo và quản lý hồ sơ cá nhân (CV) chi tiết (thông tin cá nhân, kinh nghiệm làm việc, học vấn, kỹ năng, chứng chỉ, mục tiêu nghề nghiệp, v.v.).
-	Tìm kiếm công việc theo nhiều tiêu chí (từ khóa, ngành nghề, địa điểm, mức lương, kinh nghiệm, v.v.).
-	Xem chi tiết thông tin về công việc (mô tả công việc, yêu cầu, quyền lợi, thông tin công ty).
-	Ứng tuyển vào các công việc phù hợp.
-	Lưu các công việc yêu thich để xem lại
	




Nhà tuyển dụng	Thao tác trực tiếp trên hệ thống với các chức năng:
-	Đăng kí/đăng nhập tài khoản doanh nghiệp
-	Tạo và quản lý hồ sơ doanh nghiệp (thông tin công ty, quy mô, lĩnh vực hoạt động, văn hóa công ty, v.v.).
-	Đăng tin tuyển dụng chi tiết (mô tả công việc, yêu cầu ứng viên, quyền lợi, mức lương, địa điểm làm việc, v.v.).
-	Sửa đổi và xóa các tin tuyển dụng đã đăng.
-	Quản lý danh sách ứng viên ứng tuyển vào từng vị trí.
-	Xem hồ sơ ứng viên (CV).
Bảng 2 Đặc tả hệ thống
2.4	Biểu đồ ca sử dụng
Biểu đồ ca sử dụng (use case diagram) mô tả tập hợp các ca sử dụng, các tác nhân và những quan hệ giữa chúng. Các biểu đồ ca sử dụng mô tả cái nhìn tĩnh về hệ thống dưới con mắt của người sử dụng. Các biểu đồ ca sử dụng rất quan trọng để nắm bắt các chức năng của hệ thống
2.4.1	Ca sử dụng (usecase)
Bước đầu tiên của phân tích yêu cầu là xác định các ca sử dụng của hệ
 

thống. Một ca sử dụng là một tương tác giữ hệ thống và môi trường. Tập hợp các ca sử dụng là mô tả toàn bộ hệ thống cần xây dựng. Một ca sử dụng tương ứng với một chức năng của hệ thống dưới góc nhìn của người sử dụng. Một ca sử dụng có thể lớn hoặc nhỏ. Một ca sử dụng chỉ ra làm thế nào một mục tiêu của người sử dụng được thoả mãn bởi hệ thống. Cần phân biệt các mục tiêu của người sử dụng và các tương tác của họ với hệ thống.
o	Mục tiêu: cái mà người sử dụng mong đợi
o	Tương tác: kỹ thuật cho phép đáp ứng mục tiêu.
Thực tế, chúng ta xác định các mục tiêu trước, sau đó chọn tập hợp các tương tác đáp ứng các mục tiêu đó.
2.4.2	Tác nhân (Actor)
Tác nhân đóng vai trò một người sử dụng hoặc một thực thể bên ngoaì
tương tác với hệ thống. Cần phải phân biệt tác nhân (actor) và người sử dụng (user):
-	Nhiều người sử dụng có thể tương ứng một tác nhân
-	Một người sử dụng có thể tương ứng với nhiều tác nhân khác nhau
Tác nhân không nhất thiết luôn luôn là con người. Tác nhân có thể là môi trường, hệ thống khác, thực thể bên ngoài tương tác với hệ thống
2.4.3	Đặc tả ca sử dụng
Đặc tả điển hình của ca sử dụng:
-	Ca sử dụng: tên ca sử dụng thường bắt đầu bởi động từ
-	Các tác nhân: danh sách các tác nhân liên quan
-	Mô tả: tóm tắt các xử lý cần thực hiện Đặt tả ca sử dụng có thể thêm:
-	Tham chiếu (reference) đến mục liên quan trong đặc tả yêu cầu.
-	Điều kiện trước và điều kiện sau khi thực hiện ca sử dụng
Ngoài ra, đối với ca sử dụng ta có thể xây dựng một kịch bản (scenario) hành động mô tả các sự kiện sảy ra. Kịch bản gồm: gồm các sự kiện chính và các sự kiện ngoại lệ. Các sự kiện chia làm 2 luồng: Luồng tương ứng với các tác nhân và luồng tương ứng với hệ thống
2.4.4	Biểu đồ ca sử dụng
Biểu đồ ca sử dụng mô tả quan hệ giữa các tác nhân và các ca sử dụng của một hệ thống. Ký hiệu như sau:
 


 
Hình 19 Các kí hiệu của biểu đồ ca sử dụng.
2.4.5	Biểu đồ ca sử dụng của hệ thống

Hình 20 Biểu đồ ca sử dụng của hệ thống
2.5	Biểu đồ hoạt động
Phương pháp phân tích và thiết kế truyền thống - Biểu đồ luồng dữ liệu (DFD – Data-Flow Diagram). Phương pháp phân tích và thiết kế HĐT - Biểu đồ hoạt động. Biểu đồ hoạt động (activity diagram) cho phép mô tả hoạt động của hệ thống so với một hoặc nhiều ca sử dụng. Một biểu đồ hoạt động định nghĩa:
-	Các hoạt động (activity) của hệ thống và của các tác nhân
-	Thứ tự mà các hoạt động này được thực hiện
-	Phụ thuộc có thể giữa các hoạt động này.
Một hoạt động tương ứng với một công việc ở mức trừu tượng cao có mục tiêu xác định. Các hoạt động không tương ứng với các thao tác trong mô hình khái niệm, các thao tác đó liên quan ñến khái niệm, chứ không liên quan đến hệ thống hay các tác nhân. Thông thường, các biểu đồ hoạt động được định nghĩa trước hoặc trong khi xây dựng mô hình khái niệm. Dựa vào biểu đồ hoạt động các thao tác sẽ được thêm vào mô hình khái niệm:
Kí hiệu của các hoạt động
 


 
Hình 21 Kí hiệu các hoạt động trong biểu đồ hoạt động
Đồng bộ hóa các hoạt động: Các hoạt động 1’, …, n’ (cũng như 1, …, n) có thể thực hiện trong bất cứ thứ tự nào. Hoặc các hoạt động này có thể thực hiên đồng thời.

Hình 22 Kí hiệu đồng hoá các hoạt động trong biểu đồ hoạt động.
Đồng bộ hóa có điều kiện:


Hình 23 Kí hiệu đồng hoá có điều kiện trong biểu đồ hoạt động.
Kí hiệu quyết định:
 


 
Hình 24 Kí hiệu quyết định trong biểu đồ hoạt động
Quyết định kết hợp: trong trường hợp nếu có nhiều quyết định đi liền nhau, thì cần phải biểu diễn bằng hoạt động riêng.

Hình 25 Kí hiệu quyết định kết hợp trong biểu đồ hoạt động.
2.5.1	Biểu đồ hoạt động đăng kí
 


 

Hình 26 Biểu đồ hoạt động đăng kí
 


2.5.2	Biểu đồ hoạt động đăng nhập

Hình 27 Biểu đồ hoạt động đăng nhập
2.5.3	Biểu đồ hoạt động khôi phục mật khẩu
 




 
Hình 28 Biểu đồ hoạt động khôi phục mật khẩu
 

2.5.4	Biểu đồ hoạt động tìm kiếm việc làm

Hình 29 Biểu đồ hoạt động tìm kiếm việc làm
 

2.5.5	Biểu đồ hoạt động ứng tuyển trực tuyến


Hình 30 Biểu đồ hoạt động ứng tuyển trực tuyến
 

2.5.6	Biểu đồ hoạt động quản lý hồ sơ

Hình 31 Biểu đồ hoạt động quản lý hồ sơ
 

2.5.7	Biểu đồ hoạt động thêm bài tuyển dụng

Hình 32 Biểu đồ hoạt động thêm bài tuyển dụng
 

2.5.8	Biểu đồ hoạt động sửa bài tuyển dụng

Hình 33 Biểu đồ hoạt động chỉnh sửa bài tuyển dụng
 


2.5.9	Biểu đồ hoạt động xóa bài tuyển dụng

Hình 34 Biểu đồ hoạt động xóa bài tuyển dụng
2.5.10	Biểu đồ hoạt động ẩn bài tuyển dụng
 




 
Hình 35 Biểu đồ hoạt động ẩn bài tuyển dụng
 


2.5.11	Biểu đồ hoạt động quản trị duyệt bài tuyển dụng


Hình 36 Biểu đồ hoạt động quản trị duyệt bài tuyển dụng
 

2.5.12	Biểu đồ hoạt động quản trị ẩn bài tuyển dụng


Hình 37 Biểu đồ hoạt động quản trị ẩn bài tuyển dụng
2.5.13	Biểu đồ hoạt động quản trị xóa bài tuyển dụng
 



 
Hình 38 Biểu đồ hoạt động quản trị xóa bài tuyển dụng
 
2.5.14	Biểu đồ hoạt động quản trị quản lý tài khoản người dùng

Hình 39 Biểu đồ hoạt động quản trị quản lý tài khoản người dùng
 
2.5.15	Biểu đồ hoạt động quản trị quản lý tài khoản doanh nghiệp

Hình 40 Biểu đồ hoạt động quản trị quản lý tài khoản doanh nghiệp
2.6	Biểu đồ tuần tự
Biểu đồ tuần tự (sequence diagram) biểu diễn sự tương tác giữa các đối tượng bằng việc nhấn mạnh thứ tự trao đổi thông điệp giữa các đối tượng. Biểu
 
đồ tuần tự gồm: Các đối tượng và các thông điệp trao đổi giữa các đối tượng. Mỗi đối tượng có một đường sinh tồn (lifeline) biểu diễn thời gian tồn tại của nó. Kí hiệu:

Hình 41 Kí hiệu đối tượng trong biểu đồ tuần tự.
Thời gian hoạt động (activation) là thời gian mà đối tượng đang thực hiện một thao tác. Kí hiệu:

Hình 42 Kí hiệu thời gian hoạt động trong biểu đồ tuần tự.
Một thông điệp đặc tả trao đổi giữa các đối tượng. Các loại thông điệp: Gọi (call), Trả về (return), Gửi (send), Tạo (create), Hủy (destroy). Thông điệp gọi gọi một phương thức/thao tác trên đối tượng. Đối tượng gọi phải đợi thông điệp được thực hiện kết thúc mới có thể thực hiện công việc khác (thông điệp đồng bộ). Một đối tượng có thể gửi thông điệp cho chính nó. Ký hiệu:

Hình 43 Kí hiệu cách gửi thông điệp trong biểu đồ tuần tự.
Thông điệp trả về trả về một giá trị cho đối tượng gọi. Ký hiệu:

Hình 44 Kí hiệu thông điệp trả về trong biểu đồ tuần tự.
Thông điệp gửi gửi một tín hiệu đến một đối tượng. Khác với thông điệp
 
gọi, khi đối tương gửi thông điệp gửi nó không chờ đợi, mà tiếp tục thực hiện công việc khác (thông điệp không đồng bộ). Ký hiệu:


Hình 45 Kí hiệu thông điệp gửi trong biểu đồ tuần tự.
Thông điệp tạo gọi phương thức tạo một đối tượng. Thông điệp hủy gọi phương thức hủy một đối tượng. Kí hiệu

Hình 46 Kí hiệu tạo/huỷ phương thức trong biểu đồ tuần tự.
Một thông điệp có thể được gửi lặp nhiều lần

Hình 47 Kí hiệu lặp thông điệp trong biểu đồ tuần tự.

Một thông điệp có thể được gửi lặp nhiều lần phụ thuộc vào một điều kiện.

Hình 48 Kí hiệu lặp thông điệp có điều kiện trong biểu đồ tuần tự.
Một thông điệp có thể được gửi phụ thuộc vào điều kiện rẽ nhánh. Ký hiệu:
 


 
Hình 49 Kí hiệu gửi phụ thuộc có điều kiện trong biểu đồ tuần tự.
Một thông điệp có thể được gọi đệ quy. Ký hiệu:

Hình 50 Kí hiệu đệ quy trong biểu đồ tuần tự.
 
2.6.1	Biểu đồ tuần tự đăng kí

Hình 51 Biểu đồ tuần tự đăng kí
2.6.2	Biểu đồ tuần tự đăng nhập
 

 
Hình 52 Biểu đồ tuần tự đăng nhập
 
2.6.3	Biểu đồ tuần tự khôi phục mật khẩu

Hình 53 Biểu đồ tuần tự khôi phục mật khẩu
2.6.4	Biểu đồ tuần tự tìm kiếm việc làm
 

 
Hình 54 Biểu đồ tuần tự tìm kiếm việc làm
 
2.6.5	Biểu đồ tuần tự ứng tuyển trực tuyến


Hình 55 Biểu đồ tuần tự ứng tuyển trực tuyến
 
2.6.6	Biểu đồ tuần tự quản lý hồ sơ


Hình 56 Biểu đồ tuần tự quản lý hồ sơ
 
2.6.7	Biểu đồ tuần tự thêm bài tuyển dụng

Hình 57 Biểu đồ tuần tự thêm bài tuyển dụng
2.6.8	Biểu đồ tuần tự chỉnh sửa bài tuyển dụng


Hình 58 Biểu đồ tuần tự chỉnh sửa bài tuyển dụng
 
2.6.9	Biểu đồ tuần tự ẩn bài tuyển dụng

Hình 59 Biểu đồ tuần tự ẩn bài tuyển dụng
2.6.10	Biểu đồ tuần tự quản trị duyệt bài tuyển dụng
 

 
Hình 60 Biểu đồ tuần tự quản trị duyệt bài tuyển dụng
 
2.6.11	Biểu đồ tuần tự quản trị ẩn bài tuyển dụng

Hình 61 Biểu đồ tuần tự quản trị ẩn bài tuyển dụng
 
2.6.12	Biểu đồ tuần tự quản trị xóa bài tuyển dụng

Hình 62 Biểu đồ tuần tự quản trị xóa bài tuyển dụng
2.6.13	Biểu đồ tuần tự quản trị quản lý tài khoản người dùng
 

 
Hình 63 Biểu đồ tuần tự quản trị quản lý tài khoản người dùng
 
2.6.14	Biểu đồ tuần tự quản trị quản lý tài khoản doanh nghiệp

Hình 64 Biểu đồ tuần tự quản trị quản lý tài khoản doanh nghiệp
2.7	Thiết kế cơ sở dữ liệu
2.7.1	Thiết kế bảng dữ liệu
Khi xây dựng một ứng dụng, việc thiết kế cơ sở dữ liệu đúng chuẩn và đáp ứng được truy cập là rất quan trọng. Một cơ sở dữ liệu tốt là cơ sở dữ liệu đủ tiêu chuẩn đáp ứng được tối thiểu chuẩn 3NF. Trong ứng dụng này, cơ sở dữ liệu sử dụng sẽ là PostgestSQL.

STT	Tên trường	Kiểu dữ liệu	Không Null	Khóa Chính
1	id	String	*	*
2	name	String		
3	numberPhone	String		
4	email	String	*	
5	password	String	*	
6	avatar	String		
7	role	int	*	
8	isBlock	bool		
 














STT	Tên trường	Kiểu dữ liệu	Không Null	Khóa Chính
1	id	String	*	*
2	name	String		
3	email	String	*	
4	avatar	String		
5	myCV	String		
6	favoriteJobs	List<Map>		
7	accountId	String	*	
Bảng 4 Thực thể Users

STT	Tên trường	Kiểu dữ liệu	Không Null	Khóa chính
1	id	String	*	*
2	name	String		
3	email	String	*	
4	avatar	String		
5	phone	String	*	
6	address	Map		
7	website	String		
8	myJobs	List<Map>		
 


STT	Tên trường	Kiểu dữ liệu	Được Null	Primary Key
1	id	String	*	*
2	business	Map	*	
3	businessId	String	*	
4	position	String	*	
5	levels	List<String>	*	
6	salary	double	*	
7	content	String	*	
8	skills	List<String>	*	
9	types	List<String>	*	
10	requirement	String	*	
11	quantity	int		
12	benefit	String	*	
13	startDay	String		
14	endDay	String		
15	viewCount	int		
16	isApprove	bool		
17	isHidden	bool		
18	createAt	String		
Bảng 6 Thực thể Jobs
 
2.7.2	Mô hình thực thể liên kết

Hình 65 Mô hình thực thể liên kết
2.7.3	Thiết kế biểu đồ lớp


Hình 66 Biểu đồ lớp của hệ thống
 
2.7.4	Mô hình cơ sở dữ liệu

Hình 67 Sơ đồ quan hệ cơ sở dữ liệu
 
CHƯƠNG 3 CÀI ĐẶT CHƯƠNG TRÌNH VÀ KẾT QUẢ
3.1	Cài đặt chương trình
3.1.1	Môi trường triển khai
•	Ứng dụng được triển khai dựa trên các công nghệ sau:
-	Flutter: Version 3.19.1
-	Dart: 3.3.0
•	Một số package sử dụng trong ứng dụng: cached_network_image: ^3.3.1
file_picker: ^5.1.1
flutter_localization: ^0.2.0 flutter_slidable: ^3.1.0
flutter_svg: ^2.0.9 geolocator: ^9.0.2 google_fonts: ^5.1.0 http: ^1.1.0
intl: ^0.18.1
pin_code_fields: ^8.0.1 pretty_http_logger: ^1.0.3 provider: ^6.1.2 lucide_icons: ^0.257.0 supabase_flutter: ^2.8.4 shared preferences: ^2.5.3
flutter_launcher_icons: ^0.13.1 json_serializable: ^6.9.4
flutter Lints: ^5.0.0
3.2	Kết quả chương trình
3.2.1	Màn hình splash
•	Mô tả: Màn hình hiểu thị khi mở ứng dụng,hiển thị logo nhằm tạo ra ấn tượng ban đầu cho người dung
 












 
Hình 68 Giao diện splash
3.2.2	Giao diện onboarding
•	Mô tả: Màn hình giới thiệu của app một cách cụ thể
 
















 
Hình 69 Màn hình onboarding1	


 
Hình 70 Màn hình onboarding2	 
Hình 71 Màn hình onboarding3


3.2.3	Giao diện đăng ký người dùng và nhà tuyển dụng
•	Mô tả: Màn hình Đăng ký là nơi người dùng có thể tạo một tài khoản mới trên ứng dụn. Màn hình này thường được hiển thị khi người dùng chưa có tài khoản hoặc muốn tạo một tài khoản mới để sử dụng các tính năng của ứng dụng.
 





 
Hình 72 Màn hình đăng ký tài khoản user	 
Hình 73 Màn hình tạo tài khoản nhà tuyển dụng


3.2.4	Giao diện đăng nhập
•	Mô tả: Màn hình Đăng nhập là nơi người dùng nhập thông tin tài khoản để truy cập vào ứng dụng. Màn hình này thường được hiển thị khi người dùng chưa đăng nhập.
 



 
Hình 74 Màn hình đăng nhập


3.2.5	Giao diện quên mật khẩu
•	Mô tả: Màn hình Quên Mật Khẩu là nơi người dùng có thể khôi phục mật khẩu của họ khi họ quên. Màn hình này thường được hiển thị khi người dùng chọn tùy chọn quên mật khẩu từ màn hình đăng nhập.
 



 
Hình 75 Màn hình quên mật khẩu

3.2.6	Giao diện trang chủ
•	Mô tả: Màn hình xuất hiện khi đăng nhập thành công. Hiển thị danh sách công việc đang hot, và công việc mới được đăng gần đây
•	Giao diện: Giao diện khi chờ dữ liệu và khi dữ liệu thành công. Có thể làm mới dữ liệu bằng hành động cuộn ngón tay xuống.
•	Có BottomNavigationBar để thực hiện chuyển giữa 4 màn hình trang chủ, tìm kiếm, yêu thích và hồ sơ.
 



 
Hình 76 Màn hình trang chủ 1	 
Hình 77 Màn hình trang chủ 2

3.2.7	Giao diện xem tất cả
•	Mô tả: Nhấn vào xem thêm để hiển thị nhìu hơn danh sách công việc.
 





 
Hình 78 Màn hình công việc phổ biến	 
Hình 79 Màn hình công việc gần đây


3.2.8	Giao diện chi tiết công việc
 

 
Hình 80 Màn hình chi tiết công việc
3.2.9	Giao diện tìm kiếm
•	Mô tả: Màn hình Tìm Kiếm Công Việc là nơi người dùng có thể tìm kiếm các công việc phù hợp với nhu cầu và mong muốn của người dùng trong ứng dụng. Nhập nhu cầu tìm kiếm vào ô TextField để tìm kiếm.
 



 
Hình 81 Giao diện tìm kiếm	
 
Hình 82 Màn hình tìm kiếm
3.2.10	Giao diện danh sách công việc yêu thích
•	Mô tả: Hiện thị danh sách công việc được yêu thích, nếu không có sẽ hiện dòng thông báo không có.
 



 

 

Hình 83 Màn hình yêu thích công việc khi rỗng
 
Hình 84 Màn hình yêu thích công
việc
 



3.2.11	Giao diện thay đổi thông tin
•	Mô tả: Màn hình thực hiện thay đổi thông tin của tài khoản như tên, số điện thoại, avatar. Trường email chỉ hiển thị không thay đổi được. Nhấn cập nhật hồ sơ để thực hiện thay đổi.
•	Khi thực hiện thay đổi thành công, hiển thị thông báo thay đổi thành công, và thay đổi thông tin ngay lặp tức. Cập nhật ảnh đại diện và tên mới ở màn hình trang chủ.
 



 
Hình 85 Màn hình thay đổi thông tin người dùng	 
Hình 86 Màn hình sau khi update xong
3.2.12	Giao diện đổi mật khẩu
•	Mô tả: Sử dụng khi người dùng muốn thay đổi mật khẩu của tài khoản. Yêu cầu nhập đúng mật khẩu hiện tại và nhập vào mật khẩu mới cho tài khoản.
•	Hiển thị thông báo khi nhập không đúng mật khẩu hiện tại..Hiển thị thay đổi mật khẩu thành công nếu nhập đúng mât khẩu hiện tại và yêu cầu đăng nhập lại.
 



 
Hình 87 Màn hình đổi mật khẩu	 
Hình 88 Màn hình đang thay đổi mật khẩu

3.2.13	Giao diện thay đổi ngôn ngữ
•	Mô tả: Thực hiện thay đổi ngôn ngữ cho ứng dụng. Hiện tại ứng dụng đang hỗ trợ 2 ngôn ngữ là tiếng anh và tiếng việt.
 

 
Hình 89 Màn hình chọn ngôn ngữ tiếng anh	 
Hình 90 Màn hình chọn ngôn ngữ tiếng việt


3.2.14	Giao diện đăng xuất
•	Mô tả: Khi chọn đăng xuất hiển thị hộp thoại hỏi có chắc chắn muốn đăng xuất không, nếu chọn hủy sẽ tắt hộp thoại, chọn có để đăng xuất tài khoản khỏi ứng dụng và về màn hình đăng nhập.
 



 
Hình 91 Màn hình có giao diện log out	 
Hình 92 Màn hình log out
3.2.15	Giao diện trang chủ doanh nghiệp
•	Mô tả: Hiển thị danh sách bài đăng của doanh nghiệp đăng tải, nếu rỗng hiển thị ghi chú rỗng.
 



 
Hình 93 Màn hình trang chủ doạnh nghiệp
3.2.16	Giao diện đăng tải công việc
•	Mô tả: Doanh nghiệp muốn tạo bài đăng. Điền đầy đủ thông tin việc làm. Các trường được đánh dấu không được để rỗng
 



 
Hình 94 Màn hình đăng tải công việc
3.2.17	Giao diện chi tiết công việc ở vai trò doanh nghiệp
•	Mô tả: Hiện thỉ thông tin công việc, có 2 nút để ẩn hiện công việc và chỉnh sửa công việc. Khi muốn ẩn công việc hiển thị hộp thoại hỏi có chắc muốn ẩn công việc không, nếu chọn có sẽ ẩn công việc.
•	Xác nhận muốn ẩn bài đăng tuyển dụng khi nhấn vào nút có (YES).
 



 
Hình 95 Màn hình chi tiết công việc	 
Hình 96 Màn hình ẩn công việc
3.2.18	Giao diện chỉnh sửa công việc
•	Mô tả: Sử dụng khi doanh nghiệp muốn chỉnh sửa bài đăng tuyển dung. Thực hiện thay đổi và nhấn chỉnh sửa, nhưng khi chỉnh sửa vẫn cần phải được quản trị viên duyệt bài mới được đăng tải.
•	Hiển thị thông báo khi chỉnh sửa thành công.
 


 
Hình 97 Màn hình chỉnh công việc (1)	 
Hình 98 Màn hình chỉnh công việc (2)
3.2.19	Giao diện xoá công việc
•	Mô tả: Trược ngón tay sang ngang hiển thị nút xóa bài đăng công việc, Khi chọn hiển thị hộp thoại xác nhận, nếu xác nhận sẽ xóa công việc khỏi danh sách
 

 
Hình 99 Màn hình xoá công việc (1)	 
Hình 100 Màn hình xóa công việc (2)

3.2.20	Giao diện quản lý hồ sơ doanh nghiệp
•	Mô tả: Có các chức năng thay đổi hồ sơ, thay đổi mật khẩu, thay đổi ngôn ngữ giống người dùng.
 

 
Hình 101 Màn hình quản lí hồ sơ doanh nghiệp
3.2.21	Giao diện trang quản trị viên
•	Mô tả: Giao diện dành cho quản trị viên quản lý bài đăng và tài khoản. Chỉ có thể vào bằng tài khoản quản trị viên. Hiển thị danh sách công việc.
•	Quản trị viên có quyền xóa bài đăng.
 



 
Hình 102 Màn hình quản lý bài đăng(1)	 
Hình 103 Màn hình quản lý bài đăng(2)


3.2.22	Giao diện chức năng duyệt bài đăng
•	Mô tả: Quản trị viên xem chi tiết công việc và có thể duyệt bài đăng đạt yêu cầu. Khi duyệt hiển thị hộp thoại nếu xác nhận sẽ thực hiện duyệt bài đăng.
 



 
Hình 104 Màn hình duyệt bài tuyển dụng	 
Hình 105 Màn hình xác nhận duyệt bài tuyển dụng


3.2.23	Giao diện quản lý tài khoản người dùng
•	Mô tả: Quản lý tài khoản trong ứng dụng admin cho phép quản trị viên quản lý và duyệt các tài khoản người dùng và nhà tuyển dụng.
•	Chọn loại tài khoản: Quản trị viên có thể chọn giữa hai loại tài khoản: người tìm việc (User) và nhà tuyển dụng (Recruiter) thông qua menu thả xuống trên thanh điều hướng.
•	Danh sách tài khoản: Mỗi tài khoản người dùng được hiển thị dưới dạng một Card, với thông tin về avatar, tên, email và trạng thái tài khoản (đang hoạt động hay đã khóa).
•		Duyệt tài khoản: Đối với tài khoản nhà tuyển dụng chưa được duyệt, quản trị viên có thể bấm vào nút "Duyệt" để duyệt tài khoản. Sau khi duyệt thành công, thông báo sẽ xuất hiện trên màn hình.
•	Quản lý trạng thái tài khoản: Quản trị viên có thể thay đổi trạng thái của tài khoản nhà tuyển dụng giữa "Đang hoạt động" và "Đã khóa".
 
Nút "Khóa" hoặc "Mở" sẽ được hiển thị tùy thuộc vào trạng thái hiện tại của tài khoản.
•	Hiển thị trạng thái tài khoản: Nếu tài khoản đã được duyệt, trạng thái sẽ được hiển thị dưới dạng "Đang hoạt động" hoặc "Đã khóa". Người dùng có thể thao tác để thay đổi trạng thái tài khoản của nhà tuyển dụng




 
Hình 106 Màn hình quản lý tài khoản user	 
Hình 107 Màn hình quản lý tài khoản recruiter
3.2.24	Giao diện quản lý màn hình doanh nghiệp
•	Mô tả: Màn hình này hiển thị danh sách các doanh nghiệp đã đăng ký trên hệ thống, kèm theo số lượng công việc mà mỗi doanh nghiệp đã đăng. Admin có thể nhấn vào biểu tượng khóa/mở khóa để thay đổi trạng thái hoạt động của doanh nghiệp. Ngoài ra, admin cũng có thể nhấn vào từng doanh nghiệp để xem chi tiết thông tin và danh sách công việc đã đăn
 



 
Hình 108 Màn hình quản lý doanh nghiệp
3.2.25	Giao diện khóa tài khoản doanh nghiệp
Các doanh nghiệp vi phạm admin sẽ có quyền khóa tài khoản
 



 
Hình 109 Màn hình khóa tài khoản doanh nghiệp
 
CHƯƠNG 4 KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN
4.1	Kết quả đạt được
Về kiến thức và học tập
Lần thực tập này đối với chúng em không chỉ là một cơ hội quý giá mà còn là một thử thách đầy hứng khởi, giúp chúng em phát triển bản thân và rèn luyện những kỹ năng mới. Qua quá trình làm quen và thực hành với các ngôn ngữ lập trình cũng như framework, chúng em nhận ra được những điểm đặc trưng và sức hấp dẫn riêng mà mỗi công nghệ mang lại. Các kiến thức từ Dart, Flutter, HTML, CSS… mà thầy cô đã truyền đạt trong suốt thời gian học giờ đây không chỉ là lý thuyết mà đã trở thành nền tảng vững chắc, giúp em tự tin và chủ động trong việc học hỏi thêm những kiến thức mới.
Điều đặc biệt là chúng em có cơ hội áp dụng lý thuyết vào thực tiễn, từ việc phân tích, thiết kế hệ thống đến giải quyết các vấn đề thực tế trong quá trình nghiên cứu. Cả việc xây dựng cơ sở dữ liệu lẫn phân tích hệ thống đều được thực hiện tỉ mỉ và hợp lý, để đảm bảo phần mềm hoạt động hiệu quả và đáp ứng nhu cầu người dùng. Đồng thời, em cũng đặc biệt chú trọng đến việc tìm hiểu và tối ưu cấu trúc hệ thống, nhằm mang lại trải nghiệm người dùng mượt mà và hoàn hảo nhất.
Về phần mềm
Phần mềm được phát triển bằng ngôn ngữ Dart, với vai trò là bộ xử lý logic mạnh mẽ, thực hiện các tác vụ tìm kiếm, lưu trữ và cập nhật dữ liệu, sau đó trả kết quả về cho người dùng một cách nhanh chóng và chính xác. Đồng thời, phần mềm cũng tận dụng Flutter – framework mạnh mẽ của Dart – để tạo ra các giao diện người dùng trực quan, dễ sử dụng, giúp người tìm việc và nhà tuyển dụng tương tác trực tiếp với hệ thống.
Hệ thống được thiết kế để vận hành nhanh chóng và hiệu quả, đảm bảo mang đến trải nghiệm mượt mà cho người dùng. Đặc biệt, khi người dùng tìm kiếm việc làm hoặc đăng tuyển dụng, tốc độ tải trang và khả năng truy xuất dữ liệu là yếu tố quan trọng, do đó, hệ thống được tối ưu hóa để đáp ứng nhanh chóng các yêu cầu này.
Bên cạnh đó, giao diện của phần mềm được chăm chút kỹ lưỡng, với bố cục rõ ràng và tương phản hợp lý, nhằm thu hút và giữ chân người sử dụng. Tất cả các dữ liệu từ người dùng đều được xử lý chính xác và hiệu quả, đảm bảo tính toàn vẹn và nhanh chóng trong mọi giao dịch.
Ngoài ra, hệ thống còn cung cấp một trang quản lý dành riêng cho người quản trị, giúp họ dễ dàng theo dõi và điều hành các hoạt động trên nền tảng. Các chức năng quản lý, duyệt bài đăng, theo dõi ứng viên và xử lý tình huống đều được tích hợp, giúp người quản lý dễ dàng hỗ trợ người tìm việc và nhà tuyển dụng, đồng thời đảm bảo mọi quy trình diễn ra suôn sẻ và kịp thời.
4.2	Hạn chế của đề tài
- Một số hạn chế của đề tài :
 
•	Giới hạn tính năng: Mặc dù ứng dụng cung cấp những chức năng cơ bản như tìm kiếm việc làm và đăng hồ sơ, nhưng vẫn còn nhiều tính năng phức tạp và nâng cao chưa được triển khai, chẳng hạn như hỗ trợ đa ngôn ngữ, tích hợp với các nền tảng tuyển dụng khác, hay các công cụ phân tích dữ liệu để hỗ trợ người tìm việc và nhà tuyển dụng đưa ra quyết định.
•	Vấn đề về hiệu suất khi mở rộng: Khi ứng dụng phát triển và lượng người dùng cũng như dữ liệu tăng lên, có thể gặp phải những vấn đề về tốc độ truy xuất dữ liệu hoặc xử lý yêu cầu từ người dùng. Hệ thống cần được tối ưu hóa để có thể đáp ứng nhu cầu mở rộng trong tương lai.
•	Khả năng tương thích với thiết bị: Mặc dù Flutter giúp phát triển ứng dụng đa nền tảng, nhưng vẫn có thể gặp phải một số vấn đề tương thích trên các loại thiết bị khác nhau, đặc biệt là với các phiên bản hệ điều hành cũ hoặc những thiết bị có cấu hình hạn chế.
•	Bảo mật và quyền riêng tư: Việc bảo vệ thông tin cá nhân, đặc biệt là hồ sơ và dữ liệu nhạy cảm của người dùng, luôn là một thách thức lớn. Cần có các biện pháp bảo mật mạnh mẽ để đảm bảo rằng dữ liệu của người dùng được bảo vệ an toàn và tuân thủ các quy định về quyền riêng tư.
•	Chức năng quản lý còn hạn chế: Hệ thống hiện tại mới chỉ cung cấp những công cụ quản lý cơ bản, nhưng chưa đáp ứng được các yêu cầu phức tạp hơn như kiểm duyệt tự động, phân loại công việc, hay quản lý ứng viên hiệu quả khi số lượng tăng cao.
•	Hỗ trợ người dùng chưa hoàn thiện: Dù đã tích hợp chatbot AI để hỗ trợ người dùng, nhưng khả năng xử lý các câu hỏi phức tạp hoặc các tình huống ngoài kịch bản dự đoán vẫn còn hạn chế. Hệ thống cần được cải tiến để trở nên thông minh và linh hoạt hơn trong việc hỗ trợ người dùng.
•	Kết nối với nhà tuyển dụng chưa rộng rãi: Mặc dù hệ thống đã cung cấp những cơ hội việc làm, nhưng số lượng công ty đăng tuyển và các cơ hội nghề nghiệp vẫn còn hạn chế. Điều này có thể ảnh hưởng đến sự đa dạng và phong phú của các lựa chọn cho người tìm việc.
Tuy nhiên, những hạn chế này cũng chính là cơ hội để chúng em tiếp tục cải tiến và phát triển ứng dụng, nhằm tạo ra một công cụ mạnh mẽ và hiệu quả hơn cho người tìm việc và nhà tuyển dụng trong tương lai.
4.3	Hướng phát triển
Hướng phát triển tiềm năng cho ứng dụng tìm kiếm việc làm trong lĩnh vực công nghệ thông tin là mở rộng tính năng tìm kiếm và lọc công việc, cho phép
người dùng tìm kiếm theo nhiều tiêu chí như mức lương, địa điểm và yêu cầu kỹ năng. Đồng thời, việc tích hợp các công cụ phân tích dữ liệu cho nhà tuyển dụng, như báo cáo về hiệu quả bài đăng hoặc đánh giá ứng viên, sẽ giúp cải
thiện quá trình tuyển dụng. Ngoài ra, việc nâng cấp tính năng bảo mật, hỗ trợ đa ngôn ngữ, và tối ưu hóa hiệu suất sẽ nâng cao trải nghiệm người dùng và mở
 
rộng phạm vi ứng dụng ra nhiều quốc gia, tạo cơ hội tiếp cận công việc và ứng viên đa dạng hơn.
 

TÀI LIỆU THAM KHẢO



[1]	B. K. Alan Donovan, Go Programming Language, The (Addison-Wesley Professional Computing Series), Boston: Addison-Wesley Professional, 2015.
[2]	“Dart programming language,” 2024. [Trực tuyến]. Available: https://dart.dev/.
[3]	“gRPC official site,” 2024. [Trực tuyến]. Available: https://grpc.io/.
[4]	M. K. K. D. M. V. N. Raywenderlich Tutorial Team, Flutter Apprentice (First Edition): Learn to Build Cross-Platform Apps, Flutter Apprentice (First Edition): Learn to Build Cross-Platform Apps: Amazon Digital Services LLC - KDP Print US, 2020.
[5]	“Flutter documentation,” 2024. [Trực tuyến]. Available: https://docs.flutter.dev/.
[6]	“ https://flutter.dev/,” 2024. [Trực tuyến]. Available: https://flutter.dev/.
[7]	“Flutter official site,” 2024. [Trực tuyến]. Available: https://flutter.dev/.
[8]	“Supabase Docs: Architecture,” 2024. [Trực tuyến]. Available: https://supabase.com/docs/guides/getting-started/architecture.
[9]	“Prisma ORM for Supabase,” 2024. [Trực tuyến]. Available: https://www.prisma.io/docs/orm/overview/databases/supabase.

[10]	G. C. Simon Riggs, PostgreSQL 14 Administration Cookbook, Birmingham: Packt Publishing, 2022.
[11]	“PostgreSQL vs MySQL (SQLAdvice),” 2024. [Trực tuyến]. Available: http://sqladvice.com/postgresql-la-gi-so-sanh-mysql-va-postgresql/.

[12]	“https://grpc.io/,” 2024. [Trực tuyến]. Available: https://graphql.org/.
[13]	S. Sinha, Quick Start Guide to Dart Programming, Berkeley: Apress, 2020.

