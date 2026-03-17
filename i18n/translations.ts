export type Language = 'en' | 'it';

export interface Translations {
  // Header
  appTitle: string;
  apiKey: string;
  switchToLight: string;
  switchToDark: string;
  language: string;

  // Prompt Input
  prompt: string;
  promptPlaceholder: string;
  analyzePrompt: string;
  generate: string;
  regenerate: string;
  image: string;
  story: string;
  video: string;
  attachImage: string;
  attachDocument: string;
  imageAttached: string;
  documentAttached: string;
  documentsAttached: (count: number) => string;
  remove: string;
  modeDisabledWhileProcessing: string;
  inputDisabledWhileProcessing: string;
  enterPromptFirst: string;
  waitForCurrentOp: string;

  // Prompt Tips
  promptTipsTitle: string;
  imageTip: string;
  storyTip: string;
  videoTip: string;
  promptTip: string;

  // Tool Tabs
  clarifications: string;
  beliefGraph: string;
  imageAttributes: string;
  storyAttributes: string;
  videoAttributes: string;
  promptAttributes: string;

  // Pending Changes
  pendingChanges: (count: number) => string;
  updatePrompt: string;
  updating: string;
  updatingPromptTitle: string;
  applyAllChangesTitle: string;

  // Clarifications
  clarificationPlaceholder: string;
  thinkingSteps: string[];
  thinkingVisual: string;
  thinkingNarrative: string;
  thinkingTemporal: string;
  refreshQuestions: string;
  clickUpdateToApply: string;
  orTypeAnswer: string;

  // Output Gallery
  imageGeneration: string;
  videoGeneration: string;
  creativeWriting: string;
  generating: string;
  generatingVideo: string;
  writingStory: string;
  generationFailed: string;
  downloadImage: string;
  downloadVideo: string;
  copyToClipboard: string;
  downloadText: string;
  resultsOutdated: string;
  promptChanged: string;
  imageWillAppear: string;
  videoWillAppear: string;
  storyWillAppear: string;
  billingRequired: string;
  billingDescription: string;
  learnBilling: string;
  selectApiKey: string;

  // Prompt Creator
  promptCreator: string;
  promptGeneration: string;
  craftingPrompt: string;
  perfectPromptTitle: string;
  promptWillAppear: string;

  // Status
  connectionUnstable: (action: string, attempt: number, total: number) => string;

  // Mobile
  editor: string;
  preview: string;

  // Output language
  outputLanguage: string;
  outputLangAuto: string;
  outputLangEn: string;
  outputLangIt: string;

  // API Key Modal
  apiKeyModalTitle: string;
  apiKeyModalDesc: string;
  cancel: string;
  save: string;
  getApiKey: string;
  storedInBrowser: string;

  // Ad Localizer
  localize: string;
  adLocalizer: string;
  backToAlfred: string;

  // Magic Pixels
  magicPixels: string;
  editInMagicPixels: string;
  mpSubtitle: string;
  mpDropZone: string;
  mpDropZoneHint: string;
  mpChooseFile: string;
  mpCapRetouchTitle: string;
  mpCapRetouchDesc: string;
  mpCapFilterTitle: string;
  mpCapFilterDesc: string;
  mpCapAdjustTitle: string;
  mpCapAdjustDesc: string;
  mpTabRetouch: string;
  mpTabAdjust: string;
  mpTabFilter: string;
  mpTabCrop: string;
  mpRetouchInstruction: string;
  mpRetouchPointSelected: string;
  mpRetouchPlaceholder: string;
  mpApplyRetouch: string;
  mpCustomLabel: string;
  mpCustomAdjustPlaceholder: string;
  mpCustomFilterPlaceholder: string;
  mpAdjBlurBg: string;
  mpAdjEnhance: string;
  mpAdjWarm: string;
  mpAdjStudio: string;
  mpAdjRemoveBg: string;
  mpFilterSynthwave: string;
  mpFilterAnime: string;
  mpFilterLomo: string;
  mpFilterGlitch: string;
  mpCropAspectLabel: string;
  mpCropFree: string;
  mpCropInstruction: string;
  mpApplyCrop: string;
  mpCropClear: string;
  mpProcessing: string;
  mpEditFailed: string;
  mpUndo: string;
  mpRedo: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Header
    appTitle: 'Alfred',
    apiKey: 'API Key',
    switchToLight: 'Switch to Light Mode',
    switchToDark: 'Switch to Dark Mode',
    language: 'Language',

