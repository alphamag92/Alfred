/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../i18n/translations';

type Mode = 'image' | 'story' | 'video' | 'prompt' | 'localize' | 'magicpixels';

interface HeaderProps {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    onSelectKey: () => void;
    apiKeySet: boolean;
    mode: Mode;
    onModeChange: (mode: Mode) => void;
}

type NavItem = 'localize' | 'alfred' | 'magicpixels';

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode, onSelectKey, apiKeySet, mode, onModeChange }) => {
  const { language, setLanguage, t, outputLanguage, setOutputLanguage } = useLanguage();
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setShowLangMenu(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        setShowMobileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeNav: NavItem = mode === 'localize' ? 'localize' : mode === 'magicpixels' ? 'magicpixels' : 'alfred';

  const handleNavClick = (nav: NavItem) => {
    if (nav === 'localize') onModeChange('localize');
    else if (nav === 'magicpixels') onModeChange('magicpixels');
    else onModeChange('image');
  };

  return (
    <header className="bg-white/60 backdrop-blur-xl dark:bg-zinc-950/60 px-3 py-2 sm:px-4 sm:py-2.5 flex items-center gap-2 border-b border-zinc-200/50 dark:border-zinc-700/40 sticky top-0 z-50 transition-colors duration-200">

      {/* Left: logo + title */}
      <div className="flex items-center gap-2 sm:gap-2.5 flex-1 min-w-0">
        <img
          src={`${import.meta.env.BASE_URL}alfred.webp`}
          alt="Alfred Logo"
          className="h-7 w-auto sm:h-8 flex-shrink-0 rounded-lg"
        />
        <div className="hidden sm:flex flex-col leading-tight min-w-0">
          <h1 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">{t.appTitle}</h1>
          <a
            href="https://github.com/alphamag92"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
          >
            © alphamag92
          </a>
        </div>
      </div>

      {/* Center: Navigation */}
      <nav className="flex items-center bg-zinc-100/80 dark:bg-zinc-800/80 rounded-2xl p-1 gap-0.5 backdrop-blur-sm border border-zinc-200/50 dark:border-zinc-700/50 shadow-sm flex-shrink-0">

        {/* Ad Localizer */}
        <button
          onClick={() => handleNavClick('localize')}
          className={`relative flex items-center justify-center gap-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-500
            w-9 h-9 sm:w-auto sm:h-auto
            ${activeNav === 'localize'
              ? 'bg-gradient-to-r from-teal-500/10 to-emerald-500/10 dark:from-teal-500/20 dark:to-emerald-500/20 text-teal-700 dark:text-teal-300 shadow-md scale-[1.02] ring-1 ring-teal-200 dark:ring-teal-700/50'
              : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-white/50 dark:hover:bg-zinc-700/50'
            }`}
          title={t.adLocalizer}
        >
          <Globe className="h-4 w-4 flex-shrink-0" />
          <span className="hidden sm:inline">{t.adLocalizer}</span>
        </button>

        {/* Alfred (center/default) */}
        <button
          onClick={() => handleNavClick('alfred')}
          className={`relative flex items-center justify-center gap-1.5 sm:px-5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-500
            w-9 h-9 sm:w-auto sm:h-auto
            ${activeNav === 'alfred'
              ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 shadow-md scale-[1.02]'
              : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-white/50 dark:hover:bg-zinc-700/50'
            }`}
          title={t.appTitle}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="hidden sm:inline">{t.appTitle}</span>
        </button>

        {/* Magic Pixels */}
        <button
          onClick={() => handleNavClick('magicpixels')}
          className={`relative flex items-center justify-center gap-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-500
            w-9 h-9 sm:w-auto sm:h-auto
            ${activeNav === 'magicpixels'
              ? 'bg-gradient-to-r from-purple-500/10 to-blue-500/10 dark:from-purple-500/20 dark:to-blue-500/20 text-purple-700 dark:text-purple-300 shadow-md scale-[1.02] ring-1 ring-purple-200 dark:ring-purple-700/50'
              : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-white/50 dark:hover:bg-zinc-700/50'
            }`}
          title={t.magicPixels}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <span className="hidden sm:inline">{t.magicPixels}</span>
        </button>
      </nav>

      {/* Right: desktop controls */}
      <div className="hidden sm:flex items-center gap-2 flex-1 justify-end">
        <button
          onClick={onSelectKey}
          className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-colors focus:outline-none focus:ring-2 flex items-center gap-2 min-h-[36px] ${
            apiKeySet
              ? 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500'
              : 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500'
          }`}
          title={t.apiKey}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
          <span>{t.apiKey}</span>
        </button>

        {/* Language Selector — desktop */}
        <div className="relative" ref={langMenuRef}>
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 flex items-center gap-1.5 min-h-[36px] min-w-[36px] justify-center"
            title={t.language}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            <span className="text-xs font-bold uppercase">{language}</span>
          </button>

          {showLangMenu && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl z-[100] overflow-hidden">
              <div className="px-3 pt-3 pb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">{t.language} UI</span>
              </div>
              <div className="px-2 pb-2 flex gap-1">
                {(['en', 'it', 'es'] as Language[]).map(lang => (
                  <button
                    key={lang}
                    onClick={() => { setLanguage(lang); }}
                    className={`flex-1 text-sm py-1.5 px-2 rounded-lg font-medium transition-colors ${
                      language === lang
                        ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }`}
                  >
                    {lang === 'en' ? 'EN' : lang === 'it' ? 'IT' : 'ES'}
                  </button>
                ))}
              </div>
              <div className="border-t border-zinc-100 dark:border-zinc-800" />
              <div className="px-3 pt-3 pb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">{t.outputLanguage}</span>
              </div>
              <div className="px-2 pb-3 flex gap-1 flex-wrap">
                {(['auto', 'en', 'it', 'es'] as const).map(lang => (
                  <button
                    key={lang}
                    onClick={() => { setOutputLanguage(lang); }}
                    className={`flex-1 text-xs py-1.5 px-2 rounded-lg font-medium transition-colors ${
                      outputLanguage === lang
                        ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }`}
                  >
                    {lang === 'auto' ? t.outputLangAuto : lang === 'en' ? t.outputLangEn : lang === 'it' ? t.outputLangIt : t.outputLangEs}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 min-h-[36px] min-w-[36px] flex items-center justify-center"
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

      {/* Right: mobile — single "more" button */}
      <div className="flex sm:hidden items-center flex-1 justify-end" ref={mobileMenuRef}>
        <button
          onClick={() => setShowMobileMenu(v => !v)}
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 ${
            showMobileMenu
              ? 'bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50'
              : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800'
          }`}
          aria-label="More options"
        >
          {/* API key status dot */}
          <span className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
            <span className={`absolute -top-1 -right-1 w-2 h-2 rounded-full border border-white dark:border-zinc-900 ${apiKeySet ? 'bg-green-500' : 'bg-blue-500'}`} />
          </span>
        </button>

        {/* Mobile dropdown panel */}
        {showMobileMenu && (
          <div className="absolute right-3 top-full mt-2 w-64 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-2xl z-[100] overflow-hidden">

            {/* API Key row */}
            <div className="p-3 border-b border-zinc-100 dark:border-zinc-800">
              <button
                onClick={() => { onSelectKey(); setShowMobileMenu(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  apiKeySet
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/40'
                    : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                <span>{apiKeySet ? t.apiKey + ' ✓' : t.apiKey}</span>
              </button>
            </div>

            {/* Dark mode row */}
            <div className="p-3 border-b border-zinc-100 dark:border-zinc-800">
              <button
                onClick={() => { toggleDarkMode(); }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                <span>{isDarkMode ? t.switchToLight : t.switchToDark}</span>
                <div className={`w-9 h-5 rounded-full transition-colors flex items-center px-0.5 ${isDarkMode ? 'bg-zinc-700' : 'bg-zinc-200'}`}>
                  <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform ${isDarkMode ? 'translate-x-4' : 'translate-x-0'}`} />
                </div>
              </button>
            </div>

            {/* UI Language */}
            <div className="px-3 pt-3 pb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">{t.language} UI</span>
            </div>
            <div className="px-3 pb-3 flex gap-1">
              {(['en', 'it', 'es'] as Language[]).map(lang => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`flex-1 text-sm py-2 rounded-lg font-medium transition-colors ${
                    language === lang
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  {lang === 'en' ? 'EN' : lang === 'it' ? 'IT' : 'ES'}
                </button>
              ))}
            </div>

            {/* Output Language */}
            <div className="border-t border-zinc-100 dark:border-zinc-800 px-3 pt-3 pb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">{t.outputLanguage}</span>
            </div>
            <div className="px-3 pb-4 flex gap-1 flex-wrap">
              {(['auto', 'en', 'it', 'es'] as const).map(lang => (
                <button
                  key={lang}
                  onClick={() => setOutputLanguage(lang)}
                  className={`flex-1 text-xs py-2 rounded-lg font-medium transition-colors ${
                    outputLanguage === lang
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  {lang === 'auto' ? t.outputLangAuto : lang === 'en' ? t.outputLangEn : lang === 'it' ? t.outputLangIt : t.outputLangEs}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

    </header>
  );
};

export default Header;
