export type RoomStatus = 'vacant' | 'reserved' | 'occupied' | 'maintenance';

export interface DashboardStats {
  roomCounts: Record<RoomStatus, number>;
  monthlyRevenue: number;
  receivedRevenue: number;
  revenuePeriod: string;
  utilityReadings: number;
  utilityPeriod: string;
}

export interface DashboardTask {
  id: string;
  count: number;
  label: string;
  tone: 'warning' | 'success' | 'danger';
  actionLabel: string;
  href: string;
}

export interface DashboardAppointment {
  id: string;
  time: string;
  title: string;
  detail: string;
  status: 'completed' | 'upcoming' | 'scheduled';
}

export interface DashboardReceipt {
  id: string;
  tenantName: string;
  roomCode: string;
  detail: string;
  amount: number;
}

export interface DashboardRoom {
  code: string;
  status: RoomStatus;
  detail: string;
}

export interface DashboardSummary {
  appointments: readonly DashboardAppointment[];
  receipts: readonly DashboardReceipt[];
  property: {
    name: string;
    roomCount: number;
    rooms: readonly DashboardRoom[];
  };
}

export interface OwnerDashboardData {
  date: string;
  tasks: readonly DashboardTask[];
  stats: DashboardStats;
  summary: DashboardSummary;
}

export interface MetricProgressProps {
  label: string;
  value: number;
  fillClassName: string;
}