    // Prompt Input
    prompt: 'Prompt',
    promptPlaceholder: 'Describe what you want to create...',
    analyzePrompt: 'Analyze Prompt',
    generate: 'Generate',
    regenerate: 'Regenerate',
    image: 'Image',
    story: 'Story',
    video: 'Video',
    attachImage: 'Attach an image',
    attachDocument: 'Attach a document',
    imageAttached: 'Image Attached',
    documentAttached: 'Document Attached',
    documentsAttached: (count: number) => `${count} Document${count !== 1 ? 's' : ''} Attached`,
    remove: 'Remove',
    modeDisabledWhileProcessing: 'Mode selection is disabled while processing',
    inputDisabledWhileProcessing: 'Input is disabled while processing your request. Please wait.',
    enterPromptFirst: 'Please enter a prompt first',
    waitForCurrentOp: 'Please wait for current operation to finish',

    // Prompt Tips
    promptTipsTitle: 'Tips for a great prompt',
    imageTip: 'Describe the scene, style, lighting, colors, and mood. Be specific about composition and camera angle.',
    storyTip: 'Describe characters, setting, conflict, and tone. Mention genre and narrative perspective.',
    videoTip: 'Describe action, camera movement, pacing, and atmosphere. Specify duration feel and transitions.',
    promptTip: 'Describe your idea roughly. Alfred will analyze it and craft a perfect, detailed prompt you can use anywhere.',

    // Tool Tabs
    clarifications: 'Clarifications',
    beliefGraph: 'Belief Graph',
    imageAttributes: 'Image Attributes',
    storyAttributes: 'Story Attributes',
    videoAttributes: 'Video Attributes',
    promptAttributes: 'Prompt Attributes',

    // Pending Changes
    pendingChanges: (count: number) => `${count} pending change${count !== 1 ? 's' : ''}`,
    updatePrompt: 'Update Prompt',
    updating: 'Updating...',
    updatingPromptTitle: 'Updating prompt...',
    applyAllChangesTitle: 'Apply all changes from Clarifications and Belief Graph',

    // Clarifications
    clarificationPlaceholder: 'Clarifying questions will appear here after generation.',
    thinkingSteps: [
      'Analyzing prompt for ambiguities...',
      'Identifying vague attributes...',
      'Detecting implicit entities...',
      'Evaluating semantic uncertainties...',
      'Drafting clarification questions...',
    ],
    thinkingVisual: 'Scanning visual descriptors...',
    thinkingNarrative: 'Evaluating narrative gaps...',
    thinkingTemporal: 'Checking temporal dynamics...',
    refreshQuestions: 'Refresh Questions',
    clickUpdateToApply: 'Click "Update Prompt" to apply.',
    orTypeAnswer: 'Or type answer...',

    // Output Gallery
    imageGeneration: 'Image Generation',
    videoGeneration: 'Video Generation',
    creativeWriting: 'Creative Writing',
    generating: 'Generating...',
    generatingVideo: 'Generating video...',
    writingStory: 'Writing story...',
    generationFailed: 'Generation Failed',
    downloadImage: 'Download Image',
    downloadVideo: 'Download Video',
    copyToClipboard: 'Copy to Clipboard',
    downloadText: 'Download Text',
    resultsOutdated: 'Results Outdated',
    promptChanged: 'Prompt has changed.',
    imageWillAppear: 'Your generated images will appear here.',
    videoWillAppear: 'Your generated video will appear here.',
    storyWillAppear: 'Your creative story will appear here.',
    billingRequired: 'Billing Account Required',
    billingDescription: 'Generating videos with Veo requires a paid API Key from Google Cloud. Please select a key to continue.',
    learnBilling: 'Learn more about billing',
    selectApiKey: 'Select API Key',

