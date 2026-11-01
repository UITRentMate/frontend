# Hướng Dẫn Kỹ Thuật Dành Cho AI Coding Agents (Frontend)

Tài liệu này xác lập các nguyên tắc bắt buộc đối với tất cả các trợ lý trí tuệ nhân tạo (AI Coding Assistants: Antigravity, Cursor, GitHub Copilot, ChatGPT...) khi tham gia đọc hiểu, tạo mới hoặc chỉnh sửa mã nguồn tại repository **RentMate Frontend**.

---

## 1. Nguyên tắc kỹ thuật cốt lõi

1. **Pragmatic Clean Code (Thực dụng và Đơn giản):**
   - Đây là đồ án môn học sinh viên (Nhóm 15 gồm 5 thành viên), không phải hệ thống enterprise.
   - Ưu tiên tính dễ đọc, dễ hiểu, dễ gỡ lỗi và nhất quán.
   - Tuyệt đối **không over-engineering**, không áp đặt các abstraction layers phức tạp hoặc design patterns không cần thiết khi nghiệp vụ chưa đòi hỏi.
2. **Đọc trước khi viết (Read Before Write):**
   - Luôn đọc và phân tích kỹ các file liên quan trước khi tiến hành chỉnh sửa hoặc tạo mới.
   - Giữ nguyên các chú thích, cấu hình và quy ước đặt tên sẵn có của dự án.
3. **Không tự ý thêm thư viện phụ thuộc (No Dependency Creep):**
   - Tuyệt đối không tự ý chạy `npm install <package>` để thêm thư viện mới (ví dụ thư viện UI icons, state manager, animation...) nếu không có sự phê duyệt rõ ràng từ người dùng.
   - Tận dụng tối đa các công cụ hiện có: React 19 native hooks, TypeScript strict types, và Tailwind CSS v4 utilities.

---

## 2. Quy chuẩn kiến trúc & Phát triển Frontend

1. **Tuân thủ Kiến trúc Hybrid (Page-Based + Feature-Based):**
   - **`src/pages/`:** Chỉ chứa các trang giao diện hoàn chỉnh kết nối với Routes; chịu trách nhiệm kết hợp các features lại với nhau, không nhồi nhét Business Logic phức tạp.
   - **`src/features/<feature_name>/`:** Chứa toàn bộ các thành phần nghiệp vụ tự đóng gói:
     - `components/`: Các components đặc thù chỉ thuộc về nghiệp vụ này (ví dụ `RoomCard`, `RoomFilterBar`).
     - `hooks/`: Các custom hooks quản lý trạng thái nội bộ của feature.
     - `services/` hoặc `api/`: Xử lý gọi API hoặc cung cấp mock data cho feature.
     - `types/`: Kiểu dữ liệu TypeScript đặc thù của feature.
   - **`src/components/`:** Chỉ chứa các UI components tái sử dụng chung cho từ 2 features trở lên (ví dụ `Button`, `Input`, `Modal`, `Table`, `Badge`).
2. **Bám sát Prototype Figma:**
   - Mọi giao diện xây dựng mới phải đối chiếu trực tiếp với bản thiết kế chính thức trên Figma: [RentMate UI Prototype](https://www.figma.com/design/aDrOkzbnQFP94a7EEBeq6u/RentMate).
   - Bảo đảm đúng bố cục, bảng màu (primary blue, neutral grays...), khoảng cách padding/margin và trạng thái tương tác (hover, focus, disabled).
3. **Quy tắc xử lý Mock Data (Khi API Backend chưa hoàn tất):**
   - Không được phép hardcode dữ liệu mẫu trực tiếp vào trong cấu trúc JSX của component.
   - Dữ liệu mock phải được tách biệt hoàn toàn thành file riêng biệt (ví dụ `src/features/<feature>/mockData.ts` hoặc hàm service giả lập `getMockRooms()`).
   - Cấu trúc kiểu dữ liệu của mock data phải khớp với đặc tả kiểu trong `types/` để sẵn sàng chuyển sang gọi API thật khi Backend cung cấp endpoint.
4. **Không tự suy đoán hoặc sửa đổi API Contract:**
   - API Contract giữa Frontend và Backend hiện đang được nhóm thảo luận và thống nhất.
   - AI Agent tuyệt đối không tự bịa đặt schema dữ liệu API hay tự ý thay đổi contract đã thống nhất giữa hai bên.

---

## 3. Ranh giới an toàn & Quy tắc Git (Safety Boundaries)

> [!IMPORTANT]
> **Phân biệt vai trò:** Các quy tắc dưới đây là ràng buộc an toàn bắt buộc dành riêng cho **AI Agents**. Thành viên con người trong nhóm vẫn thực hiện quy trình Git thông thường được mô tả tại [CONTRIBUTING.md](CONTRIBUTING.md).

1. **Không mở rộng phạm vi (Zero Scope Creep):**
   - Chỉ giải quyết duy nhất nội dung yêu cầu thuộc Issue hoặc prompt của người dùng.
   - Không tự ý "tiện tay" refactor mã nguồn xung quanh, sửa đổi file cấu hình hay thay đổi các components không liên quan.
2. **Quy tắc an toàn Git của AI:**
   - **Không tự động stage, commit hoặc push:** Tuyệt đối không tự ý thực hiện bất kỳ thao tác thay đổi trạng thái Git nào trừ khi nhận được chỉ thị rõ ràng từ người dùng.
   - **Quy trình bắt buộc trước khi thao tác Git:** Chỉ thực hiện khi người dùng yêu cầu cụ thể, và bắt buộc phải kiểm tra branch hiện tại, trạng thái working tree (`git status`) và xem xét diff (`git diff`) trước khi làm.
   - **Khi stage:** Chỉ stage đích danh các file thuộc phạm vi task đã được phê duyệt. Tuyệt đối **không** dùng `git add .` hoặc `git add -A`.
   - **Cấm hoàn toàn các thao tác phá hủy dữ liệu:** Không bao giờ chạy `git push --force`, `git reset --hard`, `git clean -fd`, `git checkout -- .`, hoặc `git rebase` nếu chưa có sự phê duyệt rõ ràng.
   - **Xử lý xung đột (Git Conflicts):** Tuyệt đối không tự động giải quyết conflicts bằng cách ghi đè (overwrite) hoặc xóa bỏ mã nguồn của thành viên khác. Khi có conflict, phải dừng lại báo cáo người dùng.
3. **Bảo mật thông tin:**
   - Tuyệt đối không ghi nhận hoặc hiển thị các thông tin nhạy cảm (mật khẩu, API key, token bí mật) vào source code hoặc tài liệu Markdown.
   - Kiểm tra kỹ để không vô tình tạo file hay đưa các biến môi trường vào Git.

---

## 4. Kiểm tra trước khi bàn giao (Verification Checklist)

Mỗi khi hoàn thành một tác vụ code trên Frontend, AI Agent bắt buộc phải chạy các lệnh kiểm tra sau trong terminal:

1. **Kiểm tra kiểu dữ liệu:**
   ```bash
   npm run typecheck
   ```
   *Bắt buộc phải đạt 0 lỗi TypeScript (`tsc -b`).*
2. **Kiểm tra bản build:**
   ```bash
   npm run build
   ```
   *Bảo đảm ứng dụng đóng gói thành công mà không có lỗi import hay cú pháp.*
3. **Kiểm tra trạng thái Git:**
   ```bash
   git status
   ```
   *Chỉ các file thuộc phạm vi task được phép hiển thị trong danh sách thay đổi.*
