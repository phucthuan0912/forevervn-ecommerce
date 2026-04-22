ĐẠI HỌC ĐÀ NẴNG
TRƯỜNG ĐẠI HỌC SƯ PHẠM
KHOA TIN HỌC
 



BÁO CÁO ĐỒ ÁN

ĐỀ TÀI
XÂY DỰNG WEBSITE THIẾT BỊ ĐIỆN TỬ
DỰA TRÊN MERN






	

	Giảng viên hướng dẫn : TS. Nguyễn Đình Lầu
	Sinh viên thực hiện	  : Ngô Minh Hiệp
	Lớp	  : 20CNTTC	









ĐÀ NẴNG, THÁNG 4/2024


NHẬN XÉT CỦA CÁN BỘ HƯỚNG DẪN
………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………
       Đà Nẵng, ngày … tháng … năm ....	
	         Cán bộ hướng dẫn
                     (Ký và ghi rõ họ tên)	




NHẬN XÉT CỦA HỘI ĐỒNG PHẢN BIỆN
………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………

Đà Nẵng, ngày … tháng … năm 2024
               Hội đồng phản biện



Mục lục
MỤC LỤC 	4
LỜI CẢM ƠN	7
LỜI MỞ ĐẦU	9
GIỚI THIỆU 	10
1.	Lý do chọn đề tài	10
2.	Mục đích và ý nghĩa của chủ đề 	10
3.	Nhiệm vụ 	11
4.	Bố cục 	11
CHƯƠNG I: TỔNG QUAN 	12
1.	Môi trường 	12
1.1.  Giới thiệu Nodejs Framework 	12
1.2.  MongoDb là gì? 	14
2.	Giao diện 	15
2.1 HTML	15
2.2	 CSS & Tailwindcss Framework 	16
2.3	 Javascript	17
3.	Reactjs và MERN	21
3.1	ReactJs 	22
3.2	MERN	23
CHƯƠNG II: Phân tích thiết kế hệ thống	25
1.	Phân tíchyêu cầu 	25
1.1 Đặc tả hệ thống 	25
		Admin 	25
		User 	25
1.2 Xác định tác nhân 	26
1.3 Xác định chức năng 	26
1.4 Xác định đặc điểm 	26
2.	Phân tích cơ sở dữ liệu và thiết kế 	33
3.	Sơ đồ trường hợp từng sử dụng 	34
3.1.	Sơ đồ đăng kí diagram 	34
3.2.	Login – Logout diagram 	34
3.3.	Sơ đồ trường hợp quản lý sản phẩm 	35
3.4.	Sơ đồ trường hợp thống kê đơn hang 	35
3.5.	Sơ đồ trường hợp quản lý tài khoản 	35
3.6.	Sơ đồ trường hợp thị trường đặt lệnh 	36
3.7.	Sơ đồ tìm kiếm 	36
4.	Sơ đồ hiện trạng 	36
4.1.	Sơ đồ trạng thái đăng ký 	36
4.2.	Sơ đồ trạng thái đăng nhập 	37
4.3.	Sơ đồ quản lý sản phẩm 	37
4.4.	Sơ đồ trạng thái thống kê đơn hàng 	37
4.5.	Sơ đồ trạng thái của giỏ hàng 	38
4.6.	Sơ đồ trạng thái đơn hàng 	38
4.7.	Sơ đồ trạng thái tìm kiếm 	39
5.	Biểu đồ tuần tự 	40
5.1.	Biểu đồ tuần tự cho use case đăng nhập 	40
5.2.	Biểu đồ tuần tự đăng ký thành viên 	41
5.3.	Biểu đồ tuần tự cho use case thêm giỏ hàng 	41
5.4.	Biểu đồ tuần tự cho use case gửi đơn đặt hàng 	42
5.5.	Biểu đồ tuần tự xem thành viên	42
5.6.	Biểu đồ tuần tự xóa thành viên	43
5.7.	Biểu đồ tuần tự thêm thành viên	43
6.	Biểu đồ lớp phân tích 	44
CHƯƠNG III: Cài đặt chương trình 	45
1.	Giao diện người dùng	45
1.1 Trang chủ 	45
1.2 Thanh tiêu đề	45
1.3 Trang sản phẩm	45
	1.4. SearchBar	45
	1.5 Trang đặt hang 	47
	1.6 Trang thanh toán 	47
	1.7 Login và Sign	48
2.	Giao diện Admin 	49
2.1 Admin 	49
2.2 Thêm sản phẩm 	49
2.3 Quản lý trang sản phẩm 	49
2.4 Quản lý trang User 	50
2.5 Quản lý trang đơn hàng 	50
3.	Backend(code process)	50
Chương IV: KẾT LUẬN 	51
    1 Giới hạn 	51
    2 Hướng phát triển 	51
    3 Tham khảo 	51


























LỜI CẢM ƠN

Nhóm đề tài xin chân thành cảm ơn Khoa Công nghệ thông tin Trường Đại học Sư phạm đã tạo điều kiện tốt cho nhóm đề tài thực hiện tốt đề tài đồ án tốt nghiệp này. 

Nhóm đề tài xin chân thành cảm ơn quý thầy cô trong khoa Công nghệ thông tin đã tận tình giảng dạy, trang bị cho nhóm những kiến thức quý báu trong những năm học qua, giúp nhóm có một nền tảng kiến thức vững chắc để hoàn thành đề tài này. Đặc biệt nhóm đề tài xin chân thành cám ơn sự nhiệt tình hướng dẫn và đóng góp ý kiến của thầy T.S Nguyễn Đình Lầu đã giúp đề tài của em hoàn thành tốt đề án tốt nghiệp. 

Mặc dù nhóm đề tài đã cố gắng hoàn thành đồ án tốt nghiệp trong phạm vi và khả năng cho phép nhưng chắc chắn vẫn không tránh khỏi những thiếu sót. Nhóm đề tài kính mong nhận được sự thông cảm và tận tình đóng góp ý kiến của quý thầy cô và các bạn. 
Em xin chân thành cảm ơn!
						Sinh viên thực hiện:


					   	   Ngô Minh Hiệp
















LỜI MỞ ĐẦU

