---
sidebar_position: 5
title: "Stage 5: Deployed App"
description: "Deploying the Lemonade Stand to production — hosting, configuration, and CI/CD"
---

# Stage 5: Deployed App

**Deploying the Lemonade Stand to production — hosting, configuration, and CI/CD**

---

## Learning Objectives

By the end of this stage, you will:

- Understand production vs development environments
- Configure environment variables properly
- Deploy frontend and backend to hosting platforms
- Set up CI/CD with GitHub Actions
- Monitor your deployed application
- Handle production database concerns

**Time**: 3-4 hours (reading + deploying)

---

## Introduction

Your lemonade stand works on `localhost`. But that's just your computer. To share it with the world, you need to **deploy** it.

Deployment means:
- Your code runs on someone else's servers
- It has a public URL anyone can access
- It stays running 24/7 (ideally)
- It scales if traffic increases

This stage covers the practical steps to go from localhost to live.

---

## Architecture: Production

### Development Architecture

```
Your Computer
├── Frontend (localhost:5173)
├── Backend (localhost:3001)
└── SQLite (./data/lemonade.db)
```

### Production Architecture

```
Internet
    │
    ├── Frontend (vercel.app / netlify.app)
    │   └── Static files served from CDN
    │
    └── Backend (railway.app / render.com)
        ├── Express server
        └── SQLite / PostgreSQL database
```

**Key difference**: Frontend and backend are separate services with separate URLs.

---

## Part 1: Environment Configuration

### Why Environment Variables?

Different environments need different values:

| Variable | Development | Production |
|----------|-------------|------------|
| API URL | `localhost:3001` | `api.yourdomain.com` |
| Database | Local SQLite file | Managed database |
| Debug mode | Enabled | Disabled |
| CORS origin | `localhost:5173` | `yourdomain.com` |

**Never hardcode these values.**

### Frontend Environment Variables

Create `client/.env.development`:
```bash
VITE_API_URL=http://localhost:3001/api
```

Create `client/.env.production`:
```bash
VITE_API_URL=https://your-backend.railway.app/api
```

Access in code:
```javascript
const API_URL = import.meta.env.VITE_API_URL;
```

Note: Vite requires `VITE_` prefix for exposed variables.

### Backend Environment Variables

Create `server/.env`:
```bash
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
DATABASE_URL=./data/lemonade.db
```

Load with dotenv:
```javascript
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';
```

### Production Environment Variables

Set these in your hosting platform's dashboard — never commit production secrets to git.

```bash
# .gitignore
.env
.env.local
.env.production.local
```

---

## Part 2: Preparing for Deployment

### Frontend Build

```bash
cd client
npm run build
```

This creates `dist/` folder with optimized static files.

### Backend Preparation

Update `server/src/index.js` for production:

```javascript
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',')
    : '*',
  credentials: true
};
app.use(cors(corsOptions));

app.use(express.json());

// API routes
app.use('/api/orders', require('./routes/orders'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    environment: NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message
  });
});

app.listen(PORT, () => {
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
});
```

### Package.json Scripts

