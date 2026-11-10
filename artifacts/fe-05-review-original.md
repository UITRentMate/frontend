Chào @goat12-d, cảm ơn bạn đã hoàn thành task **FE-05** đúng hạn!

Nhìn chung, nhánh này có chất lượng hoàn thiện cơ bản rất tốt:
- [x] Code sạch, `tsc -b` và `vite build` xanh 100%, không phát sinh lỗi types.
- [x] Tuân thủ rất nghiêm túc **Strict Law 7 (Centralized Types)**, tách toàn bộ props và models vào thư mục `types/`.
- [x] Cải tiến `ProtectedRoutes` với `requiredRole="landlord"` rất an toàn và phân quyền chuẩn.
- [x] Chú ý tốt về Accessibility (`role="progressbar"`, aria labels, anchor links với `scroll-mt-24`).

Tuy nhiên, đối chiếu với **Figma Prototype** ([Figma node 159-5](https://www.figma.com/design/aDrOkzbnQFP94a7EEBeq6u/RentMate?node-id=159-5)) và bộ quy chuẩn **RentMate Guidelines**, giao diện hiện tại **chưa thật sự sát prototype và còn thiếu các nút nghiệp vụ quan trọng**, cùng một số điểm kiến trúc cần chỉnh sửa trước khi merge:

---

### 1. 🎨 Về Giao diện & Độ tương đồng với Figma Prototype

1. **Thiếu các nút hành động nghiệp vụ (Action Buttons / Quick Actions):**
   - **Khu vực Header & Thao tác nhanh:** Trên Figma có cụm nút hành động nghiệp vụ của Chủ trọ (như *"+ Thêm phòng mới"*, *"Ghi điện nước"*, *"Tạo phiếu thu"* hoặc bộ lọc chọn cơ sở trọ). Hiện tại Header mới chỉ có duy nhất 1 nút chuyển trang *"Quản lý khu trọ & phòng"*, làm giảm tính tiện dụng của một Dashboard trung tâm điều hành.
   - **Nút xử lý tại chỗ trong các khối nghiệp vụ:**
     - *Khối Lịch đón khách:* Các item lịch hẹn hiện đang hiển thị text và badge tĩnh, thiếu nút hành động cụ thể như *"Xác nhận đón"*, *"Đổi giờ"* hoặc *"Liên hệ khách"*.
     - *Khối Đối soát ngân hàng:* Danh sách biên lai đang hiển thị thụ động, thiếu nút thao tác nhanh như *"Xác nhận đã nhận tiền"* / *"Khớp lệnh"*.
     - *Khối Sơ đồ phòng:* Các ô phòng cần hỗ trợ tương tác bấm vào để xem nhanh hoặc chuyển hướng chi tiết phòng.

2. **Bố cục & Visual Hierarchy chưa thật sự khớp:**
   - **Header & Khoảng cách (Spacing):** Khối Header tổng quan và các thẻ chỉ số (KPI cards) hiện tại cảm giác hơi thô và dàn trải, các khoảng padding/margin cần tinh chỉnh lại sát hơn với thiết kế Figma.
   - **Shadow & Hover effect:** Theo `UI_UX_GUIDELINES.md`, hệ thống dùng shadow Midnight Navy (`shadow-soft-xs`, `shadow-soft-sm`). Các card chỉ số và tác vụ nên có hiệu ứng hover nhấc nhẹ (`hover:-translate-y-0.5 transition-transform`) để giao diện sống động và có chiều sâu hơn.
   - **Typography & Badges:** Cần rà soát lại kích thước chữ và font (dùng `Be Vietnam Pro` cho tiêu đề/số liệu, `Plus Jakarta Sans` cho mô tả), kích thước badge và icon sao cho thanh thoát đúng visual mẫu.

3. **Cần thay thế Spinner bằng Skeleton Loading:**
   - Trong `LandlordDashboardPage.tsx`, hiện tại bạn đang dùng `<Loading message="Đang tải tổng quan…" />` dạng spinner xoay ở giữa trang.
   - Để đúng với trải nghiệm ứng dụng hiện đại và prototype, đề nghị xây dựng `DashboardSkeleton` mô phỏng khung xương của 4 thẻ KPI và khối tác vụ để tránh hiện tượng giật layout (Cumulative Layout Shift) khi tải dữ liệu.

---

### 2. 🏗️ Về Kiến trúc Code & Data Contract (API Conventions)

1. **Thiếu tầng API Service (`src/features/ownerDashboard/api/`):**
   - Hiện tại `useOwnerDashboard.ts` đang import trực tiếp `mockOwnerDashboard` và resolve tĩnh:
     ```typescript
     // useOwnerDashboard.ts
     queryFn: () => Promise.resolve(mockOwnerDashboard)
     ```
   - **Yêu cầu sửa:**
     - Tạo file `src/features/ownerDashboard/api/ownerDashboardApi.ts`.
     - Chuẩn hóa hàm gọi API trả về Promise có cấu trúc bọc chuẩn `Promise<ApiResponse<OwnerDashboardData>>` (theo Mục 2 của `API_CONVENTIONS.md`).
     - Bổ sung giả lập độ trễ mạng `delay(400 - 600ms)` từ mock service. Việc resolve tức thì (0ms) như hiện tại làm mất trạng thái `isPending`, khiến người dùng không thấy được trạng thái loading.

2. **Đóng gói Query Key Factory cục bộ (Feature-First):**
   - Bạn đang thêm trực tiếp key vào `src/lib/queryKeys.ts`.
   - Để đảm bảo tính tự đóng gói của module, vui lòng tạo `src/features/ownerDashboard/hooks/ownerDashboardKeys.ts` rồi mới export hoặc map vào hệ thống chung.

3. **Cấu hình TanStack Query Cache:**
   - Bổ sung `staleTime: 1000 * 60 * 3` (3 phút) trong `useOwnerDashboard` để tránh refetch thừa khi chủ trọ chuyển đổi qua lại giữa tab *Tổng quan* và *Khu trọ & Phòng trọ*.
   - Trong `LandlordDashboardPage.tsx`, nên bắt thêm trạng thái `isError` để hiển thị nút "Thử lại" chính xác hơn thay vì chỉ kiểm tra `!isPending && !data`.

---

Nhờ @goat12-d bổ sung các nút nghiệp vụ, tinh chỉnh visual theo đúng prototype và hoàn thiện tầng API service nhé. Sau khi cập nhật mình sẽ review lại và duyệt merge ngay. Cảm ơn bạn!