    // Prompt Creator
    promptCreator: 'Prompt',
    promptGeneration: 'Prompt Creator',
    craftingPrompt: 'Crafting the perfect prompt...',
    perfectPromptTitle: 'Your Perfect Prompt',
    promptWillAppear: 'Your crafted prompt will appear here.',

    // Status
    connectionUnstable: (action, attempt, total) => `Connection unstable or rate limited during ${action}. Retrying (${attempt}/${total})...`,

    // Mobile
    editor: 'Editor',
    preview: 'Preview',

    // Output language
    outputLanguage: 'Output Language',
    outputLangAuto: 'Auto',
    outputLangEn: 'English',
    outputLangIt: 'Italian',

    // API Key Modal
    apiKeyModalTitle: 'Gemini API Key',
    apiKeyModalDesc: 'Enter your Gemini API key to generate content.',
    cancel: 'Cancel',
    save: 'Save',
    getApiKey: 'Get an API key',
    storedInBrowser: 'stored only in your browser',

    // Ad Localizer
    localize: 'Localize',
    adLocalizer: 'Ad Localizer',
    backToAlfred: 'Back to Alfred',

    // Magic Pixels
    magicPixels: 'Magic Pixels',
    editInMagicPixels: 'Edit in Magic Pixels',
    mpSubtitle: 'AI-Powered Photo Editing, Simplified.',
    mpDropZone: 'Drop your image here',
    mpDropZoneHint: 'or click to choose a file — PNG, JPG, WEBP',
    mpChooseFile: 'Choose image',
    mpCapRetouchTitle: 'Precise Retouching',
    mpCapRetouchDesc: 'Click any point to apply targeted edits',
    mpCapFilterTitle: 'Creative Filters',
    mpCapFilterDesc: 'Instantly transform the mood and style',
    mpCapAdjustTitle: 'Pro Adjustments',
    mpCapAdjustDesc: 'Lighting, blur, tone and more',
    mpTabRetouch: 'Retouch',
    mpTabAdjust: 'Adjust',
    mpTabFilter: 'Filter',
    mpTabCrop: 'Crop',
    mpRetouchInstruction: 'Click a point on the image to select it, then describe what to change.',
    mpRetouchPointSelected: 'Point selected at {x}% × {y}%. Describe your change below.',
    mpRetouchPlaceholder: 'e.g. Remove the blemish, change shirt to red…',
    mpApplyRetouch: 'Apply Retouch',
    mpCustomLabel: 'Or describe a custom change',
    mpCustomAdjustPlaceholder: 'e.g. Add a rain effect…',
    mpCustomFilterPlaceholder: 'e.g. Vintage film look…',
    mpAdjBlurBg: 'Blur Background',
    mpAdjEnhance: 'Enhance Details',
    mpAdjWarm: 'Warmer Lighting',
    mpAdjStudio: 'Studio Light',
    mpAdjRemoveBg: 'Remove Background',
    mpFilterSynthwave: 'Synthwave',
    mpFilterAnime: 'Anime',
    mpFilterLomo: 'Lomo',
    mpFilterGlitch: 'Glitch',
    mpCropAspectLabel: 'Aspect ratio',
    mpCropFree: 'Free',
    mpCropInstruction: 'Drag on the image to select the crop area, then click Apply.',
    mpApplyCrop: 'Apply Crop',
    mpCropClear: 'Clear selection',
    mpProcessing: 'Processing…',
    mpEditFailed: 'Edit failed. Please try again.',
    mpUndo: 'Undo',
    mpRedo: 'Redo',
  },

  it: {
    // Header
    appTitle: 'Alfred',
    apiKey: 'Chiave API',
    switchToLight: 'Passa a Tema Chiaro',
    switchToDark: 'Passa a Tema Scuro',
    language: 'Lingua',

    // Prompt Input
    prompt: 'Prompt',
    promptPlaceholder: 'Descrivi cosa vuoi creare...',
    analyzePrompt: 'Analizza Prompt',
    generate: 'Genera',
    regenerate: 'Rigenera',
    image: 'Immagine',
    story: 'Storia',
    video: 'Video',
    attachImage: 'Allega un\'immagine',
    attachDocument: 'Allega un documento',
    imageAttached: 'Immagine Allegata',
    documentAttached: 'Documento Allegato',
    documentsAttached: (count: number) => `${count} Document${count !== 1 ? 'i' : 'o'} Allegat${count !== 1 ? 'i' : 'o'}`,
    remove: 'Rimuovi',
    modeDisabledWhileProcessing: 'Selezione modalita\' disabilitata durante l\'elaborazione',
    inputDisabledWhileProcessing: 'Input disabilitato durante l\'elaborazione. Attendere.',
    enterPromptFirst: 'Inserisci prima un prompt',
    waitForCurrentOp: 'Attendi il completamento dell\'operazione corrente',

    // Prompt Tips
    promptTipsTitle: 'Consigli per un ottimo prompt',
    imageTip: 'Descrivi la scena, lo stile, l\'illuminazione, i colori e l\'atmosfera. Sii specifico su composizione e angolazione.',
    storyTip: 'Descrivi personaggi, ambientazione, conflitto e tono. Indica genere e prospettiva narrativa.',
    videoTip: 'Descrivi l\'azione, il movimento della camera, il ritmo e l\'atmosfera. Specifica durata e transizioni.',
    promptTip: 'Descrivi la tua idea in modo approssimativo. Alfred la analizzer\u00e0 e creer\u00e0 un prompt perfetto e dettagliato da usare ovunque.',

    // Tool Tabs
    clarifications: 'Chiarimenti',
    beliefGraph: 'Grafo di Analisi',
    imageAttributes: 'Attributi Immagine',
    storyAttributes: 'Attributi Storia',
    videoAttributes: 'Attributi Video',
    promptAttributes: 'Attributi Prompt',

    // Pending Changes
    pendingChanges: (count: number) => `${count} modific${count !== 1 ? 'he' : 'a'} in sospeso`,
    updatePrompt: 'Aggiorna Prompt',
    updating: 'Aggiornamento...',
    updatingPromptTitle: 'Aggiornamento prompt...',
    applyAllChangesTitle: 'Applica tutte le modifiche da Chiarimenti e Grafo di Analisi',

    // Clarifications
    clarificationPlaceholder: 'Le domande di chiarimento appariranno qui dopo la generazione.',
    thinkingSteps: [
      'Analisi del prompt per ambiguita\'...',
      'Identificazione attributi vaghi...',
      'Rilevamento entita\' implicite...',
      'Valutazione incertezze semantiche...',
      'Formulazione domande di chiarimento...',
    ],
    thinkingVisual: 'Scansione descrittori visivi...',
    thinkingNarrative: 'Valutazione lacune narrative...',
    thinkingTemporal: 'Verifica dinamiche temporali...',
    refreshQuestions: 'Aggiorna Domande',
    clickUpdateToApply: 'Clicca "Aggiorna Prompt" per applicare.',
    orTypeAnswer: 'Oppure scrivi la risposta...',

    // Output Gallery
    imageGeneration: 'Generazione Immagini',
    videoGeneration: 'Generazione Video',
    creativeWriting: 'Scrittura Creativa',
    generating: 'Generazione...',
    generatingVideo: 'Generazione video...',
    writingStory: 'Scrittura storia...',
    generationFailed: 'Generazione Fallita',
    downloadImage: 'Scarica Immagine',
    downloadVideo: 'Scarica Video',
    copyToClipboard: 'Copia negli Appunti',
    downloadText: 'Scarica Testo',
    resultsOutdated: 'Risultati Obsoleti',
    promptChanged: 'Il prompt e\' stato modificato.',
    imageWillAppear: 'Le immagini generate appariranno qui.',
    videoWillAppear: 'Il video generato apparira\' qui.',
    storyWillAppear: 'La tua storia creativa apparira\' qui.',
    billingRequired: 'Account di Fatturazione Richiesto',
    billingDescription: 'La generazione video con Veo richiede una chiave API a pagamento di Google Cloud. Seleziona una chiave per continuare.',
    learnBilling: 'Scopri di piu\' sulla fatturazione',
    selectApiKey: 'Seleziona Chiave API',

    // Prompt Creator
    promptCreator: 'Prompt',
    promptGeneration: 'Creatore di Prompt',
    craftingPrompt: 'Creazione del prompt perfetto...',
    perfectPromptTitle: 'Il Tuo Prompt Perfetto',
    promptWillAppear: 'Il tuo prompt creato apparir\u00e0 qui.',

    // Status
    connectionUnstable: (action, attempt, total) => `Connessione instabile durante ${action}. Nuovo tentativo (${attempt}/${total})...`,

    // Mobile
    editor: 'Editor',
    preview: 'Anteprima',

    // Output language
    outputLanguage: 'Lingua Output',
    outputLangAuto: 'Auto',
    outputLangEn: 'Inglese',
    outputLangIt: 'Italiano',

    // API Key Modal
    apiKeyModalTitle: 'Chiave API Gemini',
    apiKeyModalDesc: 'Inserisci la tua chiave API Gemini per generare contenuti.',
    cancel: 'Annulla',
    save: 'Salva',
    getApiKey: 'Ottieni una chiave API',
    storedInBrowser: 'salvata solo nel tuo browser',

    // Ad Localizer
    localize: 'Localizza',
    adLocalizer: 'Ad Localizer',
    backToAlfred: 'Torna ad Alfred',

    // Magic Pixels
    magicPixels: 'Magic Pixels',
    editInMagicPixels: 'Modifica in Magic Pixels',
    mpSubtitle: 'Photo editing AI, semplificato.',
    mpDropZone: 'Trascina qui la tua immagine',
    mpDropZoneHint: 'oppure clicca per scegliere un file — PNG, JPG, WEBP',
    mpChooseFile: 'Scegli immagine',
    mpCapRetouchTitle: 'Ritocco Preciso',
    mpCapRetouchDesc: 'Clicca un punto per modifiche mirate',
    mpCapFilterTitle: 'Filtri Creativi',
    mpCapFilterDesc: 'Trasforma umore e stile in un istante',
    mpCapAdjustTitle: 'Regolazioni Pro',
    mpCapAdjustDesc: 'Luce, sfocatura, toni e molto altro',
    mpTabRetouch: 'Ritocco',
    mpTabAdjust: 'Regola',
    mpTabFilter: 'Filtro',
    mpTabCrop: 'Ritaglia',
    mpRetouchInstruction: 'Clicca un punto sull\'immagine per selezionarlo, poi descrivi cosa cambiare.',
    mpRetouchPointSelected: 'Punto selezionato a {x}% × {y}%. Descrivi la modifica qui sotto.',
    mpRetouchPlaceholder: 'es. Rimuovi l\'imperfezione, cambia la maglietta in rosso…',
    mpApplyRetouch: 'Applica Ritocco',
    mpCustomLabel: 'Oppure descrivi una modifica personalizzata',
    mpCustomAdjustPlaceholder: 'es. Aggiungi effetto pioggia…',
    mpCustomFilterPlaceholder: 'es. Aspetto pellicola vintage…',
    mpAdjBlurBg: 'Sfoca Sfondo',
    mpAdjEnhance: 'Migliora Dettagli',
    mpAdjWarm: 'Luce Calda',
    mpAdjStudio: 'Luce Studio',
    mpAdjRemoveBg: 'Rimuovi Sfondo',
    mpFilterSynthwave: 'Synthwave',
    mpFilterAnime: 'Anime',
    mpFilterLomo: 'Lomo',
    mpFilterGlitch: 'Glitch',
    mpCropAspectLabel: 'Proporzioni',
    mpCropFree: 'Libero',
    mpCropInstruction: 'Trascina sull\'immagine per selezionare l\'area, poi clicca Applica.',
    mpApplyCrop: 'Applica Ritaglio',
    mpCropClear: 'Cancella selezione',
    mpProcessing: 'Elaborazione…',
    mpEditFailed: 'Modifica fallita. Riprova.',
    mpUndo: 'Annulla',
    mpRedo: 'Ripristina',
  },
};
