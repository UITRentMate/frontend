import { managementAssets } from '@/assets/property-management';
import { Button, EmptyState, Input, Loading } from '@/components/ui';

import { AddRoomModal } from '@/features/rooms/components/AddRoomModal';
import { RoomManagementCard } from '@/features/rooms/components/RoomManagementCard';
import { MANAGED_ROOM_STATUSES, rentFormatter } from '@/features/rooms/managementConstants';

import { usePropertyManagement } from '../hooks/usePropertyManagement';
import { AddPropertyModal } from './AddPropertyModal';

import '@/styles/propertyManagement.css';

export function PropertyManagement() {
  const management = usePropertyManagement();
  const { query, property, properties, rooms, visibleRooms, modal, notice, isPending } = management;
  const vacant = rooms.filter((room) => room.status === 'vacant').length;
  const occupied = rooms.filter((room) => room.status === 'occupied').length;
  const reserved = rooms.filter((room) => room.status === 'reserved').length;
  const expectedRevenue = rooms.reduce((total, room) => total + (room.status === 'occupied' ? room.monthlyRent ?? 0 : 0), 0);
  if (query.isPending) return <Loading message="Đang tải khu trọ và phòng trọ..." />;
  if (query.isError) return <EmptyState title="Không thể tải dữ liệu khu trọ" description={query.error.message} actionLabel="Thử lại" onAction={() => { void query.refetch(); }} />;

  return <div className="property-management">
    <h1 className="sr-only">Quản lý khu trọ và phòng trọ</h1>
    <section className="management-context">
      <div>{property ? <><label className="management-property-picker"><img src={managementAssets.page.container1} alt="" /><span><select aria-label="Khu trọ đang quản lý" value={property.id} onChange={(e) => management.selectProperty(e.target.value)}>{properties.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select><small>Tổng: {rooms.length} phòng • <b>{vacant} phòng trống</b></small></span></label><div className="management-context-meta"><span><img src={managementAssets.page.container} alt="" />{property.street}, {property.ward}, {property.district}</span><span className="management-status vacant">● Đang hoạt động ổn định</span></div></> : <h2>Chưa có khu trọ</h2>}</div>
      <div className="management-context-actions"><Button type="button" variant="outline" onClick={management.unsupported}><img src={managementAssets.page.container3} alt="" />Cài đặt & Nội quy khu trọ</Button><Button type="button" onClick={() => management.openModal('property')}><img src={managementAssets.page.container4} alt="" />Thêm khu trọ mới</Button></div>
    </section>
    <div className="management-metrics">
      <section><div><h2>Tỷ lệ lấp đầy</h2><strong>{rooms.length ? (occupied / rooms.length * 100).toLocaleString('vi-VN', { maximumFractionDigits: 1 }) : 0}%</strong><small>{occupied} / {rooms.length} phòng đang thuê</small></div><span><img src={managementAssets.page.container5} alt="" /></span></section>
      <section><div><h2>Phòng sẵn sàng</h2><strong className="text-secondary-600">{vacant.toString().padStart(2, '0')}</strong><small>Phòng trống trong khu</small></div><span><img src={managementAssets.page.container6} alt="" /></span></section>
      <section><div><h2>Đang chờ cọc</h2><strong className="text-warning">{reserved.toString().padStart(2, '0')}</strong><small>Phòng đang giữ chỗ</small></div><span><img src={managementAssets.page.container7} alt="" /></span></section>
      <section><div><h2>Doanh thu dự tính</h2><strong>{rentFormatter.format(expectedRevenue)}<small> đ</small></strong><small>Tổng giá phòng đang thuê / tháng</small></div><span><img src={managementAssets.page.container8} alt="" /></span></section>
    </div>
    <p className="management-demo-note">Dữ liệu minh họa • Chỉ số của toàn khu đang chọn, không đổi theo bộ lọc • Thay đổi sẽ mất khi tải lại trang.</p>
    <section className="management-toolbar" aria-label="Tìm kiếm và lọc phòng">
      <div className="management-toolbar-main"><Input id="room-search" aria-label="Tìm tên, mã phòng hoặc tên khách" placeholder="Tìm tên/mã phòng, tên khách..." value={management.search} onChange={(e) => management.setSearch(e.target.value)} leftIcon={<img src={managementAssets.page.icon} alt="" />} /><div className="management-view-toggle"><button type="button" aria-pressed="true"><img src={managementAssets.page.container9} alt="" />Lưới</button><button type="button" onClick={management.unsupported}><img src={managementAssets.page.container10} alt="" />Danh sách</button></div><Button type="button" variant="outline" onClick={management.unsupported}><img src={managementAssets.page.container11} alt="" />Xuất Excel</Button><Button type="button" disabled={!property} onClick={() => management.openModal('room')}><img src={managementAssets.page.container12} alt="" />Thêm phòng mới</Button></div>
      <div className="management-filters"><label>Khu vực: <select aria-label="Lọc tầng" value={management.floor} onChange={(e) => management.setFloor(e.target.value)}><option value="all">Tất cả các tầng</option>{property?.floors.map((floor) => <option key={floor} value={floor}>{floor === 0 ? 'Tầng trệt' : `Tầng ${floor}`} ({rooms.filter((room) => room.floor === floor).length})</option>)}</select></label><div role="group" aria-label="Lọc trạng thái phòng"><button type="button" className="management-status" aria-pressed={management.status === 'all'} onClick={() => management.setStatus('all')}>Tất cả ({rooms.length})</button>{MANAGED_ROOM_STATUSES.map(({ value, label }) => <button type="button" key={value} className={`management-status ${value}`} aria-pressed={management.status === value} onClick={() => management.setStatus(value)}>● {label} ({rooms.filter((room) => room.status === value).length})</button>)}</div><Button type="button" variant="ghost" size="sm" onClick={management.clearFilters}>Xóa bộ lọc</Button></div>
    </section>
    <div role="status" aria-live="polite" className={notice ? 'management-feedback' : 'sr-only'}>{notice}</div>
    <p className="management-results">Hiển thị {visibleRooms.length} / {rooms.length} phòng</p>
    {visibleRooms.length ? <div className="management-room-grid">{visibleRooms.map((room) => <RoomManagementCard key={room.id} room={room} onUnsupported={management.unsupported} />)}</div> : <EmptyState title={rooms.length ? 'Không tìm thấy phòng phù hợp' : 'Khu trọ chưa có phòng'} description={rooms.length ? 'Thử đổi từ khóa hoặc xóa bộ lọc để xem tất cả phòng.' : 'Thêm phòng đầu tiên cho khu trọ này.'} actionLabel={rooms.length ? 'Xóa bộ lọc' : 'Thêm phòng mới'} onAction={rooms.length ? management.clearFilters : () => management.openModal(property ? 'room' : 'property')} />}
    {modal === 'property' && <AddPropertyModal isPending={isPending} error={management.createProperty.error?.message ?? ''} onClose={management.closeModal} onSubmit={(values) => { if (!isPending) management.createProperty.mutate(values); }} />}
    {modal === 'room' && property && <AddRoomModal key={property.id} propertyId={property.id} propertyName={property.name} floors={property.floors} rooms={rooms} isPending={isPending} error={management.createRoom.error?.message ?? ''} onClose={management.closeModal} onSubmit={management.saveRoom} />}
  </div>;
}
