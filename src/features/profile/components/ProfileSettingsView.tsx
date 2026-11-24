// 1. Thư viện bên ngoài (React)
import React, { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';

// 2. Hooks & Utils toàn cục (@/)
import { useAuth } from '@/hooks/useAuth';
import { isSafeAvatarUrl } from '@/utils';

// 3. Components & Icons dùng chung (@/components)
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  AlertCircleIcon,
  CheckCircle2Icon,
  LockIcon,
  ShieldCheckIcon,
  UserIcon,
} from '@/components/ui/icons';

// 4. Hooks, Components & Utils nội bộ feature
import { useUpdateProfile } from '../hooks/useUpdateProfile';
import { validateAvatarFile } from '../utils/avatarValidation';
import { ProfileAvatarSection } from './ProfileAvatarSection';
import { SecuritySettingsTab } from './SecuritySettingsTab';

// 5. Types nội bộ feature (Centralized Types)
import type { ProfileSettingsViewProps, ProfileTab } from '../types';

export const ProfileSettingsView: React.FC<ProfileSettingsViewProps> = ({ className = '' }) => {
  const { user } = useAuth();
  const updateProfileMutation = useUpdateProfile();
  const isPending = updateProfileMutation.isPending;

  const [activeTab, setActiveTab] = useState<ProfileTab>('personal');
  const [fullName, setFullName] = useState<string>(user?.name ?? '');
  const [selectedAvatarFile, setSelectedAvatarFile] = useState<File | null>(null);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | undefined>(undefined);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const previewUrlRef = useRef<string | null>(null);

  // Đồng bộ tên khi thông tin user thay đổi từ context
  useEffect(() => {
    if (user?.name !== undefined) {
      setFullName(user.name);
    }
  }, [user?.name]);

  // Thu hồi object URL khi unmount để tránh rò rỉ bộ nhớ
  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
        previewUrlRef.current = null;
      }
    };
  }, []);

  if (!user) {
    return null;
  }

  const revokePreviewUrl = () => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
    setAvatarPreviewUrl(null);
  };

  const isNameChanged = fullName.trim() !== (user.name ?? '').trim();
  const isDirty = isNameChanged || selectedAvatarFile !== null;
  const rawAvatarUrl = avatarPreviewUrl || user.avatarUrl;
  const displayedAvatarUrl = isSafeAvatarUrl(rawAvatarUrl) ? rawAvatarUrl : null;
  const avatarInitial =
    (fullName.trim() || (user.name ?? '').trim() || 'U').charAt(0).toUpperCase();

  const handleOpenFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setFormError(null);
    setSuccessMessage(null);

    const file = e.target.files?.[0];
    if (!file) return;

    const validationError = await validateAvatarFile(file);
    if (validationError) {
      revokePreviewUrl();
      setSelectedAvatarFile(null);
      setFormError(validationError);
      e.target.value = '';
      return;
    }

    // Thu hồi preview cũ trước khi tạo object URL mới
    revokePreviewUrl();
    const nextObjectUrl = URL.createObjectURL(file);
    previewUrlRef.current = nextObjectUrl;
    setAvatarPreviewUrl(nextObjectUrl);
    setSelectedAvatarFile(file);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFullName(value);
    if (nameError && value.trim().length >= 2) {
      setNameError(undefined);
    }
    if (formError) setFormError(null);
    if (successMessage) setSuccessMessage(null);
  };

  const handleReset = () => {
    setFullName(user.name);
    setSelectedAvatarFile(null);
    revokePreviewUrl();
    setNameError(undefined);
    setFormError(null);
    setSuccessMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    setSuccessMessage(null);

    const trimmedName = fullName.trim();
    if (trimmedName.length < 2) {
      setNameError('Họ và tên phải có tối thiểu 2 ký tự.');
      return;
    }
    if (trimmedName.length > 100) {
      setNameError('Họ và tên không được vượt quá 100 ký tự.');
      return;
    }
    setNameError(undefined);

    try {
      const response = await updateProfileMutation.mutateAsync({
        name: trimmedName,
        avatarFile: selectedAvatarFile,
      });

      setFullName(response.user.name);
      setSelectedAvatarFile(null);
      revokePreviewUrl();
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setSuccessMessage(response.message || 'Đã lưu thay đổi hồ sơ thành công!');
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'Không thể lưu thay đổi hồ sơ. Vui lòng thử lại sau.';
      setFormError(message);
    }
  };

  return (
    <section className={`max-w-2xl mx-auto py-4 sm:py-8 font-sans ${className}`}>
      {/* ========================================================================= */}
      {/* A. TIÊU ĐỀ TRANG (PAGE HEADER)                                            */}
      {/* ========================================================================= */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-400">
          RENTMATE // CÀI ĐẶT TÀI KHOẢN
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold font-heading text-text-primary mt-1.5">
          Cài đặt tài khoản
        </h1>
        <p className="text-sm text-text-muted mt-1">
          Quản lý thông tin tài khoản và bảo mật RentMate của bạn.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* B. THANH CHUYỂN TAB (TABS BAR)                                            */}
      {/* ========================================================================= */}
      <div
        role="tablist"
        aria-label="Danh mục cài đặt tài khoản"
        className="mt-7 border-b border-border-subtle flex items-center gap-7"
      >
        <button
          id="profile-tab-personal"
          type="button"
          role="tab"
          aria-selected={activeTab === 'personal'}
          aria-controls="profile-panel-personal"
          onClick={() => setActiveTab('personal')}
          className={`inline-flex items-center gap-2 text-sm pb-3 -mb-[1px] border-b-2 transition cursor-pointer select-none ${
            activeTab === 'personal'
              ? 'text-brand-500 font-semibold border-brand-500'
              : 'text-text-muted hover:text-text-primary font-medium border-transparent'
          }`}
        >
          <UserIcon className="w-4 h-4" />
          <span>Hồ sơ cá nhân</span>
        </button>

        <button
          id="profile-tab-security"
          type="button"
          role="tab"
          aria-selected={activeTab === 'security'}
          aria-controls="profile-panel-security"
          onClick={() => setActiveTab('security')}
          className={`inline-flex items-center gap-2 text-sm pb-3 -mb-[1px] border-b-2 transition cursor-pointer select-none ${
            activeTab === 'security'
              ? 'text-brand-500 font-semibold border-brand-500'
              : 'text-text-muted hover:text-text-primary font-medium border-transparent'
          }`}
        >
          <ShieldCheckIcon className="w-4 h-4" />
          <span>Bảo mật tài khoản</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* C. NỘI DUNG TAB                                                           */}
      {/* ========================================================================= */}
      {activeTab === 'personal' ? (
        /* TAB 1: THẺ HỒ SƠ CÁ NHÂN */
        <div
          id="profile-panel-personal"
          role="tabpanel"
          aria-labelledby="profile-tab-personal"
          className="mt-6 bg-surface-card rounded-xl border border-border-subtle shadow-soft-sm p-6 sm:p-8"
        >
          {/* Thông báo lưu thành công */}
          {successMessage && (
            <div
              role="status"
              className="mb-6 flex items-center gap-2.5 p-3.5 rounded-lg bg-success-soft border border-success-border text-xs sm:text-sm text-secondary-700 font-medium transition-opacity duration-200"
            >
              <CheckCircle2Icon className="w-4 h-4 text-secondary-500 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Thông báo lỗi validate ảnh / API */}
          {formError && (
            <div
              role="alert"
              className="mb-6 flex items-start gap-2.5 p-3.5 rounded-lg bg-danger-soft border border-danger-border text-xs sm:text-sm text-danger transition-opacity duration-200"
            >
              <AlertCircleIcon className="w-4 h-4 text-danger shrink-0 mt-0.5" />
              <span>{formError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <ProfileAvatarSection
              avatarUrl={displayedAvatarUrl}
              avatarInitial={avatarInitial}
              userName={user.name ?? ''}
              isPending={isPending}
              fileInputRef={fileInputRef}
              onOpenFilePicker={handleOpenFilePicker}
              onAvatarChange={handleAvatarChange}
            />

            {/* PHẦN 2: BIỂU MẪU THÔNG TIN */}
            <div className="space-y-5 py-6 border-b border-border-subtle/70">
              {/* Trường 1: Họ và tên */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <label
                    htmlFor="profile-full-name"
                    className="text-sm font-semibold text-text-primary"
                  >
                    Họ và tên <span className="text-danger">*</span>
                  </label>
                  <span className="text-xs text-text-muted">Tên thật trên hợp đồng thuê</span>
                </div>
                <Input
                  id="profile-full-name"
                  type="text"
                  autoComplete="name"
                  value={fullName}
                  onChange={handleNameChange}
                  placeholder="Nhập họ và tên"
                  error={nameError}
                  disabled={isPending}
                  className="py-2.5"
                />
              </div>

              {/* Trường 2: Email tài khoản (Chỉ đọc) */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <label
                    htmlFor="profile-email"
                    className="text-sm font-semibold text-text-primary"
                  >
                    Email tài khoản
                  </label>
                  <Badge
                    variant="info"
                    className="rounded-xs px-2 py-0.5 text-[11px] font-semibold"
                  >
                    <LockIcon className="w-3 h-3" />
                    <span>Chỉ đọc</span>
                  </Badge>
                </div>
                <Input
                  id="profile-email"
                  type="email"
                  value={user.email}
                  readOnly
                  disabled
                  className="py-2.5 bg-brand-50/60 text-text-muted border-border-subtle cursor-not-allowed"
                  rightElement={<ShieldCheckIcon className="w-4 h-4 text-text-muted" />}
                  helperText="Email định danh được sử dụng để nhận thông báo hóa đơn và hợp đồng ký số."
                />
              </div>
            </div>

            {/* PHẦN 3: THANH NÚT HÀNH ĐỘNG */}
            <div className="pt-6 flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={handleReset}
                disabled={!isDirty || isPending}
                className="border-border-subtle text-text-secondary hover:bg-brand-50/50 hover:border-brand-300 cursor-pointer"
              >
                Đặt lại
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isPending}
                disabled={!isDirty || isPending}
                className="cursor-pointer"
              >
                {isPending ? 'Đang lưu...' : 'Lưu thay đổi'}
              </Button>
            </div>
          </form>
        </div>
      ) : (
        /* TAB 2: THẺ BẢO MẬT TÀI KHOẢN (ĐỔI MẬT KHẨU) */
        <SecuritySettingsTab />
      )}
    </section>
  );
};

export default ProfileSettingsView;
