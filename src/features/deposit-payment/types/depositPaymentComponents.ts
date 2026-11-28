import type {
  CreateDepositTransactionResponse,
  DepositPaymentSummary,
  PaymentGateway,
  PaymentGatewayOption,
} from './depositPayment.types';

export interface DepositPaymentBreadcrumbProps {
  roomId: string;
  buildingName: string;
  roomTitle: string;
}

export interface PaymentMethodSelectorProps {
  gateways: PaymentGatewayOption[];
  selectedGateway: PaymentGateway;
  onSelectGateway: (gateway: PaymentGateway) => void;
  inlineError?: string | null;
}

export interface SecurityNoticeCardProps {
  sessionMinutes?: number;
}

export interface DepositSummaryCardProps {
  summary: DepositPaymentSummary;
  canSubmit: boolean;
  isSubmitting: boolean;
  onBack: () => void;
}

export interface DepositPaymentSuccessViewProps {
  transaction: CreateDepositTransactionResponse;
  summary: DepositPaymentSummary;
  onChangeMethod: () => void;
  onBackToDetail: () => void;
}
