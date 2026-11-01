# Quy Trình Đóng Góp & Phát Triển (Frontend)

Tài liệu này quy định quy trình phối hợp làm việc nhóm trên repository **RentMate Frontend**, áp dụng cho đội hình 3 lập trình viên Frontend và quá trình tích hợp với đội Backend.

---

## 1. Mô hình phân nhánh (Branching Strategy)

Dự án áp dụng mô hình phân nhánh tinh gọn (Trunk-leaning with Integration Branch), không áp đặt GitFlow phức tạp:

- **`main`:** Nhánh mã nguồn ổn định đã được kiểm thử, đóng vai trò mốc phát hành sau mỗi giai đoạn (Milestone Release).
  - *Lưu ý:* Dự án hiện tại đang trong giai đoạn phát triển đồ án sinh viên, chưa triển khai môi trường production trực tuyến. Nhánh `main` phản ánh phiên bản ổn định nhất của codebase.
- **`staging`:** Nhánh tích hợp chính (Integration Branch) của toàn bộ dự án.
  - Mọi nhánh tính năng, sửa lỗi đều xuất phát từ `staging` và mở Pull Request (PR) quay về `staging`.
  - Thành viên nhóm chạy thử nghiệm tích hợp toàn hệ thống trên nhánh này trước khi hợp nhất vào `main`.

---

## 2. Quy tắc đặt tên nhánh (Branch Naming)

Mọi thành viên phát triển bắt buộc phải tạo nhánh riêng rẽ từ nhánh `staging` mới nhất theo cú pháp:

`<loại_nhánh>/<mô_tả_ngắn_gọn>`

| Tiền tố | Mục đích | Ví dụ minh họa |
| :--- | :--- | :--- |
| `feat/` | Phát triển tính năng, màn hình hoặc component mới | `feat/room-search-bar`, `feat/contract-detail-view` |
| `fix/` | Sửa lỗi giao diện, lỗi render, lỗi logic hiển thị | `fix/modal-backdrop-overflow`, `fix/login-form-validation` |
| `docs/` | Bổ sung, chỉnh sửa tài liệu hoặc hướng dẫn dự án | `docs/project-guidelines`, `docs/update-readme` |
| `refactor/`| Cải tiến cấu trúc mã nguồn mà không làm thay đổi hành vi UI | `refactor/extract-room-card`, `refactor/cleanup-app-router` |
| `test/` | Bổ sung hoặc cập nhật kiểm thử tự động | `test/auth-hook-tests` |

---

## 3. Quy tắc an toàn nhánh (Branch Protection Rules)

1. **Tuyệt đối KHÔNG commit hoặc push trực tiếp vào `main`:**
   - Mã nguồn chỉ vào `main` thông qua Pull Request được duyệt từ `staging` sau các đợt nghiệm thu mốc đồ án.
2. **Tuyệt đối KHÔNG commit hoặc push trực tiếp vào `staging` trong quy trình làm việc thường ngày:**
   - Mọi thay đổi đều phải thông qua Feature Branch và Pull Request.
3. **Mỗi Issue trên GitHub phải có phân công cụ thể:**
   - Mỗi Issue cần có một Assignee rõ ràng chịu trách nhiệm chính trước khi bắt đầu tạo branch.

---

## 4. Chuẩn hóa Commit Message (Conventional Commits)

Commit message cần rõ ràng, súc tích và tuân thủ định dạng:

`<type>: <mô tả ngắn bằng tiếng Việt hoặc tiếng Anh>`

Các kiểu `type` thông dụng:
- `feat`: Tính năng mới (ví dụ `feat: add room card component with tailwind styling`).
- `fix`: Sửa lỗi (ví dụ `fix: resolve mobile navigation drawer flicker`).
- `docs`: Cập nhật tài liệu (ví dụ `docs: update setup guide in README`).
- `refactor`: Tái cấu trúc mã nguồn (ví dụ `refactor: split invoice list into smaller sub-components`).
- `chore`: Tác vụ bảo trì, cấu hình, dependencies (ví dụ `chore: update tsconfig paths`).