1.	Lý do chọn đề tài: 
	Đối với một quốc gia đang phát triển như Thế giới, việc con người cập nhật thông tin đối với thiết bị hiện đại đặc biệt là thiết bị điện tử và cần tiếp cận xu hướng là điều quan trọng. Bởi vì mọi người không có khả năng linh hoạt để cập nhật xu hướng nhanh nhất có thể. Vì vậy, việc tạo ra một website bán thiết bị điện tử để mọi người theo dõi những xu hướng mới nhất trên thế giới hiện nay thông qua mạng công nghệ 4.0 hiện nay.
	Vì những lý do nêu trên, được biết, website đặt hàng trực tuyến sẽ giúp khách hàng giảm bớt thời gian, công sức khi phải đến cửa hàng mua hàng, lựa chọn cho mình những linh kiện, thiết bị điện tử phù hợp. Với ngân sách eo hẹp, khách hàng chỉ cần có thiết bị kết nối internet là có thể mua được những món đồ cần thiết.
Với nhu cầu trên tôi đã xây dựng website thiết bị kết hợp với ngôn ngữ lập trình JavaScript và theo mô hình MERN.

2.	Mục đích và ý nghĩa của chủ đề:
	Qua đề tài em đã đi đến quyết định xây dựng một website bán thiết bị điện tử để phục vụ mọi người trong việc nắm bắt thông tin mọi lúc, mọi nơi. Ngoài ra, với Project Report này, độc giả có cái nhìn sâu sắc hơn về quá trình triển khai một dự án thực tế với những công nghệ và môi trường mới nhất hiện nay

3.	Nhiệm vụ: 
-	Xây dựng website hoàn chỉnh với đầy đủ các chức năng hỗ trợ quản trị như: Thêm, chỉnh sửa, xóa, cập nhật.
-	Xây dựng website hoàn chỉnh với các chức năng hỗ trợ người dùng như: Đọc, Tìm kiếm mặt hàng, linh kiện điện tử, xem thông tin và mua hàng.



4.	Bố cục:
-	Giới thiệu: Nêu lý do nêu mục đích, ý nghĩa và nhiệm vụ cụ thể của đề tài.
-	Phần 1: Chương này giới thiệu các kiến thức liên quan đến công nghệ triển khai Website trên HTML5, CSS3, TailwindCSS Framework, antd Lib, JavaScript, ReactJS để xử lý giao diện Front-end. Sử dụng NodeJ để xử lý Back-end, MongoDb để xử lý DataBase.
-	Phần 2 – Phân tích và thiết kế hệ thống: Chương này trình bày các yêu cầu của dự án, phân tích thiết kế giao diện và phân tích thiết kế DataBase.
-	Phần 3 – Cài đặt chương trình: Chương này cài đặt môi trường, Front-end sử dụng HTML5, CSS3 với TailwindCSS Framework và antd Lib tương tác từ Back-end sử dụng NodeJs Framework với Database và trả về Front-end.
-	Kết luận: Chỉ ra những tồn tại còn tồn tại của hệ thống cũng như quá trình phát triển hệ thống trong tương lai và nguồn mã nguồn, tài liệu tham khảo trong quá trình nghiên cứu, triển khai dự án. 
Chương I: TỔNG QUAN
1.	Môi trường
1.1	Giới thiệu NodeJs
Node.js là môi trường thời gian chạy JavaScript đa nền tảng và mã nguồn mở. Nó được xây dựng dựa trên Công cụ JavaScript V8 của Chrome, có thể chuyển đổi mã JavaScript thành mã máy cấp thấp. Mục đích chính của Node.Js là phát triển các ứng dụng web có khả năng mở rộng.
 
Node.js là môi trường chạy JavaScript mạnh mẽ và hiệu quả. Nó được sử dụng rộng rãi để phát triển các ứng dụng web thời gian thực, API, Ứng dụng một trang, máy chủ web và nhiều ứng dụng khác.
Các tính năng chính của Node.js:
•	Đa nền tảng: Node.js có thể chạy trên nhiều hệ điều hành khác nhau như Windows, Linux, macOS.
•	Hiệu suất cao: Node.js sử dụng mô hình lập trình không đồng bộ và I/O không chặn, giúp các ứng dụng web có thể xử lý nhiều yêu cầu đồng thời một cách hiệu quả.
•	Dễ sử dụng: Node.js sử dụng JavaScript, một ngôn ngữ lập trình phổ biến, dễ học.	


Ứng dụng Node.js:
•	Phát triển web: Node.js được sử dụng để phát triển các ứng dụng web thời gian thực, API, ứng dụng web một trang (Single Page Application).  • Lập trình máy chủ: Node.js có thể được sử dụng để phát triển các máy chủ web hiệu suất cao.  
•	Xử lý dữ liệu: Node.js có thể được sử dụng để xử lý dữ liệu JSON, CSV, XML.  
•	Lập trình mạng: Node.js có thể được sử dụng để phát triển các ứng dụng mạng như chatbot.
Lợi ích của việc sử dụng Node.js:
•	Hiệu suất cao: Node.js có thể xử lý nhiều yêu cầu đồng thời một cách hiệu quả.
•	Dễ sử dụng: Node.js sử dụng JavaScript, một ngôn ngữ lập trình phổ biến và dễ học.
•	Cộng đồng lớn: Node.js có cộng đồng nhà phát triển lớn và năng động.
•	Nhiều thư viện: Node.js có nhiều thư viện mã nguồn mở hỗ trợ nhiều chức năng khác nhau.
Lỗi sử dụng Node.js:
•	Khả năng đa luồng hạn chế: Node.js sử dụng mô hình lập trình không đồng bộ nên khả năng đa luồng của nó bị hạn chế.
•	Học nâng cao: Để sử dụng Node.js hiệu quả, bạn cần có kiến thức về JavaScript và mô hình lập trình bất đồng bộ.
Thiết lập NodeJS
Để cài đặt NodeJS, hãy mở tệp cài đặt bạn vừa tải xuống ở bước trên.
Tại màn hình cài đặt nhấn Next
 
	Chọn “I accept…” rồi ấn next
 
	Chọn vị trí lưu trữ, bạn có thể bỏ qua và nhấn Next.
 

	Bước này chọn các tính năng trong NodeJS như NPM...... Ta có thể để mặc định và nhấn Next
 
	Tiếp tục nhấn Next đến bước Install rồi nhấn Install để bắt đầu cài đặt NodeJS.

 

1.2	MongoDb là gì?
+ MongoDB là cơ sở dữ liệu hướng tài liệu, một loại cơ sở dữ liệu NoSQL. Do đó, MongoDB sẽ tránh cấu trúc dựa trên bảng của cơ sở dữ liệu quan hệ để chứa các tài liệu như JSON với một lược đồ rất linh hoạt được gọi là BSON. MongoDB sử dụng lưu trữ dữ liệu dưới dạng Document JSON nên mỗi bộ sưu tập sẽ có kích thước và tài liệu khác nhau. Dữ liệu được lưu trữ trong tài liệu JSON nên các truy vấn sẽ rất nhanh.
 + Mục đích của Mongo:
