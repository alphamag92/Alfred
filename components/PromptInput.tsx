/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useState } from 'react';
import { ImagePlus, Paperclip, X, FileText } from 'lucide-react';
import { AttachedImage, AttachedDocument } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

const ACCEPTED_DOC_TYPES = '.json,.md,.txt,.csv,.pdf,.html,.xml,.yaml,.yml,.log,.tsv,.rtf';
const ACCEPTED_DOC_MIMES = [
  'application/json',
  'text/markdown',
  'text/plain',
  'text/csv',
  'application/pdf',
  'text/html',
  'application/xml',
  'text/xml',
  'application/x-yaml',
  'text/yaml',
  'text/tab-separated-values',
  'application/rtf',
];

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: () => void;
  onAnalyze: () => void;
  isLoading: boolean;
  isGenerating: boolean;
  isFirstRun: boolean;
  mode: 'image' | 'story' | 'video' | 'prompt' | 'localize';
  setMode: (mode: 'image' | 'story' | 'video' | 'prompt' | 'localize') => void;
  attachedImage: AttachedImage | null;
  setAttachedImage: (image: AttachedImage | null) => void;
  attachedDocuments: AttachedDocument[];
  setAttachedDocuments: (docs: AttachedDocument[]) => void;
}

const PromptInput: React.FC<PromptInputProps> = ({
  prompt,
  setPrompt,
  onSubmit,
  onAnalyze,
  isLoading,
  isGenerating,
  isFirstRun,
  mode,
  setMode,
  attachedImage,
  setAttachedImage,
  attachedDocuments,
  setAttachedDocuments
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const data = base64String.split(',')[1];
      setAttachedImage({
        data,
        mimeType: file.type
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newDocs: AttachedDocument[] = [];
    let loaded = 0;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const data = base64String.split(',')[1];
        newDocs.push({
          data,
          mimeType: file.type || 'application/octet-stream',
          fileName: file.name
        });
        loaded++;
        if (loaded === files.length) {
          setAttachedDocuments([...attachedDocuments, ...newDocs]);
        }
      };
      reader.readAsDataURL(file);
    });

    // Reset input so the same file can be re-selected
    if (docInputRef.current) docInputRef.current.value = '';
  };

  const removeDocument = (index: number) => {
    setAttachedDocuments(attachedDocuments.filter((_, i) => i !== index));
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType === 'application/pdf') return 'PDF';
    if (mimeType === 'application/json') return 'JSON';
    if (mimeType === 'text/markdown') return 'MD';
    if (mimeType === 'text/csv') return 'CSV';
    if (mimeType === 'text/html') return 'HTML';
    if (mimeType.includes('xml')) return 'XML';
    if (mimeType.includes('yaml')) return 'YAML';
    return 'TXT';
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden flex flex-col transition-colors duration-200">
      <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 flex justify-between items-center">
        <h2 className="text-base md:text-lg font-semibold text-zinc-800 dark:text-zinc-100 tracking-tight">{t.prompt}</h2>
      </div>

      <div className="p-3 md:p-5 flex flex-col gap-3 md:gap-4">
        <div
          className={`w-full relative ${isLoading ? 'cursor-not-allowed' : ''}`}
          title={isLoading ? t.inputDisabledWhileProcessing : ""}
        >
            <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={t.promptPlaceholder}
            className="w-full h-20 md:h-28 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:border-zinc-900 dark:focus:border-zinc-100 focus:outline-none resize-none text-sm md:text-base leading-relaxed shadow-inner transition-all disabled:opacity-50 disabled:pointer-events-none"
            disabled={isLoading}
            />

            <div className="absolute bottom-2 right-2 flex gap-2">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageUpload}
                disabled={isLoading}
              />
              <input
                type="file"
                accept={ACCEPTED_DOC_TYPES}
                className="hidden"
                ref={docInputRef}
                onChange={handleDocumentUpload}
                disabled={isLoading}
                multiple
              />
              <button
                onClick={() => docInputRef.current?.click()}
                disabled={isLoading}
                className="p-2 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700 transition-colors disabled:opacity-50 min-h-[44px] min-w-[44px] flex items-center justify-center"
                title={t.attachDocument}
              >
                <Paperclip size={20} />
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
                className="p-2 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700 transition-colors disabled:opacity-50 min-h-[44px] min-w-[44px] flex items-center justify-center"
                title={t.attachImage}
              >
                <ImagePlus size={20} />
              </button>
            </div>
        </div>

        {/* Attached Image Preview */}
        {attachedImage && (
          <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-950 p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 w-max">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700">
              <img
                src={`data:${attachedImage.mimeType};base64,${attachedImage.data}`}
                alt="Attached preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{t.imageAttached}</span>
              <button
                onClick={() => setAttachedImage(null)}
                disabled={isLoading}
                className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1 mt-0.5 disabled:opacity-50"
              >
                <X size={12} /> {t.remove}
              </button>
            </div>
          </div>
        )}

        {/* Attached Documents Preview */}
        {attachedDocuments.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {attachedDocuments.map((doc, index) => (
              <div key={index} className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-950 p-2 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">{getFileIcon(doc.mimeType)}</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 truncate max-w-[120px]" title={doc.fileName}>{doc.fileName}</span>
                  <button
                    onClick={() => removeDocument(index)}
                    disabled={isLoading}
                    className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1 mt-0.5 disabled:opacity-50"
                  >
                    <X size={12} /> {t.remove}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <div
                className={`flex bg-zinc-100 dark:bg-zinc-800/50 p-1 rounded-xl transition-colors overflow-x-auto max-w-full ${isLoading ? 'cursor-not-allowed opacity-75' : ''}`}
                title={isLoading ? t.modeDisabledWhileProcessing : ""}
            >
                <button
                    onClick={() => setMode('image')}
                    disabled={isLoading}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all text-xs md:text-sm font-medium disabled:pointer-events-none whitespace-nowrap min-h-[44px] ${
                        mode === 'image'
                        ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-600'
                        : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50'
                    }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{t.image}</span>
                </button>
                <button
                    onClick={() => setMode('story')}
                    disabled={isLoading}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all text-xs md:text-sm font-medium disabled:pointer-events-none whitespace-nowrap min-h-[44px] ${
                        mode === 'story'
                        ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-600'
                        : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50'
                    }`}
                >
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span>{t.story}</span>
                </button>
                 <button
                    onClick={() => setMode('video')}
                    disabled={isLoading}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all text-xs md:text-sm font-medium disabled:pointer-events-none whitespace-nowrap min-h-[44px] ${
                        mode === 'video'
                        ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-600'
                        : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50'
                    }`}
                >
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                     </svg>
                    <span>{t.video}</span>
                </button>
                <button
                    onClick={() => setMode('prompt')}
                    disabled={isLoading}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all text-xs md:text-sm font-medium disabled:pointer-events-none whitespace-nowrap min-h-[44px] ${
                        mode === 'prompt'
                        ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-600'
                        : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50'
                    }`}
                >
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                     </svg>
                    <span>{t.promptCreator}</span>
                </button>
            </div>

            <div
                className={`flex gap-2 ${isLoading || !prompt ? "cursor-not-allowed" : ""}`}
                title={isLoading ? t.waitForCurrentOp : (!prompt ? t.enterPromptFirst : "")}
            >
                <button
                onClick={(e) => {
                    e.preventDefault();
                    onAnalyze();
                }}
                disabled={isLoading || !prompt}
                className="bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 disabled:bg-zinc-50 dark:disabled:bg-zinc-900 disabled:text-zinc-400 text-zinc-800 dark:text-zinc-200 font-semibold py-2.5 md:py-2 px-3 md:px-4 rounded-xl flex items-center justify-center transition-all shadow-sm text-sm md:text-base disabled:pointer-events-none border border-zinc-200 dark:border-zinc-700 min-h-[44px]"
                >
                    <span>{t.analyzePrompt}</span>
                </button>

                <button
                onClick={(e) => {
                    e.preventDefault();
                    onSubmit();
                }}
                disabled={isLoading || !prompt}
                className="bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white disabled:bg-zinc-200 dark:disabled:bg-zinc-800 disabled:text-zinc-400 dark:disabled:text-zinc-600 disabled:pointer-events-none text-white dark:text-zinc-900 font-semibold py-2.5 md:py-2 px-4 md:px-6 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0 text-sm md:text-base min-h-[44px]"
                >
                {isGenerating && (
                    <svg className="animate-spin h-4 w-4 md:h-5 md:w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                )}
                <span>{isFirstRun ? t.generate : t.regenerate}</span>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PromptInput;
