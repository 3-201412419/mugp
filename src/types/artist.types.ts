export type ArtistCategory = 'influencer' | 'mc' | 'creator';

export interface SocialLinks {
  instagram?: string;
  youtube?: string;
  blog?: string;
}

// 기본 아티스트 데이터 (JSON 파일용)
export interface ArtistData {
  name: string;
  category: ArtistCategory;
  image: string;
  description: string;
  socialLinks: SocialLinks;
  order: number;
  isActive: boolean;
}

// MongoDB 문서 타입 (API 응답용)
export interface ArtistDocument extends ArtistData {
  _id: string;
}
