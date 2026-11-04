---
trigger: model_decision
description: "Quy chuẩn API, Axios client, TanStack Query v5, Query Key Factory, Mock service và xử lý lỗi."
---
# RENTMATE FRONTEND — API & DATA FETCHING CONVENTIONS
> **Hệ thống:** RentMate (Nền tảng Trao đổi, Sang nhượng & Tặng đồ dùng Sinh viên)  
> **Phiên bản tài liệu:** 1.0.0  
> **Mục đích:** Quy chuẩn hóa toàn bộ tầng tích hợp API, Data Contract, TanStack Query Hooks, Mock Service và State Management giúp AI Agent & Developer triển khai code chính xác, nhất quán 100% thông qua Prompt.

---

## 1. NGUYÊN TẮC CỐT LÕI (CORE PRINCIPLES)

1. **Phân biệt rõ Client State vs Server State:**
   - **Server State** (Dữ liệu từ API: danh sách bài đăng, chi tiết món đồ, danh sách đề xuất đổi, thông báo...): **BẮT BUỘC** quản lý bằng **TanStack Query (React Query)** (`useQuery`, `useMutation`). KHÔNG lưu Server State vào Context API hoặc `useState` toàn cục.
   - **Client State** (Phiên đăng nhập người dùng, theme, bộ lọc UI tạm thời, trạng thái đóng mở modal): Quản lý qua `Context API` (`AuthContext`, `ChatContext`) hoặc `useState`/`useReducer` cục bộ.
2. **Kiến trúc phân tầng chặt chẽ (Separation of Concerns):**
   - `src/api/endpoints.ts`: Lưu trữ toàn bộ hằng số URL endpoint, tuyệt đối không hardcode URL trong component.
   - `src/api/axiosClient.ts`: Cấu hình Base URL, timeout, request/response interceptors, xử lý gắn JWT Token và bắt lỗi tập trung.
   - `src/features/<feature>/types/index.ts`: Định nghĩa Type/Interface cho Request payload, Response data, Entity model.
   - `src/features/<feature>/api/<feature>Api.ts`: Hàm gọi API thuần túy (Pure functions nhận params/body và trả về `Promise<ApiResponse<T>>`).
   - `src/features/<feature>/hooks/use<Feature>.ts`: Custom hook đóng gói `useQuery` / `useMutation` kết hợp cache invalidation, toast notification và optimistic update.
   - `src/features/<feature>/components/*`: UI Component chỉ gọi Custom Hook, tuyệt đối KHÔNG gọi trực tiếp `axiosClient` hay `fetch`.
3. **TypeScript Strict Mode:**
   - 100% hàm, params, response phải có kiểu tường minh. Cấm sử dụng `any`. Nếu chưa xác định dùng `unknown` kèm Type Guard.
4. **Mock First Development:**
   - Hỗ trợ cờ bật/tắt Mock API (`VITE_USE_MOCK=true`) kèm độ trễ giả lập (Simulate Delay 300 - 800ms) để giao diện có trải nghiệm như backend thật (loading skeleton, empty state, error toast).

---

## 2. CHUẨN ĐỊNH DẠNG RESPONSE & ERROR CONTRACT

Mọi API từ Backend (hoặc Mock Service) của RentMate đều phải tuân thủ chuẩn cấu trúc bọc dữ liệu sau:

### 2.1. Chuẩn dữ liệu thành công (`ApiResponse<T>`)
```typescript
// src/types/api.ts

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

export interface PaginatedMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  meta: PaginatedMeta;
  timestamp: string;
}
```

### 2.2. Chuẩn dữ liệu lỗi (`ApiErrorResponse`)
```typescript
// src/types/api.ts

export interface ApiErrorDetail {
  field?: string;
  message: string;
}

export interface ApiErrorResponse {
  success: false;
  statusCode: number;
  errorCode: string; // VD: 'AUTH_TOKEN_EXPIRED', 'POST_ALREADY_RESERVED'
  message: string;
  errors?: ApiErrorDetail[];
  timestamp: string;
}
```

---

## 3. CẤU HÌNH HTTP CLIENT (`axiosClient.ts` & `src/api/interceptors/`)

