# RentMate Design System (Modern Campus & Trust-Driven)

- **Project:** RentMate — Nền tảng tìm kiếm, thuê và quản lý phòng trọ sinh viên
- **Brand Primary:** `#1B2CC1` (Royal Campus Blue - Trẻ trung, công nghệ và đáng tin cậy)
- **Style Direction:** Hiện đại, tinh tế, an toàn, giao diện dịu mắt (soft low-glare) và gắn kết cộng đồng học đường sinh viên.

---

## 1) Nguyên lý Thiết kế (Design Principles)

- **Cool Soft-Glare & High Legibility:** Sử dụng nền xanh phấn dịu mắt `--bg-canvas` (`#F2F8FF`) kết hợp với sắc chữ xanh đêm sâu thẳm `--text-primary` (`#091540`) thay cho nền trắng chói và chữ đen tuyền cơ học (`#000000`). Giảm thiểu bức xạ chói, chống mỏi mắt cho sinh viên khi lướt tìm đồ vào ban đêm tại KTX.
- **Soft & Friendly Geometry:** Duy trì hệ bo góc mềm mại (`8px` – `14px`) và dạng viên thuốc (`pill radius`) để xóa bỏ cảm giác khô cứng, tạo thiện cảm gần gũi, khích lệ sinh viên chia sẻ và kết nối bạn bè.
- **Eco-Trade & Campus Transparency:** Đặt trọng tâm vào các hành vi đặc thù: tặng đồ 0đ, trao đổi giáo trình học phần, công khai độ mới sản phẩm và hiển thị rõ ràng địa điểm khuôn viên trường/KTX để giao dịch trực tiếp.
- **Reliable & Fluid Motion:** Chuyển động nâng thẻ nhẹ nhàng (`translateY(-2px)`) kết hợp bóng đổ nhuộm sắc Midnight Navy sâu lắng, tạo cảm giác an tâm, vững chãi trong từng tương tác mua bán và đổi đồ.

---

## 2) Hệ thống Màu sắc (Color System)

### 2.1 Bảng màu cốt lõi (Core Palette)

| Vai trò (Role) | Token | Hex Code | Cấp độ (Step) & Hướng dẫn ứng dụng |
| :--- | :--- | :--- | :--- |
| **Brand Primary** | `--brand-500` | `#1B2CC1` | **Base Color (Step 500)**: Nút hành động chính (Đăng tin, Mua ngay), liên kết quan trọng, trạng thái active. |
| **Brand Hover** | `--brand-600` | `#16239A` | **Step 600**: Hiệu ứng hover cho nút hành động chính. |
| **Brand Active** | `--brand-700` | `#101A74` | **Step 700**: Trạng thái active/nhấn giữ của nút chính. |
| **Brand Light Tint** | `--brand-50` | `#EEF0FF` | **Step 50**: Nền badge danh mục chính, nền hover của secondary link. |
| **Eco / Trade (Secondary)** | `--secondary-500` | `#10B981` | **Base Color (Step 500)**: Nút/nhãn "Đổi đồ", "Tặng 0đ", huy hiệu uy tín, trạng thái thành công. |
| **Eco Hover** | `--secondary-600` | `#059669` | **Step 600**: Hiệu ứng hover cho các nút trao đổi/sinh thái. |
| **Eco Soft Tint** | `--secondary-50` | `#ECFDF5` | **Step 50**: Nền nhãn "Tặng 0đ", nền alert giao dịch thành công. |
| **Accent / Soft Highlight** | `--accent-300` | `#7692FF` | **Base Color (Step 300)**: Điểm nhấn giao diện, chip trạng thái phụ, icon nổi bật. |
| **Background Canvas** | `--bg-canvas` | `#F2F8FF` | **Neutral Step 50**: Nền toàn bộ website (xanh phấn nhẹ dịu, chống mỏi mắt). |
| **Surface Card / Modal** | `--surface-card` | `#FFFFFF` | Nền trắng thẻ sản phẩm, dropdown menu, modal nổi bật trên canvas. |
| **Surface Muted / Inset** | `--surface-muted` | `#D8ECFA` | **Neutral Step 100 (Base)**: Nền ô input nhập liệu, avatar mặc định, thẻ phụ. |
| **Surface Accent Tint** | `--surface-accent` | `#DFE6FF` | **Accent Step 100**: Dải màu chuyển banner, nền nổi bật nhẹ. |
| **Text Primary** | `--text-primary` | `#091540` | **Text Base (Step 700)**: Tiêu đề, tên vật phẩm, giá tiền (xanh đêm đậm, chống mỏi mắt). |
| **Text Secondary / Muted** | `--text-muted` | `#6E7DB4` | **Text Step 300 / B4 Step 400**: Mô tả ngắn, vị trí KTX, thời gian đăng tin. |
| **Text Disabled** | `--text-disabled` | `#9FA8CD` | **Text Step 200**: Văn bản placeholder, nhãn nút bị vô hiệu hóa. |
| **Border / Divider** | `--border-subtle` | `#D8ECFA` | **Neutral Step 100**: Đường viền thẻ, viền phân cách nội dung nhẹ nhàng. |

