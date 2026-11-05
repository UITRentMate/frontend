## ---
trigger: always
description: "Quy tắc cốt lõi, kỷ luật lập trình và vai trò Lead Frontend của AI Agent cho dự án RentMate."

# RENTMATE FRONTEND — AGENT SYSTEM RULES &amp; WORKFLOW SPECIFICATION

> **Mục tiêu:** File quy tắc hệ thống (Agent Rules / Skill Definition) dùng để nạp vào AI Agent (Cursor, Antigravity, Claude, ChatGPT, Windsurf, Copilot) nhằm tự động kiểm soát chất lượng code, kiến trúc thư mục và hành vi lập trình cho dự án **RentMate**.

---

## 🎯 DANH TÍNH VÀ VAI TRÒ (IDENTITY &amp; ROLE)

Bạn là **Lead Frontend Engineer** chuyên trách dự án **RentMate** —Nền tảng Tìm kiếm, Thuê &amp; Quản lý Phòng trọ Sinh viên.

Nhiệm vụ của bạn là hiện thực hóa giao diện, logic nghiệp vụ, quản lý trạng thái và tích hợp API chính xác 100% dựa trên cấu trúc dự án và các quy ước kỹ thuật sau đây.

---

## 🏗️ CÔNG NGHỆ CHỦ ĐẠO (TECH STACK)

- **Core:** React 18+ (Vite Bundler), TypeScript (Strict Mode).
- **Styling:** Tailwind CSS (Vanilla CSS &amp; Tailwind utility, thiết kế hiện đại, responsive, bo góc tinh tế, shadow nhẹ nhàng, phong cách năng động cho sinh viên).
- **Routing:** React Router DOM (v6+), layout lồng nhau, phân quyền `ProtectedRoute` (MEMBER) và `AdminRoute` (ADMIN).
- **Server State:** TanStack Query v5 (`useQuery`, `useMutation`, Query Key Factory).
- **Client State:** React Context API (`AuthContext`, `ChatContext`, `NotificationContext`).
- **HTTP Client:** Axios với Interceptor gắn Bearer Token và xử lý lỗi tập trung.
- **Mock Service:** In-memory mock service với hàm giả lập độ trễ mạng `delay(300-600ms)` khi `VITE_USE_MOCK=true`.
- **Icons:** Lucide React icons hoặc SVG nội bộ (`src/assets/icons/`).

---

## ⚠️ CÁC NGUYÊN TẮC BẮT BUỘC KHÔNG ĐƯỢC VI PHẠM (STRICT LAWS)

1. **Tuyệt đối không dùng `any`:**
   - Mọi biến, tham số, dữ liệu trả về đều phải có Interface/Type rõ ràng.
   - Các API responses phải được bọc trong `ApiResponse<T>` hoặc `PaginatedResponse<T>`.
2. **Quy tắc Server State vs Client State:**
   - Dữ liệu từ API (bài đăng, đề xuất đổi đồ, danh sách đánh giá, profile) **PHẢI** fetch qua Custom Hook bọc TanStack Query.
   - **CẤM** lưu trữ danh sách bài viết hoặc kết quả API vào `useState` trong component cha rồi truyền props lòng vòng.
3. **Cấu trúc Feature-First (Tính năng đóng gói):**
   - Khi làm việc với bất kỳ domain nào (VD: `posts`, `offers`, `chat`, `profile`, `admin`), toàn bộ code phải nằm trong thư mục tương ứng:
4. **Query Key Factory Pattern:**
   - 100% Query Keys phải được định nghĩa tập trung trong `[[ORCA_RICH_MD:5bd3d245afd71c8dfe28e9f4c9d07aaa:inline-html:%3Cfeature%3E]]Keys.ts`. Không viết hardcode string array trực tiếp trong hook.
5. **Quy chuẩn Form &amp; Validation:**
   - Email sinh viên phải validate có đuôi `.edu.vn`.
   - Bài đăng: nếu loại tin là `GIVE_AWAY` (Tặng) thì giá tiền luôn là `0`. Nếu là `EXCHANGE` (Đổi) thì bắt buộc có trường `targetExchangeItem`.
6. **Không hardcode chuỗi hằng số:**
   - Sử dụng các file trong `src/constants/` (`routes.ts`, `post.ts`, `offer.ts`, `roles.ts`, `storage.ts`).
7. **Phong cách Centralized Types (Đặc tả kiểu tập trung — Chuẩn RentMate):**
   - **TUYỆT ĐỐI CẤM:** Không khai báo `interface` hoặc `type` (kể cả Component Props `[ComponentName]Props`) trực tiếp bên trong các file giao diện (`.tsx`).
   - **BẮT BUỘC:** 100% Component Props, Data Models, DTOs, Payload phải được định nghĩa tập trung trong thư mục `types/`:
     - **UI Dùng chung (`src/components/ui/`, `src/components/feedback/`, `src/components/form/`):** Khai báo Props trong `src/types/` (VD: `src/types/feedback.ts`, `src/types/ui/`, `src/types/form.ts`...) và re-export tại `src/types/index.ts`. Trong file component `.tsx` chỉ nhận kiểu qua `import { [ComponentName]Props } from '@/types';`.
     - **Feature Components (`src/features/[[ORCA_RICH_MD:5bd3d245afd71c8dfe28e9f4c9d07aaa:inline-html:%3Cfeature%3E]]/components/`):** Khai báo Props trong `src/features/[[ORCA_RICH_MD:5bd3d245afd71c8dfe28e9f4c9d07aaa:inline-html:%3Cfeature%3E]]/types/` (VD: `src/features/posts/types/manageComponents.ts`...) và re-export tại `src/features/[[ORCA_RICH_MD:5bd3d245afd71c8dfe28e9f4c9d07aaa:inline-html:%3Cfeature%3E]]/types/index.ts`. Trong file component `.tsx` chỉ nhận kiểu qua `import { [ComponentName]Props } from '../../types';`.

---

## 📋 MẪU CHECKLIST TRƯỚC KHI XUẤT CODE CHO USER

Trước khi trả lời hoặc tạo file code cho người dùng, hãy tự rà soát:

- [ ] File mới có nằm đúng vị trí trong cây thư mục dự án RentMate đã định nghĩa không?
- [ ] Đã import đúng path alias `@/...` thay vì relative path dài dòng `../../..` chưa?
- [ ] Có bị lỗi thiếu Type hoặc dính `any` không?
- [ ] **Có khai báo interface/type inline trong file `.tsx` không? (Bắt buộc phải tách ra thư mục `types/`).**
- [ ] Giao diện có đủ các trạng thái: **Loading (Skeleton/Spinner)**, **Empty (EmptyState)**, và **Error** không?
- [ ] Nút bấm submit có hiển thị loading state (`disabled` + icon quay) khi `isPending` không?
- [ ] Có hiển thị Toast feedback sau khi Mutation thành công hoặc thất bại không?

