import type { ManagedRoom, ManagedRoomStatus, RoomFormErrors, RoomFormValues } from '../types';

export const normalizeRoomCode = (value: string): string => value.trim().toLocaleLowerCase('vi-VN');

export function filterManagedRooms(rooms: ManagedRoom[], query: string, status: ManagedRoomStatus | 'all', floor: string): ManagedRoom[] {
  const search = normalizeRoomCode(query);
  return rooms.filter((room) => (status === 'all' || room.status === status)
    && (floor === 'all' || room.floor === Number(floor))
    && [room.code, room.guestName ?? ''].some((value) => normalizeRoomCode(value).includes(search)));
}

export function validateRoomForm(values: RoomFormValues, rooms: ManagedRoom[], propertyId: string, floors: number[]): RoomFormErrors {
  const errors: RoomFormErrors = {};
  if (!values.code.trim()) errors.code = 'Vui lòng nhập tên / mã phòng.';
  else if (rooms.some((room) => room.propertyId === propertyId && normalizeRoomCode(room.code) === normalizeRoomCode(values.code))) errors.code = 'Tên / mã phòng đã tồn tại trong khu này.';
  if (!values.floor.trim() || !floors.includes(Number(values.floor))) errors.floor = 'Vui lòng chọn tầng hợp lệ.';
  if (!values.area.trim() || !Number.isFinite(Number(values.area)) || Number(values.area) <= 0) errors.area = 'Diện tích phải là số lớn hơn 0.';
  if (!values.capacity.trim() || !Number.isSafeInteger(Number(values.capacity)) || Number(values.capacity) <= 0) errors.capacity = 'Sức chứa phải là số nguyên lớn hơn 0.';
  return errors;
}
