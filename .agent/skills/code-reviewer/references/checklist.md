# RENTMATE CODE REVIEW CHECKLIST & STANDARDS

Tài liệu tham khảo chuyên biệt cho việc rà soát mã nguồn (Code Review) dự án RentMate.

---

## ⚠️ 7 ĐIỀU LUẬT BẮT BUỘC (STRICT LAWS)

1. **Tuyệt đối không dùng `any`:**
   - 100% biến, tham số, dữ liệu trả về phải có type/interface rõ ràng.
   - Dùng `unknown` kèm Type Narrowing / Type Guard khi chưa xác định kiểu.
2. **Quy tắc Server State vs Client State:**
   - Server State (bài đăng, đề xuất đổi đồ, danh sách đánh giá, profile) PHẢI fetch qua Custom Hook bọc TanStack Query (`useQuery`, `useMutation`).
   - CẤM lưu trữ danh sách bài viết hoặc kết quả API vào `useState` trong component cha rồi truyền props lòng vòng.
3. **Cấu trúc Feature-First (Tính năng đóng gói):**
   - Mọi feature nằm trong `src/features/<feature_name>/` (`api/`, `hooks/`, `components/`, `pages/`, `types/`).
4. **Query Key Factory Pattern:**
   - 100% Query Keys phải được định nghĩa tập trung trong `<feature>Keys.ts`. Không viết hardcode string array trực tiếp trong hook.
5. **Quy chuẩn Form & Validation:**
   - Email sinh viên phải validate có đuôi `.edu.vn`.
   - Bài đăng: nếu loại tin là `GIVE_AWAY` (Tặng) thì giá tiền luôn là `0`. Nếu là `EXCHANGE` (Đổi) thì bắt buộc có trường `targetExchangeItem`.
6. **Không hardcode chuỗi hằng số:**
   - Sử dụng các file trong `src/constants/` (`routes.ts`, `post.ts`, `offer.ts`, `roles.ts`, `storage.ts`).
7. **Phong cách Centralized Types (Đặc tả kiểu tập trung — Chuẩn RentMate):**
   - TUYỆT ĐỐI CẤM: Không khai báo `interface` hoặc `type` (kể cả Component Props `[ComponentName]Props`) trực tiếp bên trong các file giao diện (`.tsx`).
   - BẮT BUỘC: 100% Component Props, Data Models, DTOs, Payload phải được định nghĩa tập trung trong thư mục `types/`:
     - UI Dùng chung (`src/components/ui/`, `src/components/feedback/`, `src/components/form/`): Khai báo trong `src/types/` và re-export tại `src/types/index.ts`.
     - Feature Components (`src/features/<feature>/components/`): Khai báo trong `src/features/<feature>/types/` và re-export tại `src/features/<feature>/types/index.ts`.

---

## 📋 PRE-OUTPUT CHECKLIST (KIỂM TRA TRƯỚC KHI XUẤT CODE)

- [ ] File mới có nằm đúng vị trí trong cây thư mục dự án RentMate đã định nghĩa không?
- [ ] Đã import đúng path alias `@/...` thay vì relative path dài dòng `../../..` chưa?
- [ ] Có bị lỗi thiếu Type hoặc dính `any` không?
- [ ] Có khai báo interface/type inline trong file `.tsx` không? (Bắt buộc phải tách ra thư mục `types/`).
- [ ] Giao diện có đủ các trạng thái: Loading (Skeleton/Spinner), Empty (EmptyState), và Error không?
- [ ] Nút bấm submit có hiển thị loading state (`disabled` + icon quay) khi `isPending` không?
- [ ] Có hiển thị Toast feedback sau khi Mutation thành công hoặc thất bại không?
