const ALLOWED_AVATAR_MIME_TYPES = ['image/jpeg', 'image/png'] as const;
const ALLOWED_AVATAR_EXTENSIONS = ['.jpg', '.jpeg', '.png'] as const;
const MAX_AVATAR_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

const hasValidImageExtension = (fileName: string): boolean => {
  const lower = fileName.toLowerCase();
  return ALLOWED_AVATAR_EXTENSIONS.some((ext) => lower.endsWith(ext));
};

const hasValidImageMagicBytes = async (file: File): Promise<boolean> => {
  try {
    const headerBuffer = await file.slice(0, 4).arrayBuffer();
    const bytes = new Uint8Array(headerBuffer);
    if (bytes.length < 4) return false;

    // JPEG magic bytes: FF D8 FF
    const isJpeg = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
    // PNG magic bytes: 89 50 4E 47
    const isPng =
      bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;

    return isJpeg || isPng;
  } catch {
    return false;
  }
};

/**
 * Kiểm tra an toàn tệp ảnh đại diện (kích thước, đuôi file, MIME type và magic bytes)
 * Trả về thông báo lỗi tiếng Việt hoặc null nếu hợp lệ.
 */
export async function validateAvatarFile(file: File): Promise<string | null> {
  if (file.size <= 0) {
    return 'Tệp ảnh không hợp lệ hoặc bị rỗng. Vui lòng chọn ảnh khác.';
  }

  if (file.size > MAX_AVATAR_SIZE_BYTES) {
    return 'Dung lượng ảnh vượt quá 5MB. Vui lòng chọn ảnh có kích thước nhỏ hơn.';
  }

  const isAllowedMime = (ALLOWED_AVATAR_MIME_TYPES as readonly string[]).includes(file.type);
  if (!isAllowedMime || !hasValidImageExtension(file.name)) {
    return 'Định dạng ảnh không hợp lệ. Vui lòng chọn ảnh JPG hoặc PNG.';
  }

  const isValidMagic = await hasValidImageMagicBytes(file);
  if (!isValidMagic) {
    return 'Nội dung tệp không phải ảnh JPG hoặc PNG hợp lệ.';
  }

  return null;
}

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