### 2.2 Màu trạng thái & Phản hồi (Semantic System)

| Trạng thái | Token Base | Hex (500) | Nền Soft (50) | Viền Nhẹ (200) | Hướng dẫn ứng dụng |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Success / Eco** | `--color-success` | `#10B981` | `#ECFDF5` | `#A7F3D0` | Thông báo gửi yêu cầu đổi thành công, nhãn sản phẩm tặng 0đ. |
| **Warning / Alert** | `--color-warning` | `#F59E0B` | `#FFFBEB` | `#FDE68A` | Nhắc nhở hẹn gặp an toàn, badge "Pass gấp", tin chờ duyệt. |
| **Danger / Error** | `--color-danger` | `#EF4444` | `#FEF2F2` | `#FECACA` | Cảnh báo gian lận/lừa đảo, báo cáo bài đăng vi phạm, lỗi form. |
| **Info / Guide** | `--color-info` | `#0EA5E9` | `#F0F9FF` | `#BAE6FD` | Hướng dẫn trao đổi trực tiếp, mẹo kiểm tra đồ dùng sinh viên. |

---

## 3) Kiểu chữ (Typography)

Kết hợp hai bộ font chuẩn Unicode tối ưu hiển thị tiếng Việt, vừa chỉn chu vừa trẻ trung:

- **Heading:** `Be Vietnam Pro` (Cấu trúc chắc chắn, hiển thị dấu tiếng Việt sắc nét, rõ ràng)
- **Body / UI:** `Plus Jakarta Sans` (Nét bo cong hiện đại, độ thoáng tốt, dễ đọc danh mục và thông số)

```css
@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
```

### Thang đo kiểu chữ (Type Scale)

| Token | Font Family | Size / Line Height | Weight | Màu mặc định | Mục đích sử dụng |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `--text-display` | Be Vietnam Pro | 40px / 48px | Bold (700) | `#091540` | Banner trang chủ: "Dọn KTX - Trao đổi đồ cũ" |
| `--text-h1` | Be Vietnam Pro | 32px / 40px | Bold (700) | `#091540` | Tiêu đề trang chi tiết sản phẩm, hồ sơ cá nhân |
| `--text-h2` | Be Vietnam Pro | 24px / 32px | Semibold (600) | `#091540` | Tiêu đề khối chuyên mục ("Tặng 0đ", "Giáo trình KTX") |
| `--text-h3` | Be Vietnam Pro | 18px / 26px | Semibold (600) | `#091540` | Tiêu đề thẻ sản phẩm, tiêu đề modal/hộp thoại |
| `--text-body-lg` | Plus Jakarta Sans | 16px / 24px | Regular (400) | `#091540` | Mô tả chi tiết vật phẩm, điều khoản trao đổi |
| `--text-body` | Plus Jakarta Sans | 15px / 22px | Regular (400) | `#1C2B59` | Nội dung mô tả thẻ sản phẩm, text form field |
| `--text-body-sm` | Plus Jakarta Sans | 13px / 18px | Regular (400) | `#6E7DB4` | Vị trí KTX, tên trường đại học, thời gian đăng |
| `--text-caption` | Plus Jakarta Sans | 12px / 16px | Medium (500) | `#1B2CC1` / `#10B981` | Badge độ mới ("Mới 95%"), tag danh mục |

---

## 4) Hệ thống Bóng đổ (Navy Soft Shadow System)

Toàn bộ bóng đổ được tạo từ sắc xanh đêm **Midnight Navy `#091540`** để hòa trộn tự nhiên và trong trẻo trên nền Ice Blue:

