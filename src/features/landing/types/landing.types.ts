import type { LucideIcon } from 'lucide-react';

export interface FeaturedRoom {
  id: number;
  image: string;
  tag: string;
  price: string;
  area: string;
  title: string;
  address: string;
  amenities: string[];
}

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export interface HabitChip {
  icon: LucideIcon;
  text: string;
}

export interface HeroStat {
  label: string;
  value: string;
}

export interface RoommateProfileRow {
  label: string;
  value: string;
  highlight: boolean;
}

export interface RoommateProfile {
  initials: string;
  name: string;
  meta: string;
  rows: RoommateProfileRow[];
  habits: HabitChip[];
}

export interface LivingBookLine {
  label: string;
  value: string;
  highlight: boolean;
}

export interface LivingBook {
  title: string;
  subtitle: string;
  roomCode: string;
  period: string;
  total: string;
  status: string;
  lines: LivingBookLine[];
  ticket: { title: string; note: string; status: string };
}

export interface OwnerMeter {
  room: string;
  status: string;
  done: boolean;
}

export interface OwnerSummary {
  name: string;
  address: string;
  occupancy: string;
  expected: string;
  collectedLabel: string;
  collected: string;
  meters: OwnerMeter[];
}

export interface HowItWorksStep {
  n: string;
  title: string;
  desc: string;
}

export interface FooterLink {
  label: string;
  to?: string;
  href?: string;
}

export interface FooterColumn {
  heading: string;
  links: FooterLink[];
}
