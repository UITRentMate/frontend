---
name: code-reviewer
description: "Kỹ năng rà soát mã nguồn chuyên sâu cho dự án RentMate: kiểm tra 7 Strict Laws, Centralized Types, TanStack Query, Tailwind semantic tokens và Loading/Empty/Error UI states."
---

# Kỹ Năng Code Reviewer RentMate (code-reviewer)

Kỹ năng này chịu trách nhiệm kiểm tra, rà soát và đánh giá chất lượng mã nguồn TypeScript/React trong dự án RentMate trước khi bàn giao cho người dùng hoặc commit.

## Khi Nào Kích Hoạt (When to Activate)
- Sau khi viết hoặc chỉnh sửa bất kỳ file `.ts` / `.tsx` nào trong codebase.
- Khi người dùng yêu cầu review code, kiểm tra lỗi hoặc tối ưu hóa hiệu năng.
- Trước khi thực hiện commit mã nguồn hoặc tạo pull request.

## Quy Trình Review (Review Workflow)
1. **Kiểm tra Centralized Types:**
   - Quét file `.tsx` xem có `interface [Name]Props` hoặc `type [Name]Props` inline không. Nếu có, yêu cầu chuyển vào `types/`.
2. **Kiểm tra Strict Laws:**
   - Có dùng `any` không?
   - Có lưu Server State vào `useState` không?
   - Có hardcode string / URL không?
   - Email sinh viên có kiểm tra đuôi `.edu.vn` không?
3. **Kiểm tra UI/UX States:**
   - Component có đủ Loading state (`Skeleton` / `Spinner`), Empty state (`EmptyState`) và Error state không?
   - Nút submit có disable và icon spinner khi `isPending` không?
   - Mutation có trigger Toast thông báo kết quả không?
4. **Kiểm tra Naming & Import Order:**
   - Đặt tên file theo đúng chuẩn (`PascalCase.tsx`, `camelCase.ts`).
   - Sắp xếp import theo 5 khối quy định.

## Tài Liệu Tham Khảo (References)
- [Checklist chi tiết](references/checklist.md)
