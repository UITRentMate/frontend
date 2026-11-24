import { parseDate, validateMoveInDate, validateTenantCount } from '../validation';

/**
 * Unit tests for rental-request form validation logic
 */
export function runValidationTests(): boolean {
  // 1. parseDate tests
  const valid = parseDate('15/12/2026');
  if (!valid || valid.getDate() !== 15 || valid.getMonth() !== 11 || valid.getFullYear() !== 2026) {
    throw new Error('parseDate failed on valid date string "15/12/2026"');
  }

  const invalidLeap = parseDate('29/02/2025');
  if (invalidLeap !== null) {
    throw new Error('parseDate failed to reject 29/02 in non-leap year');
  }

  const invalidFormat = parseDate('2026-12-15');
  if (invalidFormat !== null) {
    throw new Error('parseDate failed to reject non DD/MM/YYYY format');
  }

  const invalidMonth = parseDate('10/13/2026');
  if (invalidMonth !== null) {
    throw new Error('parseDate failed to reject month > 12');
  }

  // 2. validateMoveInDate tests
  const emptyDateErr = validateMoveInDate('');
  if (emptyDateErr !== 'Vui lòng nhập ngày dự kiến dọn vào ở.') {
    throw new Error(`validateMoveInDate failed on empty date, got: ${emptyDateErr}`);
  }

  const pastDateErr = validateMoveInDate('01/01/2020');
  if (pastDateErr !== 'Ngày dự kiến vào ở không thể là ngày trong quá khứ.') {
    throw new Error(`validateMoveInDate failed on past date, got: ${pastDateErr}`);
  }

  const futureYear = new Date().getFullYear() + 1;
  const validFutureDate = `01/01/${futureYear}`;
  const validErr = validateMoveInDate(validFutureDate);
  if (validErr !== null) {
    throw new Error(`validateMoveInDate failed on future date, got: ${validErr}`);
  }

  // 3. validateTenantCount tests
  const zeroErr = validateTenantCount(0, 4);
  if (zeroErr !== 'Số người ở tối thiểu là 1 người.') {
    throw new Error(`validateTenantCount failed on 0 tenants, got: ${zeroErr}`);
  }

  const exceedErr = validateTenantCount(5, 4);
  if (exceedErr !== 'Số người ở vượt quá giới hạn cho phép (tối đa 4 người).') {
    throw new Error(`validateTenantCount failed on exceeding tenants, got: ${exceedErr}`);
  }

  const validTenant = validateTenantCount(2, 4);
  if (validTenant !== null) {
    throw new Error(`validateTenantCount failed on valid count, got: ${validTenant}`);
  }

  return true;
}
