// Compatible with Node.js 20.19+ / 22 LTS / 24+: npm test
// Uses node:module register() with tests/ts-loader.mjs to resolve @/ aliases, TS files, and assets.
import assert from 'node:assert/strict';
import { register } from 'node:module';
import { test } from 'node:test';

register('./ts-loader.mjs', import.meta.url);

const { MOCK_PROPERTY_MANAGEMENT } = await import('../src/features/properties/services/mockData.ts');
const { filterManagedRooms, validateRoomForm, validateRoomPricingForm } = await import(
  '../src/features/rooms/utils/roomManagement.ts'
);
const { validatePropertyForm, validatePropertySettings } = await import(
  '../src/features/properties/utils/validation.ts'
);
const { mockPropertyManagementService: service } = await import(
  '../src/features/properties/services/mockPropertyManagementService.ts'
);

const rooms = MOCK_PROPERTY_MANAGEMENT.rooms;
const roomInput = { code: 'P.203', floor: '2', area: '25.5', capacity: '2', amenities: ['WC khép kín'] };
const propertyInput = {
  name: '  Khu mới  ',
  city: 'TP. Hồ Chí Minh',
  district: 'TP. Thủ Đức',
  ward: 'Phường Linh Trung',
  street: '  12 Đường số 8  ',
  amenities: ['Camera 24/7'],
  gateMode: 'free',
  safetyRules: ['Trật tự sau 22:00'],
};

async function withMockedApiClient(run) {
  const originalLocalStorage = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
  const originalSessionStorage = Object.getOwnPropertyDescriptor(globalThis, 'sessionStorage');
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: { getItem: () => null } });
  Object.defineProperty(globalThis, 'sessionStorage', { configurable: true, value: { getItem: () => null } });

  const { default: axios } = await import('axios');
  const { apiClient } = await import('../src/lib/apiClient.ts');
  const { createMockAdapter } = await import('../src/api/mockAdapter.ts');
  const previousAdapter = apiClient.defaults.adapter;
  apiClient.defaults.adapter = createMockAdapter(axios.getAdapter(previousAdapter));

  try {
    const { propertyApi } = await import('../src/features/properties/api/propertyApi.ts');
    await run(propertyApi);
  } finally {
    apiClient.defaults.adapter = previousAdapter;
    if (originalLocalStorage) Object.defineProperty(globalThis, 'localStorage', originalLocalStorage);
    else delete globalThis.localStorage;
    if (originalSessionStorage) Object.defineProperty(globalThis, 'sessionStorage', originalSessionStorage);
    else delete globalThis.sessionStorage;
  }
}

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
  for (const area of ['', '0', '-1', 'NaN', 'Infinity']) {
    assert.ok(validateRoomForm({ ...roomInput, area }, rooms, 'green-campus', [1, 2, 3]).area);
  }
  for (const capacity of ['', '0', '-1', '1.5', 'NaN', 'Infinity']) {
    assert.ok(validateRoomForm({ ...roomInput, capacity }, rooms, 'green-campus', [1, 2, 3]).capacity);
  }
  assert.ok(validateRoomForm({ ...roomInput, code: '  ' }, rooms, 'green-campus', [1, 2, 3]).code);
  assert.ok(validateRoomForm({ ...roomInput, code: '  p.201  ' }, rooms, 'green-campus', [1, 2, 3]).code);
  assert.equal(validateRoomForm({ ...roomInput, code: 'P.201' }, rooms, 'green-garden', [1, 2, 3]).code, undefined);
  assert.ok(validateRoomForm(roomInput, rooms, 'green-campus', []).floor);
  assert.ok(validateRoomForm({ ...roomInput, floor: '9' }, rooms, 'green-campus', [1, 2, 3]).floor);
});

