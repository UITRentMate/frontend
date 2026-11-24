import type { ContractDurationOption } from './types';

export const CONTRACT_DURATION_OPTIONS: {
  value: ContractDurationOption;
  title: string;
  description: string;
}[] = [
  {
    value: '6_months',
    title: '6 tháng',
    description: 'Mức tối thiểu quy định',
  },
  {
    value: '12_months',
    title: '12 tháng',
    description: 'Hợp đồng tiêu chuẩn',
  },
  {
    value: 'flexible',
    title: 'Linh hoạt',
    description: 'Thương lượng thêm với chủ',
  },
];

export function getContractDurationLabel(val: ContractDurationOption): string {
  switch (val) {
    case '6_months':
      return '6 tháng';
    case '12_months':
      return '12 tháng';
    case 'flexible':
      return 'Linh hoạt';
    default:
      return val;
  }
}
