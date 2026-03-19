/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export type Language = 'en' | 'it' | 'es';

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
  outputLangEs: string;

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
  alUploadYourAd: string;
  alClickToUpload: string;
  alRightsDisclaimer: string;
  alTargetMarket: string;
  alSearchCountries: string;
  alNoMatchingCountries: string;
  alTargetLanguages: string;
  alAspectRatio: string;
  alLocalizing: string;
  alLocalizeAd: string;
  alLocalizedResults: (done: number, total: number) => string;
  alExportAll: string;
  alReset: string;
  alReadyToScale: string;
  alReadyDesc: string;
  alNoImageReturned: string;
  alFailedForMarket: (market: string) => string;

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
  mpAdjFeatherEdges: string;
  mpFeatherSizeLabel: string;
  mpFeatherSizePx: string;
  mpApplyFeather: string;
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
    outputLangEs: 'Spanish',

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
    alUploadYourAd: '1. Upload Your Ad',
    alClickToUpload: 'Click to upload your ad image',
    alRightsDisclaimer: 'By using this feature, you confirm that you have the necessary rights to any content that you upload.',
    alTargetMarket: '2. Target Market (Countries)',
    alSearchCountries: 'Type to search countries...',
    alNoMatchingCountries: 'No matching countries',
    alTargetLanguages: '3. Target Languages',
    alAspectRatio: '4. Aspect Ratio',
    alLocalizing: 'Localizing...',
    alLocalizeAd: 'Localize Ad',
    alLocalizedResults: (done, total) => `Localized Results (${done}/${total})`,
    alExportAll: 'Export All',
    alReset: 'Reset',
    alReadyToScale: 'Ready to Scale',
    alReadyDesc: 'Upload your ad, select target markets or languages, then click Localize to generate localized versions instantly.',
    alNoImageReturned: 'No image returned',
    alFailedForMarket: (market) => `Failed to generate for ${market}`,

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
    mpAdjFeatherEdges: 'Feather Edges',
    mpFeatherSizeLabel: 'Feather size',
    mpFeatherSizePx: 'px',
    mpApplyFeather: 'Apply Feather',
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
    outputLangEs: 'Spagnolo',

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
    alUploadYourAd: '1. Carica il Tuo Annuncio',
    alClickToUpload: 'Clicca per caricare l\'immagine dell\'annuncio',
    alRightsDisclaimer: 'Utilizzando questa funzione, confermi di possedere i diritti necessari sui contenuti caricati.',
    alTargetMarket: '2. Mercato di Destinazione (Paesi)',
    alSearchCountries: 'Cerca paesi...',
    alNoMatchingCountries: 'Nessun paese trovato',
    alTargetLanguages: '3. Lingue di Destinazione',
    alAspectRatio: '4. Proporzioni',
    alLocalizing: 'Localizzazione...',
    alLocalizeAd: 'Localizza Annuncio',
    alLocalizedResults: (done, total) => `Risultati Localizzati (${done}/${total})`,
    alExportAll: 'Esporta Tutto',
    alReset: 'Reimposta',
    alReadyToScale: 'Pronto per la Scala',
    alReadyDesc: 'Carica il tuo annuncio, seleziona i mercati o le lingue di destinazione, poi clicca Localizza per generare le versioni localizzate.',
    alNoImageReturned: 'Nessuna immagine restituita',
    alFailedForMarket: (market) => `Generazione fallita per ${market}`,

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
    mpAdjFeatherEdges: 'Sfuma Bordi',
    mpFeatherSizeLabel: 'Grandezza sfumatura',
    mpFeatherSizePx: 'px',
    mpApplyFeather: 'Applica Sfumatura',
  },

  es: {
    // Header
    appTitle: 'Alfred',
    apiKey: 'Clave API',
    switchToLight: 'Cambiar a Tema Claro',
    switchToDark: 'Cambiar a Tema Oscuro',
    language: 'Idioma',

    // Prompt Input
    prompt: 'Prompt',
    promptPlaceholder: 'Describe lo que quieres crear...',
    analyzePrompt: 'Analizar Prompt',
    generate: 'Generar',
    regenerate: 'Regenerar',
    image: 'Imagen',
    story: 'Historia',
    video: 'Video',
    attachImage: 'Adjuntar una imagen',
    attachDocument: 'Adjuntar un documento',
    imageAttached: 'Imagen Adjunta',
    documentAttached: 'Documento Adjunto',
    documentsAttached: (count: number) => `${count} Documento${count !== 1 ? 's' : ''} Adjunto${count !== 1 ? 's' : ''}`,
    remove: 'Eliminar',
    modeDisabledWhileProcessing: 'Selección de modo deshabilitada durante el procesamiento',
    inputDisabledWhileProcessing: 'Entrada deshabilitada durante el procesamiento. Por favor espera.',
    enterPromptFirst: 'Por favor ingresa un prompt primero',
    waitForCurrentOp: 'Por favor espera a que finalice la operación actual',

    // Prompt Tips
    promptTipsTitle: 'Consejos para un gran prompt',
    imageTip: 'Describe la escena, estilo, iluminación, colores y ambiente. Sé específico sobre la composición y el ángulo de cámara.',
    storyTip: 'Describe los personajes, el escenario, el conflicto y el tono. Menciona el género y la perspectiva narrativa.',
    videoTip: 'Describe la acción, el movimiento de cámara, el ritmo y la atmósfera. Especifica la sensación de duración y las transiciones.',
    promptTip: 'Describe tu idea de forma aproximada. Alfred la analizará y creará un prompt perfecto y detallado que puedes usar en cualquier lugar.',

    // Tool Tabs
    clarifications: 'Aclaraciones',
    beliefGraph: 'Grafo de Análisis',
    imageAttributes: 'Atributos de Imagen',
    storyAttributes: 'Atributos de Historia',
    videoAttributes: 'Atributos de Video',
    promptAttributes: 'Atributos de Prompt',

    // Pending Changes
    pendingChanges: (count: number) => `${count} cambio${count !== 1 ? 's' : ''} pendiente${count !== 1 ? 's' : ''}`,
    updatePrompt: 'Actualizar Prompt',
    updating: 'Actualizando...',
    updatingPromptTitle: 'Actualizando prompt...',
    applyAllChangesTitle: 'Aplicar todos los cambios de Aclaraciones y Grafo de Análisis',

    // Clarifications
    clarificationPlaceholder: 'Las preguntas de aclaración aparecerán aquí después de la generación.',
    thinkingSteps: [
      'Analizando el prompt en busca de ambigüedades...',
      'Identificando atributos vagos...',
      'Detectando entidades implícitas...',
      'Evaluando incertidumbres semánticas...',
      'Formulando preguntas de aclaración...',
    ],
    thinkingVisual: 'Escaneando descriptores visuales...',
    thinkingNarrative: 'Evaluando lagunas narrativas...',
    thinkingTemporal: 'Verificando dinámicas temporales...',
    refreshQuestions: 'Actualizar Preguntas',
    clickUpdateToApply: 'Haz clic en "Actualizar Prompt" para aplicar.',
    orTypeAnswer: 'O escribe la respuesta...',

    // Output Gallery
    imageGeneration: 'Generación de Imágenes',
    videoGeneration: 'Generación de Video',
    creativeWriting: 'Escritura Creativa',
    generating: 'Generando...',
    generatingVideo: 'Generando video...',
    writingStory: 'Escribiendo historia...',
    generationFailed: 'Generación Fallida',
    downloadImage: 'Descargar Imagen',
    downloadVideo: 'Descargar Video',
    copyToClipboard: 'Copiar al Portapapeles',
    downloadText: 'Descargar Texto',
    resultsOutdated: 'Resultados Desactualizados',
    promptChanged: 'El prompt ha cambiado.',
    imageWillAppear: 'Tus imágenes generadas aparecerán aquí.',
    videoWillAppear: 'Tu video generado aparecerá aquí.',
    storyWillAppear: 'Tu historia creativa aparecerá aquí.',
    billingRequired: 'Se Requiere Cuenta de Facturación',
    billingDescription: 'Generar videos con Veo requiere una clave API de pago de Google Cloud. Selecciona una clave para continuar.',
    learnBilling: 'Más información sobre facturación',
    selectApiKey: 'Seleccionar Clave API',

    // Prompt Creator
    promptCreator: 'Prompt',
    promptGeneration: 'Creador de Prompts',
    craftingPrompt: 'Creando el prompt perfecto...',
    perfectPromptTitle: 'Tu Prompt Perfecto',
    promptWillAppear: 'Tu prompt creado aparecerá aquí.',

    // Status
    connectionUnstable: (action, attempt, total) => `Conexión inestable o límite de tasa alcanzado durante ${action}. Reintentando (${attempt}/${total})...`,

    // Mobile
    editor: 'Editor',
    preview: 'Vista Previa',

    // Output language
    outputLanguage: 'Idioma de Salida',
    outputLangAuto: 'Auto',
    outputLangEn: 'Inglés',
    outputLangIt: 'Italiano',
    outputLangEs: 'Español',

    // API Key Modal
    apiKeyModalTitle: 'Clave API de Gemini',
    apiKeyModalDesc: 'Ingresa tu clave API de Gemini para generar contenido.',
    cancel: 'Cancelar',
    save: 'Guardar',
    getApiKey: 'Obtener una clave API',
    storedInBrowser: 'almacenada solo en tu navegador',

    // Ad Localizer
    localize: 'Localizar',
    adLocalizer: 'Ad Localizer',
    backToAlfred: 'Volver a Alfred',
    alUploadYourAd: '1. Sube Tu Anuncio',
    alClickToUpload: 'Haz clic para subir la imagen de tu anuncio',
    alRightsDisclaimer: 'Al usar esta función, confirmas que tienes los derechos necesarios sobre el contenido que subes.',
    alTargetMarket: '2. Mercado Objetivo (Países)',
    alSearchCountries: 'Escribe para buscar países...',
    alNoMatchingCountries: 'No se encontraron países',
    alTargetLanguages: '3. Idiomas de Destino',
    alAspectRatio: '4. Relación de Aspecto',
    alLocalizing: 'Localizando...',
    alLocalizeAd: 'Localizar Anuncio',
    alLocalizedResults: (done, total) => `Resultados Localizados (${done}/${total})`,
    alExportAll: 'Exportar Todo',
    alReset: 'Restablecer',
    alReadyToScale: 'Listo para Escalar',
    alReadyDesc: 'Sube tu anuncio, selecciona los mercados o idiomas de destino, luego haz clic en Localizar para generar versiones localizadas al instante.',
    alNoImageReturned: 'No se devolvió ninguna imagen',
    alFailedForMarket: (market) => `Error al generar para ${market}`,

    // Magic Pixels
    magicPixels: 'Magic Pixels',
    editInMagicPixels: 'Editar en Magic Pixels',
    mpSubtitle: 'Edición de fotos con IA, simplificada.',
    mpDropZone: 'Suelta tu imagen aquí',
    mpDropZoneHint: 'o haz clic para elegir un archivo — PNG, JPG, WEBP',
    mpChooseFile: 'Elegir imagen',
    mpCapRetouchTitle: 'Retoque Preciso',
    mpCapRetouchDesc: 'Haz clic en cualquier punto para aplicar ediciones específicas',
    mpCapFilterTitle: 'Filtros Creativos',
    mpCapFilterDesc: 'Transforma el ambiente y el estilo al instante',
    mpCapAdjustTitle: 'Ajustes Pro',
    mpCapAdjustDesc: 'Iluminación, desenfoque, tono y más',
    mpTabRetouch: 'Retoque',
    mpTabAdjust: 'Ajustar',
    mpTabFilter: 'Filtro',
    mpTabCrop: 'Recortar',
    mpRetouchInstruction: 'Haz clic en un punto de la imagen para seleccionarlo, luego describe qué cambiar.',
    mpRetouchPointSelected: 'Punto seleccionado en {x}% × {y}%. Describe tu cambio a continuación.',
    mpRetouchPlaceholder: 'ej. Elimina la imperfección, cambia la camisa a rojo…',
    mpApplyRetouch: 'Aplicar Retoque',
    mpCustomLabel: 'O describe un cambio personalizado',
    mpCustomAdjustPlaceholder: 'ej. Añade efecto de lluvia…',
    mpCustomFilterPlaceholder: 'ej. Apariencia de película vintage…',
    mpAdjBlurBg: 'Desenfocar Fondo',
    mpAdjEnhance: 'Mejorar Detalles',
    mpAdjWarm: 'Iluminación Cálida',
    mpAdjStudio: 'Luz de Estudio',
    mpAdjRemoveBg: 'Eliminar Fondo',
    mpFilterSynthwave: 'Synthwave',
    mpFilterAnime: 'Anime',
    mpFilterLomo: 'Lomo',
    mpFilterGlitch: 'Glitch',
    mpCropAspectLabel: 'Relación de aspecto',
    mpCropFree: 'Libre',
    mpCropInstruction: 'Arrastra sobre la imagen para seleccionar el área de recorte, luego haz clic en Aplicar.',
    mpApplyCrop: 'Aplicar Recorte',
    mpCropClear: 'Borrar selección',
    mpProcessing: 'Procesando…',
    mpEditFailed: 'Edición fallida. Por favor intenta de nuevo.',
    mpUndo: 'Deshacer',
    mpRedo: 'Rehacer',
    mpAdjFeatherEdges: 'Difuminar Bordes',
    mpFeatherSizeLabel: 'Tamaño de difuminado',
    mpFeatherSizePx: 'px',
    mpApplyFeather: 'Aplicar Difuminado',
  },
};
