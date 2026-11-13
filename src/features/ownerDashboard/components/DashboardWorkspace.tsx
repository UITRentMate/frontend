import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Button } from '@/components/ui/Button';
import { XIcon } from '@/components/ui/icons';

import { dashboardSections } from '../constants';
import { useOwnerDashboardActions } from '../hooks/useOwnerDashboardActions';
import type { DashboardDialogSelection, DashboardFeedback, DashboardWorkspaceProps } from '../types';
import { DashboardCards } from './DashboardCards';
import { DashboardDialogs } from './DashboardDialogs';
import { DashboardHeader } from './DashboardHeader';
import { PriorityTasks } from './PriorityTasks';
import { SummarySections } from './SummarySections';

export function DashboardWorkspace({ data }: DashboardWorkspaceProps) {
  const actions = useOwnerDashboardActions();
  const [searchParams, setSearchParams] = useSearchParams();
  const [localSelection, setSelection] = useState<DashboardDialogSelection | null>(null);
  const [feedback, setFeedback] = useState<DashboardFeedback | null>(null);
  const isPending = Object.values(actions).some((action) => action.isPending);
  const action = searchParams.get('action');
  const roomCode = searchParams.get('room');
  const taskId = searchParams.get('task');
  const routeSelection: DashboardDialogSelection | null = roomCode ? { type: 'room', code: roomCode } : taskId ? { type: 'task', id: taskId } : action === 'utilities' || action === 'createReceipt' || action === 'createAppointment' || action === 'appointments' || action === 'ledger' ? { type: action } : null;
  const selection = localSelection ?? routeSelection;

  const handleClose = () => {
    setSelection(null);
    if (routeSelection) {
      const next = new URLSearchParams(searchParams);
      ['action', 'room', 'task'].forEach((key) => next.delete(key));
      setSearchParams(next, { replace: true });
    }
    document.querySelectorAll<HTMLDetailsElement>('.owner-topbar details[open]').forEach((element) => { element.open = false; });
  };

  const handleSuccess = (message: string) => {
    setFeedback({ message, tone: 'success' });
    handleClose();
  };

  return (
    <div className="owner-dashboard">
      <DashboardHeader date={data.date} healthyMeters={data.stats.healthyMeters} disabled={isPending} onUtilities={() => setSelection({ type: 'utilities' })} />
      <PriorityTasks tasks={data.tasks} onTaskAction={(id) => setSelection({ type: 'task', id })} />
      <DashboardCards {...data.stats} onUtilities={() => setSelection({ type: 'utilities' })} />
      <SummarySections
        {...data.summary}
        isPending={isPending}
        onRescheduleAppointment={(id) => setSelection({ type: 'reschedule', id })}
        onReconcileReceipt={(id) => setSelection({ type: 'reconcile', id })}
        onSelectRoom={(code) => setSelection({ type: 'room', code })}
        onCreateAppointment={() => setSelection({ type: 'createAppointment' })}
        onOpenAppointment={(id) => setSelection({ type: 'appointment', id })}
        onCreateReceipt={() => setSelection({ type: 'ledger' })}
        onViewAppointments={() => setSelection({ type: 'appointments' })}
      />
      {selection && (
        <DashboardDialogs
          key={JSON.stringify(selection)}
          selection={selection}
          data={data}
          isPending={isPending}
          onClose={() => { if (!isPending) handleClose(); }}
          onSelect={setSelection}
          onCreateAppointment={async (input) => {
            const response = await actions.createAppointment.mutateAsync(input);
            handleSuccess(response.message ?? 'Đã thêm lịch hẹn.');
          }}
          onConfirmAppointment={async (id) => {
            const response = await actions.confirmAppointment.mutateAsync(id);
            handleSuccess(response.message ?? 'Đã xác nhận đón khách.');
          }}
          onSaveUtilities={async (input) => {
            const response = await actions.saveUtilities.mutateAsync(input);
            handleSuccess(response.message ?? 'Đã lưu chỉ số điện nước.');
          }}
          onCreateReceipt={async (input) => {
            const response = await actions.createReceipt.mutateAsync(input);
            handleSuccess(response.message ?? 'Đã tạo phiếu thu chờ đối soát.');
          }}
          onRescheduleAppointment={async (input) => {
            const response = await actions.rescheduleAppointment.mutateAsync(input);
            handleSuccess(response.message ?? 'Đã cập nhật giờ hẹn.');
          }}
          onReconcileReceipt={async (id) => {
            const response = await actions.reconcileReceipt.mutateAsync(id);
            handleSuccess(response.message ?? 'Đã xác nhận biên lai.');
            requestAnimationFrame(() => document.getElementById(dashboardSections.reconciliation)?.focus());
          }}
        />
      )}
      {feedback && (
        <div className={`fixed right-4 bottom-4 left-4 z-40 flex items-center justify-between gap-3 rounded-lg border p-4 text-sm shadow-soft-md sm:left-auto sm:max-w-md ${feedback.tone === 'success' ? 'border-success-border bg-success-soft text-secondary-700' : 'border-danger-border bg-danger-soft text-red-700'}`}>
          <p role={feedback.tone === 'error' ? 'alert' : 'status'}>{feedback.message}</p>
          <Button type="button" variant="ghost" size="sm" onClick={() => setFeedback(null)} aria-label="Đóng thông báo" className="min-h-10 min-w-10 shrink-0"><XIcon size={16} /></Button>
        </div>
      )}
    </div>
  );
}
