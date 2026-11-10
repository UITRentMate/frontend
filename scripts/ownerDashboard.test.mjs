import assert from 'node:assert/strict';
import fs from 'node:fs';
import { registerHooks } from 'node:module';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath, pathToFileURL } from 'node:url';

// Node 24 strips TypeScript natively; resolve the same aliases as Vite without a test dependency.
const root = fileURLToPath(new URL('../', import.meta.url));
registerHooks({
  resolve(specifier, context, nextResolve) {
    const candidate = specifier.startsWith('@/')
      ? path.join(root, 'src', specifier.slice(2))
      : specifier.startsWith('.') && context.parentURL?.startsWith('file:')
        ? path.resolve(path.dirname(fileURLToPath(context.parentURL)), specifier)
        : null;
    if (candidate) {
      for (const resolved of [candidate, `${candidate}.ts`, path.join(candidate, 'index.ts')]) {
        if (fs.existsSync(resolved) && fs.statSync(resolved).isFile()) {
          return nextResolve(pathToFileURL(resolved).href, context);
        }
      }
    }
    return nextResolve(specifier, context);
  },
});

const { ownerDashboardApi: api } = await import('../src/features/ownerDashboard/api/ownerDashboardApi.ts');
const { mockOwnerDashboard: fixture } = await import('../src/features/ownerDashboard/services/mockData.ts');
const original = structuredClone(fixture);

test('dashboard sample operations preserve valid state and reject invalid transitions', async (t) => {
  await t.test('loading is visible and callers cannot mutate the service snapshot', async () => {
    const started = performance.now();
    const response = await api.getOverview();
    assert.ok(performance.now() - started >= 450);
    assert.equal(response.success, true);
    assert.ok(response.message && response.timestamp);
    response.data.summary.appointments[0].title = 'caller change';
    assert.notEqual((await api.getOverview()).data.summary.appointments[0].title, 'caller change');
  });

  await t.test('completed appointments cannot be confirmed twice or rescheduled', async () => {
    await assert.rejects(api.confirmAppointment('missing'));
    const response = await api.confirmAppointment('viewing-p201');
    assert.equal(response.data.summary.appointments.find((item) => item.id === 'viewing-p201').status, 'completed');
    assert.equal(response.data.tasks.find((task) => task.id === 'new-appointments').count,
      original.tasks.find((task) => task.id === 'new-appointments').count - 1);
    await assert.rejects(api.confirmAppointment('viewing-p201'));
    await assert.rejects(api.rescheduleAppointment({ id: 'viewing-p201', time: '16:00' }));
  });

  await t.test('rescheduling validates time and keeps the schedule chronological', async () => {
    await assert.rejects(api.rescheduleAppointment({ id: 'maintenance-p102', time: '25:00' }));
    const response = await api.rescheduleAppointment({ id: 'maintenance-p102', time: '08:15' });
    assert.equal(response.data.summary.appointments[0].id, 'maintenance-p102');
    assert.equal(response.data.summary.appointments[0].time, '08:15');
  });

  await t.test('reconciliation removes a receipt once without changing mixed-type revenue', async () => {
    const response = await api.reconcileReceipt('receipt-p301');
    assert.equal(response.data.summary.receipts.length, original.summary.receipts.length - 1);
    assert.deepEqual(response.data.stats, original.stats);
    await assert.rejects(api.reconcileReceipt('receipt-p301'));
  });

  await t.test('utilities reject invalid rooms and readings and count each room once', async () => {
    await assert.rejects(api.saveUtilities({ roomCode: 'P.103', electricity: 10, water: 1 }));
    await assert.rejects(api.saveUtilities({ roomCode: 'P.202', electricity: NaN, water: 1 }));
    const first = await api.saveUtilities({ roomCode: 'P.202', electricity: 101.5, water: 12 });
    const second = await api.saveUtilities({ roomCode: 'P.202', electricity: 102, water: 12 });
    assert.equal(first.data.stats.utilityReadings, original.stats.utilityReadings + 1);
    assert.equal(second.data.stats.utilityReadings, first.data.stats.utilityReadings);
    assert.deepEqual(second.data.summary.property.rooms.find((room) => room.code === 'P.202').utilityReading,
      { electricity: 102, water: 12 });
  });

  await t.test('new receipts validate input and prevent duplicate pending entries', async () => {
    const receipt = { tenantName: '  Test tenant  ', roomCode: 'P.202', detail: '  Test transfer  ', amount: 2500000 };
    const response = await api.createReceipt(receipt);
    assert.equal(response.data.summary.receipts[0].tenantName, 'Test tenant');
    assert.equal(response.data.summary.receipts[0].detail, 'Test transfer');
    await assert.rejects(api.createReceipt(receipt));
    await assert.rejects(api.createReceipt({ ...receipt, amount: -1 }));
    await assert.rejects(api.createReceipt({ ...receipt, roomCode: 'missing', detail: 'other' }));
  });

  assert.deepEqual(fixture, original, 'sample fixture must remain unchanged by every operation');
});
