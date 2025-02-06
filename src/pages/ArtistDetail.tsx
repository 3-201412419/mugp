import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import type { ArtistDocument } from '../types/artist.types';

const ContentContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
`;

const ProfileSection = styled.div`
  margin-bottom: 3rem;
  text-align: center;
`;

const ImageContainer = styled.div`
  width: 100%;
  max-width: 400px;
  height: 400px;
  margin: 0 auto 2rem;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Info = styled.div`
  margin-top: 2rem;
`;

const Name = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

const Description = styled.p`
  margin-bottom: 2rem;
  line-height: 1.8;
  color: #666;
  font-size: 1.1rem;
  white-space: pre-line;
`;

const Section = styled.div`
  margin-bottom: 2.5rem;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #333;
    text-align: center;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  
  li {
    background-color: #f8f8f8;
    padding: 0.8rem 1.5rem;
    border-radius: 25px;
    color: #333;
    font-size: 1rem;
    transition: all 0.2s ease;
    
    &:hover {
      background-color: #f0f0f0;
      transform: translateY(-2px);
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  
  a {
    color: #666;
    text-decoration: none;
    padding: 0.8rem 1.5rem;
    background-color: #f8f8f8;
    border-radius: 25px;
    transition: all 0.2s ease;
    font-size: 1rem;
    
    &:hover {
      background-color: #f0f0f0;
      color: #000;
      transform: translateY(-2px);
    }
  }
`;

const BackButton = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: transparent;
  border: 1px solid #ddd;
  border-radius: 25px;
  cursor: pointer;
  margin-bottom: 2rem;
  color: #666;
  transition: all 0.2s ease;
  display: block;
  margin-left: auto;
  margin-right: auto;
  
  &:hover {
    background-color: #f8f8f8;
    color: #333;
    transform: translateY(-2px);
  }
`;

const ArtistDetail: React.FC = () => {
  const { category, id } = useParams<{ category: string; id: string }>();
  const navigate = useNavigate();
  const [artist, setArtist] = useState<ArtistDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        setLoading(true);
        const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await axios.get<ArtistDocument[]>(`${baseURL}/api/artists${category ? `?category=${category}` : ''}`);
        
        const foundArtist = response.data.find(a => a.name === decodeURIComponent(id || ''));
        if (foundArtist) {
          setArtist(foundArtist);
          setError(null);
        } else {
          setError('Artist not found');
        }
      } catch (err: any) {
        const errorMessage = err.response?.data?.error || err.message || '아티스트 정보를 불러오는데 실패했습니다.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (id && category) {
      fetchArtist();
    }
  }, [id, category]);

  const handleBack = () => {
    navigate(`/mugp/artist/${category}`);
  };

  if (loading) {
    return <ContentContainer>Loading...</ContentContainer>;
  }

  if (error || !artist) {
    return <ContentContainer>{error || 'Artist not found'}</ContentContainer>;
  }

  return (
    <ContentContainer>
      <BackButton onClick={handleBack}>← Back</BackButton>
      <ProfileSection>
        <ImageContainer>
          <img src={artist.image} alt={artist.name} />
        </ImageContainer>
        <Info>
          <Name>{artist.name}</Name>
          <Description>{artist.description}</Description>
        </Info>
      </ProfileSection>
      
      {artist.hobbies && artist.hobbies.length > 0 && (
        <Section>
          <h2>취미</h2>
          <List>
            {artist.hobbies.map((hobby, index) => (
              <li key={`hobby-${index}`}>{hobby}</li>
            ))}
          </List>
        </Section>
      )}
      
      {artist.specialties && artist.specialties.length > 0 && (
        <Section>
          <h2>특기</h2>
          <List>
            {artist.specialties.map((specialty, index) => (
              <li key={`specialty-${index}`}>{specialty}</li>
            ))}
          </List>
        </Section>
      )}
      
      <Section>
        <h2>SNS</h2>
        <SocialLinks>
          {artist.socialLinks?.instagram && (
            <a href={artist.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          )}
          {artist.socialLinks?.youtube && (
            <a href={artist.socialLinks.youtube} target="_blank" rel="noopener noreferrer">
              YouTube
            </a>
          )}
          {artist.socialLinks?.blog && (
            <a href={artist.socialLinks.blog} target="_blank" rel="noopener noreferrer">
              Blog
            </a>
          )}
        </SocialLinks>
      </Section>
    </ContentContainer>
  );
};

export default ArtistDetail;
