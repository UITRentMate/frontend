---
trigger: model_decision
description: "Kiến trúc 5 lớp của RentMate, phân quyền RBAC (GUEST/MEMBER/ADMIN), luồng nghiệp vụ gạ đổi đồ ngang."
---
# RENTMATE FRONTEND — ARCHITECTURE SPECIFICATION
> **Hệ thống:** RentMate Nền tảng Tìm kiếm, Thuê &amp; Quản lý Phòng trọ Sinh viên  
> **Tài liệu:** Kiến trúc Tổng thể Hệ thống Frontend (System Architecture Specification)  
> **Phiên bản:** 1.0.0  
> **Đối tượng:** AI Coding Agents & Frontend Engineers

---

## 1. TỔNG QUAN KIẾN TRÚC (HIGH-LEVEL ARCHITECTURE)

Dự án **RentMate** được thiết kế theo mô hình **Feature-Driven Modular Architecture** (Kiến trúc hướng Module tính năng) kết hợp với **Atomic Component Hierarchy** và **Unidirectional Data Flow** (Luồng dữ liệu một chiều).

### 1.1. Sơ đồ Luồng Dữ liệu Tổng thể (System Data Flow)

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                             PRESENTATION LAYER                                   │
│  ┌───────────────────────┐  ┌─────────────────────────┐  ┌────────────────────┐  │
│  │   Pages (Route Entry) │  │   Feature Components    │  │   Shared UI Atoms  │  │
│  │  (PostDetailPage,...) │  │  (PostCard, OfferCard)  │  │  (Button, Badge)   │  │
│  └───────────┬───────────┘  └────────────┬────────────┘  └────────────────────┘  │
└──────────────┼───────────────────────────┼───────────────────────────────────────┘
               │                           │
               ▼                           ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                         APPLICATION & STATE LAYER                                │
│  ┌────────────────────────────────────────┐ ┌─────────────────────────────────┐  │
│  │        SERVER STATE (TanStack Query)   │ │   CLIENT STATE (Context API)    │  │
│  │  - useQuery (postKeys, offerKeys)      │ │  - AuthContext (User, Token)    │  │
│  │  - useMutation (Invalidation, Toast)   │ │  - ChatContext (Active room)    │  │
│  └───────────────────┬────────────────────┘ │  - NotificationContext (Unread) │  │
│                      │                      └─────────────────────────────────┘  │
└──────────────────────┼───────────────────────────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                           DATA ACCESS & API LAYER                                │
│  ┌────────────────────────────────────────┐ ┌─────────────────────────────────┐  │
│  │         Feature API Services           │ │        Endpoints Registry       │  │
│  │  (postApi, offerApi, authApi)          │ │  (src/api/endpoints.ts)         │  │
│  └───────────────────┬────────────────────┘ └─────────────────────────────────┘  │
│                      │                                                           │
│                      ▼                                                           │
│  ┌────────────────────────────────────────────────────────────────────────────┐  │
│  │     Axios HTTP Client (Interceptors: Auth Token Injection + Error Normalizer) │
│  └───────────────────┬────────────────────────────────────────────────────────┘  │
└──────────────────────┼───────────────────────────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                           INFRASTRUCTURE & EXTERNAL                              │
│         ┌──────────────────────┐         ┌─────────────────────────┐             │
│         │   Backend REST API   │         │    Firebase Firestore   │             │
│         │   (NodeJS/Java/Go)   │         │  (Realtime Chat & Noti) │             │
│         └──────────┬───────────┘         └────────────┬────────────┘             │
│                    │                                  │                          │
│                    └───────────────┬──────────────────┘                          │
│                                    ▼                                             │
│                    ┌───────────────────────────────┐                             │
│                    │     Mock Service Fallback     │                             │
│                    │     (When VITE_USE_MOCK=true) │                             │
│                    └───────────────────────────────┘                             │
└──────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. PHÂN TẦNG HỆ THỐNG (LAYERED ARCHITECTURE)

Hệ thống được chia thành 5 tầng độc lập, tuân thủ nguyên tắc **Phụ thuộc một chiều (Dependency Rule)**: *Tầng trên có thể phụ thuộc tầng dưới, nhưng tầng dưới tuyệt đối không được phụ thuộc ngược lại tầng trên.*

### 2.1. Presentation Layer (Tầng Giao diện)
- **Shared Atomic UI (`src/components/ui/`):** Các thành phần giao diện nhỏ nhất, phi trạng thái nghiệp vụ (Stateless), tái sử dụng toàn app: `Button`, `Input`, `Badge`, `Modal`, `Skeleton`, `RatingStars`.
- **Form & Feedback Components (`src/components/form/`, `src/components/feedback/`):** `ImageUploader` (upload nhiều ảnh chụp thực tế tối đa 5 ảnh), `Toast`, `ConfirmDialog`, `EmptyState`.
- **Layouts (`src/layouts/`):**
  - `MainLayout`: Navbar (search nhanh, nút Đăng tin cam/xanh sinh viên, dropdown avatar), Footer.
  - `AuthLayout`: 2 cột (1 cột banner sinh viên trao đổi đồ, 1 cột form).
  - `AdminLayout`: Sidebar quản trị (Duyệt tin, Tố cáo, Người dùng), Admin Header.
