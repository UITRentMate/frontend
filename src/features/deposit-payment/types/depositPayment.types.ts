export type PaymentGateway = 'VNPAY' | 'MOMO';

export interface PaymentGatewayOption {
  id: PaymentGateway;
  title: string;
  description: string;
  badgeText?: string;
}

export interface DepositPaymentSummary {
  roomId: string;
  requestCode: string;
  buildingName: string;
  roomTitle: string;
  roomCode: string;
  floorLabel: string;
  tenantName: string;
  requestCreatedAt: string;
  depositAmount: number;
  depositPolicyNote: string;
  holdRemainingLabel: string;
  holdExpiresAt: string;
  holdPolicyNote: string;
  isHoldExpired: boolean;
  supportHotline: string;
}

export interface CreateDepositTransactionPayload {
  roomId: string;
  requestCode: string;
  gateway: PaymentGateway;
  amount: number;
}

export interface CreateDepositTransactionResponse {
  transactionId: string;
  transactionCode: string;
  gateway: PaymentGateway;
  amount: number;
  sessionExpiresInMinutes: number;
  status: 'PENDING_GATEWAY' | 'PAID';
  message: string;
  createdAt: string;
}
