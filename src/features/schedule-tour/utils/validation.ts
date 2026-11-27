import type { DatePillOption } from '../types';

export function parseDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  const trimmed = dateStr.trim();
  if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(trimmed)) return null;

  const [dayStr, monthStr, yearStr] = trimmed.split('/');
  const day = Number(dayStr);
  const month = Number(monthStr) - 1;
  const year = Number(yearStr);

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

export function formatDateToDMY(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function validateTourDate(dateStr: string): string | null {
  if (!dateStr || !dateStr.trim()) {
    return 'Vui lòng chọn hoặc nhập ngày muốn xem phòng.';
  }

  const parsed = parseDate(dateStr);
  if (!parsed) {
    return 'Ngày xem phòng không hợp lệ (định dạng chuẩn: DD/MM/YYYY).';
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (parsed < today) {
    return 'Ngày xem phòng không thể là ngày trong quá khứ.';
  }

  return null;
}

export function validateSlotSelection(slotIds: string[]): string | null {
  if (!slotIds || slotIds.length === 0) {
    return 'Vui lòng chọn ít nhất 1 khung giờ xem phòng.';
  }
  if (slotIds.length > 3) {
    return 'Bạn chỉ có thể chọn tối đa 3 khung giờ xem phòng.';
  }
  return null;
}

/**
 * Tạo danh sách ngày linh hoạt (Hôm nay, Ngày mai, ...) dựa trên thời gian thực
 */
export function generateDynamicDateOptions(): DatePillOption[] {
  const daysOfWeek = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
  const dayShorts = ['CN', 'T.Hai', 'T.Ba', 'T.Tư', 'T.Năm', 'T.Sáu', 'T.Bảy'];

  const options: DatePillOption[] = [];
  const baseDate = new Date();

  for (let i = 0; i < 4; i++) {
    const cur = new Date(baseDate);
    cur.setDate(baseDate.getDate() + i);

    const isWeekend = cur.getDay() === 0 || cur.getDay() === 6;
    const dayName =
      i === 0
        ? 'HÔM NAY'
        : i === 1
        ? 'NGÀY MAI'
        : isWeekend
        ? 'CUỐI TUẦN'
        : daysOfWeek[cur.getDay()].toUpperCase();

    const shortName = dayShorts[cur.getDay()];
    const dateFormatted = `${shortName}, ${formatDateToDMY(cur)}`;
    const dateValue = formatDateToDMY(cur);

    options.push({
      id: `date-opt-${i + 1}`,
      label: dayName,
      dateFormatted,
      dateValue,
      availableSlotsCount: 4 - (i % 2),
    });
  }

  return options;
}