- **Feature Components (`src/features/*/components/`):** Chứa các component nghiệp vụ đặc thù (VD: `PostCard`, `PostFilterSidebar`, `OfferCard`, `ChatWindow`, `DemandChart`).
- **Route Pages (`src/pages/`):** Điểm tiếp nhận của Router (Thin Page Assemblers), tương ứng 1:1 với URL Route, có nhiệm vụ lắp ráp các Feature Components, nhận URL params và xử lý trạng thái Loading/Error.

### 2.2. State Management Layer (Tầng Trạng thái)
Kiến trúc tách bạch 100% giữa **Server State** và **Client State**:

| Tiêu chí | Server State | Client State |
| :--- | :--- | :--- |
| **Bản chất** | Dữ liệu thuộc sở hữu của Server (Bài đăng, Đề xuất đổi đồ, Đánh giá, Tin nhắn) | Trạng thái tạm thời của phiên làm việc người dùng trên trình duyệt |
| **Công nghệ** | **TanStack Query v5** (`useQuery`, `useMutation`) | **React Context API** & Local `useState` |
| **Vị trí lưu** | Query Cache của TanStack Query | `src/context/` (`AuthContext`, `ChatContext`, `NotificationContext`) |
| **Cơ chế cập nhật**| Cache Invalidation, Polling, Optimistic Updates | Context Provider Dispatch, SetState |

### 2.3. Domain Logic & Custom Hooks Layer (Tầng Nghiệp vụ)
Mỗi feature sở hữu thư mục `hooks/` riêng biệt:
- **Query Key Factory:** Quản lý cấu trúc cache keys tập trung (`postKeys`, `offerKeys`).
- **Query Hooks:** Bọc logic fetch, pagination, debounce search, caching time (`usePosts`, `usePostDetail`).
- **Mutation Hooks:** Bọc logic submit form, xóa, duyệt bài, kèm cơ chế invalidation query cache và trigger Toast tự động.
- **Shared Utility Hooks (`src/hooks/`):** `useAuth`, `useDebounce`, `usePagination`, `useClickOutside`.

### 2.4. Data Access Layer (Tầng Truy cập Dữ liệu)
- **Feature API (`src/features/*/api/`):** Các file API thuần túy (VD: `postApi.ts`, `offerApi.ts`). Chỉ nhận Typed Arguments, trả về `Promise<ApiResponse<T>>`.
- **HTTP Client (`src/api/axiosClient.ts`):** Quản lý cấu hình Axios duy nhất toàn dự án:
  - BaseURL và Timeout (15.000ms).
  - Request Interceptor: Tự động trích xuất Token từ `tokenStorage` và gắn vào Header `Authorization: Bearer <token>`.
  - Response Interceptor: Tự động unwrap `response.data`, bắt mã lỗi `401 Unauthorized` để xóa cache và chuyển hướng người dùng đến trang Login.
- **Centralized Endpoints (`src/api/endpoints.ts`):** Từ điển URL endpoint tập trung, ngăn chặn hardcode đường dẫn.

### 2.5. External & Infrastructure Layer (Tầng Ngoại vi & Realtime)
- **Firebase / Firestore (`src/configs/firebase.ts`):** Phục vụ kênh chat trực tiếp thời gian thực giữa 2 sinh viên và thông báo thông chuông đẩy (Push Notifications).
- **Mock Service (`src/mocks/`):** Hoạt động khi `VITE_USE_MOCK=true`. Giả lập đầy đủ độ trễ mạng (300ms - 600ms) và lưu trữ in-memory để kiểm thử tính năng hoàn chỉnh mà không cần backend chạy thật.

---

## 3. KIẾN TRÚC ĐIỀU HƯỚNG & PHÂN QUYỀN (ROUTING & RBAC)

Hệ thống áp dụng mô hình **Phân quyền dựa trên vai trò (Role-Based Access Control - RBAC)** gồm 3 cấp bậc:
1. `GUEST`: Khách vãng lai chưa đăng nhập.
2. `MEMBER`: Sinh viên đã xác thực tài khoản qua email trường đại học (`.edu.vn`).
3. `ADMIN`: Quản trị viên hệ thống RentMate.

### 3.1. Cấu trúc Cây Tuyến đường (Route Tree)

