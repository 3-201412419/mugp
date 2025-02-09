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
        const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await axios.get<Artist[]>(`${baseURL}/api/artists${category ? `?category=${category}` : ''}`);
        console.log('API Response:', response.data);
        const artistData = Array.isArray(response.data) ? response.data : [];
        const filteredAndSortedArtists = artistData
          .filter(artist => artist.isActive)
          .sort((a, b) => a.order - b.order);
        
        setArtists(filteredAndSortedArtists);
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : '아티스트 정보를 불러오는데 실패했습니다.';
        console.error('Error fetching artists:', err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, [category, navigate]);

  const handleArtistClick = (artistName: string) => {
    navigate(`/mugp/artist/${category}/${encodeURIComponent(artistName)}`);
  };

  if (loading) {
    return (
      <Container>
        <LoadingMessage>로딩 중...</LoadingMessage>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <NoDataMessage>현재 등록된 아티스트가 없습니다.</NoDataMessage>
      </Container>
    );
  }

  return (
    <Container>
      {artists.length === 0 ? (
        <NoDataMessage>현재 등록된 아티스트가 없습니다.</NoDataMessage>
      ) : (
        <ArtistGrid>
          {artists.map((artist) => (
            <ArtistCard
              key={artist.id}
              artist={artist}
              onClick={() => handleArtistClick(artist.name)}
            />
          ))}
        </ArtistGrid>
      )}
    </Container>
  );
}

const Container = styled.div`
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ArtistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 40px;
  margin-top: 20px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 100px 0;
  font-size: 1.2rem;
  color: #666;
`;

const NoDataMessage = styled.div`
  text-align: center;
  padding: 100px 0;
  font-size: 1.2rem;
  color: #666;
  width: 100%;
`;

export default Artist;
