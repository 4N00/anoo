'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  Container,
  Title,
  Description,
  Section,
  SectionTitle,
  SectionContent,
  List,
  ListItem,
  Highlight,
} from '@/styles/AboutStyles';

export default function About() {
  const { t } = useLanguage();

  const experienceItems = ['experience1', 'experience2', 'experience3'] as const;

  return (
    <Container>
      <Title>{t('about.title')}</Title>
      <Description>{t('about.description')}</Description>

      <Section>
        <SectionTitle>{t('about.skills.title')}</SectionTitle>
        <SectionContent>
          <List>
            <ListItem>
              <Highlight>{t('about.skills.frontend.title')}:</Highlight>
              {t('about.skills.frontend.content')}
            </ListItem>
            <ListItem>
              <Highlight>{t('about.skills.backend.title')}:</Highlight>
              {t('about.skills.backend.content')}
            </ListItem>
            <ListItem>
              <Highlight>{t('about.skills.tools.title')}:</Highlight>
              {t('about.skills.tools.content')}
            </ListItem>
          </List>
        </SectionContent>
      </Section>

      <Section>
        <SectionTitle>{t('about.experience.title')}</SectionTitle>
        <SectionContent>
          <List>
            {experienceItems.map((key) => (
              <ListItem key={key}>{t(`about.experience.items.${key}`)}</ListItem>
            ))}
          </List>
        </SectionContent>
      </Section>
    </Container>
  );
} 