# RentMate — Frontend

Hệ thống quản lý và cho thuê phòng trọ thông minh — Phân hệ Giao diện Người dùng (Frontend Web Application).

---

## 1. Giới thiệu dự án

**RentMate** là nền tảng hỗ trợ toàn diện vòng đời thuê và quản lý phòng trọ: từ tìm kiếm phòng, đặt lịch xem, tạo yêu cầu thuê, giữ chỗ, ký hợp đồng điện tử, quản lý cư trú, ghi nhận chỉ số điện nước, lập hóa đơn, thanh toán từng phần, quản lý công nợ, báo cáo sự cố, giải quyết khiếu nại, cho đến tìm kiếm người ở ghép và đối soát thanh lý hợp đồng.

- **Môn học:** SE100 — Phát triển phần mềm hướng đối tượng
- **Đơn vị:** Trường Đại học Công nghệ Thông tin (UIT) — ĐHQG TP.HCM
- **Nhóm thực hiện:** Nhóm 15 (5 thành viên: 3 Frontend, 2 Backend)
- **Thời hạn dự kiến hoàn thành đồ án:** 27/12/2026
- **Trạng thái hiện tại:** Đã hoàn thành giai đoạn Base Project (Minimal Runnable Bootstrap). Chuẩn bị bước vào Phase 1 phát triển nghiệp vụ. Chưa hoàn thành chức năng nghiệp vụ cụ thể.
- **Tình trạng API Contract:** Hiện đang trong quá trình xây dựng và thống nhất giữa đội Frontend và Backend (chưa chốt chính thức).

---

## 2. Công nghệ sử dụng (Tech Stack)

Mã nguồn Frontend được xây dựng dựa trên các công nghệ thực tế sau:

