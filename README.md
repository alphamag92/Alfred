<div align="center">
  <img src="public/logo.svg" alt="Alfred Logo" width="120" height="156" />
  <h1>Alfred</h1>
  <p>An AI-powered creative assistant that helps you craft the perfect prompt and generate <strong>images</strong>, <strong>stories</strong>, and <strong>videos</strong> using Google Gemini.</p>
</div>

---

## Features

### Prompt Creation & Refinement
- **Clarifications**: The AI asks targeted clarifying questions to understand your vision. Answer by picking options or typing custom responses.
- **Belief Graph**: Visualizes entities, relationships, and attributes extracted from your prompt. See what the AI "understands" and edit it directly.
- **Attributes Panel**: Fine-tune specific attributes (colors, styles, moods, camera angles, etc.) for each entity in your scene.
- **Iterative Refinement**: Apply your changes and watch the prompt improve automatically.

### Multi-Mode Generation
- **Image**: Generates 4 images via Gemini 3.1 Flash Image Preview
- **Story**: Creates engaging narratives via Gemini 3.1 Pro Preview
- **Video**: Produces videos via Veo 3.1 (requires a paid API key)

### Multilingual Support
- **UI Language**: Switch between English and Italian
- **Output Language**: Control the language of generated content (Auto, English, or Italian)

### Additional Features
- Dark mode / Light mode toggle
- Image attachment support for reference-based generation
- Mobile-responsive layout with Editor/Preview navigation
- Mode-specific prompt tips to help you write better prompts

## Getting Started

### Prerequisites
- Node.js (v18+)

### Installation

```bash
npm install
```

### Configuration

Set your Gemini API key by clicking the **API Key** button in the header. The key is stored securely in your browser's localStorage.

Alternatively, set `GEMINI_API_KEY` in a `.env.local` file for development.

### Run Locally

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

### Build for Production

```bash
npm run build
```

## Tech Stack

- **React 19** with TypeScript
- **Vite** for bundling
- **Tailwind CSS** for styling
- **Google Gemini API** (`@google/genai`) for AI generation
- **Lucide React** for icons

## How It Works

1. **Write a prompt** describing what you want to create
2. **Choose a mode** (Image, Story, or Video)
3. **Analyze** your prompt to get clarifying questions and a belief graph
4. **Refine** your prompt by answering questions and editing attributes
5. **Generate** your content

The app uses a belief graph to decompose your prompt into entities, attributes, and relationships. This structured representation helps you see exactly what the AI will generate and gives you fine-grained control over every detail.

## License

Apache-2.0
