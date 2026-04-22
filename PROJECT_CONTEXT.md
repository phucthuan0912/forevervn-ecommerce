# 📦 ForeverVN E-Commerce — PROJECT CONTEXT

> **Mục đích file này:** Cung cấp đầy đủ ngữ cảnh dự án để AI đọc hiểu trước khi tiếp tục viết code.  
> **Cập nhật lần cuối:** 2026-04-14  
> **Tech Stack:** MERN (MongoDB, Express.js, React.js, Node.js)

---

## 1. TỔNG QUAN DỰ ÁN

Đây là một ứng dụng **thương mại điện tử thời trang** tên **ForeverVN**, được xây dựng theo kiến trúc MERN Stack. Dự án gồm **3 sub-app** độc lập:

| Sub-app | Thư mục | Mô tả |
|---------|---------|-------|
| Frontend (Khách hàng) | `frontend/` | React + Vite, giao diện mua sắm |
| Admin Panel | `admin/` | React + Vite, quản trị viên/nhân viên |
| Backend API | `backend/` | Node.js + Express.js, REST API |

**Cấu trúc thư mục gốc:**
```
forevervn-ecommerce/
├── frontend/       # Shop cho khách hàng
├── admin/          # Bảng điều khiển quản trị
├── backend/        # REST API server
└── PROJECT_CONTEXT.md
```

---

## 2. BACKEND — Node.js / Express.js

### 2.1 Cấu hình & Khởi động

- **Entry point:** `backend/server.js`
- **Port:** `4000` (mặc định) hoặc từ `.env`
- **Kiểu module:** ES Modules (`"type": "module"`)
- **Dev server:** `nodemon server.js`

**Các service khởi động cùng server:**
```js
connectDB();           // Kết nối MongoDB
connectCloudinary();   // Kết nối Cloudinary lưu ảnh
startStockAlertJob();  // Cron job cảnh báo tồn kho thấp
```

### 2.2 Biến môi trường `.env` (backend)

```env
PORT=4000
MONGODB_URI=...
JWT_SECRET=...
ADMIN_EMAIL=...          # Email admin root (không cần DB)
CLOUDINARY_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_SECRET_KEY=...
SEPAY_SECRET_KEY=...     # Cổng thanh toán SePay
```

### 2.3 Dependencies chính

| Package | Mục đích |
|---------|---------|
| `express` ^5.2.1 | REST API Framework |
| `mongoose` ^9.2.4 | MongoDB ODM |
| `jsonwebtoken` ^9.0.3 | JWT Authentication |
| `bcrypt` ^6.0.0 | Hash mật khẩu |
| `cloudinary` ^2.9.0 | Upload ảnh |
| `multer` ^2.1.1 | Xử lý file upload |
| `nodemailer` ^8.0.4 | Gửi email OTP |
| `papaparse` ^5.5.3 | Parse CSV |
| `iconv-lite` ^0.7.2 | Xử lý encoding CSV (UTF-8, Win-1258) |
| `node-cron` ^4.2.1 | Cron jobs |
| `sepay-pg-node` ^1.0.0 | Cổng thanh toán SePay |
| `validator` ^13.15.26 | Validate dữ liệu |

### 2.4 API Routes

Tất cả API mount tại `/api/*`:

```
/api/user           → userRouter.js
/api/product        → productRouter.js
/api/cart           → cartRoute.js
/api/order          → orderRoute.js
/api/system         → systemRouter.js
/api/category       → categoryRouter.js
/api/sub-category   → subCategoryRouter.js
/api/dashboard      → dashboardRouter.js
/api/audit-log      → auditLogRouter.js
/api/banner         → bannerRoute.js
/api/review-user    → reviewRoute.js
/api/import-batch   → importBatchRoute.js
/api/behavior       → behaviorRouter.js
/api/ai             → aiRouter.js
/api/return         → returnRoute.js
/api/wallet         → walletRoute.js
```

---

## 3. DATABASE — MongoDB Schemas

### 3.1 User (`userModel.js`)