```json
{
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "build": "echo 'No build step required'"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

---

## Part 3: Deploying Frontend

### Option 1: Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Configure:
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add environment variable: `VITE_API_URL`
6. Deploy

### Option 2: Netlify

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Add new site from Git
4. Configure:
   - Base directory: `client`
   - Build command: `npm run build`
   - Publish directory: `client/dist`
5. Add environment variable
6. Deploy

### SPA Routing Fix

Create `client/public/_redirects` (Netlify):
```
/*    /index.html   200
```

Or `client/vercel.json` (Vercel):
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

This ensures client-side routing works.

---

## Part 4: Deploying Backend

### Option 1: Railway

1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub repo
3. Configure:
   - Root Directory: `server`
   - Start Command: `npm start`
4. Add environment variables:
   - `PORT` (Railway sets this automatically)
   - `NODE_ENV=production`
   - `CORS_ORIGIN=https://your-frontend.vercel.app`
5. Deploy

Railway provides:
- Automatic HTTPS
- Persistent storage for SQLite
- Easy scaling

### Option 2: Render

1. Go to [render.com](https://render.com)
2. New → Web Service
3. Connect GitHub repository
4. Configure:
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add environment variables
6. Deploy

### Database Considerations

**SQLite in production:**
- Works for low traffic
- Data stored on single server
- Lost if server restarts (on some platforms)

**For persistence on Railway/Render:**
- Use their volume/disk features
- Or migrate to PostgreSQL

### Migrating to PostgreSQL (Optional)

If you need better production database:

```javascript
// server/src/db/index.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: false }
    : false
});

// Update queries to use pool.query() instead of better-sqlite3
```

Most platforms offer managed PostgreSQL.

---

## Part 5: CI/CD with GitHub Actions

### What is CI/CD?

- **CI (Continuous Integration)**: Automatically test code on every push
- **CD (Continuous Deployment)**: Automatically deploy when tests pass

### Basic Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies (client)
        working-directory: ./client
        run: npm ci

      - name: Build client
        working-directory: ./client
        run: npm run build
        env:
          VITE_API_URL: ${{ secrets.VITE_API_URL }}

      - name: Install dependencies (server)
        working-directory: ./server
        run: npm ci

      # Add test steps here when you have tests
      # - name: Run tests
      #   run: npm test

  # Deployment happens automatically via Vercel/Railway GitHub integration
  # Or you can add deploy steps here
```

### Setting Up Secrets

In GitHub repository → Settings → Secrets and variables → Actions:

- Add `VITE_API_URL` with your production API URL

### Auto-Deploy with Vercel/Railway

Both platforms can:
- Watch your GitHub repository
- Deploy automatically on push to main
- Run builds in their infrastructure

This is often simpler than custom GitHub Actions deployment.

---

## Part 6: Production Monitoring

### Health Checks

Your `/api/health` endpoint lets monitoring services check if your API is running:

```javascript
app.get('/api/health', (req, res) => {
  // Could also check database connection
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
```

### Basic Logging

```javascript
// Simple request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
});
```

For production, consider:
- [Pino](https://github.com/pinojs/pino) for structured logging
- Hosting platform's built-in logs
- Services like LogDNA, Papertrail

### Error Tracking

For production error monitoring:
- Sentry (free tier available)
- LogRocket
- Hosting platform error logs

Basic setup with Sentry:
```javascript
const Sentry = require('@sentry/node');
Sentry.init({ dsn: process.env.SENTRY_DSN });

app.use(Sentry.Handlers.requestHandler());
// ... routes ...
app.use(Sentry.Handlers.errorHandler());
```

---

## Part 7: Going Live Checklist

### Before Launch

- [ ] Environment variables set in production
- [ ] CORS configured correctly
- [ ] Error messages don't leak sensitive info
- [ ] Health check endpoint working
- [ ] Database persistence verified
- [ ] HTTPS enabled (usually automatic)
- [ ] Build succeeds in CI

### After Launch

- [ ] Test all functionality on production URL
- [ ] Check logs for errors
- [ ] Verify orders persist correctly
- [ ] Test on mobile devices
- [ ] Share URL and celebrate 🎉

---

## Deployment Decision Tree

```
Is it just frontend (static)?
├── Yes → Vercel, Netlify, GitHub Pages
└── No (has backend)
    ├── Simple/learning project?
    │   └── Railway, Render (free tiers)
    └── Production/scale needed?
        ├── Managed services → Heroku, Railway Pro
        └── More control → AWS, GCP, DigitalOcean
```

For learning: **Railway + Vercel** is a great free combination.

---

## Exercise 1: Deploy Frontend

Deploy your frontend to Vercel or Netlify:

1. Push code to GitHub
2. Connect repository to platform
3. Configure build settings
4. Set environment variables
5. Deploy and verify

---

## Exercise 2: Deploy Backend

Deploy your backend to Railway or Render:

1. Connect repository
2. Configure server directory
3. Set environment variables
4. Deploy and test `/api/health`
5. Update frontend `VITE_API_URL`

---

## Exercise 3: Set Up CI

Create a GitHub Actions workflow that:

1. Runs on push to main
2. Installs dependencies
3. Builds the frontend
4. (Optional) Runs tests

---

## Exercise 4: Add Monitoring

Add basic monitoring:

1. Enhance health check to include database status
2. Set up Uptime Robot (free) to ping your health endpoint
3. Get notified if your app goes down

---

## Common Issues

### CORS Errors

```
Access to fetch has been blocked by CORS policy
```

**Fix**: Ensure `CORS_ORIGIN` environment variable matches your frontend URL exactly (including `https://`).

### Mixed Content

```
Mixed Content: The page was loaded over HTTPS but requested an insecure resource
```

**Fix**: Ensure API URL uses `https://`, not `http://`.

### Build Failures

**Check**:
- Node version matches `engines` in package.json
- All dependencies in `dependencies`, not `devDependencies` (for build)
- Environment variables set in platform

### Database Resets

On some platforms, the filesystem resets on deploy.

**Fix**: Use platform's persistent disk feature or migrate to PostgreSQL.

---

## Key Takeaways

1. **Environment variables** — Configure, don't hardcode

2. **Frontend and backend separate** — Different URLs, different hosting

3. **CI/CD automates deployment** — Push to main, it deploys

4. **Start simple** — Railway + Vercel, then optimize

5. **Monitor your app** — Health checks catch problems early

6. **HTTPS everywhere** — Modern platforms handle this automatically

---

## What's Next

**Congratulations!** You've completed Part III and the entire Lemonade Stand journey!

You've built:
- Static HTML/CSS/JS (Stage 1)
- Interactive vanilla JS (Stage 2)
- React SPA (Stage 3)
- Fullstack with API and database (Stage 4)
- Production deployment (Stage 5)

**From here, you can:**
- Add features to your deployed app
- Build your own project using these patterns
- **[Explore Part IV: Historical Context](../part-4-historical-context/server-side-era)** — Understand why everything exists
- Join the DevFoundry community and build in public

---

## The Complete Journey

```
Stage 1        Stage 2        Stage 3        Stage 4        Stage 5
Static    →   Interactive  →   React    →   Fullstack  →   Deployed
HTML/CSS/JS    + State        + Components   + API/DB       + Production
   ↓              ↓              ↓              ↓              ↓
Fundamentals   Patterns      Framework     Architecture    DevOps
```

You now understand:
- How the web works at every level
- Why frameworks exist and what they solve
- Client-server architecture
- The full path from idea to production

**You can build real things. Go build them.**

---

**You've completed Part III and the DevFoundry curriculum core!** You have the foundation to build, deploy, and iterate on real software products.
