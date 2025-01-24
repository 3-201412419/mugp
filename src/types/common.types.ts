export type Language = 'kr' | 'en' | 'ja' | 'zh';

export type MenuCategory = 'ABOUT' | 'ARTIST' | 'CALENDAR' | 'APPLY';
export type ArtistMenuCategory = 'INFLUENCER' | 'MC' | 'CREATOR';
export type MenuType = MenuCategory | ArtistMenuCategory;

export const MENU_PATHS: Record<MenuType, string> = {
  'ABOUT': '/mugp/about',
  'ARTIST': '/mugp/artist/influencer',
  'CALENDAR': '/mugp/calendar',
  'APPLY': '/mugp/apply',
  'INFLUENCER': '/mugp/artist/influencer',
  'MC': '/mugp/artist/mc',
  'CREATOR': '/mugp/artist/creator'
};
