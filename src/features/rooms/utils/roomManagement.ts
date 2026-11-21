import type {
  ManagedRoom,
  RoomFormErrors,
  RoomFormValues,
  RoomPricingFormErrors,
  RoomPricingFormValues,
  RoomStatus,
} from '../types';

export const normalizeRoomCode = (value: string): string => value.trim().toLocaleLowerCase('vi-VN');

export function filterManagedRooms(
  rooms: ManagedRoom[],
  query: string,
  status: RoomStatus | 'all',
  floor: string,
): ManagedRoom[] {
  const search = normalizeRoomCode(query);
  return rooms.filter(
    (room) =>
      (status === 'all' || room.status === status) &&
      (floor === 'all' || room.floor === Number(floor)) &&
      [room.code, room.guestName ?? ''].some((value) => normalizeRoomCode(value).includes(search)),
  );
}

export function validateRoomForm(
  values: RoomFormValues,
  rooms: ManagedRoom[],
  propertyId: string,
  floors: number[],
): RoomFormErrors {
  const errors: RoomFormErrors = {};
  if (!values.code.trim()) {
    errors.code = 'Vui lòng nhập tên / mã phòng.';
  } else if (
    rooms.some(
      (room) =>
        room.propertyId === propertyId &&
        normalizeRoomCode(room.code) === normalizeRoomCode(values.code),
    )
  ) {
    errors.code = 'Tên / mã phòng đã tồn tại trong khu này.';
  }

  if (!values.floor.trim() || !floors.includes(Number(values.floor))) {
    errors.floor = 'Vui lòng chọn tầng hợp lệ.';
  }
  if (!values.area.trim() || !Number.isFinite(Number(values.area)) || Number(values.area) <= 0) {
    errors.area = 'Diện tích phải là số lớn hơn 0.';
  }
  if (
    !values.capacity.trim() ||
    !Number.isSafeInteger(Number(values.capacity)) ||
    Number(values.capacity) <= 0
  ) {
    errors.capacity = 'Sức chứa phải là số nguyên lớn hơn 0.';
  }

  return errors;
}

export function validateRoomPricingForm(values: RoomPricingFormValues): RoomPricingFormErrors {
  const errors: RoomPricingFormErrors = {};
  const rent = Number(values.monthlyRent);
  const deposit = Number(values.depositAmount);
  const electricity = Number(values.electricityRate);

  if (!values.monthlyRent.trim() || !Number.isFinite(rent) || rent <= 0) {
    errors.monthlyRent = 'Giá thuê niêm yết phải lớn hơn 0.';
  }
  if (!values.depositAmount.trim() || !Number.isFinite(deposit) || deposit < 0) {
    errors.depositAmount = 'Tiền cọc cam kết không hợp lệ.';
  }
  if (!values.electricityRate.trim() || !Number.isFinite(electricity) || electricity <= 0) {
    errors.electricityRate = 'Đơn giá điện phải lớn hơn 0.';
  }

  if (values.waterBillingMode === 'meter') {
    const waterRate = Number(values.waterRate);
    if (!values.waterRate.trim() || !Number.isFinite(waterRate) || waterRate <= 0) {
      errors.waterRate = 'Đơn giá nước theo đồng hồ phải lớn hơn 0.';
    }
  } else {
    const waterPerPerson = Number(values.waterPerPersonRate);
    if (
      !values.waterPerPersonRate.trim() ||
      !Number.isFinite(waterPerPerson) ||
      waterPerPerson <= 0
    ) {
      errors.waterPerPersonRate = 'Đơn giá nước khoán theo người phải lớn hơn 0.';
    }
  }

  const invalidFee = values.serviceFees.find(
    (fee) => fee.enabled && (!fee.name.trim() || !Number.isFinite(fee.amount) || fee.amount < 0),
  );
  if (invalidFee) {
    errors.serviceFees = 'Phụ phí được bật phải có tên và số tiền hợp lệ (>= 0).';
  }

  return errors;
}
