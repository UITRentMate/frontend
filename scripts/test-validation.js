import assert from 'node:assert';
import {
  parseDate,
  formatDateToDMY,
  validateTourDate,
  validateSlotSelection,
  generateDynamicDateOptions,
} from '../src/features/schedule-tour/utils/validation.ts';
import {
  validateMoveInDate,
  validateTenantCount,
} from '../src/features/rental-request/utils/validation.ts';
import {
  validateBookingConfirmationTerms,
  calculateMonthlyFixedTotal,
} from '../src/features/booking-confirmation/utils/validation.ts';

console.log('🧪 Running Schedule Tour, Rental Request & Booking Confirmation validation unit tests...');

// 1. parseDate tests
const valid = parseDate('25/12/2026');
assert(valid !== null, 'Should parse valid date');
assert.strictEqual(valid.getDate(), 25);
assert.strictEqual(valid.getMonth(), 11);
assert.strictEqual(valid.getFullYear(), 2026);

const invalidLeap = parseDate('29/02/2025');
assert.strictEqual(invalidLeap, null, 'Should reject 29/02 in non-leap year');

const invalidFormat = parseDate('2026-12-25');
assert.strictEqual(invalidFormat, null, 'Should reject non DD/MM/YYYY format');

const invalidAlphanumeric = parseDate('25abc/12/2026');
assert.strictEqual(invalidAlphanumeric, null, 'Should reject non-numeric day/month/year segments');

const invalidFebDay = parseDate('31/02/2026');
assert.strictEqual(invalidFebDay, null, 'Should reject impossible calendar dates like 31/02');

// 2. formatDateToDMY tests
const testDate = new Date(2026, 9, 24);
assert.strictEqual(formatDateToDMY(testDate), '24/10/2026');

// 3. validateTourDate tests
const emptyDateErr = validateTourDate('');
assert.strictEqual(emptyDateErr, 'Vui lòng chọn hoặc nhập ngày muốn xem phòng.');

const invalidTextDateErr = validateTourDate('abc');
assert.strictEqual(
  invalidTextDateErr,
  'Ngày xem phòng không hợp lệ (định dạng chuẩn: DD/MM/YYYY).'
);

const pastDateErr = validateTourDate('01/01/2020');
assert.strictEqual(pastDateErr, 'Ngày xem phòng không thể là ngày trong quá khứ.');

const futureYear = new Date().getFullYear() + 1;
const validFutureDate = `10/10/${futureYear}`;
const validErr = validateTourDate(validFutureDate);
assert.strictEqual(validErr, null, 'Should accept valid future date');

// 4. validateSlotSelection tests
const emptySlotsErr = validateSlotSelection([]);
assert.strictEqual(emptySlotsErr, 'Vui lòng chọn ít nhất 1 khung giờ xem phòng.');

const exceedSlotsErr = validateSlotSelection(['slot-1', 'slot-2', 'slot-3', 'slot-4']);
assert.strictEqual(exceedSlotsErr, 'Bạn chỉ có thể chọn tối đa 3 khung giờ xem phòng.');

const validSlotsErr = validateSlotSelection(['slot-1', 'slot-2']);
assert.strictEqual(validSlotsErr, null, 'Should accept 1 to 3 valid slots');

// 5. generateDynamicDateOptions tests
const opts = generateDynamicDateOptions();
assert.strictEqual(opts.length, 4, 'Should generate 4 dynamic date options');
assert(opts[0].dateValue.length > 0, 'First option should have non-empty dateValue');
assert.strictEqual(opts[0].label, 'HÔM NAY', 'First option should be HÔM NAY');
assert.strictEqual(opts[1].label, 'NGÀY MAI', 'Second option should be NGÀY MAI');
for (let i = 2; i < opts.length; i++) {
  const parsedOpt = parseDate(opts[i].dateValue);
  assert(parsedOpt !== null, `Option ${i} should have valid dateValue`);
  const isWeekend = parsedOpt.getDay() === 0 || parsedOpt.getDay() === 6;
  if (isWeekend) {
    assert.strictEqual(opts[i].label, 'CUỐI TUẦN', `Weekend option ${i} should be labeled CUỐI TUẦN`);
  } else {
    assert.notStrictEqual(opts[i].label, 'CUỐI TUẦN', `Weekday option ${i} should not be labeled CUỐI TUẦN`);
  }
}

// 6. Rental Request validation tests
const emptyMoveInErr = validateMoveInDate('');
assert.strictEqual(emptyMoveInErr, 'Vui lòng nhập ngày dự kiến dọn vào ở.');

const pastMoveInErr = validateMoveInDate('01/01/2020');
assert.strictEqual(pastMoveInErr, 'Ngày dự kiến vào ở không thể là ngày trong quá khứ.');

const validMoveInDate = `01/01/${futureYear}`;
const validMoveInErr = validateMoveInDate(validMoveInDate);
assert.strictEqual(validMoveInErr, null, 'Should accept future valid date');

const zeroTenantErr = validateTenantCount(0, 4);
assert.strictEqual(zeroTenantErr, 'Số người ở tối thiểu là 1 người.');

const exceedTenantErr = validateTenantCount(5, 4);
assert.strictEqual(exceedTenantErr, 'Số người ở vượt quá giới hạn cho phép (tối đa 4 người).');

const validTenant = validateTenantCount(2, 4);
assert.strictEqual(validTenant, null, 'Should accept valid tenant count within room capacity');

// 7. Booking Confirmation validation tests
const unconfirmedTermsErr = validateBookingConfirmationTerms(false);
assert.strictEqual(
  unconfirmedTermsErr,
  'Vui lòng kiểm tra thông tin và tích xác nhận trước khi tiếp tục thanh toán.'
);

const confirmedTermsErr = validateBookingConfirmationTerms(true);
assert.strictEqual(confirmedTermsErr, null, 'Should accept confirmed booking terms');

assert.strictEqual(calculateMonthlyFixedTotal(4500000, 150000), 4650000);
assert.strictEqual(calculateMonthlyFixedTotal(Number.NaN, 150000), 150000);

console.log('✅ All validation unit tests passed successfully!');
