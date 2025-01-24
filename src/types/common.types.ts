export type Language = 'en' | 'zh' | 'ja' | 'kr';

export type MenuCategory = 'ABOUT' | 'ARTIST' | 'AUDITION' | 'NEWS';
export type ArtistMenuCategory = 'INFLUENCER' | 'MC' | 'CREATOR';
export type MenuType = MenuCategory | ArtistMenuCategory;

export const menuToRoute: Record<MenuType, string> = {
  'ABOUT': '/mugp/about',
  'ARTIST': '/mugp/artist/influencer',
  'AUDITION': '/mugp/audition',
  'NEWS': '/mugp/news',
  'INFLUENCER': '/mugp/artist/influencer',
  'MC': '/mugp/artist/mc',
  'CREATOR': '/mugp/artist/creator'
};
