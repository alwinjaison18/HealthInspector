# HealthInspector - Netlify Deployment Guide

## 🚀 Deploy to Netlify

### Prerequisites

- GitHub account
- Netlify account (free tier works)
- Push your code to GitHub repository

### Deployment Steps

#### 1. **Connect to Netlify**

1. Go to [Netlify](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Connect to your GitHub repository
4. Select the `HealthInspector` repository

#### 2. **Configure Build Settings**

Netlify will auto-detect settings from `netlify.toml`, but verify:

- **Base directory**: `frontend`
- **Build command**: `npm run build`
- **Publish directory**: `frontend/dist`
- **Functions directory**: `netlify/functions`

#### 3. **Deploy!**

Click "Deploy site" - Netlify will:

- Install dependencies
- Build your React frontend
- Deploy serverless functions
- Provide you with a URL like `your-site.netlify.app`

#### 4. **Custom Domain (Optional)**

To deploy at `alwinjaison.me/healthinspector`:

1. In Netlify dashboard → Domain settings
2. Add custom domain: `alwinjaison.me`
3. Configure subdirectory routing if needed
4. Update DNS records as instructed by Netlify

---

## 📂 Project Structure

```
HealthInspector/
├── frontend/                 # React frontend
│   ├── src/
│   ├── dist/                # Build output (auto-generated)
│   └── package.json
├── backend/                  # Original FastAPI (for local dev)
│   └── main.py
├── netlify/
│   └── functions/           # Serverless functions
│       ├── healthcheck.py
│       ├── product.py
│       ├── search.py
│       └── requirements.txt
└── netlify.toml             # Netlify configuration
```

---

## 🔧 API Endpoints (After Deployment)

### Production (Netlify)

- Health Check: `https://your-site.netlify.app/.netlify/functions/healthcheck`
- Search Products: `https://your-site.netlify.app/.netlify/functions/search?query=coca`
- Get Product: `https://your-site.netlify.app/.netlify/functions/product/[barcode]`

### Local Development

```bash
# Terminal 1 - Run frontend
cd frontend
npm install
npm run dev

# Terminal 2 - Run backend (FastAPI)
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

---

## 🔑 Environment Variables (If Needed)

If you need environment variables:

1. Go to Netlify dashboard → Site settings → Environment variables
2. Add your variables (e.g., API keys)
3. Redeploy the site

---

## 🐛 Troubleshooting

### Functions not working?

- Check Netlify function logs in dashboard
- Verify `requirements.txt` is in `netlify/functions/`
- Ensure Python runtime is compatible (Netlify supports Python 3.8+)

### Frontend not connecting to API?

- Check browser console for errors
- Verify API endpoints in `apiService.js`
- Check CORS headers in function responses

### Build failing?

- Check build logs in Netlify dashboard
- Verify all dependencies in `package.json`
- Ensure Node.js version compatibility

---

## 📱 Features

- ✅ Frontend: React + Vite
- ✅ Backend: Serverless functions (Python)
- ✅ API: OpenFoodFacts integration
- ✅ Health Score Calculator
- ✅ Responsive design
- ✅ Auto-deployment from GitHub

---

## 🔄 Continuous Deployment

Once connected to GitHub:

1. Push changes to your repository
2. Netlify auto-detects and deploys
3. Production site updates automatically
4. Rollback available from Netlify dashboard

---

## 💡 Local Testing with Netlify CLI

Install Netlify CLI:

```bash
npm install -g netlify-cli
```

Run locally with functions:

```bash
netlify dev
```

This simulates the Netlify environment locally!

---

## 📞 Support

- [Netlify Docs](https://docs.netlify.com/)
- [Netlify Functions](https://docs.netlify.com/functions/overview/)
- [Vite Deployment](https://vitejs.dev/guide/static-deploy.html)
