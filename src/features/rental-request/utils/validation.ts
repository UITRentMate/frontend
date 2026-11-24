export function parseDate(dateStr: string): Date | null {
  const parts = dateStr.trim().split('/');
  if (parts.length !== 3) return null;
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);

  if (isNaN(day) || isNaN(month) || isNaN(year)) return null;
  const date = new Date(year, month, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
}

export function validateMoveInDate(dateStr: string): string | null {
  if (!dateStr || !dateStr.trim()) {
    return 'Vui lòng nhập ngày dự kiến dọn vào ở.';
  }

  const parsed = parseDate(dateStr);
  if (!parsed) {
    return 'Ngày vào ở không hợp lệ (định dạng chuẩn: DD/MM/YYYY).';
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (parsed < today) {
    return 'Ngày dự kiến vào ở không thể là ngày trong quá khứ.';
  }

  return null;
}

export function validateTenantCount(count: number, maxTenants: number): string | null {
  if (!count || count < 1) {
    return 'Số người ở tối thiểu là 1 người.';
  }
  if (count > maxTenants) {
    return `Số người ở vượt quá giới hạn cho phép (tối đa ${maxTenants} người).`;
  }
  return null;
}
