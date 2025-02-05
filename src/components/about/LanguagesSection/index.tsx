import React from 'react';
import {
  LanguagesContainer,
  LanguagesTitle,
  LanguagesList,
  LanguageItem,
  LanguageName,
  LanguageLevel
} from './styles';

interface Language {
  name: string;
  level: number;
}

interface LanguagesSectionProps {
  languages: Language[];
  variants?: any;
}

const LanguagesSection: React.FC<LanguagesSectionProps> = ({ languages, variants }) => {
  return (
    <LanguagesContainer variants={variants}>
      <LanguagesTitle>Languages</LanguagesTitle>
      <LanguagesList>
        {languages.map((language) => (
          <LanguageItem key={language.name}>
            <LanguageName>{language.name}</LanguageName>
            <LanguageLevel level={language.level} />
          </LanguageItem>
        ))}
      </LanguagesList>
    </LanguagesContainer>
  );
};

export default LanguagesSection;