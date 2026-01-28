# 🚀 SEO Implementation - Quick Command Reference

## Installation Commands

```bash
# Navigate to frontend directory
cd frontend

# Install React Helmet
npm install react-helmet-async

# Verify installation
npm list react-helmet-async
```

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment Commands

```bash
# Stage changes
git add .

# Commit with message
git commit -m "feat: add comprehensive SEO implementation"

# Push to main branch (auto-deploys to Vercel)
git push origin main

# Check deployment status on Vercel
# Visit: https://vercel.com/your-dashboard
```

## Testing Commands

```bash
# Test locally before deployment
npm run dev

# Open in browser
# http://localhost:5173

# Inspect SEO in browser
# Right-click → Inspect → Head section
# Or use Lighthouse in DevTools
```

## Post-Deployment Commands

### Google Search Console
1. Visit: https://search.google.com/search-console
2. Add property: `https://campus-career.vercel.app`
3. Verify via HTML tag
4. Submit sitemap: `https://campus-career.vercel.app/sitemap.xml`

### Bing Webmaster Tools
1. Visit: https://www.bing.com/webmaster
2. Add site: `https://campus-career.vercel.app`
3. Verify ownership
4. Submit sitemap

### Google Analytics
```html
<!-- Add to index.html after </title> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## File Modification Commands

### View SEO Files
```bash
# List all SEO files
Get-ChildItem -Recurse -Filter "*SEO*" -ErrorAction SilentlyContinue

# View specific file
cat frontend/src/config/seoConfig.js

# View robots.txt
cat frontend/public/robots.txt
```

### Edit Files
```bash
# Open in VS Code
code frontend/src/config/seoConfig.js
code frontend/index.html
code frontend/src/components/SEO.jsx
```

## Step-by-Step Implementation

### Step 1: Install Dependencies
```bash
cd c:\Users\User\c-c\frontend
npm install react-helmet-async
```

### Step 2: Verify Installation
```bash
npm list | grep "react-helmet-async"
```

### Step 3: Test Locally
```bash
npm run dev
# Open http://localhost:5173 in browser
# Press F12 → Inspector → Head section
# Verify meta tags are present
```

### Step 4: Update Configuration
```bash
# Edit this file with your info
code src/config/seoConfig.js

# Update:
# - organization.name
# - organization.email
# - organization.phone
# - social media handles
```

### Step 5: Add SEO to Pages
```bash
# For each page component:
# 1. Copy template from:
code src/pages/TEMPLATE_PAGE_WITH_SEO.jsx

# 2. Add to page config:
code src/config/seoConfig.js

# 3. Implement in page:
code src/pages/[YourPage].jsx
```

### Step 6: Create OG Image
```bash
# Create 1200x630px image
# Save as: frontend/public/og-image.png

# Update reference in:
code index.html

# Change: /og-image-placeholder.svg
# To: /og-image.png
```

### Step 7: Build & Deploy
```bash
# Build production version
npm run build

# Push to GitHub
git add .
git commit -m "feat: add SEO implementation"
git push origin main

# Vercel auto-deploys
# Check status: https://vercel.com/dashboard
```

### Step 8: Submit to Search Engines
```bash
# After deployment succeeds:
# 1. Visit: https://search.google.com/search-console
# 2. Add property: https://campus-career.vercel.app
# 3. Submit sitemap at: /sitemap.xml

# 4. Visit: https://www.bing.com/webmaster
# 5. Add site and verify
# 6. Submit sitemap
```

### Step 9: Setup Analytics
```bash
# Create Google Analytics account at:
# https://analytics.google.com

# Get measurement ID: G-XXXXXXXXXX

# Add to index.html <head> section
```

### Step 10: Monitor
```bash
# Check rankings daily/weekly at:
# - Google Search Console
# - Google Analytics
# - PageSpeed Insights
```

## Useful Keyboard Shortcuts

```bash
# In Terminal:
Ctrl+C   = Stop development server
Ctrl+L   = Clear terminal
Ctrl+D   = Exit terminal

# In VS Code:
Ctrl+F   = Find
Ctrl+H   = Find & Replace
Ctrl+B   = Toggle sidebar
F12      = Open DevTools
```

## Environment Setup

### System Requirements
- Node.js 18+ ✅
- npm 9+ ✅
- Git ✅
- VS Code (recommended)

### Verify Node Installation
```bash
node --version
npm --version
git --version
```

### Git Configuration (First Time Only)
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Troubleshooting Commands

### If npm install fails:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -r node_modules

# Delete package-lock.json
del package-lock.json

# Reinstall
npm install
```

