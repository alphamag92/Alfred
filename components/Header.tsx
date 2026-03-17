/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../i18n/translations';

type Mode = 'image' | 'story' | 'video' | 'prompt' | 'localize';

interface HeaderProps {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    onSelectKey: () => void;
    apiKeySet: boolean;
    mode: Mode;
    onModeChange: (mode: Mode) => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode, onSelectKey, apiKeySet, mode, onModeChange }) => {
  const { language, setLanguage, t, outputLanguage, setOutputLanguage } = useLanguage();
  const [showLangMenu, setShowLangMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowLangMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white/80 backdrop-blur-md dark:bg-zinc-950/80 px-3 py-2.5 sm:p-4 flex items-center border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-50 transition-colors duration-200">
      {/* Left: logo + title */}
      <div className="flex items-center gap-2 sm:gap-2.5 flex-1">
        <img
          src={`${import.meta.env.BASE_URL}alfred.webp`}
          alt="Alfred Logo"
          className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg"
        />
        <h1 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">{t.appTitle}</h1>
      </div>

      {/* Center: Ad Localizer (desktop only) */}
      <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2">
        <button
          onClick={() => onModeChange(mode === 'localize' ? 'image' : 'localize')}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 min-h-[36px] ${
            mode === 'localize'
              ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
          }`}
        >
          <Globe className="h-4 w-4" />
          <span>Ad Localizer</span>
        </button>
      </div>

      {/* Right: controls */}
      <div className="flex items-center gap-1.5 sm:gap-2 flex-1 justify-end">
        {/* Mobile: Ad Localizer icon */}
        <button
          onClick={() => onModeChange(mode === 'localize' ? 'image' : 'localize')}
          className={`sm:hidden p-2.5 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 min-h-[44px] min-w-[44px] flex items-center justify-center ${
            mode === 'localize'
              ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900'
              : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800'
          }`}
          title="Ad Localizer"
        >
          <Globe className="h-5 w-5" />
        </button>
        <button
          onClick={onSelectKey}
          className={`px-2.5 sm:px-3 py-2 sm:py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-colors focus:outline-none focus:ring-2 flex items-center gap-1.5 sm:gap-2 min-h-[44px] ${
            apiKeySet
              ? 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500'
              : 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500'
          }`}
          title={t.apiKey}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
          {t.apiKey}
        </button>

        {/* Language Selector */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="p-2.5 sm:p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 flex items-center gap-1.5 min-h-[44px] min-w-[44px] justify-center"
            title={t.language}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            <span className="text-xs font-bold uppercase">{language}</span>
          </button>

          {showLangMenu && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl z-[100] overflow-hidden">
              {/* UI Language */}
              <div className="px-3 pt-3 pb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">{t.language} UI</span>
              </div>
              <div className="px-2 pb-2 flex gap-1">
                {(['en', 'it'] as Language[]).map(lang => (
                  <button
                    key={lang}
                    onClick={() => { setLanguage(lang); }}
                    className={`flex-1 text-sm py-1.5 px-3 rounded-lg font-medium transition-colors ${
                      language === lang
                        ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }`}
                  >
                    {lang === 'en' ? 'English' : 'Italiano'}
                  </button>
                ))}
              </div>

              <div className="border-t border-zinc-100 dark:border-zinc-800" />

              {/* Output Language */}
              <div className="px-3 pt-3 pb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">{t.outputLanguage}</span>
              </div>
              <div className="px-2 pb-3 flex gap-1">
                {(['auto', 'en', 'it'] as const).map(lang => (
                  <button
                    key={lang}
                    onClick={() => { setOutputLanguage(lang); }}
                    className={`flex-1 text-xs py-1.5 px-2 rounded-lg font-medium transition-colors ${
                      outputLanguage === lang
                        ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }`}
                  >
                    {lang === 'auto' ? t.outputLangAuto : lang === 'en' ? t.outputLangEn : t.outputLangIt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={toggleDarkMode}
          className="p-2.5 sm:p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
          title={isDarkMode ? t.switchToLight : t.switchToDark}
        >
          {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
          ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
