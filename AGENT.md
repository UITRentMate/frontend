# Hướng Dẫn Kỹ Thuật Dành Cho AI Coding Agents (Frontend) — RentMate

> **Mục tiêu:** Định hướng bắt buộc cho mọi AI Coding Assistant (Antigravity, Cursor, Windsurf, GitHub Copilot, Claude Code...) khi tham gia đọc hiểu, tạo mới hoặc chỉnh sửa mã nguồn tại repository **RentMate Frontend**.  
> **Quy định bắt buộc:** Mọi thay đổi mã nguồn PHẢI tuân thủ 100% các tài liệu đặc tả kỹ thuật trong thư mục [`.agent/rules/`](.agent/rules/) và các kỹ năng trong [`.agent/skills/`](.agent/skills/).

---

## 1. Nguyên Tắc Kỹ Thuật Cốt Lõi

1. **Pragmatic Clean Code (Thực dụng và Đơn giản):**
   - Đây là đồ án môn học sinh viên (Nhóm 15 gồm 5 thành viên), không phải hệ thống enterprise.
   - Ưu tiên tính dễ đọc, dễ hiểu, dễ gỡ lỗi và nhất quán.
   - Tuyệt đối **không over-engineering**, không áp đặt abstraction layers phức tạp khi nghiệp vụ chưa đòi hỏi.
2. **Đọc trước khi viết (Read Before Write):**
   - Luôn đọc và phân tích kỹ các file liên quan trước khi tiến hành chỉnh sửa hoặc tạo mới.
   - Giữ nguyên các chú thích, cấu hình và quy ước đặt tên sẵn có của dự án.
3. **Không tự ý thêm thư viện phụ thuộc (No Dependency Creep):**
   - Tuyệt đối không tự ý chạy `npm install <package>` nếu không có sự phê duyệt rõ ràng từ người dùng.
   - Tận dụng tối đa công cụ hiện có: React 19 native hooks, TypeScript strict types, và Tailwind CSS v4 utilities.

---

## 2. Bảy Điều Luật Nghiêm Ngặt ([.agent/rules/AGENT_RULES.md](.agent/rules/AGENT_RULES.md))

- **Law 1 - Zero `any` & Centralized Types:** Cấm sử dụng `any`. Các types dùng chung (User, API Response, Pagination...) bắt buộc đặt tại `src/types/`. 100% Component Props không được khai báo inline trong `.tsx`.
- **Law 2 - Strict Hybrid Boundary:** `src/pages/` chỉ gắn với Routes (Thin Page Assembler); `src/features/<feature>/` tự đóng gói toàn bộ logic nghiệp vụ (components, hooks, services, types). Chiều phụ thuộc 1 chiều: `app -> routes -> pages -> features -> components -> hooks -> lib -> types`. Cấm circular dependencies.
- **Law 3 - Data & Mock Isolation:** Không hardcode dữ liệu mẫu trong JSX. Tách riêng `mockData.ts` và dùng Axios client `src/lib/apiClient.ts` + TanStack Query v5 + Query Key Factory.
- **Law 4 - Design System Compliance:** Font chuẩn `Be Vietnam Pro` (Headings) và `Plus Jakarta Sans` (Body). Màu chủ đạo `#1B2CC1` (Brand Blue), `#10B981` (Eco Mint), nền dịu mắt `#F2F8FF` (Canvas). Bóng đổ Midnight Navy `rgba(9, 21, 64, ...)`. Cấm dùng màu đen thuần `#000000` và bo góc sắc nhọn `0px – 4px`.
- **Law 5 - Zero Dependency Creep:** Không tự ý cài đặt thư viện phụ thuộc mới.
- **Law 6 - Git Safety:** Không tự ý `git add .`, commit, push hay chạy destructive commands.
- **Law 7 - Pre-Delivery Verification:** Bắt buộc chạy `npm run typecheck` và `npm run build` đạt 0 lỗi trước khi bàn giao.

---

## 3. Nguyên Tắc Bất Di Bất Dịch Về Cấu Trúc Mã Nguồn

1. **Phân biệt `src/pages/` và `src/features/`:**
   - `src/features/<feature>/`: Nơi lưu trữ **nghiệp vụ** (API, Custom Query Hooks, Types, Feature Components).
   - `src/pages/<PageName>/`: Nơi **lắp ráp mỏng (Thin Page Assembler)** tương ứng 1:1 với URL Route. Chỉ nhận params, gọi custom hook và ghép các component lại.
