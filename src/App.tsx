import styled from 'styled-components';
import { motion } from 'framer-motion';
import logoImage from '/public/IMG_7485.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation as SwiperNavigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';

// 이미지 데이터
const heroImages = [
  {
    url: 'https://images.unsplash.com/photo-1605902394069-ff2ae2430e62?q=80&w=2069&auto=format&fit=crop',
    alt: 'Concert Performance'
  },
  {
    url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop',
    alt: 'Stage Performance'
  },
  {
    url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop',
    alt: 'Concert Lights'
  }
];

// 언어 타입 정의
type Language = 'en' | 'zh' | 'ja' | 'kr';

// 언어 표시 매핑
const languageDisplay = {
  en: 'ENG',
  zh: 'CH',
  ja: 'JP',
  kr: 'KR'
};

// App 컴포넌트
function App() {
  const { t, i18n } = useTranslation();
  // 현재 선택된 언어 상태
  const [currentLanguage, setCurrentLanguage] = useState<Language>('kr');

  // 언어 변경 핸들러
  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
    i18n.changeLanguage(language);
  };

  return (
    <Container>
      {/* 헤더 섹션: 로고 및 브랜드 이미지 */}
      <Header>
        <LogoWrapper
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LogoImage src={logoImage} alt="BELIFT LAB" />
        </LogoWrapper>
      </Header>

      {/* 네비게이션 바: 메인 메뉴 및 언어 선택 */}
      <Navigation>
        {/* 메인 네비게이션 메뉴 */}
        <NavList>
          {['ABOUT', 'ARTIST', 'AUDITION', 'NEWS'].map((item, index) => (
            <NavItem
              key={item}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {item}
            </NavItem>
          ))}
        </NavList>

        {/* 언어 선택 드롭다운 메뉴 */}
        <NavItemWrapper
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <NavItem>{languageDisplay[currentLanguage]}</NavItem>
          <SubMenu>
            <MenuItem onClick={() => handleLanguageChange('kr')}>
              KR
            </MenuItem>
            <MenuItem onClick={() => handleLanguageChange('en')}>
              ENG
            </MenuItem>
            <MenuItem 
              onClick={() => handleLanguageChange('zh')}
              fontFamily="Noto Sans SC"
            >
              CH
            </MenuItem>
            <MenuItem 
              onClick={() => handleLanguageChange('ja')}
              fontFamily="Noto Sans JP"
            >
              JP
            </MenuItem>
          </SubMenu>
        </NavItemWrapper>
      </Navigation>

      {/* 메인 콘텐츠 영역 */}
      <MainContent>
        <HeroSection
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <StyledSwiper
            modules={[Autoplay, Pagination, SwiperNavigation]}
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
                <HeroOverlay />
              </SwiperSlide>
            ))}
          </StyledSwiper>
        </HeroSection>
      </MainContent>

      {/* 푸터 영역 */}
      <Footer>
        <FooterContent>
          <FooterSection>
            <FooterTitle>MUGP</FooterTitle>
            <FooterText>
              {t('footer.address')}
              <br />
              {t('footer.owner')}
            </FooterText>
          </FooterSection>
          <FooterSection>
            <FooterTitle>Links</FooterTitle>
            <FooterLinks>
              <FooterLink>{t('footer.links.privacy')}</FooterLink>
              <FooterLink>{t('footer.links.terms')}</FooterLink>
              <FooterLink>{t('footer.links.youth')}</FooterLink>
            </FooterLinks>
          </FooterSection>
          <FooterSection>
            <FooterTitle>Contact</FooterTitle>
            <FooterText>
              {t('footer.contact.email')}
              <br />
              {t('footer.contact.tel')}
            </FooterText>
          </FooterSection>
        </FooterContent>
        <FooterBottom>
          <Copyright>{t('footer.copyright')}</Copyright>
        </FooterBottom>
      </Footer>
    </Container>
  );
}

// 스타일 컴포넌트 정의
// 컨테이너 스타일링
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
  color: #333333;
`;

// 헤더 스타일링
const Header = styled.header`
  width: 100%;
  padding: 40px 0;
  text-align: center;
  background: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