```js
{
  name:             String (required),
  email:            String (required, unique),
  password:         String (required, bcrypt hashed),
  cartData:         Object (default: {}),
  addresses:        [addressSchema],
  role:             String enum ['Admin', 'Employee', 'Customer'] (default: 'Customer'),
  resetOtp:         String (default: ''),
  resetOtpExpireAt: Number (default: 0),
  walletBalance:    Number (default: 0)
}

// addressSchema:
{
  label, fullName, email, phone,
  province, district, ward, addressDetail,
  isDefault: Boolean
}
```

### 3.2 Product (`productModel.js`)

```js
{
  name:           String (required),
  description:    String (required),
  price:          Number (required),
  oldPrice:       Number (default: 0),        // Giá gốc để hiển thị % giảm
  image:          Array (required),           // URLs từ Cloudinary
  category:       String (required),
  subCategory:    String (required),
  sizes:          Array (required),           // VD: [{size: 'M', quantity: 10, costPrice: 50000}]
  colors:         Array (default: []),        // Tên màu hoặc mã hex
  videoUrl:       String (default: ''),       // Link TikTok/YouTube review
  bestseller:     Boolean,
  stockThreshold: Number (default: 0),        // Cảnh báo tồn kho thấp
  ratingAvg:      Number (default: 0),        // Xếp hạng thông minh
  ratingCount:    Number (default: 0),
  views:          Number (default: 0),        // Lượt xem sản phẩm
  sold:           Number (default: 0),        // Số lượng đã bán
  date:           Number (required)
}
```

### 3.3 Order (`orderModel.js`)

```js
{
  userId:                String (required),
  items:                 Array (required),    // [{productId, name, size, color, quantity, price}]
  amount:                Number (required),   // Tổng tiền cuối = subtotal - discount + ship
  subtotal:              Number (default: 0),
  discount:              Number (default: 0),
  cogs:                  Number (default: 0), // Giá vốn
  profit:                Number (default: 0), // Lợi nhuận
  inventoryDeducted:     Boolean (default: false),
  inventoryDeductedAt:   Number (default: null),
  inventoryAdjustments:  Array (default: []),
  address:               Object (required),   // Địa chỉ giao hàng
  status:                String (default: 'Order Placed'),
  // Status flow: 'Order Placed' → 'Packing' → 'Shipped' → 'Out for delivery' → 'Delivered'
  paymentMethod:         String (required),   // 'COD' | 'Wallet' | 'SePay'
  payment:               Boolean (default: false),
  date:                  Number (required)
}
```

### 3.4 Review (`reviewModel.js`)

```js
{
  userId:     ObjectId (ref: 'user'),
  productId:  ObjectId (ref: 'product'),
  userName:   String,
  rating:     Number (1-5),
  comment:    String,
  images:     Array (URLs Cloudinary),
  status:     Boolean (default: true),   // true = hiện, false = ẩn
  date:       Number,
  adminReply: String (default: ''),
  replyDate:  Number
}
// Collection name: 'review_user'
```

### 3.5 Voucher (`voucherModel.js`)

```js
{
  code:            String (unique),
  discountPercent: Number,
  description:     String,
  showAsHot:       Boolean (default: false),  // Hiện ở "Mã Hot"
  isActive:        Boolean (default: true),
  date:            Number
}
```

### 3.6 Return Request (`returnModel.js`)

```js
{
  userId:       String,
  orderId:      String,
  reason:       String,
  images:       Array (URLs Cloudinary),
  status:       String enum ['Pending', 'Approved', 'Rejected', 'Completed'],
  refundAmount: Number,
  refundMethod: String enum ['Wallet', 'Bank'] (default: 'Wallet'),
  bankDetails:  Object,   // {bankName, accountNumber, accountHolder}
  adminNote:    String,
  date:         Number
}
// Collection name: 'returnRequest'
```

### 3.7 Wallet Transaction (`walletTransactionModel.js`)

