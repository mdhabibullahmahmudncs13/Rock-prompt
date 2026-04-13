# Contributing to Prompt Rock

Thank you for your interest in contributing! This document outlines the guidelines and process for contributing to Prompt Rock.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow in the community

## Getting Started

### 1. Fork and Clone

```bash
# Fork on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/prompt-rock-xenon.git
cd prompt-rock-xenon
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

Use descriptive branch names:
- `feature/prompt-history` — New feature
- `fix/copy-button-bug` — Bug fix
- `docs/api-examples` — Documentation
- `refactor/optimize-api` — Code refactoring

### 4. Set Up Environment

```bash
# Copy the example env file
cp .env.example .env.local

# Add your OpenRouter API key
# (Get a free key at console.openrouter.ai)
echo "OPENROUTER_API_KEY=sk-or-v1-YOUR_KEY" >> .env.local
```

### 5. Start Development Server

```bash
npm run dev
```

Server runs at http://localhost:3000

## Development Workflow

### Making Changes

1. **Make your changes** in the relevant files
   - `/app/page.tsx` — Main UI component
   - `/app/api/optimize/route.ts` — API logic
   - `/app/globals.css` — Styling
   - `/tailwind.config.ts` — Design tokens

2. **Test locally**
   ```bash
   npm run dev
   # Open http://localhost:3000
   # Test your changes manually
   ```

3. **Check for errors**
   ```bash
   npm run build
   npm run lint
   ```

### Coding Standards

- **TypeScript:** Use strict mode (`true` in tsconfig.json)
- **Components:** Prefer functional components with hooks
- **Styling:** Use Tailwind CSS, avoid inline styles
- **Error Handling:** Always handle errors gracefully
- **Comments:** Add comments for complex logic
- **Naming:** Use descriptive variable and function names

### Example: Adding a New Feature

**Feature: Dark/Light Mode Toggle**

1. **Create component** (`/app/components/ThemeToggle.tsx`):
   ```typescript
   'use client';
   export default function ThemeToggle() {
     // Implementation
   }
   ```

2. **Add to main page** (`/app/page.tsx`):
   ```typescript
   import ThemeToggle from '@/app/components/ThemeToggle';
   
   export default function Home() {
     return (
       <>
         <ThemeToggle />
         {/* rest of app */}
       </>
     );
   }
   ```

3. **Test locally**: `npm run dev`

4. **Build to check for errors**: `npm run build`

5. **Commit**: `git commit -m "feat: add dark/light mode toggle"`

6. **Push**: `git push origin feature/dark-mode`

7. **Create PR** on GitHub

## Submitting Changes

### 1. Commit with Clear Messages

Follow conventional commits:

```bash
# Features
git commit -m "feat: add prompt history feature"

# Bug fixes
git commit -m "fix: copy button not working on mobile"

# Documentation
git commit -m "docs: update API examples"

# Style/format changes
git commit -m "style: format code with prettier"

# Refactoring
git commit -m "refactor: optimize API route performance"
```

### 2. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 3. Create a Pull Request

On GitHub:
1. Navigate to your fork
2. Click "Pull requests" → "New pull request"
3. Select your feature branch
4. Write a clear PR description:
   ```markdown
   ## Summary
   Brief description of what this PR does.

   ## Changes
   - Feature or fix 1
   - Feature or fix 2

   ## Testing
   How to test these changes locally.

   ## Related Issues
   Closes #123
   ```

5. Click "Create pull request"

### 4. Respond to Feedback

- Address review comments
- Make requested changes
- Push new commits (no need to recreate PR)

## Types of Contributions

### 🎨 UI/UX Improvements

- Button animations
- Responsive design fixes
- Accessibility improvements
- New icons or layouts

**Files:** `app/page.tsx`, `app/globals.css`, `tailwind.config.ts`

### 🚀 Performance Optimizations

- Reduce bundle size
- Optimize API calls
- Improve page load time
- Cache improvements

**Files:** `app/api/optimize/route.ts`, `next.config.js`

### 🐛 Bug Fixes

- Copy button issues
- Input validation problems
- CSS rendering bugs
- Error handling

**Files:** Any file with the bug

### 📚 Documentation

- API examples
- Deployment guides
- Setup instructions
- Code comments

**Files:** `README.md`, `API.md`, `DEPLOYMENT.md`, inline comments

### 🧪 Tests & Quality

- Unit tests
- Integration tests
- Type safety improvements

**Files:** New `.test.ts` files

### ✨ New Features

- Prompt templates
- History/favorites
- Export/import
- Different models UI

**Files:** Core app files + new components

## Testing

### Local Testing

```bash
# Start dev server
npm run dev

# Test the app in browser
# Try:
# - Empty input validation
# - Submit a prompt
# - Copy button
# - Responsive on mobile
```

### Build Testing

```bash
# Check for TypeScript/build errors
npm run build

