# RENTMATE AGENT PLUGINS

Thư mục này lưu trữ các plugin và phần mở rộng (extensions) tích hợp dành riêng cho dự án **RentMate**.

## Cấu Trúc Một Plugin
Mỗi plugin nằm trong một thư mục con và bắt buộc có tệp định nghĩa `plugin.json`:

```text
plugins/
└── <plugin-name>/
    ├── plugin.json         # Tệp manifest định nghĩa plugin (bắt buộc)
    ├── README.md           # Hướng dẫn sử dụng plugin
    ├── skills/             # (Tùy chọn) Kỹ năng đi kèm
    ├── agents/             # (Tùy chọn) Custom subagents đi kèm
    └── rules/              # (Tùy chọn) Rules đi kèm
```

## Mẫu Cấu Hình `plugin.json`
```json
{
  "name": "rentmate-dev-tools",
  "version": "1.0.0",
  "description": "Bộ công cụ mở rộng hỗ trợ phát triển dự án RentMate",
  "author": "RentMate Team",
  "skills": ["skills/"],
  "rules": ["rules/"]
}
```
