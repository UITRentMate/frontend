---
name: unipass-frontend
description: "Kỹ năng phát triển Frontend toàn diện cho dự án RentMate: kiến trúc 5 tầng, Feature-First, Centralized Types, TanStack Query v5, và Barter Pipeline."
---

# Kỹ Năng Phát Triển Frontend RentMate (unipass-frontend)

Kỹ năng này định hướng và hướng dẫn AI Agent / Developer triển khai các tính năng giao diện, quản lý state và luồng nghiệp vụ cho nền tảng **RentMate** theo đúng chuẩn thiết kế kiến trúc.

## Khi Nào Kích Hoạt (When to Activate)
- Triển khai tính năng mới trong `src/features/<feature>/` hoặc trang mới trong `src/pages/<PageName>/`.
- Tạo hoặc chỉnh sửa các component giao diện React (`.tsx`).
- Tích hợp luồng nghiệp vụ trao đổi đồ ngang (Barter Pipeline), quản lý bài đăng, trang cá nhân hoặc khu vực quản trị (Admin).
- Tái cấu trúc (refactor) mã nguồn theo quy chuẩn Centralized Types và Feature-First.

## Kiến Trúc Phân Tầng (5-Layer Architecture)
Mọi thay đổi mã nguồn phải tuân thủ phân lớp:
1. **Presentation Layer (`src/components/`, `src/layouts/`, `src/features/<feat>/components/`):** Chỉ chịu trách nhiệm hiển thị và nhận sự kiện người dùng.
2. **Page Layer (`src/pages/<PageName>/`):** Thin Page Assembler 1:1 với URL Route, chỉ nhận params, gọi custom hooks và ghép các component lại.
3. **State & Logic Layer (`src/features/<feat>/hooks/`):** Đóng gói toàn bộ TanStack Query (`useQuery`, `useMutation`), Query Key Factory và business logic.
4. **Data Access Layer (`src/api/`, `src/features/<feat>/api/`):** Gọi HTTP thông qua `axiosClient`, chuẩn hóa DTOs và API response contracts.
5. **Types Layer (`src/types/`, `src/features/<feat>/types/`):** Centralized Types 100%, tuyệt đối không khai báo interface/type inline trong `.tsx`.

## Quy Trình Xây Dựng Feature Mới (Workflow)
Khi người dùng yêu cầu làm tính năng mới `<feature>`:
1. **Bước 1 — Định nghĩa Types (`src/features/<feature>/types/`):**
   - Tạo file model/DTO (VD: `<feature>.ts`) và component props (VD: `<feature>Components.ts`).
   - Barrel export tại `src/features/<feature>/types/index.ts`.
2. **Bước 2 — Định nghĩa API Endpoints & Client (`src/features/<feature>/api/`):**
   - Khai báo endpoint trong `src/api/endpoints.ts`.
   - Tạo hàm gọi API trong `src/features/<feature>/api/<feature>Api.ts`.
3. **Bước 3 — Tạo Query Key Factory & Hooks (`src/features/<feature>/hooks/`):**
   - Tạo `<feature>Keys.ts` chứa key hierarchy.
   - Viết các hooks `use<Feature>.ts` bọc `useQuery` hoặc `useMutation`.
4. **Bước 4 — Xây dựng Feature Components (`src/features/<feature>/components/`):**
   - Viết UI components, import props từ `../types`.
   - Đảm bảo đủ 3 trạng thái: Loading (Skeleton/Spinner), EmptyState, và Error.
5. **Bước 5 — Lắp ráp Page (`src/pages/<PageName>/index.tsx`):**
   - Ghép các components và kết nối Router trong `src/routes/AppRoutes.tsx`.

## Tài Liệu Tham Khảo (References)
- [Kiến trúc hệ thống](references/architecture.md)
- [Cấu trúc thư mục chi tiết](references/folder_structure.md)
- [Bộ Prompt mẫu theo từng giai đoạn](references/prompt_guide.md)
- [Thiết kế hệ thống RentMate](references/system_design.md)

## Công Cụ Kiểm Tra (Scripts)
- `node .agent/skills/unipass-frontend/scripts/validate_centralized_types.js` để kiểm tra vi phạm inline interface/type.