### 3.1. Quy tắc cấu hình
- Tự động đính kèm `Bearer <token>` từ `tokenStorage` vào Request Header (`Authorization`) qua `requestAuth.ts`.
- Tự động bắt lỗi `401 Unauthorized` để thực hiện **Silent Refresh Token** và giải phóng hàng đợi request (`failedQueue`) qua `refreshTokenHandler.ts`, chống redirect giật lặp.
- Tự động unwrap dữ liệu `response.data` và chuẩn hóa lỗi qua `responseNormalize.ts` về `ApiErrorResponse`.
- Tự động chặn và trả dữ liệu mock qua `mockAdapter.ts` khi `VITE_USE_MOCK=true`. Các API Service trong features **tuyệt đối không viết lặp `if (ENV.USE_MOCK)`**.

```typescript
// src/api/axiosClient.ts
import axios, { AxiosError } from 'axios';
import { ENV } from '@/configs/env';
import { ApiErrorResponse } from '@/types/api';
import {
  requestAuthInterceptor,
  handleTokenRefresh,
  normalizeApiError,
  createMockAdapter,
} from './interceptors';

export const axiosClient = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
  adapter: ENV.USE_MOCK ? createMockAdapter() : undefined,
});

// Request Interceptor: Gắn Access Token
axiosClient.interceptors.request.use(
  requestAuthInterceptor,
  (error) => Promise.reject(error)
);

// Response Interceptor: Chuẩn hóa phản hồi & Xử lý lỗi toàn cục
axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error: AxiosError<ApiErrorResponse>) => {
    // 1. Silent refresh token khi gặp 401
    if (error.response?.status === 401) {
      try {
        return await handleTokenRefresh(error, (config) => axiosClient(config));
      } catch (refreshError) {
        const normalized = normalizeApiError(refreshError as AxiosError<ApiErrorResponse>);
        return Promise.reject(normalized);
      }
    }

    // 2. Chuẩn hóa lỗi đồng nhất
    const normalizedError = normalizeApiError(error);
    return Promise.reject(normalizedError);
  }
);
  }
);
```

---

## 4. QUẢN LÝ ENDPOINTS TẬP TRUNG (`endpoints.ts`)

Quy tắc đặt tên: Nhóm theo domain nghiệp vụ dạng object lồng nhau. Sử dụng template function cho các dynamic params (VD: `:id`).

```typescript
// src/api/endpoints.ts
export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    VERIFY_STUDENT_EMAIL: '/auth/verify-student-email',
    REFRESH_TOKEN: '/auth/refresh-token',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    ME: '/auth/me',
  },
  POSTS: {
    LIST: '/posts',
    DETAIL: (id: string | number) => `/posts/${id}`,
    CREATE: '/posts',
    UPDATE: (id: string | number) => `/posts/${id}`,
    DELETE: (id: string | number) => `/posts/${id}`,
    UPLOAD_IMAGES: '/posts/upload-images',
    MY_POSTS: '/posts/my-posts',
    FEATURED: '/posts/featured',
  },
  OFFERS: {
    LIST_RECEIVED: '/offers/received',
    LIST_SENT: '/offers/sent',
    CREATE: '/offers',
    ACCEPT: (id: string | number) => `/offers/${id}/accept`,
    REJECT: (id: string | number) => `/offers/${id}/reject`,
    CANCEL: (id: string | number) => `/offers/${id}/cancel`,
    DETAIL: (id: string | number) => `/offers/${id}`,
  },
  REVIEWS: {
    CREATE: '/reviews',
    USER_REVIEWS: (userId: string | number) => `/reviews/user/${userId}`,
    REPUTATION: (userId: string | number) => `/reviews/reputation/${userId}`,
  },
  REPORTS: {
    CREATE: '/reports',
  },
  PROFILE: {
    GET_ME: '/profile/me',
    UPDATE_ME: '/profile/me',
    PUBLIC_PROFILE: (userId: string | number) => `/profile/${userId}`,
    MY_INVENTORY: '/profile/inventory',
    TRANSACTION_HISTORY: '/profile/transactions',
  },
  ADMIN: {
    STATS: '/admin/dashboard/stats',
    PENDING_POSTS: '/admin/posts/pending',
    APPROVE_POST: (id: string | number) => `/admin/posts/${id}/approve`,
    REJECT_POST: (id: string | number) => `/admin/posts/${id}/reject`,
    REPORTS: '/admin/reports',
    RESOLVE_REPORT: (id: string | number) => `/admin/reports/${id}/resolve`,
    USERS: '/admin/users',
    LOCK_USER: (id: string | number) => `/admin/users/${id}/lock`,
    UNLOCK_USER: (id: string | number) => `/admin/users/${id}/unlock`,
    CATEGORIES: '/admin/categories',
  },
} as const;
```

---