Quản lý và phân phối nội dung – Quản lý nhiều sản phẩm nội dung trong một kho dữ liệu duy nhất cho phép thay đổi và phản hồi nhanh chóng mà không làm phức tạp thêm hệ thống nội dung.
Kiến trúc xã hội và di động – MongoDB cung cấp nền tảng sẵn sàng, đáp ứng và có thể mở rộng, cho phép thực hiện nhiều khả năng đột phá, phân tích thời gian thực và hỗ trợ toàn cầu.
Quản lý dữ liệu khách hàng – Tận dụng khả năng truy vấn nhanh để phân tích thời gian thực trên cơ sở dữ liệu người dùng cực lớn với các mô hình dữ liệu phức tạp với lược đồ linh hoạt và phân vùng tự động để mở rộng quy mô theo chiều ngang.

 Ưu điểm của MongoDb:
•	Lưu trữ dữ liệu không có cấu trúc, không ràng buộc và có tính toàn vẹn nên có tính sẵn sàng cao, hiệu suất cao và dễ dàng mở rộng lưu trữ.
•	Dữ liệu được cache (đệm) vào RAM, hạn chế truy cập vào ổ cứng nên tốc độ đọc ghi cao.
Nhược điểm của MongoDb:
•	Không thể áp dụng cho bất kỳ mô hình giao dịch nào yêu cầu độ chính xác cao vì không có ràng buộc.
•	Chưa có cơ chế giao dịch phục vụ các ứng dụng ngân hàng.
•	RAM là trung tâm xử lý dữ liệu nên khi hoạt động cần dung lượng RAM lớn.
•	Mọi thay đổi về dữ liệu mặc định đều không được ghi vào ổ cứng ngay lập tức nên khả năng mất dữ liệu do mất điện đột xuất là rất cao.
Thiết lập Apache: 
-	Bước 1: Vào trang chủ MongoDb https://www.mongodb.com/
-	Bước 2: Nhấn Connect DataBase. Tùy thuộc vào thiết bị bạn đang sử dụng, hãy chọn phương pháp bạn muốn sử dụng.
-	Bước 3: Cài đặt Driver bằng dòng lệnh npm install mongodb.
-	Bước 4: Thêm chuỗi mã vào file.
.envmongodb+srv://khanhtruong326:<password>@cluster0.tru4xia.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
2.	Giao diện
2.1	HTML:
-	InterfaceHTML là tên viết tắt của Hypertext Markup Language, là ngôn ngữ được sử dụng rộng rãi nhất để viết trang Web.
-	Siêu văn bản là cách các trang Web (tài liệu HTML) được kết nối với nhau. Và vì vậy, liên kết trên trang Web được gọi là Hypertext.
-	Như tên cho thấy, HTML là Ngôn ngữ đánh dấu, nghĩa là HTML đánh dấu một tài liệu văn bản bằng các thẻ để cho trình duyệt Web biết cách cấu trúc nó để hiển thị. màn hình.
	Lịch sử của HTML:
	+ HTML được tạo ra bởi Tim Berners-Lee, nhà vật lý tại trung tâm nghiên cứu CERN ở Thụy Sĩ. Ông nảy ra ý tưởng về một hệ thống siêu văn bản dựa trên Internet.
	+ Siêu văn bản là văn bản chứa các liên kết, nơi người xem có thể truy cập ngay. Ông xuất bản phiên bản HTML đầu tiên vào năm 1991 bao gồm 18 thẻ HTML. Kể từ đó, mỗi phiên bản HTML mới đều có thêm các thẻ mới và thuộc tính mới.
	+ Theo Mozilla Developer Network: HTML Element Reference, hiện có hơn 140 thẻ HTML, mặc dù một số trong số đó đã bị ngừng sử dụng (không được các trình duyệt hiện đại hỗ trợ).
	+ Ngày càng phổ biến, HTML được coi là tiêu chuẩn bí mật của một website. Các cài đặt và cấu trúc HTML được vận hành và phát triển bởi World Wide Web Consortium (W3C). Bạn có thể kiểm tra trạng thái mới nhất của ngôn ngữ này bất kỳ lúc nào trên trang web của W3C.
Cách HTML hoạt động:
	+ Tài liệu HTML là các tệp có đuôi mở rộng .HTML hoặc .html Bạn có thể xem chúng bằng bất kỳ trình duyệt web nào (như Google Chrome, Safari hoặc Mozilla Firefox). Trình duyệt đọc các tệp HTML này và xuất bản nội dung lên internet để người đọc có thể xem.
	+ Thông thường, trung bình một website chứa nhiều trang HTML, ví dụ: trang chủ, trang giới thiệu, trang liên hệ, tất cả các trang này đều cần có các trang HTML riêng biệt.
	+ Mỗi trang HTML chứa một tập hợp các thẻ (còn gọi là phần tử), mà bạn có thể coi như các khối xây dựng của một trang web. Nó tạo ra cấu trúc cây thư mục bao gồm các phần, đoạn văn, tiêu đề và các khối nội dung khác.
Ưu điểm và nhược điểm HTML
Ưu điểm:
-	Ngôn ngữ được sử dụng rộng rãi này có rất nhiều tài nguyên hỗ trợ và cộng đồng người dùng khổng lồ.
-	Sử dụng mượt mà trên hầu hết mọi trình duyệt.
-	Có quy trình học tập đơn giản và trực tiếp.
-	Mã nguồn mở và hoàn toàn miễn phí.
-	Đánh dấu gọn gàng và nhất quán.
-	Các tiêu chuẩn web chính được điều hành bởi World Wide Web Consortium (W3C).
-	Dễ dàng tích hợp với các ngôn ngữ phụ trợ như Js và Node.js.
-	
Nhược điểm:
Chủ yếu được sử dụng cho các trang web tĩnh. Đối với các tính năng động, bạn cần sử dụng JavaScript hoặc ngôn ngữ phụ trợ của bên thứ 3 như PHP.
Nó có thể thực thi logic nhất định cho người dùng. Do đó, hầu hết các trang cần được tạo riêng biệt, ngay cả khi chúng sử dụng các thành phần giống nhau, chẳng hạn như đầu trang hoặc chân trang.
Một số trình duyệt chậm hỗ trợ các tính năng mới.
Khó kiểm soát việc thực thi trình duyệt (ví dụ: trình duyệt cũ không thể hiển thị thẻ mới)
2.2	CSS & TailwindCss Framework 
	Ưu điểm của CSS:
 	CSS là viết tắt của Cascading Style Sheets, là ngôn ngữ được sử dụng để tìm và định dạng lại các phần tử được tạo bởi các ngôn ngữ đánh dấu (ví dụ: HTML). CSS sẽ giúp chúng ta thêm một chút “phong cách” cho các thành phần HTML như thay đổi màu trang, đổi màu chữ, thay đổi cấu trúc,...
