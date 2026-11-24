import React from 'react';

import { CameraIcon, CheckIcon } from '@/components/ui/icons';

import type { ProfileAvatarSectionProps } from '../types';

export const ProfileAvatarSection: React.FC<ProfileAvatarSectionProps> = ({
  avatarUrl,
  avatarInitial,
  userName,
  isPending,
  fileInputRef,
  onOpenFilePicker,
  onAvatarChange,
}) => {
  return (
    <div className="flex items-center gap-5 pb-6 border-b border-border-subtle/70">
      <div className="relative w-16 h-16 shrink-0">
        <div className="w-16 h-16 bg-brand-50 border border-brand-100 rounded-pill flex items-center justify-center text-brand-500 font-heading font-bold text-xl overflow-hidden select-none">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={userName || 'Avatar'}
              className="w-full h-full object-cover"
            />
          ) : (
            <span>{avatarInitial}</span>
          )}
        </div>

        <span
          aria-hidden="true"
          className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-pill bg-secondary-500 text-white border-2 border-white flex items-center justify-center"
        >
          <CheckIcon className="w-3 h-3" />
        </span>
      </div>

      <div className="min-w-0">
        <p className="text-sm font-semibold text-text-primary">Ảnh đại diện</p>
        <button
          type="button"
          onClick={onOpenFilePicker}
          disabled={isPending}
          className="mt-2 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-white border border-border-subtle text-xs font-semibold text-text-primary hover:border-brand-300 hover:bg-brand-50/40 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CameraIcon className="w-3.5 h-3.5 text-text-secondary" />
          <span>Đổi ảnh đại diện</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png"
          onChange={onAvatarChange}
          className="hidden"
          aria-label="Tải lên ảnh đại diện mới"
        />
        <p className="text-xs text-text-muted mt-1.5">
          Hỗ trợ định dạng JPG, PNG tối đa 5MB
        </p>
      </div>
    </div>
  );
};

export default ProfileAvatarSection;
