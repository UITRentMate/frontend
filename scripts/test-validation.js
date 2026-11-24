import assert from 'node:assert';
import {
  parseDate,
  formatDateToDMY,
  validateTourDate,
  validateSlotSelection,
  generateDynamicDateOptions,
} from '../src/features/schedule-tour/utils/validation.ts';

console.log('🧪 Running Schedule Tour validation unit tests...');

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

// 2. formatDateToDMY tests
const testDate = new Date(2026, 9, 24);
assert.strictEqual(formatDateToDMY(testDate), '24/10/2026');

// 3. validateTourDate tests
const emptyDateErr = validateTourDate('');
assert.strictEqual(emptyDateErr, 'Vui lòng chọn hoặc nhập ngày muốn xem phòng.');

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

console.log('✅ All schedule-tour validation unit tests passed successfully!');
