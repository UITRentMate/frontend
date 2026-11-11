import * as icons from '@/assets/owner-dashboard';

import EmptyState from '@/components/ui/EmptyState';

import { countFormatter } from '../formatters';
import type { PriorityTasksProps } from '../types';

const taskIcons: Record<string, string> = {
  'new-appointments': icons.appointmentTask,
  'rental-requests': icons.rentalTask,
  'urgent-incidents': icons.incidentTask,
  'overdue-invoices': icons.overdueTask,
};

export function PriorityTasks({ tasks, onTaskAction }: PriorityTasksProps) {
  const pendingTasks = tasks.filter((task) => task.count > 0);
  return (
    <section aria-labelledby="dashboard-tasks-title" className="dashboard-section">
      <div className="dashboard-section-heading">
        <div><span className="dashboard-urgent-dot" /><h2 id="dashboard-tasks-title">Cần xử lý ngay</h2><span className="dashboard-count-badge">{countFormatter.format(pendingTasks.length)} tác vụ</span></div>
        <span className="dashboard-section-note">Tổng hợp công việc cần xử lý</span>
      </div>
      {pendingTasks.length === 0 ? <EmptyState title="Bạn đã xử lý hết các tác vụ" /> : (
        <ul className="dashboard-four-columns">
          {pendingTasks.map((task) => (
            <li key={task.id} className={`dashboard-task dashboard-surface dashboard-task-${task.tone}`}>
              <span className="dashboard-task-icon"><img src={taskIcons[task.id] ?? icons.appointmentTask} alt="" /></span>
              <h3>{countFormatter.format(task.count)} {task.label}</h3>
              <div className="dashboard-task-action">
                <button type="button" onClick={() => onTaskAction(task.id)} className={`dashboard-action dashboard-task-button-${task.id}`}>
                  {task.id === 'urgent-incidents' && <img src={icons.dispatch} alt="" />}
                  {task.actionLabel}
                  {task.id === 'overdue-invoices' && <img src={icons.send} alt="" />}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
