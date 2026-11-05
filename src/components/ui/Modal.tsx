import React, { useEffect, useCallback } from 'react';
import { XIcon } from './icons';
import type { ModalProps } from '@/types';

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  className = '',
}) => {
  // Lắng nghe phím ESC để đóng modal
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-2xl',
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#091540]/40 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        className={`relative w-full ${sizeClasses[size]} bg-white rounded-xl shadow-soft-lg border border-border-subtle z-10 overflow-hidden transform transition-all duration-200 animate-scaleUp ${className}`}
      >
        {/* Header */}
        {(title || description) && (
          <div className="flex items-start justify-between p-5 border-b border-border-subtle bg-white">
            <div>
              {title && (
                <h3 id="modal-title" className="text-lg font-heading font-semibold text-text-primary">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-xs text-text-muted mt-1">{description}</p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Đóng hộp thoại"
              className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-slate-100 transition cursor-pointer"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Close button if no header */}
        {!title && !description && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng hộp thoại"
            className="absolute top-4 right-4 p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-slate-100 transition z-10 cursor-pointer"
          >
            <XIcon className="w-4 h-4" />
          </button>
        )}

        {/* Body Content */}
        <div className="p-5 overflow-y-auto max-h-[calc(80vh-8rem)] text-sm text-text-secondary">
          {children}
        </div>

        {/* Footer Actions */}
        {footer && (
          <div className="flex items-center justify-end gap-3 px-5 py-3.5 bg-slate-50 border-t border-border-subtle">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
