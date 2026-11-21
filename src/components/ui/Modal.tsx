import React, { useEffect, useId, useRef } from 'react';
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
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!isOpen) return;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    const dialog = dialogRef.current;
    const focusable = () => Array.from(dialog?.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href], [tabindex="0"]') ?? [])
      .filter((element) => element.getClientRects().length > 0);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); onCloseRef.current(); }
      if (event.key !== 'Tab') return;
      const elements = focusable();
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (!first) { event.preventDefault(); dialog?.focus(); return; }
      if (event.shiftKey && (document.activeElement === first || !dialog?.contains(document.activeElement))) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && (document.activeElement === last || !dialog?.contains(document.activeElement))) { event.preventDefault(); first.focus(); }
    };
    document.body.style.overflow = 'hidden';
    (dialog?.querySelector<HTMLElement>('input:not(:disabled), select:not(:disabled)') ?? focusable()[0] ?? dialog)?.focus();
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      if (opener?.isConnected) opener.focus();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-2xl',
    '2xl': 'max-w-[850px]',
    '3xl': 'max-w-[896px]',
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
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
        ref={dialogRef}
        tabIndex={-1}
        className={`relative flex flex-col max-h-[calc(100dvh-2rem)] w-full ${sizeClasses[size]} bg-white rounded-xl shadow-soft-lg border border-border-subtle z-10 overflow-hidden transform transition-all duration-200 animate-scaleUp ${className}`}
      >
        {/* Header */}
        {(title || description) && (
          <div className="flex items-start justify-between p-5 border-b border-border-subtle bg-white">
            <div>
              {title && (
                <h3 id={titleId} className="text-lg font-heading font-semibold text-text-primary">
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
        <div className="p-5 min-h-0 overflow-y-auto max-h-[calc(80vh-8rem)] text-sm text-text-secondary">
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