| Token | Giá trị | Ứng dụng |
| :--- | :--- | :--- |
| `--shadow-soft-xs` | `0 1px 3px rgba(9, 21, 64, 0.04)` | Tag danh mục, chip trạng thái nhỏ |
| `--shadow-soft-sm` | `0 2px 8px rgba(9, 21, 64, 0.06)` | Thẻ sản phẩm ở trạng thái nghỉ, thanh tìm kiếm |
| `--shadow-soft-md` | `0 4px 16px rgba(9, 21, 64, 0.10)` | Thẻ sản phẩm khi hover, dropdown menu bộ lọc |
| `--shadow-soft-lg` | `0 8px 26px rgba(9, 21, 64, 0.14)` | Modal trao đổi đồ, popup xác nhận giao dịch |
| `--shadow-focus` | `0 0 0 3px rgba(27, 44, 193, 0.20)` | Vòng glow khi focus ô input hoặc nút bấm |

---

## 5) Hệ thống Bo góc (Border Radius System)

Hệ bo góc mềm mại, gần gũi, loại bỏ hoàn toàn các góc sắc nhọn:

| Token | Giá trị | Ứng dụng |
| :--- | :--- | :--- |
| `--radius-xs` | `6px` | Checkbox, nhãn độ mới ("Mới 90%"), tag nhỏ |
| `--radius-sm` | `8px` | Ô input, thanh search, nút phụ, toast notification |
| `--radius-md` | `10px` | Nút chính (Primary/Eco Button), dropdown menu |
| `--radius-lg` | `14px` | Thẻ sản phẩm (Product Card), thẻ danh mục |
| `--radius-xl` | `20px` | Modal giao dịch, bottom sheet trên mobile, banner lớn |
| `--radius-pill` | `9999px` | Badges tình trạng ("Đổi đồ", "0đ"), chip lọc KTX, avatar |

---

## 6) Hiệu ứng & Chuyển động (Effects & Motion)

### Surface Effects
- Phân tách section bằng khoảng cách (white-space) thay cho viền kẻ phân đoạn cứng.
- Sử dụng viền mảnh nhẹ nhàng khi cần bao khung: `border: 1px solid var(--border-subtle)` (`#D8ECFA`).
- Nền banner nổi bật sử dụng chuyển màu êm dịu:
  ```css
  background: linear-gradient(180deg, #F2F8FF 0%, #EEF0FF 100%);
  ```

### Interaction Effects
- **Hover State:** Thẻ sản phẩm và nút bấm nhấc nhẹ: `transform: translateY(-2px);` kết hợp chuyển bóng từ `--shadow-soft-sm` sang `--shadow-soft-md`.
- **Press State:** Co nhẹ khi click: `transform: scale(0.98);`.
- **Transitions:**
  - Nhanh (Buttons, Icons, Links): `150ms ease-out`
  - Tiêu chuẩn (Card hover, Accordion, Modal): `250ms cubic-bezier(0.25, 0.8, 0.25, 1)`

---

## 7) Quy chuẩn Thành phần Giao diện (Component-Level Rules)

### 7.1 Nút bấm (Buttons)
- **Primary Button (Đăng tin, Mua ngay, Gửi yêu cầu):**
  - Nền `#1B2CC1`, chữ `#FFFFFF`, bo góc `10px` (`--radius-md`).
  - Hover: Nền `#16239A`, `transform: translateY(-1px)`.
  - Active: Nền `#101A74`, `transform: scale(0.98)`.
- **Secondary / Outline Button (Lọc danh mục, Nhắn tin):**
  - Nền trong suốt hoặc `#FFFFFF`, viền `1.5px solid #1B2CC1`, chữ `#1B2CC1`, bo góc `10px`.
  - Hover: Nền `#EEF0FF`.
- **Eco / Trade Button (Đặc thù: "Đổi đồ", "Nhận tặng 0đ"):**
  - Nền `#10B981`, chữ `#FFFFFF`, bo góc `10px`.
  - Hover: Nền `#059669`.
- **Disabled Button:**
  - Nền `#CFD3E6`, chữ `#9FA8CD`, con trỏ `not-allowed`.

### 7.2 Thẻ sản phẩm (Product Cards)
- **Khung thẻ:** Nền `#FFFFFF`, viền `1px solid #D8ECFA`, bo góc `14px` (`--radius-lg`), `overflow: hidden`, bóng `--shadow-soft-sm`.
- **Ảnh sản phẩm (Thumbnail):** Tỉ lệ 1:1 hoặc 4:3. Khi sản phẩm đã hoàn tất giao dịch, giảm `opacity: 0.5` kèm overlay chữ *"Đã giao lưu"*.
- **Hệ thống Badges trên ảnh:**
  - **Góc trên (Loại giao dịch - Dạng pill):**
    - Đổi đồ: Nền `#10B981`, chữ trắng.
    - Pass rẻ / Gấp: Nền `#F59E0B`, chữ trắng.
    - Tặng miễn phí 0đ: Nền `#059669`, chữ trắng.
  - **Góc dưới (Độ mới):** Nền `rgba(9, 21, 64, 0.75)`, chữ trắng, bo góc `6px` (`--radius-xs`), VD: *"Mới 95%"*.
