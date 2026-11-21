import { useState } from 'react';
import type { FormEvent } from 'react';

import { rentFormatter } from '@/utils/formatCurrency';
import { Button, Modal } from '@/components/ui';

import { DEFAULT_ROOM_SERVICE_FEES } from '../managementConstants';
import type {
  RoomPricingFormErrors,
  RoomPricingFormValues,
  RoomPricingModalProps,
} from '../types';
import { validateRoomPricingForm } from '../utils/roomManagement';

export function RoomPricingModal({
  room,
  otherVacantCount,
  isPending,
  error,
  onClose,
  onSubmit,
}: RoomPricingModalProps) {
  const initialRent = room.monthlyRent ?? 3500000;
  const initialDeposit =
    room.depositAmount ?? (room.depositMonths ? initialRent * room.depositMonths : initialRent);

  const [values, setValues] = useState<RoomPricingFormValues>({
    monthlyRent: String(initialRent),
    depositAmount: String(initialDeposit),
    electricityRate: String(room.electricityRate ?? 3500),
    waterBillingMode: room.waterBillingMode ?? 'meter',
    waterRate: String(room.waterRate ?? 20000),
    waterPerPersonRate: String(room.waterPerPersonRate ?? 100000),
    serviceFees:
      room.serviceFees && room.serviceFees.length > 0
        ? structuredClone(room.serviceFees)
        : structuredClone(DEFAULT_ROOM_SERVICE_FEES),
    isPublished: room.isPublished,
  });

  const [errors, setErrors] = useState<RoomPricingFormErrors>({});
  const [copyToOtherRooms, setCopyToOtherRooms] = useState(false);
  const [isAddingFee, setIsAddingFee] = useState(false);
  const [newFeeName, setNewFeeName] = useState('');
  const [newFeeAmount, setNewFeeAmount] = useState('');
  const [newFeeUnit, setNewFeeUnit] = useState('/phòng');

  const rentValue = Number(values.monthlyRent);
  const depositValue = Number(values.depositAmount);
  const depositRatioLabel =
    Number.isFinite(rentValue) && rentValue > 0 && Number.isFinite(depositValue) && depositValue > 0
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
    const parsed = Number(rawValue);
    setValues((previous) => ({
      ...previous,
      serviceFees: previous.serviceFees.map((fee) =>
        fee.id === feeId ? { ...fee, amount: Number.isFinite(parsed) ? parsed : 0 } : fee,
      ),
    }));
  };

  const handleAddCustomFee = () => {
    const trimmedName = newFeeName.trim();
    const parsedAmount = Number(newFeeAmount);
    if (!trimmedName || !Number.isFinite(parsedAmount) || parsedAmount < 0) {
      setErrors((previous) => ({
        ...previous,
        serviceFees: 'Nhập tên phụ phí và đơn giá hợp lệ (>= 0).',
      }));
      return;
    }

    setValues((previous) => ({
      ...previous,
      serviceFees: [
        ...previous.serviceFees,
        {
          id: `custom-${Date.now()}`,
          name: trimmedName,
          amount: parsedAmount,
          unit: newFeeUnit.trim() || '/phòng',
          enabled: true,
        },
      ],
    }));
    setNewFeeName('');
    setNewFeeAmount('');
    setNewFeeUnit('/phòng');
    setIsAddingFee(false);
    setErrors((previous) => ({ ...previous, serviceFees: undefined }));
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
            <svg
              className="size-4 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <rect x="9" y="9" width="11" height="11" rx="2" />
              <path
                d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                strokeLinecap="round"
              />
            </svg>
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
        {/* Custom Header matching Figma */}
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
          {/* Section 1: Tiền phòng & Cọc bảo đảm */}
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
                    value={values.monthlyRent}
                    aria-invalid={Boolean(errors.monthlyRent)}
                    aria-describedby={errors.monthlyRent ? 'pricing-rent-error' : undefined}
                    onChange={(e) => setValues({ ...values, monthlyRent: e.target.value })}
                    className="w-full bg-transparent font-heading text-sm font-bold text-text-primary focus:outline-none"
                  />
                  <span className="shrink-0 pl-2 text-xs text-text-muted">đ/tháng</span>
                </div>
                {errors.monthlyRent ? (
                  <span id="pricing-rent-error" className="mt-1 block text-[11px] text-danger">
                    {errors.monthlyRent}
                  </span>
                ) : (
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
                    value={values.depositAmount}
                    aria-invalid={Boolean(errors.depositAmount)}
                    aria-describedby={errors.depositAmount ? 'pricing-deposit-error' : undefined}
                    onChange={(e) => setValues({ ...values, depositAmount: e.target.value })}
                    className="w-full bg-transparent font-heading text-sm font-bold text-text-primary focus:outline-none"
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

          {/* Section 2: Định mức Điện & Nước */}
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

          {/* Section 3: Phụ phí dịch vụ định kỳ */}
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
              {values.serviceFees.map((fee) => (
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
                      onChange={() => handleToggleFee(fee.id)}
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
                      value={fee.amount}
                      onChange={(e) => handleFeeAmountChange(fee.id, e.target.value)}
                      className="w-24 rounded-xs border border-transparent bg-transparent font-heading text-sm font-bold text-text-primary focus:border-brand-300 focus:bg-white focus:px-1.5 focus:outline-none disabled:text-text-disabled"
                    />
                    <span className="shrink-0 text-[11px] text-text-muted">
                      đ {fee.unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {errors.serviceFees && (
              <span className="mt-2 block text-[11px] text-danger">{errors.serviceFees}</span>
            )}
          </section>

          {/* Section 4: RentMate Finder visibility toggle */}
          <section className="flex items-center justify-between gap-4 rounded-xl border border-border-subtle bg-canvas/60 px-4 py-3.5">
            <div className="flex items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-brand-100 bg-white text-brand-500">
                <svg
                  className="size-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5M11 8v6M8 11h6" strokeLinecap="round" />
                </svg>
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