CSS hoạt động như thế nào?
	+ CSS sử dụng cấu trúc tiếng Anh đơn giản để tạo ra một bộ quy tắc mà bạn có thể tận dụng. Như đã đề cập ở trên, HTML không dùng để tạo kiểu cho các phần tử, nó chỉ làm nổi bật từng phần để biết phần tử đó là gì. Ví dụ: <p>This is text. </p>.
	+ Làm thế nào để tạo kiểu cho đoạn văn bản đó? Cú pháp CSS rất đơn giản. Nó có một khối lựa chọn và một khối khai báo. Bạn chọn một phần tử và khai báo phải làm gì với nó. Rất đơn giản phải không? Tuy nhiên, cũng có nhiều quy tắc cần ghi nhớ. Bộ chọn sẽ trỏ đến phần tử HTML mà bạn muốn tạo kiểu. Khối khai báo sẽ bao gồm một hoặc nhiều khai báo được phân tách bằng dấu chấm phẩy.
	+ Mỗi khai báo bao gồm tên và giá trị CSS, cách nhau bằng dấu hai chấm. Các khai báo CSS luôn kết thúc bằng dấu chấm phẩy và khối khai báo được đặt trong dấu ngoặc nhọn.
Băng thông:
	+Biểu định kiểu thường sẽ được lưu trữ trong bộ đệm của trình duyệt và do đó có thể được sử dụng trên nhiều trang mà không cần tải lại, tăng tốc độ tải và giảm truyền dữ liệu qua mạng.
Định dạng lại hoặc cải tiến hơn nữa:
	+Chỉ cần thay đổi đơn giản một dòng, bạn có thể sử dụng một kiểu khác cho cùng một trang. Điều này có lợi thế về khả năng tiếp cận cũng như cung cấp khả năng tạo một trang hoặc trang web với các thiết bị mục tiêu khác nhau. Hơn nữa, các thiết bị không hiểu được kiểu dáng vẫn sẽ hiển thị nội dung.
Uyển chuyển:
	+ Bằng cách kết hợp CSS với chức năng của hệ thống quản lý nội dung, mức độ linh hoạt đáng kể có thể được lập trình vào các biểu mẫu gửi nội dung. Điều này cho phép người đóng góp, những người có thể không quen hoặc không thể hiểu hoặc chỉnh sửa CSS hoặc HTML, chọn bố cục của một bài viết hoặc trang khác mà họ đang gửi nhanh chóng, theo công thức tương tự về hình ảnh.
Tính nhất quán:
	+ Khi CSS được sử dụng hiệu quả, về mặt kế thừa và "xếp tầng", một kiểu toàn cục có thể được sử dụng để tác động đến kiểu dáng và các thành phần trên toàn trang web. Nếu xảy ra tình huống cần thay đổi hoặc điều chỉnh kiểu dáng của các thành phần, những thay đổi này có thể được thực hiện dễ dàng, chỉ bằng cách chỉnh sửa một vài quy tắc trong biểu định kiểu chung.
	+ Đối với các giải pháp thiết kế và phát triển web, hãy truy cập trực tuyến trang web Thiết kế web Philippines để tìm hiểu thêm về nó.
Nhược điểm của CSS:
-	Lề không đúng:
+ Thu hẹp lề, mặc dù được ghi chép đầy đủ và hữu ích, nhưng cũng phức tạp và thường không được các tác giả dự định, đồng thời không có cách tác dụng phụ đơn giản nào để kiểm soát nó.
-	Không biểu hiện:
+ Hiện tại chưa có khả năng xác định giá trị tài sản dưới dạng biểu thức đơn giản (như lề trái: 10% - 3em + 4px;). Điều này hữu ích trong nhiều trường hợp, chẳng hạn như tính toán kích thước của một cột chịu sự ràng buộc về tổng của tất cả các cột.
-	Thiếu biến:
+ CSS không chứa biến. Điều này khiến cần phải thực hiện "thay thế tất cả" khi người ta muốn thay đổi một hằng số cơ bản, chẳng hạn như màu sắc hoặc các chiều cao và chiều rộng khác nhau.
-	Hỗ trợ trình duyệt không nhất quán:
+ Các trình duyệt khác nhau sẽ tạo ra bố cục CSS khác nhau do lỗi trình duyệt hoặc thiếu hỗ trợ các tính năng CSS. Nhiều cái gọi là "hack" CSS phải được thực hiện để đạt được bố cục nhất quán giữa các trình duyệt phổ biến nhất hoặc được sử dụng phổ biến nhất. Bố cục chính xác đến từng pixel đôi khi không thể đạt được trên các trình duyệt.
-	Kiểm soát giới hạn:
+ Trong khi vị trí theo chiều ngang của các phần tử nhìn chung dễ kiểm soát thì vị trí theo chiều dọc thường không trực quan, phức tạp hoặc không thể thực hiện được. Các tác vụ đơn giản, chẳng hạn như căn giữa một phần tử theo chiều dọc hoặc đặt chân trang không cao hơn cuối khung nhìn, yêu cầu các quy tắc kiểu phức tạp và không trực quan, hoặc Công tắc đơn giản nhưng không được hỗ trợ rộng rãi.
-	Kiểm soát các phần tử Shapes:
+ CSS hiện tại chỉ cung cấp hình chữ nhật. Các góc tròn hoặc các hình dạng khác có thể yêu cầu đánh dấu phi ngữ nghĩa. Tuy nhiên, điều này được giải quyết trong bản nháp của mô-đun nền CSS3
-	Bố cục thiếu hình ảnh động:
+ Mặc dù phần bổ sung CSS3 mới cung cấp một bộ tính năng bố cục mạnh mẽ hơn, mạnh mẽ hơn nhưng CSS vẫn được coi là ngôn ngữ tạo kiểu chứ không phải ngôn ngữ bố cục.
-	Thiếu mô tả cột:
+ Mặc dù có thể thực hiện được trong CSS hiện tại nhưng việc triển khai bố cục có nhiều cột có thể phức tạp. Với CSS hiện tại, quá trình này thường được thực hiện bằng cách sử dụng các phần tử nổi thường được hiển thị khác nhau bởi các trình duyệt khác nhau, hình dạng màn hình máy tính khác nhau và tỷ lệ màn hình khác nhau. Đặt trên màn hình tiêu chuẩn.