```js
{
  userId:         String,
  type:           String enum ['Credit', 'Debit'],
  // Credit = tiền vào ví, Debit = tiền ra khỏi ví
  amount:         Number,
  description:    String,  // VD: "Hoàn tiền Đơn hàng #ABC123"
  date:           Number,
  relatedOrderId: String (default: null)
}
```

### 3.8 Các model khác

| Model | File | Mô tả |
|-------|------|-------|
| Category | `categoryModel.js` | Danh mục cha |
| SubCategory | `subCategoryModel.js` | Danh mục con |
| Banner | `bannerModel.js` | Banner trang chủ |
| AppConfig | `appConfigModel.js` | Cấu hình hệ thống |
| AuditLog | `auditLogModel.js` | Lịch sử thao tác admin |
| ImportBatch | `importBatchModel.js` | Lô nhập hàng qua CSV |
| UserBehavior | `userBehaviorModel.js` | Hành vi người dùng (Smart Ranking) |

---

## 4. MIDDLEWARE

### 4.1 `auth.js` — Xác thực người dùng (khách hàng)
- Đọc `token` từ `req.headers`
- Verify JWT, gán `req.body.userId`
- Dùng cho tất cả API cần đăng nhập của khách hàng

### 4.2 `adminAuth.js` — Xác thực admin/nhân viên
- Hỗ trợ 2 cách: **root admin** (email từ .env) và **DB user** (role Admin/Employee)
- Gán `req.adminEmail`, `req.userRole`, `req.adminId`

### 4.3 `roleMiddleware.js` — Phân quyền theo Role
```js
requireRole(['Admin'])           // Chỉ Admin
requireRole(['Admin', 'Employee']) // Admin hoặc Employee
```
- Tra cứu user trong DB để kiểm tra role thật sự
- Hỗ trợ backward compatibility với root admin từ .env

### 4.4 `multer.js` — Upload file
- Dùng `multer` nhận file ảnh upload lên Cloudinary

---

## 5. BACKEND CONTROLLERS — Logic chính

| Controller | Chức năng chính |
|-----------|----------------|
| `userController.js` | Register, Login (JWT), OTP password reset (Nodemailer), quản lý địa chỉ, đổi thông tin |
| `productController.js` | CRUD sản phẩm, upload ảnh Cloudinary, Smart Ranking (views/sold/rating), tìm kiếm |
| `orderController.js` | Đặt hàng, COD/Wallet/SePay, cập nhật trạng thái, trừ kho, tính COGS/profit |
| `walletController.js` | Xem số dư ví, nạp tiền qua SePay, hoàn tiền về ví |
| `cartController.js` | Thêm/sửa/xóa giỏ hàng, sync cart server-side |
| `reviewController.js` | Tạo review, upload ảnh, admin reply, ẩn/hiện review |
| `returnController.js` | Tạo yêu cầu hoàn hàng, admin xét duyệt, hoàn tiền |
| `dashboardController.js` | Thống kê doanh thu, đơn hàng, lợi nhuận, sản phẩm bán chạy |
| `productController.js` | Nhập hàng CSV (PapaParse, iconv-lite), batch import |
| `systemController.js` | Cài đặt hệ thống, voucher CRUD, mail config |
| `categoryController.js` | CRUD danh mục cha |
| `subCategoryController.js` | CRUD danh mục con |
| `bannerController.js` | CRUD banner trang chủ |
| `aiController.js` | Tích hợp Kling AI (Virtual Try-On) |
| `behaviorController.js` | Lưu hành vi xem sản phẩm (Smart Ranking) |
| `auditLogController.js` | Ghi/đọc log thao tác admin |
| `importBatchController.js` | Quản lý lô nhập hàng (CSV import history) |

---

## 6. UTILS / TIỆN ÍCH BACKEND

| File | Mô tả |
|------|-------|
| `inventory.js` | Xử lý trừ kho khi đặt hàng, rollback khi hủy |
| `klingAiUtil.js` | Gọi API Kling AI để tạo ảnh Virtual Try-On |
| `logger.js` | Ghi AuditLog vào database |
| `stockAlert.js` | Cron job: Quét sản phẩm tồn kho thấp, gửi email cảnh báo |
| `tiktok.js` | Xử lý URL video TikTok/YouTube nhúng vào sản phẩm |

