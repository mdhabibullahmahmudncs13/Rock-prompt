# Deployment Guide

This guide covers deploying Prompt Rock to production on Vercel, the recommended hosting platform.

## Prerequisites

- ✅ Project cloned and tested locally with `npm run dev`
- ✅ Active OpenRouter account with API key
- ✅ Vercel account (free tier at [vercel.com](https://vercel.com))
- ✅ Git repository initialized (for pushing to Vercel)

## Quick Start (5 minutes)

### 1. Push code to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/prompt-rock-xenon.git
git push -u origin main
```

### 2. Deploy on Vercel

```bash
npm install -g vercel
vercel --prod
```

### 3. Add environment variables

When prompted, add your `OPENROUTER_API_KEY`:

```bash
vercel env add OPENROUTER_API_KEY
# Paste your key when prompted
```

Or add via Vercel dashboard:
1. Go to your project settings
2. Click "Environment Variables"
3. Add `OPENROUTER_API_KEY = sk-or-v1-...`

### 4. Redeploy with env vars

```bash
vercel --prod
```

Your app is now live! 🚀

---

## Detailed Setup

### Option A: Deploy from GitHub (Recommended)

**Benefits:** Auto-deploys on push, more control, GitHub integration

#### Step 1: Prepare your Git repository

```bash
# In your project directory
git init
git add .
git commit -m "Initial commit: Prompt Rock v1.0.0"
git remote add origin https://github.com/YOUR_USERNAME/prompt-rock-xenon.git
git branch -M main
git push -u origin main
```

#### Step 2: Connect to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Paste your repo URL: `https://github.com/YOUR_USERNAME/prompt-rock-xenon.git`
4. Select "Next.js" as the framework (auto-detected)
5. Click "Deploy"

#### Step 3: Add environment variables

After first deployment (will fail due to missing API key):

1. Go to your project on vercel.com
2. Click "Settings" → "Environment Variables"
3. Add:
   - **Name:** `OPENROUTER_API_KEY`
   - **Value:** `sk-or-v1-YOUR_KEY_HERE`
   - **Environments:** Production, Preview, Development
4. Click "Save"

#### Step 4: Redeploy

1. Click "Deployments" tab
2. Click the latest failed deployment
3. Click "Redeploy"

Or just push a new commit:
```bash
git commit --allow-empty -m "Trigger redeploy"
git push
```

Your app is now live with auto-deployments on every push to main!

---

### Option B: CLI Deploy (Quick testing)

**Benefits:** Fast, good for testing, no GitHub needed

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to project
cd prompt-rock-xenon

# Deploy (prompts for env vars)
vercel --prod
```

Follow the CLI prompts:
- Scope: Select your Vercel account
- Project name: `prompt-rock-xenon`
- Build settings: Accept defaults
- Environment variables: Add `OPENROUTER_API_KEY`

---

## Environment Variables Setup

### Add via Vercel Dashboard

1. **Navigate to Environment Variables**
   - Project → Settings → Environment Variables

2. **Add new variable**
   - Name: `OPENROUTER_API_KEY`
   - Value: `sk-or-v1-YOUR_ACTUAL_KEY_HERE`
   - Environments: Check all (Production, Preview, Development)
   - Click "Save"

3. **Verify in deployed logs**
   - Deployments → Click latest → Logs
   - You should see "Environments: .env.local" loaded

### Add via Vercel CLI

```bash
vercel env add OPENROUTER_API_KEY
```

Then paste your key when prompted.

List all env vars:
```bash
vercel env list
```

Remove an env var:
```bash
vercel env remove OPENROUTER_API_KEY
```

---

## Getting Your OpenRouter API Key

1. Go to [console.openrouter.ai](https://console.openrouter.ai)
2. Sign up or log in
3. Navigate to "API Keys"
4. Click "Generate New Key"
5. Copy the key (starts with `sk-or-v1-`)
6. Add to Vercel environment variables

**Keep your key secret!** Never commit it to git or expose in code.

---

## Post-Deployment Checks

### 1. Verify deployment is live

```bash
curl https://YOUR_DEPLOYMENT_URL.vercel.app/api/optimize \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Test prompt"}'
```

Should return:
```json
{
  "optimized": "Refined prompt",
  "format": "TXT"
}
```

### 2. Check the web UI

Open https://YOUR_DEPLOYMENT_URL.vercel.app in your browser. You should see:
- Header with "Prompt Rock" and logo
- Textarea for input
- "Optimize Prompt" button
- All styling intact

### 3. Test end-to-end

1. Paste a prompt in the textarea
2. Click "Optimize Prompt"
3. Wait 2-10 seconds
4. Verify optimized output appears
5. Test "Copy" button

### 4. Review logs

Check deployment logs for errors:

```bash
vercel logs YOUR_DEPLOYMENT_URL
```

Or via dashboard:
- Deployments → Click latest → "Functions" tab → Click `/api/optimize`

---

## Custom Domain

### Configure a custom domain

1. **Vercel Dashboard**
   - Project → Settings → Domains
   - Click "Add Domain"
   - Enter your domain (e.g., `prompt-rock.com`)

2. **Update your domain's DNS**
   - Set CNAME to: `cname.vercel.sh`
   - Or use Vercel's nameservers

3. **Verify and enable SSL**
   - Vercel automatically provides free SSL certificate
   - Wait 5-30 minutes for propagation

Your app is now at `https://prompt-rock.com`

---

## Monitoring & Logs

### View deployment logs

```bash
# Latest deployment
vercel logs

# Specific deployment
vercel logs URL
```

### Monitor function execution

1. Go to your project on vercel.com
2. Click "Deployments" → Latest → "Functions"
3. Click `/api/optimize` to see:
   - Invocations
   - Duration
   - Errors
   - Memory usage

### Set up alerts

Vercel Pro includes:
- Email alerts on failed deployments
- Performance metrics
- Real-time monitoring

---

## Troubleshooting Deployment

### Error: "OPENROUTER_API_KEY is not set"

**Solution:** Add the environment variable to Vercel:

```bash
vercel env add OPENROUTER_API_KEY
# Paste your key
vercel --prod
```

Verify it was added:
```bash
vercel env list
```

### Error: "Function body bigger than 6MB"

**Solution:** This shouldn't happen with Prompt Rock, but if it does:
- Check node_modules aren't included (they aren't by default)
- Run `npm run build` locally to verify size

### Error: "Timeout exceeded 30 seconds"

**Solution:**
- Try with a shorter prompt
- Check OpenRouter service status
- Increase timeout in `app/api/optimize/route.ts`:
  ```typescript
  export const maxDuration = 60; // Max 60s on Pro plan
  ```

### Error: "Cannot find module"

**Solution:** Ensure all dependencies were installed:

```bash
npm install
git add package-lock.json
git push
```

Vercel will automatically run `npm install` during build.

### Build fails locally but not on Vercel

Run `vercel build` to simulate Vercel's build environment:

```bash
vercel build
npm run start
```

---

## Advanced Configuration

### Customize Vercel deployment

Edit `vercel.json` in your project root:

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "env": {
    "OPENROUTER_API_KEY": "@openrouter-api-key"
  }
}
```

### Environment-specific variables

Add different values per environment:

```bash
vercel env add OPENROUTER_API_KEY --environment=production
vercel env add OPENROUTER_API_KEY --environment=preview
vercel env add OPENROUTER_API_KEY --environment=development
```

### Scheduled deployments

Enable auto-deployment on schedule:

1. Vercel Dashboard → Settings → Git
2. Enable "Auto-deploy on commit"
3. Select branch (e.g., `main`)

Now every push to `main` triggers a new deployment.

---

## Cost Estimation

### Vercel Hosting (Free Tier)

- **Invocations:** 1M per month free
- **Data transfer:** 100GB/month included
- **Function execution time:** 1M seconds/month
- **Cost:** $0 for personal projects

For Prompt Rock usage (~5s per request):
- 200K optimizations/month = $0 (free tier)
- 500K optimizations/month = ~$20 (Pro plan)

### OpenRouter API Costs

Varies by model:
- **Mistral 7B:** $0.14 per 1M output tokens (~5-10¢ per optimization)
- **Llama 3.1 8B:** $0.14 per 1M output tokens
- **Input tokens:** Cheaper than output

Estimate: $0.10-$0.50 per optimization depending on prompt length.

---

## Rollback a Deployment

If something breaks:

```bash
# List recent deployments
vercel deployments list

# Rollback to previous
vercel rollback
```

Or via dashboard:
- Deployments → Click an older version → "Promote to Production"

---

## Performance Optimization

### Monitor build times

```bash
vercel analytics enable
```

Then view analytics on vercel.com/your-project/analytics

### Enable caching

Next.js automatically caches static assets. For dynamic routes, configure:

```typescript
// In route handlers
export const revalidate = 60; // Revalidate every 60 seconds
```

### Reduce bundle size

Check current size:
```bash
npm run build
```

The output shows:
```
Route (app)                              Size     First Load JS
┌ ○ /                                    2.43 kB        89.7 kB
├ ○ /_not-found                          873 B          88.1 kB
└ ƒ /api/optimize                        0 B                0 B
```

---

## Next Steps

- ✅ Deploy to Vercel
- ✅ Add custom domain
- ✅ Set up monitoring and alerts
- ✅ Monitor API key usage on OpenRouter
- 📧 Set up email notifications for failed deployments
- 📊 Track optimization usage with analytics
- 🔄 Set up auto-deploys on git push

---

## Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **OpenRouter Docs:** https://openrouter.ai/docs
- **GitHub Issues:** Create an issue if you encounter problems

Ready to deploy? Start with **Option A** (GitHub) for the best experience!
