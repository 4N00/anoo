import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import enTranslations from '../translations/en.json';
import nlTranslations from '../translations/nl.json';

type Language = 'EN' | 'NL';
type TranslationKey = string;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const translations = {
  EN: enTranslations,
  NL: nlTranslations,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getStoredLanguage = (): Language | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('language') as Language;
};

const setStoredLanguage = (lang: Language): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('language', lang);
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('EN'); // Set default to English

  // Load saved language preference from localStorage
  useEffect(() => {
    const savedLanguage = getStoredLanguage();
    if (savedLanguage && (savedLanguage === 'EN' || savedLanguage === 'NL')) {
      setLanguage(savedLanguage);
    } else {
      // If no language is saved, set English as default and save it
      setLanguage('EN');
      setStoredLanguage('EN');
    }
  }, []);

  // Save language preference to localStorage
  const handleSetLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
    setStoredLanguage(lang);
  }, []);

  // Translation function that handles nested keys (e.g., "navigation.home")
  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value === undefined) return key;
      value = value[k];
    }
    
    return value || key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 