```
/ (MainLayout)
├── / .................................... Trang chủ / Danh sách bài đăng (GUEST, MEMBER)
├── /posts/:id ........................... Chi tiết món đồ / Đồ gạ đổi (GUEST, MEMBER)
│
├── [ProtectedRoute - Yêu cầu MEMBER]
│   ├── /posts/create .................... Đăng tin pass đồ / gạ đổi mới
│   ├── /posts/:id/edit .................. Chỉnh sửa bài đăng
│   ├── /my-offers ....................... Quản lý các đề xuất đổi đồ (Nhận & Gửi)
│   ├── /chat ............................ Hộp thư trò chuyện thương lượng
│   ├── /profile/me ...................... Trang cá nhân & Kho đồ (My Inventory)
│   └── /profile/:userId ................. Xem uy tín & kho đồ công khai của bạn học
│
├── /auth (AuthLayout)
│   ├── /auth/login ...................... Đăng nhập sinh viên
│   ├── /auth/register .................. Đăng ký (Validate email .edu.vn)
│   └── /auth/forgot-password ............ Quên mật khẩu
│
└── /admin (AdminLayout) [AdminRoute - Yêu cầu ADMIN]
    ├── /admin/dashboard ................. Thống kê tổng quan & Biểu đồ nhu cầu
    ├── /admin/posts ..................... Kiểm duyệt bài đăng mới
    ├── /admin/reports .................. Xử lý khiếu nại sách lậu / bom hẹn
    └── /admin/users ..................... Quản lý & Khóa tài khoản vi phạm
```

### 3.2. Sơ đồ Hoạt động của Route Guard

```
                      [Yêu cầu Truy cập URL]
                                │
                                ▼
                       Đường dẫn công khai?
                                │
                 ┌──────────────┴──────────────┐
              (Có)                           (Không)
                 │                             │
                 ▼                             ▼
         Cho phép Render               Đã đăng nhập chưa?
                                               │
                                ┌──────────────┴──────────────┐
                             (Chưa)                         (Đã)
                                │                             │
                                ▼                             ▼
                       Redirect tới /auth/login        Có phải Admin Route?
                       (Kèm param ?redirect=URL)              │
                                                       ┌──────┴──────┐
                                                    (Không)        (Có)
                                                       │             │
                                                       ▼             ▼
                                                  Render Page   Role === 'ADMIN'?
                                                                     │
                                                              ┌──────┴──────┐
                                                            (Có)         (Không)
                                                              │             │
                                                              ▼             ▼
                                                         Render Admin  Redirect 403
                                                            Layout     / Home Page
```

---

## 4. KIẾN TRÚC NGHIỆP VỤ ĐẶC TRÙ CỦA RENTMATE

### 4.1. Cơ chế Gạ Đổi Đồ Ngang (Barter / Offer Mechanism)
Đây là tính năng độc đáo nhất của RentMate so với các trang thương mại điện tử thông thường:

```
[Sinh viên B đăng bài] ◄──────────── [Sinh viên A xem bài viết]
(VD: Giáo trình Giải tích)                       │
                                                 ▼
                                     Bấm "Gạ đổi đồ ngay"
                                                 │
                                                 ▼
                                     [CreateOfferModal mở ra]
                                     - Chọn 1..N món từ Kho đồ của A (My Inventory)
                                     - Nhập tiền bù thêm (VD: +20.000đ)
                                     - Nhập lời nhắn thiện chí
                                                 │
                                                 ▼
                                     [Gửi Offer lên hệ thống]
                                                 │
                                                 ▼
[Sinh viên B vào MyOffersPage] ◄───── Thông báo Realtime đẩy tới B
         │
         ├── Chấp nhận ──► Hệ thống tự đổi trạng thái bài viết sang "Đang thương lượng"
         │                Mở phòng Chat riêng có ghim món đồ đang trao đổi
         │
         └── Từ chối ────► Thông báo từ chối gửi lại cho Sinh viên A
```

### 4.2. Cơ chế Đánh giá Uy tín Sinh viên (Reputation Score Pipeline)
- Giao dịch trao đổi hoàn tất ➡️ Hệ thống mở `CreateReviewModal`.
- Điểm đánh giá gồm: Số sao (1 - 5 ⭐), độ đúng hẹn tại điểm gặp mặt trong khuôn viên trường, độ trung thực về tình trạng đồ dùng.
- Điểm uy tín (`ReputationScore`) được hiển thị công khai trên Profile và thẻ PostCard để tạo dựng lòng tin.

### 4.3. Kiểm soát Bản quyền Giáo trình & Phòng chống Gian lận
- **Validation Email trường:** Chỉ tài khoản có email đuôi `.edu.vn` mới được đăng bài và thực hiện trao đổi nhằm xác thực danh tính sinh viên trong trường.
- **Báo cáo vi phạm (Reports):** Hệ thống phát hiện sách photocopy lậu, tài liệu cấm, hoặc hành vi "bom hẹn" nhiều lần sẽ tự động chuyển vào hàng đợi xử lý của `AdminReportsPage` để Admin khóa tài khoản.

