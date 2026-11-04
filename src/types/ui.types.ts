import type { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'eco' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'trade' | 'pass' | 'free' | 'condition' | 'info' | 'campus';
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
