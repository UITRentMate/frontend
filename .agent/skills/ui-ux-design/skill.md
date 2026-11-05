---
name: ui-ux-design
description: "Kỹ năng thiết kế UI Modern Campus & Trust-Driven cho RentMate: Royal Campus Blue #1B2CC1, Mint Green #10B981, Canvas dịu mắt #F2F8FF, Midnight Navy shadows, Be Vietnam Pro & Plus Jakarta Sans."
---

# Kỹ Năng Thiết Kế UI Modern Campus & Trust-Driven (UI/UX Design Skill)

Kỹ năng này hướng dẫn AI Agent áp dụng chính xác hệ thống thiết kế (Design System), typography và trải nghiệm người dùng của **RentMate** dựa trên đặc tả kỹ thuật tại `RentMate System Design.md`.

## 1. Nguyên Tắc Trực Quan Cốt Lõi
1. **Cool Soft-Glare & High Legibility:** Sử dụng nền xanh phấn `--bg-canvas` (`#F2F8FF`) và chữ Midnight Navy `--text-primary` (`#091540`) thay cho nền trắng chói và đen tuyền cơ học (`#000000`). Chống mỏi mắt hiệu quả cho sinh viên khi tra cứu phòng trọ hoặc đồ dùng ban đêm tại KTX.
2. **Typography Chuẩn Unicode:**
   - **Headings:** `Be Vietnam Pro` (600, 700) sắc nét tiếng Việt.
   - **Body & UI:** `Plus Jakarta Sans` (400, 500, 600, 700) thoáng mắt, hiện đại.
3. **Soft Geometry:** Bo góc từ `8px` (`rounded-sm`), `10px` (`rounded-md`), `14px` (`rounded-lg`) đến `pill` (`9999px`). Tuyệt đối không dùng góc nhọn sắc cạnh `0px – 4px`.
4. **Midnight Navy Soft Shadow:** Bóng đổ pha từ sắc xanh đêm `rgba(9, 21, 64, ...)`, hòa quyện trong trẻo trên nền canvas Ice Blue.
5. **Campus Transparency:** Luôn hiển thị tên trường đại học, khu vực KTX (`KTX Khu A`, `KTX Khu B`...) và độ mới sản phẩm.

## 2. Thao Tác Chuẩn Khi Xây Dựng Component

### Bước 1: Tra cứu Token trong `src/styles/index.css`
- Tuyệt đối không đoán mã hex tùy tiện. Sử dụng semantic classes:
  - Màu thương hiệu chính: `bg-brand-500`, `text-brand-500`, `hover:bg-brand-600`, `bg-brand-50`.
  - Màu sinh thái/đổi đồ: `bg-secondary-500`, `text-secondary-600`, `bg-secondary-50`.
  - Nền & Thẻ: `bg-canvas`, `bg-surface-card`, `bg-surface-muted`, `border-border-subtle`.
  - Chữ: `text-text-primary`, `text-text-muted`, `text-text-disabled`.
  - Bo góc: `rounded-xs`, `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-pill`.

### Bước 2: Bố trí Badges & Metadata
- Đổi đồ / Tặng 0đ: Dạng `Badge variant="trade"` hoặc `Badge variant="free"`.
- Pass rẻ / Gấp: Dạng `Badge variant="pass"` màu cam vàng `#F59E0B`.
- Độ mới: Dạng `Badge variant="condition"` nền bán trong suốt `rgba(9, 21, 64, 0.75)` chữ trắng.
- Địa điểm Campus: Luôn kèm icon định vị `📍` và tên KTX/Trường học.

### Bước 3: Tương tác & Micro-interactions
- Hover thẻ sản phẩm: Áp dụng class `card-hover` (`transform: translateY(-2px); box-shadow: var(--shadow-soft-md)`).
- Click nút bấm: Áp dụng class `button-press` (`transform: scale(0.98)`).
- Chuyển tiếp mượt mà: `transition-all duration-150` cho nút bấm, `duration-250` cho thẻ card.

## 3. Tài Liệu Tham Khảo (References)
- [Hệ thống thiết kế chi tiết](references/system_design.md)
- [Quy chuẩn UI/UX](references/ui_ux_guidelines.md)
