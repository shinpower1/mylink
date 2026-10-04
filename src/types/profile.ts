export interface BioSection {
  id?: string;
  label: string;
  color: string;
  desc: string;
}

export interface TechStack {
  id?: string;
  name: string;
  color: string;
}

export interface LinkCard {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: string;
  badge?: string;
  cardColor?: string;
  badgeColor?: string;
  isActive?: boolean;
  orderIndex?: number;
}

export type ThemePreset = 'apple' | 'dark' | 'brutalism';
export type ThemeMode = 'system' | 'light' | 'dark';

export interface ThemeConfig {
  theme: ThemePreset;
  accentColor: string;
  mode: ThemeMode;
}

export interface ProfileData {
  username: string;
  name: string;
  englishName?: string;
  githubUsername?: string;
  email?: string;
  avatarUrl: string;
  role: string;
  status: string;
  headline: string;
  bioSections: BioSection[];
  techStack: TechStack[];
  links: LinkCard[];
  themeConfig: ThemeConfig;
}
