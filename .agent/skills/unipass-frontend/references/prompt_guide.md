# RENTMATE FRONTEND — HƯỚNG DẪN PROMPT CHI TIẾT THEO TỪNG GIAI ĐOẠN
> **Dự án:** RentMate — Nền tảng Trao đổi, Pass đồ & Tặng đồ dùng Sinh viên  
> **Mục tiêu:** Cung cấp bộ Prompt chuẩn mực để copy-paste trực tiếp cho AI Agent thực hiện từ khâu khởi tạo dự án, dựng khung hệ thống đến chi tiết từng module tính năng.

---

## 📌 NGUYÊN TẮC KHI GIAO PROMPT CHO AI AGENT
1. **Luôn yêu cầu tham chiếu `API_CONVENTIONS.md`** để đảm bảo chuẩn code và chuẩn types.
2. **Không yêu cầu làm toàn bộ dự án trong 1 prompt.** Hãy chia theo từng pha (Phase):
   - **Pha 1:** Khởi tạo base project, Tailwind, Routes, Axios Client, Layouts.
   - **Pha 2:** Atomic UI Components, Form Components, Feedback Components.
   - **Pha 3:** Triển khai từng Feature Module (Auth ➡️ Posts ➡️ Offers ➡️ Chat ➡️ Reviews ➡️ Profile ➡️ Admin).
   - **Pha 4:** Mock Data & Test luồng end-to-end.

---

## 🚀 BỘ PROMPT THEO TỪNG PHA TRIỂN KHAI

### PHA 1: KHỞI TẠO DỰ ÁN VÀ CẤU TRÚC NỀN TẢNG (SCAFFOLDING & FOUNDATION)