---

## 7. FRONTEND — React (Khách hàng)

### 7.1 Cấu trúc

```
frontend/src/
├── App.jsx            # Root routing
├── main.jsx           # Entry point
├── index.css          # Global styles (Tailwind CSS)
├── context/
│   ├── ShopContext.jsx       # Global state (cart, products, user, orders...)
│   └── LanguageContext.jsx   # Đa ngôn ngữ (VI/EN)
├── pages/             # Các trang
├── components/        # Các component dùng chung
├── assets/            # Hình ảnh, icon
├── data/              # Dữ liệu tĩnh (VD: tỉnh/thành VN)
└── lib/               # Thư viện tiện ích
```

### 7.2 Routing (`App.jsx`)

```
/                  → Home.jsx
/collection        → Collection.jsx
/about             → About.jsx
/contact           → Contact.jsx
/product/:id       → Product.jsx
/cart              → Cart.jsx
/login             → Login.jsx
/place-order       → PlaceOrder.jsx
/orders            → Orders.jsx
/my-account        → MyAccount.jsx
/my-wallet         → MyWallet.jsx
```

### 7.3 Global State — ShopContext

`ShopContext.jsx` là context chính quản lý toàn bộ state app:
- **Products:** Danh sách sản phẩm, filter, search
- **Cart:** Giỏ hàng (sync với server khi đăng nhập)
- **User:** Token JWT, thông tin user, địa chỉ
- **Orders:** Lịch sử đơn hàng
- **System:** Phí ship, voucher, cấu hình

### 7.4 Các Pages

| Page | Mô tả |
|------|-------|
| `Home.jsx` | Trang chủ: Banner, Best Seller, Latest Collection, Marquee, Policy |
| `Collection.jsx` | Trang bộ sưu tập: Filter (category, sub-category, size, color, giá), Sort, Smart Ranking |
| `Product.jsx` | Chi tiết sản phẩm: Size chart, màu sắc, rating, Review System, Video Review, Virtual Try-On |
| `Cart.jsx` | Giỏ hàng: Sửa số lượng, xóa, áp voucher, xem tổng |
| `PlaceOrder.jsx` | Đặt hàng: Chọn địa chỉ, phương thức thanh toán (COD/Wallet/SePay) |
| `Orders.jsx` | Lịch sử đơn hàng: Track trạng thái, yêu cầu hoàn hàng |
| `Login.jsx` | Đăng nhập / Đăng ký / Quên mật khẩu (OTP email) |
| `MyAccount.jsx` | Thông tin cá nhân, đổi mkahẩu, quản lý địa chỉ |
| `MyWallet.jsx` | Ví điện tử: Số dư, lịch sử giao dịch, nạp tiền (SePay) |
| `About.jsx` | Trang giới thiệu thương hiệu |
| `Contact.jsx` | Trang liên hệ |

### 7.5 Các Components

| Component | Mô tả |
|-----------|-------|
| `Navbar.jsx` | Thanh điều hướng: Logo, menu, search, cart badge, user dropdown |
| `Hero.jsx` | Banner hero trang chủ (slider/animation) |
| `BannerSlider.jsx` | Slider banner động từ API |
| `BestSeller.jsx` | Hiển thị sản phẩm bán chạy |
| `LatestCollection.jsx` | Sản phẩm mới nhất |
| `Marquee.jsx` | Ticker/Marquee text chạy ngang (khuyến mãi) |
| `OurPolicy.jsx` | Section chính sách (đổi trả, ship, hỗ trợ) |
| `NewsletterBox.jsx` | Đăng ký nhận tin |
| `SearchBar.jsx` | Thanh tìm kiếm overlay |
| `ProductItem.jsx` | Card hiển thị 1 sản phẩm trong list |
| `ReviewSystem.jsx` | Hệ thống đánh giá sản phẩm (rating + comment + ảnh) |
| `VideoReview.jsx` | Nhúng video TikTok/YouTube vào trang SP |
| `VirtualTryOn.jsx` | Thử đồ ảo AI (Kling AI) |
| `RelatedProducts.jsx` | Sản phẩm liên quan |
| `Footer.jsx` | Footer toàn trang |
| `TawkChat.jsx` | Widget chat live (Tawk.to) |
| `ToastSoundBridge.jsx` | Phát âm thanh khi có toast notification |
| `PhoneField.jsx` | Input số điện thoại có format |
| `SearchableSelect.jsx` | Dropdown có tìm kiếm (dùng cho tỉnh/quận/phường) |
| `Title.jsx` | Component tiêu đề section |

