# Changelog

All notable changes to Prompt Rock will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- [ ] Prompt history (localStorage)
- [ ] Multiple optimization tabs
- [ ] Prompt templates library
- [ ] Dark/light mode toggle
- [ ] Export as file (JSON, Markdown, etc.)
- [ ] Programmatic API endpoints
- [ ] Rate limiting and usage analytics
- [ ] Mobile app version

---

## [1.0.0] - 2026-04-13

### Added

#### Core Features
- ✨ Prompt optimization engine using OpenRouter API
- 🎯 Automatic format detection (JSON, XML, Markdown, TXT)
- 📊 Live token estimation (~characters/4)
- 📋 Copy-to-clipboard functionality with feedback
- ⚡ Loading states with CSS spinner animation
- 🔴 Inline validation errors
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🌙 Premium dark-mode UI with glassmorphic panels

#### Technical
- Next.js 14 App Router architecture
- TypeScript strict mode
- Tailwind CSS with custom design tokens
- Serverless API route (`/api/optimize`)
- Environment variable security
- OpenRouter model fallback (Mistral → Auto)
- 30-second function timeout for Vercel
- Graceful error handling with user-friendly messages

#### Styling & UI
- Material Symbols icons throughout
- Custom color palette (primary violet, dark backgrounds)
- Inter and Geist Mono font families
- Smooth animations and transitions
- Glass-morphism effects for panels
- Material Design 3 inspired color system

#### Deployment
- Vercel serverless hosting configuration
- Environment-based configuration (`.env.local`)
- Production-ready build pipeline
- `.gitignore` to protect secrets
- `vercel.json` framework detection

#### Documentation
- **README.md** — Features, setup, usage, customization
- **API.md** — Complete API documentation with examples
- **DEPLOYMENT.md** — Step-by-step deployment guide
- **CONTRIBUTING.md** — Contribution guidelines
- **CHANGELOG.md** — Version history

### Project Structure
```
app/
├── api/optimize/route.ts
├── layout.tsx
├── page.tsx
└── globals.css

Configuration files:
├── tailwind.config.ts
├── next.config.js
├── postcss.config.js
├── tsconfig.json
├── package.json
├── .env.local
├── .env.example
├── .gitignore
└── vercel.json
```

### Changes from Stitch Export

The original Google Stitch export (`/stitch/code.html`) was converted to a fully functional Next.js application:

- ✅ Preserved all original UI components and styling
- ✅ Converted HTML to React TSX components
- ✅ Connected textarea input to form handling
- ✅ Wired submit button to API endpoint
- ✅ Implemented dynamic output panel
- ✅ Added loading, error, and success states
- ✅ Preserved exact color palette and typography
- ✅ Maintained responsive design

### APIs

#### POST /api/optimize
- Accepts JSON body: `{ "prompt": "..." }`
- Returns: `{ "optimized": "...", "format": "JSON|XML|MD|TXT" }`
- Validates non-empty input (400 error)
- Handles OpenRouter failures with fallback model
- Logs errors to server console

### Models Used
- **Primary:** `mistralai/mistral-7b-instruct`
- **Fallback:** `openrouter/auto`
- **Parameters:** temperature=0.7, max_tokens=1000

### Environment Variables
- `OPENROUTER_API_KEY` — Required for API calls

### Tested On
- ✅ Node.js 18+
- ✅ npm 9+
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers

### Known Limitations
- No data persistence (stateless on each load)
- No user authentication
- No rate limiting on client
- Limited to 30-second serverless timeout
- No offline support

---

## Version History

| Version | Date | Status |
|---------|------|--------|
| [1.0.0](#100---2026-04-13) | April 13, 2026 | Released |

---

## Migration Guide

### From 0.x to 1.0.0

If you were using a previous version, no migration needed. Version 1.0.0 is the initial release.

---

## Support

- 📖 Read the [README.md](./README.md)
- 🔌 Check [API.md](./API.md) for integration
- 🚀 See [DEPLOYMENT.md](./DEPLOYMENT.md) for hosting
- 🤝 Review [CONTRIBUTING.md](./CONTRIBUTING.md) to contribute

---

## Roadmap

### Q2 2026
- [ ] Prompt history (localStorage + JSON export)
- [ ] Multiple workspace tabs
- [ ] Keyboard shortcuts (Cmd+Enter to submit)
- [ ] Prompt templates for common tasks

### Q3 2026
- [ ] Dark/light mode toggle
- [ ] Advanced settings (model selection, temperature)
- [ ] Batch optimization API
- [ ] Usage analytics dashboard

### Q4 2026
- [ ] Premium tier with higher limits
- [ ] Team collaboration features
- [ ] Custom system prompts
- [ ] Mobile native app

---

## Credits

**Prompt Rock** by **Xenon**

- **UI Design:** Google Stitch (converted to React)
- **AI Engine:** OpenRouter
- **Hosting:** Vercel
- **Styling:** Tailwind CSS
- **Icons:** Material Symbols
- **Typography:** Inter, Geist Mono

---

## License

MIT License — See LICENSE file for details

---

**Last Updated:** April 13, 2026
