export interface TenantProfile {
  fullName: string;
  phone: string;
  email: string;
}

export type ContractDurationOption = '6_months' | '12_months' | 'flexible';

export interface RentalPlanFormData {
  moveInDate: string;
  tenantCount: number;
  contractDuration: ContractDurationOption;
  noteToLandlord: string;
  isConfirmed: boolean;
}

export interface LandlordInfo {
  name: string;
  avatarText: string;
  isVerified: boolean;
  approvalRate: number;
  responseTime: string;
}

export interface FinancialFees {
  monthlyRent: number;
  deposit: number;
  electricityCost: number;
  waterCost: number;
  serviceFee: number;
}

export interface RoomDetail {
  id: string;
  roomCode: string;
  title: string;
  buildingName: string;
  address: string;
  isAvailable: boolean;
  statusLabel: string;
  specs: {
    area: number;
    maxTenants: number;
    furnished: boolean;
    hasBalcony: boolean;
  };
  financials: FinancialFees;
  landlord: LandlordInfo;
  imageUrl: string;
}
