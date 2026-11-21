import { useState } from 'react';
import type { FormEvent } from 'react';

import { managementAssets } from '@/assets/property-management';
import { Button, Input, Modal } from '@/components/ui';

import { ManagementPhotoStrip } from '@/features/rooms/components/ManagementPhotoStrip';

import { EMPTY_PROPERTY_FORM, MOCK_ADDRESS_OPTIONS, PROPERTY_AMENITIES, PROPERTY_PHOTO_LABELS, SAFETY_RULES } from '../constants';
import type { AddPropertyModalProps, PropertyFormErrors, PropertyFormValues } from '../types';
import { validatePropertyForm } from '../utils/validation';

export function AddPropertyModal({ isPending, error, onClose, onSubmit }: AddPropertyModalProps) {
  const [values, setValues] = useState<PropertyFormValues>({ ...EMPTY_PROPERTY_FORM, amenities: [], safetyRules: [] });
  const [errors, setErrors] = useState<PropertyFormErrors>({});
  const city = MOCK_ADDRESS_OPTIONS.find((option) => option.city === values.city);
  const district = city?.districts.find((option) => option.name === values.district);
  const toggle = (field: 'amenities' | 'safetyRules', label: string) => {
    setValues((previous) => ({
      ...previous,
      [field]: previous[field].includes(label)
        ? previous[field].filter((item) => item !== label)
        : [...previous[field], label],
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isPending) return;
    const nextErrors = validatePropertyForm(values);
    setErrors(nextErrors);
    const firstErrorField = Object.keys(nextErrors)[0];
    if (firstErrorField) {
      event.currentTarget.querySelector<HTMLElement>(`[name="${firstErrorField}"]`)?.focus();
      return;
    }
    onSubmit(values);
  };
  return <Modal
    isOpen
    onClose={onClose}
    title="Thêm Khu Trọ Mới"
    description="Khu trọ là gốc dữ liệu dùng để quản lý phòng, ký hợp đồng và cấu hình dịch vụ trực thuộc."
    size="3xl"
    className="[&>div:first-child]:shrink-0 [&>div:last-child]:shrink-0 [&>div:nth-child(2)]:max-h-none
      [&_button]:cursor-pointer [&_select]:cursor-pointer [&_button]:gap-[7px]"
    footer={<div
      className="flex w-full flex-wrap items-center justify-between gap-3 [&>div]:ml-auto [&>div]:flex [&>div]:flex-wrap
        [&>div]:gap-2 [&_button]:gap-1.5 [&_button]:text-xs [&_small]:text-[11px] [&_small]:text-text-muted
        max-[640px]:gap-2 max-[640px]:[&>div]:m-0 max-[640px]:[&_button]:px-2.5 max-[640px]:[&_button]:py-[7px]
        max-[640px]:[&_button]:text-[11px]"
    >
      <small>
        Sau khi tạo thành công, chuyển sang bước Thêm phòng trọ mới.
      </small>
      <div>
        <Button
          type="button"
          variant="outline"
          disabled={isPending}
          onClick={onClose}
        >
          Hủy bỏ
        </Button>
        <Button
          type="submit"
          form="add-property-form"
          isLoading={isPending}
        >
          <img
            src={managementAssets.property.createPropertyIcon}
            alt=""
          />
          Tạo khu trọ mới
        </Button>
      </div>
    </div>}
  >

    <form
      id="add-property-form"
      noValidate
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 [&_section+section]:border-t [&_section+section]:border-border-subtle
        [&_section+section]:pt-3.5 [&_h3]:mb-3 [&_h3]:flex [&_h3]:items-center [&_h3]:gap-2 [&_h3]:font-heading
        [&_h3]:text-xs/[18px] [&_h3]:font-bold [&_h3]:text-text-primary [&_h3]:uppercase [&_h3]:before:h-[15px]
        [&_h3]:before:w-1.5 [&_h3]:before:shrink-0 [&_h3]:before:rounded-pill [&_h3]:before:bg-brand-500
        [&_h3]:before:content-[''] [&_small]:text-[10px] [&_small]:text-text-muted
        [&_input:is([type=checkbox],[type=radio])]:size-4 [&_input:is([type=checkbox],[type=radio])]:shrink-0
        [&_input:is([type=checkbox],[type=radio])]:cursor-pointer
        [&_input:is([type=checkbox],[type=radio])]:accent-brand-500 [&_:is(select,input):focus-visible]:outline-2
        [&_:is(select,input):focus-visible]:outline-offset-2 [&_:is(select,input):focus-visible]:outline-brand-500"
    >

      <section>
        <h3>
          Thông tin nhận diện & vị trí hành chính
        </h3>
        <Input
          id="property-name"
          name="name"
          label="Tên khu trọ *"
          required
          value={values.name}
          error={errors.name}
          onChange={(e) => setValues({ ...values, name: e.target.value })}
        />
        <div className="mt-3 grid grid-cols-4 items-start gap-2.5 max-[640px]:grid-cols-1">

          <div
            className="flex flex-col gap-1 [&_label]:text-xs [&_label]:font-semibold [&_label]:text-text-primary
              [&_select]:min-h-[38px] [&_select]:w-full [&_select]:rounded-sm [&_select]:border
              [&_select]:border-border-subtle [&_select]:bg-canvas [&_select]:px-2.5 [&_select]:py-[7px]
              [&_select]:text-xs [&_select[aria-invalid=true]]:border-danger"
          >
            <label htmlFor="property-city">
              Tỉnh / Thành phố *
            </label>
            <select
              id="property-city"
              name="city"
              required
              value={values.city}
              aria-invalid={Boolean(errors.city)}
              aria-describedby={errors.city ? 'property-city-error' : undefined}
              onChange={(e) => setValues({ ...values, city: e.target.value, district: '', ward: '' })}
            >
              <option value="">
                Chọn tỉnh / thành phố
              </option>
              {MOCK_ADDRESS_OPTIONS.map((option) => <option key={option.city}>
                {option.city}
              </option>)}
            </select>
            {errors.city && <span
              id="property-city-error"
              className="text-[11px] text-danger"
            >
              {errors.city}
            </span>}
          </div>

          <div
            className="flex flex-col gap-1 [&_label]:text-xs [&_label]:font-semibold [&_label]:text-text-primary
              [&_select]:min-h-[38px] [&_select]:w-full [&_select]:rounded-sm [&_select]:border
              [&_select]:border-border-subtle [&_select]:bg-canvas [&_select]:px-2.5 [&_select]:py-[7px]
              [&_select]:text-xs [&_select[aria-invalid=true]]:border-danger"
          >
            <label htmlFor="property-district">
              Quận / Huyện *
            </label>
            <select
              id="property-district"
              name="district"
              required
              value={values.district}
              disabled={!city}
              aria-invalid={Boolean(errors.district)}
              aria-describedby={errors.district ? 'property-district-error' : undefined}
              onChange={(e) => setValues({ ...values, district: e.target.value, ward: '' })}
            >
              <option value="">
                Chọn quận / huyện
              </option>
              {city?.districts.map((option) => <option key={option.name}>
                {option.name}
              </option>)}
            </select>
            {errors.district && <span
              id="property-district-error"
              className="text-[11px] text-danger"
            >
              {errors.district}
            </span>}
          </div>

          <div
            className="flex flex-col gap-1 [&_label]:text-xs [&_label]:font-semibold [&_label]:text-text-primary
              [&_select]:min-h-[38px] [&_select]:w-full [&_select]:rounded-sm [&_select]:border
              [&_select]:border-border-subtle [&_select]:bg-canvas [&_select]:px-2.5 [&_select]:py-[7px]
              [&_select]:text-xs [&_select[aria-invalid=true]]:border-danger"
          >
            <label htmlFor="property-ward">
              Phường / Xã *
            </label>
            <select
              id="property-ward"
              name="ward"
              required
              value={values.ward}
              disabled={!district}
              aria-invalid={Boolean(errors.ward)}
              aria-describedby={errors.ward ? 'property-ward-error' : undefined}
              onChange={(e) => setValues({ ...values, ward: e.target.value })}
            >
              <option value="">
                Chọn phường / xã
              </option>
              {district?.wards.map((ward) => <option key={ward}>
                {ward}
              </option>)}
            </select>
            {errors.ward && <span
              id="property-ward-error"
              className="text-[11px] text-danger"
            >
              {errors.ward}
            </span>}
          </div>

          <Input
            id="property-street"
            name="street"
            label="Số nhà, tên đường *"
            required
            value={values.street}
            error={errors.street}
            onChange={(e) => setValues({ ...values, street: e.target.value })}
          />

        </div>
        <p
          className="mt-2.5 flex items-center gap-2 rounded-sm border border-info-border bg-info-soft px-2.5 py-2 text-[11px]
            text-text-muted"
        >
          <img
            src={managementAssets.property.addressInfoIcon}
            alt=""
          />
          Địa chỉ minh họa theo thiết kế, chưa kết nối dịch vụ địa chỉ.
        </p>
      </section>

      <section>
        <div className="flex flex-wrap items-baseline justify-between gap-2 [&>span]:text-[11px] [&>span]:text-brand-500">
          <h3>
            Hình ảnh thực tế khu trọ
          </h3>
          <small>
            Ảnh mẫu • Tối đa 10MB theo thiết kế
          </small>
        </div>
        <ManagementPhotoStrip
          images={managementAssets.propertyPhotos}
          labels={PROPERTY_PHOTO_LABELS}
          uploadIcon={managementAssets.property.uploadIcon}
        />
      </section>

      <section>
        <h3>
          Tiện ích & cơ sở vật chất
        </h3>
        <div className="grid grid-cols-3 gap-2 max-[640px]:grid-cols-2 min-[1400px]:grid-cols-6">
          {PROPERTY_AMENITIES.map(({ label, icon }) => <label
            key={label}
            className={`flex cursor-pointer items-center gap-2 rounded-sm border p-[9px] text-[11px] max-[640px]:gap-[5px] max-[640px]:p-2 ${values.amenities.includes(label) ? 'border-brand-500 bg-brand-50 text-text-primary' : 'border-border-subtle bg-canvas text-text-muted'}`}
          >
            <input
              type="checkbox"
              checked={values.amenities.includes(label)}
              onChange={() => toggle('amenities', label)}
            />
            <img
              src={icon}
              alt=""
            />
            {label}
          </label>)}
        </div>
      </section>

      <section>
        <h3>
          Quy định & nội quy vận hành
        </h3>
        <div className="mt-3 grid grid-cols-2 items-start gap-2.5 max-[640px]:grid-cols-1">
          <fieldset
            className="rounded-sm border border-border-subtle bg-canvas p-3 text-[11px] [&_legend]:flex [&_legend]:items-center
              [&_legend]:gap-[5px] [&_legend]:px-[5px] [&_legend]:font-semibold [&_legend]:text-text-primary
              [&_label]:my-[3px] [&_label]:mr-2.5 [&_label]:inline-flex [&_label]:items-center [&_label]:gap-[5px]"
          >
            <legend>
              <img
                src={managementAssets.property.gateScheduleIcon}
                alt=""
              />
              Khung giờ ra vào / Khóa cổng
            </legend>
            <label>
              <input
                type="radio"
                name="gateMode"
                checked={values.gateMode === 'free'}
                onChange={() => setValues({ ...values, gateMode: 'free' })}
              />
              Tự do 24/7 (Vân tay)
            </label>
            <label>
              <input
                type="radio"
                name="gateMode"
                checked={values.gateMode === 'scheduled'}
                onChange={() => setValues({ ...values, gateMode: 'scheduled' })}
              />
              Khóa (23:00 - 05:00)
            </label>
          </fieldset>
          <fieldset
            className="rounded-sm border border-border-subtle bg-canvas p-3 text-[11px] [&_legend]:flex [&_legend]:items-center
              [&_legend]:gap-[5px] [&_legend]:px-[5px] [&_legend]:font-semibold [&_legend]:text-text-primary
              [&_label]:my-[3px] [&_label]:mr-2.5 [&_label]:inline-flex [&_label]:items-center [&_label]:gap-[5px]"
          >
            <legend>
              <img
                src={managementAssets.property.fireSafetyIcon}
                alt=""
              />
              An toàn PCCC & Trật tự
            </legend>
            {SAFETY_RULES.map((rule) => <label key={rule}>
              <input
                type="checkbox"
                checked={values.safetyRules.includes(rule)}
                onChange={() => toggle('safetyRules', rule)}
              />
              {rule}
            </label>)}
          </fieldset>
        </div>
      </section>

      {error && <p
        role="alert"
        className="text-[11px] text-danger"
      >
        {error}
      </p>}

    </form>

  </Modal>;
}
