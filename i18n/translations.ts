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
  imageAttached: string;
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

  // Tool Tabs
  clarifications: string;
  beliefGraph: string;
  imageAttributes: string;
  storyAttributes: string;
  videoAttributes: string;

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
}

export const translations: Record<Language, Translations> = {
  en: {
    // Header
    appTitle: 'Proactive Co-Creator',
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
    imageAttached: 'Image Attached',
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

    // Tool Tabs
    clarifications: 'Clarifications',
    beliefGraph: 'Belief Graph',
    imageAttributes: 'Image Attributes',
    storyAttributes: 'Story Attributes',
    videoAttributes: 'Video Attributes',

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
  },

  it: {
    // Header
    appTitle: 'Proactive Co-Creator',
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
    imageAttached: 'Immagine Allegata',
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

    // Tool Tabs
    clarifications: 'Chiarimenti',
    beliefGraph: 'Grafo di Analisi',
    imageAttributes: 'Attributi Immagine',
    storyAttributes: 'Attributi Storia',
    videoAttributes: 'Attributi Video',

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
  },
};
