import React from 'react';
import type { InputProps } from '../../types';

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightElement,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={inputId} className="text-xs font-semibold text-text-primary">
          {label}
        </label>
      )}
      <div className="relative flex items-center w-full">
        {leftIcon && (
          <div className="absolute left-3.5 flex items-center pointer-events-none text-text-muted">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          className={`w-full py-2 text-sm bg-white rounded-sm text-text-primary placeholder:text-text-disabled border transition-all duration-150 outline-none
            ${leftIcon ? 'pl-10 pr-3.5' : 'pl-3.5 pr-3.5'}
            ${rightElement ? 'pr-11' : ''}
            ${error 
              ? 'border-danger focus:border-danger focus:ring-2 focus:ring-danger/20' 
              : 'border-border-subtle hover:border-brand-300 focus:border-brand-500 focus:ring-3 focus:ring-brand-500/20'
            } ${className}`}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-3 flex items-center">
            {rightElement}
          </div>
        )}
      </div>
      {error && <span className="text-xs text-danger font-medium">{error}</span>}
      {!error && helperText && <span className="text-xs text-text-muted">{helperText}</span>}
    </div>
  );
};

export default Input;