2. **`src/components/ui/` chỉ chứa Atomic UI:**
   - Chỉ chứa các UI nguyên tử nhỏ, phi nghiệp vụ: `Button`, `Input`, `Badge`, `Modal`, `Skeleton`, `Spinner`, `Select`, `Dropdown`, và Pure SVG Icons.
   - **TUYỆT ĐỐI KHÔNG** đặt các Section lớn hoặc trang màn hình vào `src/components/ui/`.
3. **`src/layouts/` hoặc `src/components/layout/` chứa bộ khung giao diện:**
   - `MainLayout`: Navbar/Header, `<Outlet />`, Footer.
   - `AuthLayout`: Layout chia cột cho đăng nhập/đăng ký.
   - `AdminLayout`: Layout cho trang quản trị.
4. **`App.tsx` chỉ là Root Provider:**
   - `App.tsx` chỉ bọc `QueryClientProvider`, `RouterProvider` (hoặc `BrowserRouter`), `AuthProvider` và render Route. Tuyệt đối không nhồi nhét giao diện hay `useState` cục bộ vào `App.tsx`.
5. **Phong cách Centralized Types (Đặc tả kiểu tập trung — Chuẩn RentMate):**
   - **TUYỆT ĐỐI CẤM:** Không khai báo `interface` hoặc `type` (kể cả Component Props `[ComponentName]Props`) trực tiếp bên trong các file giao diện (`.tsx`).
   - **BẮT BUỘC:** 100% Component Props, Data Models, DTOs, Payload phải được định nghĩa tập trung trong thư mục `types/`:
     - **UI Dùng chung (`src/components/ui/`):** Khai báo Props trong `src/types/` (VD: `src/types/ui.types.ts`) và re-export tại `src/types/index.ts`. Trong file component `.tsx` chỉ nhận kiểu qua `import { [ComponentName]Props } from '../../types';`.
     - **Feature Components (`src/features/<feature>/components/`):** Khai báo Props trong `src/features/<feature>/types/` (VD: `src/features/rooms/types/roomComponents.ts`) và re-export tại `src/features/<feature>/types/index.ts`. Trong file component `.tsx` chỉ nhận kiểu qua `import { [ComponentName]Props } from '../types';`.
6. **Quy chuẩn API Client & Interceptors Layer (`src/lib/apiClient.ts`):**
   - **Client Duy Nhất:** Toàn bộ request HTTP trong dự án phải đi qua `src/lib/apiClient.ts`. Không tạo thêm instance axios khác.
   - **Xử lý lỗi 2 cấp (Two-tier Error Handling):**
     - **Cấp Hạ Tầng (5xx, Network Error, Timeout):** Tự động bắt và chuẩn hóa lỗi qua Interceptor.
     - **Cấp Nghiệp Vụ & Form Validation (400, 422):** Chuyển quyền xử lý cho Custom Query Hook / Component để hiển thị lỗi bên dưới trường nhập liệu.

---

## 4. Danh Mục Tài Liệu Đặc Tả Chi Tiết ([.agent/rules/](.agent/rules/))

| Bộ quy tắc | Đường dẫn | Nội dung trọng tâm |
| :--- | :--- | :--- |
| **Kỷ luật lập trình** | [.agent/rules/AGENT_RULES.md](.agent/rules/AGENT_RULES.md) | 7 điều luật bắt buộc, Zero any, Centralized Types, Zero Dependency Creep. |
| **Cấu trúc thư mục** | [.agent/rules/FOLDER_STRUCTURE.md](.agent/rules/FOLDER_STRUCTURE.md) | Phân tầng Hybrid Page-Based + Feature-Sliced, phân định Centralized Types vs Feature Types. |
| **Kiến trúc tổng thể** | [.agent/rules/ARCHITECTURE.md](.agent/rules/ARCHITECTURE.md) | Kiến trúc 5 lớp, phân quyền RBAC (Student, Landlord, Admin), Barter Pipeline 5 bước. |
| **Quy chuẩn API** | [.agent/rules/API_CONVENTIONS.md](.agent/rules/API_CONVENTIONS.md) | Axios client, TanStack Query v5 cache (`staleTime: 5m`, `gcTime: 15m`), Query Key Factory. |
| **Quy chuẩn viết Code** | [.agent/rules/CODE_CONVENTIONS.md](.agent/rules/CODE_CONVENTIONS.md) | Thứ tự import 5 tầng, quy tắc đặt tên, Early Return, Tailwind v4 semantic tokens. |
| **Thiết kế UI/UX** | [.agent/rules/UI_UX_GUIDELINES.md](.agent/rules/UI_UX_GUIDELINES.md) | Design System theo RentMate System Design, bảng màu #1B2CC1, #10B981, Canvas #F2F8FF. |

