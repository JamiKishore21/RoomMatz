# 🚀 Deployment Guide - RoomMatz Hostel Booking System

## Overview
Your project is now ready for deployment with environment-based configuration. The application automatically uses the correct API URL based on the `NODE_ENV` setting.

---

## 📋 Environment Setup

### Development Environment (`.env.development`)
```env
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
VITE_ENV=development
```

### Production Environment (`.env.production`)
```env
VITE_API_URL=https://api.your-domain.com
VITE_SOCKET_URL=https://api.your-domain.com
VITE_ENV=production
```

---

## 🔧 Backend Configuration

### Backend `.env` File
```env
MONGO_URI="mongodb+srv://kishore:kishore@cluster0.tjjyb.mongodb.net/hostelDB?retryWrites=true&w=majority&appName=Cluster0"
EMAIL_USER=subhashtalluri68@gmail.com
EMAIL_PASS=zjug ghbj esci edbq
PORT=5000
NODE_ENV=development

# Development URLs
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:5000

# Production URLs (uncomment and update when deploying)
# FRONTEND_URL=https://your-production-domain.com
# BACKEND_URL=https://api.your-production-domain.com
```

### Update for Production
Replace the following before deploying:
- `FRONTEND_URL`: Your production frontend domain
- `BACKEND_URL`: Your production backend domain
- `MONGO_URI`: Update if using different MongoDB instance
- `NODE_ENV`: Change to `production`

---

## 🌐 Deployment Steps

### 1️⃣ **Frontend Deployment (Vercel, Netlify, AWS S3)**

#### Build for Production
```bash
cd frontend
npm install
npm run build:prod
```

This creates an optimized production build in the `dist/` folder.

#### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

Or use Vercel dashboard to connect your Git repository.

#### Deploy to Netlify
1. Connect your Git repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Set environment variables in Netlify dashboard:
   - `VITE_API_URL=https://api.your-domain.com`
   - `VITE_SOCKET_URL=https://api.your-domain.com`

#### Deploy to AWS S3 + CloudFront
```bash
# Build
npm run build

# Upload to S3
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

---

### 2️⃣ **Backend Deployment (Heroku, Railway, Render, AWS EC2)**

#### Prepare Backend
```bash
cd backend
npm install
```

#### Deploy to Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set FRONTEND_URL=https://your-frontend-domain.com
heroku config:set BACKEND_URL=https://your-app-name.herokuapp.com

# Deploy
git push heroku main
```

#### Deploy to Railway
1. Connect your Git repository to Railway
2. Set environment variables in Railway dashboard
3. Railway automatically detects Node.js and deploys

#### Deploy to Render
1. Connect your Git repository to Render
2. Build command: `npm install`
3. Start command: `node server.js`
4. Set environment variables

#### Deploy to AWS EC2
```bash
# SSH into your instance
ssh -i your-key.pem ec2-user@your-instance-ip

# Install Node.js
curl -sL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install nodejs

# Clone your repository
git clone your-repo-url
cd hotel/backend

# Install dependencies
npm install

# Create .env file with production values
nano .env

# Start with PM2 (recommended for production)
npm install -g pm2
pm2 start server.js --name "roommatz-api"
pm2 save
pm2 startup
```

---

## 🔐 CORS Configuration

The backend automatically configures CORS based on the `FRONTEND_URL` environment variable. No manual CORS setup needed!

### In `server.js`:
```javascript
const FRONTEND_URL = getFrontendURL(); // Reads from .env

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

---

## 🧪 Testing Before Deployment

### Local Testing
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Visit: `http://localhost:5173`

### Production Build Testing
```bash
# Build frontend
cd frontend
npm run build:prod

# Preview production build
npm run preview
```

### Test API Endpoints
```bash
# Test login (replace with your production URL)
curl -X POST https://api.your-domain.com/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'
```

---

## 📝 Environment Variables Checklist

### ✅ Frontend (.env.production)
- [ ] `VITE_API_URL` → Production API URL
- [ ] `VITE_SOCKET_URL` → Production Socket URL
- [ ] `VITE_ENV=production`

### ✅ Backend (.env - Production)
- [ ] `NODE_ENV=production`
- [ ] `FRONTEND_URL` → Production frontend domain
- [ ] `BACKEND_URL` → Production backend domain
- [ ] `MONGO_URI` → MongoDB connection string
- [ ] `PORT` → 5000 or your preferred port
- [ ] `EMAIL_USER` → Email for notifications
- [ ] `EMAIL_PASS` → Email password/token

---

## 🚨 Common Issues & Solutions

### Issue: 404 API endpoints
**Solution:** Verify `VITE_API_URL` is correctly set in `.env.production`

### Issue: CORS errors
**Solution:** Ensure `FRONTEND_URL` in backend `.env` matches your frontend domain exactly

### Issue: Socket.io connection fails
**Solution:** Update `VITE_SOCKET_URL` to match your backend domain

### Issue: MongoDB connection fails
**Solution:** Verify `MONGO_URI` is correct and your IP is whitelisted in MongoDB Atlas

---

## 📊 Monitoring & Maintenance

### Monitor Backend Logs
```bash
# Heroku
heroku logs --tail

# AWS EC2 with PM2
pm2 logs
```

### Monitor Frontend Performance
- Use Vercel/Netlify Analytics
- Check Google Lighthouse scores
- Monitor with Sentry for error tracking

---

## 🔄 CI/CD Pipeline (GitHub Actions)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy Frontend
        run: |
          cd frontend
          npm install
          npm run build:prod
          # Add your deployment command here
      
      - name: Deploy Backend
        run: |
          cd backend
          npm install
          # Add your deployment command here
```

---

## 📞 Support & Next Steps

1. **Update Production URLs**: Replace placeholder domains with your actual domains
2. **Test Thoroughly**: Run through all features before going live
3. **Monitor**: Set up error tracking and performance monitoring
4. **Backup**: Regular database backups
5. **Security**: Enable HTTPS, update passwords, use strong secrets

**Your project is deployment-ready! 🎉**
