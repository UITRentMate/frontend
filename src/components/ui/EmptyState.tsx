import React from 'react';
import { InboxIcon } from './icons';
import Button from './Button';
import type { EmptyStateProps } from '@/types';

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  actionElement,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 bg-white rounded-xl border border-border-subtle shadow-soft-xs ${className}`}
    >
      {/* Icon Wrapper */}
      <div className="w-14 h-14 rounded-full bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-500 mb-4 shadow-soft-xs">
        {icon || <InboxIcon className="w-7 h-7 text-brand-500" />}
      </div>

      {/* Title */}
      <h3 className="text-base sm:text-lg font-heading font-bold text-text-primary mb-1">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="text-xs sm:text-sm text-text-muted max-w-md mb-6 leading-relaxed">
          {description}
        </p>
      )}

      {/* Action */}
      {actionElement
        ? actionElement
        : actionLabel && onAction && (
            <Button variant="primary" size="sm" onClick={onAction}>
              {actionLabel}
            </Button>
          )}
    </div>
  );
};

export default EmptyState;
