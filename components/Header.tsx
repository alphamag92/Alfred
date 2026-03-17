/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

interface HeaderProps {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    onShowInfo: () => void;
    onSelectKey: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode, onShowInfo, onSelectKey }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md dark:bg-zinc-950/80 p-4 flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-50 transition-colors duration-200">
      <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">Proactive Co-Creator</h1>
      <div className="flex items-center gap-2">
        <button
          onClick={onSelectKey}
          className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
          title="Login to Google to select API Key"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
          </svg>
          API Key
        </button>
        <button
          onClick={onShowInfo}
          className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
          title="About & Feedback"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
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
