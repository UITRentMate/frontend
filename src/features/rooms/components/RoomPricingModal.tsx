import { useState } from 'react';
import type { FormEvent } from 'react';

import { rentFormatter } from '@/utils/formatCurrency';

import { Button, CopyIcon, Modal, SearchPlusIcon } from '@/components/ui';

import { DEFAULT_ROOM_SERVICE_FEES } from '../managementConstants';
import type {
  RoomPricingFormErrors,
  RoomPricingFormValues,
  RoomPricingModalProps,
} from '../types';
import { validateRoomPricingForm } from '../utils/roomManagement';
import { RoomServiceFeesSection } from './RoomServiceFeesSection';

export function RoomPricingModal({
  room,
  otherVacantCount,
  isPending,
  error,
  onClose,
  onSubmit,
}: RoomPricingModalProps) {
  const initialFees =
    room.serviceFees && room.serviceFees.length > 0
      ? structuredClone(room.serviceFees)
      : structuredClone(DEFAULT_ROOM_SERVICE_FEES);

  const initialRent = room.monthlyRent !== null ? String(room.monthlyRent) : '';
  const initialDeposit =
    room.depositAmount !== undefined && room.depositAmount !== null
      ? String(room.depositAmount)
      : room.monthlyRent !== null && room.depositMonths
        ? String(room.monthlyRent * room.depositMonths)
        : '';

  const [values, setValues] = useState<RoomPricingFormValues>({
    monthlyRent: initialRent,
    depositAmount: initialDeposit,
    electricityRate: room.electricityRate !== undefined ? String(room.electricityRate) : '3500',
    waterBillingMode: room.waterBillingMode ?? 'meter',
    waterRate: room.waterRate !== undefined ? String(room.waterRate) : '20000',
    waterPerPersonRate:
      room.waterPerPersonRate !== undefined ? String(room.waterPerPersonRate) : '100000',
    serviceFees: initialFees,
    isPublished: room.isPublished,
  });

  const [feeAmountInputs, setFeeAmountInputs] = useState<Record<string, string>>(() =>
    Object.fromEntries(initialFees.map((fee) => [fee.id, String(fee.amount)])),
  );
  const [errors, setErrors] = useState<RoomPricingFormErrors>({});
  const [copyToOtherRooms, setCopyToOtherRooms] = useState(false);

  const rentValue = Number(values.monthlyRent);
  const depositValue = Number(values.depositAmount);
  const depositRatioLabel =
    values.monthlyRent.trim() &&
    values.depositAmount.trim() &&
    Number.isFinite(rentValue) &&
    rentValue > 0 &&
    Number.isFinite(depositValue) &&
    depositValue > 0
      ? `${Number((depositValue / rentValue).toFixed(1))} tháng tiền phòng`
      : 'đ';

  const roomBadgeLabel = `Phòng ${room.code.replace(/^P\./i, '')}`;

  const handleToggleFee = (feeId: string) => {
    setValues((previous) => ({
      ...previous,
      serviceFees: previous.serviceFees.map((fee) =>
        fee.id === feeId ? { ...fee, enabled: !fee.enabled } : fee,
      ),
    }));
  };

  const handleFeeAmountChange = (feeId: string, rawValue: string) => {
    setFeeAmountInputs((previous) => ({ ...previous, [feeId]: rawValue }));
    const trimmed = rawValue.trim();
    const parsed = trimmed === '' ? Number.NaN : Number(trimmed);
    setValues((previous) => ({
      ...previous,
      serviceFees: previous.serviceFees.map((fee) =>
        fee.id === feeId
          ? {
              ...fee,
              amount: Number.isFinite(parsed) && parsed >= 0 ? parsed : Number.NaN,
            }
          : fee,
      ),
    }));
  };

  const handleAddFee = (name: string, amount: number, unit: string) => {
    const id = `custom-${Date.now()}`;
    setFeeAmountInputs((previous) => ({ ...previous, [id]: String(amount) }));
    setValues((previous) => ({
      ...previous,
      serviceFees: [...previous.serviceFees, { id, name, amount, unit, enabled: true }],
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isPending) return;
    const nextErrors = validateRoomPricingForm(values);
    setErrors(nextErrors);
    const firstKey = Object.keys(nextErrors)[0];
    if (firstKey) {
      event.currentTarget.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }
    onSubmit(values, copyToOtherRooms);
  };

  return (
    <Modal
      isOpen
      onClose={onClose}
      ariaLabel={`Cấu hình Giá & Dịch vụ — ${room.code}`}
      size="xl"
      className="max-w-[700px] [&>div:nth-child(2)]:max-h-none [&>div:nth-child(2)]:p-0 [&>div:last-child]:shrink-0"
      footer={
        <div className="flex w-full flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            disabled={otherVacantCount === 0 || isPending}
            aria-pressed={copyToOtherRooms}
            onClick={() => setCopyToOtherRooms((previous) => !previous)}
            title={
              otherVacantCount === 0
                ? 'Không có phòng trống khác trong khu để sao chép.'
                : `Áp dụng bảng giá này cho ${otherVacantCount} phòng trống khác`
            }
            className={`inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-semibold transition ${
              otherVacantCount === 0
                ? 'cursor-not-allowed text-text-disabled'
                : copyToOtherRooms
                  ? 'cursor-pointer bg-brand-50 text-brand-600 ring-1 ring-brand-200'
                  : 'cursor-pointer text-brand-500 hover:bg-brand-50/70'
            }`}
          >
            <CopyIcon className="size-4 shrink-0" />
            <span>
              {copyToOtherRooms
                ? `Sẽ sao chép sang ${otherVacantCount} phòng trống khác`
                : 'Sao chép bảng giá sang các phòng khác'}
            </span>
          </button>

          <div className="ml-auto flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isPending}
              onClick={onClose}
              className="rounded-lg px-4"
            >
              Hủy bỏ
            </Button>
            <Button
              type="submit"
              form="room-pricing-form"
              size="sm"
              isLoading={isPending}
              className="rounded-lg px-5"
            >
              Lưu bảng giá
            </Button>
          </div>
        </div>
      }
    >
      <div className="flex flex-col bg-white">
        <div className="flex flex-wrap items-center gap-3 border-b border-border-subtle px-6 py-4 pr-14">
          <span className="inline-flex items-center rounded-pill border border-success-border bg-success-soft px-3 py-1 text-xs font-semibold text-secondary-600">
            {roomBadgeLabel}
          </span>
          <h2 className="font-heading text-base font-bold text-text-primary sm:text-lg">
            Cấu hình Giá &amp; Dịch vụ — {room.code}
          </h2>
        </div>

        <form
          id="room-pricing-form"
          noValidate
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 p-6"
        >
          <section>
            <h3 className="mb-3 flex items-center gap-2 font-heading text-sm font-bold text-text-primary before:h-4 before:w-1 before:rounded-pill before:bg-brand-500 before:content-['']">
              Tiền phòng &amp; Cọc bảo đảm
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="pricing-monthly-rent"
                  className="mb-1.5 block text-xs font-medium text-text-muted"
                >
                  Giá thuê niêm yết
                </label>
                <div
                  className={`flex items-center rounded-lg border bg-canvas/50 px-3 py-2 focus-within:border-brand-500 focus-within:bg-white ${
                    errors.monthlyRent ? 'border-danger' : 'border-border-subtle'
                  }`}
                >
                  <input
                    id="pricing-monthly-rent"
                    name="monthlyRent"
                    type="number"
                    min="0"
                    step="50000"
                    placeholder="VD: 3500000"
                    value={values.monthlyRent}
                    aria-invalid={Boolean(errors.monthlyRent)}
                    aria-describedby={errors.monthlyRent ? 'pricing-rent-error' : undefined}
                    onChange={(e) => setValues({ ...values, monthlyRent: e.target.value })}
                    className="w-full bg-transparent font-heading text-sm font-bold text-text-primary placeholder:font-normal placeholder:text-text-disabled focus:outline-none"
                  />
                  <span className="shrink-0 pl-2 text-xs text-text-muted">đ/tháng</span>
                </div>
                {errors.monthlyRent ? (
                  <span id="pricing-rent-error" className="mt-1 block text-[11px] text-danger">
                    {errors.monthlyRent}
                  </span>
                ) : (
                  values.monthlyRent.trim() &&
                  Number.isFinite(rentValue) &&
                  rentValue > 0 && (
                    <span className="mt-1 block text-[11px] text-text-muted">
                      Hiển thị: {rentFormatter.format(rentValue)} đ/tháng
                    </span>
                  )
                )}
              </div>

              <div>
                <label
                  htmlFor="pricing-deposit-amount"
                  className="mb-1.5 block text-xs font-medium text-text-muted"
                >
                  Tiền cọc cam kết
                </label>
                <div
                  className={`flex items-center rounded-lg border bg-canvas/50 px-3 py-2 focus-within:border-brand-500 focus-within:bg-white ${
                    errors.depositAmount ? 'border-danger' : 'border-border-subtle'
                  }`}
                >
                  <input
                    id="pricing-deposit-amount"
                    name="depositAmount"
                    type="number"
                    min="0"
                    step="50000"
                    placeholder="VD: 3500000"
                    value={values.depositAmount}
                    aria-invalid={Boolean(errors.depositAmount)}
                    aria-describedby={errors.depositAmount ? 'pricing-deposit-error' : undefined}
                    onChange={(e) => setValues({ ...values, depositAmount: e.target.value })}
                    className="w-full bg-transparent font-heading text-sm font-bold text-text-primary placeholder:font-normal placeholder:text-text-disabled focus:outline-none"
                  />
                  <span className="shrink-0 pl-2 text-xs font-semibold text-brand-500">
                    {depositRatioLabel}
                  </span>
                </div>
                {errors.depositAmount && (
                  <span id="pricing-deposit-error" className="mt-1 block text-[11px] text-danger">
                    {errors.depositAmount}
                  </span>
                )}
              </div>
            </div>
          </section>

          <section>
            <h3 className="mb-3 flex items-center gap-2 font-heading text-sm font-bold text-text-primary before:h-4 before:w-1 before:rounded-pill before:bg-brand-500 before:content-['']">
              Định mức Điện &amp; Nước
            </h3>

            <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="pricing-electricity-rate"
                  className="mb-1.5 block text-xs font-medium text-text-muted"
                >
                  Đơn giá điện
                </label>
                <div
                  className={`flex items-center rounded-lg border bg-canvas/50 px-3 py-2 focus-within:border-brand-500 focus-within:bg-white ${
                    errors.electricityRate ? 'border-danger' : 'border-border-subtle'
                  }`}
                >
                  <input
                    id="pricing-electricity-rate"
                    name="electricityRate"
                    type="number"
                    min="0"
                    step="100"
                    value={values.electricityRate}
                    aria-invalid={Boolean(errors.electricityRate)}
                    aria-describedby={
                      errors.electricityRate ? 'pricing-electricity-error' : undefined
                    }
                    onChange={(e) => setValues({ ...values, electricityRate: e.target.value })}
                    className="w-full bg-transparent font-heading text-sm font-bold text-text-primary focus:outline-none"
                  />
                  <span className="shrink-0 pl-2 text-xs text-text-muted">đ/kWh</span>
                </div>
                {errors.electricityRate && (
                  <span
                    id="pricing-electricity-error"
                    className="mt-1 block text-[11px] text-danger"
                  >
                    {errors.electricityRate}
                  </span>
                )}
              </div>

              <div>
                <span className="mb-1.5 block text-xs font-medium text-text-muted">
                  Hình thức tính tiền nước
                </span>
                <div className="flex flex-col gap-2">
                  <label
                    className={`flex cursor-pointer items-center justify-between gap-2 rounded-lg border px-3 py-2 transition ${
                      values.waterBillingMode === 'meter'
                        ? 'border-brand-200 bg-brand-50/40'
                        : 'border-border-subtle bg-white'
                    }`}
                  >
                    <span className="flex items-center gap-2 text-xs font-semibold text-text-primary">
                      <input
                        type="radio"
                        name="waterBillingMode"
                        checked={values.waterBillingMode === 'meter'}
                        onChange={() => setValues({ ...values, waterBillingMode: 'meter' })}
                        className="size-4 cursor-pointer accent-brand-500"
                      />
                      Theo đồng hồ nước
                    </span>
                    <div className="flex w-28 items-center rounded-sm border border-border-subtle bg-white px-2 py-1">
                      <input
                        name="waterRate"
                        type="number"
                        min="0"
                        step="1000"
                        aria-label="Đơn giá nước theo đồng hồ"
                        disabled={values.waterBillingMode !== 'meter'}
                        value={values.waterRate}
                        onChange={(e) => setValues({ ...values, waterRate: e.target.value })}
                        className="w-full bg-transparent text-right text-xs font-bold text-text-primary focus:outline-none disabled:text-text-disabled"
                      />
                      <span className="shrink-0 pl-1 text-[11px] text-text-muted">đ/m³</span>
                    </div>
                  </label>
                  {errors.waterRate && (
                    <span className="text-[11px] text-danger">{errors.waterRate}</span>
                  )}

                  <label
                    className={`flex cursor-pointer items-center justify-between gap-2 rounded-lg border px-3 py-2 transition ${
                      values.waterBillingMode === 'person'
                        ? 'border-brand-200 bg-brand-50/40'
                        : 'border-border-subtle bg-white'
                    }`}
                  >
                    <span className="flex items-center gap-2 text-xs text-text-secondary">
                      <input
                        type="radio"
                        name="waterBillingMode"
                        checked={values.waterBillingMode === 'person'}
                        onChange={() => setValues({ ...values, waterBillingMode: 'person' })}
                        className="size-4 cursor-pointer accent-brand-500"
                      />
                      Khoán theo đầu người (đ/người)
                    </span>
                    {values.waterBillingMode === 'person' && (
                      <div className="flex w-28 items-center rounded-sm border border-border-subtle bg-white px-2 py-1">
                        <input
                          name="waterPerPersonRate"
                          type="number"
                          min="0"
                          step="10000"
                          aria-label="Đơn giá nước khoán theo người"
                          value={values.waterPerPersonRate}
                          onChange={(e) =>
                            setValues({ ...values, waterPerPersonRate: e.target.value })
                          }
                          className="w-full bg-transparent text-right text-xs font-bold text-text-primary focus:outline-none"
                        />
                        <span className="shrink-0 pl-1 text-[11px] text-text-muted">đ</span>
                      </div>
                    )}
                  </label>
                  {errors.waterPerPersonRate && (
                    <span className="text-[11px] text-danger">{errors.waterPerPersonRate}</span>
                  )}
                </div>
              </div>
            </div>
          </section>

          <RoomServiceFeesSection
            serviceFees={values.serviceFees}
            feeAmountInputs={feeAmountInputs}
            error={errors.serviceFees}
            onToggleFee={handleToggleFee}
            onFeeAmountChange={handleFeeAmountChange}
            onAddFee={handleAddFee}
            onValidationError={(message) =>
              setErrors((previous) => ({ ...previous, serviceFees: message }))
            }
          />

          <section className="flex items-center justify-between gap-4 rounded-xl border border-border-subtle bg-canvas/60 px-4 py-3.5">
            <div className="flex items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-brand-100 bg-white text-brand-500">
                <SearchPlusIcon className="size-5" />
              </span>
              <div>
                <p className="text-xs font-bold text-text-primary">
                  Bật hiển thị phòng lên trang tìm kiếm công khai RentMate Finder
                </p>
                <p className="mt-0.5 text-[11px] text-text-muted">
                  Kích hoạt để người thuê trọ lân cận tìm thấy và gửi yêu cầu giữ chỗ online.
                </p>
              </div>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={values.isPublished}
              aria-label="Bật hiển thị phòng lên trang tìm kiếm công khai RentMate Finder"
              onClick={() =>
                setValues((previous) => ({ ...previous, isPublished: !previous.isPublished }))
              }
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-pill transition-colors ${
                values.isPublished ? 'bg-brand-500' : 'bg-border-subtle'
              }`}
            >
              <span
                className={`inline-block size-4 rounded-pill bg-white shadow-soft-xs transition-transform ${
                  values.isPublished ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </section>

          {error && (
            <p role="alert" className="text-xs font-medium text-danger">
              {error}
            </p>
          )}
        </form>
      </div>
    </Modal>
  );
}