---

## 5. Hệ Thống Kỹ Năng & Subagents Chuyên Biệt ([.agent/](.agent/README.md))

### 5.1. Danh Mục Kỹ Năng Nghiệp Vụ (`.agent/skills/`)
| Kỹ năng | Thư mục | Mô tả & Công cụ đi kèm |
| :--- | :--- | :--- |
| **RentMate Frontend** | [unipass-frontend](.agent/skills/unipass-frontend/skill.md) | Phát triển tính năng toàn diện từ phân tích, mock service đến UI components. Đi kèm script: `node .agent/skills/unipass-frontend/scripts/validate_centralized_types.js`. |
| **API Conventions** | [api-conventions](.agent/skills/api-conventions/skill.md) | Tích hợp API, TanStack Query v5 và Query Key Factory. Đi kèm script: `node .agent/skills/api-conventions/scripts/verify_query_keys.js`. |
| **Code Reviewer** | [code-reviewer](.agent/skills/code-reviewer/skill.md) | Kiểm tra tuân thủ 7 Strict Laws, phát hiện lỗi bất đồng bộ và type safety. |
| **UI/UX Design** | [ui-ux-design](.agent/skills/ui-ux-design/skill.md) | Thiết kế UI Modern Campus & Trust-Driven, Royal Campus Blue #1B2CC1, Canvas #F2F8FF. |

### 5.2. Hệ Thống Subagents & Personas (`.agent/agents/`)
- [unipass-lead-engineer.md](.agent/agents/unipass-lead-engineer.md): Phụ trách kiến trúc tổng thể, route tập trung, data fetching và tiêu chuẩn chất lượng.
- [code-reviewer.md](.agent/agents/code-reviewer.md): Thẩm định code, chặn đứng lỗi type assertions lỏng lẻo và rò rỉ bộ nhớ.
- [ui-ux-architect.md](.agent/agents/ui-ux-architect.md): Thẩm định thẩm mỹ, typography tiếng Việt, tokens màu sắc và trải nghiệm sinh viên.

---

## 6. Ranh Giới An Toàn & Quy Tắc Git (Safety Boundaries)

> [!IMPORTANT]
> **Phân biệt vai trò:** Các ràng buộc an toàn này dành riêng cho **AI Agents**. Thành viên con người thực hiện quy trình theo [CONTRIBUTING.md](CONTRIBUTING.md).

1. **Không mở rộng phạm vi (Zero Scope Creep):** Chỉ giải quyết duy nhất nội dung yêu cầu thuộc Issue hoặc prompt của người dùng.
2. **Quy tắc an toàn Git:**
   - **Không tự động stage, commit hoặc push:** Chỉ thực hiện khi người dùng yêu cầu cụ thể.
   - **Bắt buộc kiểm tra:** Chạy `git status` và `git diff` trước khi thực hiện bất kỳ thao tác Git nào.
   - **Khi stage:** Chỉ stage đích danh các file thuộc task. Tuyệt đối **không** dùng `git add .` hoặc `git add -A`.
   - **Cấm hoàn toàn:** Không chạy `git push --force`, `git reset --hard`, `git clean -fd`, `git checkout -- .`.
   - **Xung đột:** Không tự giải quyết conflict bằng cách ghi đè mã nguồn của người khác.

---

## 7. Kiểm Tra Bắt Buộc Trước Khi Bàn Giao (Verification Gate)

Mỗi khi hoàn thành một tác vụ, AI Agent bắt buộc phải chạy các lệnh sau trong terminal:

1. **Kiểm tra tính hợp lệ của Types tập trung:**
   ```bash
   node .agent/skills/unipass-frontend/scripts/validate_centralized_types.js
   ```
2. **Kiểm tra tính đồng bộ Query Key Factory:**
   ```bash
   node .agent/skills/api-conventions/scripts/verify_query_keys.js
   ```
3. **Kiểm tra kiểu dữ liệu TypeScript (0 lỗi):**
   ```bash
   npm run typecheck
   ```
4. **Kiểm tra bản đóng gói sản phẩm:**
   ```bash
   npm run build
   ```
5. **Kiểm tra trạng thái Git:**
   ```bash
   git status
   ```
