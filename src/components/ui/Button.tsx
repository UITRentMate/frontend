import React from 'react';
import type { ButtonProps } from '../../types';

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-150 select-none button-press disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 rounded-sm',
    md: 'text-sm px-4 py-2 rounded-md',
    lg: 'text-base px-6 py-2.5 rounded-lg',
  };

  const variantStyles = {
    primary: 'bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white shadow-soft-sm hover:-translate-y-0.5',
    secondary: 'bg-brand-50 hover:bg-brand-100 text-brand-700 hover:-translate-y-0.5',
    eco: 'bg-secondary-500 hover:bg-secondary-600 text-white shadow-soft-sm hover:-translate-y-0.5',
    outline: 'border border-brand-500 text-brand-500 bg-white hover:bg-brand-50 hover:-translate-y-0.5',
    ghost: 'text-text-muted hover:text-text-primary hover:bg-surface-muted/50',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
