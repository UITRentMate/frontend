import { useState } from 'react';

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
  const [selection, setSelection] = useState<DashboardDialogSelection | null>(null);
  const [feedback, setFeedback] = useState<DashboardFeedback | null>(null);
  const isPending = Object.values(actions).some((action) => action.isPending);

  const handleSuccess = (message: string) => {
    setFeedback({ message, tone: 'success' });
    setSelection(null);
  };

  return (
    <div className="space-y-5">
      <DashboardHeader date={data.date} disabled={isPending} onUtilities={() => setSelection({ type: 'utilities' })} onCreateReceipt={() => setSelection({ type: 'createReceipt' })} />
      <PriorityTasks tasks={data.tasks} />
      <DashboardCards {...data.stats} />
      <SummarySections
        {...data.summary}
        isPending={isPending}
        confirmingAppointmentId={actions.confirmAppointment.isPending ? actions.confirmAppointment.variables : undefined}
        onConfirmAppointment={(id) => {
          if (isPending) return;
          actions.confirmAppointment.mutate(id, {
            onSuccess: (response) => {
              handleSuccess(response.message ?? 'Đã xác nhận đón khách.');
              requestAnimationFrame(() => document.getElementById(dashboardSections.appointments)?.focus());
            },
            onError: (error) => setFeedback({ tone: 'error', message: error.message }),
          });
        }}
        onRescheduleAppointment={(id) => setSelection({ type: 'reschedule', id })}
        onReconcileReceipt={(id) => setSelection({ type: 'reconcile', id })}
        onSelectRoom={(code) => setSelection({ type: 'room', code })}
      />
      {selection && (
        <DashboardDialogs
          key={JSON.stringify(selection)}
          selection={selection}
          data={data}
          isPending={isPending}
          onClose={() => { if (!isPending) setSelection(null); }}
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
