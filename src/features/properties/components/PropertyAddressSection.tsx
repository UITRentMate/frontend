import { managementAssets } from '@/assets/property-management';

import { PencilIcon } from '@/components/ui';

import { MOCK_ADDRESS_OPTIONS } from '../constants';
import type { PropertyAddressSectionProps } from '../types';

export function PropertyAddressSection({
  profileCode,
  values,
  errors,
  isEditingAddress,
  onToggleEditAddress,
  onChange,
}: PropertyAddressSectionProps) {
  const city = MOCK_ADDRESS_OPTIONS.find((option) => option.city === values.city);
  const district = city?.districts.find((option) => option.name === values.district);
  const formattedAddress = `${values.street}, ${values.ward}, ${values.district}`;

  return (
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
          Mã hồ sơ: <strong className="font-semibold text-text-primary">{profileCode}</strong>
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
              onChange={(e) => onChange({ ...values, name: e.target.value })}
              className={`w-full rounded-lg border bg-canvas/60 py-2 pr-9 pl-3 text-xs font-medium text-text-primary transition focus:border-brand-500 focus:bg-white focus:outline-none ${
                errors.name ? 'border-danger' : 'border-border-subtle'
              }`}
            />
            <PencilIcon className="pointer-events-none absolute right-2.5 size-4 text-brand-500" />
          </div>
          {errors.name && (
            <span id="settings-name-error" className="mt-1 block text-[11px] text-danger">
              {errors.name}
            </span>
          )}
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <span className="text-xs font-medium text-text-muted">Địa chỉ đăng ký hành chính</span>
            <button
              type="button"
              onClick={onToggleEditAddress}
              className="cursor-pointer text-xs font-semibold text-brand-500 hover:text-brand-600"
            >
              {isEditingAddress ? 'Thu gọn' : 'Đổi địa chỉ'}
            </button>
          </div>
          <div className="flex items-center justify-between gap-2 rounded-lg border border-border-subtle bg-canvas/60 px-2.5 py-2 text-xs text-text-primary">
            <span className="flex min-w-0 items-center gap-1.5 truncate">
              <img src={managementAssets.page.locationIcon} alt="" className="size-3.5 shrink-0" />
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
              onChange={(e) => onChange({ ...values, city: e.target.value, district: '', ward: '' })}
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
              onChange={(e) => onChange({ ...values, district: e.target.value, ward: '' })}
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
              onChange={(e) => onChange({ ...values, ward: e.target.value })}
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
              onChange={(e) => onChange({ ...values, street: e.target.value })}
              className="w-full rounded-sm border border-border-subtle bg-white px-2.5 py-1.5 text-xs text-text-primary"
            />
            {errors.street && (
              <span className="mt-1 block text-[11px] text-danger">{errors.street}</span>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
