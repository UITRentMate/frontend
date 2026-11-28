import type { PaymentGateway } from '../types';

export function validatePaymentMethod(method: unknown): string | null {
  if (method !== 'VNPAY' && method !== 'MOMO') {
    return 'Vui lòng chọn cổng thanh toán hợp lệ (VNPAY hoặc MoMo).';
  }
  return null;
}

export function canSubmitDepositPayment(
  method: PaymentGateway | null | undefined,
  isExpired: boolean,
  depositAmount: number
): boolean {
  if (isExpired) return false;
  if (validatePaymentMethod(method) !== null) return false;
  if (!Number.isFinite(depositAmount) || depositAmount <= 0) return false;
  return true;
}
