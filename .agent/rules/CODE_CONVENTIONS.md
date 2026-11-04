---
trigger: model_decision
description: "Quy chuẩn viết code: Naming conventions, import order, TypeScript strict, cấu trúc React component, Tailwind CSS."
---
# RENTMATE FRONTEND — QUY CHUẨN VIẾT CODE (CODE CONVENTIONS)
> **Hệ thống:** RentMate  
> **Tiêu chí:** Tối giản – Chuẩn mực – Nhất quán – Dễ dàng áp dụng qua Prompt cho AI & Developer.

---

## 1. QUY TẮC ĐẶT TÊN (NAMING CONVENTIONS)

| Đối tượng | Quy tắc | Ví dụ |
| :--- | :--- | :--- |
| **Component Files** | `PascalCase.tsx` | `PostCard.tsx`, `CreateOfferModal.tsx`, `Button.tsx` |
| **Hook Files** | `camelCase.ts` (tiền tố `use`) | `usePosts.ts`, `useDebounce.ts`, `useAuth.ts` |
| **API / Service Files** | `camelCase.ts` | `postApi.ts`, `offerApi.ts`, `chatService.ts` |
| **Util / Helper Files** | `camelCase.ts` | `formatCurrency.ts`, `tokenStorage.ts`, `validators.ts` |
| **Type Files** | `index.ts` hoặc `camelCase.ts`| `types/index.ts`, `types/common.ts`, `types/api.ts` |
| **Interfaces / Types** | `PascalCase` | `Post`, `CreateOfferPayload`, `ApiResponse<T>` |
| **Component Props** | `[ComponentName]Props` | `PostCardProps`, `ButtonProps` |
| **Constants / Enums** | `UPPER_SNAKE_CASE` | `STORAGE_KEYS`, `POST_TYPES`, `ENDPOINTS` |
| **Functions / Handlers** | `camelCase` (tiền tố `handle` cho sự kiện)| `handleSubmit`, `handleAcceptOffer`, `formatDate` |
| **Boolean Variables** | `camelCase` (tiền tố `is`, `has`, `should`) | `isLoading`, `isPending`, `hasError`, `canExchange` |

---

## 2. CẤU TRÚC VÀ THỨ TỰ IMPORT (IMPORT ORDER)

Tất cả các file code **phải** sắp xếp các khối import theo thứ tự sau, ngăn cách nhau bằng một dòng trống:

```typescript
// 1. Thư viện bên ngoài (React, Router, TanStack Query, Icons)
import React, { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Heart, MessageSquare, ArrowRight } from 'lucide-react';

// 2. Cấu hình, hằng số và types toàn cục (@/)
import { ROUTES } from '@/constants/routes';
import { POST_TYPE_LABELS } from '@/constants/post';
import { BaseEntity } from '@/types/common';

// 3. Components dùng chung (@/components)
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';

// 4. Feature modules khác (@/features/...)
import { useAuth } from '@/features/auth/hooks/useAuth';

// 5. Hooks, APIs, Components, Types nội bộ feature (Relative imports hoặc Alias)
import { usePostDetail } from '../hooks/usePostDetail';
import { PostGallery } from './PostGallery';
import { Post, ItemCondition } from '../types';
```

---

## 3. QUY CHUẨN TYPESCRIPT (STRICT TYPING)

1. **Tuyệt đối cấm `any`:**
   - Dữ liệu chưa xác định: Dùng `unknown` kèm Type Narrowing / Type Guard.
   - Bắt buộc khai báo kiểu dữ liệu cho tham số hàm, state và response API.

2. **Interface vs Type:**
   - Dùng `interface` cho Data Models / Entities và Component Props:
     ```typescript
     export interface PostCardProps {
       post: Post;
       onSelect?: (id: string) => void;
       className?: string;
     }
     ```
   - Dùng `type` cho Union, Primitives, Tuples hoặc Mapped Types:
     ```typescript
     export type PostType = 'GIVE_AWAY' | 'EXCHANGE' | 'SELL';
     export type PostSortOption = 'newest' | 'price_asc' | 'price_desc';
     ```

3. **Readonly Constants (`as const`):**
   ```typescript
   export const POST_STATUS = {
     AVAILABLE: 'AVAILABLE',
     NEGOTIATING: 'NEGOTIATING',
     COMPLETED: 'COMPLETED',
   } as const;

   export type PostStatus = typeof POST_STATUS[keyof typeof POST_STATUS];
   ```

4. **Phong cách Centralized Types (Đặc tả kiểu tập trung — Chuẩn RentMate):**
   - **CẤM:** Tuyệt đối không khai báo `interface` hoặc `type` trực tiếp trong file `.tsx` (kể cả `[ComponentName]Props`).
   - **BẮT BUỘC:** Đặt tất cả Props trong thư mục `types/`:
     - Global/Shared components (`components/ui`, `components/feedback`, `components/form`): Khai báo trong `src/types/` và re-export tại `src/types/index.ts`.
     - Feature components (`features/<feature>/components`): Khai báo trong `src/features/<feature>/types/` và re-export tại `src/features/<feature>/types/index.ts`.
   - File component `.tsx` chỉ import Props type: `import { PostCardProps } from '../types';`.

---

## 4. QUY CHUẨN VIẾT COMPONENT (REACT STANDARDS)

### 4.1. Thứ tự khai báo trong Component (Declaration Order)
Mọi component phải tuân thủ thứ tự bên trong từ trên xuống dưới:

