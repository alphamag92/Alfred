<div align="center">
  <img src="public/alfred.webp" alt="Alfred Logo" height="96" style="border-radius:16px" />
  <h1>Alfred</h1>
  <p>An AI-powered creative assistant that helps you craft the perfect prompt and generate <strong>images</strong>, <strong>stories</strong>, and <strong>videos</strong> — with built-in tools to <strong>localize ads</strong> and <strong>edit photos</strong> using Google Gemini.</p>
</div>

---

## Features

### Prompt Creation & Refinement
- **Clarifications** — The AI asks targeted questions to understand your vision. Answer by picking options or typing custom responses.
- **Belief Graph** — Visualizes entities, relationships, and attributes extracted from your prompt. See what the AI "understands" and edit it directly.
- **Attributes Panel** — Fine-tune specific attributes (colors, styles, moods, camera angles, etc.) for each entity in your scene.
- **Iterative Refinement** — Apply your changes and watch the prompt improve automatically.

### Multi-Mode Generation
- **Image** — Generates 4 images via Gemini 3.1 Flash Image Preview.
- **Story** — Creates engaging narratives via Gemini 3.1 Pro Preview.
- **Video** — Produces videos via Veo 3.1 (requires a paid API key).
- **Prompt** — Crafts an optimized, production-ready prompt from your rough idea.

### Ad Localizer
Adapt a creative ad image for any global market in one click:
- Upload an ad image and choose target **country**, **language**, and **aspect ratio**.
- Gemini rewrites copy and adapts visuals for the selected locale.
- Download individual results or export all at once.

### Magic Pixels — AI Photo Editor
A full-featured photo editor powered by Gemini, accessible directly from Alfred:
- **Retouch** — Click any point on the image and describe what to change. Gemini applies the edit precisely to that area.
- **Adjust** — One-click presets: Blur Background, Enhance Details, Warmer Lighting, Studio Light, Remove Background. Plus a free-text custom field.
- **Filter** — Instant style presets: Synthwave, Anime, Lomo, Glitch. Plus a custom filter field.
- **Crop** — Drag to select any crop area with optional aspect-ratio lock (Free / 1:1 / 16:9).
- **Undo / Redo** — Full edit history so you can step back through every change.
- **Send from Alfred** — Hover over any generated image and click **"Edit in Magic Pixels"** to open it directly in the editor.

### Multilingual UI
- **UI Language**: English / Italian / Spanish
- **Output Language**: Control the language of generated content (Auto, English, Italian, or Spanish)

### Other
- Dark mode / Light mode toggle
- **Image & Document attachments** — Attach images and/or documents (JSON, Markdown, TXT, CSV, PDF, HTML, XML, YAML) to enrich your prompt. Documents are sent to Gemini as context for all main functions (Image, Story, Video, Prompt). Ad Localizer and Magic Pixels are not affected.
- Mobile-responsive layout (Editor / Preview tabs on small screens)
- Mode-specific prompt tips

---

## Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or later
- A [Google Gemini API key](https://aistudio.google.com/apikey) (free tier works for images, stories, and photo edits)

### 1. Clone the repository

```bash
git clone https://github.com/alphamag92/Alfred.git
cd Alfred
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set your API key

**Option A — via the UI (recommended):**
Click the **API Key** button in the top-right corner of the app and paste your key. It is stored in your browser's `localStorage` and never sent anywhere else.

**Option B — via environment variable:**
Copy `.env.example` to `.env.local` and fill in your key:

```bash
cp .env.example .env.local
```

Then edit `.env.local`:

```
GEMINI_API_KEY=your_api_key_here
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000/Alfred/](http://localhost:3000/Alfred/) in your browser.

### 5. Build for production

```bash
npm run build
```

The optimized output is written to `dist/`.

---

## Project Structure

```
Alfred/
├── components/
│   ├── Header.tsx          # Top bar with mode buttons (Ad Localizer, Magic Pixels)
│   ├── PromptInput.tsx     # Text input + mode selector
│   ├── OutputGallery.tsx   # Image / video / story / prompt display
│   ├── ClarificationCard.tsx
│   ├── BeliefGraph.tsx
│   ├── AdLocalizer.tsx     # Ad localization tool
│   └── MagicPixels.tsx     # AI photo editor
├── services/
│   ├── geminiService.ts    # Image / story / video / prompt generation
│   └── magicPixelsService.ts # Photo editing API calls
├── i18n/
│   ├── LanguageContext.tsx
│   └── translations.ts     # EN / IT / ES strings
├── types.ts
├── App.tsx
└── index.tsx
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI framework | React 19 + TypeScript |
| Build tool | Vite 6 |
| Styling | Tailwind CSS (CDN) |
| Icons | Lucide React |
| AI backend | Google Gemini API (`@google/genai`) |

---

## How It Works

1. **Write a prompt** describing what you want to create.
2. *(Optional)* **Attach files** — click the paperclip icon to attach documents (JSON, MD, PDF, etc.) or the image icon to attach a reference image. Both can be used at the same time.
3. **Choose a mode** — Image, Story, Video, or Prompt.
4. **Analyze** your prompt to get clarifying questions and a belief graph.
5. **Refine** by answering questions and editing attributes.
6. **Generate** your content.
7. *(Optional)* Hover a generated image → **"Edit in Magic Pixels"** to open the photo editor.

The app decomposes your prompt into a belief graph of entities, attributes, and relationships, giving you fine-grained control over every detail of what Gemini generates.

---

## Credits & License

This project is a derivative work that integrates and builds upon the original
code from the following Google AI Studio projects:

- **Proactive Co-Creator** (Google LLC)
- **Pixshop** (Google LLC)
- **Global Kit Generator** (Google LLC)

The original code has been modified to support a new unified user interface,
mobile optimization, multilingual support, and the consolidation of features
into a single application.

This software is distributed under the [Apache License 2.0](LICENSE).
Copyright on the original code segments belongs to the respective authors
(Google LLC). See [CREDITS.md](CREDITS.md) for full attribution details.
