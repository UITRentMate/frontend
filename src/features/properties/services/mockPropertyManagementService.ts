import type { ApiResponse } from '@/types';

import type { CreateManagedRoomInput, UpdateRoomPricingInput } from '@/features/rooms/types';
import { validateRoomForm, validateRoomPricingForm } from '@/features/rooms/utils/roomManagement';

import type {
  PropertyFormValues,
  PropertyManagementData,
  UpdatePropertySettingsInput,
} from '../types';
import { validatePropertyForm, validatePropertySettings } from '../utils/validation';
import { MOCK_PROPERTY_MANAGEMENT } from './mockData';

// In-memory store used by the shared client's FE-06 mock adapter.
const store: PropertyManagementData = structuredClone(MOCK_PROPERTY_MANAGEMENT);

const delay = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 350));

function formatTodayLabel(): string {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  return `${day}/${month}/${now.getFullYear()}`;
}

function snapshot(message = 'Dữ liệu minh họa trong bộ nhớ.'): ApiResponse<PropertyManagementData> {
  return {
    success: true,
    message,
    data: structuredClone(store),
    timestamp: new Date().toISOString(),
  };
}

export const mockPropertyManagementService = {
  async getOverview(): Promise<ApiResponse<PropertyManagementData>> {
    await delay();
    return snapshot();
  },

  async createProperty(values: PropertyFormValues): Promise<ApiResponse<PropertyManagementData>> {
    await delay();
    const errors = validatePropertyForm(values);
    if (Object.keys(errors).length) {
      throw new Error(Object.values(errors)[0]);
    }

    // New mock properties get a ground-floor option; no floor-management workflow.
    store.properties.push({
      ...structuredClone(values),
      name: values.name.trim(),
      street: values.street.trim(),
      id: crypto.randomUUID(),
      profileCode: `RM-HCM-${String(store.properties.length + 1).padStart(4, '0')}`,
      updatedAtLabel: formatTodayLabel(),
      floors: [0],
      visitorRules: [],
      quietPetRules: [],
      isArchived: false,
    });
    return snapshot('Đã tạo khu trọ minh họa.');
  },

  async updatePropertySettings({
    propertyId,
    values,
    isDraft,
  }: UpdatePropertySettingsInput): Promise<ApiResponse<PropertyManagementData>> {
    await delay();
    const property = store.properties.find((item) => item.id === propertyId);
    if (!property) {
      throw new Error('Khu trọ không còn tồn tại.');
    }

    const errors = validatePropertySettings(values);
    if (Object.keys(errors).length) {
      throw new Error(Object.values(errors)[0]);
    }

    const activeRooms = store.rooms.filter(
      (room) =>
        room.propertyId === propertyId && (room.status === 'occupied' || room.status === 'reserved'),
    );
    if (values.isArchived && activeRooms.length > 0) {
      throw new Error(
        `Không thể lưu trữ khi còn ${activeRooms.length} phòng đang thuê hoặc đang giữ chỗ.`,
      );
    }

    property.name = values.name.trim();
    property.city = values.city;
    property.district = values.district;
    property.ward = values.ward;
    property.street = values.street.trim();
    property.amenities = [...values.amenities];
    property.gateMode = values.gateMode;
    property.visitorRules = [...values.visitorRules];
    property.safetyRules = [...values.safetyRules];
    property.quietPetRules = [...values.quietPetRules];
    property.isArchived = values.isArchived;
    property.updatedAtLabel = formatTodayLabel();

    return snapshot(
      isDraft
        ? 'Đã lưu tạm cài đặt & nội quy khu trọ (minh họa).'
        : 'Đã cập nhật cài đặt & nội quy khu trọ (minh họa).',
    );
  },

  async createRoom({
    propertyId,
    values,
  }: CreateManagedRoomInput): Promise<ApiResponse<PropertyManagementData>> {
    await delay();
    const property = store.properties.find((item) => item.id === propertyId);
    if (!property) {
      throw new Error('Khu trọ không còn tồn tại.');
    }

    const errors = validateRoomForm(values, store.rooms, propertyId, property.floors);
    if (Object.keys(errors).length) {
      throw new Error(Object.values(errors)[0]);
    }

    store.rooms.push({
      id: crypto.randomUUID(),
      propertyId,
      code: values.code.trim(),
      floor: Number(values.floor),
      area: Number(values.area),
      capacity: Number(values.capacity),
      amenities: [...values.amenities],
      status: 'vacant',
      monthlyRent: null,
      isPublished: false,
    });
    return snapshot('Đã thêm phòng mới minh họa.');
  },

  async updateRoomPricing({
    propertyId,
    roomId,
    values,
    copyToOtherRooms,
  }: UpdateRoomPricingInput): Promise<ApiResponse<PropertyManagementData>> {
    await delay();
    const room = store.rooms.find(
      (item) => item.id === roomId && item.propertyId === propertyId,
    );
    if (!room) {
      throw new Error('Phòng không còn tồn tại trong khu trọ này.');
    }

    const errors = validateRoomPricingForm(values);
    if (Object.keys(errors).length) {
      throw new Error(Object.values(errors)[0]);
    }

    const monthlyRent = Number(values.monthlyRent);
    const depositAmount = Number(values.depositAmount);
    const electricityRate = Number(values.electricityRate);
    const waterRate =
      values.waterBillingMode === 'meter' ? Number(values.waterRate) : room.waterRate ?? 20000;
    const waterPerPersonRate =
      values.waterBillingMode === 'person'
        ? Number(values.waterPerPersonRate)
        : room.waterPerPersonRate ?? 100000;
    const depositMonths =
      monthlyRent > 0 && depositAmount > 0
        ? Math.max(1, Math.round(depositAmount / monthlyRent))
        : 0;
    const serviceFees = structuredClone(values.serviceFees);

    const applyPricing = (target: typeof room, updatePublish: boolean) => {
      target.monthlyRent = monthlyRent;
      target.depositAmount = depositAmount;
      target.depositMonths = depositMonths;
      target.electricityRate = electricityRate;
      target.waterBillingMode = values.waterBillingMode;
      target.waterRate = waterRate;
      target.waterPerPersonRate = waterPerPersonRate;
      target.serviceFees = structuredClone(serviceFees);
      if (updatePublish) {
        target.isPublished = values.isPublished;
      }
    };

    applyPricing(room, true);

    if (copyToOtherRooms) {
      store.rooms
        .filter(
          (item) =>
            item.propertyId === propertyId && item.id !== roomId && item.status === 'vacant',
        )
        .forEach((otherRoom) => applyPricing(otherRoom, false));
    }

    return snapshot(
      copyToOtherRooms
        ? `Đã lưu bảng giá phòng ${room.code} và sao chép sang các phòng trống khác.`
        : `Đã lưu cấu hình giá & dịch vụ cho phòng ${room.code}.`,
    );
  },
};
