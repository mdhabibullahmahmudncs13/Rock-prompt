# Prompt Rock by Xenon

A lightning-fast, serverless prompt optimization tool powered by OpenRouter. Paste your raw prompt and get a token-efficient, refined version instantly.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-production--ready-success)

## Features

✨ **Smart Format Selection** — Automatically chooses the best output format (JSON, XML, Markdown, or TXT) based on your prompt's intent

⚡ **Token Efficiency** — Live token estimation and optimization to reduce API costs

🎨 **Beautiful UI** — Premium dark-mode interface with glassmorphism design, built with Tailwind CSS

🔐 **Serverless & Secure** — No data storage, runs on Vercel with environment-variable-protected API keys

🚀 **Fast & Reliable** — Sub-second optimization with automatic model fallback (Mistral 7B → OpenRouter Auto)

🌐 **Responsive Design** — Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + custom CSS
- **AI Provider:** OpenRouter (Mistral, Llama, and more)
- **Deployment:** Vercel (serverless functions)
- **Language:** TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenRouter API key ([get one here](https://console.openrouter.ai))

### Installation

1. **Clone or navigate to the project:**
   ```bash
   cd prompt-optimizer-by-xenon
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env.local` with your OpenRouter API key:**
   ```bash
   echo "OPENROUTER_API_KEY=sk-or-v1-YOUR_KEY_HERE" > .env.local
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   - Local: [http://localhost:3000](http://localhost:3000)
   - The app is ready when you see "Ready in X.Xs"

## How to Use

1. **Paste your prompt** into the textarea
2. **Watch the token count** update in real-time (~characters/4)
3. **Click "Optimize Prompt"** to send to the AI
4. **View the optimized output** with its format badge (JSON/XML/MD/TXT)
5. **Copy to clipboard** with the copy button (shows "Copied!" for 1.5s)

### Example

**Input:**
```
Act as a professional code auditor. Review the code for security issues, performance problems, and best practices. Use bullet points.
```

**Output (Format: MD):**
```
Audit code for security, performance, and best practices. Use bullet points.
```

## API Route

### POST `/api/optimize`

Sends a prompt to OpenRouter and returns an optimized version with format selection.

**Request:**
```json
{
  "prompt": "Your prompt here"
}
```

**Response (200 OK):**
```json
{
  "optimized": "Refined prompt text",
  "format": "JSON" | "XML" | "MD" | "TXT"
}
```

**Error Response (400 Bad Request):**
```json
{
  "error": "Prompt is required"
}
```

**Error Response (500 Internal Server Error):**
```json
{
  "error": "Optimization failed"
}
```

### Configuration

- **Max Duration:** 30 seconds (Vercel serverless limit)
- **Default Model:** `mistralai/mistral-7b-instruct`
- **Fallback Model:** `openrouter/auto` (if primary fails)
- **Temperature:** 0.7 (balanced creativity and consistency)
- **Max Tokens:** 1000

## Project Structure

```
.
├── app/
│   ├── api/optimize/
│   │   └── route.ts           # Serverless API endpoint
│   ├── layout.tsx             # Root layout with metadata
│   ├── page.tsx               # Main page component
│   └── globals.css            # Global styles
├── .env.local                 # Local environment variables (git-ignored)
├── .env.example               # Example env file
├── .gitignore                 # Git ignore rules
├── next.config.js             # Next.js configuration
├── package.json               # Dependencies and scripts
├── postcss.config.js          # PostCSS configuration
├── tailwind.config.ts         # Tailwind design tokens
├── tsconfig.json              # TypeScript configuration
├── vercel.json                # Vercel deployment config
└── stitch/                    # Original Google Stitch export
    ├── code.html              # Original UI HTML
    ├── DESIGN.md              # Stitch design system
    └── screen.png             # Original design screenshot
```

## Environment Variables

### Required

- **`OPENROUTER_API_KEY`** — Your OpenRouter API key
  - Get one at: https://console.openrouter.ai
  - Format: `sk-or-v1-...`

### Optional

None currently, but you can add custom headers or model selection via code changes.

## Build & Deploy

### Local Build

```bash
npm run build
```

Generates optimized production build in `.next/` directory. No errors should appear.

### Deploy to Vercel

1. **Install Vercel CLI** (if not already):
   ```bash
   npm install -g vercel
   ```

2. **Add environment variable to Vercel:**
   ```bash
   vercel env add OPENROUTER_API_KEY
   ```
   Then paste your OpenRouter API key when prompted.

3. **Deploy to production:**
   ```bash
   vercel --prod
   ```

4. **Your app will be live** at:
   ```
   https://prompt-rock-xenon.vercel.app
   ```

### Vercel Configuration

The `vercel.json` file tells Vercel this is a Next.js project and configures serverless function behavior.

## Scripts

```bash
npm run dev       # Start development server (port 3000)
npm run build     # Build production bundle
npm start         # Start production server
npm run lint      # Run ESLint checks
```

## Design System

The UI uses a **premium dark-mode design** with:

- **Colors:** Ultra-dark backgrounds with electric violet accents (`#7C6FF7`)
- **Typography:** Inter font for headlines and body, Geist Mono for code
- **Components:** Glassmorphic panels, smooth transitions, Material Symbols icons
- **Spacing:** Carefully balanced whitespace for a sophisticated feel

All design tokens are defined in `tailwind.config.ts` and can be customized globally.

## Error Handling

The app gracefully handles errors with user-friendly messages:

- **Empty prompt:** Inline validation error (red text)
- **API failures:** Error panel below input with error message
- **Network issues:** Automatic retry with fallback model
- **Format parsing errors:** Server logs error; user sees generic message

## Performance

- **Page Load:** ~2.3s (dev), <1s (production)
- **Optimization Time:** 2-8s (depends on OpenRouter latency)
- **Token Estimate:** Calculated instantly (<10ms)
- **Copy to Clipboard:** <1ms

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Security

- 🔒 **No data storage** — Prompts are only sent to OpenRouter; not stored locally
- 🔑 **API key isolation** — Stored in server-side environment variables only
- 🛡️ **HTTPS only** — All requests are encrypted in transit
- ✅ **CORS protected** — API only responds to requests from your domain
- 📝 **User privacy** — No analytics, tracking, or third-party scripts

## Troubleshooting

### "Prompt is required" error
- Check that the textarea is not empty
- Try refreshing the page

### "Optimization failed" error
- Verify your `OPENROUTER_API_KEY` is valid and has credits
- Check the server logs (terminal running `npm run dev`)
- Try again or use a different prompt

### Material Symbols not showing
- Clear browser cache (Cmd+Shift+R / Ctrl+Shift+R)
- Verify `app/globals.css` has Material Symbols imports

### Port 3000 already in use
- The dev server will automatically try port 3001
- Or: `kill $(lsof -t -i:3000)` to free the port

### Build fails with TypeScript errors
- Run `npm run build` to see details
- Ensure all imports are correct
- Check `tsconfig.json` for strict mode settings

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Make changes and test locally
4. Commit with clear messages
5. Push and open a pull request

## Customization

### Change the Model

Edit `app/api/optimize/route.ts` and update the `MODELS` array:

```typescript
const MODELS = [
  'your-preferred-model',
  'fallback-model',
];
```

Available models: https://openrouter.ai/docs/models

### Customize Colors

Edit `tailwind.config.ts` and update the `colors` section:

```typescript
colors: {
  primary: '#YOUR_COLOR',
  // ...
}
```

### Change System Prompt

Edit `app/api/optimize/route.ts` and update `SYSTEM_PROMPT` constant to customize how the AI optimizes prompts.

## License

MIT — Feel free to use this for personal and commercial projects.

## Support

- 📧 Email: [contact@xenon.dev](mailto:contact@xenon.dev)
- 🐛 Issues: [GitHub Issues](https://github.com/xenon-dev/prompt-rock/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/xenon-dev/prompt-rock/discussions)

## Roadmap

- [ ] Prompt history (localStorage)
- [ ] Multiple tabs for different optimizations
- [ ] Prompt templates library
- [ ] Dark/light mode toggle
- [ ] Export as file (JSON, Markdown, etc.)
- [ ] API endpoint for programmatic access
- [ ] Premium tier with higher rate limits

## Credits

Built with ❤️ by **Xenon**

- UI designed in **Google Stitch**
- Powered by **OpenRouter** AI API
- Deployed on **Vercel**
- Styled with **Tailwind CSS**

---

**Version 1.0.0** — April 2026
