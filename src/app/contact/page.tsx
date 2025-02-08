'use client';

import { useState } from 'react';
import { Button } from '@/styles/components/Button';
import { StyledInput, StyledTextarea } from '../../components/ui/StyledFormElements';
import { useLanguage } from '@/context/LanguageContext';
import {
  Container,
  Content,
  Header,
  Title,
  Subtitle,
  Form,
  InputGroup,
  ButtonGroup,
  ContactInfo,
  ContactInfoTitle,
  ContactInfoItem,
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
      <Content>
        <Header>
          <Title>{t('contact.title')}</Title>
          <Subtitle>{t('contact.subtitle')}</Subtitle>
        </Header>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <StyledInput 
              type="text" 
              placeholder={t('contact.form.name')} 
              required 
            />
            <StyledInput 
              type="email" 
              placeholder={t('contact.form.email')} 
              required 
            />
          </InputGroup>
          <StyledInput 
            type="text" 
            placeholder="Subject" 
            required 
          />
          <StyledTextarea 
            placeholder={t('contact.form.message')} 
            rows={6} 
            required 
          />
          <ButtonGroup>
            <Button type="submit" $variant="primary" disabled={isSubmitting}>
              {isSubmitting ? '...' : t('contact.form.send')}
            </Button>
          </ButtonGroup>
        </Form>
      </Content>
      <ContactInfo>
        <ContactInfoTitle>{t('contact.info.title')}</ContactInfoTitle>
        <ContactInfoItem>
          <strong>{t('contact.info.email')}</strong>
          <a href="mailto:info@anoo.nl">info@anoo.nl</a>
        </ContactInfoItem>
        <ContactInfoItem>
          <strong>{t('contact.info.phone')}</strong>
          <a href="tel:+31625135338">+31 625 135 338</a>
        </ContactInfoItem>
        <ContactInfoItem>
          <strong>{t('contact.info.location')}</strong>
          Amsterdam, Netherlands
        </ContactInfoItem>
        <ContactInfoItem>
          {t('contact.info.availability')}
        </ContactInfoItem>
      </ContactInfo>
    </Container>
  );
};

export default Contact;
