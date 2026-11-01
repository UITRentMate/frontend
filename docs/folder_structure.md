# Cấu Trúc Thư Mục & Quy Chuẩn Tổ Chức Mã Nguồn (Frontend)

Tài liệu này giải thích chi tiết kiến trúc **Hybrid (Page-Based Routing + Feature-Based Modules)** của ứng dụng **RentMate Frontend**, làm cơ sở cho 3 thành viên Frontend phát triển độc lập mà không bị xung đột mã nguồn.

---

## 1. Cấu trúc thư mục hiện tại (Thực tế Base Project)

Hiện tại, mã nguồn sau giai đoạn khởi tạo Base Project có cấu trúc cây thư mục như sau:

```
frontend/
├── public/
│   └── .gitkeep                    # Tài nguyên tĩnh phục vụ trực tiếp
├── src/
│   ├── app/
│   │   └── App.tsx                 # Root component khởi tạo giao diện
│   ├── assets/
│   │   └── .gitkeep                # Hình ảnh, icons, fonts tĩnh
│   ├── components/
│   │   └── .gitkeep                # UI components dùng chung toàn dự án
│   ├── features/
│   │   └── .gitkeep                # Các module nghiệp vụ tự đóng gói
│   ├── hooks/
│   │   └── .gitkeep                # Custom React hooks dùng chung
│   ├── lib/
│   │   └── .gitkeep                # Tiện ích, cấu hình thư viện ngoài, API client
│   ├── pages/
│   │   └── .gitkeep                # Màn hình giao diện hoàn chỉnh theo tuyến đường
│   ├── styles/
│   │   └── index.css               # Điểm nhập CSS toàn cục tích hợp Tailwind v4
│   ├── types/
│   │   └── .gitkeep                # Kiểu dữ liệu TypeScript dùng chung
│   ├── main.tsx                    # Điểm nhập khởi chạy React DOM
│   └── vite-env.d.ts               # Khai báo môi trường client của Vite
├── index.html                      # File HTML mẫu gốc
├── package.json                    # Khai báo dependencies và scripts
├── package-lock.json               # Khóa phiên bản dependency chính xác
├── tsconfig.json                   # Cấu hình TypeScript Project References gốc
├── tsconfig.app.json               # Cấu hình TypeScript cho ứng dụng
├── tsconfig.node.json              # Cấu hình TypeScript cho môi trường Node/Vite
└── vite.config.ts                  # Cấu hình Vite & plugin Tailwind CSS v4
```

> **Lưu ý:** Các file `.gitkeep` hiện hữu nhằm duy trì cấu trúc khung thư mục trên Git khi chưa có mã nguồn nghiệp vụ. Khi tạo các file code thực tế trong từng thư mục, file `.gitkeep` tương ứng có thể được xóa hoặc giữ lại mà không ảnh hưởng.

---

## 2. Trách nhiệm của từng thư mục

### 2.1. Thư mục `src/app/`
- **Mục đích:** Đóng vai trò hạt nhân khởi tạo ứng dụng.
- **Nội dung đặt tại đây:**
  - `App.tsx`: Thành phần gốc render bố cục chính và gắn kết Router.
  - Các cấu hình Global State / Context Providers (nếu có sau này, ví dụ `AuthProvider`, `ThemeProvider`).
  - Định nghĩa tuyến đường trung tâm (Router setup).

### 2.2. Thư mục `src/pages/`
- **Mục đích:** Đại diện cho các **màn hình hoàn chỉnh** được gắn với từng URL Route cụ thể (Page-Based Routing).
- **Nội dung đặt tại đây:**
  - Các components trang (ví dụ `HomePage.tsx`, `RoomDetailPage.tsx`, `ContractListPage.tsx`).
  - Trang chỉ làm nhiệm vụ: nhận tham số từ URL (params, query string), bố cục các features tương ứng lên màn hình, và điều hướng.
  - **Không** viết logic tính toán nghiệp vụ hay xử lý dữ liệu phức tạp tại `pages/`.

### 2.3. Thư mục `src/features/` (Trọng tâm nghiệp vụ)
- **Mục đích:** Đóng gói mã nguồn theo từng **miền nghiệp vụ (Feature Domain)** độc lập.
- **Cấu trúc dự kiến của một feature khi phát triển:**
  Mỗi feature (ví dụ `rooms`, `contracts`, `invoices`, `roommates`...) sẽ tự chứa các thành phần nội bộ của nó:
  ```
  src/features/rooms/
  ├── components/          # Component riêng của feature (ví dụ RoomCard.tsx, RoomFilter.tsx)
  ├── hooks/               # Hook riêng của feature (ví dụ useRoomSearch.ts)
  ├── services/            # Xử lý gọi API hoặc mock data riêng (ví dụ roomApi.ts, roomMockData.ts)
  └── types/               # Kiểu dữ liệu đặc thù của feature (ví dụ room.types.ts)
  ```

