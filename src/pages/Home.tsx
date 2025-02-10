/**
 * 홈 페이지 컴포넌트
 * 비주얼한 이미지와 함께 회사의 핵심 메시지를 전달
 */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import YouTube from 'react-youtube';
import ArtistCard from '../components/ArtistCard';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// 메인 슬라이더 이미지 데이터
const heroImages = [
  {
    url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1920',
    alt: 'Concert Stage Performance'
  },
  {
    url: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=1920',
    alt: 'Dance Practice Room'
  },
  {
    url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1920',
    alt: 'Recording Studio'
  }
];

// 테스트용 유튜브 비디오 데이터
const youtubeVideos = [
  {
    id: 'JKTZRE0AqG0',
    title:'',
  },
  {
    id: 'BPebL2mIdSg',
    title : '',
  }
];

interface Artist {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  images: Array<{
    id: number;
    image: string;
    sort_order: number;
  }>;
  isActive: boolean;
  sort_order: number;
}

// 홈 컴포넌트 정의
const Home = () => {
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    // API에서 아티스트 데이터 가져오기
    const fetchArtists = async () => {
      try {
        const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${baseURL}/api/artists`);
        const data = await response.json();
        console.log('Fetched artists data:', data); // 데이터 확인용 로그
        setArtists(data);
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    };

    fetchArtists();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          navigation
          loop
        >
          {heroImages.map((image, index) => (
            <SwiperSlide key={index}>
              <HeroImage src={image.url} alt={image.alt} />
            </SwiperSlide>
          ))}
        </Swiper>
        <HeroOverlay />
      </HeroSection>

      <YoutubeSection>
        <SectionTitle></SectionTitle>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={2}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          navigation={false}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30
            }
          }}
        >
          {youtubeVideos.map((video) => (
            <SwiperSlide key={video.id}>
              <VideoItem>
                <VideoWrapper>
                  <YouTube
                    videoId={video.id}
                    opts={{
                      width: '100%',
                      height: '100%',
                      playerVars: {
                        autoplay: 0,
                      },
                    }}
                  />
                </VideoWrapper>
                <VideoTitle>{video.title}</VideoTitle>
              </VideoItem>
            </SwiperSlide>
          ))}
        </Swiper>
      </YoutubeSection>

      {/* 아티스트 섹션 */}
      <ArtistsSection>
        <SectionTitle>Our Artists</SectionTitle>
        <ArtistGrid>
          {artists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </ArtistGrid>
      </ArtistsSection>
    </motion.div>
  );
};

// 메인 비주얼 섹션 스타일
const HeroSection = styled(motion.section)`
  width: 100%;
  height: calc(100vh - 140px);
  position: relative;
  overflow: hidden;

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .swiper-pagination-bullet {
    background: #fff;
    opacity: 0.5;
    &-active {
      opacity: 1;
    }
  }

  .swiper-button-prev,
  .swiper-button-next {
    color: #fff;
  }
`;

// 히어로 이미지 스타일
const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// 히어로 섹션 오버레이 스타일
const HeroOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.5));
`;

// 유튜브 섹션 스타일
const YoutubeSection = styled.section`
  width: 100%;
  max-width: 1400px;
  margin: 100px auto;
  padding: 0 40px;

  .swiper {
    padding: 20px;
    padding-bottom: 50px;
  }

  .swiper-slide {
    height: auto;
  }

  .swiper-pagination-bullet {
    background: #333;
    opacity: 0.5;
    width: 10px;
    height: 10px;
    margin: 0 8px;
    &-active {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    padding: 0 20px;
    margin: 60px auto;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 60px;
  color: #333;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 40px;
  }
`;

const VideoItem = styled.div`
  width: 100%;
  margin-bottom: 30px;
`;

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 비율 */
  
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 16px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

const VideoTitle = styled.h3`
  font-size: 1.2rem;
  margin-top: 16px;
  color: #333;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-top: 12px;
  }
`;

// 아티스트 섹션 스타일
const ArtistsSection = styled.section`
  padding: 80px 20px;
  background: #f8f8f8;
`;

const ArtistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  margin-top: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

export default Home;
