import styled from 'styled-components';
import { motion } from 'framer-motion';
import logoImage from '/public/IMG_7485.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation as SwiperNavigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

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

function App() {
  return (
    <Container>
      <Header>
        <LogoWrapper
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LogoImage src={logoImage} alt="BELIFT LAB" />
        </LogoWrapper>
      </Header>
      <Navigation>
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
      </Navigation>
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
      <Footer>
        <FooterContent>
          <FooterSection>
            <FooterTitle>BELIFT LAB</FooterTitle>
            <FooterText>
              서울특별시 강남구 테헤란로 108길 42
              <br />
              사업자등록번호: 123-45-67890
            </FooterText>
          </FooterSection>
          <FooterSection>
            <FooterTitle>Links</FooterTitle>
            <FooterLinks>
              <FooterLink>개인정보처리방침</FooterLink>
              <FooterLink>이용약관</FooterLink>
              <FooterLink>청소년보호정책</FooterLink>
            </FooterLinks>
          </FooterSection>
          <FooterSection>
            <FooterTitle>Contact</FooterTitle>
            <FooterText>
              Email: contact@beliftlab.com
              <br />
              Tel: 02-1234-5678
            </FooterText>
          </FooterSection>
        </FooterContent>
        <FooterBottom>
          <Copyright> 2024 BELIFT LAB. All rights reserved.</Copyright>
        </FooterBottom>
      </Footer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
  color: #333333;
`;

const Header = styled.header`
  width: 100%;
  padding: 40px 0;
  text-align: center;
  background: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const LogoWrapper = styled(motion.div)`
  display: inline-block;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const LogoImage = styled.img`
  height: 50px;
  width: auto;
`;

const Navigation = styled.nav`
  width: 100%;
  padding: 20px 60px;
  background: #ffffff;
  border-bottom: 1px solid #f0f0f0;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 40px;
  
  @media (max-width: 768px) {
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const NavItem = styled(motion.li)`
  font-size: 16px;
  cursor: pointer;
  position: relative;
  padding-bottom: 5px;
  color: #333333;
  font-weight: 500;
  
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
  
  &:hover {
    color: #000000;
  }
  
  &:hover::after {
    width: 100%;
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const MainContent = styled.main`
  width: 100%;
`;

const HeroSection = styled(motion.div)`
  width: 100%;
  height: 80vh;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    height: 60vh;
  }
`;

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

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0.9));
`;

const Footer = styled.footer`
  background-color: #f8f8f8;
  padding: 60px 0 20px;
  margin-top: 80px;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  padding: 0 20px;
`;

const FooterSection = styled.div`
  margin-bottom: 30px;
`;

const FooterTitle = styled.h4`
  font-size: 18px;
  color: #333;
  margin-bottom: 20px;
  font-weight: 600;
`;

const FooterText = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.8;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

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

const FooterBottom = styled.div`
  border-top: 1px solid #eee;
  margin-top: 40px;
  padding-top: 20px;
  text-align: center;
`;

const Copyright = styled.p`
  font-size: 12px;
  color: #999;
`;

export default App;