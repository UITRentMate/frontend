import { useState } from 'react';

import { managementAssets } from '@/assets/property-management';
import { Button } from '@/components/ui';

import { MANAGED_ROOM_STATUSES, rentFormatter } from '../managementConstants';
import type { RoomManagementCardProps } from '../types';

export function RoomManagementCard({ room, onUnsupported }: RoomManagementCardProps) {
  const [failedImage, setFailedImage] = useState(false);
  const statusLabel = MANAGED_ROOM_STATUSES.find((status) => status.value === room.status)?.label;
  const action = room.status === 'vacant' ? 'Cấu hình giá' : room.status === 'reserved' ? 'Duyệt cọc ngay' : room.status === 'maintenance' ? 'Cập nhật tiến độ' : 'Xem hợp đồng';
  return <article className={`management-room ${room.status}`}>
    <header><h2>{room.code} <span>• {room.floor === 0 ? 'Tầng trệt' : `Tầng ${room.floor}`}</span></h2><span className={`management-status ${room.status}`}>● {statusLabel}</span></header>
    {room.status === 'reserved' && <div className="management-room-notice reserved"><img src={managementAssets.page.margin} alt="" /><div><strong>{room.note}</strong><p>Khách: {room.guestName} ({room.guestDetail})</p></div></div>}
    {room.status === 'maintenance' && <div className="management-room-notice maintenance"><img src={managementAssets.page.margin1} alt="" /><div><strong>{room.note}</strong><p>{room.guestDetail}</p></div></div>}
    <div className="management-room-photo">
      {room.image && !failedImage ? <img src={room.image} alt={`Phòng ${room.code}`} onError={() => setFailedImage(true)} /> : <div className="management-photo-fallback">Chưa có hình ảnh phòng</div>}
      {room.status !== 'occupied' && room.status !== 'maintenance' && <div className="management-photo-tags"><span>{room.area} m²</span><span>Tối đa {room.capacity} người</span>{room.amenities.includes('Ban công thoáng') && <span>Ban công thoáng</span>}</div>}
      {room.status === 'occupied' && <div className="management-guest"><span>{room.guestName?.split(' ').map((word) => word[0]).slice(-2).join('')}</span><div><strong>{room.guestName}</strong><small>{room.guestDetail}</small></div><img src={managementAssets.page.container15} alt="" /></div>}
    </div>
    <div className="management-room-details">
      <p className="management-rent"><span>{room.status === 'occupied' ? 'Giá thuê thực tế:' : room.status === 'reserved' ? 'Giá giữ chỗ:' : room.status === 'maintenance' ? 'Giá niêm yết cũ:' : 'Giá thuê niêm yết:'}</span><strong>{room.monthlyRent === null ? 'Chưa cấu hình' : rentFormatter.format(room.monthlyRent)}</strong>{room.monthlyRent !== null && <small>đ/tháng</small>}</p>
      {room.status === 'vacant' && <><div className="management-utilities"><span>Điện<b>{room.electricityRate ? `${rentFormatter.format(room.electricityRate)}đ` : 'Chưa cấu hình'}</b></span><span>Nước<b>{room.waterRate ? `${rentFormatter.format(room.waterRate)}đ` : 'Chưa cấu hình'}</b></span><span>Tiền cọc<b>{room.depositMonths ? `${room.depositMonths} tháng` : 'Chưa cấu hình'}</b></span></div><div className="management-amenity-tags">{room.amenities.slice(0, 4).map((amenity) => <span key={amenity}>{amenity}</span>)}</div></>}
      {room.status === 'occupied' && <>{room.electricityReading !== undefined && <div className="management-utilities"><span>Chỉ số Điện<b>{rentFormatter.format(room.electricityReading)} kWh</b></span><span>Chỉ số Nước<b>{room.waterReading} m³</b></span></div>}<p className="management-room-note">{room.note}</p></>}
      {room.status === 'reserved' && <p className="management-room-note">Khoản cọc dự kiến: {room.monthlyRent === null ? 'Chưa cấu hình' : `${rentFormatter.format(room.monthlyRent)} đ`} (minh họa)</p>}
      {room.status === 'maintenance' && <p className="management-room-note">Phòng tạm ngưng nhận khách xem trực tiếp cho đến khi hoàn tất nghiệm thu.</p>}
    </div>
    <footer><span className="management-publication"><span className={room.isPublished ? 'is-published' : ''} />{room.status === 'occupied' ? 'Đang có khách' : room.status === 'reserved' ? 'Khóa giữ chỗ' : room.isPublished ? 'Đang hiển thị' : 'Đã ẩn tin'}</span><Button type="button" size="sm" variant={room.status === 'vacant' ? 'primary' : 'outline'} onClick={onUnsupported} title="Chưa hỗ trợ ở giai đoạn này"><img src={room.status === 'vacant' ? managementAssets.page.container13 : room.status === 'reserved' ? managementAssets.page.container18 : room.status === 'maintenance' ? managementAssets.page.container19 : managementAssets.page.container17} alt="" />{action}</Button><button type="button" aria-label={`Thao tác khác cho ${room.code}`} onClick={onUnsupported}><img src={managementAssets.page.container14} alt="" /></button></footer>
  </article>;
}