---

## 5. KIẾN TRÚC XỬ LÝ NGOẠI LỆ & PHẢN HỒI (ERROR RESILIENCE)

Hệ thống triển khai 3 lớp bảo vệ lỗi (Three-tier Error Handling):

```
┌──────────────────────────────────────────────────────────────────┐
│ CẤP ĐỘ 1: GLOBAL BOUNDARY (Crash Prevention)                     │
│ React Error Boundary bắt các lỗi runtime render của React,       │
│ hiển thị màn hình fallback thân thiện thay vì làm trắng trang.    │
└─────────────────────────────────┬────────────────────────────────┘
                                  │
┌─────────────────────────────────▼────────────────────────────────┐
│ CẤP ĐỘ 2: HTTP CLIENT INTERCEPTOR (Network & Auth Normalizer)    │
│ Tự động xử lý lỗi mạng, Timeout, Token Expired (401),            │
│ và chuẩn hóa format lỗi về ApiErrorResponse duy nhất.            │
└─────────────────────────────────┬────────────────────────────────┘
                                  │
┌─────────────────────────────────▼────────────────────────────────┐
│ CẤP ĐỘ 3: MUTATION & FORM FEEDBACK (User Experience)             │
│ useMutation catch lỗi ném ra Toast đỏ thông báo chi tiết,        │
│ Form Inputs hiển thị viền đỏ và text lỗi ngay dưới trường nhập. │
└──────────────────────────────────────────────────────────────────┘
```

---

## 6. QUY CHUẨN MỞ RỘNG TÍNH NĂNG MỚI (SCALING A NEW FEATURE)

Khi AI Agent hoặc Developer được yêu cầu thêm một module tính năng mới (ví dụ: `vouchers` hoặc `notifications`), **BẮT BUỘC** thực hiện theo quy trình 6 bước chuẩn mực sau:

```
BƯỚC 1: ĐỊNH NGHĨA KIỂU DỮ LIỆU
  └── Tạo src/features/<feature>/types/index.ts (Entity, Payloads, Filters)

BƯỚC 2: KHAI BÁO ENDPOINTS
  └── Bổ sung URL constants vào src/api/endpoints.ts

BƯỚC 3: XÂY DỰNG API SERVICE & MOCK
  ├── Tạo src/features/<feature>/api/<feature>Api.ts
  └── Thêm mock handler tương ứng trong src/mocks/

BƯỚC 4: XÂY DỰNG TANSTACK QUERY HOOKS
  ├── Tạo src/features/<feature>/hooks/<feature>Keys.ts (Query Key Factory)
  ├── Tạo use<Feature>s.ts (Query Hook)
  └── Tạo useCreate<Feature>.ts (Mutation Hook kèm cache invalidation)

BƯỚC 5: XÂY DỰNG ATOMIC COMPONENTS
  └── Tạo các UI components trong src/features/<feature>/components/

BƯỚC 6: XÂY DỰNG TRANG & GẮN ROUTE
  ├── Tạo trang trong src/features/<feature>/pages/
  └── Đăng ký Route vào src/routes/AppRoutes.tsx kèm Route Guard phù hợp
```

---

## 7. NGUYÊN TẮC THIẾT KẾ & HIỆU NĂNG (PERFORMANCE GUIDELINES)

1. **Tối ưu hình ảnh học tập:**
   - Ảnh chụp thực tế của sinh viên tải lên được nén và kiểm tra dung lượng tối đa 5MB trước khi upload.
   - Luôn sử dụng ảnh thế chỗ `public/placeholders/book-placeholder.png` và `user-placeholder.png` trong lúc đợi ảnh tải xong.
2. **Debounce Search Input:**
   - Thanh tìm kiếm mã môn học và tên sách phải sử dụng hook `useDebounce` (trễ 350ms - 500ms) để không gây áp lực gửi request API liên tục khi sinh viên đang gõ phím.
3. **Lazy Loading Route:**
   - Các trang nặng như `AdminDashboardPage`, `ChatPage`, `MyOffersPage` phải được lazy load qua `React.lazy()` và bọc bởi `Suspense` kèm `Spinner` để giảm kích thước bundle tải lần đầu.
4. **Cache Longevity:**
   - Danh sách bài đăng (`posts`): `staleTime` 3 phút.
   - Chi tiết bài đăng (`post detail`): `staleTime` 5 phút.
   - Tin nhắn và Đề xuất đổi đồ (`chat`, `offers`): `staleTime` 30 giây hoặc đồng bộ qua Firebase Realtime Listener.

