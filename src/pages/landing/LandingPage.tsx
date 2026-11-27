import React from 'react';

import {
  FeaturedRooms,
  FinalCta,
  HeroSection,
  HowItWorks,
  LandingFooter,
  LandingHeader,
  OwnerSection,
  RoommateSection,
  TransparencySection,
} from '@/features/landing';

// Landing cần section full-width nên không bọc trong MainLayout (đang giới hạn max-w-7xl + padding).
export const LandingPage: React.FC = () => (
  <div className="flex min-h-screen flex-col bg-canvas font-sans text-text-primary">
    <LandingHeader />
    <main className="flex-1">
      <HeroSection />
      <FeaturedRooms />
      <RoommateSection />
      <TransparencySection />
      <OwnerSection />
      <HowItWorks />
      <FinalCta />
    </main>
    <LandingFooter />
  </div>
);

export default LandingPage;
