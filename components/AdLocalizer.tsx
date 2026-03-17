/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef } from 'react';
import { Upload, X, Globe, Download, RefreshCw, Loader2, ImageIcon } from 'lucide-react';
import { localizeAdImage } from '../services/geminiService';
import { useLanguage } from '../i18n/LanguageContext';

const ASPECT_RATIOS = [
  { label: '16:9', value: '16:9' },
  { label: '1:1', value: '1:1' },
  { label: '9:16', value: '9:16' },
  { label: '4:3', value: '4:3' },
  { label: '3:4', value: '3:4' },
];

const LANGUAGES = [
  'Spanish', 'French', 'German', 'Italian', 'Portuguese',
  'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi',
  'Russian', 'Dutch', 'Turkish', 'Polish', 'Indonesian',
];

const COUNTRIES = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda',
  'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain',
  'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan',
  'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria',
  'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada',
  'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros',
  'Congo', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic',
  'Democratic Republic of the Congo', 'Denmark', 'Djibouti', 'Dominica',
  'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea',
  'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France',
  'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala',
  'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland',
  'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica',
  'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan',
  'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein',
  'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali',
  'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia',
  'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar',
  'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger',
  'Nigeria', 'North Korea', 'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau',
  'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines',
  'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis',
  'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino',
  'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles',
  'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia',
  'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan',
  'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania',
  'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia',
  'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates',
  'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City',
  'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe',
];

interface LocalizeResult {
  market: string;
  loading: boolean;
  image: string | null;
  error: string | null;
}

interface UploadedRef {
  data: string;
  mimeType: string;
}

interface AdLocalizerProps {
  onBack: () => void;
}

