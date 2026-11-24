import type { ChangeEvent, RefObject } from 'react';

import type { User } from '@/types';

export type ProfileTab = 'personal' | 'security';

export interface ProfileAvatarSectionProps {
  avatarUrl: string | null;
  avatarInitial: string;
  userName: string;
  isPending: boolean;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onOpenFilePicker: () => void;
  onAvatarChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface UpdateProfilePayload {
  name: string;
  avatarFile?: File | null;
}

export interface UpdateProfileResponse {
  user: User;
  message: string;
}

export interface ProfileSettingsViewProps {
  className?: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

export interface SecuritySettingsTabProps {
  className?: string;
}