| Thành phần | Công nghệ / Thư viện | Phiên bản thực tế | Ghi chú |
| :--- | :--- | :---: | :--- |
| **Thư viện UI** | [React](https://react.dev/) | `^19.0.0` | Thư viện xây dựng giao diện người dùng |
| **Ngôn ngữ** | [TypeScript](https://www.typescriptlang.org/) | `~5.8.0` | Ngôn ngữ tĩnh kiểu nghiêm ngặt |
| **Build Tool / Bundler** | [Vite](https://vite.dev/) | `^8.0.0` | Công cụ build và dev server tốc độ cao |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | `^4.0.0` | Utility-first CSS framework via `@tailwindcss/vite` |
| **Môi trường chạy** | [Node.js](https://nodejs.org/) | `>= 24.x` | Runtime JavaScript chuẩn |
| **Package Manager** | [npm](https://www.npmjs.com/) | `>= 10.x` | Quản lý gói phụ thuộc qua `package-lock.json` |

---

## 3. Thiết kế & Prototype Figma

Toàn bộ giao diện người dùng của RentMate được thiết kế và bám sát theo Prototype chính thức trên Figma:

- **Link Figma Prototype:** [RentMate UI Design](https://www.figma.com/design/aDrOkzbnQFP94a7EEBeq6u/RentMate)
- **Các phân hệ chính trong bản thiết kế:**
  - **Khách thuê / Người tìm trọ (Customer):** Tìm kiếm phòng trọ, xem chi tiết, đặt lịch xem, gửi yêu cầu thuê, thanh toán cọc, xem hợp đồng, theo dõi hóa đơn, báo cáo sự cố và hồ sơ ở ghép.
  - **Chủ trọ & Quản trị viên (Owner / Admin):** Quản lý khu trọ, cấu hình phòng, xét duyệt lịch hẹn, quản lý hợp đồng, ghi nhận chỉ số điện nước, lập hóa đơn, đối soát công nợ, xử lý sự cố, giải quyết khiếu nại và bảng điều khiển tổng quan.

---

## 4. Yêu cầu môi trường & Cài đặt

### 4.1. Điều kiện tiên quyết
- **Node.js:** Phiên bản `>= 24.0.0` (khuyến nghị Node.js v24.x LTS).
- **npm:** Phiên bản `>= 10.0.0`.

### 4.2. Cài đặt dependencies
Mở terminal tại thư mục `frontend/` và thực hiện:

- **Khuyến nghị (Clean Install):** Sử dụng `npm ci` để cài đặt phiên bản đồng nhất và chuẩn xác 100% theo file [package-lock.json](package-lock.json):
  ```bash
  npm ci
  ```
- **Tùy chọn:** Sử dụng `npm install` khi cần cập nhật hoặc bổ sung các package mới theo quy trình đã thống nhất:
  ```bash
  npm install
  ```

---

## 5. Các lệnh chạy dự án (Scripts)

Các lệnh phát triển được định nghĩa trong [package.json](package.json):

| Lệnh | Cú pháp | Mục đích |
| :--- | :--- | :--- |
| **Chạy Development Server** | `npm run dev` | Khởi chạy máy chủ phát triển Vite tại `http://localhost:5173` với tính năng Hot Module Replacement (HMR). |
| **Kiểm tra TypeScript (Typecheck)** | `npm run typecheck` | Chạy `tsc -b` kiểm tra kiểu tĩnh toàn bộ source code và cấu hình Vite mà không sinh file xuất. |
| **Biên dịch Production (Build)** | `npm run build` | Thực hiện typecheck (`tsc -b`) và biên dịch bundle tối ưu hóa bằng Vite vào thư mục `dist/`. |
| **Xem trước bản Build (Preview)** | `npm run preview` | Khởi chạy máy chủ cục bộ để xem trước bản build từ thư mục `dist/`. |

---

## 6. Cấu trúc thư mục mã nguồn

Frontend áp dụng kiến trúc **Hybrid (Page-Based Routing + Feature-Based Modules)** nhằm phục vụ hiệu quả cho đội hình 3 lập trình viên Frontend phát triển song song:

```
frontend/
├── public/                 # Tài nguyên tĩnh phục vụ trực tiếp (favicon, assets độc lập)
├── src/
│   ├── app/                # Root component, router chính (App.tsx), global providers
│   ├── assets/             # Hình ảnh, biểu tượng tĩnh được đóng gói qua Vite
│   ├── components/         # UI components dùng chung toàn dự án (Buttons, Modals, Inputs...)
│   ├── features/           # Các module nghiệp vụ tự đóng gói (auth, rooms, contracts...)
│   ├── hooks/              # Custom React hooks dùng chung (useDebounce, useMediaQuery...)
│   ├── lib/                # Cấu hình thư viện ngoài, tiện ích hỗ trợ, API client
│   ├── pages/              # Các trang giao diện hoàn chỉnh ánh xạ theo routes
│   ├── styles/             # Cấu hình style toàn cục (index.css tích hợp Tailwind v4)
│   ├── types/              # Kiểu dữ liệu TypeScript dùng chung toàn hệ thống
│   ├── main.tsx            # Điểm khởi đầu của ứng dụng React (DOM root render)
│   └── vite-env.d.ts       # Khai báo kiểu môi trường client của Vite
├── index.html              # Trang HTML gốc
├── package.json            # Thông tin dependencies và scripts
├── tsconfig.json           # Cấu hình TypeScript gốc (Project References)
├── tsconfig.app.json       # Cấu hình TypeScript cho mã nguồn ứng dụng (`src/`)
├── tsconfig.node.json      # Cấu hình TypeScript cho file cấu hình Vite
└── vite.config.ts          # Cấu hình Vite bundler và plugin Tailwind CSS
```

> Chi tiết quy tắc phân chia thành phần, quy chuẩn đặt tên và hướng dẫn chống Circular Dependency xem tại: [docs/folder_structure.md](docs/folder_structure.md).

---

## 7. Quy tắc đóng góp & Hướng dẫn dành cho AI Agents

- Hướng dẫn quy trình làm việc nhóm, phân chia nhánh, mở Pull Request và checklist review: xem tại [CONTRIBUTING.md](CONTRIBUTING.md).
- Hướng dẫn và quy tắc an toàn dành cho AI Coding Assistants (Antigravity, Cursor, Copilot...): xem tại [AGENT.md](AGENT.md).