#### Prompt 1.1: Khởi tạo cấu hình, Router và Constants
```text
Dự án của tôi là RentMate (sinhvienpass-frontend) sử dụng Vite, React, TypeScript, Tailwind CSS, React Router v6, TanStack Query v5.
Hãy thiết lập nền tảng dự án theo cấu trúc chuẩn trong API_CONVENTIONS.md:
1. Cấu hình path alias `@/*` trỏ về `src/*` trong tsconfig.json và vite.config.ts.
2. Tạo các file constants:
   - src/constants/routes.ts: Đầy đủ các route cho Guest (Home, Post Detail), Member (Create Post, My Offers, Chat, Profile), Admin (Dashboard, Post Moderation, Reports, Users).
   - src/constants/post.ts: Enum/hằng số loại tin (TẶNG, ĐỔI, BÁN), tình trạng đồ (99%, 90%...), trạng thái tin.
   - src/constants/offer.ts: Trạng thái đề xuất đổi (CHỜ DUYỆT, ĐÃ CHẤP NHẬN, TỪ CHỐI).
   - src/constants/roles.ts: GUEST, MEMBER, ADMIN.
   - src/constants/storage.ts: ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_KEY.
3. Tạo src/types/common.ts và src/types/api.ts chứa BaseEntity, ApiResponse, PaginatedResponse, ApiErrorResponse.
4. Cấu hình src/api/axiosClient.ts và src/api/endpoints.ts theo chuẩn có interceptor gắn JWT token và xử lý lỗi.
5. Thiết lập src/routes/AppRoutes.tsx có tích hợp ProtectedRoute (cho Member) và AdminRoute (cho Admin).
Viết code sạch, TypeScript nghiêm ngặt, không dùng any.
```

#### Prompt 1.2: Xây dựng Layouts dùng chung
```text
Dựa vào cấu trúc dự án RentMate, hãy tạo các Layout:
1. src/layouts/MainLayout/MainLayout.tsx:
   - Navbar.tsx: Logo RentMate với icon trường học/trao đổi, thanh tìm kiếm nhanh, nút "Đăng tin" nổi bật (màu cam/xanh năng động sinh viên), chuông thông báo, tin nhắn và UserMenuDropdown.
   - UserMenuDropdown.tsx: Menu popup khi bấm vào avatar (Hồ sơ cá nhân, Kho đồ của tôi, Đề xuất đổi đồ, Đăng xuất).
   - Footer.tsx: Thông tin mạng lưới sinh viên các trường đại học (.edu.vn), điều khoản cam kết không buôn bán sách lậu.
2. src/layouts/AuthLayout/AuthLayout.tsx: Layout 2 cột (1 cột banner minh họa sinh viên trao đổi đồ dùng học tập, 1 cột form xác thực).
3. src/layouts/AdminLayout/AdminLayout.tsx: Layout quản trị gồm AdminSidebar.tsx (Menu icon trực quan: Dashboard, Duyệt bài, Xử lý tố cáo, Quản lý tài khoản) và AdminHeader.tsx.
Dùng Tailwind CSS với thiết kế hiện đại, responsive mobile và desktop, bo góc mềm mại, shadow tinh tế.
```

---

### PHA 2: BỘ THÀNH PHẦN GIAO DIỆN DÙNG CHUNG (UI & FEEDBACK)

#### Prompt 2.1: Bộ UI Nguyên tử (Atomic UI Components)
```text
Hãy tạo toàn bộ các UI components dùng chung trong src/components/ui/:
1. Button.tsx: Hỗ trợ các variant ('primary', 'secondary', 'outline', 'ghost', 'danger'), các size ('sm', 'md', 'lg'), trạng thái isLoading kèm Spinner tích hợp.
2. Input.tsx & Textarea.tsx: Hỗ trợ label, error message, helper text, left icon / right icon.
3. Badge.tsx: Hiển thị các nhãn loại bài ("Tặng 0đ" - màu xanh lá, "Gạ đổi" - màu tím, "Bán rẻ" - màu cam, "Đang thương lượng" - màu vàng).
4. Modal.tsx: Dialog pop-up có backdrop blur, nút đóng X, animation mở mượt mà, hỗ trợ đóng khi bấm ESC hoặc bấm ra ngoài.
5. Skeleton.tsx & Spinner.tsx: Component tải trang mượt mà.
6. RatingStars.tsx: Component hiển thị hoặc chọn số sao đánh giá uy tín (1-5 sao, có hỗ trợ nửa sao).
Sử dụng Tailwind CSS, viết TypeScript với props interface đầy đủ.
```

#### Prompt 2.2: Thành phần Form & Feedback
```text
Hãy xây dựng các component nhập liệu và phản hồi trong RentMate:
1. src/components/form/ImageUploader.tsx: Cho phép sinh viên upload nhiều ảnh chụp thực tế đồ dùng (tối đa 5 ảnh), có xem trước (preview thumbnail), nút xóa ảnh, kiểm tra dung lượng ảnh tối đa 5MB.
2. src/components/feedback/Toast.tsx: Hệ thống Toast thông báo toàn cục qua Context (success, error, warning, info) tự biến mất sau 3 giây.
3. src/components/feedback/ConfirmDialog.tsx: Hộp thoại xác nhận thao tác quan trọng (VD: "Bạn có chắc chắn muốn hủy đề xuất đổi đồ này không?").
4. src/components/feedback/EmptyState.tsx: Hiển thị minh họa kèm thông điệp khi không có dữ liệu (kết quả tìm kiếm trống, kho đồ chưa có gì).
5. src/components/navigation/Pagination.tsx: Thanh phân trang số trang (1, 2, 3 ... 10) có nút Prev/Next.
```

---

### PHA 3: TRIỂN KHAI CÁC MODULE NGHIỆP VỤ (FEATURES)

#### Prompt 3.1: Module Xác thực (Auth Feature)
```text
Triển khai module src/features/auth/ cho RentMate theo chuẩn API_CONVENTIONS.md:
1. types/index.ts: User, LoginPayload, RegisterPayload (có trường university, studentId, studentEmail), AuthResponse.
2. api/authApi.ts: Gọi login, register, verifyStudentEmail (yêu cầu email đuôi .edu.vn), logout, getMe. Hỗ trợ mock khi VITE_USE_MOCK=true.
3. components/LoginForm.tsx và components/RegisterForm.tsx: Form xác thực có validate regex email trường đại học .edu.vn, toggle ẩn/hiện mật khẩu, thông báo lỗi rõ ràng.
4. pages/LoginPage.tsx và pages/RegisterPage.tsx lồng trong AuthLayout.
5. Tích hợp với AuthContext.tsx để lưu thông tin đăng nhập vào tokenStorage và chuyển trang sau khi login.
```

#### Prompt 3.2: Module Quản lý bài đăng & Tìm kiếm (Posts Feature)
```text
Triển khai module src/features/posts/ cho RentMate:
1. types/index.ts: Post, PostType ('GIVE_AWAY' | 'EXCHANGE' | 'SELL'), ItemCondition, PostFilterParams, CreatePostDTO.
2. api/postApi.ts và hooks/ (postKeys, usePosts, usePostDetail, useCreatePost).
3. components/PostCard.tsx: Card hiển thị ảnh bìa, badge loại tin ("Tặng 0đ", "Đổi", giá bán), độ mới (VD: 95%), trường đại học, mã học phần (nếu có), avatar tác giả và điểm sao uy tín.
4. components/PostFilterSidebar.tsx: Bộ lọc đa năng (Loại tin: Tặng/Đổi/Bán; Trường đại học; Khoa; Mã môn học; Tầm giá; Độ mới).
5. pages/PostListPage.tsx: Trang danh sách có SearchBar, bộ lọc sidebar, phân trang, hiển thị PostCard dạng lưới responsive (1 col mobile, 2 col tablet, 3-4 col desktop) kèm Skeleton loading.
6. pages/PostDetailPage.tsx: Xem chi tiết đồ dùng, slider ảnh (PostGallery), thông tin môn học, tình trạng sách vở (có ghi chú, gạch chân hay còn mới), nút "Gạ đổi đồ ngay" hoặc "Nhắn tin cho người đăng".
7. pages/CreatePostPage.tsx & components/PostForm.tsx: Form đăng tin cho phép tải nhiều ảnh, chọn loại tin (nếu chọn ĐỔI thì hiện ô 'Món đồ mong muốn đổi lại').
```

#### Prompt 3.3: Module Gạ đổi đồ ngang (Offers / Barter Feature) — TÍNH NĂNG ĐẶC TRƯNG
```text
Triển khai tính năng cốt lõi của RentMate: Đề xuất đổi đồ ngang (Offers) trong src/features/offers/:
1. types/index.ts: Offer, OfferStatus ('PENDING', 'ACCEPTED', 'REJECTED', 'CANCELLED'), CreateOfferPayload.
2. api/offerApi.ts và hooks/ (offerKeys, useReceivedOffers, useSentOffers, useCreateOffer, useAcceptOffer, useRejectOffer).
3. components/CreateOfferModal.tsx:
   - Mở khi người dùng bấm "Gạ đổi đồ" ở trang chi tiết bài đăng.
   - Cho phép người dùng tick chọn 1 hoặc nhiều món đồ từ kho cá nhân (My Inventory) để mang ra đổi.
   - Cho phép nhập thêm tiền bù (nếu có) và lời nhắn thiện chí trao đổi.
4. components/OfferCard.tsx:
   - Hiển thị thiết kế so sánh 2 bên (Split Comparison): [Món đồ bạn muốn nhận] 🔁 [Món đồ bạn đem ra đổi + Tiền bù].
   - Hiển thị thông tin sinh viên đề xuất, ngày gửi và trạng thái badge.
5. components/OfferActionButtons.tsx: Nút "Chấp nhận đổi" (màu xanh lá) và "Từ chối" (màu xám đỏ) chỉ hiện với người nhận khi offer ở trạng thái PENDING.
6. pages/MyOffersPage.tsx: Gồm 2 tab: "Đề xuất nhận được" (người khác muốn đổi với mình) và "Đề xuất đã gửi đi" (mình đi gạ đổi).
```

#### Prompt 3.4: Module Nhắn tin trực tiếp (Chat Feature)
```text
Triển khai module tin nhắn trong src/features/chat/:
1. types/index.ts: Message, Conversation, ChatUser.
2. components/ChatPostContext.tsx: Thanh ghim đầu khung chat hiển thị món đồ và bài đăng 2 sinh viên đang trao đổi/thương lượng (ảnh thu nhỏ, tên đồ, giá/loại tin, trạng thái).
3. components/MessageBubble.tsx: Bong bóng tin nhắn cho người gửi và người nhận, hiển thị thời gian gửi, avatar và tick đã xem.
4. components/ChatInput.tsx: Ô nhập tin nhắn văn bản, nút gửi ảnh và nút Enter để gửi nhanh.
5. components/ConversationList.tsx: Danh sách các cuộc trò chuyện gần đây, hiển thị chấm xanh online và đếm tin nhắn chưa đọc.
6. pages/ChatPage.tsx: Giao diện chat chia 2 cột responsive (bên trái là danh sách hội thoại, bên phải là ChatWindow). Có hỗ trợ Mock Service realtime hoặc Firestore stub.
```

#### Prompt 3.5: Module Đánh giá uy tín & Báo cáo vi phạm (Reviews & Reports)
```text
Triển khai module Reviews và Reports trong RentMate:
1. src/features/reviews/:
   - components/CreateReviewModal.tsx: Cho phép chấm 1-5 sao và viết nhận xét sau khi giao dịch/đổi đồ hoàn tất.
   - components/ReputationScore.tsx: Huy hiệu hiển thị điểm uy tín trung bình (VD: ⭐ 4.9/5 - 28 lượt giao dịch thành công).
   - components/ReviewList.tsx: Danh sách các đánh giá từ sinh viên khác đã giao dịch.
2. src/features/reports/:
   - components/CreateReportModal.tsx: Form tố cáo bài viết hoặc tài khoản sinh viên vi phạm (Lý do: Sách in lậu/photo trái phép, Bom hàng/không đến điểm hẹn, Đồ dùng sai thực tế, Lừa đảo) kèm chỗ upload ảnh chụp màn hình bằng chứng.
```

#### Prompt 3.6: Module Hồ sơ cá nhân & Kho đồ (Profile Feature)
```text
Triển khai module src/features/profile/:
1. components/ProfileHeader.tsx: Tên sinh viên, mã SV (ẩn bớt số), trường đại học, email trường đã xác thực tích xanh, điểm đánh giá uy tín.
2. components/MyInventoryTab.tsx: Danh sách các món đồ trong kho cá nhân sẵn sàng để mang đi gạ đổi (có thể thêm nhanh đồ vào kho mà chưa cần đăng bài công khai).
3. components/MyPostsTab.tsx: Danh sách các bài viết cá nhân đã đăng kèm các nút thao tác: Sửa, Ẩn bài, Đánh dấu đã trao đổi xong, Xóa bài.
4. components/TransactionHistoryTab.tsx: Lịch sử các món đồ đã trao đổi thành công kèm đánh giá nhận được.
5. pages/MyProfilePage.tsx và pages/PublicProfilePage.tsx (xem uy tín và kho đồ công khai của sinh viên khác).
```

#### Prompt 3.7: Module Quản trị viên (Admin Feature)
```text
Triển khai module Admin trong src/features/admin/ dành riêng cho Quản trị viên:
1. components/StatsOverview.tsx: 4 thẻ thống kê trực quan (Tổng bài đăng, Giao dịch thành công, Món đồ tặng 0đ, Báo cáo vi phạm cần xử lý).
2. pages/AdminDashboardPage.tsx: Biểu đồ thống kê danh mục đồ dùng được quan tâm nhất (Giáo trình, Máy tính cầm tay, Dụng cụ vẽ...).
3. pages/AdminPostsPage.tsx: Bảng danh sách các bài đăng mới cần duyệt, có nút xem nhanh ảnh và nút Phê duyệt / Từ chối (kèm lý do vi phạm).
4. pages/AdminReportsPage.tsx: Bảng xử lý khiếu nại và tố cáo từ người dùng (Xem bằng chứng ➡️ Khóa bài đăng hoặc Cảnh cáo tài khoản).
5. pages/AdminUsersPage.tsx: Quản lý danh sách tài khoản sinh viên, xem số lần bị report, nút Khóa tài khoản (Ban).
```

---

### PHA 4: DỮ LIỆU MẪU MOCK DATA HOÀN CHỈNH (MOCK DATA & SEED)

#### Prompt 4.1: Tạo bộ dữ liệu mẫu sinh viên thực tế
```text
Tạo toàn bộ dữ liệu mẫu cho RentMate trong src/mocks/data/ để ứng dụng chạy mượt mà không cần Backend:
1. mockUsers.ts:
   - 1 tài khoản Admin test (admin@unipass.edu.vn, role: 'ADMIN').
   - 4 tài khoản sinh viên từ các trường khác nhau: ĐH Bách Khoa (nguyenvana@hust.edu.vn), ĐH Kinh Tế Quốc Dân (lethib@neu.edu.vn), ĐH Kiến Trúc, ĐH Ngoại Thương. Có avatar Unsplash sinh viên thật, số điểm uy tín từ 4.5 - 5.0 sao.
2. mockPosts.ts:
   - 12 bài đăng đa dạng thể loại:
     + 4 bài TẶNG 0đ (Giáo trình Triết học Mác-Lênin, Tài liệu ôn thi Toeic, Thước kẻ kiến trúc...).
     + 4 bài GẠ ĐỔI (Đổi máy tính Casio fx-580VNX lấy giáo trình Lập trình C++, Đổi bảng vẽ Wacom...).
     + 4 bài BÁN RẺ sinh viên (Chuột không dây, Đèn học chống cận...).
     + Mỗi bài có ảnh chất lượng cao, mã môn học (CS101, ECO201...), trường ĐH, độ mới (85% - 99%).
3. mockOffers.ts: 3-4 lượt đề xuất đổi đồ mẫu ở các trạng thái PENDING, ACCEPTED, REJECTED.
4. mockReviews.ts: 6-8 lượt đánh giá nhận xét tích cực và xây dựng.
5. mockReports.ts: 2-3 báo cáo mẫu bài đăng nghi vấn photo sách lậu và bom hẹn.
6. mockDashboardStats.ts: Số liệu thống kê sinh động cho Admin Dashboard.
Tích hợp toàn bộ vào src/mocks/mockService.ts có hàm delay giả lập 400ms và lưu trữ in-memory để thao tác thêm/sửa/xóa hoạt động được trên UI.
```
