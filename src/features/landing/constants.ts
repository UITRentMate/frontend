// Class dùng chung cho các section của Landing (dùng token trong @theme).
export const wrap = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8';
export const eyebrow = 'text-xs font-semibold uppercase tracking-wide text-brand-500';

const btnBase =
  'inline-flex items-center justify-center gap-2 rounded-md px-6 py-3.5 text-[15px] font-semibold transition-colors focus-visible:outline-none focus-visible:shadow-focus';

export const btnPrimary = `${btnBase} bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 active:scale-[0.98]`;
export const btnOutline = `${btnBase} border border-border-subtle bg-white text-text-primary hover:bg-brand-50`;

export const btnPrimarySm = `${btnBase} bg-brand-500 px-5 py-2.5 text-[15px] font-semibold text-white hover:bg-brand-600 active:bg-brand-700 active:scale-[0.98]`;
