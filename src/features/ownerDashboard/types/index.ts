import type { ReactNode } from 'react';

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
  utilityReading?: UtilityReading;
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

export interface UtilityReading {
  electricity: number;
  water: number;
}

export interface RescheduleAppointmentInput {
  id: string;
  time: string;
}

export interface SaveUtilitiesInput extends UtilityReading {
  roomCode: string;
}

export interface CreateReceiptInput {
  tenantName: string;
  roomCode: string;
  detail: string;
  amount: number;
}

export type DashboardDialogSelection =
  | { type: 'utilities' }
  | { type: 'createReceipt' }
  | { type: 'reschedule'; id: string }
  | { type: 'reconcile'; id: string }
  | { type: 'room'; code: string };

export interface DashboardHeaderProps {
  date?: string;
  disabled?: boolean;
  onUtilities: () => void;
  onCreateReceipt: () => void;
}

export interface SummarySectionsProps extends DashboardSummary {
  isPending: boolean;
  confirmingAppointmentId?: string;
  onConfirmAppointment: (id: string) => void;
  onRescheduleAppointment: (id: string) => void;
  onReconcileReceipt: (id: string) => void;
  onSelectRoom: (code: string) => void;
}

export interface DashboardWorkspaceProps {
  data: OwnerDashboardData;
}

export interface DashboardDialogShellProps {
  title: string;
  description?: string;
  fallbackFocusId?: string;
  isPending: boolean;
  onClose: () => void;
  children: ReactNode;
}

export interface DashboardDialogsProps {
  selection: DashboardDialogSelection;
  data: OwnerDashboardData;
  isPending: boolean;
  onClose: () => void;
  onSaveUtilities: (input: SaveUtilitiesInput) => Promise<void>;
  onCreateReceipt: (input: CreateReceiptInput) => Promise<void>;
  onRescheduleAppointment: (input: RescheduleAppointmentInput) => Promise<void>;
  onReconcileReceipt: (id: string) => Promise<void>;
}

export interface UtilityFormProps {
  rooms: readonly DashboardRoom[];
  isPending: boolean;
  onSubmit: (input: SaveUtilitiesInput) => Promise<void>;
}

export interface DashboardFeedback {
  message: string;
  tone: 'success' | 'error';
}