## 5. QUERY KEYS FACTORY CONVENTION (TANSTACK QUERY)

Để tránh lỗi stale cache hoặc invalidate nhầm giữa các trang, **100% Query Keys phải được định nghĩa bằng Query Key Factory Pattern**.

```typescript
// src/features/posts/hooks/postKeys.ts
import { PostFilterParams } from '../types';

export const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: (filters: PostFilterParams) => [...postKeys.lists(), filters] as const,
  details: () => [...postKeys.all, 'detail'] as const,
  detail: (id: string | number) => [...postKeys.details(), id] as const,
  myPosts: () => [...postKeys.all, 'my-posts'] as const,
  featured: () => [...postKeys.all, 'featured'] as const,
};
```

```typescript
// src/features/offers/hooks/offerKeys.ts
export const offerKeys = {
  all: ['offers'] as const,
  received: () => [...offerKeys.all, 'received'] as const,
  sent: () => [...offerKeys.all, 'sent'] as const,
  detail: (id: string | number) => [...offerKeys.all, 'detail', id] as const,
};
```

---

## 6. QUY TẮC VIẾT API FUNCTION & TANSTACK QUERY HOOKS

### 6.1. Tầng API Service (`postApi.ts`)
- Hàm chỉ nhận typed arguments.
- Gọi `axiosClient` hoặc bọc qua Mock Service nếu cờ `VITE_USE_MOCK=true`.
- Trả về Promise có kiểu `ApiResponse<T>` hoặc `PaginatedResponse<T>`.
- **CẤM** viết lặp `if (ENV.USE_MOCK)`: Tầng `mockAdapter` trong `axiosClient` đã tự động xử lý. Mọi method API chỉ gọi trực tiếp `axiosClient`.

```typescript
// src/features/posts/api/postApi.ts
import { axiosClient } from '@/api/axiosClient';
import { ENDPOINTS } from '@/api/endpoints';
import { ApiResponse, PaginatedResponse } from '@/types/api';
import { Post, PostFilterParams, CreatePostDTO, UpdatePostDTO } from '../types';

export const postApi = {
  getPosts: (params?: PostFilterParams): Promise<PaginatedResponse<Post>> => {
    return axiosClient.get(ENDPOINTS.POSTS.LIST, { params });
  },

  getPostById: (id: string | number): Promise<ApiResponse<Post>> => {
    return axiosClient.get(ENDPOINTS.POSTS.DETAIL(id));
  },

  createPost: (payload: CreatePostDTO): Promise<ApiResponse<Post>> => {
    return axiosClient.post(ENDPOINTS.POSTS.CREATE, payload);
  },

  updatePost: (id: string | number, payload: UpdatePostDTO): Promise<ApiResponse<Post>> => {
    return axiosClient.patch(ENDPOINTS.POSTS.UPDATE(id), payload);
  },
};
```
    }
    return axiosClient.put(ENDPOINTS.POSTS.UPDATE(id), payload);
  },

  deletePost: async (id: string | number): Promise<ApiResponse<null>> => {
    if (ENV.USE_MOCK) {
      return mockPostService.deletePost(id);
    }
    return axiosClient.delete(ENDPOINTS.POSTS.DELETE(id));
  },
};
```

---

### 6.2. Tầng Query Hooks (`usePosts.ts`, `usePostDetail.ts`)
- Đặt `staleTime` hợp lý (thường là 2-5 phút cho danh sách đồ dùng, 30 giây cho offer/chat).
- Truy xuất trực tiếp dữ liệu gọn gàng qua `select` (nếu cần unwrap).

```typescript
// src/features/posts/hooks/usePosts.ts
import { useQuery } from '@tanstack/react-query';
import { postApi } from '../api/postApi';
import { postKeys } from './postKeys';
import { PostFilterParams } from '../types';

export const usePosts = (filters: PostFilterParams) => {
  return useQuery({
    queryKey: postKeys.list(filters),
    queryFn: () => postApi.getPosts(filters),
    staleTime: 1000 * 60 * 3, // 3 phút
    placeholderData: (previousData) => previousData, // Giữ data cũ khi chuyển page/filter tránh nhấp nháy
  });
};
```

```typescript
// src/features/posts/hooks/usePostDetail.ts
import { useQuery } from '@tanstack/react-query';
import { postApi } from '../api/postApi';
import { postKeys } from './postKeys';

