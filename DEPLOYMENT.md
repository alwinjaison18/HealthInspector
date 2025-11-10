# HealthInspector - Universal Deployment Guide

This project can be deployed on **any platform** that supports:

- **Frontend**: Static site hosting (Vercel, Netlify, GitHub Pages, AWS S3, etc.)
- **Backend**: Python/FastAPI hosting (Railway, Render, Heroku, AWS, DigitalOcean, etc.)

---

## 📂 Project Structure

```
HealthInspector/
├── frontend/              # React + Vite frontend
│   ├── src/
│   ├── dist/             # Build output
│   ├── .env.example      # Environment variables template
│   └── package.json
├── backend/              # FastAPI backend
│   ├── main.py
│   ├── requirements.txt
│   └── services/
└── README.md
```

---

## 🚀 Deployment Options

### **Option 1: Deploy Both on Same Platform**

#### **Vercel (Recommended)**

1. Push code to GitHub
2. Connect repository to Vercel
3. Configure:
   - **Framework**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Environment Variable**: `VITE_API_URL=https://your-backend.vercel.app`
4. Deploy backend separately or use Vercel serverless functions

#### **Render**

1. Create two services:
   - **Web Service** (Backend):
     - Build Command: `pip install -r requirements.txt`
     - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Static Site** (Frontend):
     - Build Command: `npm run build`
     - Publish Directory: `dist`
     - Environment Variable: `VITE_API_URL=https://your-backend.onrender.com`

---

### **Option 2: Separate Frontend & Backend**

#### **Frontend Platforms:**

- **Vercel**: Zero-config deployment
- **Netlify**: Automatic builds from Git
- **GitHub Pages**: Free static hosting
- **AWS S3 + CloudFront**: Scalable CDN
- **Firebase Hosting**: Google's platform

#### **Backend Platforms:**

- **Railway**: Simple Python hosting
- **Render**: Free tier available
- **Heroku**: Popular PaaS
- **AWS EC2**: Full control
- **DigitalOcean**: Droplets or App Platform
- **PythonAnywhere**: Python-specific hosting

---

## 🔧 Setup Instructions

### **Backend Setup**

1. **Install Dependencies**

   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Run Locally**

   ```bash
   python -m uvicorn main:app --reload --port 8000
   ```

3. **Deploy Backend**
   - Choose your platform (Railway, Render, etc.)
   - Set environment variables if needed
   - Deploy using platform-specific instructions
   - Note your backend URL: `https://your-backend-url.com`

### **Frontend Setup**

1. **Install Dependencies**

   ```bash
   cd frontend
   npm install
   ```

2. **Configure Environment**

   ```bash
   # Copy example file
   cp .env.example .env

   # Edit .env and set your backend URL
   VITE_API_URL=https://your-backend-url.com
   ```

3. **Build for Production**

   ```bash
   npm run build
   ```

4. **Deploy Frontend**
   - Choose your platform (Vercel, Netlify, etc.)
   - Set `VITE_API_URL` environment variable
   - Deploy the `dist` folder

---

## 🌍 Platform-Specific Examples

### **Railway (Backend)**

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Deploy
railway up
```

**Procfile** (create in backend folder):

```
web: uvicorn main:app --host 0.0.0.0 --port $PORT
```

### **Vercel (Frontend)**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel --prod

# Set environment variable
vercel env add VITE_API_URL
```

### **Docker Deployment**

**Backend Dockerfile**:

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

**Frontend Dockerfile**:

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
```

---

## 🔑 Environment Variables

### **Frontend**

- `VITE_API_URL`: Backend API URL (e.g., `https://api.example.com`)

### **Backend** (if needed)

- `PORT`: Port number (usually provided by hosting platform)
- `ALLOWED_ORIGINS`: CORS origins (optional, currently set to `*`)

---

## 📝 Deployment Checklist

- [ ] Backend deployed and accessible
- [ ] Backend URL noted
- [ ] Frontend `.env` configured with backend URL
- [ ] Frontend built successfully (`npm run build`)
- [ ] Frontend deployed
- [ ] CORS configured on backend (allow frontend domain)
- [ ] Test product search functionality
- [ ] Check browser console for errors
- [ ] Verify API calls are reaching backend

---

## 🐛 Troubleshooting

### **CORS Errors**

Update `backend/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-frontend-domain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### **API Not Connecting**

1. Check browser console for exact error
2. Verify `VITE_API_URL` is set correctly
3. Test backend directly: `https://your-backend-url.com/`
4. Ensure backend is running and accessible

### **Build Errors**

1. Delete `node_modules` and reinstall: `npm install`
2. Clear cache: `npm run build -- --force`
3. Check Node version: `node --version` (should be 18+)

---

## 🎯 Recommended Stacks

### **Quick & Easy**

- **Frontend**: Vercel
- **Backend**: Railway or Render
- **Cost**: Free tier available

### **Scalable**

- **Frontend**: AWS S3 + CloudFront
- **Backend**: AWS ECS or Lambda
- **Cost**: Pay as you go

### **Budget**

- **Frontend**: GitHub Pages
- **Backend**: PythonAnywhere or Render (free tier)
- **Cost**: Free (with limitations)

---

## 📚 Additional Resources

- [FastAPI Deployment](https://fastapi.tiangolo.com/deployment/)
- [Vite Deployment](https://vitejs.dev/guide/static-deploy.html)
- [Railway Docs](https://docs.railway.app/)
- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)

---

## 🆘 Support

If you encounter issues:

1. Check browser console for errors
2. Verify environment variables
3. Test backend independently
4. Check CORS configuration
5. Review platform-specific logs
