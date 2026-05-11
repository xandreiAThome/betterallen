export interface BannerConfig {
  title: string;
  description: string;
  titleSize?: '4xl' | '5xl' | '6xl';
}

// Note: bannerConfig but for govt only
const banners: Record<string, BannerConfig> = {
  'elected-officials': {
    title: 'Elected Officials',
    description:
      'The elected leadership of the Executive and Legislative branches, responsible for policy implementation and law-making.',
  },
  'elected-officials/committees': {
    title: 'Municipal Committees',
    description: 'The standing committees and their roles in local governance.',
  },
  'municipal-offices': {
    title: 'Municipal Offices',
    description:
      'Municipal departments and agencies responsible for specific areas of governance.',
  },
  barangays: {
    title: 'Barangays',
    description:
      'Local government units within the municipality, led by elected officials who manage community-level services and programs.',
  },
};

export const getBannerConfig = (route: string): BannerConfig | undefined => {
  return banners[route];
};

export default banners;
