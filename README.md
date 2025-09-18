# AI Recruitment Platform - Frontend

A modern Next.js frontend for the AI-driven recruitment platform.

## Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling (add when configured)
- **Responsive Design** for all devices
- **Authentication** integration
- **Real-time Updates** 
- **Modern UI/UX** components

## Quick Start

### Local Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   ```bash
   # If you have an example file create from it, else create manually
   touch .env.local
   # Edit .env.local with your configuration
   ```

   Minimum variable (defaults exist in code):
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:8001
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

   Open http://localhost:3000 in your browser.

### Vercel Deployment

#### Option 1: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

#### Option 2: Deploy via GitHub Integration

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "feat: initial frontend"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com
   - Import your GitHub repository
   - Configure environment variables
   - Deploy automatically

## Environment Variables

Set these in your Vercel dashboard or `.env.local`:

```bash
NEXT_PUBLIC_API_URL=https://your-backend-api.com
```

(Only NEXT_PUBLIC_API_URL is referenced currently in `app/lib/auth.ts` and `app/lib/apiBase.ts`.)

## Project Structure (excerpt)

```
app/
  admin/
  jobs/
  login/
  pipeline/
  search/
  settings/
  layout.tsx
  page.tsx
app/lib/
components/
package.json
next.config.js
vercel.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Backend Integration

The frontend connects to the backend via:
- API base URL from `NEXT_PUBLIC_API_URL`
- Auth token cookie management in `app/lib/auth.ts`

## Development Tips

1. Keep dependencies updated.
2. Use TypeScript strictness for fewer runtime errors.
3. Add tests as logic grows.
4. Consider adding Tailwind or another styling system if needed.

## Production Checklist

- Set environment variables
- `npm run build` succeeds
- Use a CDN (handled automatically by Vercel)
- Monitor logs & performance

## Support

If issues occur:
- Check network calls (browser devtools)
- Verify `NEXT_PUBLIC_API_URL`
- Inspect server logs
- Confirm auth token presence
