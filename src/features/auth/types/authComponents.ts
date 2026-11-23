export interface RentMateLoginProps {
  onSuccess?: (targetRoute: string) => void;
  className?: string;
}

export interface RentMateRegisterProps {
  onSuccess?: () => void;
  className?: string;
}

export interface RentMateForgotPasswordProps {
  onSuccess?: () => void;
  className?: string;
}

export interface RentMateResetPasswordProps {
  onSuccess?: () => void;
  className?: string;
}

export interface ForgotPasswordSuccessViewProps {
  submittedEmail: string;
  onResetForm: () => void;
}

export interface PasswordStrengthMeterProps {
  password: string;
  hasMinLength: boolean;
  hasNumberOrSpecial: boolean;
}

export interface ResetPasswordSuccessViewProps {
  onNavigateLogin: () => void;
}

export interface RoleSwitcherProps {
  selectedRole: 'tenant' | 'landlord';
  onChange: (role: 'tenant' | 'landlord') => void;
  className?: string;
}

export interface PasswordCriteriaProps {
  hasMinLength: boolean;
  hasLetterAndNumber: boolean;
  className?: string;
}

export interface RegisterSubHeaderProps {
  className?: string;
}

export interface RegisterBannerProps {
  headline?: string;
  subtext?: string;
  imageUrl?: string;
  className?: string;
}

export interface AuthHeaderProps {
  className?: string;
}

export interface AuthBannerProps {
  headline?: string;
  subtext?: string;
  imageUrl?: string;
  className?: string;
}

export interface AuthFooterProps {
  className?: string;
}

export interface SecurityAlertProps {
  message: string;
  onDismiss?: () => void;
}
