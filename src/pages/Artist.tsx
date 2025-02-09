/**
 * 아티스트 페이지 컴포넌트
 * 소속 아티스트들의 프로필과 정보를 표시
 * 아티스트별 상세 정보와 포트폴리오 제공
 */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ArtistCard from '../components/ArtistCard';

interface Artist {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  images: Array<{
    id: number;
    image: string;
    order: number;
  }>;
  isActive: boolean;
  order: number;
}

type ArtistCategory = 'influencer' | 'mc' | 'creator';

function Artist() {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // category 파라미터 유효성 검사
  const isValidCategory = (cat: string | undefined): cat is ArtistCategory => {
    return cat === 'influencer' || cat === 'mc' || cat === 'creator';
  };

  useEffect(() => {
    // 유효하지 않은 카테고리인 경우 기본 페이지로 리다이렉트
    if (category && !isValidCategory(category)) {
      navigate('/mugp/artist/influencer');
      return;
    }

    const fetchArtists = async () => {
      try {
        setLoading(true);
        const baseURL = import.meta.env.VITE_API_URL || '';
        console.log('Fetching artists with category:', category);
        const response = await axios.get<Artist[]>(`${baseURL}/api/artists`, {
          params: { category }
        });
        
        const filteredAndSortedArtists = response.data
          .filter(artist => artist.isActive)
          .sort((a, b) => a.order - b.order);
        
        console.log('Filtered artists:', filteredAndSortedArtists);
        setArtists(filteredAndSortedArtists);
        setError(null);
      } catch (err) {
        console.error('Error fetching artists:', err);
        setError('아티스트 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, [category, navigate]);

  const handleArtistClick = (artist: Artist) => {
    console.log('Artist clicked:', artist);
    const encodedName = encodeURIComponent(artist.name);
    const url = `/mugp/artist/${artist.category}/${encodedName}`;
    console.log('Navigating to:', url);
    navigate(url);
  };

  if (loading) {
    return <Container><LoadingMessage>로딩 중...</LoadingMessage></Container>;
  }

  if (error) {
    return <Container><ErrorMessage>{error}</ErrorMessage></Container>;
  }

  return (
    <Container>
      <Title>
        {category === 'influencer' && 'Influencer'}
        {category === 'mc' && 'MC'}
        {category === 'creator' && 'Creator'}
      </Title>
      <ArtistGrid>
        {artists.map((artist) => (
          <ArtistCard
            key={artist.id}
            artist={artist}
            onClick={() => handleArtistClick(artist)}
          />
        ))}
      </ArtistGrid>
    </Container>
  );
}

const Container = styled.div`
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 40px;
  text-align: center;
`;

const ArtistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 40px;
  align-items: start;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #ff4444;
  font-size: 1.2rem;
`;

export default Artist;
