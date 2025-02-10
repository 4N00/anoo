'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import {
  Container,
  Title,
  Description,
  Button,
} from '@/styles/NotFoundStyles';

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <Container>
      <Title>{t('notFound.title')}</Title>
      <Description>{t('notFound.description')}</Description>
      <Link href="/" passHref>
        <Button>{t('notFound.button')}</Button>
      </Link>
    </Container>
  );
}