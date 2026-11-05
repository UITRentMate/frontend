import React from 'react';
import type { BadgeProps } from '@/types';

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'info',
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center gap-1 font-medium select-none';

  const variantStyles = {
    verified: 'bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-pill px-2.5 py-0.5 text-xs font-semibold',
    success: 'bg-secondary-500 text-white rounded-pill px-2.5 py-0.5 text-xs font-semibold',
    warning: 'bg-warning text-white rounded-pill px-2.5 py-0.5 text-xs font-semibold',
    info: 'bg-brand-50 text-brand-600 rounded-pill px-2.5 py-0.5 text-xs font-medium',
    campus: 'bg-surface-muted text-text-primary rounded-pill px-2.5 py-0.5 text-xs font-medium',
    condition: 'bg-text-primary/75 text-white rounded-xs px-2 py-0.5 text-[11px] backdrop-blur-xs',
    trade: 'bg-secondary-500 text-white rounded-pill px-2.5 py-0.5 text-xs font-semibold',
    pass: 'bg-warning text-white rounded-pill px-2.5 py-0.5 text-xs font-semibold',
    free: 'bg-secondary-600 text-white rounded-pill px-2.5 py-0.5 text-xs font-semibold',
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
};

export default Badge;