---

## 5. Quy trình làm việc với Pull Request (PR)

### 5.1. Các bước thực hiện một tính năng
1. **Lấy mã nguồn mới nhất:**
   ```bash
   git checkout staging
   git pull origin staging
   ```
2. **Tạo nhánh tính năng:**
   ```bash
   git checkout -b feat/ten-tinh-nang
   ```
3. **Phát triển và tự kiểm thử cục bộ:**
   - Bám sát thiết kế [Figma Prototype](https://www.figma.com/design/aDrOkzbnQFP94a7EEBeq6u/RentMate).
   - Kiểm tra kiểu dữ liệu: `npm run typecheck`.
   - Kiểm tra đóng gói: `npm run build`.
4. **Đẩy nhánh lên GitHub:**
   ```bash
   git push origin feat/ten-tinh-nang
   ```
5. **Mở Pull Request vào nhánh `staging`:**
   - Đặt tiêu đề rõ ràng khớp với commit chính.
   - Nội dung PR phải liên kết với GitHub Issue tương ứng (ví dụ: `Closes #12` hoặc `Refs #15`).
   - Mô tả tóm tắt: Những thay đổi đã thực hiện, màn hình/component bị ảnh hưởng, ảnh chụp giao diện thực tế (screenshot nếu có).
   - Không tự ý thêm các phần việc ngoài phạm vi Issue.

### 5.2. Phối hợp với đội Backend & Thống nhất API Contract
- **Khi API Backend chưa sẵn sàng:**
  - Frontend được phép sử dụng mock data để tiếp tục hoàn thiện giao diện và tương tác người dùng.
  - Mock data phải được tách riêng (trong `mockData.ts` hoặc mock service), không hardcode trong component.
  - Tuyệt đối không tự suy đoán hoặc áp đặt API Contract theo ý kiến cá nhân.
- **Khi cần thay đổi cấu trúc dữ liệu API:**
  - Lập trình viên Frontend phải trao đổi và thống nhất trực tiếp với 2 thành viên Backend trước khi sửa đổi cấu trúc gọi API.
  - Không tự ý mở PR thay đổi API endpoints hoặc response schema khi chưa có sự đồng thuận từ Backend.

### 5.3. Xử lý xung đột mã nguồn (Merge Conflict)
- Nếu nhánh `staging` trên remote có thay đổi mới trong khi bạn đang làm việc:
  ```bash
  git checkout staging
  git pull origin staging
  git checkout feat/ten-tinh-nang
  git merge staging   # hoặc git rebase staging nếu quen thuộc
  ```
- Giải quyết xung đột cục bộ một cách cẩn trọng.
- **Tuyệt đối không được ghi đè (overwrite) hoặc xóa bỏ mã nguồn của thành viên khác** mà không có sự trao đổi, thống nhất trước.

---

## 6. Checklist Review trước khi Merge PR

Trước khi phê duyệt và hợp nhất một Pull Request vào `staging`, người review (ít nhất 1 thành viên khác trong nhóm) và người tạo PR cần rà soát:

- [ ] **Mã nguồn biên dịch thành công:** `npm run typecheck` và `npm run build` đều chạy đạt mã thoát 0.
- [ ] **Giao diện chuẩn xác:** Khớp với bố cục, màu sắc và trạng thái trên Figma Prototype.
- [ ] **Tương thích thiết bị:** Giao diện hiển thị tốt trên cả màn hình Desktop và Mobile (Responsive).
- [ ] **Tính sạch sẽ:** Không có file `.env`, file log, `node_modules` hay file tạm của hệ điều hành lọt vào PR.
- [ ] **Clean Code:** Không có console.log debug thừa, code được format nhất quán, không lặp code không cần thiết.
- [ ] **Phê duyệt:** Nhận được ít nhất 1 phê duyệt (Approval) từ thành viên trong nhóm.