---

## 8. ADMIN PANEL — React

### 8.1 Cấu trúc

```
admin/src/
├── App.jsx          # Routing admin
├── main.jsx
├── index.css        # Theme dark/light cho admin
├── config.js        # backendUrl config
├── components/
│   ├── Login.jsx         # Trang login admin
│   ├── Navbar.jsx        # Header admin
│   ├── Sidebar.jsx       # Sidebar điều hướng
│   ├── ImageCropModal.jsx # Crop ảnh banner/product
│   ├── Title.jsx
│   └── ToastSoundBridge.jsx
├── pages/           # Các trang admin
├── lib/             # Utilities admin
└── store/           # State management admin
```

### 8.2 Routing Admin

```
/dashboard       → Dashboard.jsx     (Admin only)
/employees       → Employees.jsx     (Admin only)
/customers       → Customers.jsx     (Admin only)
/categories      → Categories.jsx    (Admin + Employee)
/sub-categories  → SubCategories.jsx (Admin + Employee)
/add             → Add.jsx           (Admin + Employee)
/add-item        → Add.jsx
/add-items       → Add.jsx
/update/:id      → Update.jsx        (Admin + Employee)
/list            → List.jsx          (Admin + Employee)
/banners         → Banners.jsx       (Admin + Employee)
/reviews         → Reviews.jsx       (Admin + Employee)
/import-batch    → ImportBatch.jsx   (Admin + Employee)
/bulk-operation  → BulkOperation.jsx (Admin only)
/vouchers        → Vouchers.jsx      (Admin only)
/orders          → Orders.jsx        (Admin + Employee)
/returns         → Returns.jsx       (Admin + Employee)
/audit-logs      → AuditLogs.jsx     (Admin only)
```

### 8.3 Hệ thống phân quyền Admin

**2 Loại tài khoản:**
1. **Root Admin:** Email hardcode từ `.env` (`ADMIN_EMAIL`), không cần DB
2. **DB Employee:** Tài khoản trong MongoDB với `role: 'Employee'` hoặc `role: 'Admin'`

**Sidebar lọc menu theo role** (đọc base64 từ JWT):
- `Admin` → thấy tất cả menu
- `Employee` → ẩn Dashboard, Employees, Customers, BulkOperation, Vouchers, AuditLogs

### 8.4 Các Trang Admin

| Trang | Mô tả |
|-------|-------|
| `Dashboard.jsx` | Thống kê: Doanh thu, lợi nhuận, đơn hàng, sản phẩm bán chạy, biểu đồ |
| `Add.jsx` | Thêm sản phẩm: Ảnh (Cloudinary), biến thể size+màu+số lượng+giá vốn, danh mục |
| `Update.jsx` | Sửa sản phẩm |
| `List.jsx` | Danh sách sản phẩm: Filter, sort, xóa |
| `Orders.jsx` | Quản lý đơn hàng: Cập nhật trạng thái, xem chi tiết |
| `Returns.jsx` | Xét duyệt hoàn hàng: Approve/Reject, hoàn tiền ví |
| `Vouchers.jsx` | CRUD mã giảm giá |
| `ImportBatch.jsx` | Nhập hàng CSV: Upload, parse, xem lịch sử lô nhập |
| `BulkOperation.jsx` | Thao tác hàng loạt sản phẩm |
| `Categories.jsx` | CRUD danh mục cha |
| `SubCategories.jsx` | CRUD danh mục con |
| `Banners.jsx` | CRUD banner trang chủ (upload ảnh + crop) |
| `Reviews.jsx` | Quản lý đánh giá: Ẩn/hiện, reply admin |
| `Customers.jsx` | Danh sách khách hàng |
| `Employees.jsx` | Quản lý nhân viên |
| `AuditLogs.jsx` | Xem lịch sử thao tác admin |

