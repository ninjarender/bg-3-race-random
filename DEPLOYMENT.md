# Deployment Instructions

## Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Vercel will auto-detect Vite settings
6. Click "Deploy"

## Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm install -D gh-pages
```

2. Add to `package.json` scripts:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

3. Add to `vite.config.ts`:
```typescript
base: '/bg-3-race-random/'
```

4. Deploy:
```bash
npm run deploy
```

## Deploy to Netlify

1. Push to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Select your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy"

## Environment

- Node.js 18+ recommended
- npm or yarn
- Modern browser with ES6+ support