# Check linting
npm run lint
```

### Performance Testing

- Run `npm run build` and check bundle size
- Use Chrome DevTools Lighthouse
- Test on slower network (DevTools → Network → Slow 3G)

## Common Tasks

### Update Dependencies

```bash
npm outdated  # Check for updates
npm update    # Update packages
npm install   # Reinstall
npm run build # Test build
```

### Add a New npm Package

```bash
npm install package-name
git add package.json package-lock.json
git commit -m "feat: add package-name dependency"
```

**Before adding packages:** Ensure it's necessary and check bundle size impact.

### Fix Linting Errors

```bash
npm run lint
# Fix errors shown, then test:
npm run build
```

## Project Structure Review

```
app/
├── api/optimize/route.ts     # API endpoint - core logic
├── layout.tsx                 # Root layout, metadata
├── page.tsx                   # Main UI component
└── globals.css                # Global styles

tailwind.config.ts            # Design tokens & colors
next.config.js                # Next.js config
package.json                  # Dependencies & scripts

README.md                      # Main documentation
API.md                         # API docs
DEPLOYMENT.md                 # Deployment guide
```

### When to Edit Which File

| Change | File(s) |
|--------|---------|
| UI layout/structure | `app/page.tsx` |
| Button behavior, form handling | `app/page.tsx` |
| API logic, model selection | `app/api/optimize/route.ts` |
| CSS styles, animations | `app/globals.css` |
| Colors, fonts, spacing | `tailwind.config.ts` |
| Project metadata, title | `app/layout.tsx` |

## Design System

Prompt Rock uses Tailwind CSS with custom colors defined in `tailwind.config.ts`:

- **Primary:** `#c6c0ff` (violet) — Use for CTAs, active states
- **Background:** `#131315` (dark) — Main canvas
- **Surface variants:** Multiple container colors for depth
- **Text:** `#e5e1e4` — Main text, `#c8c4d6` — muted

When styling:
- Use Tailwind classes first
- Use Tailwind color tokens: `bg-primary`, `text-on-surface`
- Avoid hardcoded colors
- Reference `tailwind.config.ts` for the complete palette

## Performance Guidelines

- ⚡ Keep component re-renders minimal (use `useMemo`, `useCallback`)
- 📦 Avoid adding large libraries (check bundle size)
- 🚀 Optimize images and assets
- 🔄 Minimize API calls
- 💾 Use localStorage for temporary data only

## Security Considerations

- 🔒 Never expose API keys in client code
- 🌐 Validate all user inputs
- 🔐 Use HTTPS for all external requests
- 📝 Log errors securely (no sensitive data)
- 🛡️ Keep dependencies updated

## Documentation Standards

When adding features, update:

1. **README.md** — Add to Features or How to Use
2. **API.md** — If modifying API
3. **Inline comments** — For complex logic
4. **JSDoc comments** — For exported functions

Example:
```typescript
/**
 * Optimizes a prompt using OpenRouter API
 * @param prompt - The raw prompt to optimize
 * @returns Optimized prompt and selected format
 */
export async function optimizePrompt(prompt: string) {
  // ...
}
```

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type:** feat, fix, docs, style, refactor, test, chore
**Scope:** Component or feature name (optional)
**Subject:** Imperative mood, lowercase, no period
**Body:** Explain what and why (optional)
**Footer:** Reference issues (e.g., "Closes #123")

**Examples:**
```
feat(api): add token limit checking
fix(ui): resolve copy button on mobile
docs: update deployment guide
refactor(optimize): reduce function complexity
```

## Review Process

- **Timeline:** 1-3 days for review
- **Feedback:** Constructive and actionable
- **Approval:** Usually within 2-5 comments
- **Merge:** Maintainer will merge after approval

### Tips for Faster Approval

1. ✅ Write clear PR description
2. ✅ Keep PRs focused (one feature per PR)
3. ✅ Follow coding standards
4. ✅ Test thoroughly
5. ✅ Document changes
6. ✅ Respond promptly to feedback

## Resources

- **Next.js Docs:** https://nextjs.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **TypeScript:** https://www.typescriptlang.org/docs
- **OpenRouter API:** https://openrouter.ai/docs
- **React Hooks:** https://react.dev/reference/react/hooks

## Questions or Issues?

- 📧 Email: contact@xenon.dev
- 💬 GitHub Discussions: Ask here for questions
- 🐛 GitHub Issues: Report bugs or request features
- 📚 Check README.md, API.md, and DEPLOYMENT.md first

## Recognition

Contributors will be:
- Listed in this CONTRIBUTING.md file
- Mentioned in commit messages
- Acknowledged in release notes

Thank you for making Prompt Rock better! 🚀

---

**Happy coding!**
