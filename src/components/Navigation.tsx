import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { TFunction } from 'i18next';
import type { Language, MenuType } from '../types/common.types';

interface NavigationProps {
  currentLanguage: Language;
  currentMenu: MenuType | null;
  onLanguageChange: (language: Language) => void;
  onMenuChange: (menu: MenuType) => void;
  t: TFunction;
}

const Navigation: React.FC<NavigationProps> = ({
  currentLanguage,
  currentMenu,
  onLanguageChange,
  onMenuChange,
  t
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/mugp' || location.pathname === '/mugp/';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isArtistDropdownOpen, setIsArtistDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      setIsArtistDropdownOpen(false);
    }
  };

  const toggleArtistDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsArtistDropdownOpen(!isArtistDropdownOpen);
  };

  const handleMenuClick = (menu: MenuType) => {
    if (menu === 'ARTIST') {
      onMenuChange('INFLUENCER');
    } else {
      onMenuChange(menu);
    }
    setIsMenuOpen(false);
    setIsArtistDropdownOpen(false);
  };

  const handleLanguageClick = (language: Language) => {
    onLanguageChange(language);
    setIsMenuOpen(false);
    setIsArtistDropdownOpen(false);
  };

  const isArtistPage = location.pathname.includes('/artist');

  return (
    <Container>
      <NavContent>
        <DesktopMenu>
          <MenuContainer>
            <MenuItem
              isSelected={!isHome && currentMenu === 'ABOUT'}
              onClick={() => handleMenuClick('ABOUT')}
            >
              ABOUT
            </MenuItem>
            <DropdownContainer isActive={isArtistPage}>
              <DropdownTrigger 
                isSelected={currentMenu === 'ARTIST' || isArtistPage}
                onClick={() => handleMenuClick('ARTIST')}
              >
                ARTIST
              </DropdownTrigger>
              <DropdownContent>
                <DropdownItem 
                  isSelected={currentMenu === 'INFLUENCER'}
                  onClick={() => handleMenuClick('INFLUENCER')}
                >
                  INFLUENCER
                </DropdownItem>
                <DropdownItem 
                  isSelected={currentMenu === 'MC'}
                  onClick={() => handleMenuClick('MC')}
                >
                  MC(ANNOUNCER)
                </DropdownItem>
                <DropdownItem 
                  isSelected={currentMenu === 'CREATOR'}
                  onClick={() => handleMenuClick('CREATOR')}
                >
                  CREATOR
                </DropdownItem>
              </DropdownContent>
            </DropdownContainer>
            <MenuItem
              isSelected={!isHome && currentMenu === 'CALENDAR'}
              onClick={() => handleMenuClick('CALENDAR')}
            >
              CALENDAR
            </MenuItem>
            <MenuItem
              isSelected={!isHome && currentMenu === 'APPLY'}
              onClick={() => handleMenuClick('APPLY')}
            >
              APPLY
            </MenuItem>
          </MenuContainer>
          <LanguageContainer>
            <LanguageButton
              isSelected={currentLanguage === 'kr'}
              onClick={() => handleLanguageClick('kr')}
            >
              KR
            </LanguageButton>
            <LanguageButton
              isSelected={currentLanguage === 'en'}
              onClick={() => handleLanguageClick('en')}
            >
              EN
            </LanguageButton>
            <LanguageButton
              isSelected={currentLanguage === 'ja'}
              onClick={() => handleLanguageClick('ja')}
            >
              JP
            </LanguageButton>
            <LanguageButton
              isSelected={currentLanguage === 'zh'}
              onClick={() => handleLanguageClick('zh')}
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
              <MobileMenuItemWithDropdown>
                <MobileDropdownTrigger 
                  isSelected={currentMenu === 'ARTIST' || isArtistPage}
                  isOpen={isArtistDropdownOpen}
                  onClick={toggleArtistDropdown}
                >
                  ARTIST
                </MobileDropdownTrigger>
                <MobileDropdownContent isOpen={isArtistDropdownOpen}>
                  <MobileDropdownItem 
                    isSelected={currentMenu === 'INFLUENCER'}
                    onClick={() => handleMenuClick('INFLUENCER')}
                  >
                    INFLUENCER
                  </MobileDropdownItem>
                  <MobileDropdownItem 
                    isSelected={currentMenu === 'MC'}
                    onClick={() => handleMenuClick('MC')}
                  >
                    MC(ANNOUNCER)
                  </MobileDropdownItem>
                  <MobileDropdownItem 
                    isSelected={currentMenu === 'CREATOR'}
                    onClick={() => handleMenuClick('CREATOR')}
                  >
                    CREATOR
                  </MobileDropdownItem>
                </MobileDropdownContent>
              </MobileMenuItemWithDropdown>
              <MobileMenuItem
                isSelected={!isHome && currentMenu === 'CALENDAR'}
                onClick={() => handleMenuClick('CALENDAR')}
              >
                CALENDAR
              </MobileMenuItem>
              <MobileMenuItem
                isSelected={!isHome && currentMenu === 'APPLY'}
                onClick={() => handleMenuClick('APPLY')}
              >
                APPLY
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
  border-bottom: 1px solid #eaeaea;
  position: relative;
  z-index: 1000;

  @media (max-width: 768px) {
    padding: 15px 20px;
  }
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DesktopMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuContainer = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
`;

const MenuItem = styled.button<{ isSelected: boolean }>`
  font-size: 1.1rem;
  font-weight: 400;
  color: ${props => props.isSelected ? '#000' : '#666'};
  cursor: pointer;
  padding: 8px 16px;
  transition: all 0.3s ease;
  background: none;
  border: none;
  outline: none;

  &:hover {
    color: #000;
  }
`;

const DropdownContainer = styled.div<{ isActive: boolean }>`
  position: relative;
  display: inline-block;

  &:hover > div {
    display: block;
  }
`;

const DropdownTrigger = styled.button<{ isSelected: boolean }>`
  font-size: 1.1rem;
  font-weight: 400;
  color: ${props => props.isSelected ? '#000' : '#666'};
  cursor: pointer;
  padding: 8px 16px;
  transition: all 0.3s ease;
  background: none;
  border: none;
  outline: none;

  &:hover {
    color: #000;
  }
`;

const DropdownContent = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 160px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  display: none;
  z-index: 1;
`;

const DropdownItem = styled.button<{ isSelected: boolean }>`
  width: 100%;
  padding: 10px 16px;
  text-align: left;
  font-size: 1rem;
  color: ${props => props.isSelected ? '#000' : '#666'};
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #000;
    background-color: #f5f5f5;
  }
`;

const MobileMenu = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenuItemWithDropdown = styled.div`
  width: 100%;
`;

const MobileDropdownTrigger = styled.button<{ isSelected: boolean, isOpen?: boolean }>`
  width: 100%;
  text-align: center;
  font-size: 1.2rem;
  padding: 15px;
  background: none;
  border: none;
  color: ${props => props.isSelected ? '#000' : '#666'};
  position: relative;
  transition: all 0.3s ease;

  &:after {
    content: '';
    position: absolute;
    right: 20px;
    top: 50%;
    width: 8px;
    height: 8px;
    border-right: 2px solid #666;
    border-bottom: 2px solid #666;
    transform: translateY(-50%) ${props => props.isOpen ? 'rotate(-135deg)' : 'rotate(45deg)'};
    transition: transform 0.3s ease;
  }

  &:hover {
    color: #000;
    background-color: #f8f9fa;

    &:after {
      border-color: #000;
    }
  }
`;

const MobileDropdownContent = styled.div<{ isOpen: boolean }>`
  width: 100%;
  background-color: #f9f9f9;
  overflow: hidden;
  max-height: ${props => props.isOpen ? '300px' : '0'};
  transition: max-height 0.3s ease;
`;

const MobileDropdownItem = styled.button<{ isSelected: boolean }>`
  width: 100%;
  text-align: center;
  font-size: 1.1rem;
  padding: 12px;
  background: none;
  border: none;
  color: ${props => props.isSelected ? '#000' : '#666'};
  transition: all 0.3s ease;

  &:hover {
    color: #000;
    background-color: #f0f0f0;
  }
`;

const MobileMenuItem = styled.button<{ isSelected: boolean }>`
  font-size: 1.2rem;
  padding: 15px;
  width: 100%;
  text-align: center;
  background: none;
  border: none;
  color: ${props => props.isSelected ? '#000' : '#666'};
  transition: all 0.3s ease;

  &:hover {
    color: #000;
    background-color: #f8f9fa;
  }
`;

const LanguageContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const MobileLanguageContainer = styled(LanguageContainer)`
  margin-top: 40px;
  justify-content: center;
`;

const LanguageButton = styled.button<{ isSelected: boolean }>`
  background: none;
  border: none;
  font-size: 0.9rem;
  font-weight: ${({ isSelected }) => (isSelected ? '600' : '400')};
  color: ${({ isSelected }) => (isSelected ? '#000' : '#666')};
  cursor: pointer;
  padding: 4px 8px;
  transition: all 0.3s ease;

  &:hover {
    color: #000;
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
  width: 100%;
  padding: 20px;
`;

export default Navigation;
