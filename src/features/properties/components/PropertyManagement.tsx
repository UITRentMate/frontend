import { managementAssets } from '@/assets/property-management';
import { rentFormatter } from '@/utils/formatCurrency';

import { Button, EmptyState, Input, Loading } from '@/components/ui';

import { AddRoomModal } from '@/features/rooms/components/AddRoomModal';
import { RoomManagementCard } from '@/features/rooms/components/RoomManagementCard';
import { RoomPricingModal } from '@/features/rooms/components/RoomPricingModal';
import { MANAGED_ROOM_STATUSES, ROOM_STATUS_CLASSES } from '@/features/rooms/managementConstants';

import { usePropertyManagement } from '../hooks/usePropertyManagement';
import { AddPropertyModal } from './AddPropertyModal';
import { PropertySettingsModal } from './PropertySettingsModal';

export function PropertyManagement() {
  const management = usePropertyManagement();
  const {
    query,
    property,
    properties,
    rooms,
    visibleRooms,
    pricingRoom,
    modal,
    notice,
    isPending,
  } = management;
  const vacant = rooms.filter((room) => room.status === 'vacant').length;
  const occupied = rooms.filter((room) => room.status === 'occupied').length;
  const reserved = rooms.filter((room) => room.status === 'reserved').length;
  const expectedRevenue = rooms.reduce(
    (total, room) => total + (room.status === 'occupied' ? (room.monthlyRent ?? 0) : 0),
    0,
  );
  const otherVacantCount = pricingRoom
    ? rooms.filter((room) => room.status === 'vacant' && room.id !== pricingRoom.id).length
    : 0;

  if (query.isPending) {
    return <Loading message="Đang tải khu trọ và phòng trọ..." />;
  }
  if (query.isError) {
    return (
      <EmptyState
        title="Không thể tải dữ liệu khu trọ"
        description={query.error.message}
        actionLabel="Thử lại"
        onAction={() => {
          void query.refetch();
        }}
      />
    );
  }

  return <div
    className="flex flex-col gap-5 text-[13px] max-[640px]:gap-4 [&_button]:cursor-pointer [&_button]:gap-[7px]
      [&_select]:cursor-pointer"
  >

    <h1 className="sr-only">
      Quản lý khu trọ và phòng trọ
    </h1>

    <section
      className="flex items-center justify-between gap-5 p-[17px] border border-border-subtle rounded-[12px]
        bg-surface-card shadow-soft-sm [&>div:first-child]:min-w-0 max-[1250px]:flex-col max-[1250px]:items-start
        max-[640px]:p-3"
    >

      <div>
        {property ? <>
          <label
            className="inline-flex max-w-full items-center gap-3 rounded-sm border border-border-subtle bg-canvas px-3.5
              py-[11px] [&>img]:box-content [&>img]:rounded-sm [&>img]:border [&>img]:border-brand-200
              [&>img]:bg-brand-50 [&>img]:p-2.5 [&>span]:min-w-0 [&_select]:w-full [&_select]:max-w-[400px]
              [&_select]:font-heading [&_select]:text-base/6 [&_select]:font-bold [&_select]:text-text-primary
              [&_small]:mt-[3px] [&_small]:block [&_small]:text-xs [&_small]:text-text-muted
              [&_small_b]:text-secondary-600 max-[640px]:[&_select]:text-[13px] max-[640px]:[&>img]:p-1.5
              max-[480px]:w-full max-[480px]:p-2.5"
          >
            <img
              src={managementAssets.page.propertyIcon}
              alt=""
            />
            <span>
              <select
                aria-label="Khu trọ đang quản lý"
                value={property.id}
                onChange={(e) => management.selectProperty(e.target.value)}
              >
                {properties.map((item) => <option
                  key={item.id}
                  value={item.id}
                >
                  {item.name}
                </option>)}
              </select>
              <small>
                Tổng:{' '}
                {rooms.length}
                {' '}phòng •{' '}
                <b>
                  {vacant}
                  {' '}phòng trống
                </b>
              </small>
            </span>
          </label>
          <div
            className="mt-3 flex flex-wrap items-center gap-2 [&>span:first-child]:inline-flex [&>span:first-child]:items-center [&>span:first-child]:gap-[7px]
              [&>span:first-child]:rounded-pill [&>span:first-child]:border [&>span:first-child]:border-border-subtle [&>span:first-child]:bg-canvas [&>span:first-child]:px-[11px]
              [&>span:first-child]:py-1.5 [&>span:first-child]:text-[11px] max-[640px]:[&>span:first-child]:rounded-sm"
          >
            <span>
              <img
                src={managementAssets.page.locationIcon}
                alt=""
              />
              {property.street}
              ,{' '}
              {property.ward}
              ,{' '}
              {property.district}
            </span>
            <span
              className="inline-block whitespace-nowrap rounded-pill border px-[9px] py-1 font-sans text-[10px]/[15px]
                font-semibold aria-pressed:outline-2 aria-pressed:outline-offset-2 aria-pressed:outline-current
                border-success-border bg-success-soft text-secondary-600"
            >
              ● Đang hoạt động ổn định
            </span>
          </div>
        </> : <h2>
          Chưa có khu trọ
        </h2>}
      </div>

      <div
        className="flex items-center gap-2 [&_button]:max-w-[170px] [&_button]:text-xs max-[640px]:flex-wrap
          max-[480px]:[&_button]:max-w-none"
      >
        <Button
          type="button"
          variant="outline"
          disabled={!property}
          onClick={() => management.openModal('settings')}
        >
          <img
            src={managementAssets.page.settingsIcon}
            alt=""
          />
          Cài đặt & Nội quy khu trọ
        </Button>
        <Button
          type="button"
          onClick={() => management.openModal('property')}
        >
          <img
            src={managementAssets.page.addPropertyIcon}
            alt=""
          />
          Thêm khu trọ mới
        </Button>
      </div>

    </section>

    <div
      className="grid grid-cols-4 gap-4 [&>section]:flex [&>section]:min-h-[120px] [&>section]:items-center
        [&>section]:justify-between [&>section]:gap-2 [&>section]:rounded-[12px] [&>section]:border
        [&>section]:border-border-subtle [&>section]:bg-surface-card [&>section]:p-[17px]
        [&>section]:shadow-soft-sm [&_h2]:font-sans [&_h2]:text-[10px]/[17px] [&_h2]:font-bold
        [&_h2]:tracking-[.4px] [&_h2]:text-text-muted [&_h2]:uppercase [&_strong]:my-[5px] [&_strong]:block
        [&_strong]:font-heading [&_strong]:text-[clamp(20px,1.7vw,28px)] [&_strong]:leading-[1.4]
        [&_strong]:font-bold [&_small]:block [&_small]:text-[10px] [&_small]:text-secondary-600
        [&_strong_small]:inline [&_strong_small]:font-sans [&_strong_small]:text-xs [&_strong_small]:font-normal
        [&_strong_small]:text-text-muted [&>section>span]:grid [&>section>span]:shrink-0
        [&>section>span]:place-items-center [&>section>span]:rounded-sm [&>section>span]:border
        [&>section>span]:border-brand-100 [&>section>span]:bg-brand-50 [&>section>span]:p-3
        [&>section:nth-child(2)>span]:border-success-border [&>section:nth-child(2)>span]:bg-success-soft
        [&>section:nth-child(3)>span]:border-warning-border [&>section:nth-child(3)>span]:bg-warning-soft
        [&>section:nth-child(4)>span]:border-info-border [&>section:nth-child(4)>span]:bg-info-soft
        max-[1250px]:grid-cols-2 max-[640px]:gap-2 max-[640px]:[&>section]:p-3 max-[640px]:[&>section>span]:p-2
        max-[640px]:[&_strong]:text-[19px] max-[480px]:[&>section>span]:hidden"
    >

      <section>
        <div>
          <h2>
            Tỷ lệ lấp đầy
          </h2>
          <strong>
            {rooms.length ? (occupied / rooms.length * 100).toLocaleString('vi-VN', { maximumFractionDigits: 1 }) : 0}
            %
          </strong>
          <small>
            {occupied}
            {' '}/{' '}
            {rooms.length}
            {' '}phòng đang thuê
          </small>
        </div>
        <span>
          <img
            src={managementAssets.page.occupancyIcon}
            alt=""
          />
        </span>
      </section>

      <section>
        <div>
          <h2>
            Phòng sẵn sàng
          </h2>
          <strong className="text-secondary-600">
            {vacant.toString().padStart(2, '0')}
          </strong>
          <small>
            Phòng trống trong khu
          </small>
        </div>
        <span>
          <img
            src={managementAssets.page.vacantRoomIcon}
            alt=""
          />
        </span>
      </section>

      <section>
        <div>
          <h2>
            Đang chờ cọc
          </h2>
          <strong className="text-warning">
            {reserved.toString().padStart(2, '0')}
          </strong>
          <small>
            Phòng đang giữ chỗ
          </small>
        </div>
        <span>
          <img
            src={managementAssets.page.reservationIcon}
            alt=""
          />
        </span>
      </section>

      <section>
        <div>
          <h2>
            Doanh thu dự tính
          </h2>
          <strong>
            {rentFormatter.format(expectedRevenue)}
            <small>
              {' '}đ
            </small>
          </strong>
          <small>
            Tổng giá phòng đang thuê / tháng
          </small>
        </div>
        <span>
          <img
            src={managementAssets.page.revenueIcon}
            alt=""
          />
        </span>
      </section>

    </div>

    <p className="-mt-2.5 text-[11px] text-text-muted">
      Dữ liệu minh họa • Chỉ số của toàn khu đang chọn, không đổi theo bộ lọc • Thay đổi sẽ mất khi tải lại trang.
    </p>

    <section
      className="p-4 border border-border-subtle rounded-[12px] bg-surface-card shadow-soft-sm"
      aria-label="Tìm kiếm và lọc phòng"
    >

      <div
        className="flex items-center gap-2 [&>div:first-child]:min-w-[160px] [&>div:first-child]:flex-1 [&>button]:shrink-0
          [&>button]:text-xs [&>button]:whitespace-nowrap [&_input]:bg-canvas max-[1250px]:flex-wrap
          max-[640px]:[&>div:first-child]:basis-full"
      >
        <Input
          id="room-search"
          aria-label="Tìm tên, mã phòng hoặc tên khách"
          placeholder="Tìm tên/mã phòng, tên khách..."
          value={management.search}
          onChange={(e) => management.setSearch(e.target.value)}
          leftIcon={<img
            src={managementAssets.page.searchIcon}
            alt=""
          />}
        />
        <div
          className="flex shrink-0 rounded-sm border border-border-subtle bg-canvas p-1 [&_button]:flex [&_button]:items-center
            [&_button]:gap-[5px] [&_button]:rounded-xs [&_button]:px-[7px] [&_button]:py-[5px] [&_button]:text-[11px]
            [&_button]:text-text-muted [&_button[aria-pressed=true]]:bg-surface-card
            [&_button[aria-pressed=true]]:text-brand-500 [&_button[aria-pressed=true]]:shadow-soft-xs"
        >
          <button
            type="button"
            aria-pressed="true"
          >
            <img
              src={managementAssets.page.gridViewIcon}
              alt=""
            />
            Lưới
          </button>
          <button
            type="button"
            onClick={management.unsupported}
          >
            <img
              src={managementAssets.page.listViewIcon}
              alt=""
            />
            Danh sách
          </button>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={management.unsupported}
        >
          <img
            src={managementAssets.page.exportExcelIcon}
            alt=""
          />
          Xuất Excel
        </Button>
        <Button
          type="button"
          disabled={!property}
          onClick={() => management.openModal('room')}
        >
          <img
            src={managementAssets.page.addRoomIcon}
            alt=""
          />
          Thêm phòng mới
        </Button>
      </div>

      <div
        className="mt-3.5 flex flex-wrap items-center gap-2.5 border-t border-border-subtle pt-3.5 [&>label]:flex
          [&>label]:items-center [&>label]:gap-2 [&>label]:text-[11px] [&>label]:text-text-muted
          [&_select]:rounded-sm [&_select]:bg-brand-500 [&_select]:px-2.5 [&_select]:py-[7px] [&_select]:text-white
          [&>div]:flex [&>div]:flex-wrap [&>div]:gap-1.5"
      >
        <label>
          Khu vực:{' '}
          <select
            aria-label="Lọc tầng"
            value={management.floor}
            onChange={(e) => management.setFloor(e.target.value)}
          >
            <option value="all">
              Tất cả các tầng
            </option>
            {property?.floors.map((floor) => <option
              key={floor}
              value={floor}
            >
              {floor === 0 ? 'Tầng trệt' : `Tầng ${floor}`}
              {' '}(
              {rooms.filter((room) => room.floor === floor).length}
              )
            </option>)}
          </select>
        </label>
        <div
          role="group"
          aria-label="Lọc trạng thái phòng"
        >
          <button
            type="button"
            className="inline-block whitespace-nowrap rounded-pill border px-[9px] py-1 font-sans text-[10px]/[15px]
              font-semibold aria-pressed:outline-2 aria-pressed:outline-offset-2 aria-pressed:outline-current
              border-brand-200 bg-brand-50 text-brand-500"
            aria-pressed={management.status === 'all'}
            onClick={() => management.setStatus('all')}
          >
            Tất cả (
            {rooms.length}
            )
          </button>
          {MANAGED_ROOM_STATUSES.map(({ value, label }) => <button
            type="button"
            key={value}
            className={`inline-block whitespace-nowrap rounded-pill border px-[9px] py-1 font-sans text-[10px]/[15px] font-semibold aria-pressed:outline-2 aria-pressed:outline-offset-2 aria-pressed:outline-current ${ROOM_STATUS_CLASSES[value]}`}
            aria-pressed={management.status === value}
            onClick={() => management.setStatus(value)}
          >
            ●{' '}
            {label}
            {' '}(
            {rooms.filter((room) => room.status === value).length}
            )
          </button>)}
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={management.clearFilters}
        >
          Xóa bộ lọc
        </Button>
      </div>

    </section>

    <div
      role="status"
      aria-live="polite"
      className={notice ? 'rounded-md border border-brand-200 bg-brand-50 px-4 py-3 text-brand-600' : 'sr-only'}
    >
      {notice}
    </div>

    <p className="-mt-2.5 text-[11px] text-text-muted">
      Hiển thị{' '}
      {visibleRooms.length}
      {' '}/{' '}
      {rooms.length}
      {' '}phòng
    </p>

    {visibleRooms.length ? (
      <div className="grid grid-cols-3 items-stretch gap-4 max-[1250px]:grid-cols-2 max-[640px]:grid-cols-1">
        {visibleRooms.map((room) => (
          <RoomManagementCard
            key={room.id}
            room={room}
            onConfigurePrice={management.openPricingModal}
            onUnsupported={management.unsupported}
          />
        ))}
      </div>
    ) : (
      <EmptyState
        title={rooms.length ? 'Không tìm thấy phòng phù hợp' : 'Khu trọ chưa có phòng'}
        description={
          rooms.length
            ? 'Thử đổi từ khóa hoặc xóa bộ lọc để xem tất cả phòng.'
            : 'Thêm phòng đầu tiên cho khu trọ này.'
        }
        actionLabel={rooms.length ? 'Xóa bộ lọc' : 'Thêm phòng mới'}
        onAction={
          rooms.length
            ? management.clearFilters
            : () => management.openModal(property ? 'room' : 'property')
        }
      />
    )}

    {modal === 'property' && (
      <AddPropertyModal
        isPending={isPending}
        error={management.createProperty.error?.message ?? ''}
        onClose={management.closeModal}
        onSubmit={(values) => {
          if (!isPending) {
            management.createProperty.mutate(values);
          }
        }}
      />
    )}

    {modal === 'settings' && property && (
      <PropertySettingsModal
        key={property.id}
        property={property}
        rooms={rooms}
        isPending={isPending}
        error={management.updateSettings.error?.message ?? ''}
        onClose={management.closeModal}
        onSubmit={management.savePropertySettings}
      />
    )}

    {modal === 'room' && property && (
      <AddRoomModal
        key={property.id}
        propertyId={property.id}
        propertyName={property.name}
        floors={property.floors}
        rooms={rooms}
        isPending={isPending}
        error={management.createRoom.error?.message ?? ''}
        onClose={management.closeModal}
        onSubmit={management.saveRoom}
      />
    )}

    {modal === 'pricing' && pricingRoom && (
      <RoomPricingModal
        key={pricingRoom.id}
        room={pricingRoom}
        otherVacantCount={otherVacantCount}
        isPending={isPending}
        error={management.updateRoomPricing.error?.message ?? ''}
        onClose={management.closeModal}
        onSubmit={management.saveRoomPricing}
      />
    )}

  </div>;
}
