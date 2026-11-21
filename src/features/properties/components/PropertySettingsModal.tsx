import { useRef, useState } from 'react';
import type { FormEvent } from 'react';

import { managementAssets } from '@/assets/property-management';

import { Button, CheckCircle2Icon, ClockIcon, Modal } from '@/components/ui';

import { PROPERTY_AMENITIES, PROPERTY_SETTINGS_PHOTO_LABELS } from '../constants';
import type {
  PropertySettingsErrors,
  PropertySettingsModalProps,
  PropertySettingsValues,
} from '../types';
import { validatePropertySettings } from '../utils/validation';
import { PropertyAddressSection } from './PropertyAddressSection';
import { PropertyArchiveSection } from './PropertyArchiveSection';
import { PropertyRulesSection } from './PropertyRulesSection';

export function PropertySettingsModal({
  property,
  rooms,
  isPending,
  error,
  onClose,
  onSubmit,
}: PropertySettingsModalProps) {
  const formRef = useRef<HTMLFormElement>(null);
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

  const submitWithMode = (isDraft: boolean) => {
    if (isPending) return;
    const nextErrors = validatePropertySettings(values);
    setErrors(nextErrors);
    const firstErrorField = Object.keys(nextErrors)[0];
    if (firstErrorField) {
      if (firstErrorField !== 'name') {
        setIsEditingAddress(true);
      }
      requestAnimationFrame(() => {
        formRef.current?.querySelector<HTMLElement>(`[name="${firstErrorField}"]`)?.focus();
      });
      return;
    }
    onSubmit(values, isDraft);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitWithMode(false);
  };

  const handleToggleArchive = () => {
    if (hasActiveObligations) return;
    setValues((previous) => ({ ...previous, isArchived: !previous.isArchived }));
  };

  return (
    <Modal
      isOpen
      onClose={onClose}
      ariaLabel="Cài Đặt & Nội Quy Khu Trọ"
      size="3xl"
      className="max-w-[1060px] [&>div:nth-child(2)]:max-h-none [&>div:nth-child(2)]:p-0 [&>div:last-child]:shrink-0"
      footer={
        <div className="flex w-full flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <ClockIcon className="size-4 shrink-0 text-text-muted" />
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
              <CheckCircle2Icon className="size-4 shrink-0" />
              Lưu thay đổi cài đặt
            </Button>
          </div>
        </div>
      }
    >
      <div className="flex flex-col">
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
          ref={formRef}
          id="property-settings-form"
          noValidate
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 bg-canvas/70 p-5 lg:grid-cols-2"
        >
          <div className="flex flex-col gap-4">
            <PropertyAddressSection
              profileCode={property.profileCode ?? 'RM-HCM-TD-0842'}
              values={values}
              errors={errors}
              isEditingAddress={isEditingAddress}
              onToggleEditAddress={() => setIsEditingAddress((previous) => !previous)}
              onChange={setValues}
            />

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

          <div className="flex flex-col gap-4">
            <PropertyRulesSection
              values={values}
              onChangeGateMode={(mode) => setValues((previous) => ({ ...previous, gateMode: mode }))}
              onToggleRule={toggleRuleList}
            />

            <PropertyArchiveSection
              occupiedCount={occupiedCount}
              reservedCount={reservedCount}
              vacantCount={vacantCount}
              isArchived={values.isArchived}
              isPending={isPending}
              error={error}
              onToggleArchive={handleToggleArchive}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
}
