// Run with Node 24: node --test scripts/test-fe06.mjs
// Built-in hooks resolve the app's TS aliases and treat image imports as URLs.
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { registerHooks, stripTypeScriptTypes } from 'node:module';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { test } from 'node:test';

const root = fileURLToPath(new URL('../', import.meta.url));
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith('@/') || specifier.startsWith('.')) {
      const candidate = specifier.startsWith('@/')
        ? path.join(root, 'src', specifier.slice(2))
        : fileURLToPath(new URL(specifier, context.parentURL));
      const resolved = [candidate, `${candidate}.ts`, path.join(candidate, 'index.ts')].find((entry) => existsSync(entry) && /\.(ts|svg|png)$/.test(entry));
      if (resolved) return { url: pathToFileURL(resolved).href, shortCircuit: true };
    }
    return nextResolve(specifier, context);
  },
  load(url, context, nextLoad) {
    if (/\.(svg|png)$/.test(url)) return { format: 'module', source: `export default ${JSON.stringify(url)};`, shortCircuit: true };
    if (url.endsWith('.ts')) return { format: 'module', source: stripTypeScriptTypes(readFileSync(fileURLToPath(url), 'utf8')), shortCircuit: true };
    return nextLoad(url, context);
  },
});

const { MOCK_PROPERTY_MANAGEMENT } = await import('../src/features/properties/services/mockData.ts');
const { filterManagedRooms, validateRoomForm } = await import('../src/features/rooms/utils/roomManagement.ts');
const { validatePropertyForm } = await import('../src/features/properties/utils/validation.ts');
const { mockPropertyManagementService: service } = await import('../src/features/properties/services/mockPropertyManagementService.ts');
const rooms = MOCK_PROPERTY_MANAGEMENT.rooms;
const roomInput = { code: 'P.203', floor: '2', area: '25.5', capacity: '2', amenities: ['WC khép kín'] };
const propertyInput = { name: '  Khu mới  ', city: 'TP. Hồ Chí Minh', district: 'TP. Thủ Đức', ward: 'Phường Linh Trung', street: '  12 Đường số 8  ', amenities: ['Camera 24/7'], gateMode: 'free', safetyRules: ['Trật tự sau 22:00'] };

test('Search normalizes case/whitespace and combines status/floor with AND', () => {
  assert.equal(filterManagedRooms(rooms, ' P.201 ', 'all', 'all')[0].code, 'P.201');
  assert.equal(filterManagedRooms(rooms, ' TRẦN HỮU ', 'occupied', '1')[0].code, 'P.102');
  assert.equal(filterManagedRooms(rooms, '', 'vacant', 'all').length, 2);
  assert.equal(filterManagedRooms(rooms, '', 'reserved', 'all').length, 1);
  assert.equal(filterManagedRooms(rooms, '', 'occupied', 'all').length, 2);
  assert.equal(filterManagedRooms(rooms, '', 'maintenance', 'all').length, 1);
  assert.equal(filterManagedRooms(rooms, 'P.201', 'occupied', 'all').length, 0);
  assert.equal(filterManagedRooms(rooms, '', 'vacant', '1').length, 0);
  assert.equal(filterManagedRooms(rooms, 'không tồn tại', 'all', 'all').length, 0);
  assert.equal(filterManagedRooms(rooms, '  ', 'all', 'all').length, 6);
  assert.equal(filterManagedRooms([], '', 'all', 'all').length, 0);
  assert.equal(rooms.length, 6);
});

test('Room validation: required, positive numbers, integer capacity, floor and scoped duplicates', () => {
  assert.deepEqual(validateRoomForm(roomInput, rooms, 'green-campus', [1, 2, 3]), {});
  for (const area of ['', '0', '-1', 'NaN', 'Infinity']) assert.ok(validateRoomForm({ ...roomInput, area }, rooms, 'green-campus', [1, 2, 3]).area);
  for (const capacity of ['', '0', '-1', '1.5', 'NaN', 'Infinity']) assert.ok(validateRoomForm({ ...roomInput, capacity }, rooms, 'green-campus', [1, 2, 3]).capacity);
  assert.ok(validateRoomForm({ ...roomInput, code: '  ' }, rooms, 'green-campus', [1, 2, 3]).code);
  assert.ok(validateRoomForm({ ...roomInput, code: '  p.201  ' }, rooms, 'green-campus', [1, 2, 3]).code);
  assert.equal(validateRoomForm({ ...roomInput, code: 'P.201' }, rooms, 'green-garden', [1, 2, 3]).code, undefined);
  assert.ok(validateRoomForm(roomInput, rooms, 'green-campus', []).floor);
  assert.ok(validateRoomForm({ ...roomInput, floor: '9' }, rooms, 'green-campus', [1, 2, 3]).floor);
});

test('Property validation: required address and consistent mock address hierarchy', () => {
  assert.deepEqual(validatePropertyForm(propertyInput), {});
  for (const field of ['name', 'city', 'district', 'ward', 'street']) assert.ok(validatePropertyForm({ ...propertyInput, [field]: ' ' })[field]);
  assert.ok(validatePropertyForm({ ...propertyInput, district: 'Quận Bình Thạnh' }).ward);
});

test('Mock submits preserve property relationship, hidden/vacant state, no invented prices, detached snapshots and duplicate protection', async () => {
  const first = await service.getOverview();
  first.data.rooms.length = 0;
  assert.equal((await service.getOverview()).data.rooms.length, 6);
  const created = await service.createProperty(propertyInput);
  const property = created.data.properties.at(-1);
  assert.equal(property.name, 'Khu mới');
  assert.deepEqual(property.floors, [0]);
  propertyInput.amenities.push('Sân phơi');
  assert.equal((await service.getOverview()).data.properties.at(-1).amenities.length, 1);
  await assert.rejects(service.createRoom({ propertyId: 'missing', values: roomInput }));
  await assert.rejects(service.createRoom({ propertyId: property.id, values: roomInput }));
  const values = { ...roomInput, floor: '0', code: '  P.201  ' };
  const results = await Promise.allSettled([service.createRoom({ propertyId: property.id, values }), service.createRoom({ propertyId: property.id, values })]);
  assert.equal(results.filter((result) => result.status === 'fulfilled').length, 1);
  const state = (await service.getOverview()).data;
  const room = state.rooms.at(-1);
  assert.equal(room.propertyId, property.id);
  assert.equal(room.code, 'P.201');
  assert.equal(room.status, 'vacant');
  assert.equal(room.isPublished, false);
  assert.equal(room.monthlyRent, null);
  assert.equal(room.image, undefined);
  assert.equal(MOCK_PROPERTY_MANAGEMENT.rooms.length, 6);
});
