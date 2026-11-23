export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const NUMBER_REGEX = /[0-9]/;
export const SPECIAL_CHAR_REGEX = /[!@#$%^&*(),.?":{}|<>_\-+=[\]\\/;'~`]/;
export const SPECIAL_OR_NUMBER_REGEX = /[0-9!@#$%^&*(),.?":{}|<>_\-+=[\]\\/;'~`]/;
export const PASSWORD_NUMBER_OR_SPECIAL_REGEX = SPECIAL_OR_NUMBER_REGEX;

export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 128;

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

export function hasMinPasswordLength(password: string): boolean {
  return password.trim().length >= PASSWORD_MIN_LENGTH;
}

export function hasValidMaxPasswordLength(password: string): boolean {
  return password.length <= PASSWORD_MAX_LENGTH;
}

export function hasValidPasswordLength(password: string): boolean {
  return hasMinPasswordLength(password) && hasValidMaxPasswordLength(password);
}

export function hasPasswordNumberOrSpecial(password: string): boolean {
  return SPECIAL_OR_NUMBER_REGEX.test(password);
}

export function validateChangePasswordRules(payload: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}): string | null {
  if (!payload.currentPassword) {
    return 'Vui lòng nhập mật khẩu hiện tại.';
  }
  if (!hasMinPasswordLength(payload.newPassword)) {
    return `Mật khẩu mới phải có tối thiểu ${PASSWORD_MIN_LENGTH} ký tự.`;
  }
  if (!hasValidMaxPasswordLength(payload.newPassword)) {
    return `Mật khẩu mới không được vượt quá ${PASSWORD_MAX_LENGTH} ký tự.`;
  }
  if (!hasPasswordNumberOrSpecial(payload.newPassword)) {
    return 'Mật khẩu mới phải bao gồm ít nhất 1 số hoặc ký tự đặc biệt.';
  }
  if (payload.newPassword === payload.currentPassword) {
    return 'Mật khẩu mới không được trùng với mật khẩu hiện tại.';
  }
  if (!payload.confirmPassword) {
    return 'Vui lòng xác nhận mật khẩu mới.';
  }
  if (payload.confirmPassword !== payload.newPassword) {
    return 'Xác nhận mật khẩu mới không trùng khớp.';
  }
  return null;
}
