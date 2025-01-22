import styled from 'styled-components';
import { motion } from 'framer-motion';
import logoImage from '../assets/images/logo.png';

interface HeaderProps {
  onLogoClick: () => void;
}

const Header = ({ onLogoClick }: HeaderProps) => {
  return (
    <HeaderWrapper>
      <HeaderContainer>
        <LogoWrapper
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onClick={onLogoClick}
        >
          <LogoImage src={logoImage} alt="MUGP" />
        </LogoWrapper>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const HeaderContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoWrapper = styled(motion.div)`
  cursor: pointer;
  padding: 10px;
  border-radius: 8px;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const LogoImage = styled.img`
  height: 60px;
  width: auto;
  object-fit: contain;
  
  @media (max-width: 768px) {
    height: 50px;
  }
`;

export default Header;
