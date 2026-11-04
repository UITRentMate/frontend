import type { Room, RoomFilterParams } from './room.types';

export interface RoomCardProps {
  room: Room;
}

export interface RoomFilterBarProps {
  filters: RoomFilterParams;
  onFilterChange: (filters: RoomFilterParams) => void;
}

export interface CampusSafetyAlertProps {
  type?: 'safety' | 'warning' | 'info';
  message?: string;
  className?: string;
}
