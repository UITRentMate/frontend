export interface DatePillOption {
  id: string;
  label: string; // e.g. "HÔM NAY", "NGÀY MAI", "CHỦ NHẬT", "ĐẦU TUẦN"
  dateFormatted: string; // e.g. "T.Sáu, 24/10/2026"
  dateValue: string; // "24/10/2026"
  availableSlotsCount: number;
}

export interface TimeSlotOption {
  id: string;
  timeRange: string; // e.g. "09:00 - 09:45"
  period: 'morning' | 'afternoon' | 'evening';
  isFull: boolean;
}

export interface RoomTourSnapshot {
  roomCode: string;
  title: string;
  buildingName: string;
  monthlyRent: number;
  deposit: number;
  electricityCost: number;
  waterCost: number;
  area: number;
  address: string;
  imageUrl: string;
  photosCount: number;
  landlord: {
    name: string;
    avatarText: string;
    role: string;
    isVerified: boolean;
    approvalRate: number;
    responseTime: string;
  };
}

