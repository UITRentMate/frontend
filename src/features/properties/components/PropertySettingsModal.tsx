import { useState } from 'react';
import type { FormEvent } from 'react';

import { managementAssets } from '@/assets/property-management';
import { Button, Modal } from '@/components/ui';

import {
  MOCK_ADDRESS_OPTIONS,
  PROPERTY_AMENITIES,
  PROPERTY_SETTINGS_PHOTO_LABELS,
  QUIET_PET_RULES,
  SAFETY_RULES,
  VISITOR_RULES,
} from '../constants';
import type {
  PropertySettingsErrors,
  PropertySettingsModalProps,
  PropertySettingsValues,
} from '../types';
import { validatePropertySettings } from '../utils/validation';

export function PropertySettingsModal({
  property,
  rooms,
  isPending,
  error,
  onClose,
  onSubmit,
}: PropertySettingsModalProps) {
  const [values, setValues] = useState<PropertySettingsValues>({
    name: property.name,
    city: property.city,
    district: property.district,
    ward: property.ward,
    street: property.street,
    amenities: [...property.amenities],
    gateMode: property.gateMode,
    visitorRules: [...(property.visitorRules ?? [])],
    safetyRules: [...property.safetyRules],
    quietPetRules: [...(property.quietPetRules ?? [])],
    isArchived: Boolean(property.isArchived),
  });
  const [errors, setErrors] = useState<PropertySettingsErrors>({});
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [uploadNotice, setUploadNotice] = useState('');

  const occupiedCount = rooms.filter((room) => room.status === 'occupied').length;
  const reservedCount = rooms.filter((room) => room.status === 'reserved').length;
  const vacantCount = rooms.filter((room) => room.status === 'vacant').length;
  const hasActiveObligations = occupiedCount > 0 || reservedCount > 0;

  const city = MOCK_ADDRESS_OPTIONS.find((option) => option.city === values.city);
  const district = city?.districts.find((option) => option.name === values.district);

  const toggleRuleList = (
    field: 'amenities' | 'visitorRules' | 'safetyRules' | 'quietPetRules',
    label: string,
  ) => {
    setValues((previous) => {
      const exists = previous[field].includes(label);
      return {
        ...previous,
        [field]: exists
          ? previous[field].filter((item) => item !== label)
          : [...previous[field], label],
      };
    });
  };

  const submitWithMode = (isDraft: boolean, form?: HTMLFormElement | null) => {
    if (isPending) return;
    const nextErrors = validatePropertySettings(values);
    setErrors(nextErrors);
    const firstErrorField = Object.keys(nextErrors)[0];
    if (firstErrorField) {
      if (firstErrorField !== 'name') {
        setIsEditingAddress(true);
      }
      form?.querySelector<HTMLElement>(`[name="${firstErrorField}"]`)?.focus();
      return;
    }
    onSubmit(values, isDraft);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitWithMode(false, event.currentTarget);
  };

  const handleToggleArchive = () => {
    if (hasActiveObligations) return;
    setValues((previous) => ({ ...previous, isArchived: !previous.isArchived }));
  };

  const formattedAddress = `${values.street}, ${values.ward}, ${values.district}`;

  return (
    <Modal
      isOpen
      onClose={onClose}
      size="3xl"
      className="max-w-[1060px] [&>div:nth-child(2)]:max-h-none [&>div:nth-child(2)]:p-0 [&>div:last-child]:shrink-0"
      footer={
        <div className="flex w-full flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <svg
              className="size-4 shrink-0 text-text-muted"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>
              Cập nhật gần nhất:{' '}
              <strong className="font-semibold text-text-primary">
                {property.updatedAtLabel ?? '15/10/2026'}
              </strong>{' '}
              bởi Quản trị viên
            </span>
          </div>

          <div className="ml-auto flex flex-wrap items-center gap-2">
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
              type="button"
              variant="secondary"
              size="sm"
              disabled={isPending}
              onClick={() => submitWithMode(true)}
              className="rounded-lg bg-brand-50 px-4 text-brand-500 hover:bg-brand-100"
            >
              Lưu tạm
            </Button>
            <Button
              type="submit"
              form="property-settings-form"
              size="sm"
              isLoading={isPending}
              className="rounded-lg px-4"
            >
              <svg
                className="size-4 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Lưu thay đổi cài đặt
            </Button>
          </div>
        </div>
      }
    >
      <div className="flex flex-col">
        {/* Custom Modal Header matching Figma */}
        <div className="flex flex-wrap items-center gap-3 border-b border-border-subtle bg-white px-5 py-4 pr-14">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-brand-100 bg-brand-50">
            <img src={managementAssets.page.settingsIcon} alt="" className="size-5" />
          </span>
          <h2 className="font-heading text-base font-bold text-text-primary sm:text-lg">
            Cài Đặt &amp; Nội Quy Khu Trọ
          </h2>
          <span className="inline-flex items-center gap-1.5 rounded-pill border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-500">
            <img src={managementAssets.page.propertyIcon} alt="" className="size-3.5" />
            {values.name || property.name}
          </span>
          <span className="inline-flex items-center gap-1 rounded-pill border border-success-border bg-success-soft px-2.5 py-1 text-xs font-semibold text-secondary-600">
            ● {rooms.length} Phòng
          </span>
        </div>

        <form
          id="property-settings-form"
          noValidate
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 bg-canvas/70 p-5 lg:grid-cols-2"
        >
          {/* Left Column: 01, 02, 03 */}
          <div className="flex flex-col gap-4">
            {/* 01: Thông tin nhận diện & Địa chỉ */}
            <section className="rounded-xl border border-border-subtle bg-surface-card p-4 shadow-soft-xs">
              <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="grid size-6 place-items-center rounded-xs bg-brand-50 font-heading text-xs font-bold text-brand-500">
                    01
                  </span>
                  <h3 className="font-heading text-sm font-bold text-text-primary">
                    Thông tin nhận diện &amp; Địa chỉ
                  </h3>
                </div>
                <span className="text-xs text-text-muted">
                  Mã hồ sơ:{' '}
                  <strong className="font-semibold text-text-primary">
                    {property.profileCode ?? 'RM-HCM-TD-0842'}
                  </strong>
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="settings-property-name"
                    className="mb-1.5 block text-xs font-medium text-text-muted"
                  >
                    Tên hiển thị công khai
                  </label>
                  <div className="relative flex items-center">
                    <input
                      id="settings-property-name"
                      name="name"
                      type="text"
                      value={values.name}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'settings-name-error' : undefined}
                      onChange={(e) => setValues({ ...values, name: e.target.value })}
                      className={`w-full rounded-lg border bg-canvas/60 py-2 pr-9 pl-3 text-xs font-medium text-text-primary transition focus:border-brand-500 focus:bg-white focus:outline-none ${
                        errors.name ? 'border-danger' : 'border-border-subtle'
                      }`}
                    />
                    <svg
                      className="pointer-events-none absolute right-2.5 size-4 text-brand-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      aria-hidden="true"
                    >
                      <path
                        d="M16.862 4.487a2.1 2.1 0 1 1 2.97 2.97L7.5 19.79l-4 1 1-4L16.862 4.487Z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  {errors.name && (
                    <span id="settings-name-error" className="mt-1 block text-[11px] text-danger">
                      {errors.name}
                    </span>
                  )}
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-text-muted">
                      Địa chỉ đăng ký hành chính
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsEditingAddress((previous) => !previous)}
                      className="cursor-pointer text-xs font-semibold text-brand-500 hover:text-brand-600"
                    >
                      {isEditingAddress ? 'Thu gọn' : 'Đổi địa chỉ'}
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-2 rounded-lg border border-border-subtle bg-canvas/60 px-2.5 py-2 text-xs text-text-primary">
                    <span className="flex min-w-0 items-center gap-1.5 truncate">
                      <img
                        src={managementAssets.page.locationIcon}
                        alt=""
                        className="size-3.5 shrink-0"
                      />
                      <span className="truncate" title={formattedAddress}>
                        {formattedAddress}
                      </span>
                    </span>
                    <span className="shrink-0 rounded-pill border border-success-border bg-success-soft px-2 py-0.5 text-[10px] font-semibold text-secondary-600">
                      Đã đối soát
                    </span>
                  </div>
                </div>
              </div>

              {isEditingAddress && (
                <div className="mt-3 grid grid-cols-1 gap-2.5 rounded-lg border border-border-subtle bg-canvas/50 p-3 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="settings-city"
                      className="mb-1 block text-[11px] font-semibold text-text-primary"
                    >
                      Tỉnh / Thành phố *
                    </label>
                    <select
                      id="settings-city"
                      name="city"
                      value={values.city}
                      aria-invalid={Boolean(errors.city)}
                      onChange={(e) =>
                        setValues({ ...values, city: e.target.value, district: '', ward: '' })
                      }
                      className="w-full rounded-sm border border-border-subtle bg-white px-2.5 py-1.5 text-xs text-text-primary"
                    >
                      <option value="">Chọn tỉnh / thành phố</option>
                      {MOCK_ADDRESS_OPTIONS.map((option) => (
                        <option key={option.city} value={option.city}>
                          {option.city}
                        </option>
                      ))}
                    </select>
                    {errors.city && (
                      <span className="mt-1 block text-[11px] text-danger">{errors.city}</span>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="settings-district"
                      className="mb-1 block text-[11px] font-semibold text-text-primary"
                    >
                      Quận / Huyện *
                    </label>
                    <select
                      id="settings-district"
                      name="district"
                      value={values.district}
                      disabled={!city}
                      aria-invalid={Boolean(errors.district)}
                      onChange={(e) =>
                        setValues({ ...values, district: e.target.value, ward: '' })
                      }
                      className="w-full rounded-sm border border-border-subtle bg-white px-2.5 py-1.5 text-xs text-text-primary"
                    >
                      <option value="">Chọn quận / huyện</option>
                      {city?.districts.map((option) => (
                        <option key={option.name} value={option.name}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                    {errors.district && (
                      <span className="mt-1 block text-[11px] text-danger">{errors.district}</span>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="settings-ward"
                      className="mb-1 block text-[11px] font-semibold text-text-primary"
                    >
                      Phường / Xã *
                    </label>
                    <select
                      id="settings-ward"
                      name="ward"
                      value={values.ward}
                      disabled={!district}
                      aria-invalid={Boolean(errors.ward)}
                      onChange={(e) => setValues({ ...values, ward: e.target.value })}
                      className="w-full rounded-sm border border-border-subtle bg-white px-2.5 py-1.5 text-xs text-text-primary"
                    >
                      <option value="">Chọn phường / xã</option>
                      {district?.wards.map((ward) => (
                        <option key={ward} value={ward}>
                          {ward}
                        </option>
                      ))}
                    </select>
                    {errors.ward && (
                      <span className="mt-1 block text-[11px] text-danger">{errors.ward}</span>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="settings-street"
                      className="mb-1 block text-[11px] font-semibold text-text-primary"
                    >
                      Số nhà, tên đường *
                    </label>
                    <input
                      id="settings-street"
                      name="street"
                      type="text"
                      value={values.street}
                      aria-invalid={Boolean(errors.street)}
                      onChange={(e) => setValues({ ...values, street: e.target.value })}
                      className="w-full rounded-sm border border-border-subtle bg-white px-2.5 py-1.5 text-xs text-text-primary"
                    />
                    {errors.street && (
                      <span className="mt-1 block text-[11px] text-danger">{errors.street}</span>
                    )}
                  </div>
                </div>
              )}
            </section>

            {/* 02: Bộ sưu tập ảnh cơ sở vật chất */}
            <section className="rounded-xl border border-border-subtle bg-surface-card p-4 shadow-soft-xs">
              <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-xs bg-brand-50 font-heading text-xs font-bold text-brand-500">
                    02
                  </span>
                  <div>
                    <h3 className="font-heading text-sm font-bold text-text-primary">
                      Bộ sưu tập ảnh cơ sở vật chất
                    </h3>
                    <p className="text-[11px] text-text-muted">
                      Tối thiểu 4 ảnh thực tế để kích hoạt niêm yết tìm phòng.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setUploadNotice(
                      'Tải ảnh thực tế sẽ kết nối dịch vụ lưu trữ khi tích hợp Backend.',
                    )
                  }
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-brand-200 bg-brand-50/70 px-3 py-1.5 text-xs font-semibold text-brand-500 transition hover:bg-brand-100"
                >
                  <img src={managementAssets.property.uploadIcon} alt="" className="size-3.5" />
                  Tải ảnh mới
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {managementAssets.propertyPhotos.map((src, index) => (
                  <figure
                    key={PROPERTY_SETTINGS_PHOTO_LABELS[index]}
                    className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border-subtle bg-canvas"
                  >
                    <img
                      src={src}
                      alt={PROPERTY_SETTINGS_PHOTO_LABELS[index]}
                      className="size-full object-cover"
                    />
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-900/80 via-brand-900/40 to-transparent px-2 py-1.5 text-[11px] font-medium text-white">
                      {PROPERTY_SETTINGS_PHOTO_LABELS[index]}
                    </figcaption>
                  </figure>
                ))}
              </div>

              {uploadNotice && (
                <p className="mt-2 text-[11px] text-brand-600">{uploadNotice}</p>
              )}
            </section>

            {/* 03: Tiện ích chung đã xác thực */}
            <section className="rounded-xl border border-border-subtle bg-surface-card p-4 shadow-soft-xs">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="grid size-6 place-items-center rounded-xs bg-brand-50 font-heading text-xs font-bold text-brand-500">
                    03
                  </span>
                  <h3 className="font-heading text-sm font-bold text-text-primary">
                    Tiện ích chung đã xác thực
                  </h3>
                </div>
                <span className="rounded-pill border border-success-border bg-success-soft px-2.5 py-0.5 text-[11px] font-semibold text-secondary-600">
                  {values.amenities.length}/{PROPERTY_AMENITIES.length} tiện ích bật
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {PROPERTY_AMENITIES.map(({ label, icon }) => {
                  const checked = values.amenities.includes(label);
                  return (
                    <label
                      key={label}
                      className={`flex cursor-pointer items-center justify-between gap-2 rounded-lg border px-3 py-2.5 text-xs transition ${
                        checked
                          ? 'border-brand-200 bg-white font-medium text-text-primary shadow-soft-xs'
                          : 'border-border-subtle bg-canvas/70 text-text-muted'
                      }`}
                    >
                      <span className="flex min-w-0 items-center gap-2">
                        <img src={icon} alt="" className="size-4 shrink-0" />
                        <span className="truncate">{label}</span>
                      </span>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleRuleList('amenities', label)}
                        className="size-4 shrink-0 cursor-pointer accent-brand-500"
                      />
                    </label>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Right Column: 04, 05 */}
          <div className="flex flex-col gap-4">
            {/* 04: Nội quy & Điều khoản Hợp đồng số */}
            <section className="rounded-xl border border-border-subtle bg-surface-card p-4 shadow-soft-xs">
              <div className="mb-3.5 flex items-start gap-2">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-xs bg-brand-50 font-heading text-xs font-bold text-brand-500">
                  04
                </span>
                <div>
                  <h3 className="font-heading text-sm font-bold text-text-primary">
                    Nội quy &amp; Điều khoản Hợp đồng số
                  </h3>
                  <p className="text-[11px] text-text-muted">
                    Tự động kết xuất vào Điều 5 hợp đồng điện tử có tính pháp lý.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {/* Giờ giấc ra vào */}
                <fieldset className="rounded-lg border border-border-subtle bg-canvas/60 p-3">
                  <legend className="sr-only">Giờ giấc ra vào</legend>
                  <div className="mb-2 flex items-center gap-1.5 text-xs font-bold text-brand-500">
                    <img
                      src={managementAssets.property.gateScheduleIcon}
                      alt=""
                      className="size-4"
                    />
                    <span>Giờ giấc ra vào</span>
                  </div>
                  <div className="flex flex-col gap-2 text-xs">
                    <label className="flex cursor-pointer items-center gap-2 text-text-primary">
                      <input
                        type="radio"
                        name="settings-gate-mode"
                        checked={values.gateMode === 'free'}
                        onChange={() => setValues({ ...values, gateMode: 'free' })}
                        className="size-4 cursor-pointer accent-brand-500"
                      />
                      <span className={values.gateMode === 'free' ? 'font-semibold' : 'text-text-muted'}>
                        Tự do 24/7 (vân tay)
                      </span>
                    </label>
                    <label className="flex cursor-pointer items-center gap-2 text-text-primary">
                      <input
                        type="radio"
                        name="settings-gate-mode"
                        checked={values.gateMode === 'scheduled'}
                        onChange={() => setValues({ ...values, gateMode: 'scheduled' })}
                        className="size-4 cursor-pointer accent-brand-500"
                      />
                      <span
                        className={
                          values.gateMode === 'scheduled' ? 'font-semibold' : 'text-text-muted'
                        }
                      >
                        Khóa cổng 23:30 - 05:00
                      </span>
                    </label>
                  </div>
                </fieldset>

                {/* Khách thăm & Lưu trú */}
                <fieldset className="rounded-lg border border-border-subtle bg-canvas/60 p-3">
                  <legend className="sr-only">Khách thăm và Lưu trú</legend>
                  <div className="mb-2 flex items-center gap-1.5 text-xs font-bold text-brand-500">
                    <img src={managementAssets.page.locationIcon} alt="" className="size-4" />
                    <span>Khách thăm &amp; Lưu trú</span>
                  </div>
                  <div className="flex flex-col gap-2 text-xs">
                    {VISITOR_RULES.map((rule) => {
                      const checked = values.visitorRules.includes(rule);
                      return (
                        <label
                          key={rule}
                          className="flex cursor-pointer items-center justify-between gap-2"
                        >
                          <span className={checked ? 'font-medium text-text-primary' : 'text-text-muted'}>
                            {rule}
                          </span>
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleRuleList('visitorRules', rule)}
                            className="size-4 shrink-0 cursor-pointer accent-brand-500"
                          />
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                {/* An toàn PCCC & Điện */}
                <fieldset className="rounded-lg border border-border-subtle bg-canvas/60 p-3">
                  <legend className="sr-only">An toàn PCCC và Điện</legend>
                  <div className="mb-2 flex items-center gap-1.5 text-xs font-bold text-danger">
                    <img src={managementAssets.property.fireSafetyIcon} alt="" className="size-4" />
                    <span>An toàn PCCC &amp; Điện</span>
                  </div>
                  <div className="flex flex-col gap-2 text-xs">
                    {SAFETY_RULES.map((rule) => {
                      const checked = values.safetyRules.includes(rule);
                      return (
                        <label
                          key={rule}
                          className="flex cursor-pointer items-center justify-between gap-2"
                        >
                          <span className={checked ? 'font-medium text-text-primary' : 'text-text-muted'}>
                            {rule}
                          </span>
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleRuleList('safetyRules', rule)}
                            className="size-4 shrink-0 cursor-pointer accent-brand-500"
                          />
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                {/* Yên tĩnh & Thú cưng */}
                <fieldset className="rounded-lg border border-border-subtle bg-canvas/60 p-3">
                  <legend className="sr-only">Yên tĩnh và Thú cưng</legend>
                  <div className="mb-2 flex items-center gap-1.5 text-xs font-bold text-secondary-600">
                    <svg
                      className="size-4 shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      aria-hidden="true"
                    >
                      <path
                        d="M11 5 6 9H3v6h3l5 4V5ZM22 9l-6 6M16 9l6 6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>Yên tĩnh &amp; Thú cưng</span>
                  </div>
                  <div className="flex flex-col gap-2 text-xs">
                    {QUIET_PET_RULES.map((rule) => {
                      const checked = values.quietPetRules.includes(rule);
                      return (
                        <label
                          key={rule}
                          className="flex cursor-pointer items-center justify-between gap-2"
                        >
                          <span className={checked ? 'font-medium text-text-primary' : 'text-text-muted'}>
                            {rule}
                          </span>
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleRuleList('quietPetRules', rule)}
                            className="size-4 shrink-0 cursor-pointer accent-brand-500"
                          />
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              </div>
            </section>

            {/* 05: Vòng đời & Trạng thái lưu trữ */}
            <section className="flex flex-1 flex-col rounded-xl border border-border-subtle bg-surface-card p-4 shadow-soft-xs">
              <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="grid size-6 place-items-center rounded-xs bg-brand-50 font-heading text-xs font-bold text-brand-500">
                    05
                  </span>
                  <h3 className="font-heading text-sm font-bold text-text-primary">
                    Vòng đời &amp; Trạng thái lưu trữ
                  </h3>
                </div>
                <span
                  className={`rounded-pill border px-2.5 py-0.5 text-[11px] font-semibold ${
                    values.isArchived
                      ? 'border-warning-border bg-warning-soft text-warning'
                      : 'border-success-border bg-success-soft text-secondary-600'
                  }`}
                >
                  {values.isArchived ? '● Đã lưu trữ' : '● Đang hoạt động bình thường'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <div className="rounded-lg border border-border-subtle bg-canvas/60 px-3 py-2.5">
                  <span className="block text-[11px] text-text-muted">Hợp đồng:</span>
                  <strong className="mt-1 block font-heading text-sm font-bold text-brand-500">
                    {String(occupiedCount).padStart(2, '0')} phòng
                  </strong>
                </div>
                <div className="rounded-lg border border-border-subtle bg-canvas/60 px-3 py-2.5">
                  <span className="block text-[11px] text-text-muted">Đặt cọc giữ:</span>
                  <strong className="mt-1 block font-heading text-sm font-bold text-warning">
                    {String(reservedCount).padStart(2, '0')} phòng
                  </strong>
                </div>
                <div className="rounded-lg border border-border-subtle bg-canvas/60 px-3 py-2.5">
                  <span className="block text-[11px] text-text-muted">Phòng trống:</span>
                  <strong className="mt-1 block font-heading text-sm font-bold text-text-primary">
                    {String(vacantCount).padStart(2, '0')} phòng
                  </strong>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-warning-border bg-warning-soft/70 px-3 py-2.5">
                <div className="flex min-w-0 flex-1 items-center gap-2 text-xs text-text-secondary">
                  <svg
                    className="size-4 shrink-0 text-warning"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 3 5 6v6c0 5 3.5 8 7 9 3.5-1 7-4 7-9V6l-7-3Z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>
                    {hasActiveObligations
                      ? `Còn ${occupiedCount} hợp đồng hiệu lực. Bảo toàn dữ liệu kế toán & hợp đồng vĩnh viễn.`
                      : 'Không còn hợp đồng hiệu lực. Có thể chuyển sang trạng thái lưu trữ nếu ngừng khai thác.'}
                  </span>
                </div>
                <button
                  type="button"
                  disabled={hasActiveObligations || isPending}
                  onClick={handleToggleArchive}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                    hasActiveObligations
                      ? 'cursor-not-allowed border-border-subtle bg-white/60 text-text-disabled'
                      : 'cursor-pointer border-warning-border bg-white text-warning hover:bg-warning-soft'
                  }`}
                >
                  <svg
                    className="size-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 7h16v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7ZM2 4h20v3H2V4Zm7 7h6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {values.isArchived ? 'Khôi phục' : 'Lưu trữ'}
                </button>
              </div>

              {error && (
                <p role="alert" className="mt-3 text-xs font-medium text-danger">
                  {error}
                </p>
              )}
            </section>
          </div>
        </form>
      </div>
    </Modal>
  );
}