---

## 9. TÍNH NĂNG ĐẶC BIỆT (Custom/Phức tạp)

### 9.1 Hệ thống Xác thực (Authentication)
- **Đăng nhập/Đăng ký:** JWT-based, bcrypt hash password
- **Quên mật khẩu:** OTP gửi qua email (Nodemailer), expire sau X phút
- **Admin login:** Dual system (root .env + DB role)

### 9.2 Quản lý Biến thể Sản phẩm (Product Variants)
- `sizes` là array phức tạp: `[{size: 'M', quantity: 10, costPrice: 50000}]`
- `colors` là array tên màu/hex
- Admin có thể thêm nhiều size+màu+số lượng+giá vốn khi tạo/sửa SP

### 9.3 Smart Ranking (Xếp hạng thông minh)
- Mỗi lượt xem sản phẩm → tăng `views` + lưu `UserBehavior`
- Khi bán được → tăng `sold`
- Khi có review → cập nhật `ratingAvg`, `ratingCount`
- Collection sort theo công thức smart score

### 9.4 Ví điện tử (Wallet)
- Khách hàng có ví trong app (`walletBalance` trên userModel)
- **Nạp tiền:** Qua cổng **SePay** (`sepay-pg-node`) → chuyển khoản ngân hàng
- **Thanh toán:** Dùng ví khi đặt hàng (debit)
- **Hoàn tiền:** Khi hủy đơn/hoàn hàng → credit về ví (Mongo Transaction)
- Lịch sử giao dịch trong `walletTransactionModel`

### 9.5 Hoàn hàng (Return System)
- Khách tạo yêu cầu từ trang Orders (kèm lý do + ảnh)
- Admin xét duyệt: Approve/Reject
- Hoàn tiền qua Ví hoặc Bank transfer
- Trạng thái: `Pending → Approved/Rejected → Completed`

### 9.6 Hệ thống Review
- Khách đánh giá sau khi mua (rating 1-5 + comment + ảnh)
- Admin có thể reply, ẩn/hiện review
- Tự động cập nhật `ratingAvg` + `ratingCount` trên Product

### 9.7 Nhập hàng CSV (Import Batch)
- Upload file CSV từ Excel (hỗ trợ nhiều encoding: UTF-8, Win-1258, UTF-16LE)
- Parse bằng **PapaParse** + **iconv-lite**
- Xử lý ảnh URL từ CSV (sync với Cloudinary)
- Lưu lịch sử lô nhập (`ImportBatch` model)

### 9.8 Virtual Try-On (AI)
- Tích hợp **Kling AI** API
- Khách upload ảnh cá nhân → AI ghép vào sản phẩm
- Component `VirtualTryOn.jsx` trên trang Product
- Backend: `aiController.js` + `klingAiUtil.js`

### 9.9 Video Review sản phẩm
- Admin thêm link TikTok/YouTube vào sản phẩm (`videoUrl`)
- Frontend nhúng iframe vào trang Product (`VideoReview.jsx`)
- Backend `tiktok.js` xử lý URL embed

### 9.10 Cảnh báo tồn kho thấp
- `stockAlert.js` chạy cron job định kỳ
- Quét sản phẩm có tổng tồn kho < `stockThreshold`
- Gửi email cảnh báo cho admin (Nodemailer)

### 9.11 Audit Log
- Mọi thao tác quan trọng của admin đều được ghi log
- `logger.js` → lưu vào `auditLogModel`
- Admin xem lịch sử tại trang `AuditLogs.jsx`

