import {
  parseDate,
  formatDateToDMY,
  validateTourDate,
  validateSlotSelection,
  generateDynamicDateOptions,
} from '../validation';

/**
 * Unit tests for schedule-tour validation & date helpers
 */
export function runScheduleTourValidationTests(): boolean {
  // 1. parseDate tests
  const valid = parseDate('25/12/2026');
  if (!valid || valid.getDate() !== 25 || valid.getMonth() !== 11 || valid.getFullYear() !== 2026) {
    throw new Error('parseDate failed on valid date string "25/12/2026"');
  }

  const invalidLeap = parseDate('29/02/2025');
  if (invalidLeap !== null) {
    throw new Error('parseDate failed to reject 29/02 in non-leap year');
  }

  const invalidFormat = parseDate('2026-12-25');
  if (invalidFormat !== null) {
    throw new Error('parseDate failed to reject non DD/MM/YYYY format');
  }

  // 2. formatDateToDMY tests
  const testDate = new Date(2026, 9, 24); // 24/10/2026
  if (formatDateToDMY(testDate) !== '24/10/2026') {
    throw new Error('formatDateToDMY failed');
  }

  // 3. validateTourDate tests
  const emptyDateErr = validateTourDate('');
  if (emptyDateErr !== 'Vui lòng chọn hoặc nhập ngày muốn xem phòng.') {
    throw new Error(`validateTourDate failed on empty date, got: ${emptyDateErr}`);
  }

  const pastDateErr = validateTourDate('01/01/2020');
  if (pastDateErr !== 'Ngày xem phòng không thể là ngày trong quá khứ.') {
    throw new Error(`validateTourDate failed on past date, got: ${pastDateErr}`);
  }

  const futureYear = new Date().getFullYear() + 1;
  const validFutureDate = `10/10/${futureYear}`;
  const validErr = validateTourDate(validFutureDate);
  if (validErr !== null) {
    throw new Error(`validateTourDate failed on valid future date, got: ${validErr}`);
  }

  // 4. validateSlotSelection tests
  const emptySlotsErr = validateSlotSelection([]);
  if (emptySlotsErr !== 'Vui lòng chọn ít nhất 1 khung giờ xem phòng.') {
    throw new Error(`validateSlotSelection failed on empty array, got: ${emptySlotsErr}`);
  }

  const exceedSlotsErr = validateSlotSelection(['slot-1', 'slot-2', 'slot-3', 'slot-4']);
  if (exceedSlotsErr !== 'Bạn chỉ có thể chọn tối đa 3 khung giờ xem phòng.') {
    throw new Error(`validateSlotSelection failed on >3 slots, got: ${exceedSlotsErr}`);
  }

  const validSlotsErr = validateSlotSelection(['slot-1', 'slot-2']);
  if (validSlotsErr !== null) {
    throw new Error(`validateSlotSelection failed on valid slots count, got: ${validSlotsErr}`);
  }

  // 5. generateDynamicDateOptions tests
  const opts = generateDynamicDateOptions();
  if (!Array.isArray(opts) || opts.length !== 4) {
    throw new Error('generateDynamicDateOptions should return 4 options');
  }
  if (!opts[0].label || !opts[0].dateValue) {
    throw new Error('generateDynamicDateOptions items should have label and dateValue');
  }

  return true;
}
