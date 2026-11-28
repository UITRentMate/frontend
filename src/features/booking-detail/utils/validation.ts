import type { DepositStatus } from '../types';

export function calculateMonthlyFixedTotal(monthlyRent: number, serviceFee: number): number {
  const safeRent = Number.isFinite(monthlyRent) ? Math.max(0, monthlyRent) : 0;
  const safeFee = Number.isFinite(serviceFee) ? Math.max(0, serviceFee) : 0;
  return safeRent + safeFee;
}

export function canProceedDepositPayment(status: DepositStatus, isExpired = false): boolean {
  if (isExpired) return false;
  return status === 'AWAITING_PAYMENT';
}
