import { useEffect, useId, useRef, useState } from 'react';
import type { FormEvent } from 'react';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { XIcon } from '@/components/ui/icons';

import { dashboardSections, roomStatuses } from '../constants';
import { currencyFormatter } from '../formatters';
import type { DashboardDialogShellProps, DashboardDialogsProps, UtilityFormProps } from '../types';

const selectClass = 'min-h-11 w-full rounded-md border border-border-subtle bg-surface-card px-3 py-2 text-sm text-text-primary focus:outline-2 focus:outline-brand-500 disabled:opacity-50';

function DashboardDialogShell({ title, description, fallbackFocusId, isPending, onClose, children }: DashboardDialogShellProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = 'hidden';

    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      requestAnimationFrame(() => {
        if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
          previousFocus.focus();
        } else if (fallbackFocusId) {
          document.getElementById(fallbackFocusId)?.focus();
        }
      });
    };
  }, [fallbackFocusId]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      aria-busy={isPending}
      onCancel={(event) => { event.preventDefault(); if (!isPending) onClose(); }}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-xl border border-border-subtle bg-surface-card p-0 text-text-primary shadow-soft-lg backdrop:bg-brand-900/40 backdrop:backdrop-blur-xs"
    >
      <header className="flex items-start justify-between gap-3 border-b border-border-subtle p-5">
        <div>
          <h2 id={titleId} className="font-heading text-lg font-bold">{title}</h2>
          {description && <p id={descriptionId} className="mt-1 text-sm text-text-secondary">{description}</p>}
        </div>
        <Button type="button" variant="ghost" onClick={onClose} disabled={isPending} aria-label="Đóng hộp thoại" className="min-h-10 min-w-10 shrink-0 px-2">
          <XIcon size={18} />
        </Button>
      </header>
      <div className="p-5">{children}</div>
    </dialog>
  );
}

function UtilityForm({ rooms, isPending, onSubmit }: UtilityFormProps) {
  const occupiedRooms = rooms.filter((room) => room.status === 'occupied');
  const [roomCode, setRoomCode] = useState(occupiedRooms[0]?.code ?? '');
  const selectedRoom = occupiedRooms.find((room) => room.code === roomCode);

  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      const values = new FormData(event.currentTarget);
      void onSubmit({ roomCode, electricity: Number(values.get('electricity')), water: Number(values.get('water')) });
    }} className="space-y-4">
      <label className="block space-y-1.5 text-sm font-semibold">
        <span>Phòng đang thuê</span>
        <select name="roomCode" value={roomCode} onChange={(event) => setRoomCode(event.target.value)} required disabled={isPending} className={selectClass}>
          {occupiedRooms.map((room) => <option key={room.code} value={room.code}>{room.code} · {room.detail}</option>)}
        </select>
      </label>
      {occupiedRooms.length === 0 && <p className="text-sm text-text-secondary">Chưa có phòng đang thuê để ghi chỉ số.</p>}
      <div key={roomCode} className="grid gap-4 sm:grid-cols-2">
        <Input label="Chỉ số điện (kWh)" name="electricity" type="number" min="0" step="1" defaultValue={selectedRoom?.utilityReading?.electricity} required disabled={isPending} />
        <Input label="Chỉ số nước (m³)" name="water" type="number" min="0" step="1" defaultValue={selectedRoom?.utilityReading?.water} required disabled={isPending} />
      </div>
      <p className="text-xs text-text-secondary">Lưu lại chỉ cập nhật chỉ số của phòng đã chọn trong kỳ mẫu hiện tại.</p>
      <Button type="submit" isLoading={isPending} disabled={!selectedRoom} className="min-h-11 w-full">Lưu chỉ số</Button>
    </form>
  );
}

