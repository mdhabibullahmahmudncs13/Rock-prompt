# Quick Start Guide

Get Prompt Rock running in **5 minutes**.

## 1. Install & Setup (2 min)

```bash
# Clone the project (if not already cloned)
cd prompt-optimizer-by-xenon

# Install dependencies
npm install

# Create .env.local file
echo "OPENROUTER_API_KEY=sk-or-v1-YOUR_KEY_HERE" > .env.local
```

**Need an API key?**
1. Go to [console.openrouter.ai](https://console.openrouter.ai)
2. Sign up (free)
3. Copy your API key
4. Paste in `.env.local`

## 2. Run Locally (1 min)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

You should see:
- Purple "Prompt Rock" header
- Large textarea for input
- "Optimize Prompt" button
- Empty output panel (until you submit)

## 3. Test It (2 min)

### Try the demo:

1. **Paste this prompt:**
   ```
   You are a senior software engineer. Review the following code for bugs, performance issues, and best practices. Provide recommendations.
   ```

2. **Click "Optimize Prompt"**

3. **Wait 2-10 seconds** for the AI to optimize it

4. **See the result:**
   - Optimized prompt (shorter, clearer)
   - Format badge (JSON/XML/MD/TXT)
   - Option to copy

### Try the copy button:

1. Click the clipboard icon
2. Text is copied to clipboard
3. See "Copied!" feedback for 1.5 seconds

### Try validation:

1. **Leave textarea empty**
2. **Click "Optimize Prompt"**
3. **See error:** "Please enter a prompt first."
4. **Type something**
5. **Error disappears automatically**

## 4. Deploy to Production (Optional)

### Option A: Deploy with one command

```bash
npm install -g vercel
vercel --prod
```

Follow prompts, add your API key when asked.

### Option B: Deploy from GitHub

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Add `OPENROUTER_API_KEY` environment variable
5. Click Deploy

**Your app is live!** 🚀

## Essential Files

```
📄 README.md          ← Full documentation
📄 API.md             ← API details
📄 DEPLOYMENT.md      ← Deployment guide
📄 CONTRIBUTING.md    ← How to contribute

📁 app/
  ├── page.tsx        ← Main UI
  ├── api/optimize/   ← AI endpoint
  ├── layout.tsx      ← Page head
  └── globals.css     ← Styling

⚙️  Configuration files
  ├── package.json
  ├── tailwind.config.ts
  ├── next.config.js
  └── vercel.json
```

## Common Tasks

### Stop the dev server
```bash
# Press Ctrl+C in terminal
```

### Change the app name
Edit `app/page.tsx` and `app/layout.tsx` to replace "Prompt Rock" with your name.

### Use a different AI model
Edit `app/api/optimize/route.ts`, find `MODELS` array, and change model names.
See [OpenRouter docs](https://openrouter.ai/docs) for available models.

### Save your changes
```bash
git add .
git commit -m "Your message"
git push
```

## Troubleshooting

### ❌ "OPENROUTER_API_KEY is not set"
- Check `.env.local` exists in project root
- Verify the key format: `sk-or-v1-...` (starts correctly)
- Restart dev server: `npm run dev`

### ❌ "No endpoints found for [model]"
- OpenRouter deprecated that model
- Edit `app/api/optimize/route.ts`
- Change model to: `mistralai/mistral-7b-instruct`

### ❌ Port 3000 is in use
- Dev server uses port 3001 instead automatically
- Or kill the process: `lsof -t -i:3000 | xargs kill`

### ❌ Icons not showing (arrows, checkmarks)
- Clear browser cache: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
- Make sure `app/globals.css` has Material Symbols imports

### ❌ Build fails locally
```bash
npm run build
```
Read error messages and fix issues, or check the full [README.md](./README.md).

## Next Steps

- 📖 Read [README.md](./README.md) for full features and customization
- 🚀 Follow [DEPLOYMENT.md](./DEPLOYMENT.md) to deploy to Vercel
- 📡 Check [API.md](./API.md) to integrate into other projects
- 🤝 See [CONTRIBUTING.md](./CONTRIBUTING.md) to contribute improvements

## Key Shortcuts

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run start    # Run production build locally
npm run lint     # Check for code issues
```

## API Usage (if integrating elsewhere)

```javascript
// Optimize a prompt
const response = await fetch('/api/optimize', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ prompt: 'Your prompt here' })
});

const data = await response.json();
console.log(data.optimized);  // Refined prompt
console.log(data.format);     // JSON, XML, MD, or TXT
```

See [API.md](./API.md) for full endpoint documentation.

## Success! 🎉

You now have a fully functional prompt optimization tool running locally.

**Next:** Deploy to [Vercel](./DEPLOYMENT.md) or continue developing locally.

---

**Questions?** Check the [README.md](./README.md) or the docs folder.
