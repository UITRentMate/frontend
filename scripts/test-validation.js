import assert from 'node:assert';
import { parseDate, validateMoveInDate, validateTenantCount } from '../src/features/rental-request/utils/validation.ts';

console.log('🧪 Running validation unit tests...');

// 1. parseDate tests
const valid = parseDate('15/12/2026');
assert(valid !== null, 'Should parse valid date');
assert.strictEqual(valid.getDate(), 15);
assert.strictEqual(valid.getMonth(), 11);
assert.strictEqual(valid.getFullYear(), 2026);

const invalidLeap = parseDate('29/02/2025');
assert.strictEqual(invalidLeap, null, 'Should reject 29/02 in non-leap year');

const invalidFormat = parseDate('2026-12-15');
assert.strictEqual(invalidFormat, null, 'Should reject non DD/MM/YYYY format');

const invalidMonth = parseDate('10/13/2026');
assert.strictEqual(invalidMonth, null, 'Should reject month > 12');

// 2. validateMoveInDate tests
const emptyDateErr = validateMoveInDate('');
assert.strictEqual(emptyDateErr, 'Vui lòng nhập ngày dự kiến dọn vào ở.');

const pastDateErr = validateMoveInDate('01/01/2020');
assert.strictEqual(pastDateErr, 'Ngày dự kiến vào ở không thể là ngày trong quá khứ.');

const futureYear = new Date().getFullYear() + 1;
const validFutureDate = `01/01/${futureYear}`;
const validErr = validateMoveInDate(validFutureDate);
assert.strictEqual(validErr, null, 'Should accept future valid date');

// 3. validateTenantCount tests
const zeroErr = validateTenantCount(0, 4);
assert.strictEqual(zeroErr, 'Số người ở tối thiểu là 1 người.');

const exceedErr = validateTenantCount(5, 4);
assert.strictEqual(exceedErr, 'Số người ở vượt quá giới hạn cho phép (tối đa 4 người).');

const validTenant = validateTenantCount(2, 4);
assert.strictEqual(validTenant, null, 'Should accept valid tenant count within room capacity');

console.log('✅ All validation unit tests passed successfully!');