export const usePostDetail = (id?: string | number) => {
  return useQuery({
    queryKey: postKeys.detail(id || ''),
    queryFn: () => postApi.getPostById(id!),
    enabled: Boolean(id), // Chỉ fetch khi id tồn tại
    staleTime: 1000 * 60 * 5,
  });
};
```

---

### 6.3. Tầng Mutation Hooks (`useCreatePost.ts`)
- Quản lý `isPending` cho nút Submit.
- Hiển thị Toast thông báo thành công hoặc lỗi.
- Tự động invalidate các query keys liên quan (`postKeys.lists()`, `postKeys.myPosts()`).

```typescript
// src/features/posts/hooks/useCreatePost.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postApi } from '../api/postApi';
import { postKeys } from './postKeys';
import { CreatePostDTO } from '../types';
import { useToast } from '@/components/feedback/Toast';

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: (payload: CreatePostDTO) => postApi.createPost(payload),
    onSuccess: (response) => {
      // Invalidate toàn bộ danh sách post để lấy bài vừa tạo
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
      queryClient.invalidateQueries({ queryKey: postKeys.myPosts() });
      showToast({
        type: 'success',
        message: response.message || 'Đăng tin thành công! Tin của bạn đang chờ duyệt.',
      });
    },
    onError: (error: any) => {
      showToast({
        type: 'error',
        message: error.message || 'Không thể đăng tin. Vui lòng kiểm tra lại!',
      });
    },
  });
};
```

---

## 7. QUY CHUẨN MOCK DATA VÀ MOCK SERVICE

Để team Frontend có thể chạy độc lập không phụ thuộc Backend:
1. `src/mocks/mockService.ts` cung cấp hàm giả lập độ trễ mạng `delay(ms)` và bọc phản hồi thành `ApiResponse<T>`.
2. Hỗ trợ thao tác CRUD trên Mock in-memory để kiểm thử tương tác (tạo bài đăng xong thì danh sách tự hiển thị bài mới).

```typescript
// src/mocks/mockService.ts
import { ApiResponse, PaginatedResponse } from '@/types/api';

export const delay = (ms = 400): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const createMockSuccessResponse = <T>(data: T, message = 'Thành công'): ApiResponse<T> => ({
  success: true,
  message,
  data,
  timestamp: new Date().toISOString(),
});

export const createMockPaginatedResponse = <T>(
  data: T[],
  page = 1,
  limit = 10,
  message = 'Thành công'
): PaginatedResponse<T> => {
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / limit) || 1;
  const startIndex = (page - 1) * limit;
  const paginatedData = data.slice(startIndex, startIndex + limit);

  return {
    success: true,
    message,
    data: paginatedData,
    meta: {
      page,
      limit,
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
    timestamp: new Date().toISOString(),
  };
};
```

---

## 8. QUY CHUẨN BUSINESS TYPES VÀ DTO (RENTMATE DOMAIN)

Tất cả các Types phải bám sát nghiệp vụ trao đổi sinh viên của RentMate:

### 8.1. Post Types (`src/features/posts/types/index.ts`)
```typescript
import { BaseEntity } from '@/types/common';
import { UserSummary } from '@/features/auth/types';

export type PostType = 'GIVE_AWAY' | 'EXCHANGE' | 'SELL'; // Tặng 0đ, Trao đổi ngang, Bán rẻ
export type PostStatus = 'AVAILABLE' | 'NEGOTIATING' | 'COMPLETED' | 'HIDDEN' | 'PENDING_APPROVAL';
export type ItemCondition = 'NEW' | 'LIKE_NEW_99' | 'GOOD_90' | 'FAIR_80' | 'OLD';

export interface PostCategory {
  id: string;
  name: string; // VD: "Giáo trình - Sách tham khảo", "Dụng cụ vẽ - Kiến trúc", "Máy tính & Thiết bị"
  slug: string;
  icon?: string;
}

export interface Post extends BaseEntity {
  title: string;
  description: string;
  type: PostType;
  status: PostStatus;
  price: number; // 0 nếu là GIVE_AWAY hoặc EXCHANGE
  targetExchangeItem?: string; // Món đồ mong muốn đổi lại (VD: "Muốn đổi lấy giáo trình Giải Tích 2")
  condition: ItemCondition;
  conditionPercent: number; // VD: 95%
  images: string[];
  courseCode?: string; // Mã học phần: VD: "CS101", "MATH201"
  university: string; // Trường đại học: VD: "Đại học Bách Khoa", "ĐH Kinh Tế Quốc Dân"
  faculty?: string; // Khoa: VD: "Khoa CNTT"
  category: PostCategory;
  author: UserSummary;
  viewCount: number;
  likesCount: number;
}

