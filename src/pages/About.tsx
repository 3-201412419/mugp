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
const KAKAO_MAP_KEY = import.meta.env.VITE_KAKAO_MAP_KEY || 'c99bec32f4faa8017e6ac623bb49adea';
const COMPANY_LOCATION = {
  lat: 35.2100,
  lng: 129.0689
};

const About = () => {
  const { t } = useTranslation();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapError, setMapError] = React.useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = React.useState(false);

  // 카카오맵 초기화
  useEffect(() => {
    let map: any = null;

    // 카카오맵 스크립트 로드 함수
    const loadKakaoMapScript = () => {
      return new Promise<void>((resolve, reject) => {
        try {
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
          script.onerror = () => {
            setMapError('지도를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.');
            reject(new Error('Failed to load Kakao Maps script'));
          };
          script.onload = () => {
            window.kakao.maps.load(() => {
              resolve();
            });
          };
          document.head.appendChild(script);
        } catch (error) {
          setMapError('지도를 초기화하는데 실패했습니다.');
          reject(error);
        }
      });
    };

    // 지도 초기화 함수
    const initializeMap = async () => {
      try {
        await loadKakaoMapScript();
        
        if (!mapContainerRef.current) return;

        const options = {
          center: new window.kakao.maps.LatLng(COMPANY_LOCATION.lat, COMPANY_LOCATION.lng),
          level: 3
        };

        map = new window.kakao.maps.Map(mapContainerRef.current, options);
        
        // 마커 추가
        const markerPosition = new window.kakao.maps.LatLng(COMPANY_LOCATION.lat, COMPANY_LOCATION.lng);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition
        });
        marker.setMap(map);

        setMapLoaded(true);
        setMapError(null);
      } catch (error) {
        console.error('Map initialization error:', error);
        setMapError('지도를 초기화하는데 실패했습니다. 잠시 후 다시 시도해주세요.');
      }
    };

    initializeMap();

    // cleanup
    return () => {
      if (map) {
        // Clean up map instance if needed
      }
    };
  }, []);

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Section>
          <Title>{t('about.title')}</Title>
          <Description>{t('about.description')}</Description>
        </Section>

        <Section>
          <Title>{t('about.location.title')}</Title>
          <MapContainer>
            <MapWrapper ref={mapContainerRef}>
              {mapError && (
                <MapErrorMessage>
                  {mapError}
                  <RetryButton onClick={() => window.location.reload()}>
                    다시 시도
                  </RetryButton>
                </MapErrorMessage>
              )}
            </MapWrapper>
            <LocationInfo>
              <InfoItem>
                <InfoLabel>{t('about.location.address')}:</InfoLabel>
                <InfoText>부산광역시 부산진구 부전동 112-3</InfoText>
              </InfoItem>
              <InfoItem>
                <InfoLabel>{t('about.location.tel')}:</InfoLabel>
                <InfoText>051-123-4567</InfoText>
              </InfoItem>
              <InfoItem>
                <InfoLabel>{t('about.location.email')}:</InfoLabel>
                <InfoText>contact@mugp.com</InfoText>
              </InfoItem>
            </LocationInfo>
          </MapContainer>
        </Section>
      </motion.div>
    </Container>
  );
};

// 스타일 컴포넌트 정의
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 80px 20px;
`;

const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto 80px;
  padding: 0 20px;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
  color: #1a1a1a;
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #666666;
  text-align: center;
  margin-bottom: 60px;
`;

const MapContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 400px;
  position: relative;
`;

const MapErrorMessage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #666666;
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const RetryButton = styled.button`
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #1a1a1a;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #333333;
  }
`;

const LocationInfo = styled.div`
  padding: 30px;
  background: #ffffff;
`;

const InfoItem = styled.div`
  margin-bottom: 15px;
  display: flex;
  align-items: center;

  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoLabel = styled.span`
  font-weight: 600;
  color: #1a1a1a;
  min-width: 100px;
`;

const InfoText = styled.span`
  color: #666666;
`;

export default About;
