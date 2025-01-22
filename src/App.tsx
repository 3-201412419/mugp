import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import './i18n';

import Header from './components/Header';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Artist from './pages/Artist';
import Audition from './pages/Audition';
import News from './pages/News';

type Language = 'en' | 'zh' | 'ja' | 'kr';
type MenuType = 'ABOUT' | 'ARTIST' | 'AUDITION' | 'NEWS';

const AppContent = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState<Language>('kr');
  const [currentMenu, setCurrentMenu] = useState<MenuType>('ABOUT');

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
    i18n.changeLanguage(language);
  };

  const handleMenuChange = (menu: MenuType) => {
    setCurrentMenu(menu);
    switch (menu) {
      case 'ABOUT':
        navigate('/mugp/about');
        break;
      case 'ARTIST':
        navigate('/mugp/artist');
        break;
      case 'AUDITION':
        navigate('/mugp/audition');
        break;
      case 'NEWS':
        navigate('/mugp/news');
        break;
    }
  };

  const handleLogoClick = () => {
    navigate('/mugp');
    setCurrentMenu('ABOUT' as MenuType); // 메뉴 선택 상태를 초기화
  };

  return (
    <Container>
      <Header onLogoClick={handleLogoClick} />
      <Navigation
        currentLanguage={currentLanguage}
        currentMenu={currentMenu}
        onLanguageChange={handleLanguageChange}
        setCurrentMenu={handleMenuChange}
      />
      <Main>
        <Routes>
          <Route path="/mugp" element={<Home />} />
          <Route path="/mugp/about" element={<About />} />
          <Route path="/mugp/artist" element={<Artist />} />
          <Route path="/mugp/audition" element={<Audition />} />
          <Route path="/mugp/news" element={<News />} />
        </Routes>
      </Main>
      <Footer />
    </Container>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
`;

export default App;