const AdLocalizer: React.FC<AdLocalizerProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedMarkets, setSelectedMarkets] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [results, setResults] = useState<LocalizeResult[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadedReference, setUploadedReference] = useState<UploadedRef | null>(null);
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [countrySearch, setCountrySearch] = useState('');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [activeCountryIndex, setActiveCountryIndex] = useState(-1);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      setUploadedReference({ data: base64, mimeType: file.type });
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    if (!uploadedReference) return;
    const allTargets = Array.from(new Set([...selectedMarkets, ...selectedLanguages]));
    if (allTargets.length === 0) return;

    setIsGenerating(true);
    setResults(allTargets.map(m => ({ market: m, loading: true, image: null, error: null })));

    await Promise.all(
      allTargets.map(async (market) => {
        try {
          const image = await localizeAdImage(
            uploadedReference.data,
            uploadedReference.mimeType,
            market,
            aspectRatio
          );
          setResults(prev => prev.map(r =>
            r.market === market
              ? { ...r, loading: false, image, error: image ? null : 'No image returned' }
              : r
          ));
        } catch (err: any) {
          setResults(prev => prev.map(r =>
            r.market === market
              ? { ...r, loading: false, error: err.message || 'Generation failed' }
              : r
          ));
        }
      })
    );

    setIsGenerating(false);
  };

  const handleExportAll = () => {
    results.forEach((res) => {
      if (res.image) {
        const a = document.createElement('a');
        a.href = `data:image/jpeg;base64,${res.image}`;
        a.download = `localized_ad_${res.market.toLowerCase().replace(/\s+/g, '_')}.jpg`;
        a.click();
      }
    });
  };

  const handleDownloadOne = (res: LocalizeResult) => {
    if (!res.image) return;
    const a = document.createElement('a');
    a.href = `data:image/jpeg;base64,${res.image}`;
    a.download = `localized_ad_${res.market.toLowerCase().replace(/\s+/g, '_')}.jpg`;
    a.click();
  };

  const handleReset = () => {
    setSelectedMarkets([]);
    setSelectedLanguages([]);
    setResults([]);
    setUploadedReference(null);
  };

  const filteredCountries = COUNTRIES.filter(
    c => c.toLowerCase().includes(countrySearch.toLowerCase()) && !selectedMarkets.includes(c)
  ).slice(0, 8);

  const canGenerate = !isGenerating && !!uploadedReference && (selectedMarkets.length > 0 || selectedLanguages.length > 0);

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-6 h-full min-h-0">
      {/* Left Column — Controls */}
      <div className="flex flex-col bg-white dark:bg-zinc-900 lg:rounded-xl lg:border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-y-auto">
        <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 transition-colors"
            title={t.backToAlfred}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-base md:text-lg font-semibold text-zinc-800 dark:text-zinc-100 tracking-tight">{t.adLocalizer}</h2>
          </div>
        </div>

        <div className="p-4 md:p-6 flex flex-col gap-6">

          {/* Step 1: Upload */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-3">
              1. Upload Your Ad
            </label>
            {uploadedReference ? (
              <div className="relative rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700">
                <img
                  src={`data:${uploadedReference.mimeType};base64,${uploadedReference.data}`}
                  alt="Uploaded ad"
                  className="w-full max-h-48 object-contain bg-zinc-50 dark:bg-zinc-950"
                />
                <button
                  onClick={() => setUploadedReference(null)}
                  className="absolute top-2 right-2 w-8 h-8 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label
                htmlFor="ad-upload-alfred"
                className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl cursor-pointer hover:border-zinc-500 dark:hover:border-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
              >
                <Upload className="w-7 h-7 text-zinc-400 mb-2" />
                <span className="text-sm text-zinc-500 dark:text-zinc-400">Click to upload your ad image</span>
                <input
                  id="ad-upload-alfred"
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-2">
              By using this feature, you confirm that you have the necessary rights to any content that you upload.
            </p>
          </div>

          {/* Step 2: Target Markets */}
          <div className="relative">
            <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-3">
              2. Target Market (Countries)
            </label>

            {selectedMarkets.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedMarkets.map((market) => (
                  <span
                    key={market}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-medium rounded-full"
                  >
                    {market}
                    <button
                      onClick={() => setSelectedMarkets(prev => prev.filter(m => m !== market))}
                      className="ml-1 hover:opacity-70 rounded-full"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            <div
              className="relative"
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                  setShowCountryDropdown(false);
                }
              }}
            >
              <input
                type="text"
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all"
                placeholder="Type to search countries..."
                value={countrySearch}
                onChange={(e) => {
                  setCountrySearch(e.target.value);
                  setShowCountryDropdown(true);
                  setActiveCountryIndex(-1);
                }}
                onFocus={() => setShowCountryDropdown(true)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setActiveCountryIndex(prev => (prev < filteredCountries.length - 1 ? prev + 1 : prev));
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setActiveCountryIndex(prev => (prev > 0 ? prev - 1 : prev));
                  } else if (e.key === 'Enter' && activeCountryIndex >= 0) {
                    e.preventDefault();
                    const country = filteredCountries[activeCountryIndex];
                    if (country) {
                      setSelectedMarkets(prev => [...prev, country]);
                      setCountrySearch('');
                      setShowCountryDropdown(false);
                      setActiveCountryIndex(-1);
                    }
                  } else if (e.key === 'Escape') {
                    setShowCountryDropdown(false);
                  }
                }}
              />

              {showCountryDropdown && countrySearch && (
                <div className="absolute z-50 w-full mt-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl max-h-48 overflow-y-auto">
                  {filteredCountries.length > 0 ? filteredCountries.map((country, idx) => (
                    <button
                      key={country}
                      className={`w-full px-4 py-2 text-left text-sm transition-colors first:rounded-t-xl last:rounded-b-xl ${
                        activeCountryIndex === idx
                          ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50'
                          : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                      }`}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        setSelectedMarkets(prev => [...prev, country]);
                        setCountrySearch('');
                        setShowCountryDropdown(false);
                        setActiveCountryIndex(-1);
                      }}
                    >
                      {country}
                    </button>
                  )) : (
                    <div className="px-4 py-2 text-sm text-zinc-500 dark:text-zinc-400">No matching countries</div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Step 3: Target Languages */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-3">
              3. Target Languages
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {LANGUAGES.map(lang => (
                <label key={lang} className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={selectedLanguages.includes(lang)}
                      onChange={(e) => {
                        setSelectedLanguages(prev =>
                          e.target.checked ? [...prev, lang] : prev.filter(l => l !== lang)
                        );
                      }}
                      className="peer appearance-none w-4 h-4 border-2 border-zinc-300 dark:border-zinc-600 rounded-sm checked:bg-zinc-900 dark:checked:bg-zinc-100 checked:border-zinc-900 dark:checked:border-zinc-100 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:ring-offset-1"
                    />
                    <svg
                      className="absolute w-2.5 h-2.5 text-white dark:text-zinc-900 opacity-0 peer-checked:opacity-100 pointer-events-none"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-xs text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors">{lang}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Step 4: Aspect Ratio */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-3">
              4. Aspect Ratio
            </label>
            <div className="flex flex-wrap gap-2">
              {ASPECT_RATIOS.map(ar => (
                <button
                  key={ar.value}
                  onClick={() => setAspectRatio(ar.value)}
                  className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                    aspectRatio === ar.value
                      ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-zinc-900 dark:border-zinc-100'
                      : 'border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                  }`}
                >
                  {ar.label}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={!canGenerate}
            className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white disabled:bg-zinc-200 dark:disabled:bg-zinc-800 disabled:text-zinc-400 dark:disabled:text-zinc-600 disabled:pointer-events-none text-white dark:text-zinc-900 font-semibold text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0 min-h-[44px]"
          >
            {isGenerating ? <Loader2 className="animate-spin w-5 h-5" /> : <Globe className="w-5 h-5" />}
            <span>{isGenerating ? 'Localizing...' : 'Localize Ad'}</span>
          </button>
        </div>
      </div>

      {/* Right Column — Results */}
      <div className="flex flex-col bg-white dark:bg-zinc-900 lg:rounded-xl lg:border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        {results.length > 0 ? (
          <>
            <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Localized Results ({results.filter(r => r.image).length}/{results.length})
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={handleExportAll}
                  disabled={!results.some(r => r.image)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:pointer-events-none"
                  title="Export All"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export All
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                  title="New Campaign"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {results.map((res, i) => (
                <div key={i} className="relative rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950">
                  <div className="absolute top-3 left-3 bg-white/90 dark:bg-zinc-900/90 backdrop-blur px-3 py-1 text-xs font-bold uppercase tracking-widest z-10 shadow-sm rounded-lg text-zinc-800 dark:text-zinc-200">
                    {res.market}
                  </div>
                  {res.image && (
                    <button
                      onClick={() => handleDownloadOne(res)}
                      title={`Download ${res.market}`}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur transition-colors z-10 shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300" />
                    </button>
                  )}
                  {res.loading ? (
                    <div className="aspect-video flex flex-col items-center justify-center text-zinc-400 gap-3">
                      <Loader2 className="w-7 h-7 animate-spin" />
                      <span className="text-xs uppercase tracking-widest font-bold">Localizing...</span>
                    </div>
                  ) : res.image ? (
                    <img
                      src={`data:image/jpeg;base64,${res.image}`}
                      alt={res.market}
                      className="w-full object-contain"
                    />
                  ) : (
                    <div className="aspect-video flex items-center justify-center text-red-500 dark:text-red-400 text-sm font-medium px-4 text-center">
                      {res.error || `Failed to generate for ${res.market}`}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center p-12">
            <div className="text-center max-w-xs">
              <div className="w-16 h-16 mx-auto border border-zinc-200 dark:border-zinc-700 rounded-full flex items-center justify-center mb-6">
                <ImageIcon className="w-7 h-7 text-zinc-400 dark:text-zinc-500" />
              </div>
              <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-200 mb-2">Ready to Scale</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Upload your ad, select target markets or languages, then click Localize to generate localized versions instantly.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdLocalizer;
