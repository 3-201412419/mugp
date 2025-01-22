/**
 * 홈 페이지 컴포넌트
 * 회사의 메인 페이지로 주요 콘텐츠와 최신 소식을 표시
 * 비주얼한 이미지와 함께 회사의 핵심 메시지를 전달
 */

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
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

// 홈 컴포넌트 정의
const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* 메인 비주얼 섹션 */}
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

export default Home;