### 2.4. Thư mục `src/components/`
- **Mục đích:** Chứa các **thành phần giao diện tái sử dụng (Shared UI Components)** dùng chung cho nhiều tính năng khác nhau.
- **Nội dung đặt tại đây:**
  - Các thành phần nguyên tử (Atoms/Molecules): `Button.tsx`, `Input.tsx`, `Modal.tsx`, `Badge.tsx`, `Select.tsx`, `Pagination.tsx`.
  - Các thành phần bố cục chung (Layout Components): `Navbar.tsx`, `Sidebar.tsx`, `Footer.tsx`.
  - Thành phần trong thư mục này phải độc lập với nghiệp vụ (không phụ thuộc vào dữ liệu của riêng phòng trọ hay hợp đồng).

### 2.5. Thư mục `src/hooks/`
- **Mục đích:** Chứa các **Custom Hooks dùng chung** cho toàn bộ ứng dụng, không gắn liền với một nghiệp vụ cụ thể.
- **Ví dụ:** `useDebounce.ts`, `useMediaQuery.ts`, `useLocalStorage.ts`, `useClickOutside.ts`.

### 2.6. Thư mục `src/lib/`
- **Mục đích:** Chứa các tiện ích hỗ trợ kỹ thuật và cấu hình thư viện bên thứ ba.
- **Nội dung đặt tại đây:**
  - `apiClient.ts`: Cấu hình fetch / axios instance chung (base URL, interceptor chèn token).
  - `utils.ts`: Các hàm tiện ích thuần túy (format số tiền VND, format ngày tháng, ghép chuỗi className).

### 2.7. Thư mục `src/types/`
- **Mục đích:** Chứa các định nghĩa kiểu TypeScript dùng chung toàn hệ thống.
- **Ví dụ:**
  - `api.types.ts`: Cấu trúc chuẩn của phản hồi API (`ApiResponse<T>`, `PaginationMeta`).
  - `user.types.ts`: Thông tin định danh người dùng cơ bản phục vụ toàn app.

### 2.8. Thư mục `src/styles/`
- **Mục đích:** Điểm nhập và cấu hình CSS toàn cục.
- **Hiện tại:** [src/styles/index.css](../src/styles/index.css) chứa chỉ thị `@import "tailwindcss";` cho Tailwind CSS v4.

### 2.9. Thư mục `src/assets/` và `public/`
- **`src/assets/`:** Chứa hình ảnh, icons, logo được import trực tiếp trong code React để Vite tối ưu hóa, băm tên file và đóng gói (bundle).
- **`public/`:** Chứa các tệp tĩnh nguyên bản được phục vụ trực tiếp tại root URL (ví dụ `favicon.ico`, `robots.txt`).

---

## 3. Quy tắc phân định: Đặt Component ở đâu?

Để tránh việc gom quá nhiều components vào thư mục chung hoặc ngược lại, hãy áp dụng quy tắc 2 bước sau:

1. **Component có gắn liền với dữ liệu nghiệp vụ cụ thể không?**
   - **CÓ** (ví dụ hiển thị phòng trọ `RoomCard`, danh sách hóa đơn `InvoiceTable`, form báo sự cố `TicketForm`):
     ➔ Đặt trong `src/features/<tên_nghiệp_vụ>/components/`.
2. **Component có tái sử dụng ở 2 features khác nhau trở lên không?**
   - **CÓ** (ví dụ nút bấm `Button`, ô nhập liệu `InputField`, hộp thoại xác nhận `ConfirmDialog`, thanh thông báo `Toast`):
     ➔ Đặt trong `src/components/`.

---

## 4. Hướng dẫn bổ sung một Feature mới

Khi được phân công triển khai một Use Case hoặc một phân hệ mới (ví dụ phân hệ xem phòng: `viewing`):

1. Tạo thư mục mới tại `src/features/viewing/`.
2. Định nghĩa các kiểu dữ liệu liên quan tại `src/features/viewing/types/viewing.types.ts`.
3. Xây dựng dịch vụ gọi API hoặc mock data tại `src/features/viewing/services/viewingApi.ts`.
4. Xây dựng các components giao diện nội bộ tại `src/features/viewing/components/`.
5. Tạo trang tương ứng tại `src/pages/ViewingSchedulePage.tsx` để gom các components của feature lại.
6. Đăng ký tuyến đường (route) vào `src/app/App.tsx`.

---

## 5. Quy tắc Import & Tránh phụ thuộc vòng (Circular Dependencies)

Để giữ mã nguồn ổn định, sạch sẽ và tránh lỗi biên dịch của Vite/TypeScript:

1. **Chiều phụ thuộc một chiều (Strict Top-Down Dependency Flow):**
   ```
   src/app/
      │
      ▼
   src/pages/
      │
      ▼
   src/features/
      │
      ▼
   src/components/ ──► src/hooks/ ──► src/lib/ ──► src/types/
   ```
   - `pages` được phép import từ `features`, `components`, `hooks`, `lib`, `types`.
   - `features` được phép import từ `components`, `hooks`, `lib`, `types`.
   - `components`, `hooks`, `lib` **tuyệt đối không được import ngược lại từ `pages` hoặc `features`**.
2. **Không import chéo trực tiếp giữa các Features:**
   - Feature A **không** import trực tiếp components nội bộ của Feature B.
   - Nếu hai feature cần chia sẻ dữ liệu hoặc component, hãy trích xuất component đó ra thư mục dùng chung `src/components/`, hoặc định nghĩa kiểu dữ liệu chung tại `src/types/`.