### 9.12 Live Chat
- Tích hợp **Tawk.to** widget (`TawkChat.jsx`)
- Inject script vào frontend

---

## 10. PHƯƠNG THỨC THANH TOÁN

| Phương thức | Mô tả |
|-------------|-------|
| **COD** | Thanh toán khi nhận hàng |
| **Wallet** | Dùng số dư ví trong app |
| **SePay** | Chuyển khoản ngân hàng qua cổng SePay (QR/STK) |

---

## 11. PHONG CÁCH CODE & QUY ƯỚC

### Backend
- **ES Modules** (`import/export`, không dùng `require`)
- Response format chuẩn: `{ success: true/false, message: '...', data: ... }`
- Tất cả controller đều try/catch và trả về JSON
- Model tránh tạo lại khi nodemon restart: `mongoose.models.X || mongoose.model('X', schema)`

### Frontend
- **React functional components** + hooks
- **Tailwind CSS** cho styling (inline Tailwind classes)
- **React Router v6** cho routing
- **React Toastify** cho notifications
- Token JWT lưu trong `localStorage`
- Axios/fetch gọi API với header `{ token: localStorage.getItem('token') }`

### Admin
- Giống frontend nhưng thêm **react-pro-sidebar**
- Có hỗ trợ **Dark Mode / Light Mode** (CSS variables)
- Theme qua CSS custom properties (`--admin-bg`, `--admin-text`, v.v.)
- Đa ngôn ngữ qua `adminLocale.jsx` (VI/EN)

---

## 12. LUỒNG DỮ LIỆU CHÍNH

### Đặt hàng
```
Frontend PlaceOrder → POST /api/order/place
  → Validate giỏ hàng + địa chỉ
  → Nếu Wallet: debit walletBalance
  → Tạo Order (status: 'Order Placed')
  → Nếu SePay: trả về checkoutUrl
  → Trừ kho inventory (inventoryDeducted)
  → Gửi email xác nhận
```

### Hoàn hàng
```
Frontend Orders → POST /api/return/create
  → Tạo ReturnRequest (status: Pending)
  → Admin vào Returns.jsx xét duyệt
  → Nếu Approve + refundMethod=Wallet:
      processRefundToWallet() [Mongo Transaction]
      → Credit walletBalance user
      → Tạo WalletTransaction (Credit)
```

### Xác thực
```
Login → POST /api/user/login
  → Verify email+password (bcrypt)
  → Tạo JWT {id, email, role}
  → Frontend lưu token localStorage
  → Mọi request tiếp theo: headers.token = JWT
```

---

## 13. DEPLOYMENT

- **Frontend:** Vercel (`https://forevervn-ecommerce.vercel.app`)
- **Backend:** Render hoặc VPS (port 4000)
- **Admin:** Vercel (separate deployment)
- **Database:** MongoDB Atlas

---

## 14. NHỮNG ĐIỀU CẦN LƯU Ý KHI VIẾT CODE TIẾP

1. **Luôn dùng ES Modules** cho backend (`import/export`)
2. **Response chuẩn:** `res.json({ success: true, ... })` — không throw error trực tiếp ra client
3. **JWT payload:** `{ id: userId, email, role }` — đọc với `tokenDecode?.id`
4. **Wallet operations dùng Mongo Transaction** để đảm bảo atomic
5. **Ảnh luôn upload qua Cloudinary** — không lưu file local
6. **Admin phân quyền:** Kiểm tra `requireRole(['Admin'])` hoặc `adminAuth` ở route level
7. **Tồn kho (`sizes`)** là array — cần update đúng phần tử khi trừ kho
8. **Cart trên server** lưu dạng Object: `{ productId_sizeIndex: quantity }`
9. **Tailwind CSS** được dùng cho cả frontend và admin (không dùng Vanilla CSS)
10. **Model collection names:**
    - `review` model → collection `review_user`
    - `return` model → collection `returnRequest`
    - `walletTransaction` model → collection `walletTransactions`

---

*File này được tạo tự động từ codebase. Cập nhật khi có thay đổi lớn về kiến trúc.*