export function DashboardDialogs({ selection, data, isPending, onClose, onSaveUtilities, onCreateReceipt, onRescheduleAppointment, onReconcileReceipt }: DashboardDialogsProps) {
  const [errorMessage, setErrorMessage] = useState('');
  const appointment = selection.type === 'reschedule' ? data.summary.appointments.find((item) => item.id === selection.id) : undefined;
  const receipt = selection.type === 'reconcile' ? data.summary.receipts.find((item) => item.id === selection.id) : undefined;
  const room = selection.type === 'room' ? data.summary.property.rooms.find((item) => item.code === selection.code) : undefined;
  const titles = { utilities: 'Ghi điện nước', createReceipt: 'Tạo phiếu thu', reschedule: 'Đổi giờ lịch hẹn', reconcile: 'Xác nhận đã nhận tiền', room: `Chi tiết phòng ${room?.code ?? ''}` };

  const handleAction = async (action: () => Promise<void>) => {
    if (isPending) return;
    setErrorMessage('');
    try { await action(); } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Không thể lưu thay đổi. Vui lòng thử lại.');
    }
  };

  const handleReceiptSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    void handleAction(() => onCreateReceipt({
      tenantName: String(values.get('tenantName') ?? '').trim(),
      roomCode: String(values.get('roomCode') ?? ''),
      detail: String(values.get('detail') ?? '').trim(),
      amount: Number(values.get('amount')),
    }));
  };

  return (
    <DashboardDialogShell
      title={titles[selection.type]}
      description="Thao tác trên dữ liệu mẫu của phiên hiện tại."
      fallbackFocusId={selection.type === 'reconcile' ? dashboardSections.reconciliation : selection.type === 'reschedule' ? dashboardSections.appointments : undefined}
      isPending={isPending}
      onClose={onClose}
    >
      {errorMessage && <p role="alert" className="mb-4 rounded-sm border border-danger-border bg-danger-soft p-3 text-sm text-red-700">{errorMessage}</p>}
      {selection.type === 'utilities' && <UtilityForm rooms={data.summary.property.rooms} isPending={isPending} onSubmit={(input) => handleAction(() => onSaveUtilities(input))} />}
      {selection.type === 'createReceipt' && (
        <form onSubmit={handleReceiptSubmit} className="space-y-4">
          <Input label="Người nộp tiền" name="tenantName" autoComplete="off" maxLength={100} required disabled={isPending} />
          <label className="block space-y-1.5 text-sm font-semibold">
            <span>Phòng</span>
            <select name="roomCode" required disabled={isPending} className={selectClass}>
              {data.summary.property.rooms.map((item) => <option key={item.code} value={item.code}>{item.code}</option>)}
            </select>
          </label>
          <Input label="Nội dung thu" name="detail" maxLength={200} required disabled={isPending} />
          <Input label="Số tiền (VNĐ)" name="amount" type="number" min="1" step="1" required disabled={isPending} />
          <p className="text-xs text-text-secondary">Phiếu mới sẽ xuất hiện trong danh sách chờ đối soát ngân hàng.</p>
          <Button type="submit" isLoading={isPending} disabled={data.summary.property.rooms.length === 0} className="min-h-11 w-full">Tạo phiếu thu</Button>
        </form>
      )}
      {selection.type === 'reschedule' && appointment && (
        <form onSubmit={(event) => {
          event.preventDefault();
          const values = new FormData(event.currentTarget);
          void handleAction(() => onRescheduleAppointment({ id: appointment.id, time: String(values.get('time') ?? '') }));
        }} className="space-y-4">
          <p className="text-sm font-semibold">{appointment.title}</p>
          <p className="text-sm text-text-secondary">{appointment.detail}</p>
          <Input label="Giờ hẹn mới" name="time" type="time" defaultValue={appointment.time} required disabled={isPending} />
          <Button type="submit" isLoading={isPending} className="min-h-11 w-full">Lưu giờ hẹn</Button>
        </form>
      )}
      {selection.type === 'reconcile' && receipt && (
        <div className="space-y-4">
          <dl className="space-y-3 rounded-lg border border-border-subtle bg-canvas p-4 text-sm">
            <div><dt className="text-text-secondary">Người nộp · Phòng</dt><dd className="mt-1 font-semibold">{receipt.tenantName} · {receipt.roomCode}</dd></div>
            <div><dt className="text-text-secondary">Nội dung</dt><dd className="mt-1">{receipt.detail}</dd></div>
            <div><dt className="text-text-secondary">Số tiền</dt><dd className="mt-1 font-heading text-xl font-bold text-secondary-700">{currencyFormatter.format(receipt.amount)}</dd></div>
          </dl>
          <p className="text-sm text-text-secondary">Xác nhận bạn đã kiểm tra giao dịch này. Biên lai sẽ được gỡ khỏi danh sách chờ đối soát.</p>
          <Button type="button" isLoading={isPending} onClick={() => void handleAction(() => onReconcileReceipt(receipt.id))} className="min-h-11 w-full">Xác nhận đã nhận tiền</Button>
        </div>
      )}
      {selection.type === 'room' && room && (
        <dl className="space-y-4 text-sm">
          <div><dt className="text-text-secondary">Cơ sở</dt><dd className="mt-1 font-semibold">{data.summary.property.name}</dd></div>
          <div><dt className="text-text-secondary">Trạng thái</dt><dd className={`mt-1 inline-block rounded-pill border px-2.5 py-1 font-semibold ${roomStatuses[room.status].className}`}>{roomStatuses[room.status].label}</dd></div>
          <div><dt className="text-text-secondary">Thông tin phòng</dt><dd className="mt-1">{room.detail}</dd></div>
          <div><dt className="text-text-secondary">Điện nước · {data.stats.utilityPeriod}</dt><dd className="mt-1">{room.utilityReading ? `${room.utilityReading.electricity} kWh · ${room.utilityReading.water} m³` : 'Chưa ghi chỉ số kỳ này'}</dd></div>
        </dl>
      )}
    </DashboardDialogShell>
  );
}
