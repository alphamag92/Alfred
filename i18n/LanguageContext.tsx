/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Language, Translations, translations } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  outputLanguage: 'auto' | 'en' | 'it' | 'es';
  setOutputLanguage: (lang: 'auto' | 'en' | 'it' | 'es') => void;
  getOutputLanguageInstruction: () => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('ui_language');
    return (saved === 'it' || saved === 'es' ? saved : 'en') as Language;
  });

  const [outputLanguage, setOutputLanguageState] = useState<'auto' | 'en' | 'it' | 'es'>(() => {
    const saved = localStorage.getItem('output_language');
    return (saved === 'en' || saved === 'it' || saved === 'es') ? saved : 'auto';
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('ui_language', lang);
  }, []);

  const setOutputLanguage = useCallback((lang: 'auto' | 'en' | 'it' | 'es') => {
    setOutputLanguageState(lang);
    localStorage.setItem('output_language', lang);
  }, []);

  const getOutputLanguageInstruction = useCallback((): string => {
    const effectiveLang = outputLanguage === 'auto' ? language : outputLanguage;
    if (effectiveLang === 'en') return '\n\nIMPORTANT: Generate all output text (including questions, options, attribute names, entity names, descriptions, and values) in English.';
    if (effectiveLang === 'it') return '\n\nIMPORTANT: Generate all output text (including questions, options, attribute names, entity names, descriptions, and values) in Italian (Italiano).';
    if (effectiveLang === 'es') return '\n\nIMPORTANT: Generate all output text (including questions, options, attribute names, entity names, descriptions, and values) in Spanish (Español).';
    return '';
  }, [outputLanguage, language]);

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, outputLanguage, setOutputLanguage, getOutputLanguageInstruction }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
