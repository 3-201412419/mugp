import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

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

const ArtistDetail: React.FC = () => {
  const { category, name } = useParams<{ category: string; name: string }>();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        setLoading(true);
        setError(null);
        const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        
        // category와 name으로 필터링하여 정확한 아티스트를 가져옴
        const response = await axios.get<Artist[]>(`${baseURL}/api/artists`, {
          params: {
            category: category,
            name: decodeURIComponent(name || '')
          }
        });

        console.log('API Response:', response.data); // 디버깅용 로그

        if (response.data && response.data.length > 0) {
          const matchedArtist = response.data.find(
            a => a.category === category && a.name === decodeURIComponent(name || '')
          );
          
          if (matchedArtist) {
            setArtist(matchedArtist);
          } else {
            setError('아티스트를 찾을 수 없습니다.');
          }
        } else {
          setError('아티스트를 찾을 수 없습니다.');
        }
      } catch (err) {
        console.error('Error fetching artist:', err);
        setError('아티스트 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    if (name && category) {
      fetchArtist();
    }
  }, [name, category]);

  const handlePrevImage = () => {
    if (artist) {
      const allImages = [artist.image, ...artist.images.map(img => img.image)];
      setCurrentImageIndex((prev) => 
        prev === 0 ? allImages.length - 1 : prev - 1
      );
    }
  };

  const handleNextImage = () => {
    if (artist) {
      const allImages = [artist.image, ...artist.images.map(img => img.image)];
      setCurrentImageIndex((prev) => 
        prev === allImages.length - 1 ? 0 : prev + 1
      );
    }
  };

  if (loading) {
    return <Container><LoadingMessage>로딩 중...</LoadingMessage></Container>;
  }

  if (error || !artist) {
    return <Container><ErrorMessage>{error}</ErrorMessage></Container>;
  }

  const allImages = [artist.image, ...artist.images.map(img => img.image)];

  return (
    <Container>
      <ContentWrapper>
        <ImageSection>
          <SlideShowContainer>
            <AnimatePresence mode="wait">
              <StyledImage
                key={currentImageIndex}
                src={allImages[currentImageIndex]}
                alt={artist.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
            {allImages.length > 1 && (
              <>
                <NavButton onClick={handlePrevImage} left>
                  &#10094;
                </NavButton>
                <NavButton onClick={handleNextImage} right>
                  &#10095;
                </NavButton>
                <ImageIndicators>
                  {allImages.map((_, index) => (
                    <Indicator
                      key={index}
                      active={index === currentImageIndex}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </ImageIndicators>
              </>
            )}
          </SlideShowContainer>
        </ImageSection>
        
        <InfoSection>
          <ArtistName>{artist.name}</ArtistName>
          {/* <ArtistCategory>{artist.category}</ArtistCategory> */}
          <ArtistDescription>{artist.description || '아직 설명이 없습니다.'}</ArtistDescription>
        </InfoSection>
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.div`
  padding: 40px;
  max-width: 1400px;
  margin: 0 auto;
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ImageSection = styled.div`
  position: relative;
  width: 100%;
`;

const SlideShowContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 133.33%; // 3:4 비율
  background: #f5f5f5;
  border-radius: 15px;
  overflow: hidden;
`;

const StyledImage = styled(motion.img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

interface NavButtonProps {
  left?: boolean;
  right?: boolean;
}

const NavButton = styled.button<NavButtonProps>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.left ? 'left: 10px;' : ''}
  ${props => props.right ? 'right: 10px;' : ''}
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

const ImageIndicators = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
`;

interface IndicatorProps {
  active: boolean;
}

const Indicator = styled.div<IndicatorProps>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background: white;
  }
`;

const InfoSection = styled.div`
  padding: 20px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ArtistName = styled.h1`
  margin: 0;
  font-size: 2.5rem;
  color: #333;
`;

const ArtistCategory = styled.div`
  margin-top: 10px;
  font-size: 1.2rem;
  color: #666;
  text-transform: capitalize;
`;

const ArtistDescription = styled.p`
  margin-top: 20px;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #444;
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

export default ArtistDetail;
