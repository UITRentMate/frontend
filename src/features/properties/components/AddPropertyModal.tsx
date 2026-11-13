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
  const toggle = (field: 'amenities' | 'safetyRules', label: string) => setValues((previous) => ({ ...previous, [field]: previous[field].includes(label) ? previous[field].filter((item) => item !== label) : [...previous[field], label] }));
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isPending) return;
    const nextErrors = validatePropertyForm(values); setErrors(nextErrors);
    if (Object.keys(nextErrors).length) { event.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(nextErrors)[0]}"]`)?.focus(); return; }
    onSubmit(values);
  };
  return <Modal isOpen onClose={onClose} title="Thêm Khu Trọ Mới" description="Khu trọ là gốc dữ liệu dùng để quản lý phòng, ký hợp đồng và cấu hình dịch vụ trực thuộc." size="3xl" className="management-modal" footer={<div className="management-modal-footer"><small>Sau khi tạo thành công, chuyển sang bước Thêm phòng trọ mới.</small><div><Button type="button" variant="outline" disabled={isPending} onClick={onClose}>Hủy bỏ</Button><Button type="submit" form="add-property-form" isLoading={isPending}><img src={managementAssets.property.container13} alt="" />Tạo khu trọ mới</Button></div></div>}>
    <form id="add-property-form" noValidate onSubmit={handleSubmit} className="management-form">
      <section><h3>Thông tin nhận diện & vị trí hành chính</h3><Input id="property-name" name="name" label="Tên khu trọ *" required value={values.name} error={errors.name} onChange={(e) => setValues({ ...values, name: e.target.value })} /><div className="management-form-grid four">
        <div className="management-field"><label htmlFor="property-city">Tỉnh / Thành phố *</label><select id="property-city" name="city" required value={values.city} aria-invalid={Boolean(errors.city)} aria-describedby={errors.city ? 'property-city-error' : undefined} onChange={(e) => setValues({ ...values, city: e.target.value, district: '', ward: '' })}><option value="">Chọn tỉnh / thành phố</option>{MOCK_ADDRESS_OPTIONS.map((option) => <option key={option.city}>{option.city}</option>)}</select>{errors.city && <span id="property-city-error" className="management-error">{errors.city}</span>}</div>
        <div className="management-field"><label htmlFor="property-district">Quận / Huyện *</label><select id="property-district" name="district" required value={values.district} disabled={!city} aria-invalid={Boolean(errors.district)} aria-describedby={errors.district ? 'property-district-error' : undefined} onChange={(e) => setValues({ ...values, district: e.target.value, ward: '' })}><option value="">Chọn quận / huyện</option>{city?.districts.map((option) => <option key={option.name}>{option.name}</option>)}</select>{errors.district && <span id="property-district-error" className="management-error">{errors.district}</span>}</div>
        <div className="management-field"><label htmlFor="property-ward">Phường / Xã *</label><select id="property-ward" name="ward" required value={values.ward} disabled={!district} aria-invalid={Boolean(errors.ward)} aria-describedby={errors.ward ? 'property-ward-error' : undefined} onChange={(e) => setValues({ ...values, ward: e.target.value })}><option value="">Chọn phường / xã</option>{district?.wards.map((ward) => <option key={ward}>{ward}</option>)}</select>{errors.ward && <span id="property-ward-error" className="management-error">{errors.ward}</span>}</div>
        <Input id="property-street" name="street" label="Số nhà, tên đường *" required value={values.street} error={errors.street} onChange={(e) => setValues({ ...values, street: e.target.value })} />
      </div><p className="management-hint"><img src={managementAssets.property.container1} alt="" />Địa chỉ minh họa theo thiết kế, chưa kết nối dịch vụ địa chỉ.</p></section>
      <section><div className="management-section-title"><h3>Hình ảnh thực tế khu trọ</h3><small>Ảnh mẫu • Tối đa 10MB theo thiết kế</small></div><ManagementPhotoStrip images={managementAssets.propertyPhotos} labels={PROPERTY_PHOTO_LABELS} uploadIcon={managementAssets.property.container2} /></section>
      <section><h3>Tiện ích & cơ sở vật chất</h3><div className="management-options property-options">{PROPERTY_AMENITIES.map(({ label, icon }) => <label key={label} className={values.amenities.includes(label) ? 'selected' : ''}><input type="checkbox" checked={values.amenities.includes(label)} onChange={() => toggle('amenities', label)} /><img src={icon} alt="" />{label}</label>)}</div></section>
      <section><h3>Quy định & nội quy vận hành</h3><div className="management-form-grid two"><fieldset className="management-rules"><legend><img src={managementAssets.property.container10} alt="" />Khung giờ ra vào / Khóa cổng</legend><label><input type="radio" name="gateMode" checked={values.gateMode === 'free'} onChange={() => setValues({ ...values, gateMode: 'free' })} />Tự do 24/7 (Vân tay)</label><label><input type="radio" name="gateMode" checked={values.gateMode === 'scheduled'} onChange={() => setValues({ ...values, gateMode: 'scheduled' })} />Khóa (23:00 - 05:00)</label></fieldset><fieldset className="management-rules"><legend><img src={managementAssets.property.container11} alt="" />An toàn PCCC & Trật tự</legend>{SAFETY_RULES.map((rule) => <label key={rule}><input type="checkbox" checked={values.safetyRules.includes(rule)} onChange={() => toggle('safetyRules', rule)} />{rule}</label>)}</fieldset></div></section>
      {error && <p role="alert" className="management-error">{error}</p>}
    </form>
  </Modal>;
}
