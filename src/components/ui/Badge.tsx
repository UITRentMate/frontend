import React from 'react';
import type { BadgeProps } from '../../types';

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'info',
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center gap-1 font-medium select-none';

  const variantStyles = {
    trade: 'bg-secondary-500 text-white rounded-pill px-2.5 py-0.5 text-xs font-semibold',
    pass: 'bg-warning text-white rounded-pill px-2.5 py-0.5 text-xs font-semibold',
    free: 'bg-secondary-600 text-white rounded-pill px-2.5 py-0.5 text-xs font-semibold',
    condition: 'bg-text-primary/75 text-white rounded-xs px-2 py-0.5 text-[11px] backdrop-blur-xs',
    info: 'bg-brand-50 text-brand-600 rounded-pill px-2.5 py-0.5 text-xs',
    campus: 'bg-surface-muted text-text-primary rounded-pill px-2.5 py-0.5 text-xs font-medium',
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
};

export default Badge;