export interface PostFilterParams {
  page?: number;
  limit?: number;
  search?: string;
  type?: PostType;
  categoryId?: string;
  university?: string;
  faculty?: string;
  courseCode?: string;
  minPrice?: number;
  maxPrice?: number;
  condition?: ItemCondition;
  sortBy?: 'createdAt_desc' | 'price_asc' | 'price_desc' | 'views_desc';
}

export interface CreatePostDTO {
  title: string;
  description: string;
  type: PostType;
  price?: number;
  targetExchangeItem?: string;
  condition: ItemCondition;
  conditionPercent: number;
  images: string[];
  categoryId: string;
  university: string;
  faculty?: string;
  courseCode?: string;
}

export type UpdatePostDTO = Partial<CreatePostDTO> & {
  status?: PostStatus;
};
```

---

### 8.2. Offer (Barter) Types (`src/features/offers/types/index.ts`)
```typescript
import { BaseEntity } from '@/types/common';
import { UserSummary } from '@/features/auth/types';
import { Post } from '@/features/posts/types';

export type OfferStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED';

export interface OfferItem {
  id: string;
  name: string;
  description?: string;
  images: string[];
  conditionPercent: number;
}

export interface Offer extends BaseEntity {
  targetPost: Post; // Món đồ người dùng muốn đổi lấy
  offeredItems: OfferItem[]; // Các món đồ người dùng mang ra để gạ đổi
  additionalCash: number; // Tiền bù thêm (nếu có)
  message: string; // Lời nhắn gạ đổi
  sender: UserSummary;
  receiver: UserSummary;
  status: OfferStatus;
  responseNote?: string;
}

export interface CreateOfferPayload {
  targetPostId: string;
  offeredItemIds: string[]; // Chọn từ MyInventoryTab
  additionalCash?: number;
  message: string;
}
```

---

## 9. QUY TẮC BẢO MẬT & XÁC THỰC EMAIL SINH VIÊN

- **Email Sinh viên:** Bắt buộc validate regex kết thúc bằng domain `.edu.vn` (VD: `sinhvien@hust.edu.vn`, `sv@neu.edu.vn`, `name@vnu.edu.vn`).
- **Token Storage:** Lưu Access Token trong `localStorage` hoặc `sessionStorage` qua wrapper `src/utils/tokenStorage.ts`. Tuyệt đối không đọc trực tiếp biến `localStorage` rải rác trong code.
- **Role Permission Guard:**
  - `GUEST`: Xem bài đăng công khai, tìm kiếm món đồ.
  - `MEMBER`: Sinh viên đã xác thực email trường, được quyền Đăng bài, Gạ đổi đồ (Offer), Nhắn tin, Đánh giá uy tín.
  - `ADMIN`: Duyệt bài vi phạm, xử lý báo cáo sách lậu/bom hàng, khóa tài khoản, xem biểu đồ Dashboard.

---

## 10. HƯỚNG DẪN PROMPT CHO AI AGENT ĐỂ CODE TÍNH NĂNG MỚI

Khi bạn yêu cầu AI Agent triển khai một tính năng hoặc component mới trong RentMate, hãy tuân theo cấu trúc prompt mẫu sau:

### Prompt Template mẫu chuẩn:
```text
Dựa vào tài liệu API_CONVENTIONS.md của RentMate, hãy triển khai tính năng [TÊN TÍNH NĂNG, VD: Quản lý đề xuất đổi đồ MyOffersPage]:
1. Kiểm tra và định nghĩa types trong src/features/offers/types/index.ts (nếu chưa có).
2. Tạo endpoint trong src/api/endpoints.ts.
3. Tạo API service trong src/features/offers/api/offerApi.ts hỗ trợ cả Mock API và Real API.
4. Tạo TanStack Query keys và Custom Hooks (useReceivedOffers, useSentOffers, useAcceptOffer, useRejectOffer).
5. Xây dựng component OfferCard.tsx hiển thị so sánh 2 bên (Đồ muốn đổi vs Đồ của mình kèm số tiền bù) và OfferActionButtons.tsx.
6. Trang MyOffersPage.tsx có 2 tab "Đề xuất nhận được" và "Đề xuất đã gửi", có Skeleton khi loading và EmptyState khi trống.
7. Tuân thủ Tailwind CSS, thẩm mỹ hiện đại, badge trạng thái màu sắc rõ ràng, không dùng any.
```