// 로고 래퍼 스타일링
const LogoWrapper = styled(motion.div)`
  display: inline-block;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

// 로고 이미지 스타일링
const LogoImage = styled.img`
  height: 50px;
  width: auto;
`;

// 네비게이션 바 스타일링
const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #ffffff;
  border-bottom: 1px solid #f0f0f0;

  /* 모바일 화면 대응 */
  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1rem;
  }
`;

// 메인 네비게이션 메뉴 리스트
const NavList = styled.ul`
  display: flex;
  gap: 2rem;
  margin: 0;
  padding: 0;

  /* 모바일에서 간격 조정 및 줄바꿈 허용 */
  @media (max-width: 768px) {
    gap: 1rem;
    flex-wrap: wrap;
  }
`;

// 네비게이션 메뉴 아이템
const NavItem = styled(motion.div)`
  cursor: pointer;
  font-weight: 500;
  position: relative;
  padding-bottom: 5px;
  list-style: none;
  white-space: nowrap;  // 텍스트 줄바꿈 방지

  /* 호버 시 밑줄 애니메이션 효과 */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #000000;
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

// 언어 선택 메뉴 래퍼
const NavItemWrapper = styled(motion.div)`
  position: relative;
  cursor: pointer;
  padding: 0.5rem 0;
  margin-left: 1rem;

  /* 모바일에서 왼쪽 마진 제거 */
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

// 드롭다운 서브메뉴
const SubMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.2s ease;
  z-index: 1000;
  min-width: 120px;
  margin-top: 10px;
  border-radius: 4px;
  overflow: hidden;
  
  /* 호버 시 드롭다운 메뉴 표시 */
  ${NavItemWrapper}:hover & {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  /* 모바일에서 드롭다운 위치 조정 */
  @media (max-width: 768px) {
    right: auto;
    left: 0;
  }
`;

// 드롭다운 메뉴 아이템
const MenuItem = styled.div<{ fontFamily?: string }>`
  padding: 12px 24px;
  font-size: 14px;
  letter-spacing: ${props => props.fontFamily ? '0' : '0.5px'};
  color: #333;
  text-align: left;
  transition: all 0.2s ease;
  font-weight: 400;
  font-family: ${props => props.fontFamily || 'inherit'};
  cursor: pointer;  // 클릭 가능함을 나타내는 커서 추가
  
  &:hover {
    background-color: #f8f8f8;
    color: #000;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #f0f0f0;
  }
`;

// 메인 콘텐츠 영역
const MainContent = styled.main`
  width: 100%;
`;

// 히어로 섹션
const HeroSection = styled(motion.div)`
  width: 100%;
  height: 80vh;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    height: 60vh;
  }
`;

// 스와이퍼 컴포넌트
const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;
  
  .swiper-pagination-bullet {
    background: #ffffff;
  }
  
  .swiper-button-next,
  .swiper-button-prev {
    color: #ffffff;
  }
`;

// 히어로 이미지
const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// 히어로 오버레이
const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0.9));
`;

// 푸터 영역
const Footer = styled.footer`
  background-color: #f8f8f8;
  padding: 60px 0 20px;
  margin-top: 80px;
`;

// 푸터 콘텐츠
const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  padding: 0 20px;
`;

// 푸터 섹션
const FooterSection = styled.div`
  margin-bottom: 30px;
`;

// 푸터 타이틀
const FooterTitle = styled.h4`
  font-size: 18px;
  color: #333;
  margin-bottom: 20px;
  font-weight: 600;
`;

// 푸터 텍스트
const FooterText = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.8;
`;

// 푸터 링크
const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// 푸터 링크 아이템
const FooterLink = styled.a`
  font-size: 14px;
  color: #666;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #000;
  }
`;

// 푸터 바텀
const FooterBottom = styled.div`
  border-top: 1px solid #eee;
  margin-top: 40px;
  padding-top: 20px;
  text-align: center;
`;

// 카피라이트
const Copyright = styled.p`
  font-size: 12px;
  color: #999;
`;

export default App;