test('Property validation: required address and consistent mock address hierarchy', () => {
  assert.deepEqual(validatePropertyForm(propertyInput), {});
  for (const field of ['name', 'city', 'district', 'ward', 'street']) {
    assert.ok(validatePropertyForm({ ...propertyInput, [field]: ' ' })[field]);
  }
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
  const results = await Promise.allSettled([
    service.createRoom({ propertyId: property.id, values }),
    service.createRoom({ propertyId: property.id, values }),
  ]);
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

test('Property API uses the shared Axios mock adapter and normalizes mutation failures', async () => {
  await withMockedApiClient(async (propertyApi) => {
    const overview = await propertyApi.getOverview();
    assert.equal(overview.success, true);
    assert.ok(overview.timestamp);
    const created = await propertyApi.createProperty({ ...propertyInput, name: 'API property' });
    const property = created.data.properties.at(-1);
    const input = { propertyId: property.id, values: { ...roomInput, floor: '0' } };
    const saved = await propertyApi.createRoom(input);
    assert.equal(saved.data.rooms.at(-1).propertyId, property.id);
    assert.equal(saved.data.rooms.at(-1).status, 'vacant');
    assert.equal(saved.data.rooms.at(-1).monthlyRent, null);
    await assert.rejects(propertyApi.createRoom(input), (error) => {
      assert.equal(error.statusCode, 422);
      assert.ok(error.message);
      return true;
    });
    assert.equal((await propertyApi.getOverview()).data.rooms.length, overview.data.rooms.length + 1);
  });
});

test('FE-06 mock adapter delegates other feature requests to the HTTP adapter', async () => {
  const { createMockAdapter } = await import('../src/api/mockAdapter.ts');
  let delegatedConfig;
  const adapter = createMockAdapter(async (config) => {
    delegatedConfig = config;
    return { data: { ok: true }, status: 200, statusText: 'OK', headers: {}, config };
  });
  const config = { method: 'get', url: '/auth/me', headers: {} };
  const response = await adapter(config);
  assert.equal(delegatedConfig, config);
  assert.deepEqual(response.data, { ok: true });
});

test('Property settings validation and API gateway update rules & block archive with active rooms', async () => {
  const validSettings = {
    name: 'Nhà trọ Xanh - Cập nhật',
    city: 'TP. Hồ Chí Minh',
    district: 'TP. Thủ Đức',
    ward: 'Phường Linh Trung',
    street: 'KP6, Đường số 8',
    amenities: ['Thang máy', 'Camera 24/7'],
    gateMode: 'scheduled',
    visitorRules: ['Rời đi trước 22:30'],
    safetyRules: ['Cấm bếp than/gas mini'],
    quietPetRules: ['Yên tĩnh 22:00 - 06:30'],
    isArchived: false,
  };
  assert.deepEqual(validatePropertySettings(validSettings), {});
  assert.ok(validatePropertySettings({ ...validSettings, name: '   ' }).name);

  await withMockedApiClient(async (propertyApi) => {
    const updated = await propertyApi.updatePropertySettings({
      propertyId: 'green-campus',
      values: validSettings,
    });
    const campus = updated.data.properties.find((item) => item.id === 'green-campus');
    assert.equal(campus.name, 'Nhà trọ Xanh - Cập nhật');
    assert.equal(campus.gateMode, 'scheduled');
    assert.deepEqual(campus.visitorRules, ['Rời đi trước 22:30']);

    await assert.rejects(
      propertyApi.updatePropertySettings({
        propertyId: 'green-campus',
        values: { ...validSettings, isArchived: true },
      }),
      (error) => {
        assert.equal(error.statusCode, 422);
        return true;
      },
    );
  });
});

test('Room pricing validation and API gateway update pricing, water per-person mode & copy to other vacant rooms', async () => {
  const pricingValues = {
    monthlyRent: '3700000',
    depositAmount: '3700000',
    electricityRate: '3800',
    waterBillingMode: 'person',
    waterRate: '22000',
    waterPerPersonRate: '120000',
    serviceFees: [
      { id: 'trash', name: 'Rác sinh hoạt', amount: 30000, unit: '/phòng', enabled: true },
      { id: 'wifi', name: 'Internet / Wifi', amount: 50000, unit: '/phòng', enabled: true },
    ],
    isPublished: true,
  };
  assert.deepEqual(validateRoomPricingForm(pricingValues), {});
  assert.ok(validateRoomPricingForm({ ...pricingValues, monthlyRent: '0' }).monthlyRent);
  assert.ok(
    validateRoomPricingForm({ ...pricingValues, waterBillingMode: 'person', waterPerPersonRate: '-5' })
      .waterPerPersonRate,
  );

  await withMockedApiClient(async (propertyApi) => {
    const saved = await propertyApi.updateRoomPricing({
      propertyId: 'green-campus',
      roomId: 'room-201',
      values: pricingValues,
      copyToOtherRooms: true,
    });
    const room201 = saved.data.rooms.find((item) => item.id === 'room-201');
    const room301 = saved.data.rooms.find((item) => item.id === 'room-301');
    const room102 = saved.data.rooms.find((item) => item.id === 'room-102');
    assert.equal(room201.monthlyRent, 3700000);
    assert.equal(room201.electricityRate, 3800);
    assert.equal(room201.waterBillingMode, 'person');
    assert.equal(room201.waterPerPersonRate, 120000);
    assert.equal(room301.monthlyRent, 3700000);
    assert.equal(room301.waterBillingMode, 'person');
    assert.equal(room301.waterPerPersonRate, 120000);
    assert.equal(room102.monthlyRent, 3200000);
  });
});
