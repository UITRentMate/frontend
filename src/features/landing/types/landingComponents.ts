import type { ReactNode } from 'react';
import type { FeaturedRoom, FeatureItem } from './landing.types';

export type LandingBadgeTone = 'green' | 'amber';

export interface LandingPanelProps {
  children: ReactNode;
  className?: string;
}

export interface LandingBadgeProps {
  tone: LandingBadgeTone;
  children: ReactNode;
}

export interface LandingFeatureListProps {
  items: FeatureItem[];
  twoColumns?: boolean;
}

export interface LandingLogoProps {
  showTagline?: boolean;
}

export interface LandingRoomCardProps {
  room: FeaturedRoom;
}
