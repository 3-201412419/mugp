/**
 * 뉴스 페이지 컴포넌트
 * 회사의 최신 뉴스와 업데이트를 표시하는 페이지
 * 뉴스 목록과 상세 내용을 보여주는 기능 포함
 */

import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

// 뉴스 아이템 타입 정의
interface NewsItem {
  id: number;
  title: string;
  date: string;
  content: string;
  image?: string;
}

// 뉴스 컴포넌트 정의
const News = () => {
  const { t } = useTranslation();

  // 더미 뉴스 데이터 (나중에 실제 데이터로 교체 예정)
  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: t('news.item1.title'),
      date: '2024-01-15',
      content: t('news.item1.content'),
      image: '/images/news1.jpg'
    },
    {
      id: 2,
      title: t('news.item2.title'),
      date: '2024-01-10',
      content: t('news.item2.content')
    }
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
          <PageTitle>{t('news.pageTitle')}</PageTitle>
          <Subtitle>{t('news.subtitle')}</Subtitle>
        </TitleSection>

        {/* 뉴스 목록 섹션 */}
        <NewsSection>
          {newsItems.map((item, index) => (
            <NewsCard
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {item.image && (
                <NewsImage>
                  <img src={item.image} alt={item.title} />
                </NewsImage>
              )}
              <NewsContent>
                <NewsTitle>{item.title}</NewsTitle>
                <NewsDate>{item.date}</NewsDate>
                <NewsText>{item.content}</NewsText>
                <ReadMoreButton>{t('news.readMore')}</ReadMoreButton>
              </NewsContent>
            </NewsCard>
          ))}
        </NewsSection>
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

// 뉴스 섹션 스타일
const NewsSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
`;

// 뉴스 카드 스타일
const NewsCard = styled(motion.article)`
  background-color: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

// 뉴스 이미지 스타일
const NewsImage = styled.div`
  width: 100%;
  height: 300px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  ${NewsCard}:hover & img {
    transform: scale(1.05);
  }
`;

// 뉴스 콘텐츠 스타일
const NewsContent = styled.div`
  padding: 24px;
`;

// 뉴스 제목 스타일
const NewsTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 12px;
`;

// 뉴스 날짜 스타일
const NewsDate = styled.p`
  font-size: 0.9rem;
  color: #666666;
  margin-bottom: 16px;
`;

// 뉴스 본문 스타일
const NewsText = styled.p`
  font-size: 1rem;
  color: #4a4a4a;
  line-height: 1.6;
  margin-bottom: 24px;
`;

// 더보기 버튼 스타일
const ReadMoreButton = styled.button`
  background: none;
  border: 2px solid #1a1a1a;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #1a1a1a;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #1a1a1a;
    color: #ffffff;
  }
`;

export default News;
