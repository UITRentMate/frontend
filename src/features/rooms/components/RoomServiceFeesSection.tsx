import { useState } from 'react';

import { Button } from '@/components/ui';

import type { RoomServiceFeesSectionProps } from '../types';

export function RoomServiceFeesSection({
  serviceFees,
  feeAmountInputs,
  error,
  onToggleFee,
  onFeeAmountChange,
  onAddFee,
  onValidationError,
}: RoomServiceFeesSectionProps) {
  const [isAddingFee, setIsAddingFee] = useState(false);
  const [newFeeName, setNewFeeName] = useState('');
  const [newFeeAmount, setNewFeeAmount] = useState('');
  const [newFeeUnit, setNewFeeUnit] = useState('/phòng');

  const handleAddCustomFee = () => {
    const trimmedName = newFeeName.trim();
    const parsedAmount = Number(newFeeAmount);
    if (!trimmedName || !newFeeAmount.trim() || !Number.isFinite(parsedAmount) || parsedAmount < 0) {
      onValidationError('Nhập tên phụ phí và đơn giá hợp lệ (>= 0).');
      return;
    }

    onAddFee(trimmedName, parsedAmount, newFeeUnit.trim() || '/phòng');
    setNewFeeName('');
    setNewFeeAmount('');
    setNewFeeUnit('/phòng');
    setIsAddingFee(false);
    onValidationError(undefined);
  };

  return (
    <section>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="flex items-center gap-2 font-heading text-sm font-bold text-text-primary before:h-4 before:w-1 before:rounded-pill before:bg-brand-500 before:content-['']">
          Phụ phí dịch vụ định kỳ
        </h3>
        <button
          type="button"
          onClick={() => setIsAddingFee((previous) => !previous)}
          className="cursor-pointer text-xs font-semibold text-brand-500 hover:text-brand-600"
        >
          {isAddingFee ? 'Đóng thêm phụ phí' : '+ Thêm phụ phí khác'}
        </button>
      </div>

      {isAddingFee && (
        <div className="mb-3 grid grid-cols-1 gap-2 rounded-lg border border-brand-200 bg-brand-50/40 p-3 sm:grid-cols-[1fr_120px_90px_auto]">
          <input
            type="text"
            placeholder="Tên phụ phí (VD: Vệ sinh chung)"
            value={newFeeName}
            onChange={(e) => setNewFeeName(e.target.value)}
            className="rounded-sm border border-border-subtle bg-white px-2.5 py-1.5 text-xs text-text-primary"
          />
          <input
            type="number"
            min="0"
            step="5000"
            placeholder="Đơn giá (đ)"
            value={newFeeAmount}
            onChange={(e) => setNewFeeAmount(e.target.value)}
            className="rounded-sm border border-border-subtle bg-white px-2.5 py-1.5 text-xs text-text-primary"
          />
          <input
            type="text"
            placeholder="/phòng"
            value={newFeeUnit}
            onChange={(e) => setNewFeeUnit(e.target.value)}
            className="rounded-sm border border-border-subtle bg-white px-2.5 py-1.5 text-xs text-text-primary"
          />
          <Button type="button" size="sm" onClick={handleAddCustomFee}>
            Thêm
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {serviceFees.map((fee) => (
          <div
            key={fee.id}
            className={`flex flex-col gap-2 rounded-lg border p-3 transition ${
              fee.enabled
                ? 'border-border-subtle bg-canvas/50'
                : 'border-border-subtle/70 bg-white opacity-70'
            }`}
          >
            <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-text-primary">
              <input
                type="checkbox"
                checked={fee.enabled}
                onChange={() => onToggleFee(fee.id)}
                className="size-4 shrink-0 cursor-pointer accent-brand-500"
              />
              <span className="truncate">{fee.name}</span>
            </label>
            <div className="flex items-center justify-between gap-1">
              <input
                type="number"
                min="0"
                step="5000"
                aria-label={`Đơn giá ${fee.name}`}
                disabled={!fee.enabled}
                value={feeAmountInputs[fee.id] ?? String(fee.amount)}
                onChange={(e) => onFeeAmountChange(fee.id, e.target.value)}
                className="w-24 rounded-xs border border-transparent bg-transparent font-heading text-sm font-bold text-text-primary focus:border-brand-300 focus:bg-white focus:px-1.5 focus:outline-none disabled:text-text-disabled"
              />
              <span className="shrink-0 text-[11px] text-text-muted">đ {fee.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {error && <span className="mt-2 block text-[11px] text-danger">{error}</span>}
    </section>
  );
}
