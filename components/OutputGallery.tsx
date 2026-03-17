/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

const ErrorIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

interface OutputDisplayProps {
  images: string[];
  story: string | null;
  video: string | null;
  generatedPrompt?: string | null;
  mode: 'image' | 'story' | 'video' | 'prompt';
  isLoading: boolean;
  error: string | null;
  isOutdated: boolean;
  requiresApiKey?: boolean;
  onSelectKey?: () => void;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({
    images,
    story,
    video,
    generatedPrompt,
    mode,
    isLoading,
    error,
    isOutdated,
    requiresApiKey,
    onSelectKey
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { t } = useLanguage();

  const placeholderCount = 4;

  const [promptCopied, setPromptCopied] = useState(false);

  const downloadStory = () => {
    if (!story) return;
    const fileName = "generated_story.txt";
    const element = document.createElement("a");
    const file = new Blob([story], {type: 'text/plain'});
    const url = URL.createObjectURL(file);
    element.href = url;
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setTimeout(() => URL.revokeObjectURL(url), 100);
  };

  const copyStory = () => {
      if (!story) return;
      navigator.clipboard.writeText(story);
  };

  const copyPrompt = () => {
      if (!generatedPrompt) return;
      navigator.clipboard.writeText(generatedPrompt);
      setPromptCopied(true);
      setTimeout(() => setPromptCopied(false), 2000);
  };

  const downloadPrompt = () => {
      if (!generatedPrompt) return;
      const element = document.createElement("a");
      const file = new Blob([generatedPrompt], {type: 'text/plain'});
      const url = URL.createObjectURL(file);
      element.href = url;
      element.download = "perfect_prompt.txt";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      setTimeout(() => URL.revokeObjectURL(url), 100);
  };

  const renderImageContent = () => {
      if (isLoading) {
          return Array(placeholderCount).fill(null).map((_, index) => (
              <div key={index} className="aspect-square bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center">
                  <div className="flex flex-col items-center text-zinc-500 dark:text-zinc-400">
                      <svg className="animate-spin h-8 w-8 text-zinc-400 dark:text-zinc-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="mt-2 text-sm">{t.generating}</span>
                  </div>
              </div>
          ));
      }

      if (images.length > 0) {
          const content = images.map((image, index) => (
              <div
                key={index}
                className="aspect-square bg-zinc-100 dark:bg-zinc-800 rounded-xl overflow-hidden relative shadow-sm border border-zinc-200 dark:border-zinc-700 group cursor-zoom-in"
                onClick={() => setSelectedImage(image)}
              >
                  <img src={image} alt={`Generated output ${index + 1}`} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
              </div>
          ));

          while (content.length < 4) {
             content.push(
                 <div key={`missing-${content.length}`} className="aspect-square bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center text-zinc-400">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-1 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                     </svg>
                     <span className="text-xs">{t.generationFailed}</span>
                 </div>
             );
          }
          return content;
      }

      return Array(placeholderCount).fill(null).map((_, index) => (
          <div key={index} className="aspect-square bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-zinc-300 dark:text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
          </div>
      ));
  };

  const renderVideoContent = () => {
    if (isLoading) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-zinc-500 dark:text-zinc-400">
                 <svg className="animate-spin h-8 w-8 text-zinc-400 dark:text-zinc-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="mt-2 text-sm">{t.generatingVideo}</span>
            </div>
        );
    }
    if (video) {
        return (
            <div className="flex flex-col items-center justify-center min-h-full w-full p-4">
                <div className="w-full max-w-sm sm:max-w-lg bg-black rounded-xl overflow-hidden shadow-lg border border-zinc-800 relative group shrink-0">
                     <video controls className="w-full h-auto" src={video}>
                        Your browser does not support the video tag.
                     </video>
                </div>
                <a
                    href={video}
                    download="generated-video.mp4"
                    className="mt-4 text-blue-600 dark:text-blue-400 text-sm hover:underline flex items-center gap-1 shrink-0"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    {t.downloadVideo}
                </a>
            </div>
        )
    }
    return (
        <div className="h-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl flex flex-col items-center justify-center text-center text-zinc-400 dark:text-zinc-500 p-8 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3 text-zinc-300 dark:text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <p className="text-sm font-medium">{t.videoWillAppear}</p>
        </div>
    );
  };

