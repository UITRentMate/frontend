# RENTMATE FRONTEND — CẤU TRÚC THƯ MỤC CHI TIẾT (FOLDER STRUCTURE)
> **Dự án:** RentMate (Hệ thống Trao đổi, Pass đồ & Tặng đồ dùng Sinh viên)  
> **Kiến trúc:** Feature-Driven Modular Architecture & Atomic Component Design  
> **Mục tiêu:** Mô tả chi tiết vai trò, trách nhiệm và quy tắc tổ chức của từng thư mục, từng tệp tin trong toàn bộ mã nguồn.

---

## 🌳 1. SƠ ĐỒ CÂY THƯ MỤC TỔNG QUAN

```text
unipass-frontend/
├── public/                               # Tài nguyên công khai tĩnh (không qua Vite bundling)
│   ├── favicon.ico                       # Icon website trên thanh trình duyệt
│   ├── robots.txt                        # Chỉ dẫn cho công cụ tìm kiếm (SEO)
│   └── placeholders/                     # Ảnh giữ chỗ dự phòng khi ảnh mạng chưa tải xong
│       ├── book-placeholder.png          # Ảnh giữ chỗ cho sách giáo trình, tài liệu
│       └── user-placeholder.png          # Avatar giữ chỗ cho sinh viên
│
├── src/
│   ├── assets/                           # Tài nguyên tĩnh được Vite tối ưu & băm mã hash
│   │   ├── icons/                        # Icon SVG nội bộ (bell, exchange, book, star...)
│   │   ├── images/                       # Banner trang chủ, minh họa 404, empty state
│   │   └── logos/                        # Logo RentMate, logo các trường ĐH đối tác
│   │
│   ├── api/                              # Tầng tích hợp HTTP trung tâm toàn ứng dụng
│   │   ├── axiosClient.ts                # Cấu hình Axios: BaseURL, timeout, interceptor JWT token
│   │   └── endpoints.ts                  # Toàn bộ hằng số URL API Backend (/auth, /posts, /offers...)
│   │
│   ├── configs/                          # Khởi tạo kết nối thư viện ngoại vi & môi trường
│   │   ├── env.ts                        # Đọc & kiểm tra biến môi trường VITE_* an toàn kiểu
│   │   └── firebase.ts                   # Cấu hình Firestore/Firebase phục vụ Chat & Notification
│   │
│   ├── constants/                        # Tập trung tất cả hằng số nghiệp vụ & cấu hình hệ thống
│   │   ├── index.ts                      # Barrel export toàn bộ hằng số
│   │   ├── app.ts                        # Tên app, regex email trường (.edu.vn), kích thước file ảnh tối đa
│   │   ├── storage.ts                    # Tên các khóa lưu trữ (ACCESS_TOKEN_KEY, USER_KEY...)
│   │   ├── routes.ts                     # Đường dẫn các màn hình (ROUTES.HOME, ROUTES.POST_DETAIL...)
│   │   ├── post.ts                       # Loại tin (TẶNG, ĐỔI, BÁN), trạng thái bài, độ mới %
│   │   ├── offer.ts                      # Trạng thái đề xuất đổi đồ (CHỜ DUYỆT, ĐÃ CHẤP NHẬN, TỪ CHỐI)
│   │   ├── category.ts                   # Nhóm đồ dùng (Giáo trình, Dụng cụ vẽ, Máy tính, Điện tử)
│   │   └── roles.ts                      # Phân quyền người dùng (GUEST, MEMBER, ADMIN)
│   │
│   ├── mocks/                            # Dữ liệu & dịch vụ giả lập khi chưa có Backend
│   │   ├── index.ts                      # Cấu hình cờ bật/tắt Mock API
│   │   ├── data/                         # Dữ liệu JSON mẫu mô phỏng dữ liệu thật
│   │   │   ├── mockUsers.ts              # Tài khoản sinh viên test và Admin test
│   │   │   ├── mockPosts.ts              # Danh sách tin đăng mẫu theo mã môn học & trường
│   │   │   ├── mockOffers.ts             # Các lượt đề xuất đổi đồ mẫu giữa 2 sinh viên
│   │   │   ├── mockChats.ts              # Lịch sử tin nhắn mẫu kèm ngữ cảnh bài viết
│   │   │   ├── mockReviews.ts            # Đánh giá sao & nhận xét độ uy tín mẫu
│   │   │   ├── mockReports.ts            # Dữ liệu tố cáo bài viết và người dùng mẫu
│   │   │   └── mockDashboardStats.ts     # Số liệu biểu đồ thống kê cho Admin Dashboard
│   │   └── mockService.ts                # Hàm giả lập độ trễ mạng (simulate delay 300-600ms)
│   │
│   ├── components/                       # Các component giao diện dùng chung toàn app
│   │   ├── ui/                           # Thành phần nguyên tử giao diện (Atomic UI)
│   │   │   ├── Button.tsx                # Nút bấm đa trạng thái (primary, outline, loading spinner)
│   │   │   ├── Input.tsx                 # Ô nhập liệu văn bản có icon, label, helper text
│   │   │   ├── Textarea.tsx              # Ô nhập văn bản nhiều dòng
│   │   │   ├── Select.tsx                # Menu chọn lựa thả xuống tùy biến
│   │   │   ├── Badge.tsx                 # Huy hiệu: "Tặng 0đ", "Gạ đổi", "Đang thương lượng"
│   │   │   ├── Modal.tsx                 # Hộp thoại pop-up cơ bản (backdrop blur, esc to close)
│   │   │   ├── Dropdown.tsx              # Khung menu xổ xuống đa năng
│   │   │   ├── Spinner.tsx               # Hiệu ứng xoay khi tải trang
│   │   │   ├── Skeleton.tsx              # Khung xương xám khi đợi tải API
│   │   │   └── Tabs.tsx                  # Thanh chuyển tab nội dung
│   │   ├── form/                         # Thành phần nhập liệu form chuyên biệt
│   │   │   ├── ImageUploader.tsx         # Upload nhiều ảnh chụp thực tế đồ dùng kèm nút xóa
│   │   │   ├── RatingStars.tsx           # Thành phần chọn/hiển thị số sao uy tín (1-5 sao)
│   │   │   └── SearchBar.tsx             # Thanh tìm kiếm từ khóa với icon tích hợp
│   │   ├── feedback/                     # Phản hồi tương tác người dùng
│   │   │   ├── Toast.tsx                 # Thông báo nổi góc màn hình (Success, Error, Info)
│   │   │   ├── ConfirmDialog.tsx         # Hộp thoại xác nhận hủy hẹn/xóa bài/hủy offer
│   │   │   └── EmptyState.tsx            # Hiển thị khi không tìm thấy kết quả hoặc kho đồ trống
│   │   └── navigation/                   # Điều hướng dùng chung
│   │       ├── Pagination.tsx            # Thanh chuyển trang danh sách bài đăng
│   │       └── Breadcrumb.tsx            # Đường dẫn điều hướng phân cấp danh mục
│   │
│   ├── layouts/                          # Các bộ khung bố cục giao diện
│   │   ├── MainLayout/                   # Dành cho khách vãng lai và sinh viên
│   │   │   ├── MainLayout.tsx            # Wrapper chứa Navbar, Outlet và Footer
│   │   │   ├── Navbar.tsx                # Menu chính, thanh search nhanh, nút Đăng tin
│   │   │   ├── UserMenuDropdown.tsx      # Dropdown menu góc phải (Hồ sơ, Kho đồ, Đăng xuất)
│   │   │   └── Footer.tsx                # Chân trang, cam kết bản quyền & thông tin trường
│   │   ├── AuthLayout/                   # Khung sườn dành riêng cho Đăng nhập / Đăng ký
│   │   │   └── AuthLayout.tsx            # Chia 2 cột: Banner sinh viên & Khung Form
│   │   └── AdminLayout/                  # Dành riêng cho Quản trị viên
│   │       ├── AdminLayout.tsx           # Wrapper chứa AdminSidebar, AdminHeader, Outlet
│   │       ├── AdminSidebar.tsx          # Menu: Báo cáo, Duyệt tin, Quản lý tài khoản
│   │       └── AdminHeader.tsx           # Thanh header Admin (thông báo hệ thống, profile admin)
│   │
│   ├── context/                          # Quản lý trạng thái toàn cục phía Client (Client State)
│   │   ├── AuthContext.tsx               # Thông tin đăng nhập, token, role và hàm login/logout
│   │   ├── ChatContext.tsx               # Trạng thái phòng chat hiện tại, số tin chưa đọc
│   │   └── NotificationContext.tsx       # Lắng nghe thông báo đề xuất mới, duyệt bài realtime
│   │
│   ├── hooks/                            # Custom Hooks tiện ích dùng chung
│   │   ├── useAuth.ts                    # Hook rút gọn lấy dữ liệu đăng nhập từ AuthContext
│   │   ├── useDebounce.ts                # Tối ưu việc gõ tìm kiếm, tránh gọi API liên tục
│   │   ├── usePagination.ts              # Tính toán trang hiện tại, tổng trang, lát cắt dữ liệu
│   │   └── useClickOutside.ts            # Đóng modal/dropdown khi người dùng click ra ngoài
│   │
│   ├── pages/                            # TẦNG GIAO DIỆN THEO ROUTE (Thin Page Assemblers)
│   │   ├── Home/                         # Trang chủ (Lắp ráp các section)
│   │   │   ├── index.tsx                 # Màn hình chính route '/'
│   │   │   └── components/               # Sub-components đặc thù của Home (HeroBanner, QuickAccess...)
│   │   ├── PostDetail/index.tsx          # Màn hình chi tiết bài đăng '/posts/:id'
│   │   ├── CreatePost/index.tsx          # Màn hình tạo bài đăng '/posts/create'
│   │   ├── MyOffers/index.tsx            # Màn hình đề xuất đổi đồ '/my-offers'
│   │   ├── Auth/                         # Màn hình đăng nhập, đăng ký
│   │   └── NotFound/index.tsx            # Màn hình 404
│   │
│   ├── features/                         # CÁC MODULE NGHIỆP VỤ ĐỘC LẬP (Feature-Sliced Modules)
│   │   │
│   │   ├── auth/                         # Nghiệp vụ Xác thực tài khoản sinh viên
│   │   │   ├── api/authApi.ts            # Gọi login, register, verify-student-email
│   │   │   ├── components/               # Form đăng nhập, đăng ký, quên mật khẩu
│   │   │   ├── pages/                    # LoginPage, RegisterPage, ForgotPasswordPage
│   │   │   └── types/index.ts            # AuthPayload, AuthResponse, User
│   │   │
│   │   ├── posts/                        # Nghiệp vụ Quản lý tin đăng đồ dùng & Tìm kiếm
│   │   │   ├── api/postApi.ts            # Lấy bài đăng, chi tiết, đăng tin, sửa, xóa
│   │   │   ├── hooks/                    # postKeys, usePosts, usePostDetail, useCreatePost
│   │   │   ├── components/               # PostCard, PostList, PostFilterSidebar, PostGallery, PostForm
│   │   │   ├── pages/                    # PostListPage, PostDetailPage, CreatePostPage, EditPostPage
│   │   │   └── types/index.ts            # Post, PostFilterParams, CreatePostDTO
│   │   │
│   │   ├── offers/                       # Nghiệp vụ Gạ đổi đồ ngang (Barter / Exchange)
│   │   │   ├── api/offerApi.ts           # Gửi đề xuất, chấp nhận, từ chối, hủy đề xuất
│   │   │   ├── hooks/                    # offerKeys, useReceivedOffers, useSentOffers, useCreateOffer
│   │   │   ├── components/               # CreateOfferModal, OfferCard, OfferActionButtons
│   │   │   ├── pages/                    # MyOffersPage (Tab Đã nhận & Tab Đã gửi)
│   │   │   └── types/index.ts            # Offer, OfferStatus, CreateOfferPayload
│   │   │
│   │   ├── chat/                         # Nghiệp vụ Nhắn tin thương lượng trực tiếp
│   │   │   ├── api/chatService.ts        # Kết nối Firebase: gửi tin, lắng nghe realtime
│   │   │   ├── components/               # ConversationList, ChatWindow, MessageBubble, ChatPostContext
│   │   │   ├── pages/                    # ChatPage
│   │   │   └── types/index.ts            # Message, Conversation, ChatUser
│   │   │
│   │   ├── reviews/                      # Nghiệp vụ Đánh giá sao và điểm uy tín sinh viên
│   │   │   ├── api/reviewApi.ts          # Gửi đánh giá sau khi giao dịch thành công
│   │   │   ├── hooks/                    # reviewKeys, useReviews, useCreateReview
│   │   │   ├── components/               # CreateReviewModal, ReviewList, ReputationScore
│   │   │   └── types/index.ts            # Review, ReputationSummary
│   │   │
│   │   ├── reports/                      # Nghiệp vụ Báo cáo vi phạm (sách lậu, bom hàng)
│   │   │   ├── api/reportApi.ts          # Gửi tố cáo bài viết hoặc tài khoản
│   │   │   ├── components/               # CreateReportModal
│   │   │   └── types/index.ts            # ReportPayload, ReportReason
│   │   │
│   │   ├── profile/                      # Nghiệp vụ Hồ sơ cá nhân & Kho đồ sinh viên
│   │   │   ├── api/profileApi.ts         # Cập nhật hồ sơ, lấy lịch sử trao đổi
│   │   │   ├── components/               # ProfileHeader, MyInventoryTab, MyPostsTab, TransactionHistoryTab
│   │   │   ├── pages/                    # MyProfilePage, PublicProfilePage
│   │   │   └── types/index.ts            # UserProfile, InventoryItem
│   │   │
│   │   └── admin/                        # Nghiệp vụ Quản trị viên hệ thống
│   │       ├── api/adminApi.ts           # API thống kê, kiểm duyệt bài, xử lý tố cáo, khóa tài khoản
│   │       ├── hooks/                    # adminKeys, useAdminStats, usePendingPosts, useReports
│   │       ├── components/               # StatsOverview, DemandChart, PendingPostsTable, ReportsTable
│   │       ├── pages/                    # AdminDashboardPage, AdminPostsPage, AdminReportsPage, AdminUsersPage
│   │       └── types/index.ts            # DashboardStats, ReportItem, AdminActionDTO
│   │
│   ├── routes/                           # Định tuyến và bảo vệ tuyến đường
│   │   ├── AppRoutes.tsx                 # Cây Route tổng hợp sử dụng React Router
│   │   ├── ProtectedRoute.tsx            # Chặn khách vãng lai, chỉ cho Member đã đăng nhập
│   │   └── AdminRoute.tsx                # Chặn người dùng thường, chỉ cho quyền ADMIN
│   │
│   ├── types/                            # Kiểu dữ liệu dùng chung toàn ứng dụng (Global Types)
│   │   ├── common.ts                     # BaseEntity (id, createdAt, updatedAt), PaginationParams
│   │   └── api.ts                        # ApiResponse<T>, PaginatedResponse<T>, ApiErrorResponse
│   │
│   ├── utils/                            # Hàm tiện ích thuần túy (Pure Helper Functions)
│   │   ├── formatCurrency.ts             # Định dạng tiền tệ (0 -> "Tặng 0đ", 50000 -> "50.000 đ")
│   │   ├── formatDate.ts                 # Format thời gian tương đối ("Vừa xong", "2 ngày trước")
│   │   ├── tokenStorage.ts               # Lưu trữ & trích xuất JWT Token an toàn qua Web Storage
│   │   └── validators.ts                 # Kiểm tra email sinh viên .edu.vn, số điện thoại, ảnh upload
│   │
│   ├── App.tsx                           # Root Component chứa RouterProvider & Context Providers
│   ├── main.tsx                          # Điểm khởi chạy chính (Mount React vào DOM)
│   └── index.css                         # Cấu hình Tailwind CSS (@tailwind base, components, utilities)
│
├── .env.example                          # File mẫu khai báo các biến môi trường
├── .env.local                            # Biến môi trường cá nhân (chứa URL Backend & Firebase Key)
├── .gitignore                            # Danh sách thư mục/tệp bỏ qua không commit Git
├── index.html                            # HTML template gốc của Vite
├── package.json                          # Danh sách dependencies, scripts khởi chạy dự án
├── postcss.config.js                     # Cấu hình PostCSS cho Tailwind CSS
├── tailwind.config.js                    # Tùy biến bảng màu RentMate, font chữ và animation
├── tsconfig.json                         # Cấu hình TypeScript và Path Alias (`@/*` trỏ về `src/*`)
├── tsconfig.node.json                    # Cấu hình TypeScript cho Vite build tools
└── vite.config.ts                        # Cấu hình Vite bundler và Alias đường dẫn
```

---

## 🔍 2. CHI TIẾT VAI TRÒ TỪNG HẠNG MỤC CHÍNH

### 2.1. Thư mục `public/` (Static Assets không qua Bundler)
- **Vai trò:** Chứa các tài nguyên cần được giữ nguyên tên tệp và đường dẫn trực tiếp từ root `/` mà không bị Vite đổi tên băm mã (hash).
- **`placeholders/`:** Cung cấp ảnh mặc định hiển thị ngay khi ứng dụng vừa nạp trang, tránh trường hợp bài đăng bị rỗng khung hình khi ảnh từ CDN hoặc người dùng chưa tải kịp.

### 2.2. Thư mục `src/assets/` (Managed Assets)
- **Vai trò:** Tài nguyên được import trực tiếp trong code TypeScript/React. Vite sẽ tự động nén, nhúng dạng base64 nếu file nhỏ hoặc gán mã hash để phục vụ cache trình duyệt.
- **`icons/`:** Các icon SVG tùy biến về đồ dùng học tập, giáo trình, dấu tích sinh viên uy tín.
- **`logos/`:** Logo nhận diện RentMate và logo các trường đại học liên kết (.edu.vn).

### 2.3. Tầng `src/api/` (Centralized HTTP Gateway)
- **`axiosClient.ts`:** Khởi tạo instance Axios duy nhất. Gắn token Bearer từ `tokenStorage` vào request header. Đón bắt lỗi 401 để tự động clear session và chuyển hướng về `/auth/login`.
- **`endpoints.ts`:** Nơi duy nhất khai báo chuỗi URL endpoint API. Không bao giờ gõ URL trực tiếp trong các components.

### 2.4. Tầng `src/constants/` (Business & System Constants)
- **Vai trò:** Trung tâm quản lý các giá trị bất biến của hệ thống.
- **`post.ts`:** Định nghĩa loại bài (`GIVE_AWAY`: Tặng 0đ, `EXCHANGE`: Gạ đổi, `SELL`: Bán rẻ), độ mới của sách vở (`LIKE_NEW_99`, `GOOD_90`...).
- **`offer.ts`:** Các trạng thái của một lượt gạ đổi đồ (`PENDING`, `ACCEPTED`, `REJECTED`, `CANCELLED`).
- **`category.ts`:** Danh mục phân loại môn học và đồ dùng sinh viên.

### 2.5. Tầng `src/mocks/` (Mock-First Development Layer)
- **Vai trò:** Cho phép đội ngũ Frontend phát triển và kiểm thử giao diện mượt mà ngay cả khi Backend chưa hoàn thiện hoặc chưa có kết nối Internet.
- **`data/`:** Dữ liệu mẫu phong phú mô phỏng tài khoản sinh viên thật từ ĐH Bách Khoa, ĐH Kinh Tế Quốc Dân, các bài đăng giáo trình môn Triết, Giải tích, Casio...
- **`mockService.ts`:** Cung cấp hàm `delay(ms)` mô phỏng độ trễ mạng thực tế từ 300ms - 600ms, giúp kiểm thử trạng thái Skeleton loading và EmptyState chân thực nhất.

### 2.6. Tầng `src/components/` (Shared UI Library)
- **`ui/` (Atomic UI):** Các thành phần giao diện cơ bản nhất, không chứa logic nghiệp vụ, có thể dùng ở bất kỳ dự án React nào.
- **`form/`:** Các ô nhập liệu có logic chuyên sâu như tải lên nhiều ảnh đồ dùng học tập kèm nút xóa (`ImageUploader`), chấm sao đánh giá uy tín (`RatingStars`).
- **`feedback/`:** Các công cụ giao tiếp với người dùng khi có sự kiện (Toast thành công/lỗi, ConfirmDialog xác nhận hủy đổi đồ).

### 2.7. Tầng `src/layouts/` (Shell Architecture)
- **`MainLayout/`:** Khung giao diện cho sinh viên lướt tìm đồ, có thanh tìm kiếm nhanh, nút Đăng tin nổi bật và UserMenuDropdown.
- **`AuthLayout/`:** Khung giao diện tập trung cho người dùng đăng nhập/đăng ký.
- **`AdminLayout/`:** Khung chuyên biệt cho Ban quản trị RentMate duyệt bài và xử lý vi phạm.

### 2.8. Tầng `src/context/` (Global Client State)
- Chỉ quản lý trạng thái phiên làm việc của Client:
  - `AuthContext`: Thông tin tài khoản đăng nhập hiện tại, Token, Role.
  - `ChatContext`: Phòng chat đang mở, số tin nhắn chưa đọc.
  - `NotificationContext`: Lắng nghe thông báo đẩy (push notification) khi có bạn học gửi lời gạ đổi đồ mới.

### 2.9. Tầng `src/features/` (Feature-Driven Modules)
Mỗi nghiệp vụ cốt lõi của RentMate được đóng gói trọn gói trong một thư mục con độc lập với cấu trúc nội bộ đồng nhất:
- **`api/`:** Hàm gọi API thuần túy của tính năng.
- **`hooks/`:** Toàn bộ Query Key Factory, `useQuery` và `useMutation` của tính năng.
- **`components/`:** Các component giao diện chỉ phục vụ riêng cho tính năng đó.
- **`types/index.ts`:** Định nghĩa TypeScript Interface và DTOs riêng của tính năng.

### 2.10. Tầng `src/pages/` (Thin Page Assemblers & Route Mapping)
- **Nhiệm vụ:** Màn hình hoàn chỉnh gắn liền với từng đường dẫn (Route) trong `src/routes/AppRoutes.tsx`.
- **Cấu trúc:** Mỗi trang là một folder riêng nếu cần tách sub-components chỉ thuộc riêng trang đó (`pages/Home/`, `pages/PostDetail/`, `pages/CreatePost/`, `pages/MyOffers/`, `pages/Auth/`, `pages/NotFound/`).
- **Nhiệm vụ chính:** Đóng vai trò bộ lắp ráp mỏng (Thin Controller/Assembler): nhận URL params (`useParams`), gọi Custom Query Hooks từ `features/`, lắp ráp UI Components từ `features/` và `components/ui/`, hiển thị Skeleton khi Loading và EmptyState khi không có dữ liệu. Không viết API call hay logic state phức tạp trực tiếp tại Page.

---

## ⚙️ 3. QUY ƯỚC PATH ALIAS (TSCONFIG & VITE CONFIG)

Hệ thống cấu hình Path Alias `@/*` trỏ trực tiếp vào thư mục `src/*` để loại bỏ hoàn toàn các đường dẫn relative phức tạp:

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

---

## 📌 4. BẢNG TỔNG KẾT VỊ TRÍ TẠO FILE CHO AI AGENT

Khi giao việc cho AI Agent, hãy yêu cầu đặt file đúng vị trí theo bảng sau:

| Nhiệm vụ cần tạo | Thư mục chính xác |
| :--- | :--- |
| Tạo component nút bấm, modal, badge dùng chung | `src/components/ui/` |
| Tạo component form upload ảnh, thanh search | `src/components/form/` |
| Tạo hook tính toán debounce, pagination chung | `src/hooks/` |
| Tạo hàm format tiền tệ, ngày tháng, validate email | `src/utils/` |
| Thêm endpoint URL mới | `src/api/endpoints.ts` |
| Tạo logic lấy danh sách bài đăng (API, Hook, Card) | `src/features/posts/` |
| Tạo logic gửi/nhận đề xuất đổi đồ ngang | `src/features/offers/` |
| Tạo logic chấm điểm sao uy tín | `src/features/reviews/` |
| Tạo trang quản trị duyệt bài / tố cáo vi phạm | `src/features/admin/` |
| Tạo route mới | `src/routes/AppRoutes.tsx` |
