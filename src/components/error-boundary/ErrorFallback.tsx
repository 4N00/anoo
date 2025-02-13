import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ErrorContainer, Title, Message, Button } from './styles';

const ErrorFallback: React.FC = () => {
  const { t } = useLanguage();

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <ErrorContainer>
      <Title>{t('error.title')}</Title>
      <Message>{t('error.message')}</Message>
      <Button onClick={handleRefresh}>{t('error.refresh')}</Button>
    </ErrorContainer>
  );
};

export default ErrorFallback; 