  const renderStoryContent = () => {
      if (isLoading) {
          return (
              <div className="h-full flex flex-col items-center justify-center text-zinc-500 dark:text-zinc-400">
                   <svg className="animate-spin h-8 w-8 text-zinc-400 dark:text-zinc-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="mt-2 text-sm">{t.writingStory}</span>
              </div>
          );
      }
      if(story) {
          return (
              <div className="prose prose-sm dark:prose-invert max-w-none p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl border dark:border-zinc-800">
                  {story.split('\n').map((paragraph, index) => <p key={index} className="text-zinc-800 dark:text-zinc-200">{paragraph}</p>)}
              </div>
          )
      }
      return (
        <div className="h-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl flex flex-col items-center justify-center text-center text-zinc-400 dark:text-zinc-500 p-8 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3 text-zinc-300 dark:text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-sm font-medium">{t.storyWillAppear}</p>
        </div>
      );
  };

  const renderPromptContent = () => {
      if (isLoading) {
          return (
              <div className="h-full flex flex-col items-center justify-center text-zinc-500 dark:text-zinc-400">
                   <svg className="animate-spin h-8 w-8 text-zinc-400 dark:text-zinc-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="mt-2 text-sm">{t.craftingPrompt}</span>
              </div>
          );
      }
      if (generatedPrompt) {
          return (
              <div className="p-4 space-y-4">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-5 relative">
                      <div className="absolute top-3 right-3 flex gap-2">
                          <button
                              onClick={copyPrompt}
                              className="p-2 bg-white/80 dark:bg-zinc-800/80 hover:bg-white dark:hover:bg-zinc-700 rounded-lg shadow-sm border border-blue-200 dark:border-blue-800 transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
                              title={t.copyToClipboard}
                          >
                              {promptCopied ? (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                              ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                  </svg>
                              )}
                          </button>
                          <button
                              onClick={downloadPrompt}
                              className="p-2 bg-white/80 dark:bg-zinc-800/80 hover:bg-white dark:hover:bg-zinc-700 rounded-lg shadow-sm border border-blue-200 dark:border-blue-800 transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
                              title={t.downloadText}
                          >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                          </button>
                      </div>
                      <div className="pr-24">
                          <div className="flex items-center gap-2 mb-3">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                              </svg>
                              <h3 className="font-bold text-blue-800 dark:text-blue-200">{t.perfectPromptTitle}</h3>
                          </div>
                      </div>
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                          {generatedPrompt.split('\n').map((paragraph, index) => (
                              <p key={index} className="text-zinc-800 dark:text-zinc-200 leading-relaxed">{paragraph}</p>
                          ))}
                      </div>
                  </div>
              </div>
          );
      }
      return (
          <div className="h-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl flex flex-col items-center justify-center text-center text-zinc-400 dark:text-zinc-500 p-8 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3 text-zinc-300 dark:text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <p className="text-sm font-medium">{t.promptWillAppear}</p>
          </div>
      );
  };

  const renderError = () => (
      <div className="h-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 rounded-xl flex flex-col items-center justify-center p-4 text-center">
          <ErrorIcon />
          <h3 className="mt-4 font-semibold text-red-800 dark:text-red-200">{t.generationFailed}</h3>
          <p className="mt-1 text-sm text-red-700 dark:text-red-300 max-w-md">{error}</p>
      </div>
  );

