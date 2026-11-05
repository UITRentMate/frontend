---
name: api-conventions
description: "Kỹ năng tích hợp API, Axios Client, TanStack Query v5, Query Key Factory Pattern và Mock Service cho dự án RentMate."
---

# Kỹ Năng Tích Hợp API RentMate (api-conventions)

Kỹ năng này hướng dẫn việc xây dựng, mở rộng và chuẩn hóa tầng Data Access, các hook TanStack Query và Mock Service trong dự án RentMate.

## Khi Nào Kích Hoạt (When to Activate)
- Thêm hoặc cập nhật API endpoints trong `src/api/endpoints.ts`.
- Viết API services gọi HTTP qua `axiosClient`.
- Tạo Query Key Factory trong `src/features/<feature>/hooks/<feature>Keys.ts`.
- Viết custom query hooks (`useQuery`) hoặc mutation hooks (`useMutation`) có gắn cache invalidation và toast.
- Cập nhật mock data hoặc mock service trong `src/mocks/`.

## Các Nguyên Tắc Bắt Buộc
1. **Server State vs Client State:**
   - 100% dữ liệu từ API phải qua TanStack Query.
   - Cấm lưu danh sách từ API vào `useState` cục bộ ở component cha rồi prop-drill.
2. **Query Key Factory Pattern:**
   - Cấu trúc key phải phân cấp rõ ràng:
     ```typescript
     export const postKeys = {
       all: ['posts'] as const,
       lists: () => [...postKeys.all, 'list'] as const,
       list: (filters: PostFilterParams) => [...postKeys.lists(), filters] as const,
       details: () => [...postKeys.all, 'detail'] as const,
       detail: (id: string) => [...postKeys.details(), id] as const,
     };
     ```
3. **Response Envelopes:**
   - Mọi API trả về phải tuân thủ `ApiResponse<T>` hoặc `PaginatedResponse<T>`.
4. **Mock Service Support qua Axios Adapter:**
   - Khi `VITE_USE_MOCK=true`, `mockAdapter` trong `axiosClient` tự động chặn và trả dữ liệu từ `src/mocks/mockService.ts` với delay 300-600ms giả lập mạng.
   - Cấm viết lặp `if (ENV.USE_MOCK)` trong các API services của features; 100% hàm API chỉ gọi trực tiếp qua `axiosClient`.

## Tài Liệu Tham Khảo (References)
- [Đặc tả chuẩn API & Data Fetching](references/api_conventions.md)

## Công Cụ Kiểm Tra (Scripts)
- `node .agent/skills/api-conventions/scripts/verify_query_keys.js`
