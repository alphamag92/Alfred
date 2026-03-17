/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useMemo } from 'react';
import { Clarification } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface ClarificationCardProps {
  clarifications: Clarification[];
  onRefresh: () => void;
  isLoading: boolean;
  pendingAnswers: {[key: string]: string};
  setPendingAnswers: React.Dispatch<React.SetStateAction<{[key: string]: string}>>;
  prompt?: string;
}

// --- Thinking Process Component ---
const ThinkingProcess = ({ prompt = "" }: { prompt: string }) => {
    const { t } = useLanguage();
    const [step, setStep] = useState(0);

    const steps = useMemo(() => {
        const baseSteps = [...t.thinkingSteps];

        if (prompt && prompt.length > 0) {
            const lowerPrompt = prompt.toLowerCase();
            if (lowerPrompt.includes("image") || lowerPrompt.includes("picture") || lowerPrompt.includes("scene") || lowerPrompt.includes("immagine") || lowerPrompt.includes("foto")) {
                 baseSteps.splice(1, 0, t.thinkingVisual);
            }
            if (lowerPrompt.includes("story") || lowerPrompt.includes("narrative") || lowerPrompt.includes("write") || lowerPrompt.includes("storia") || lowerPrompt.includes("racconto")) {
                 baseSteps.splice(1, 0, t.thinkingNarrative);
            }
            if (lowerPrompt.includes("video") || lowerPrompt.includes("movie") || lowerPrompt.includes("film")) {
                baseSteps.splice(1, 0, t.thinkingTemporal);
            }
        }

        return baseSteps;
    }, [prompt, t]);

    useEffect(() => {
        const interval = setInterval(() => {
            setStep((s) => (s + 1) % steps.length);
        }, 2200);
        return () => clearInterval(interval);
    }, [steps]);

    return (
        <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 animate-pulse min-w-[240px] text-center transition-all duration-300">
            {steps[step]}
        </span>
    );
};

const ClarificationCard: React.FC<ClarificationCardProps> = ({
    clarifications,
    onRefresh,
    isLoading,
    pendingAnswers,
    setPendingAnswers,
    prompt = ""
}) => {
  const { t } = useLanguage();

  const handleSelectOption = (question: string, option: string) => {
      setPendingAnswers(prev => ({ ...prev, [question]: option }));
  };

  const handleCustomAnswerChange = (question: string, value: string) => {
      setPendingAnswers(prev => {
          const newState = { ...prev, [question]: value };
          if (!value.trim()) delete newState[question];
          return newState;
      });
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 transition-colors duration-200 h-full flex flex-col shadow-sm overflow-hidden relative">

      {isLoading && (
        <div className="absolute inset-0 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-2xl transition-opacity duration-300">
            <div className="flex flex-col items-center p-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-100 dark:border-zinc-800 max-w-sm w-full mx-4">
                <div className="relative mb-4">
                     <svg className="animate-spin h-10 w-10 text-zinc-900 dark:text-zinc-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
                <ThinkingProcess prompt={prompt} />
            </div>
        </div>
      )}

      {/* Content Layer */}
      <div className={`flex flex-col h-full min-h-0 ${isLoading ? 'opacity-30 pointer-events-none' : ''}`}>
        {clarifications.length === 0 && !isLoading ? (
            <div className="flex-grow p-4 flex flex-col">
                <div className="bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-xl flex flex-col items-center justify-center text-center text-zinc-400 dark:text-zinc-500 p-8 flex-grow shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3 text-zinc-300 dark:text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <p className="text-sm font-medium">{t.clarificationPlaceholder}</p>
                </div>
            </div>
        ) : (
            <div className="flex flex-col h-full min-h-0">
                <div className="space-y-6 flex-grow overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700">
                    {isLoading && clarifications.length === 0 ? (
                         [1, 2, 3].map(i => (
                             <div key={i} className="bg-zinc-50 dark:bg-zinc-950/50 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800">
                                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4 mb-3 animate-pulse"></div>
                                <div className="flex gap-2">
                                    <div className="h-8 w-20 bg-zinc-200 dark:bg-zinc-800 rounded-full animate-pulse"></div>
                                    <div className="h-8 w-20 bg-zinc-200 dark:bg-zinc-800 rounded-full animate-pulse"></div>
                                    <div className="h-8 w-20 bg-zinc-200 dark:bg-zinc-800 rounded-full animate-pulse"></div>
                                </div>
                             </div>
                         ))
                    ) : (
                        clarifications.map((item, index) => (
                            <div key={index} className="border-b border-zinc-100 dark:border-zinc-800 pb-4 last:border-0 last:pb-0">
                                <p className="font-medium text-zinc-800 dark:text-zinc-200 mb-2 text-sm">{item.question}</p>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {item.options.map(option => (
                                        <button
                                            key={option}
                                            onClick={() => handleSelectOption(item.question, option)}
                                            disabled={isLoading}
                                            className={`text-xs py-1.5 px-3 rounded-full border transition-colors ${
                                                pendingAnswers[item.question] === option
                                                    ? 'bg-zinc-900 border-zinc-900 text-white dark:bg-zinc-100 dark:border-zinc-100 dark:text-zinc-900 font-medium shadow-sm'
                                                    : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800'
                                            }`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                                <input
                                    type="text"
                                    value={pendingAnswers[item.question] && !item.options.includes(pendingAnswers[item.question]) ? pendingAnswers[item.question] : ''}
                                    onChange={(e) => handleCustomAnswerChange(item.question, e.target.value)}
                                    placeholder={t.orTypeAnswer}
                                    disabled={isLoading}
                                    className="w-full text-xs border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-100 focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 bg-zinc-50 dark:bg-zinc-950/50 focus:bg-white dark:focus:bg-zinc-900 text-zinc-800 dark:text-zinc-200 transition-all"
                                />
                            </div>
                        ))
                    )}
                </div>

                {clarifications.length > 0 && (
                    <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 flex flex-col sm:flex-row justify-between items-center gap-3 flex-shrink-0 z-10">
                        <button
                            onClick={onRefresh}
                            disabled={isLoading}
                            className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200 rounded-xl text-sm font-medium transition-all border border-zinc-200 dark:border-zinc-700 shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            title={t.refreshQuestions}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            {t.refreshQuestions}
                        </button>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400 italic text-center sm:text-right">{t.clickUpdateToApply}</span>
                    </div>
                )}
            </div>
        )}
      </div>
    </div>
  );
};

export default ClarificationCard;
