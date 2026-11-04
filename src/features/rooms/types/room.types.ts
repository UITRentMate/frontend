export type RoomType = 'dorm' | 'studio' | 'shared' | 'apartment';

export type CampusZone = 'KTX Khu A' | 'KTX Khu B' | 'Linh Trung' | 'Khu Công Nghệ Cao' | 'Trung Tâm';

export interface Room {
  id: string;
  title: string;
  description: string;
  price: number; // VND per month, 0 for free/swap
  roomType: RoomType;
  campusZone: CampusZone;
  specificAddress: string;
  area: number; // m2
  images: string[];
  isEcoTrade?: boolean;
  tradeTag?: 'trade' | 'pass' | 'free';
  conditionBadge?: string; // e.g. "Mới 95%"
  author: {
    id: string;
    name: string;
    university: string;
    avatarUrl?: string;
    isVerifiedStudent: boolean;
  };
  amenities: string[];
  createdAt: string;
}

export interface RoomFilterParams {
  search?: string;
  campusZone?: string;
  roomType?: string;
  minPrice?: number;
  maxPrice?: number;
  isEcoTrade?: boolean;
}
