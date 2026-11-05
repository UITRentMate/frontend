import type { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'eco' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'info' | 'campus' | 'verified' | 'success' | 'warning' | 'trade' | 'pass' | 'free' | 'condition';
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightElement?: ReactNode;
}

export interface SvgIconProps {
  className?: string;
  size?: number;
}

export interface RouteGuardProps {
  children?: ReactNode;
  redirectPath?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  actionElement?: ReactNode;
  className?: string;
}

export interface AuthLayoutProps {
  children?: ReactNode;
  headline?: string;
  subtext?: string;
  imageUrl?: string;
  className?: string;
}

export interface OwnerLayoutProps {
  children?: ReactNode;
  title?: string;
  className?: string;
}
