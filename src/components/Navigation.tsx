import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

type Language = 'en' | 'zh' | 'ja' | 'kr';
type MenuType = 'ABOUT' | 'ARTIST' | 'AUDITION' | 'NEWS';

interface NavigationProps {
  currentLanguage: Language;
  currentMenu: MenuType;
  onLanguageChange: (language: Language) => void;
  setCurrentMenu: (menu: MenuType) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  currentLanguage,
  currentMenu,
  onLanguageChange,
  setCurrentMenu,
}) => {
  const location = useLocation();
  const isHome = location.pathname === '/mugp' || location.pathname === '/mugp/';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClick = (menu: MenuType) => {
    setCurrentMenu(menu);
    setIsMenuOpen(false);
  };

  const handleLanguageClick = (language: Language) => {
    onLanguageChange(language);
    setIsMenuOpen(false);
  };

  return (
    <Container>
      <NavContent>
        <DesktopMenu>
          <MenuContainer>
            <MenuItem
              isSelected={!isHome && currentMenu === 'ABOUT'}
              onClick={() => setCurrentMenu('ABOUT')}
            >
              ABOUT
            </MenuItem>
            <MenuItem
              isSelected={!isHome && currentMenu === 'ARTIST'}
              onClick={() => setCurrentMenu('ARTIST')}
            >
              ARTIST
            </MenuItem>
            <MenuItem
              isSelected={!isHome && currentMenu === 'AUDITION'}
              onClick={() => setCurrentMenu('AUDITION')}
            >
              AUDITION
            </MenuItem>
            <MenuItem
              isSelected={!isHome && currentMenu === 'NEWS'}
              onClick={() => setCurrentMenu('NEWS')}
            >
              NEWS
            </MenuItem>
          </MenuContainer>
          <LanguageContainer>
            <LanguageButton
              isSelected={currentLanguage === 'kr'}
              onClick={() => onLanguageChange('kr')}
            >
              KR
            </LanguageButton>
            <LanguageButton
              isSelected={currentLanguage === 'en'}
              onClick={() => onLanguageChange('en')}
            >
              EN
            </LanguageButton>
            <LanguageButton
              isSelected={currentLanguage === 'ja'}
              onClick={() => onLanguageChange('ja')}
            >
              JP
            </LanguageButton>
            <LanguageButton
              isSelected={currentLanguage === 'zh'}
              onClick={() => onLanguageChange('zh')}
            >
              CN
            </LanguageButton>
          </LanguageContainer>
        </DesktopMenu>

        <MobileMenu>
          <HamburgerButton onClick={toggleMenu}>
            <HamburgerIcon isOpen={isMenuOpen}>
              <span></span>
              <span></span>
              <span></span>
            </HamburgerIcon>
          </HamburgerButton>

          <MobileMenuContent isOpen={isMenuOpen}>
            <MobileMenuItems>
              <MobileMenuItem
                isSelected={!isHome && currentMenu === 'ABOUT'}
                onClick={() => handleMenuClick('ABOUT')}
              >
                ABOUT
              </MobileMenuItem>
              <MobileMenuItem
                isSelected={!isHome && currentMenu === 'ARTIST'}
                onClick={() => handleMenuClick('ARTIST')}
              >
                ARTIST
              </MobileMenuItem>
              <MobileMenuItem
                isSelected={!isHome && currentMenu === 'AUDITION'}
                onClick={() => handleMenuClick('AUDITION')}
              >
                AUDITION
              </MobileMenuItem>
              <MobileMenuItem
                isSelected={!isHome && currentMenu === 'NEWS'}
                onClick={() => handleMenuClick('NEWS')}
              >
                NEWS
              </MobileMenuItem>
            </MobileMenuItems>

            <MobileLanguageContainer>
              <MobileLanguageButton
                isSelected={currentLanguage === 'kr'}
                onClick={() => handleLanguageClick('kr')}
              >
                KR
              </MobileLanguageButton>
              <MobileLanguageButton
                isSelected={currentLanguage === 'en'}
                onClick={() => handleLanguageClick('en')}
              >
                EN
              </MobileLanguageButton>
              <MobileLanguageButton
                isSelected={currentLanguage === 'ja'}
                onClick={() => handleLanguageClick('ja')}
              >
                JP
              </MobileLanguageButton>
              <MobileLanguageButton
                isSelected={currentLanguage === 'zh'}
                onClick={() => handleLanguageClick('zh')}
              >
                CN
              </MobileLanguageButton>
            </MobileLanguageContainer>
          </MobileMenuContent>
        </MobileMenu>
      </NavContent>
    </Container>
  );
};

const Container = styled.nav`
  width: 100%;
  padding: 20px 40px;
  background-color: transparent;
  position: relative;
  z-index: 1000;

  @media (max-width: 768px) {
    padding: 15px 20px;
    height: 60px;
  }
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
`;

const DesktopMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenu = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MenuContainer = styled.div`
  display: flex;
  gap: 40px;
`;

const MenuItem = styled.button<{ isSelected: boolean }>`
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  padding: 5px 10px;
  color: ${({ isSelected }) => (isSelected ? '#000000' : '#666666')};
  font-weight: ${({ isSelected }) => (isSelected ? '700' : '400')};
  transition: all 0.3s ease;

  &:hover {
    color: #000000;
  }
`;

const MobileMenuItem = styled(MenuItem)`
  font-size: 1.2rem;
  padding: 15px;
  width: 200px;
  text-align: center;
`;

const LanguageContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const MobileLanguageContainer = styled(LanguageContainer)`
  margin-top: 40px;
  justify-content: center;
`;

const LanguageButton = styled.button<{ isSelected: boolean }>`
  background: none;
  border: none;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 5px;
  color: ${({ isSelected }) => (isSelected ? '#000000' : '#666666')};
  font-weight: ${({ isSelected }) => (isSelected ? '700' : '400')};
  transition: all 0.3s ease;

  &:hover {
    color: #000000;
  }
`;

const MobileLanguageButton = styled(LanguageButton)`
  font-size: 1rem;
  padding: 10px;
`;

const HamburgerButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  position: fixed;
  right: 20px;
  top: 20px;
  z-index: 1100;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HamburgerIcon = styled.div<{ isOpen: boolean }>`
  width: 24px;
  height: 20px;
  position: relative;

  span {
    display: block;
    position: absolute;
    height: 2px;
    width: 100%;
    background: #000;
    transition: all 0.3s ease;

    &:first-child {
      top: ${({ isOpen }) => (isOpen ? '9px' : '0')};
      transform: ${({ isOpen }) => (isOpen ? 'rotate(45deg)' : 'none')};
    }

    &:nth-child(2) {
      top: 9px;
      opacity: ${({ isOpen }) => (isOpen ? '0' : '1')};
    }

    &:last-child {
      top: ${({ isOpen }) => (isOpen ? '9px' : '18px')};
      transform: ${({ isOpen }) => (isOpen ? 'rotate(-45deg)' : 'none')};
    }
  }
`;

const MobileMenuContent = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background: rgba(255, 255, 255, 0.98);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '100%')});
  z-index: 1050;
`;

const MobileMenuItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export default Navigation;
