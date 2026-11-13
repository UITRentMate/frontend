# FE-06 — Bàn giao triển khai frontend

Ngày: 13/11/2026. Issue: [UITRentMate/backend#6](https://github.com/UITRentMate/backend/issues/6).

## Phạm vi và nguồn

- Triển khai tại checkout frontend, route `/landlord/properties` có sẵn.
- Đọc `AGENT.md`, `.agent/rules/`, các skill frontend/API/UI UX/code-reviewer và hướng dẫn FE-06 được cung cấp.
- Đối chiếu design context và ảnh Figma `159:602`, modal phòng `161:2883` thuộc `161:2121`, modal khu `163:4356` thuộc `163:3594`.
- Tài liệu `7-auth-user-endpoint-proposal.md` là đề xuất contract auth/user, không phải yêu cầu sửa authentication trong FE-06.

## Ma trận nghiệm thu

| AC | Trạng thái và bằng chứng |
| --- | --- |
| AC-01 | Đã dựng trang và hai modal theo design context, dùng token/font và asset Figma tải cục bộ. **Chưa nghiệm thu trực quan**: chưa có screenshot ứng dụng hoặc đối chiếu desktop/tablet/mobile. |
| AC-02 | Có 6 fixture phòng với đủ Trống / Giữ chỗ / Đang thuê / Bảo trì; mã, tầng, ảnh, giá, khách, chỉ số điện nước và ghi chú riêng. Có fallback khi thiếu/lỗi ảnh. |
| AC-03 | Logic search theo mã/tên phòng và tên khách, trim + không phân biệt hoa thường; kết hợp AND với trạng thái/tầng/khu, đếm kết quả và xóa lọc. Kiểm thử logic pass; chưa thao tác trình duyệt. |
| AC-04 | Hai form có validation cạnh trường, error ARIA, trạng thái pending, reset khi mở lại, lưu mock và chuyển từ tạo khu sang thêm phòng. Modal có ESC/backdrop/X/Hủy, focus trap và phục hồi focus. Kiểm thử validation/service pass; **chưa nghiệm thu tương tác modal trực tiếp**. |
| AC-05 | Không đổi route/layout/chrome; page chỉ lắp ráp `PropertyManagement`. Kiểm tra mã route xác nhận một `OwnerLayout` dưới guard landlord. Chưa kiểm tra sidebar mobile bằng trình duyệt. |
| AC-06 | Centralized Types, Query Key Factory, typecheck, production build và diff whitespace pass. |
| AC-07 | **Chưa đạt**: bản triển khai được chuẩn bị để commit cục bộ trên `feat/fe-06-property-room-management`, tạo từ `origin/staging` tại `06c370c` sau khi cập nhật remote. Chưa push/tạo PR/review/merge; PR base `staging` cần ít nhất một thành viên review. |

## Các nhóm file thay đổi

- `src/features/properties/`: model khu trọ, fixture, service bộ nhớ, Query Key Factory/hook, validation địa chỉ, trang quản lý và modal thêm khu.
- `src/features/rooms/types/roomManagement.ts`, `managementConstants.ts`, `utils/roomManagement.ts`, `components/{RoomManagementCard,AddRoomModal,ManagementPhotoStrip}.tsx`: model/card quản lý riêng, lọc/validation phòng, modal phòng, ảnh mẫu. Giữ nguyên public `Room`, `RoomCard`, service và hook tìm phòng.
- `src/assets/property-management/`: ảnh/SVG cục bộ từ Figma; không dùng URL asset tạm khi chạy ứng dụng. SVG giữ kích thước gốc, ảnh phòng dùng crop trong khung.
- `src/styles/propertyManagement.css`: style có phạm vi riêng; grid 3/2/1 cột, bộ lọc wrap, body modal cuộn, footer truy cập được trên viewport nhỏ.
- `src/pages/landlord/LandlordPropertiesPage.tsx`: thay bản sơ bộ bằng page lắp ráp mỏng.
- `src/components/ui/Modal.tsx`, `src/types/ui.types.ts`: thêm hai size tùy chọn, ID tiêu đề riêng, giữ overflow trước đó, focus ban đầu/trap/khôi phục focus; không thay size mặc định.
- `src/components/ui/Input.tsx`: liên kết lỗi với input bằng `aria-invalid`/`aria-describedby`.
- `scripts/test-fe06.mjs`: kiểm thử bằng Node 24 và built-in test runner, không thêm package.

## Giả định đã chọn

1. Mock store riêng trong bộ nhớ và TanStack Query cache, luôn dùng mock cho FE-06; không HTTP/database/localStorage. Reload reset fixture. Fixtures dashboard vẫn độc lập.
2. Tỷ lệ lấp đầy = phòng đang thuê / tổng phòng trong khu. Phòng sẵn sàng = phòng trống, bao gồm phòng chưa đăng tin. Doanh thu dự tính = tổng giá tháng của phòng đang thuê, chưa tính điện/nước/cọc. Chỉ số và số đếm chip tính trên toàn khu, không đổi theo search/tầng/trạng thái. Đây là quy ước demo, không phải business rule/API contract.
3. Diện tích hữu hạn > 0, sức chứa là số nguyên an toàn > 0. Tầng phải thuộc danh sách tầng của khu; tầng trệt dùng `0`. Mã phòng duy nhất theo trim + không phân biệt hoa thường trong cùng khu. Không áp đặt giá, ảnh hay giới hạn số phòng.
4. Khu mới được gán một lựa chọn tầng trệt `[0]` để demo thêm phòng, không triển khai quản lý tầng. Khu mẫu Bình Thạnh không có phòng để thử empty state.
5. Địa chỉ dùng danh mục mock theo cách chia trong Figma, không đại diện danh mục hành chính cập nhật; đổi thành phố/quận sẽ xóa lựa chọn con.
6. Các ảnh trong modal chỉ minh họa thiết kế, không tự gắn vào đối tượng mới. Nút thêm ảnh disabled kèm giải thích. Không upload/preview file; không cần object URL. Chú thích 10MB theo Figma chưa được coi là validation file chính thức.
7. Tạo khu chọn khu mới và mở modal thêm phòng. Tạo phòng đặt Trống + Đã ẩn, giá `null` và hiển thị “Chưa cấu hình”. Áp dụng mẫu P.201 chỉ copy tiện ích của P.201 trong cùng khu; nếu không có thì disabled.
8. Lưu & Cấu hình giá ngay lưu phòng mock rồi thông báo cấu hình giá sẽ tích hợp sau. Excel, danh sách, cài đặt/nội quy, cấu hình giá, hợp đồng, duyệt cọc và cập nhật bảo trì chỉ phản hồi “chưa hỗ trợ”, không báo lưu nghiệp vụ thành công.
9. Form reset khi unmount/đóng; không cho đóng trong lúc mutation pending để tránh kết quả xuất hiện sau khi hủy. Thông báo kết quả hiển thị tại live region trên trang, lỗi service trong modal.

## Kiểm tra đã thực hiện

| Lệnh | Kết quả |
| --- | --- |
| `node .agent/skills/unipass-frontend/scripts/validate_centralized_types.js` | Exit 0, không vi phạm |
| `node .agent/skills/api-conventions/scripts/verify_query_keys.js` | Exit 0, không cảnh báo key hardcode |
| `npm.cmd run typecheck` | Exit 0 |
| `npm.cmd run build` | Exit 0; Vite cảnh báo chunk JS >500kB |
| `node --test scripts/test-fe06.mjs` | 4 nhóm pass, 0 fail; Node 24 thông báo API stripTypeScriptTypes còn experimental |
| `git diff --check` | Exit 0 |
| `git status --short` | File task modified/untracked, không stage/commit |

PowerShell chặn `npm.ps1` theo Execution Policy; dùng `npm.cmd` chạy cùng script, không đổi policy. Tải asset ban đầu bị giới hạn network trong sandbox; tải lại thành công bằng quyền network được xét duyệt. Không cài dependency.

Kiểm thử logic bao gồm: từng trạng thái; mã/tên khách với khoảng trắng/hoa thường; kết hợp lọc; empty và clear; số rỗng/0/âm/không hữu hạn; sức chứa thập phân; tầng không tồn tại; mã trùng cùng khu và mã giống ở khu khác; địa chỉ sai quan hệ; snapshot không làm sửa store; thêm khu/phòng đúng quan hệ và hai submit mã trùng đồng thời chỉ thành công một lần.

## Kiểm thử UI còn lại

Công cụ Computer Use dừng vì không xác định được URL hiện tại của Edge đủ tin cậy để áp dụng policy. Không có screenshot ứng dụng và không tuyên bố pass các thao tác UI chưa chạy. Không dùng ảnh Figma làm ảnh nghiệm thu ứng dụng.

Chạy `npm.cmd run dev`, dùng tài khoản demo landlord trong màn hình đăng nhập rồi mở `/landlord/properties`:

- Chụp trang và hai modal ở desktop; so typography, spacing, ảnh, grid, navigation active với Figma.
- Thử search/filter/tầng/khu kết hợp, xóa lọc, khu không có phòng; xác nhận số liệu.
- Thử X/Hủy/ESC/backdrop, click nội dung, vòng Tab/Shift+Tab, focus trở về nút mở; mở lại không còn giá trị/lỗi cũ.
- Submit rỗng/sai/đúng, mã trùng, copy tiện ích P.201, tạo khu → thêm phòng và cả hai nút lưu; xác nhận phản hồi mock và số đếm.
- Thử tablet/mobile 768px/390px, footer và nội dung modal cuộn, không tràn ngang; hồi quy modal dashboard dùng chung và màn hình tìm phòng công khai.
- Kiểm tra Network không có request CRUD/upload từ FE-06, tải lại reset dữ liệu.

## Nội dung PR chuẩn bị sẵn

**Title:** `feat: implement FE-06 property and room management UI`

**Base:** `staging`

**Body:**

```markdown
Refs UITRentMate/backend#6

Thay trang quản lý sơ bộ bằng ngữ cảnh khu trọ, bốn chỉ số, card phòng đủ bốn trạng thái và search/filter trên mock. Thêm modal tạo khu/phòng có validation, lưu trong bộ nhớ và phản hồi rõ ràng cho chức năng chưa hỗ trợ; tái sử dụng OwnerLayout, Modal và atomic UI hiện có.

Validation: Centralized Types, Query Key Factory, typecheck, build, diff check và 4 nhóm kiểm thử logic pass. Chưa nghiệm thu screenshot/responsive/tương tác trình duyệt do Computer Use không xác định được URL Edge. Cần kiểm tra hồi quy focus/scroll các modal dashboard dùng chung trước khi merge.

Xem docs/issues/FE-06-handoff.md để biết giả định mock, công thức chỉ số và checklist UI còn lại. Chưa có CRUD/API/upload thật; không thay authentication hay public RoomCard.
```

Không đánh dấu toàn bộ issue hoàn tất trước khi nghiệm thu UI và PR được review/merge.
