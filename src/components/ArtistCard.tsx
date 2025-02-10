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
  images: ArtistImage[] | string;
  isActive: boolean;
  sort_order: number;
}

interface ArtistCardProps {
  artist: Artist;
  onClick?: () => void;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist, onClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  // Parse images if it's a string
  const parsedImages = typeof artist.images === 'string' 
    ? JSON.parse(artist.images) 
    : artist.images || [];

  // 모든 이미지 URL을 배열로 준비 (중복 제거)
  const allImages = Array.from(new Set([
    artist.image,
    ...parsedImages.map((img: ArtistImage) => img.image)
  ]));
  
  console.log('Artist:', artist.name);
  console.log('All images:', allImages);

  // 이미지 자동 전환 효과
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isHovered && allImages.length > 1) {
      intervalId = setInterval(() => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % allImages.length);
      }, 2000); // 2초로 변경
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isHovered, allImages.length]);
  
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentImageIndex(0);
  };

  return (
    <Container
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ImageWrapper>
        <ImageSlider style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
          {allImages.map((image, index) => (
            <StyledImage
              key={index}
              src={image || '/assets/default-profile.png'}
              alt={`${artist.name} ${index + 1}`}
              loading="lazy"
            />
          ))}
        </ImageSlider>
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
  
  &:hover {
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%; // 1:1 aspect ratio
  overflow: hidden;
  background: #f5f5f5;
`;

const ImageSlider = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  transition: transform 0.8s ease; // 전환 시간을 0.8초로 변경하고 ease 타이밍 함수 사용
`;

const StyledImage = styled.img`
  min-width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.05);
  transition: transform 0.8s ease; // 확대 효과도 0.8초로 맞춤
  
  ${Container}:hover & {
    transform: scale(1.1);
  }
`;

const InfoContainer = styled.div`
  padding: 1rem;
  background: white;
  transform: translateY(0);
  transition: transform 0.3s ease-in-out;

  ${Container}:hover & {
    transform: translateY(-5px);
  }
`;

const ArtistName = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  color: #333;
  transition: color 0.3s ease;

  ${Container}:hover & {
    color: #000;
  }
`;

const ArtistDescription = styled.p`
  margin: 0.5rem 0 0;
  font-size: 0.9rem;
  color: #666;
  transition: color 0.3s ease;

  ${Container}:hover & {
    color: #444;
  }
`;

export default ArtistCard;
