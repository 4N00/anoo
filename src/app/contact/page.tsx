'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  Container,
  Content,
  Title,
  Form,
  FormInput,
  FormTextarea,
  SubmitButton,
  Label,
  BackgroundText
} from '../../styles/ContactStyles';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Add form submission logic here
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <Container>
      <BackgroundText>WE CREATE.</BackgroundText>
      <Content>
        <Form onSubmit={handleSubmit}>
          <div>
            <Label>NAME</Label>
            <FormInput 
              type="text" 
              placeholder="PLEASE ENTER YOUR NAME" 
              required 
            />
          </div>
          <div>
            <Label>EMAIL</Label>
            <FormInput 
              type="email" 
              placeholder="PLEASE ENTER YOUR EMAIL" 
              required 
            />
          </div>
          <div>
            <Label>PHONE</Label>
            <FormInput 
              type="tel" 
              placeholder="WOULD YOU LIKE TO ADD A PHONE NUMBER?" 
            />
          </div>
          <div>
            <Label>COMPANY</Label>
            <FormInput 
              type="text" 
              placeholder="WHAT IS THE NAME OF YOUR COMPANY?" 
            />
          </div>
          <div>
            <Label>MESSAGE</Label>
            <FormTextarea 
              placeholder="PLEASE ENTER A MESSAGE HERE" 
              required 
            />
          </div>
          <SubmitButton type="submit" disabled={isSubmitting}>
            SEND YOUR MESSAGE <span>:)</span> CLICK TO SEND
          </SubmitButton>
        </Form>
      </Content>
    </Container>
  );
};

export default Contact;
