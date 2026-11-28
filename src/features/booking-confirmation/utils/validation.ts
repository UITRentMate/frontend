export function validateBookingConfirmationTerms(isConfirmed: boolean): string | null {
  if (!isConfirmed) {
    return 'Vui lòng kiểm tra thông tin và tích xác nhận trước khi tiếp tục thanh toán.';
  }
  return null;
}

export function calculateMonthlyFixedTotal(monthlyRent: number, serviceFee: number): number {
  const safeRent = Number.isFinite(monthlyRent) ? Math.max(0, monthlyRent) : 0;
  const safeFee = Number.isFinite(serviceFee) ? Math.max(0, serviceFee) : 0;
  return safeRent + safeFee;
}
