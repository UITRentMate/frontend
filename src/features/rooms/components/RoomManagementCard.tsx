import { useState } from 'react';

import { managementAssets } from '@/assets/property-management';
import { rentFormatter } from '@/utils/formatCurrency';

import { Button } from '@/components/ui';

import { MANAGED_ROOM_STATUSES, ROOM_STATUS_CLASSES } from '../managementConstants';
import type { RoomManagementCardProps } from '../types';

export function RoomManagementCard({
  room,
  onConfigurePrice,
  onUnsupported,
}: RoomManagementCardProps) {
  const [failedImage, setFailedImage] = useState(false);
  const statusLabel = MANAGED_ROOM_STATUSES.find((status) => status.value === room.status)?.label;

  const actionLabel =
    room.status === 'vacant'
      ? 'Cấu hình giá'
      : room.status === 'reserved'
        ? 'Duyệt cọc ngay'
        : room.status === 'maintenance'
          ? 'Cập nhật tiến độ'
          : 'Xem hợp đồng';

  const actionIcon =
    room.status === 'vacant'
      ? managementAssets.page.configurePriceIcon
      : room.status === 'reserved'
        ? managementAssets.page.approveDepositIcon
        : room.status === 'maintenance'
          ? managementAssets.page.maintenanceProgressIcon
          : managementAssets.page.contractIcon;

  const priceLabel =
    room.status === 'occupied'
      ? 'Giá thuê thực tế:'
      : room.status === 'reserved'
        ? 'Giá giữ chỗ:'
        : room.status === 'maintenance'
          ? 'Giá niêm yết cũ:'
          : 'Giá thuê niêm yết:';

  const visibilityLabel =
    room.status === 'occupied'
      ? 'Đang có khách'
      : room.status === 'reserved'
        ? 'Khóa giữ chỗ'
        : room.isPublished
          ? 'Đang hiển thị'
          : 'Đã ẩn tin';

  const handlePrimaryAction = () => {
    if (room.status === 'vacant') {
      onConfigurePrice(room);
      return;
    }
    onUnsupported();
  };
  return <article
    data-status={room.status}
    className="group/room flex min-w-0 flex-col overflow-hidden border border-border-subtle rounded-[12px]
      bg-surface-card shadow-soft-sm transition-shadow duration-200 hover:shadow-soft-md [&_header]:flex
      [&_header]:flex-wrap [&_header]:items-center [&_header]:justify-between [&_header]:gap-1.5 [&_header]:px-4
      [&_header]:pt-4 [&_header]:pb-3 [&_h2]:font-heading [&_h2]:text-lg/[26px] [&_h2]:font-bold
      [&_h2_span]:font-sans [&_h2_span]:text-[11px]/[18px] [&_h2_span]:font-normal [&_h2_span]:text-text-muted
      [&_footer]:flex [&_footer]:min-h-[70px] [&_footer]:items-center [&_footer]:gap-2 [&_footer]:border-t
      [&_footer]:border-border-subtle [&_footer]:bg-canvas [&_footer]:px-4 [&_footer]:py-3
      [&_footer>button:last-child]:grid [&_footer>button:last-child]:min-w-3.5
      [&_footer>button:last-child]:place-items-center [&_footer_button]:text-[10px]"
  >

    <header>
      <h2>
        {room.code}
        <span>
          •{' '}
          {room.floor === 0 ? 'Tầng trệt' : `Tầng ${room.floor}`}
        </span>
      </h2>
      <span
        className={`inline-block whitespace-nowrap rounded-pill border px-[9px] py-1 font-sans text-[10px]/[15px] font-semibold aria-pressed:outline-2 aria-pressed:outline-offset-2 aria-pressed:outline-current ${ROOM_STATUS_CLASSES[room.status]}`}
      >
        ●{' '}
        {statusLabel}
      </span>
    </header>

    {room.status === 'reserved' && <div
      className="mx-4 mb-3 flex items-start gap-[7px] rounded-sm border border-warning-border bg-warning-soft p-[9px]
        text-[10px]/4 text-warning [&_p]:text-text-secondary"
    >
      <img
        src={managementAssets.page.depositNoticeIcon}
        alt=""
      />
      <div>
        <strong>
          {room.note}
        </strong>
        <p>
          Khách:{' '}
          {room.guestName}
          {' '}(
          {room.guestDetail}
          )
        </p>
      </div>
    </div>}

    {room.status === 'maintenance' && <div
      className="mx-4 mb-3 flex items-start gap-[7px] rounded-sm border border-danger-border bg-danger-soft p-[9px]
        text-[10px]/4 text-danger [&_p]:text-text-secondary"
    >
      <img
        src={managementAssets.page.maintenanceNoticeIcon}
        alt=""
      />
      <div>
        <strong>
          {room.note}
        </strong>
        <p>
          {room.guestDetail}
        </p>
      </div>
    </div>}

    <div
      className="relative mx-4 h-[180px] overflow-hidden rounded-sm bg-canvas [&>img]:h-full [&>img]:w-full
        [&>img]:object-cover max-[640px]:h-[200px]"
    >

      {room.image && !failedImage ? <img
        src={room.image}
        alt={`Phòng ${room.code}`}
        onError={() => setFailedImage(true)}
      /> : <div className="grid h-full place-items-center text-text-muted">
        Chưa có hình ảnh phòng
      </div>}

      {room.status !== 'occupied' && room.status !== 'maintenance' && <div
        className="absolute inset-x-2 bottom-2 flex flex-wrap gap-1 text-[10px] [&_span]:rounded-xs [&_span]:bg-surface-card
          [&_span]:px-[5px] [&_span]:py-[3px] [&_span]:text-text-primary
          [&_span:last-child:not(:first-child)]:text-brand-500"
      >
        <span>
          {room.area}
          {' '}m²
        </span>
        <span>
          Tối đa{' '}
          {room.capacity}
          {' '}người
        </span>
        {room.amenities.includes('Ban công thoáng') && <span>
          Ban công thoáng
        </span>}
      </div>}

      {room.status === 'occupied' && <div
        className="absolute inset-x-2 bottom-2 flex items-center gap-2 rounded-sm bg-surface-card p-2 text-[11px]
          [&>span]:grid [&>span]:size-7 [&>span]:place-items-center [&>span]:rounded-pill [&>span]:bg-brand-500
          [&>span]:text-[9px] [&>span]:text-white [&>div]:flex-1 [&_small]:block [&_small]:text-[10px]
          [&_small]:text-text-muted"
      >
        <span>
          {room.guestName?.split(' ').map((word) => word[0]).slice(-2).join('')}
        </span>
        <div>
          <strong>
            {room.guestName}
          </strong>
          <small>
            {room.guestDetail}
          </small>
        </div>
        <img
          src={managementAssets.page.tenantVerifiedIcon}
          alt=""
        />
      </div>}

    </div>

    <div className="flex flex-1 flex-col gap-3 p-4">

      <p
        className="flex flex-wrap items-baseline gap-1 text-[11px] text-text-muted [&_strong]:ml-auto [&_strong]:font-heading
          [&_strong]:text-xl/7 [&_strong]:font-bold [&_strong]:text-text-primary
          group-data-[status=vacant]/room:[&_strong]:text-brand-500
          group-data-[status=maintenance]/room:[&_strong]:text-text-disabled [&_small]:text-[10px]"
      >
        <span>
          {priceLabel}
        </span>
        <strong>
          {room.monthlyRent === null ? 'Chưa cấu hình' : rentFormatter.format(room.monthlyRent)}
        </strong>
        {room.monthlyRent !== null && <small>
          đ/tháng
        </small>}
      </p>

      {room.status === 'vacant' && <>
        <div
          className="flex justify-around gap-1 rounded-sm border border-border-subtle bg-canvas px-[5px] py-2.5 text-center
            text-[10px] text-text-muted [&_span]:flex-1 [&_span+span]:border-l [&_span+span]:border-border-subtle
            [&_b]:mt-1 [&_b]:block [&_b]:text-[11px] [&_b]:text-text-primary"
        >
          <span>
            Điện
            <b>
              {room.electricityRate ? `${rentFormatter.format(room.electricityRate)}đ` : 'Chưa cấu hình'}
            </b>
          </span>
          <span>
            Nước
            <b>
              {room.waterBillingMode === 'person'
                ? room.waterPerPersonRate
                  ? `${rentFormatter.format(room.waterPerPersonRate)}đ/người`
                  : 'Chưa cấu hình'
                : room.waterRate
                  ? `${rentFormatter.format(room.waterRate)}đ/m³`
                  : 'Chưa cấu hình'}
            </b>
          </span>
          <span>
            Tiền cọc
            <b>
              {room.depositMonths ? `${room.depositMonths} tháng` : 'Chưa cấu hình'}
            </b>
          </span>
        </div>
        <div
          className="flex flex-wrap gap-[5px] text-[10px] text-text-muted [&_span]:rounded-xs [&_span]:border
            [&_span]:border-border-subtle [&_span]:bg-canvas [&_span]:px-[5px] [&_span]:py-[3px]"
        >
          {room.amenities.slice(0, 4).map((amenity) => <span key={amenity}>
            {amenity}
          </span>)}
        </div>
      </>}

      {room.status === 'occupied' && <>
        {room.electricityReading !== undefined && <div
          className="flex justify-around gap-1 rounded-sm border border-border-subtle bg-canvas px-[5px] py-2.5 text-center
            text-[10px] text-text-muted [&_span]:flex-1 [&_span+span]:border-l [&_span+span]:border-border-subtle
            [&_b]:mt-1 [&_b]:block [&_b]:text-[11px] [&_b]:text-text-primary"
        >
          <span>
            Chỉ số Điện
            <b>
              {rentFormatter.format(room.electricityReading)}
              {' '}kWh
            </b>
          </span>
          <span>
            Chỉ số Nước
            <b>
              {room.waterReading}
              {' '}m³
            </b>
          </span>
        </div>}
        <p className="text-[11px]/[18px] text-text-muted">
          {room.note}
        </p>
      </>}

      {room.status === 'reserved' && <p className="text-[11px]/[18px] text-text-muted">
        Khoản cọc dự kiến:{' '}
        {room.monthlyRent === null ? 'Chưa cấu hình' : `${rentFormatter.format(room.monthlyRent)} đ`}
        {' '}(minh họa)
      </p>}

      {room.status === 'maintenance' && <p className="text-[11px]/[18px] text-text-muted">
        Phòng tạm ngưng nhận khách xem trực tiếp cho đến khi hoàn tất nghiệm thu.
      </p>}

    </div>

    <footer>
      <span className="flex flex-1 items-center gap-[7px] text-[10px] text-text-muted">
        <span
          className={`relative h-3.5 w-7 rounded-pill after:absolute after:top-0.5 after:size-2.5 after:rounded-pill after:bg-surface-card after:content-[''] ${room.isPublished ? 'bg-brand-500 after:left-4' : 'bg-border-subtle after:left-0.5'}`}
        />
        {visibilityLabel}
      </span>
      <Button
        type="button"
        size="sm"
        variant={room.status === 'vacant' ? 'primary' : 'outline'}
        onClick={handlePrimaryAction}
        title={room.status === 'vacant' ? undefined : 'Chưa hỗ trợ ở giai đoạn này'}
      >
        <img
          src={actionIcon}
          alt=""
        />
        {actionLabel}
      </Button>
      <button
        type="button"
        aria-label={`Thao tác khác cho ${room.code}`}
        onClick={onUnsupported}
      >
        <img
          src={managementAssets.page.moreActionsIcon}
          alt=""
        />
      </button>
    </footer>

  </article>;
}