-	TailwindCSS: 
Là 1 framework của CSS cho phép thiết kế website theo 1 chuẩn nhất định, tạo các website thân thiện với các thiết bị cầm tay như mobile, ipad, tablet, ...
Tailwind CSS là một công cụ mạnh mẽ cho các nhà phát triển thích cách tiếp cận "utility-first" để tạo kiểu cho trang web. Nó thúc đẩy phát triển nhanh chóng, mã sạch và khả năng tùy chỉnh cao, khiến nó trở thành lựa chọn phổ biến cho các dự án web hiện đại.

	Ưu điểm của TailwindCSS:
-	Phát triển nhanh chóng: Các lớp tiện ích cho phép tạo kiểu nhanh chóng mà không cần viết CSS phức tạp.
-	Mã dễ bảo trì: Mã dễ hiểu và dễ bảo trì hơn do tên lớp rõ ràng.
-	Giảm kích thước gói: Chỉ bao gồm các kiểu bạn sử dụng, dẫn đến tệp CSS nhỏ hơn.
-	Tính linh hoạt: Cung cấp toàn quyền kiểm soát giao diện trang web của bạn.
So sánh với các framework truyền thống:
-	Trọng tâm: Tailwind tập trung vào các lớp tiện ích, trong khi các khung truyền thống cung cấp các thành phần dựng sẵn.
-	Đường cong học tập: Tailwind có thể có đường cong học tập dốc hơn do nhu cầu hiểu và kết hợp các lớp tiện ích một cách hiệu quả.
-	Tùy chỉnh: Tailwind cung cấp khả năng kiểm soát chi tiết hơn về kiểu dáng so với các thành phần dựng sẵn.
	Cài đặt TailwindCss:
Bước 1: Setup tailwindcss theo npm và tạo file tailwind.config.js
Bước 2: Cấu hình file tailwind.config.js
Bước 3: Thêm chỉ thị @tailwind cho từng lớp của Tailwind vào tệp CSS chính của ta.
		JavaScript:
	JavaScript là ngôn ngữ lập trình tập lệnh dựa trên các đối tượng phát triển hiện có hoặc tự xác định, JavaScript được sử dụng rộng rãi trong các ứng dụng Website. Javascript được hỗ trợ trên hầu hết các trình duyệt như Firefox, Chrome,... ngay cả trình duyệt trên thiết bị di động cũng có hỗ trợ.

Ưu điểm của javascript:
+ Bạn không cần trình biên dịch vì trình duyệt web có thể biên dịch bằng HTML;
+ Dễ học hơn các ngôn ngữ lập trình khác;
+ Lỗi dễ phát hiện hơn và do đó dễ sửa chữa hơn;
+ Nó có thể được gắn vào một số thành phần trang web hoặc sự kiện trang web như thông qua nhấp chuột hoặc di chuột;
+ JS hoạt động trên nhiều trình duyệt, nền tảng,...
+ Bạn có thể sử dụng JavaScript để kiểm tra đầu vào và giảm thiểu việc kiểm tra thủ công khi truy cập cơ sở dữ liệu;
+ Giúp website tương tác tốt hơn với người truy cập;
+ Nhanh và nhẹ hơn các ngôn ngữ lập trình khác.
+ Dễ khai thác;
+ Có thể dùng để thực thi mã độc trên máy tính người dùng;
+ Đôi khi không được hỗ trợ trên tất cả các trình duyệt;
+ Đoạn mã JS lớn;
+ Có thể triển khai khác nhau tùy theo thiết bị, dẫn đến thiếu thống nhất.

3	ReactJS and MERN
3.1    ReactJs
React là một thư viện JavaScript mã nguồn mở phổ biến được sử dụng để xây dựng giao diện người dùng (UI) cho các ứng dụng web. Nó được phát triển và duy trì bởi Meta (trước đây là Facebook) và cộng đồng các nhà phát triển toàn cầu của nó.
	Các tính năng chính của React:
Dựa trên thành phần: React cho phép bạn xây dựng giao diện người dùng từ các thành phần nhỏ, độc lập và có thể tái sử dụng.
Hiệu suất cao: React sử dụng mô hình Virtual DOM để tối ưu hóa hiệu suất hiển thị và cập nhật giao diện.
Dễ học: React sử dụng cú pháp JavaScript đơn giản và dễ hiểu.
Cộng đồng lớn: React có cộng đồng nhà phát triển lớn và năng động, cung cấp nhiều tài nguyên và hỗ trợ.

	Open Source
+ React là thư viện lập trình mã nguồn mở và điều này có nghĩa là bạn có thể sử dụng nó hoàn toàn miễn phí. React có thể chạy trên nhiều nền tảng hệ điều hành khác nhau như Windows, Mac OS và Linux.
Ứng dụng phản ứng:
•	Xây dựng giao diện web: React được sử dụng rộng rãi để xây dựng giao diện web cho các ứng dụng web một trang (SPA), trang web tĩnh, v.v.
•	Phát triển ứng dụng di động: React Native, một framework dựa trên React, cho phép bạn phát triển các ứng dụng di động gốc cho Android và iOS.
•	Xây dựng các thành phần giao diện người dùng: React có thể được sử dụng để xây dựng các thành phần giao diện người dùng có thể tái sử dụng cho các ứng dụng web khác nhau.
Lợi ích của việc sử dụng React:
•	Tăng tốc độ phát triển: React giúp bạn xây dựng giao diện người dùng một cách nhanh chóng và dễ dàng.
•	Cải thiện hiệu suất: React giúp tăng hiệu suất kết xuất và cập nhật giao diện người dùng.
•	Dễ bảo trì: React giúp bạn viết mã dễ hiểu và dễ bảo trì.
•	Khả năng mở rộng: React có thể được sử dụng để xây dựng các ứng dụng web lớn và phức tạp.
3.2	MERN 
MERN là thuật ngữ rút gọn của MongoDB, Express, React và Node; Stack MERN là một ngăn xếp Javascript được thiết kế để giúp việc phát triển ứng dụng web toàn bộ dễ dàng hơn và nhanh hơn.
Tất cả bốn công nghệ này đều cung cấp một khuôn khổ hoàn chỉnh để các nhà phát triển tạo ra bất kỳ ứng dụng web nào. MERN đang tuân theo kiến trúc 3 tầng truyền thống, bao gồm tầng kết xuất giao diện người dùng (React.js), tầng ứng dụng (Express.js và Node.js) và tầng cơ sở dữ liệu (MongoDB).
 
