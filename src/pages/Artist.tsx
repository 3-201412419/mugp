/**
 * 아티스트 페이지 컴포넌트
 * 소속 아티스트들의 프로필과 정보를 표시
 * 아티스트별 상세 정보와 포트폴리오 제공
 */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import type { ArtistCategory, ArtistDocument } from '../types/artist.types';

function Artist() {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [artists, setArtists] = useState<ArtistDocument[]>([]);
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
        console.log('Fetching artists from:', `${baseURL}/api/artists${category ? `?category=${category}` : ''}`);
        
        const response = await axios.get<ArtistDocument[]>(`${baseURL}/api/artists${category ? `?category=${category}` : ''}`);
        console.log('Artists data received:', response.data);
        
        const filteredAndSortedArtists = response.data
          .filter((artist: ArtistDocument) => artist.isActive)
          .sort((a: ArtistDocument, b: ArtistDocument) => a.order - b.order);
        
        console.log('Filtered and sorted artists:', filteredAndSortedArtists);
        setArtists(filteredAndSortedArtists);
        setError(null);
      } catch (err: any) {
        const errorMessage = err.response?.data?.error || err.message || '아티스트 정보를 불러오는데 실패했습니다.';
        console.error('Error details:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status
        });
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

  return (
    <Container>
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <ArtistGrid>
          {artists.map((artist) => (
            <ArtistCard key={artist._id} onClick={() => handleArtistClick(artist.name)}>
              <ImageContainer>
                <ArtistImage src={artist.image} alt={artist.name} />
                <ArtistInfo>
                  <ArtistName>{artist.name}</ArtistName>
                  <ArtistDescription>{artist.description}</ArtistDescription>
                </ArtistInfo>
              </ImageContainer>
            </ArtistCard>
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
  gap: 30px;
  margin-top: 30px;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 133.33%; // 3:4 비율
  overflow: hidden;
`;

const ArtistImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const ArtistInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  color: white;
`;

const ArtistName = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
`;

const ArtistDescription = styled.p`
  margin: 8px 0 0;
  font-size: 0.9rem;
  opacity: 0.9;
`;

const ArtistCard = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    
    ${ArtistImage} {
      transform: scale(1.05);
    }
  }
`;

export default Artist;
