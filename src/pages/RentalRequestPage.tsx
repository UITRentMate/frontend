import React from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { RentalRequestFeature } from '../features/rental-request/RentalRequestFeature';

export const RentalRequestPage: React.FC = () => {
  return (
    <MainLayout>
      <RentalRequestFeature />
    </MainLayout>
  );
};

export default RentalRequestPage;
