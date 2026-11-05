import React from 'react';
import { SpinnerIcon } from './icons';
import type { LoadingProps } from '@/types';

export const Loading: React.FC<LoadingProps> = ({
  message = 'Đang tải dữ liệu...',
  fullScreen = false,
  size = 'md',
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const containerClasses = fullScreen
    ? 'fixed inset-0 z-50 flex items-center justify-center bg-canvas/80 backdrop-blur-xs'
    : 'flex flex-col items-center justify-center p-8';

  return (
    <div
      role="status"
      aria-live="polite"
      className={`${containerClasses} select-none ${className}`}
    >
      <div className="flex flex-col items-center gap-3">
        <SpinnerIcon className={`${sizeMap[size]} text-brand-500`} />
        {message && (
          <span className="text-xs font-medium text-text-muted animate-pulse">
            {message}
          </span>
        )}
      </div>
    </div>
  );
};

export default Loading;
