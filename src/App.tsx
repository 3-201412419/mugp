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
import ArtistDetail from './pages/ArtistDetail';
import Audition from './pages/Audition';
import News from './pages/News';
import Calendar from './pages/Calendar';
import Apply from './pages/Apply';
import Terms from './pages/Terms';

import type { Language, MenuType } from './types/common.types';

const DEFAULT_MENU: MenuType = 'ABOUT';

const AppContent = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState<Language>('kr');
  const [currentMenu, setCurrentMenu] = useState<MenuType | null>(DEFAULT_MENU);

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
    i18n.changeLanguage(language);
    document.documentElement.lang = language;
  };

  const handleMenuChange = (menu: MenuType) => {
    setCurrentMenu(menu);
    switch (menu) {
      case 'ABOUT':
        navigate('/about');
        break;
      case 'ARTIST':
      case 'INFLUENCER':
        navigate('/artist/influencer');
        break;
      case 'MC':
        navigate('/artist/mc');
        break;
      case 'CREATOR':
        navigate('/artist/creator');
        break;
      case 'CALENDAR':
        navigate('/calendar');
        break;
      case 'APPLY':
        navigate('/apply');
        break;
    }
  };

  const handleLogoClick = () => {
    setCurrentMenu(null);
    navigate('/');
  };

  return (
    <Container>
      <Header onLogoClick={handleLogoClick} />
      <Navigation 
        currentMenu={currentMenu} 
        onMenuChange={handleMenuChange}
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        t={t}
      />
      <MainContent>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/artist/:category" element={<Artist />} />
          <Route path="/artist/:category/:name" element={<ArtistDetail />} />
          <Route path="/audition" element={<Audition />} />
          <Route path="/news" element={<News />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </MainContent>
      <Footer />
    </Container>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<AppContent />} />
      </Routes>
    </Router>
  );
};

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
`;

export default App;