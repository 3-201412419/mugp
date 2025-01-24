import React, { useState } from 'react';
import styled from 'styled-components';

interface FormData {
  name: string;
  email: string;
  phone: string;
  category: string;
  message: string;
  portfolio: File | null;
}

const ApplyPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    category: 'influencer',
    message: '',
    portfolio: null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        portfolio: e.target.files![0]
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API 연동
    console.log('Form submitted:', formData);
    alert('지원서가 제출되었습니다.');
  };

  return (
    <Container>
      <Title>APPLY</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">이름</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">이메일</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="phone">연락처</Label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="category">지원 분야</Label>
          <Select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="influencer">인플루언서</option>
            <option value="creator">크리에이터</option>
            <option value="mc">MC/아나운서</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="message">자기소개</Label>
          <TextArea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={5}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="portfolio">포트폴리오</Label>
          <FileInput
            type="file"
            id="portfolio"
            name="portfolio"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
          />
          <FileDescription>PDF, DOC, DOCX 파일만 업로드 가능합니다.</FileDescription>
        </FormGroup>

        <SubmitButton type="submit">지원하기</SubmitButton>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  padding: 40px;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
`;

const Form = styled.form`
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #666;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #666;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #666;
  }
`;

const FileInput = styled.input`
  width: 100%;
  padding: 10px 0;
`;

const FileDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-top: 4px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #333;
  }
`;

export default ApplyPage;