- **Nội dung thẻ:**
  - **Tên vật phẩm:** Màu `#091540`, font-weight 600, tối đa 2 dòng (`line-clamp-2`).
  - **Giá / Nhu cầu đổi:** Màu `#1B2CC1`, font-size `16px`, font-weight 700 (hoặc hiển thị: *"Giao lưu giáo trình C++"*).
  - **Metadata người đăng:** Avatar nhỏ + Tên sinh viên + Icon định vị KTX/Cơ sở trường (VD: *KTX Khu B, ĐHQG*), màu `#6E7DB4`, font-size `13px`.

### 7.3 Ô nhập liệu & Thanh tìm kiếm Campus (Inputs & Search Bar)
- **Trạng thái mặc định:** Nền `#FFFFFF` (hoặc `#D8ECFA` dạng inset), viền `1px solid #CFD3E6`, bo góc `8px` (`--radius-sm`), chữ `#091540`, placeholder `#9FA8CD`.
- **Trạng thái Focus:** Viền `1.5px solid #1B2CC1`, bóng `--shadow-focus`.
- **Trạng thái Lỗi:** Viền `1.5px solid #EF4444`, thông báo lỗi bên dưới màu `#EF4444`, font-size `12px`.
- **Campus Search Bar:** Tích hợp icon kính lúp màu `#6E7DB4`, hỗ trợ ghim chip lọc nhanh theo khu vực: *Khu A, Khu B, Cơ sở 1*.

### 7.4 Hộp nhắc nhở an toàn sinh viên (Campus Safety Alerts)
- **Alert An toàn giao dịch trực tiếp:** Nền `#FFFBEB`, viền `1px solid #FDE68A`, bo góc `10px` (`--radius-md`), icon khiên/bóng đèn màu `#F59E0B`. Văn bản màu `#78350F`:
  > *"Nên hẹn gặp trực tiếp tại sảnh KTX hoặc căn tin trường để kiểm tra đồ trước khi trao đổi."*
- **Alert Cảnh báo rủi ro / Lừa đảo:** Nền `#FEF2F2`, viền `1px solid #FECACA`, icon & text màu `#EF4444` / `#7F1D1D`.

### 7.5 Thông báo nổi (Toast Notifications)
- Nền `#FFFFFF`, bo góc `8px` (`--radius-sm`), viền trái `4px solid`, bóng `--shadow-soft-lg`.
- **Success:** Viền trái & icon `#10B981`.
- **Error:** Viền trái & icon `#EF4444`.
- **Warning / Đề nghị đổi đồ:** Viền trái & icon `#F59E0B`.
- **Info / Tin nhắn mới:** Viền trái & icon `#0EA5E9`.

---

## 8) Quy tắc Tránh (Anti-Patterns)

- **Không dùng màu đen thuần `#000000`:** Dùng sắc `#091540` (Midnight Navy Step 700) để giữ nét hiện đại, chiều sâu và chống chói lóa.
- **Không dùng bóng đổ màu đen thô (`rgba(0,0,0,...)`):** Toàn bộ shadow phải được pha từ sắc xanh đêm `rgba(9, 21, 64, ...)`.
- **Không dùng góc bo sắc nhọn (0px – 4px):** Tránh tạo cảm giác khô khan; duy trì hệ bo góc từ `8px` trở lên để tạo cảm giác thân thiện.
- **Không làm ẩn thông tin trường / ký túc xá:** Vị trí khuôn viên là yếu tố quyết định để sinh viên trao đổi đồ trực tiếp và tiết kiệm phí ship.

---

## 9) Ghi chú Triển khai (Implementation Note)

Cấu hình mẫu trên **Tailwind CSS (`tailwind.config.js`)**:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#EEF0FF',
          500: '#1B2CC1',
          600: '#16239A',
          700: '#101A74',
        },
        canvas: '#F2F8FF',
        surface: {
          card: '#FFFFFF',
          muted: '#D8ECFA',
          accent: '#DFE6FF',
        },
        text: {
          primary: '#091540',
          muted: '#6E7DB4',
          disabled: '#9FA8CD',
        },
        eco: {
          50: '#ECFDF5',
          500: '#10B981',
          600: '#059669',
        },
      },
      borderRadius: {
        xs: '6px',
        sm: '8px',
        md: '10px',
        lg: '14px',
        xl: '20px',
      },
    },
  },
};
```