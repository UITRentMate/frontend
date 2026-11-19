import React from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { ScheduleTourFeature } from '../features/schedule-tour/ScheduleTourFeature';

export const ScheduleTourPage: React.FC = () => {
  return (
    <MainLayout>
      <ScheduleTourFeature />
    </MainLayout>
  );
};

export default ScheduleTourPage;
