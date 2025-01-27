import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <FooterContainer>
      <FooterContent>
        <CompanyInfo>
          <Logo>MUGP Entertainment</Logo>
          <Address>{t('footer.address')}</Address>
          <Contact>
            <ContactItem>Tel: 070-8095-2423</ContactItem>
            <ContactItem>Email: biz@mugp.kr</ContactItem>
          </Contact>
        </CompanyInfo>
        
        <FooterLinks>
          <LinkColumn>
            <LinkTitle>ABOUT</LinkTitle>
            <LinkItem href="/mugp/about">회사소개</LinkItem>
          </LinkColumn>
          
          <LinkColumn>
            <LinkTitle>ARTIST</LinkTitle>
            <LinkItem href="/mugp/artist/influencer">INFLUENCER</LinkItem>
            <LinkItem href="/mugp/artist/mc">MC(ANNOUNCER)</LinkItem>
            <LinkItem href="/mugp/artist/creator">CREATOR</LinkItem>
          </LinkColumn>

          <LinkColumn>
            <LinkTitle>OTHER</LinkTitle>
            <LinkItem href="/mugp/calendar">CALENDAR</LinkItem>
            <LinkItem href="/mugp/apply">APPLY</LinkItem>
          </LinkColumn>
          
          <LinkColumn>
            <LinkTitle>SOCIAL</LinkTitle>
            <LinkItem href="https://www.instagram.com/mugp_ofcl/" target="_blank">Instagram</LinkItem>
          </LinkColumn>
        </FooterLinks>
      </FooterContent>
      
      <Copyright>
        <CopyrightText>
          {new Date().getFullYear()} MUGP Entertainment. {t('footer.rights')}
        </CopyrightText>
        <PrivacyLinks>
          <PrivacyLink href="/privacy">{t('footer.privacy')}</PrivacyLink>
          <PrivacyLink href="/terms">{t('footer.terms')}</PrivacyLink>
        </PrivacyLinks>
      </Copyright>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background-color: #1a1a1a;
  color: #ffffff;
  padding: 60px 0 20px;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  gap: 40px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CompanyInfo = styled.div`
  flex: 1;
`;

const Logo = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 20px;
`;

const Address = styled.p`
  color: #999;
  margin-bottom: 15px;
  font-size: 0.9rem;
  line-height: 1.6;
`;

const Contact = styled.div`
  margin-bottom: 20px;
`;

const ContactItem = styled.p`
  color: #999;
  font-size: 0.9rem;
  margin-bottom: 5px;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 60px;
  
  @media (max-width: 768px) {
    gap: 30px;
    flex-wrap: wrap;
  }
`;

const LinkColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const LinkTitle = styled.h3`
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 15px;
`;

const LinkItem = styled.a`
  color: #999;
  text-decoration: none;
  font-size: 0.9rem;
  margin-bottom: 10px;
  transition: color 0.2s ease;
  
  &:hover {
    color: #ffffff;
  }
`;

const Copyright = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  border-top: 1px solid #333;
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const CopyrightText = styled.p`
  color: #666;
  font-size: 0.8rem;
`;

const PrivacyLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const PrivacyLink = styled.a`
  color: #666;
  text-decoration: none;
  font-size: 0.8rem;
  transition: color 0.2s ease;
  
  &:hover {
    color: #999;
  }
`;

export default Footer;
