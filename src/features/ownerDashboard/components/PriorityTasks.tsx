import { Link } from 'react-router-dom';
import EmptyState from '@/components/ui/EmptyState';
import { AlertCircleIcon, CalendarIcon, CheckCircle2Icon } from '@/components/ui/icons';
import { countFormatter } from '../formatters';
import type { OwnerDashboardData } from '../types';

const taskStyles = {
  warning: { Icon: CalendarIcon, accent: 'border-l-warning', icon: 'bg-warning-soft text-amber-800' },
  success: { Icon: CheckCircle2Icon, accent: 'border-l-success', icon: 'bg-success-soft text-secondary-700' },
  danger: { Icon: AlertCircleIcon, accent: 'border-l-danger', icon: 'bg-danger-soft text-red-700' },
};

export function PriorityTasks({ tasks }: Pick<OwnerDashboardData, 'tasks'>) {
  const pendingTasks = tasks.filter((task) => task.count > 0);
  const actionClass = 'block rounded-sm bg-brand-50 px-3 py-2.5 text-center text-sm font-semibold text-brand-700 hover:bg-brand-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500';

  return (
    <section aria-labelledby="dashboard-tasks-title" className="space-y-3">
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="size-2.5 rounded-pill bg-danger" aria-hidden="true" />
        <h2 id="dashboard-tasks-title" className="text-lg font-bold">Cần xử lý ngay</h2>
        <span className="rounded-pill border border-danger-border bg-danger-soft px-2.5 py-0.5 text-xs font-semibold text-red-700">
          {countFormatter.format(pendingTasks.length)} nhóm tác vụ
        </span>
      </div>
      {pendingTasks.length === 0 ? (
        <EmptyState title="Bạn đã xử lý hết các tác vụ" />
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4 xl:gap-4">
          {pendingTasks.map((task) => {
            const { Icon, accent, icon } = taskStyles[task.tone];

            return (
              <li key={task.id} className={`flex min-w-0 flex-col rounded-lg border border-l-4 border-border-subtle bg-surface-card p-4 shadow-soft-xs ${accent}`}>
                <span className={`grid size-9 place-items-center rounded-sm ${icon}`} aria-hidden="true">
                  <Icon className="size-5" />
                </span>
                <p className="mt-2 flex-1 font-heading font-bold">
                  {countFormatter.format(task.count)} {task.label}
                </p>
                <div className="mt-3 border-t border-border-subtle pt-3">
                  {task.href.startsWith('#') ? (
                    <a href={task.href} className={actionClass}>{task.actionLabel}</a>
                  ) : (
                    <Link to={task.href} className={actionClass}>{task.actionLabel}</Link>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
