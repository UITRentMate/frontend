import React from 'react';
import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';

import { ROUTES } from '@/routes/paths';

import type {
  LandingBadgeProps,
  LandingBadgeTone,
  LandingFeatureListProps,
  LandingLogoProps,
  LandingPanelProps,
} from '../types';

const BADGE_TONES: Record<LandingBadgeTone, string> = {
  green: 'border-success-border bg-success-soft text-secondary-700',
  amber: 'border-warning-border bg-warning-soft text-[#B45309]',
};

export const LandingLogo: React.FC<LandingLogoProps> = ({ showTagline = false }) => (
  <Link to={ROUTES.HOME} className="flex items-center gap-2.5">
    <span className="grid h-9 w-9 place-items-center rounded-md bg-brand-500 text-white">
      <Building2 className="h-5 w-5" aria-hidden="true" />
    </span>
    <span className="leading-tight">
      <span className="block font-heading text-lg font-bold text-text-primary">RentMate</span>
      {showTagline && <span className="block text-[11px] text-text-muted">PropTech Platform</span>}
    </span>
  </Link>
);

export const LandingPanel: React.FC<LandingPanelProps> = ({ children, className = '' }) => (
  <div className={`rounded-lg border border-border-subtle bg-white p-6 shadow-soft-xs ${className}`}>
    {children}
  </div>
);

export const LandingBadge: React.FC<LandingBadgeProps> = ({ tone, children }) => (
  <span className={`rounded-xs border px-2.5 py-1 text-xs font-semibold ${BADGE_TONES[tone]}`}>{children}</span>
);

export const LandingFeatureList: React.FC<LandingFeatureListProps> = ({ items, twoColumns = false }) => (
  <ul className={`mt-8 grid gap-x-8 gap-y-5 ${twoColumns ? 'sm:grid-cols-2' : ''}`}>
    {items.map(({ icon: Icon, title, desc }) => (
      <li
        key={title}
        className={`flex gap-3 ${twoColumns ? '' : 'border-b border-border-subtle pb-5 last:border-0'}`}
      >
        <Icon className="mt-1 h-5 w-5 shrink-0 text-brand-500" aria-hidden="true" />
        <div>
          <h3 className="font-heading font-semibold text-text-primary">{title}</h3>
          <p className="mt-1 text-[15px] leading-6 text-text-secondary">{desc}</p>
        </div>
      </li>
    ))}
  </ul>
);
