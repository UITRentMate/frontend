/**
 * Định dạng số tiền sang chuẩn Việt Nam Đồng (VND)
 * Ví dụ: 4500000 -> "4.500.000 đ"
 */
export function formatCurrency(amount: number): string {
  if (isNaN(amount)) return '0 đ';
  return `${new Intl.NumberFormat('vi-VN').format(amount)} đ`;
}

export default formatCurrency;