Lợi ích khi sử dụng MERN Stack:
•	JavaScript ở mọi nơi: MERN sử dụng JavaScript trong toàn bộ quá trình phát triển, từ giao diện người dùng phía máy khách đến logic phía máy chủ. Điều này giúp đơn giản hóa quá trình phát triển cho các lập trình viên đã quen với JavaScript và giảm nhu cầu học các ngôn ngữ khác nhau cho các phần khác nhau của ứng dụng.
•	Phát triển toàn bộ ngăn xếp: Ngăn xếp MERN cung cấp tất cả các công cụ cần thiết để xây dựng các ứng dụng web đầy đủ chức năng, từ lưu trữ dữ liệu đến tương tác người dùng.
•	Hiệu suất và khả năng mở rộng: Cả Node.js và React.js đều được biết đến với hiệu suất và khả năng mở rộng, giúp MERN phù hợp để xây dựng các ứng dụng web có lưu lượng truy cập cao.
•	Cộng đồng và nguồn tài nguyên lớn: MERN được hưởng lợi từ cộng đồng nhà phát triển lớn và năng động. Điều này mang lại nguồn tài nguyên học tập, hướng dẫn và thư viện phong phú, hỗ trợ phát triển và khắc phục sự cố.
Nhược điểm của MERN Stack:
•	Khó khăn đối với người mới bắt đầu: Mặc dù mỗi công nghệ trong MERN Stack tương đối dễ học riêng lẻ, nhưng việc kết hợp và thành thạo chúng trong một dự án có thể khó khăn đối với người mới bắt đầu. Việc nắm vững các khái niệm như NoSQL, Node.js, định tuyến và quản lý trạng thái đòi hỏi phải có thời gian và thực hành.
•	Quản lý trạng thái: Việc quản lý trạng thái trong ứng dụng React có thể trở nên phức tạp khi ứng dụng phát triển. Việc chọn đúng thư viện quản lý trạng thái và sử dụng nó một cách hiệu quả là điều cần thiết để duy trì mã sạch và có thể bảo trì.
•	Khả năng mở rộng: Mặc dù MERN có quy mô tốt nhưng việc tối ưu hóa hiệu suất cho các ứng dụng có lưu lượng truy cập cao đòi hỏi phải có kiến thức chuyên môn và cấu hình cẩn thận.
•	Bảo mật: Giống như bất kỳ công nghệ nào, MERN có thể có lỗ hổng bảo mật nếu không được thiết kế và triển khai đúng cách. Triển khai các biện pháp bảo mật tốt nhất là điều cần thiết để bảo vệ ứng dụng khỏi các cuộc tấn công.
•	Phụ thuộc thư viện: MERN phụ thuộc vào nhiều thư viện JavaScript để cung cấp nhiều chức năng khác nhau. Việc quản lý các bản cập nhật và khả năng tương thích giữa các thư viện có thể tốn thời gian và phức tạp.







Chương II : Phân tích thiết kế hệ thống
1	 Phân tích yêu cầu
1.1	Đặc tả hệ thống
Website bán thiết bị điện tử đặt hàng trực tuyến sẽ giúp khách hàng giảm thiểu thời gian và công sức khi phải đến cửa hàng mua hàng. Nếu muốn lựa chọn một sản phẩm phù hợp với túi tiền của mình, khách hàng chỉ cần một thiết bị có kết nối internet là có thể mua được những món đồ mình cần.

Với nhu cầu trên tôi đã xây dựng website bán thiết bị điện tử kết hợp với ngôn ngữ lập trình JS và theo MERN stack.

	Admin:
-	Phân quyền hệ thống, đảm bảo quyền chi tiết cho từng tính năng, giúp quản trị thông suốt, tránh trùng lặp dữ liệu.
-	Quản lý chi tiết sản phẩm: danh mục sản phẩm, chủng loại linh kiện, thiết bị điện tử, thêm sản phẩm, cập nhật sản phẩm, xóa sản phẩm.
-	Quản lý chi tiết đơn hàng: danh sách các loại thông tin thuộc đơn hàng, số lượng đơn hàng và thống kê đơn hàng
-	Quản lý chi tiết user admin: danh sách user admin, số lượng user admin, chức năng thêm user mới admin, cập nhật user admin, xóa user admin.
-	Chức năng tìm kiếm trên thanh tiêu đề khi nhập từ cần tìm.
-	Thực hiện quảng cáo để quảng bá sản phẩm và banner cho khách hàng có nhu cầu quảng cáo.

	User:
	Có thể xem các sản phẩm mới nhất trên thế giới
-	Khách hàng có thể tìm kiếm thể loại trên trường tìm kiếm, khi khách hàng nhập từ khóa mình muốn vào thanh tìm kiếm, kết quả sẽ trả về danh sách các thể loại liên quan. Ngoài ra, khách hàng có thể tìm kiếm chuyên mục theo loại tin tức tương ứng với chuyên mục tương ứng.
-	Ngoài việc xem và tìm kiếm tin tức, độc giả có thể bình luận hoặc bình luận về bài viết đưa ra suy nghĩ, cảm xúc của mình sau khi coi sản phẩm.
-	Người đọc có thể vote hoặc like bài viết nếu bài viết hay.
-	Ngoài ra, người đọc có thể chia sẻ bài viết để mọi người cùng đọc một cách tốt nhất.


1.2	Xác định tác nhân
-	Người dùng: là người dùng trải nghiệm dịch vụ cũng như thu thập thông tin, người dùng có thể xem sản phẩm, mua sản phẩm,
Cập nhật thông tin cá nhân, nhắn tin cho quản trị viên, bình luận bài viết.
-	Admin: là người có quyền cài đặt sẵn cao nhất, chức năng có thể xem và quản lý sản phẩm, quản lý đơn hàng, quản lý user admin và bình luận.
1.3	Xác định chức năng
-	User: Xem sản phẩm, Tìm kiếm sản phẩm, Tìm kiếm theo danh mục sản phẩm, mua hàng, bình luận, chỉnh sửa thông tin cá nhân, đăng nhập, đăng ký.
-	Admin: Xem bài viết, Tìm kiếm bài viết, Đăng nhập, Đăng xuất, Quản lý tài khoản, Quản lý sản phẩm, Quản lý đơn hàng.
1.4	Xác định đặc điểm
	Xem sản phẩm
Chức năng	Xem sản phẩm
Mục đích	Người xem và quản trị viên muốn xem bài viết khi truy cập website
Quá trình	Chức năng xem được thực hiện
Chức năng	Search
Mục đích	Người xem và quản trị viên muốn tìm kiếm cụ thể các bài viết nhất định trên trang web
Quá trình 	Input: Người dùng, quản trị viên gõ một phần hoặc toàn bộ tiêu đề trên thanh tìm kiếm của website.
Output: Hiển thị thông tin, hình ảnh các bài viết có một phần hoặc toàn bộ tiêu đề trùng với nội dung nhập vào
	Search

	
 
	Đăng kí
