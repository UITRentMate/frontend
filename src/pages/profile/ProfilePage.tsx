// 1. Thư viện bên ngoài
import React from 'react';

// 4. Components nội bộ feature
import ProfileSettingsView from '@/features/profile/components/ProfileSettingsView';

export const ProfilePage: React.FC = () => {
  return <ProfileSettingsView />;
};

export default ProfilePage;
