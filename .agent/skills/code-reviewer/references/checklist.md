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

## 🛡️ KIẾN TRÚC, API, ROUTING & CHẤT LƯỢNG CODE (ÁP DỤNG MỌI FEATURE)

- **Phụ thuộc một chiều:** `layouts/`, `components/`, `lib/`, `utils/`, `types/`, `api/` không bao giờ import từ `features/` hay `pages/`. Logic dùng chung phải đặt trong `src/utils/`.
- **API & Mock Safety:** Dùng hằng số trong `src/api/endpoints.ts`. Tách mock sang file riêng; fallback mock chỉ chạy khi `import.meta.env.DEV === true`, không nuốt lỗi `4xx` và không che giấu lỗi raw. Cẩn trọng khi `invalidateQueries` sau `setQueryData` với query có thể trả `null` offline.
- **Router, RBAC & Lazy Loading:** Route động phải đọc `useParams()`. Route cá nhân/quản trị phải bọc `ProtectedRoutes` / `AdminRoutes`. Page dùng `React.lazy()` + `Suspense` không được re-export qua barrel `src/pages/index.ts`.
- **UI, A11y & Clean Code:** Dùng semantic tokens & shared UI atoms (không hardcode hex, không emoji làm icon, không `window.alert()`). Không đặt `tabIndex={-1}` lên nút tương tác; input lỗi phải có `aria-invalid` + `aria-describedby`. Tách component gọn, dùng chung validator trong `src/utils/`, và reset state cũ khi dữ liệu mới không hợp lệ.

---

## 📋 PRE-OUTPUT CHECKLIST (KIỂM TRA TRƯỚC KHI XUẤT CODE)

- [ ] File mới có nằm đúng vị trí trong cây thư mục và tuân thủ phụ thuộc một chiều (không import ngược từ `features/`/`pages/`) không?
- [ ] Đã import đúng path alias `@/...` và đúng 5 nhóm import chưa?
- [ ] Có bị lỗi thiếu Type hoặc dính `any` không?
- [ ] Có khai báo interface/type inline trong file `.tsx` không? (Bắt buộc phải tách ra thư mục `types/`).
- [ ] Endpoint đã đặt trong `src/api/endpoints.ts`, mock đã tách file riêng và được guard bằng `import.meta.env.DEV` chưa?
- [ ] Route động có đọc `useParams()`, route bảo mật đã bọc `ProtectedRoutes`/`AdminRoutes`, và lazy page đã bỏ khỏi `src/pages/index.ts` chưa?
- [ ] UI đã dùng semantic tokens, shared UI atoms, đạt chuẩn A11y (không `tabIndex={-1}`, có `aria-invalid`/`aria-describedby`), và không lặp logic validate chưa?
- [ ] Giao diện có đủ các trạng thái: Loading (Skeleton/Spinner), Empty (EmptyState), và Error không?
- [ ] Nút bấm submit có hiển thị loading state (`disabled` + icon quay) khi `isPending` không?
- [ ] Có hiển thị Toast / feedback rõ ràng sau khi Mutation thành công hoặc thất bại không?