### If build fails:
```bash
# Check for errors
npm run build -- --verbose

# View full error messages
npm run build 2>&1
```

### If deployment fails:
```bash
# Check git status
git status

# View git log
git log --oneline -10

# Push specific branch
git push origin main -f
```

## Useful npm Commands

```bash
# Check installed packages
npm list

# Check for outdated packages
npm outdated

# Update all packages
npm update

# Check for security vulnerabilities
npm audit

# Fix vulnerabilities automatically
npm audit fix
```

## File Management Commands

### Create necessary directories (if missing)
```bash
# Create directories
mkdir -p frontend/src/config
mkdir -p frontend/src/components
mkdir -p frontend/public

# Verify structure
tree frontend/src
```

### Check file sizes
```bash
# Size of bundle
du -sh frontend/dist/

# Size of specific file
ls -lh frontend/src/config/seoConfig.js
```

## Performance Testing Commands

```bash
# Lighthouse in Chrome DevTools
# F12 → Lighthouse → Generate report

# PageSpeed Insights online
# https://pagespeed.web.dev

# Mobile-Friendly Test
# https://search.google.com/test/mobile-friendly
```

## Daily Workflow

```bash
# Morning: Start dev server
cd frontend && npm run dev

# Development: Edit files in VS Code
# Files auto-reload in browser

# Before commit: Build production version
npm run build

# Commit changes
git add .
git commit -m "describe changes"
git push origin main

# After deploy: Verify on Vercel
# Visit: https://campus-career.vercel.app

# Check Search Console daily
# https://search.google.com/search-console
```

## Common Task Sequences

### Add SEO to a New Page
```bash
# 1. Copy template
cp TEMPLATE_PAGE_WITH_SEO.jsx MyNewPage.jsx

# 2. Edit configuration
code src/config/seoConfig.js
# Add: pages: { myNewPage: { ... } }

# 3. Edit page component
code src/pages/MyNewPage.jsx
# Import SEO and configure

# 4. Test
npm run dev

# 5. Deploy
npm run build
git add .
git commit -m "add SEO to MyNewPage"
git push origin main
```

### Update Meta Tags
```bash
# Edit configuration
code src/config/seoConfig.js

# Update page config
# Save file (auto-reloads in browser)

# Test in browser
# F12 → Inspector → Head

# Commit
git add .
git commit -m "update SEO metadata"
git push origin main
```

### Monitor Organic Traffic
```bash
# Weekly check:
# 1. Open Google Search Console
# 2. Check "Performance"
# 3. Note: Impressions, Clicks, CTR, Position

# Monthly review:
# 1. Google Analytics
# 2. Check organic traffic source
# 3. Identify top pages
# 4. Analyze user behavior
```

## Quick Reference: What to Run When

| Situation | Command | When |
|-----------|---------|------|
| First time | `npm install` | Once only |
| Development | `npm run dev` | Daily |
| Before deploy | `npm run build` | Before commit |
| Deploy | `git push origin main` | Ready to go live |
| Check errors | `npm run lint` | When debugging |
| Update one package | `npm install package-name` | When adding features |

## Environment Variables (If Needed)

```bash
# Create .env file in frontend/
# Add: VITE_BASE_URL=https://campus-career.vercel.app

# In seoConfig.js:
# baseURL: process.env.VITE_BASE_URL || 'https://...'
```

## Helpful Links to Bookmark

```
GitHub: https://github.com/your-username/your-repo
Vercel: https://vercel.com/dashboard
Google Search Console: https://search.google.com/search-console
Google Analytics: https://analytics.google.com
PageSpeed Insights: https://pagespeed.web.dev
```

## Final Verification Checklist

```bash
# Before each deployment, verify:

# 1. Code builds
npm run build ✅

# 2. No errors
npm run lint ✅

# 3. All files modified
git status ✅

# 4. Meaningful commit message
git log --oneline -1 ✅

# 5. Ready to push
git push origin main ✅

# 6. Deployment in progress
Visit: https://vercel.com/dashboard ✅

# 7. Verify live
Visit: https://campus-career.vercel.app ✅
```

---

**Pro Tip:** Save this file and reference it when running commands. Most tasks are just copy-paste away! 💪

*Last Updated: January 28, 2026*
