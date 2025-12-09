export interface NavItem {
  id: string;
  label: string;
}

export interface Ability {
  id: number;
  name: string;
  type: string;
  rank: string;
  description: string;
  icon: 'Sword' | 'Eye' | 'Shield' | 'Zap';
}

export interface GalleryImage {
  id: number;
  url: string;
  caption: string;
}

export interface StatData {
  subject: string;
  A: number;
  fullMark: number;
}

export interface LoreSection {
  title: string;
  content: string;
}