```typescript
export const PostCard: React.FC<PostCardProps> = ({ post, onSelect, className = '' }) => {
  // 1. Hooks (Router, Context, TanStack Query Hooks)
  const navigate = useNavigate();
  const { user } = useAuth();
  const { mutate: toggleLike, isPending: isLiking } = useToggleLike();

  // 2. Local State
  const [isHovered, setIsHovered] = useState(false);

  // 3. Derived State & Memoization (KHÔNG lưu state dư thừa vào useState)
  const isOwner = useMemo(() => user?.id === post.author.id, [user?.id, post.author.id]);
  const formattedPrice = useMemo(() => formatCurrency(post.price), [post.price]);

  // 4. Event Handlers
  const handleClick = () => {
    onSelect ? onSelect(post.id) : navigate(ROUTES.POST_DETAIL(post.id));
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLike(post.id);
  };

  // 5. Early Return (Guard Clauses: Loading / Error / Empty)
  if (!post) return <Skeleton className="h-64 w-full rounded-xl" />;

  // 6. JSX Render chính
  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-4 transition-all hover:shadow-md ${className}`}
    >
      {/* Component Content */}
    </div>
  );
};
```

### 4.2. Nguyên tắc Xuất Component (Exports)
- **Named Export:** Dùng cho toàn bộ UI Components, Form, Hooks, Utils (`export const PostCard = ...`).
- **Default Export:** Chỉ dùng duy nhất cho các file **Page** để phục vụ `React.lazy()` chia nhỏ bundle:
  ```typescript
  // src/features/posts/pages/PostDetailPage.tsx
  const PostDetailPage: React.FC = () => { ... };
  export default PostDetailPage;
  ```

---

## 5. QUY CHUẨN TAILWIND CSS & THẨM MỸ (STYLING)

1. **Bảng màu ngữ nghĩa (Semantic Palette của RentMate):**
   - **Primary:** `emerald-600` / `teal-600` (Xanh học tập, năng động sinh viên).
   - **Accent / Barter (Đổi đồ):** `indigo-600` / `violet-600` (Sáng tạo, trao đổi).
   - **Free (Tặng 0đ):** `emerald-500` (Thân thiện, cộng đồng).
   - **Sell (Bán rẻ):** `amber-500` / `orange-500`.
   - **Neutral:** `slate-900` (Text chính), `slate-500` (Subtext), `slate-100` (Nền xám nhạt).
   - **Danger:** `rose-600` (Tố cáo, vi phạm, xóa).

2. **Thứ tự sắp xếp class Tailwind:**
   `Layout (display, position) ➡️ Spacing (margin, padding) ➡️ Sizing (w, h) ➡️ Typography (font, text) ➡️ Visuals (bg, border, rounded, shadow) ➡️ Interactions (hover, focus, transition)`.

3. **Cấm Inline Styles:**
   Không dùng `style={{ ... }}` trừ các giá trị tính toán động theo tọa độ/pixel (VD: thanh tiến trình `%`).

4. **Trạng thái Micro-interaction:**
   Mọi nút bấm và card tương tác phải có `transition-all duration-200`, `hover:scale-[1.01]`, `active:scale-[0.98]` để tạo trải nghiệm mượt mà.

---

## 6. QUY CHUẨN XỬ LÝ DỮ LIỆU & BẤT ĐỒNG BỘ (ASYNC & STATE)

1. **Nguyên tắc State tối giản (No Redundant State):**
   - **SAI:** Lưu `fullName` vào state khi đã có `firstName` và `lastName`.
   - **ĐÚNG:** `const fullName = `${firstName} ${lastName}`;`.
   - **SAI:** Lưu dữ liệu API vào cả React Query lẫn `useState`.
   - **ĐÚNG:** Trích xuất trực tiếp `const { data: posts, isPending } = usePosts(filters);`.

2. **Bắt buộc xử lý đủ 3 trạng thái giao diện:**
   Mọi màn hình gọi dữ liệu từ API đều phải hiển thị đầy đủ:
   - **Đang tải:** `<Skeleton />` hoặc `<Spinner />`.
   - **Rỗng:** `<EmptyState title="..." message="..." />`.
   - **Có dữ liệu:** Render danh sách/nội dung qua `.map()` có `key` duy nhất (`post.id`).

3. **Pure Functions trong `utils/`:**
   Hàm tiện ích phải là hàm thuần khiết (cùng input luôn trả về cùng output, không phụ thuộc biến ngoài, không gây side-effect).

---

## 7. MẪU THIẾT KẾ CLEAN CODE (DOs & DON'Ts)

| Nên làm (DOs) | Không nên làm (DON'Ts) |
| :--- | :--- |
| Dùng `early return` để code phẳng, dễ đọc | Lồng các lệnh `if/else` quá 3 tầng |
| Dùng `useMemo` / `useCallback` khi truyền vào list lớn | Dùng tràn lan `useCallback` cho sự kiện click đơn giản |
| Dùng `optional chaining` (`post?.author?.name`) | Truy cập trực tiếp dễ văng lỗi (`post.author.name`) |
| Gắn `disabled={isPending}` và loading spinner cho nút bấm | Để người dùng click nút submit liên tục nhiều lần |
| Dùng Toast để thông báo kết quả | Dùng `window.alert()` hoặc `console.log()` bỏ quên |
| Validate email sinh viên `.edu.vn` bằng regex chuẩn | Để lọt email cá nhân tùy tiện vào luồng sinh viên |

