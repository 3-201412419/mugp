import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface ArtistImage {
  id: number;
  image: string;
  sort_order: number;
}

interface Artist {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  images: ArtistImage[];
  isActive: boolean;
  sort_order: number;
}

interface ArtistCardProps {
  artist: Artist;
  onClick?: () => void;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist, onClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [interval, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const allImages = [artist.image, ...(artist.images?.map(img => img.image) || [])];

  const startImageRotation = () => {
    const id = setInterval(() => {
      setCurrentImageIndex(prev => 
        prev === allImages.length - 1 ? 0 : prev + 1
      );
    }, 1000);
    setIntervalId(id);
  };

  const stopImageRotation = () => {
    if (interval) {
      clearInterval(interval);
      setIntervalId(null);
      setCurrentImageIndex(0);
    }
  };

  useEffect(() => {
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [interval]);

  return (
    <Container
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => {
        if (allImages.length > 1) {
          startImageRotation();
        }
      }}
      onMouseLeave={() => {
        if (allImages.length > 1) {
          stopImageRotation();
        }
      }}
    >
      <ImageWrapper>
        <StyledImage
          src={allImages[currentImageIndex]}
          alt={`${artist.name} ${currentImageIndex + 1}`}
          $isFirst={true}
          $totalImages={allImages.length}
        />
      </ImageWrapper>
      <InfoContainer>
        <ArtistName>{artist.name}</ArtistName>
        {artist.description && (
          <ArtistDescription>{artist.description}</ArtistDescription>
        )}
      </InfoContainer>
    </Container>
  );
};


const Container = styled(motion.div)`
  width: 100%;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%; // 1:1 aspect ratio
  overflow: hidden;
`;

const StyledImage = styled.img<{ $isFirst: boolean; $totalImages: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
`;

const InfoContainer = styled.div`
  padding: 1rem;
  background: white;
`;

const ArtistName = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 500;
`;

const ArtistDescription = styled.p`
  margin: 0.5rem 0 0;
  font-size: 0.9rem;
  color: #666;
`;
export default ArtistCard;
