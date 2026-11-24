/**
 * Kiểm tra URL ảnh đại diện nằm trong danh sách scheme an toàn trước khi đưa vào <img src>
 */
export function isSafeAvatarUrl(url?: string | null): url is string {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (!trimmed) return false;

  if (trimmed.startsWith('https://') || trimmed.startsWith('blob:')) {
    return true;
  }
  if (import.meta.env.DEV && trimmed.startsWith('http://')) {
    return true;
  }
  return /^data:image\/(jpeg|png);base64,/i.test(trimmed);
}
