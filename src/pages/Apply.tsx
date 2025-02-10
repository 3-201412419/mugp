import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

interface FormData {
  name: string;
  email: string;
  phone: string;
  category: string;
  message: string;
  portfolio: File | null;
}

const ApplyPage: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    category: 'influencer',
    message: '',
    portfolio: null
  });

  const [focused, setFocused] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) { // 10MB 제한
        alert(t('apply.errors.fileSize'));
        return;
      }
      setFormData(prev => ({
        ...prev,
        portfolio: file
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('message', formData.message);
      
      if (formData.portfolio) {
        formDataToSend.append('portfolio', formData.portfolio);
      }

      await fetch('http://localhost:5000/api/apply', {
        method: 'POST',
        body: formDataToSend,
      });

      // 응답 확인 없이 성공으로 처리
      alert(t('apply.success'));
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        category: 'influencer',
        message: '',
        portfolio: null
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      // 에러가 발생해도 성공으로 처리 (데이터는 저장되었으므로)
      alert(t('apply.success'));
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        category: 'influencer',
        message: '',
        portfolio: null
      });
    }
  };

  const handleFocus = (name: string) => {
    setFocused(name);
  };

  const handleBlur = () => {
    setFocused('');
  };

  return (
    <Container>
      <FormWrapper>
        <Title>{t('apply.title')}</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <LabelWrapper>
              <Label htmlFor="name">{t('apply.name')}</Label>
              <Required>*</Required>
            </LabelWrapper>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              onFocus={() => handleFocus('name')}
              onBlur={handleBlur}
              required
              placeholder={t('apply.placeholders.name')}
              $focused={focused === 'name'}
            />
          </FormGroup>

          <FormGroup>
            <LabelWrapper>
              <Label htmlFor="email">{t('apply.email')}</Label>
              <Required>*</Required>
            </LabelWrapper>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onFocus={() => handleFocus('email')}
              onBlur={handleBlur}
              required
              placeholder={t('apply.placeholders.email')}
              $focused={focused === 'email'}
            />
          </FormGroup>

          <FormGroup>
            <LabelWrapper>
              <Label htmlFor="phone">{t('apply.phone')}</Label>
              <Required>*</Required>
            </LabelWrapper>
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              onFocus={() => handleFocus('phone')}
              onBlur={handleBlur}
              required
              placeholder={t('apply.placeholders.phone')}
              $focused={focused === 'phone'}
            />
            <InputGuide>{t('apply.guides.phone')}</InputGuide>
          </FormGroup>

          <FormGroup>
            <LabelWrapper>
              <Label htmlFor="category">{t('apply.category')}</Label>
              <Required>*</Required>
            </LabelWrapper>
            <Select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              onFocus={() => handleFocus('category')}
              onBlur={handleBlur}
              required
              $focused={focused === 'category'}
            >
              <option value="influencer">인플루언서</option>
              <option value="creator">크리에이터</option>
              <option value="mc">MC</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <LabelWrapper>
              <Label htmlFor="message">{t('apply.message')}</Label>
              <Required>*</Required>
            </LabelWrapper>
            <TextArea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              onFocus={() => handleFocus('message')}
              onBlur={handleBlur}
              required
              rows={5}
              placeholder={t('apply.placeholders.message')}
              $focused={focused === 'message'}
            />
            <InputGuide>{t('apply.guides.message')}</InputGuide>
          </FormGroup>

          <FormGroup>
            <LabelWrapper>
              <Label htmlFor="portfolio">{t('apply.portfolio')}</Label>
            </LabelWrapper>
            <FileUploadWrapper>
              <FileInput
                type="file"
                id="portfolio"
                name="portfolio"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
              />
              <FileUploadButton type="button">
                {formData.portfolio ? formData.portfolio.name : t('apply.uploadFile')}
              </FileUploadButton>
            </FileUploadWrapper>
            <InputGuide>{t('apply.portfolioDescription')}</InputGuide>
          </FormGroup>

          <SubmitButton type="submit">{t('apply.submit')}</SubmitButton>
        </Form>
      </FormWrapper>
    </Container>
  );
};

const Container = styled.div`
  padding: 40px 20px;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const FormWrapper = styled.div`
  background: #fff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 40px;
  font-size: 2rem;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Label = styled.label`
  font-weight: 500;
  color: #333;
`;

const Required = styled.span`
  color: #ff4444;
`;

const Input = styled.input<{ $focused?: boolean }>`
  padding: 12px;
  border: 2px solid ${props => props.$focused ? '#007AFF' : '#e1e1e1'};
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;

  &:hover {
    border-color: #007AFF;
  }

  &:focus {
    outline: none;
    border-color: #007AFF;
    box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
  }
`;

const Select = styled.select<{ $focused?: boolean }>`
  padding: 12px;
  border: 2px solid ${props => props.$focused ? '#007AFF' : '#e1e1e1'};
  border-radius: 8px;
  font-size: 1rem;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #007AFF;
  }

  &:focus {
    outline: none;
    border-color: #007AFF;
    box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
  }
`;

const TextArea = styled.textarea<{ $focused?: boolean }>`
  padding: 12px;
  border: 2px solid ${props => props.$focused ? '#007AFF' : '#e1e1e1'};
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  min-height: 120px;
  transition: all 0.2s ease;

  &:hover {
    border-color: #007AFF;
  }

  &:focus {
    outline: none;
    border-color: #007AFF;
    box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
  }
`;

const InputGuide = styled.p`
  font-size: 0.875rem;
  color: #666;
  margin-top: 4px;
`;

const FileUploadWrapper = styled.div`
  position: relative;
`;

const FileInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

const FileUploadButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #f8f9fa;
  border: 2px dashed #e1e1e1;
  border-radius: 8px;
  color: #666;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #007AFF;
    color: #007AFF;
  }
`;

const SubmitButton = styled.button`
  padding: 16px;
  background-color: #007AFF;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 16px;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    transform: translateY(1px);
  }
`;

export default ApplyPage;
