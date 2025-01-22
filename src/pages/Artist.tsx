/**
 * 아티스트 페이지 컴포넌트
 * 소속 아티스트들의 프로필과 정보를 표시
 * 아티스트별 상세 정보와 포트폴리오 제공
 */

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// 아티스트 정보 타입 정의
interface ArtistInfo {
  id: number;
  name: string;
  role: string;
  image: string;
  description: string;
  socialLinks?: {
    instagram?: string;
    youtube?: string;
    twitter?: string;
  };
}

const Artist = () => {
  const { t } = useTranslation();

  // 아티스트 데이터 (나중에 API나 CMS로 관리 예정)
  const artists: ArtistInfo[] = [
    {
      id: 1,
      name: t('artist.member1.name'),
      role: t('artist.member1.role'),
      image: '/images/artist1.jpg',
      description: t('artist.member1.description'),
      socialLinks: {
        instagram: 'https://instagram.com/artist1',
        youtube: 'https://youtube.com/artist1'
      }
    },
    // 추가 아티스트 데이터...
  ];

  return (
    <Container>
      <ContentWrapper>
        {/* 페이지 제목 섹션 */}
        <TitleSection
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <PageTitle>{t('artist.pageTitle')}</PageTitle>
          <Subtitle>{t('artist.subtitle')}</Subtitle>
        </TitleSection>

        {/* 아티스트 목록 섹션 */}
        <ArtistGrid>
          {artists.map((artist, index) => (
            <ArtistCard
              key={artist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <ArtistImage>
                <img src={artist.image} alt={artist.name} />
              </ArtistImage>
              <ArtistInfo>
                <ArtistName>{artist.name}</ArtistName>
                <ArtistRole>{artist.role}</ArtistRole>
                <ArtistDescription>{artist.description}</ArtistDescription>
                {artist.socialLinks && (
                  <SocialLinks>
                    {/* 소셜 미디어 링크 */}
                  </SocialLinks>
                )}
              </ArtistInfo>
            </ArtistCard>
          ))}
        </ArtistGrid>
      </ContentWrapper>
    </Container>
  );
};

// 스타일 컴포넌트 정의
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;
  padding: 40px 0;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

// 제목 섹션 스타일
const TitleSection = styled(motion.div)`
  text-align: center;
  margin-bottom: 60px;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 16px;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #666666;
  line-height: 1.6;
`;

// 아티스트 그리드 스타일
const ArtistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
`;

// 아티스트 카드 스타일
const ArtistCard = styled(motion.article)`
  background-color: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ArtistImage = styled.div`
  width: 100%;
  height: 400px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  ${ArtistCard}:hover & img {
    transform: scale(1.05);
  }
`;

// 아티스트 정보 스타일
const ArtistInfo = styled.div`
  padding: 24px;
`;

const ArtistName = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;
`;

const ArtistRole = styled.p`
  font-size: 1rem;
  color: #666666;
  margin-bottom: 16px;
`;

const ArtistDescription = styled.p`
  font-size: 1rem;
  color: #4a4a4a;
  line-height: 1.6;
  margin-bottom: 24px;
`;

// 소셜 미디어 링크 스타일
const SocialLinks = styled.div`
  display: flex;
  gap: 16px;
`;

export default Artist;
