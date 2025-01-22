/**
 * About 페이지 컴포넌트
 * 회사 소개, 위치 정보, 철학, 비전 등을 표시하는 페이지
 */

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

// Kakao Maps API 타입 선언
declare global {
  interface Window {
    kakao: any;
  }
}

// 상수 정의
const KAKAO_MAP_KEY = 'c99bec32f4faa8017e6ac623bb49adea';
const COMPANY_LOCATION = {
  lat: 35.2100,
  lng: 129.0689
};

const About = () => {
  const { t } = useTranslation();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapError, setMapError] = React.useState<string | null>(null);

  // 카카오맵 초기화
  useEffect(() => {
    // 카카오맵 스크립트 로드 함수
    const loadKakaoMapScript = () => {
      return new Promise<void>((resolve, reject) => {
        // 이미 로드된 경우 바로 resolve
        if (window.kakao && window.kakao.maps) {
          resolve();
          return;
        }

        // 스크립트 생성 및 로드
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_KEY}&autoload=false`;
        script.async = true;
        script.onerror = () => reject(new Error('Failed to load Kakao Maps script'));
        script.onload = () => resolve();
        document.head.appendChild(script);
      });
    };

    // 지도 초기화 함수
    const initializeMap = async () => {
      if (!mapContainerRef.current) return;

      try {
        // 스크립트 로드 및 초기화
        await loadKakaoMapScript();
        await new Promise<void>((resolve) => {
          window.kakao.maps.load(() => resolve());
        });

        // 지도 옵션 설정
        const options = {
          center: new window.kakao.maps.LatLng(COMPANY_LOCATION.lat, COMPANY_LOCATION.lng),
          level: 3
        };

        // 지도 및 마커 생성
        const map = new window.kakao.maps.Map(mapContainerRef.current, options);
        const markerPosition = new window.kakao.maps.LatLng(COMPANY_LOCATION.lat, COMPANY_LOCATION.lng);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition
        });

        marker.setMap(map);

        // 반응형 처리: 윈도우 리사이즈 시 지도 중심점 재설정
        window.addEventListener('resize', () => {
          map.setCenter(new window.kakao.maps.LatLng(COMPANY_LOCATION.lat, COMPANY_LOCATION.lng));
        });

      } catch (error) {
        console.error('Error initializing Kakao map:', error);
        setMapError(error instanceof Error ? error.message : 'Failed to load map');
      }
    };

    initializeMap();
  }, []);

  return (
    <Container>
      <ContentWrapper>
        {/* 위치 정보 섹션 */}
        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <SectionTitle>{t('about.title')}</SectionTitle>
          <LocationContent>
            <MapContainer>
              {mapError ? (
                <MapError>
                  {t('about.map.error', { defaultValue: 'Failed to load map. Please try again later.' })}
                </MapError>
              ) : (
                <MapWrapper ref={mapContainerRef} />
              )}
            </MapContainer>
            <LocationInfo>
              <InfoGroup>
                <InfoTitle>{t('about.address.label')}</InfoTitle>
                <InfoText>{t('about.address.text')}</InfoText>
              </InfoGroup>
              <InfoGroup>
                <InfoTitle>{t('about.subway.label')}</InfoTitle>
                <InfoText>{t('about.subway.text')}</InfoText>
              </InfoGroup>
              <InfoGroup>
                <InfoTitle>{t('about.bus.label')}</InfoTitle>
                <InfoText>{t('about.bus.text')}</InfoText>
              </InfoGroup>
            </LocationInfo>
          </LocationContent>
        </Section>

        {/* 슬로건 섹션 */}
        <Slogan>{t('about.slogan')}</Slogan>

        {/* 철학 섹션 */}
        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <SectionTitle>{t('about.philosophy.title')}</SectionTitle>
          <PhilosophyContent>
            <PhilosophyText>{t('about.philosophy.text')}</PhilosophyText>
          </PhilosophyContent>
        </Section>

        {/* 비전 섹션 */}
        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <SectionTitle>{t('about.vision.title')}</SectionTitle>
          <VisionContent>
            <VisionText>{t('about.vision.text')}</VisionText>
          </VisionContent>
        </Section>

        {/* 조직 구조 섹션 */}
        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <SectionTitle>{t('about.organization.title')}</SectionTitle>
          <OrganizationContent>
            <DepartmentList>
              {(t('about.organization.departments', { returnObjects: true }) as string[]).map((dept: string, index: number) => (
                <DepartmentItem key={index}>{dept}</DepartmentItem>
              ))}
            </DepartmentList>
          </OrganizationContent>
        </Section>
      </ContentWrapper>
    </Container>
  );
};

// 스타일 컴포넌트 정의
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;
  padding: 40px 0;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

// 섹션 공통 스타일
const Section = styled(motion.section)`
  margin-bottom: 80px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 40px;
  color: #1a1a1a;
`;

// 슬로건 스타일
const Slogan = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin: 80px 0;
  color: #1a1a1a;
  line-height: 1.4;
`;

// 위치 정보 섹션 스타일
const LocationContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: stretch;
  min-height: 500px;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

// 지도 관련 스타일
const MapContainer = styled.div`
  width: 100%;
  min-height: 400px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #f8f9fa;
  position: relative;
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const MapError = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dc3545;
  font-size: 1rem;
  text-align: center;
  padding: 20px;
`;

// 위치 정보 텍스트 스타일
const LocationInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 12px;
  height: 100%;
`;

const InfoGroup = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const InfoTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 2px solid #f0f0f0;
`;

const InfoText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #4a4a4a;
  white-space: pre-line;
`;

// 철학 섹션 스타일
const PhilosophyContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  background-color: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const PhilosophyText = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #4a4a4a;
  text-align: center;
  white-space: pre-line;
`;

// 비전 섹션 스타일
const VisionContent = styled(PhilosophyContent)`
  background-color: #ffffff;
  border: 1px solid #f0f0f0;
`;

const VisionText = styled(PhilosophyText)`
  color: #1a1a1a;
`;

// 조직 구조 섹션 스타일
const OrganizationContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const DepartmentList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const DepartmentItem = styled.li`
  padding: 15px 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  font-size: 1rem;
  color: #4a4a4a;
  text-align: center;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

export default About;
