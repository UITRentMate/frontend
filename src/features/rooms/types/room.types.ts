export type RoomType = 'dorm' | 'studio' | 'shared' | 'apartment';

export type CampusZone = 'KTX Khu A' | 'KTX Khu B' | 'Linh Trung' | 'Khu Công Nghệ Cao' | 'Trung Tâm';

export interface Room {
  id: string;
  title: string;
  description: string;
  price: number; // VND per month
  roomType: RoomType;
  campusZone: CampusZone;
  specificAddress: string;
  area: number; // m2
  images: string[];
  author: {
    id: string;
    name: string;
    avatarUrl?: string;
    phone?: string;
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
}
