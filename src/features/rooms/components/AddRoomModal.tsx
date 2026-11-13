import { useState } from 'react';
import type { FormEvent } from 'react';

import { managementAssets } from '@/assets/property-management';
import { Button, Input, Modal } from '@/components/ui';

import { EMPTY_ROOM_FORM, ROOM_AMENITIES, ROOM_PHOTO_LABELS } from '../managementConstants';
import type { AddRoomModalProps, RoomFormErrors, RoomFormValues } from '../types';
import { validateRoomForm } from '../utils/roomManagement';
import { ManagementPhotoStrip } from './ManagementPhotoStrip';

export function AddRoomModal({ propertyId, propertyName, floors, rooms, isPending, error, onClose, onSubmit }: AddRoomModalProps) {
  const [values, setValues] = useState<RoomFormValues>({ ...EMPTY_ROOM_FORM, amenities: [] });
  const [errors, setErrors] = useState<RoomFormErrors>({});
  const template = rooms.find((room) => room.propertyId === propertyId && room.code === 'P.201');
  const update = (field: keyof RoomFormValues, value: string) => setValues((previous) => ({ ...previous, [field]: value }));
  const toggleAmenity = (label: string) => setValues((previous) => ({ ...previous, amenities: previous.amenities.includes(label) ? previous.amenities.filter((item) => item !== label) : [...previous.amenities, label] }));
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isPending) return;
    const nextErrors = validateRoomForm(values, rooms, propertyId, floors);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) { event.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(nextErrors)[0]}"]`)?.focus(); return; }
    const submitter = (event.nativeEvent as SubmitEvent).submitter;
    onSubmit(values, submitter instanceof HTMLButtonElement && submitter.value === 'price');
  };

  return <Modal isOpen onClose={onClose} title="Thêm Phòng Mới Vào Khu Trọ" description={propertyName} size="2xl" className="management-modal" footer={<div className="management-modal-footer">
    <Button type="button" variant="ghost" disabled={!template || isPending} title={!template ? 'Khu này chưa có phòng P.201 để lấy mẫu.' : undefined} onClick={() => template && setValues((previous) => ({ ...previous, amenities: [...template.amenities] }))}><img src={managementAssets.room.container13} alt="" />Áp dụng mẫu tiện nghi từ P.201</Button>
    <div><Button type="button" variant="outline" disabled={isPending} onClick={onClose}>Hủy bỏ</Button><Button type="submit" variant="secondary" form="add-room-form" disabled={isPending || !floors.length}>Lưu phòng</Button><Button type="submit" value="price" form="add-room-form" isLoading={isPending} disabled={!floors.length}>Lưu & Cấu hình giá ngay <img src={managementAssets.room.container14} alt="" /></Button></div>
  </div>}>
    <form id="add-room-form" noValidate onSubmit={handleSubmit} className="management-form">
      <section><h3>Định danh & thông số kỹ thuật phòng</h3><div className="management-form-grid four">
        <Input id="room-code" name="code" label="Tên / Mã *" value={values.code} onChange={(e) => update('code', e.target.value)} error={errors.code} required helperText="Duy nhất trong khu" />
        <div className="management-field"><label htmlFor="room-floor">Tầng *</label><select id="room-floor" name="floor" value={values.floor} onChange={(e) => update('floor', e.target.value)} required aria-invalid={Boolean(errors.floor)} aria-describedby={errors.floor ? 'room-floor-error' : undefined}><option value="">Chọn tầng</option>{floors.map((floor) => <option key={floor} value={floor}>{floor === 0 ? 'Tầng trệt' : `Tầng ${floor}`}</option>)}</select>{errors.floor && <span id="room-floor-error" className="management-error">{errors.floor}</span>}{!floors.length && <small>Khu chưa có tầng khả dụng.</small>}</div>
        <Input id="room-area" name="area" label="Diện tích (m²) *" type="number" step="any" value={values.area} onChange={(e) => update('area', e.target.value)} error={errors.area} required helperText="Diện tích sử dụng" />
        <Input id="room-capacity" name="capacity" label="Sức chứa (người) *" type="number" step="1" value={values.capacity} onChange={(e) => update('capacity', e.target.value)} error={errors.capacity} required />
      </div></section>
      <section><h3>Bộ sưu tập hình ảnh thực tế căn phòng</h3><ManagementPhotoStrip images={managementAssets.roomPhotos} labels={ROOM_PHOTO_LABELS} uploadIcon={managementAssets.room.container2} /><small>Ảnh mẫu minh họa, chưa gắn với phòng mới.</small></section>
      <section><div className="management-section-title"><h3>Tiện ích & nội thất riêng có sẵn trong phòng</h3><span>Đã chọn {values.amenities.length} tiện ích</span></div><div className="management-options room-options">{ROOM_AMENITIES.map(({ label, icon }) => <label key={label} className={values.amenities.includes(label) ? 'selected' : ''}><input type="checkbox" checked={values.amenities.includes(label)} onChange={() => toggleAmenity(label)} /><img src={icon} alt="" />{label}</label>)}</div></section>
      <section><h3>Trạng thái ban đầu & ràng buộc nghiệp vụ</h3><div className="management-initial-status"><span>Khai thác: <b className="management-status vacant">● Trống</b> (Sẵn sàng đón khách)</span><span>Hiển thị: <b>● Đã ẩn</b> (Chưa kích hoạt)</span></div></section>
      {error && <p role="alert" className="management-error">{error}</p>}
    </form>
  </Modal>;
}
