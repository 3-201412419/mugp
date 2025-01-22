import styled from 'styled-components';
import { motion } from 'framer-motion';

type Language = 'en' | 'zh' | 'ja' | 'kr';
type MenuType = 'ABOUT' | 'ARTIST' | 'AUDITION' | 'NEWS';

interface NavigationProps {
  currentLanguage: Language;
  currentMenu: MenuType;
  onLanguageChange: (language: Language) => void;
  setCurrentMenu: (menu: MenuType) => void;
}

const Navigation = ({
  currentLanguage,
  currentMenu,
  onLanguageChange,
  setCurrentMenu,
}: NavigationProps) => {
  return (
    <Nav>
      <NavContainer>
        <MenuList>
          <MenuItem
            isActive={currentMenu === 'ABOUT'}
            onClick={() => setCurrentMenu('ABOUT')}
          >
            ABOUT
          </MenuItem>
          <MenuItem
            isActive={currentMenu === 'ARTIST'}
            onClick={() => setCurrentMenu('ARTIST')}
          >
            ARTIST
          </MenuItem>
          <MenuItem
            isActive={currentMenu === 'AUDITION'}
            onClick={() => setCurrentMenu('AUDITION')}
          >
            AUDITION
          </MenuItem>
          <MenuItem
            isActive={currentMenu === 'NEWS'}
            onClick={() => setCurrentMenu('NEWS')}
          >
            NEWS
          </MenuItem>
        </MenuList>

        <LanguageList>
          <LanguageItem
            isActive={currentLanguage === 'kr'}
            onClick={() => onLanguageChange('kr')}
          >
            KR
          </LanguageItem>
          <LanguageItem
            isActive={currentLanguage === 'en'}
            onClick={() => onLanguageChange('en')}
          >
            EN
          </LanguageItem>
          <LanguageItem
            isActive={currentLanguage === 'ja'}
            onClick={() => onLanguageChange('ja')}
          >
            JP
          </LanguageItem>
          <LanguageItem
            isActive={currentLanguage === 'zh'}
            onClick={() => onLanguageChange('zh')}
          >
            CN
          </LanguageItem>
        </LanguageList>
      </NavContainer>
    </Nav>
  );
};

const Nav = styled.nav`
  background-color: #ffffff;
  border-bottom: 1px solid #f0f0f0;
  padding: 15px 0;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MenuList = styled.div`
  display: flex;
  gap: 40px;
`;

interface MenuItemProps {
  isActive: boolean;
}

const MenuItem = styled.button<MenuItemProps>`
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: ${props => props.isActive ? '600' : '400'};
  color: ${props => props.isActive ? '#1a1a1a' : '#666666'};
  cursor: pointer;
  padding: 5px 0;
  position: relative;
  transition: all 0.2s ease;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #1a1a1a;
    transform: scaleX(${props => props.isActive ? 1 : 0});
    transition: transform 0.2s ease;
  }

  &:hover {
    color: #1a1a1a;
    &:after {
      transform: scaleX(1);
    }
  }
`;

const LanguageList = styled.div`
  display: flex;
  gap: 20px;
`;

const LanguageItem = styled.button<MenuItemProps>`
  background: none;
  border: none;
  font-size: 0.9rem;
  font-weight: ${props => props.isActive ? '600' : '400'};
  color: ${props => props.isActive ? '#1a1a1a' : '#666666'};
  cursor: pointer;
  padding: 5px;
  transition: all 0.2s ease;

  &:hover {
    color: #1a1a1a;
  }
`;

export default Navigation;