Chức    năng	Đăng kí.
Tác nhân	Quản trị viên, khách hàng.
Mục đích	Đăng kí tài khoản .
Đầu vào	Nhập thông tin.
Đầu ra	Hiện thông báo đăng kí thành công.




Luồng sự kiện chính	Tác nhân	Hệ thống
	1. Người dùng chọn chức năng  Đăng kí.	2. Hệ thống hiển thị giao diện Đăng kí.
	3. Người dùng nhập thông tin.	4. Hệ thống kiểm tra thông tin nhập vào.
		5.1.Nếu thông tin không bị trùng, hiển thị thông báo Đăng kí thành công.
		5.2.Nếu thông tin bị trùng, hiển thị thông báo Đăng nhập thất bại.
Luồng thay thế	4.2. Nếu bỏ trống trường thông tin hệ thống sẽ hiển thị yêu cầu nhập thông tin.





	Đăng nhập
Chức  năng	Đăng nhập.
Tác nhân	Quản trị viên, khách hàng.

Mục đích	Đăng nhập vào Website bán thiết bị điện tử với           quyền Quản trị viên và quyền Khách hàng
Đầu vào	Thông tin đăng nhập: tài khoản, mật khẩu.
Đầu ra	Giao diện tương ứng với quyền truy cập.










Luồng sự kiện chính	Tác nhân	Hệ thống
	1. Người dùng chọn chức năng  Đăng nhập.	2. Hệ thống hiển thị giao  diện Đăng nhập.
	3. Người dùng nhập Tên tài        khoản và mật khẩu.	4. Hệ thống kiểm tra thông tin nhập vào.
		5.1.Nếu thông tin hợp lệ, hiển thị Website bán thiết bị với quyền truy cập là Quản       trị viên nếu là Quản trị viên       và truy cập là Khách hàng nếu là khách hàng.
		5.2Nếu thông tin sai, thông báo đăng nhập thất bại.

Luồng thay  thế	4.2.	Nếu bỏ trống trường mật khẩu hệ thống sẽ hiển thị yêu cầu nhập mật khẩu. Nếu bỏ trống trường tên tài khoản hệ thống sẽ  hiển thị yêu cầu nhập tên tài khoản.
 
	Logout
Chức năng	Logout
Mục đích	Quản trị viên và người dùng muốn đăng xuất và tước quyền sử dụng chức năng
Quá trình	Quản trị viên và người dùng muốn đăng xuất và loại bỏ quyền sử dụng các chức năng Quản trị viên nhấn nút đăng xuất ở bên phải trên cửa sổ bật lên

	Quản lý Sản phẩm
Chức năng	Quản lý sản phẩm
Mục đích	Admin dùng để kiểm soát các bài viết về sản phẩm
Quá trình	Quản trị viên có thể thêm, chỉnh sửa và xóa sản phẩm.

	Thêm sản phẩm
Chức năng	Thêm sản phẩm
Tác nhân	Quản trị viên.
Mục đích	Thêm mới một sản phẩm

Đầu vào	Các thông tin của sản phẩm cần thêm mới: ID, tiêu đề, giá, mô tả, nôi dung, danh mục, hình ảnh.

Đầu ra	Sản phẩm được thêm vào danh sách sản phẩm, hiển thị lại danh sách sản phẩm.





Luồn sự kiện chính	Tác nhân	Hệ thống
	1. Người dùng chọn chức năng quản lý sản phẩm.	2. Hệ thống hiển thị giao diện quản lý sản phẩm.
	3. Người dùng nhập thông tin sản phẩm cần thêm mới và nhấn nút “Thêm”.	

4. Hệ thống kiểm tra thông tin nhập vào.
		5.1. Nếu thông tin hợp lệ,
thực hiện thêm mới sản phẩm vào danh sách, thông báo
“Thêm mới sản phẩm thành công” và hiển thị lại danh sách sản phẩm.

Luồng thay thế	5.2. Nếu thông tin không hợp lệ, thông báo và yêu cầu nhập thông tin hợp lệ.
	5.3. Nếu bỏ trống một trường bất kì, yêu cầu nhập đầy đủ thông tin.

	Cập nhật sản phẩm
Tên chức năng	Cập nhật sản phẩm
Tác nhân	Quản trị viên.
Mục đích	Cập nhật mới một sản phẩm
Đầu vào	Thông tin sản phẩm cần cập nhật
Đầu ra	Thông tin sản phẩm sau khi cập nhật thành công








Luồng sự kiện chính	Tác nhân	Hệ thống
	1. Người dùng chọn chức năng quản lý sản phẩm.	
2. Hệ thống hiển thị giao diện quản lý sản phẩm.
	3. Người dùng nhấn vào nút “Cập nhật” tại sản phẩm cần cập nhật.	

4. Hệ thống hiển thị thông tin sản phẩm vừa chọn.
	5. Người dùng nhập, chọn hoặc xóa bỏ phần thông tin cần thay đổi và nhấn nút “Cập nhật”.	


6. Hệ thống kiểm tra thông tin cập nhật
		7.1. Nếu thông tin hợp lệ, cập nhật thông tin sản phẩm và hiển thị thông báo “Cập nhật sản phẩm thành công”.


Luồng thay thế	7.2. Nếu thông tin không hợp lệ, hiển thị thông báo yêu cầu nhập đúng thông tin.
7.4. Nếu bỏ trống một trong các trường hệ thống sẽ yêu cầu nhập đầy đủ.

	Xóa sản phẩm
Tên chức năng	Xóa sản phẩm
Tác nhân	Quản trị viên.
Mục đích	Xóa một sản phẩm
Đầu vào	Sản phẩm cần xóa

Đầu ra	Hiển thị thông báo xóa sản phẩm thành công hay thất bại, hiển thị lại danh sách sản phẩm.




Luồng sự kiện chính	Tác nhân	Hệ thống
	1. Người dùng chọn chức năng quản lý sản phẩm.	
2. Hệ thống hiển thị giao diện quản lý sản phẩm.
	3. Người dùng nhấn nút “Xoá” ở sản phẩm cần xóa.	
4. Hệ thống xóa và hiển thị lại giao diện quản lý sản phẩm.

Luồng thay thế	

	Order Management
