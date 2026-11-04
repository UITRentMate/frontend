import type { ReactNode } from 'react';

export interface RentMateLoginProps {
  onSuccess?: (targetRoute: string) => void;
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

export interface SvgIconProps {
  className?: string;
  size?: number;
  children?: ReactNode;
}
