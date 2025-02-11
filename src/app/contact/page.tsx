'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  Container,
  Content,
  Form,
  FormInput,
  FormTextarea,
  SubmitButton,
  Label,
  BackgroundText
} from './styles';

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
      <BackgroundText>{t('contact.title').toUpperCase()}.</BackgroundText>
      <Content>
        <Form onSubmit={handleSubmit}>
          <div>
            <Label>{t('contact.form.name').toUpperCase()}</Label>
            <FormInput 
              type="text" 
              placeholder={t('contact.form.name').toUpperCase()} 
              required 
            />
          </div>
          <div>
            <Label>{t('contact.form.email').toUpperCase()}</Label>
            <FormInput 
              type="email" 
              placeholder={t('contact.form.email').toUpperCase()} 
              required 
            />
          </div>
          <div>
            <Label>{t('contact.info.phone').toUpperCase()}</Label>
            <FormInput 
              type="tel" 
              placeholder={t('contact.info.phone').toUpperCase()} 
            />
          </div>
          <div>
            <Label>COMPANY</Label>
            <FormInput 
              type="text" 
              placeholder={t('contact.info.company').toUpperCase()} 
            />
          </div>
          <div>
            <Label>{t('contact.form.message').toUpperCase()}</Label>
            <FormTextarea 
              placeholder={t('contact.form.message').toUpperCase()} 
              required 
            />
          </div>
          <SubmitButton type="submit" disabled={isSubmitting}>
            {t('contact.form.send').toUpperCase()} <span>:)</span> {t('contact.form.click_to_send').toUpperCase()}
          </SubmitButton>
        </Form>
      </Content>
    </Container>
  );
};

export default Contact;