  if (requiresApiKey) {
      return (
         <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 h-full border border-zinc-200 dark:border-zinc-800 flex flex-col relative overflow-hidden transition-colors duration-200">
            <div className="flex justify-between items-center mb-4 border-b border-zinc-100 dark:border-zinc-800 pb-2 flex-shrink-0">
                 <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">{t.videoGeneration}</h2>
            </div>
            <div className="h-full bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 rounded-xl flex flex-col items-center justify-center p-8 text-center">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-amber-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11.543 17.543A2 2 0 0110.129 18H9a2 2 0 01-2-2v-1a2 2 0 01.586-1.414l5.223-5.223A2 2 0 0014 9a2 2 0 012-2z" />
                </svg>
                <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 mb-2">{t.billingRequired}</h3>
                <p className="text-zinc-600 dark:text-zinc-300 text-sm max-w-sm mb-6">
                    {t.billingDescription}
                    <br/>
                    <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline mt-2 inline-block">{t.learnBilling}</a>
                </p>
                <button
                    onClick={onSelectKey}
                    className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md flex items-center gap-2 min-h-[48px]"
                >
                    <span>{t.selectApiKey}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </button>
            </div>
         </div>
      );
  }

  return (
    <>
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 h-full border border-zinc-200 dark:border-zinc-800 flex flex-col relative overflow-hidden transition-colors duration-200">
            <div className="flex justify-between items-center mb-4 border-b border-zinc-100 dark:border-zinc-800 pb-2 flex-shrink-0">
                <h2 className="text-lg font-semibold text-zinc-700 dark:text-zinc-200">
                    {mode === 'image' ? t.imageGeneration : (mode === 'video' ? t.videoGeneration : (mode === 'prompt' ? t.promptGeneration : t.creativeWriting))}
                </h2>
                {mode === 'story' && story && !isLoading && (
                    <div className="flex gap-2">
                        <button onClick={copyStory} className="text-zinc-500 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center" title={t.copyToClipboard}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        </button>
                        <button onClick={downloadStory} className="text-zinc-500 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center" title={t.downloadText}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>

            <div className="flex-grow min-h-0 relative">
                {error ? renderError() :
                    mode === 'image' ? (
                        <div className="h-full overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-600">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4">
                                {renderImageContent()}
                            </div>
                        </div>
                    ) : mode === 'video' ? (
                         <div className="h-full overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-600">
                            {renderVideoContent()}
                        </div>
                    ) : mode === 'prompt' ? (
                        <div className="h-full overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-600">
                            {renderPromptContent()}
                        </div>
                    ) : (
                        <div className="h-full overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-600">
                            {renderStoryContent()}
                        </div>
                    )
                }

                {isOutdated && !isLoading && !requiresApiKey && (images.length > 0 || story || video || generatedPrompt) && (
                    <div className="absolute inset-0 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-[2px] flex items-center justify-center z-10 rounded-xl transition-all duration-300 pointer-events-none">
                        <div className="bg-white dark:bg-zinc-800 px-6 py-4 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-600 text-center transform scale-100 pointer-events-auto">
                            <div className="text-amber-500 mb-2 flex justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-zinc-800 dark:text-zinc-100 text-lg">{t.resultsOutdated}</h3>
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">{t.promptChanged}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* Image Modal */}
        {selectedImage && (
            <div className="fixed inset-0 z-[2000] bg-black/90 flex justify-center p-4 backdrop-blur-sm overflow-y-auto" onClick={() => setSelectedImage(null)}>
                <button
                    onClick={() => setSelectedImage(null)}
                    className="fixed top-4 right-4 z-[2010] text-white/80 hover:text-white bg-black/40 hover:bg-black/60 rounded-full p-3 transition-all backdrop-blur-sm min-h-[48px] min-w-[48px] flex items-center justify-center"
                    aria-label="Close Preview"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="min-h-full w-full flex flex-col items-center justify-center pointer-events-none py-8 pb-20" onClick={e => e.stopPropagation()}>
                    <img
                        src={selectedImage}
                        alt="Full view"
                        className="max-w-full max-h-[70vh] md:max-h-[85vh] object-contain rounded-lg shadow-2xl pointer-events-auto"
                    />

                    <div className="mt-4 flex gap-4 pointer-events-auto flex-shrink-0">
                        <a
                            href={selectedImage}
                            download="generated-image.jpg"
                            className="bg-white text-zinc-900 px-6 py-3 rounded-full font-semibold hover:bg-zinc-100 transition-colors flex items-center gap-2 shadow-lg min-h-[48px]"
                        >
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            {t.downloadImage}
                        </a>
                    </div>
                </div>
            </div>
        )}
    </>
  );
};

export default OutputDisplay;
