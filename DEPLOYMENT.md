# Deployment Guide

## Backend Deployment (Railway)

### Setup Steps:

1. **Push code to GitHub** (if not already done)
2. **Go to Railway.app** and create a new project
3. **Add MySQL Service:**
   - Click "New" → "Database" → "Add MySQL"
   - Railway will provide connection variables automatically

4. **Add Node.js Service:**
   - Click "New" → "GitHub Repo" → Select your repo
   - Set **Root Directory** to `backend`
   - Railway will auto-detect Node.js

5. **Set Environment Variables:**
   ```
   NODE_ENV=production
   PORT=3001
   FRONTEND_URL=https://your-frontend.vercel.app
   
   # Database (Railway auto-provides these, but verify):
   DB_HOST=${{MySQL.MYSQLHOST}}
   DB_PORT=${{MySQL.MYSQLPORT}}
   DB_USERNAME=${{MySQL.MYSQLUSER}}
   DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}
   DB_DATABASE=${{MySQL.MYSQLDATABASE}}
   
   # Email Configuration:
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

6. **Deploy:**
   - Railway will automatically build and deploy
   - Get your backend URL from Railway dashboard

### Railway Configuration Files:
- `railway.toml` - Railway build configuration
- `nixpacks.toml` - Alternative build configuration
- `Dockerfile` - Docker build (if Nixpacks doesn't work)
- `Procfile` - Process file for Railway

## Frontend Deployment (Vercel)

### Setup Steps:

1. **Push code to GitHub** (if not already done)
2. **Go to vercel.com** and import your GitHub repository
3. **Configure Project:**
   - **Root Directory:** `frontend`
   - **Framework Preset:** Next.js (auto-detected)
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `.next` (auto-detected)

4. **Set Environment Variables:**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.railway.app
   ```

5. **Deploy:**
   - Click "Deploy"
   - Vercel will build and deploy automatically
   - Get your frontend URL from Vercel dashboard

6. **Update Backend CORS:**
   - Go back to Railway
   - Update `FRONTEND_URL` environment variable with your Vercel URL
   - Redeploy backend

### Vercel Configuration:
- `vercel.json` - Vercel deployment configuration

## Troubleshooting

### Railway Build Issues:

1. **If Nixpacks fails:**
   - Railway will try Dockerfile automatically
   - Or manually select Dockerfile in Railway settings

2. **Build errors:**
   - Check that `tsconfig.json` is correct
   - Ensure all dependencies are in `dependencies` not `devDependencies`
   - Check Railway logs for specific errors

3. **Database connection issues:**
   - Verify environment variables are set correctly
   - Check that MySQL service is running
   - Ensure database name matches

### Vercel Issues:

1. **Build fails:**
   - Check Next.js version compatibility
   - Verify all dependencies are installed
   - Check build logs in Vercel dashboard

2. **API calls fail:**
   - Verify `NEXT_PUBLIC_API_URL` is set correctly
   - Check CORS settings in backend
   - Ensure backend is accessible from internet

## Environment Variables Summary

### Backend (Railway):
- `NODE_ENV=production`
- `PORT=3001`
- `FRONTEND_URL` (your Vercel URL)
- Database variables (auto-provided by Railway MySQL)
- Email variables

### Frontend (Vercel):
- `NEXT_PUBLIC_API_URL` (your Railway backend URL)

## Post-Deployment Checklist

- [ ] Backend is running and accessible
- [ ] Frontend is deployed and accessible
- [ ] Database connection works
- [ ] CORS is configured correctly
- [ ] Environment variables are set
- [ ] Email service is configured
- [ ] Test API endpoints
- [ ] Test frontend-backend communication

