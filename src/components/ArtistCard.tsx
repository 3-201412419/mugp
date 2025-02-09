import React from 'react';
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
  const images = [artist.image, ...artist.images.map(img => img.image)];

  return (
    <Container
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <ImageWrapper>
        {images.map((image, index) => (
          <StyledImage
            key={index}
            src={image}
            alt={`${artist.name} ${index + 1}`}
            $isFirst={index === 0}
            $totalImages={images.length}
          />
        ))}
      </ImageWrapper>
      <InfoContainer>
        <ArtistName>{artist.name}</ArtistName>
        {/* <ArtistCategory>{artist.category}</ArtistCategory> */}
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
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  position: relative;
`;

const ImageWrapper = styled.div`
  width: 100%;
  padding-top: 133.33%; // 3:4 비율
  position: relative;
  overflow: hidden;

  &:hover img {
    opacity: 0;
  }

  &:hover img:last-child {
    opacity: 1;
  }
`;

interface StyledImageProps {
  $isFirst: boolean;
  $totalImages: number;
}

const StyledImage = styled.img<StyledImageProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.5s ease-in-out;
  opacity: ${props => (props.$isFirst ? 1 : 0)};

  ${props => {
    if (props.$totalImages > 1) {
      return `
        &:hover {
          opacity: 0;
        }
        &:hover + img {
          opacity: 1;
        }
      `;
    }
    return '';
  }}
`;

const InfoContainer = styled.div`
  padding: 20px;
  background: white;
`;

const ArtistName = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`;

const ArtistCategory = styled.p`
  margin: 5px 0;
  color: #666;
  text-transform: capitalize;
`;

const ArtistDescription = styled.p`
  margin: 10px 0 0;
  font-size: 0.9rem;
  color: #444;
  line-height: 1.4;
`;

export default ArtistCard;
