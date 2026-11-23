export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const NUMBER_REGEX = /[0-9]/;
export const SPECIAL_CHAR_REGEX = /[!@#$%^&*(),.?":{}|<>_\-+=[\]\\/;'~`]/;
export const SPECIAL_OR_NUMBER_REGEX = /[0-9!@#$%^&*(),.?":{}|<>_\-+=[\]\\/;'~`]/;

export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 128;

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

export function hasMinPasswordLength(password: string): boolean {
  return password.trim().length >= PASSWORD_MIN_LENGTH;
}

export function hasValidPasswordLength(password: string): boolean {
  return hasMinPasswordLength(password) && password.length <= PASSWORD_MAX_LENGTH;
}

export function hasPasswordNumberOrSpecial(password: string): boolean {
  return SPECIAL_OR_NUMBER_REGEX.test(password);
}
