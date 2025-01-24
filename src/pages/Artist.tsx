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
        const response = await axios.get<ArtistDocument[]>(`http://localhost:5000/api/artists${category ? `?category=${category}` : ''}`);
        const filteredAndSortedArtists = response.data
          .filter((artist: ArtistDocument) => artist.isActive)
          .sort((a: ArtistDocument, b: ArtistDocument) => a.order - b.order);
        setArtists(filteredAndSortedArtists);
        setError(null);
      } catch (err) {
        setError('Failed to fetch artists');
        console.error('Error fetching artists:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, [category, navigate]);

  return (
    <Container>
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <ArtistGrid>
          {artists.map((artist) => (
            <ArtistCard key={artist._id}>
              <ImageContainer>
                <ArtistImage src={artist.image} alt={artist.name} />
              </ImageContainer>
              <ArtistInfo>
                <ArtistName>{artist.name}</ArtistName>
                <ArtistDescription>{artist.description}</ArtistDescription>
              </ArtistInfo>
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
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 40px;
  padding: 20px 0;
  max-width: 1000px;
  margin: 0 auto;
`;

const ArtistCard = styled.div`
  cursor: pointer;
  transition: transform 0.3s ease;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 10px 10px 0 0;
  overflow: hidden;
`;

const ArtistImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ArtistInfo = styled.div`
  padding: 20px;
`;

const ArtistName = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 10px;
`;

const ArtistDescription = styled.p`
  font-size: 1.2rem;
  font-weight: 400;
  margin-bottom: 20px;
`;

export default Artist;
