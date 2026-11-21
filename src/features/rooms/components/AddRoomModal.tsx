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
  const update = (field: keyof RoomFormValues, value: string) => {
    setValues((previous) => ({ ...previous, [field]: value }));
  };

  const toggleAmenity = (label: string) => {
    setValues((previous) => ({
      ...previous,
      amenities: previous.amenities.includes(label)
        ? previous.amenities.filter((item) => item !== label)
        : [...previous.amenities, label],
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isPending) return;
    const nextErrors = validateRoomForm(values, rooms, propertyId, floors);
    setErrors(nextErrors);
    const firstErrorField = Object.keys(nextErrors)[0];
    if (firstErrorField) {
      event.currentTarget.querySelector<HTMLElement>(`[name="${firstErrorField}"]`)?.focus();
      return;
    }
    const submitter = (event.nativeEvent as SubmitEvent).submitter;
    onSubmit(values, submitter instanceof HTMLButtonElement && submitter.value === 'price');
  };

  return <Modal
    isOpen
    onClose={onClose}
    title="Thêm Phòng Mới Vào Khu Trọ"
    description={propertyName}
    size="2xl"
    className="[&>div:first-child]:shrink-0 [&>div:last-child]:shrink-0 [&>div:nth-child(2)]:max-h-none
      [&_button]:cursor-pointer [&_select]:cursor-pointer [&_button]:gap-[7px]"
    footer={<div
      className="flex w-full flex-wrap items-center justify-between gap-3 [&>div]:ml-auto [&>div]:flex [&>div]:flex-wrap
        [&>div]:gap-2 [&_button]:gap-1.5 [&_button]:text-xs [&_small]:text-[11px] [&_small]:text-text-muted
        max-[640px]:gap-2 max-[640px]:[&>div]:m-0 max-[640px]:[&_button]:px-2.5 max-[640px]:[&_button]:py-[7px]
        max-[640px]:[&_button]:text-[11px]"
    >

      <Button
        type="button"
        variant="ghost"
        disabled={!template || isPending}
        title={!template ? 'Khu này chưa có phòng P.201 để lấy mẫu.' : undefined}
        onClick={() => template && setValues((previous) => ({ ...previous, amenities: [...template.amenities] }))}
      >
        <img
          src={managementAssets.room.copyAmenitiesIcon}
          alt=""
        />
        Áp dụng mẫu tiện nghi từ P.201
      </Button>

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
          variant="secondary"
          form="add-room-form"
          disabled={isPending || !floors.length}
        >
          Lưu phòng
        </Button>
        <Button
          type="submit"
          value="price"
          form="add-room-form"
          isLoading={isPending}
          disabled={!floors.length}
        >
          Lưu & Cấu hình giá ngay{' '}
          <img
            src={managementAssets.room.configurePriceIcon}
            alt=""
          />
        </Button>
      </div>

    </div>}
  >

    <form
      id="add-room-form"
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
          Định danh & thông số kỹ thuật phòng
        </h3>
        <div className="mt-3 grid grid-cols-4 items-start gap-2.5 max-[640px]:grid-cols-1">

          <Input
            id="room-code"
            name="code"
            label="Tên / Mã *"
            value={values.code}
            onChange={(e) => update('code', e.target.value)}
            error={errors.code}
            required
            helperText="Duy nhất trong khu"
          />

          <div
            className="flex flex-col gap-1 [&_label]:text-xs [&_label]:font-semibold [&_label]:text-text-primary
              [&_select]:min-h-[38px] [&_select]:w-full [&_select]:rounded-sm [&_select]:border
              [&_select]:border-border-subtle [&_select]:bg-canvas [&_select]:px-2.5 [&_select]:py-[7px]
              [&_select]:text-xs [&_select[aria-invalid=true]]:border-danger"
          >
            <label htmlFor="room-floor">
              Tầng *
            </label>
            <select
              id="room-floor"
              name="floor"
              value={values.floor}
              onChange={(e) => update('floor', e.target.value)}
              required
              aria-invalid={Boolean(errors.floor)}
              aria-describedby={errors.floor ? 'room-floor-error' : undefined}
            >
              <option value="">
                Chọn tầng
              </option>
              {floors.map((floor) => <option
                key={floor}
                value={floor}
              >
                {floor === 0 ? 'Tầng trệt' : `Tầng ${floor}`}
              </option>)}
            </select>
            {errors.floor && <span
              id="room-floor-error"
              className="text-[11px] text-danger"
            >
              {errors.floor}
            </span>}
            {!floors.length && <small>
              Khu chưa có tầng khả dụng.
            </small>}
          </div>

          <Input
            id="room-area"
            name="area"
            label="Diện tích (m²) *"
            type="number"
            step="any"
            value={values.area}
            onChange={(e) => update('area', e.target.value)}
            error={errors.area}
            required
            helperText="Diện tích sử dụng"
          />

          <Input
            id="room-capacity"
            name="capacity"
            label="Sức chứa (người) *"
            type="number"
            step="1"
            value={values.capacity}
            onChange={(e) => update('capacity', e.target.value)}
            error={errors.capacity}
            required
          />

        </div>
      </section>

      <section>
        <h3>
          Bộ sưu tập hình ảnh thực tế căn phòng
        </h3>
        <ManagementPhotoStrip
          images={managementAssets.roomPhotos}
          labels={ROOM_PHOTO_LABELS}
          uploadIcon={managementAssets.room.uploadIcon}
        />
        <small>
          Ảnh mẫu minh họa, chưa gắn với phòng mới.
        </small>
      </section>

      <section>
        <div className="flex flex-wrap items-baseline justify-between gap-2 [&>span]:text-[11px] [&>span]:text-brand-500">
          <h3>
            Tiện ích & nội thất riêng có sẵn trong phòng
          </h3>
          <span>
            Đã chọn{' '}
            {values.amenities.length}
            {' '}tiện ích
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2 max-[640px]:grid-cols-2">
          {ROOM_AMENITIES.map(({ label, icon }) => <label
            key={label}
            className={`flex cursor-pointer items-center gap-2 rounded-sm border p-[9px] text-[11px] max-[640px]:gap-[5px] max-[640px]:p-2 ${values.amenities.includes(label) ? 'border-brand-500 bg-brand-50 text-text-primary' : 'border-border-subtle bg-canvas text-text-muted'}`}
          >
            <input
              type="checkbox"
              checked={values.amenities.includes(label)}
              onChange={() => toggleAmenity(label)}
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
          Trạng thái ban đầu & ràng buộc nghiệp vụ
        </h3>
        <div
          className="flex flex-wrap justify-between gap-3 rounded-[12px] border border-border-subtle bg-canvas p-3.5
            text-[10px] text-text-muted"
        >
          <span>
            Khai thác:{' '}
            <b
              className="inline-block whitespace-nowrap rounded-pill border px-[9px] py-1 font-sans text-[10px]/[15px]
                font-semibold aria-pressed:outline-2 aria-pressed:outline-offset-2 aria-pressed:outline-current
                border-success-border bg-success-soft text-secondary-600"
            >
              ● Trống
            </b>
            {' '}(Sẵn sàng đón khách)
          </span>
          <span>
            Hiển thị:{' '}
            <b>
              ● Đã ẩn
            </b>
            {' '}(Chưa kích hoạt)
          </span>
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