Chức năng	Order Management
Mục đích	Quản trị viên sử dụng để kiểm soát các loại tin theo thứ tự tương ứng
Quá trình	Quản trị viên có thể xem các loại lệnh tương ứng
Chức năng	Quản lý user admin
Mục đích	Quản trị viên được sử dụng để kiểm soát các tài khoản người dùng quản trị viên khác.
Quá trình	Quản trị viên được sử dụng để kiểm soát các tài khoản người dùng quản trị viên khác.








	Quản lý user admin 
2	Phân tích cơ sở dữ liệu và thiết kế:
	Khi xây dựng một ứng dụng, điều đặc biệt quan trọng là phải thiết kế cơ sở dữ liệu chuẩn và có thể truy cập được. Trong ứng dụng này, cơ sở dữ liệu được sử dụng sẽ là MongoDB và NoSQL.
Sau đây là bảng dữ liệu được thiết kế:

USER
name	string
email	string
password	string
phone	number
isAdmin(role)	enum
address	string
avatar	string


Order
orderItems	Array[{Object}]	name:string
amount: number
image: string
price: number
discount: number
product:{Object}
ShippingAddress	full name: string
address: string
phone: number	
paymentMethod	string	
itemPrice	number	
shippingPrice	number	
totalPrice	number	
user	{Object}	
isPaid	Boolean	
paidAt	Date	
isDeliveried	Boolean	
deliveredAt	Date	

product
name	string
image	string
type	string
price	number
countInStock	number
rating	number
description	string
selled	number
quantity	number

3.	Sơ đồ trường hợp từng sử dụng:
3.1.	Sơ đồ đăng kí diagram:
 

3.2.	Login – Logout diagram:
 





3.3.	Sơ đồ trường hợp quản lý sản phẩm:
 
3.4.	Sơ đồ trường hợp thống kê đơn hàng:
 
3.5.	Sơ đồ trường hợp quản lý tài khoản:
 
3.6.	Sơ đồ trường hợp thị trường đặt lệnh:
 
3.7.	Sơ đồ tìm kiếm:
 

4.	Sơ đồ hiện trạng:
4.1.	Sơ đồ trạng thái đăng ký:
 



4.2.	Sơ đồ trạng thái đăng nhập:
 

4.3.	Sơ đồ quản lý sản phẩm:
 
4.4.	Sơ đồ trạng thái thống kê đơn hàng:
 

4.5.	Sơ đồ trạng thái của giỏ hàng:
 

4.6.	Sơ đồ trạng thái đơn hàng:
 


4.7.	Sơ đồ trạng thái tìm kiếm:
 

5.	Biểu đồ tuần tự:
5.1.	Biểu đồ tuần tự cho use case đăng nhập:
 
5.2.	Biểu đồ tuần tự đăng ký thành viên:
 
5.3.	Biểu đồ tuần tự cho use case thêm giỏ hàng:
 

5.4.	Biểu đồ tuần tự cho use case gửi đơn đặt hàng:
 

5.5.	Biểu đồ tuần tự xem thành viên: 
 






5.6.	Biểu đồ tuần tự xóa thành viên:
 
5.7.	Biểu đồ tuần tự thêm thành viên:
 
6.	Biểu đồ lớp phân tích:
 












Chương III: Cài đặt chương trình
1	Giao diện người dùng (FrontEnd)
-	HTML
-	CSS & TailwindCss framework 
-	Redux toolkit
-	ReactJs (JavaScript)
1.1	Trang chủ
 

1.2	Thanh tiêu đề: 
Bao gồm các trợ giúp tìm kiếm và các thể loại chứa các loại áo quần và đồ thời trang Customer cần.
 
1.3	Trang sản phẩm:
 
1.4	SearchBar:
 
1.5	Trang giỏ hàng:
 
 



1.6	Trang thanh toán:
 
1.7	LoginPage and RegisterPage
 
 
2  Trang Admin:

2.1	Admin:
Trên trang Quản trị, Admin quản lý việc quản lý sản phẩm và xác định giá của sản phẩm.
*Lưu ý: Phải đăng nhập đúng tài khoản quản trị để tải trang quản trị
 

2.2	Thêm sản phẩm:
 

2.3	Quản lý trang sản phẩm:
 
2.4	Quản lý trang User:
 

2.5	Quản lý trang đơn hàng: 
 

3	BackEnd (code xử lý):
+ Sử dụng NodeJs để xử lý các tương tác của người dùng với dữ liệu.
+ MongoDb lưu dữ liệu từ dữ liệu được tạo sẵn.
Link source code: https://github.com/blinderh150602/SupperProject/tree/main
Chương IV: KẾT LUẬN
1 Hạn chế những thiếu sót:
	Hệ thống quản lý trang web vẫn còn nhiều bất cập.
	Cơ sở dữ liệu còn thiếu.
	An ninh vẫn còn hạn chế.
	Chưa có nhiều về Blogs
2	Hướng phát triển:
	Xây dựng thêm các chức năng còn thiếu và cải thiện các hạn chế:
	Xây dựng hỗ trợ chức năng đa ngôn ngữ, tùy chỉnh cấu hình cho website.
	Xây dựng giao diện đẹp, sinh động hơn, tạo sự gần gũi với người dùng.
	Xây dựng cơ sở dữ liệu hoàn chỉnh hơn và liên tục cập nhật nó với khả năng cập nhật cao.
	Tổ chức cơ sở dữ liệu chặt chẽ hơn làm tăng tính bảo mật hệ thống.
	Tổ chức hệ thống quyền và chức năng người dùng cho từng đối tượng một cách rõ ràng, đầy đủ.
	Xây dựng hệ thống phân loại CV, bài viết mang lại lợi ích tốt nhất cho người dùng
3	Giới thiệu tham khảo:
	Mọi tri thức có sự trợ giúp từ https://www.google.com/ và cũng như tài liệu hướng dẫn trên trang https://www.youtube.com/
Ngoài ra còn có: 
	+/https://www.w3schools.com/ đã hỗ trợ trong việc tham khảo các kiến thức cơ bản về HTML/CSS/JS và cả React, NodeJs
	+/ https://ant.design/ đã hỗ trợ cho việc lấy font chữ và thiết kế của website.
	Bài viết trên Xemtailieu.net: Tài liệu Tìm hiểu mern stack và xây dựng ứng dụng minh họa.
	Tại diễn đàn website MERN Stack Advanced
	Tại thiết kế web Spacedev.vn: https://spacedev.vn/.
	 Langbiang: Tài liệu tham khảo tại (https://legiacong.blogspot.com/).
	Nguồn tài liệu chính từ Studocu.
	Từ trang chính thức của Umedy fullstack.
	F8-fullstack



