# ✅ Production Deployment Checklist

## Pre-Deployment Phase

### Environment Configuration
- [ ] **Frontend** - Update `.env.production` with production URLs
  ```env
  VITE_API_URL=https://api.your-domain.com
  VITE_SOCKET_URL=https://api.your-domain.com
  VITE_ENV=production
  ```

- [ ] **Backend** - Update `.env` with production settings
  ```env
  NODE_ENV=production
  FRONTEND_URL=https://your-frontend-domain.com
  BACKEND_URL=https://your-backend-domain.com
  MONGO_URI=your-production-mongodb-uri
  PORT=5000
  ```

- [ ] Verify no hardcoded localhost URLs remain
  ```bash
  # Run verification script
  bash verify-deployment.sh
  ```

### Security Review
- [ ] All API endpoints are validated and sanitized
- [ ] JWT tokens are configured with secure settings
- [ ] CORS is properly configured
- [ ] Environment variables are not exposed in code
- [ ] Sensitive information (passwords, keys) are in .env only
- [ ] HTTPS/SSL certificates are ready
- [ ] API rate limiting is configured

### Code Quality
- [ ] Run linting: `npm run lint`
- [ ] No console.log statements in production code
- [ ] Error handling is comprehensive
- [ ] Loading states are implemented
- [ ] User feedback (alerts, messages) is in place

---

## Build Phase

### Frontend Build
```bash
cd frontend
npm install
npm run build:prod
```

- [ ] Build completes without errors
- [ ] No build warnings
- [ ] `dist/` folder is created
- [ ] File sizes are optimized
- [ ] Source maps are generated (for debugging)

### Backend Validation
```bash
cd backend
npm install
npm start
```

- [ ] Server starts without errors
- [ ] Database connection is successful
- [ ] All routes are accessible
- [ ] Email service is working
- [ ] Socket.io connection is established

---

## Testing Phase

### Local Production Testing
- [ ] Frontend build preview works: `npm run preview`
- [ ] Backend server runs: `npm start`
- [ ] API endpoints respond correctly
- [ ] Database operations work
- [ ] Authentication flows work (login, register, forgot password)
- [ ] File uploads work
- [ ] Email notifications send
- [ ] Socket.io events transmit correctly

### Cross-Browser Testing
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### Mobile Testing
- [ ] Responsive design works on iPhone
- [ ] Responsive design works on Android
- [ ] Touch interactions work
- [ ] Keyboard navigation works

### Performance Testing
- [ ] Lighthouse score > 90
- [ ] Page load time < 3 seconds
- [ ] API response time < 1 second
- [ ] Image optimization verified

### Security Testing
- [ ] No XSS vulnerabilities
- [ ] No SQL injection vulnerabilities
- [ ] API is protected from unauthorized access
- [ ] CORS is correctly configured
- [ ] Rate limiting works

---

## Deployment Phase

### Frontend Deployment (Choose one)

#### Option 1: Vercel
- [ ] Connect Git repository
- [ ] Set environment variables
- [ ] Configure build settings
- [ ] Deploy: `vercel --prod`
- [ ] Test production URL
- [ ] Configure custom domain

#### Option 2: Netlify
- [ ] Connect Git repository
- [ ] Set build command: `npm run build`
- [ ] Set publish directory: `dist`
- [ ] Set environment variables
- [ ] Deploy
- [ ] Test production URL
- [ ] Configure custom domain

#### Option 3: AWS S3 + CloudFront
- [ ] Create S3 bucket
- [ ] Create CloudFront distribution
- [ ] Upload build files to S3
- [ ] Invalidate CloudFront cache
- [ ] Configure SSL certificate
- [ ] Test production URL

### Backend Deployment (Choose one)

#### Option 1: Heroku
```bash
heroku create your-app-name
heroku config:set NODE_ENV=production FRONTEND_URL=https://your-frontend.com
git push heroku main
```
- [ ] App created successfully
- [ ] Environment variables set
- [ ] Build completes without errors
- [ ] Dyno is running
- [ ] Database connection verified

#### Option 2: Railway
- [ ] Connect Git repository
- [ ] Set environment variables
- [ ] Configure port to 5000
- [ ] Deploy succeeds
- [ ] Test API endpoints

#### Option 3: Render
- [ ] Create new web service
- [ ] Connect Git repository
- [ ] Set build command: `npm install`
- [ ] Set start command: `node server.js`
- [ ] Set environment variables
- [ ] Deploy succeeds

#### Option 4: AWS EC2
- [ ] Launch EC2 instance
- [ ] Install Node.js and dependencies
- [ ] Configure .env file
- [ ] Set up PM2 for process management
- [ ] Configure Nginx reverse proxy
- [ ] Set up SSL with Let's Encrypt
- [ ] Verify server is running

---

## Post-Deployment Phase

### Verification
- [ ] Frontend is accessible at production URL
- [ ] Backend API is responding
- [ ] Database connections work
- [ ] Authentication flows work
- [ ] Socket.io connections establish
- [ ] Email notifications send
- [ ] All features are functional

### Monitoring Setup
- [ ] Error tracking (Sentry, LogRocket)
- [ ] Performance monitoring (Datadog, New Relic)
- [ ] Uptime monitoring (UptimeRobot, PagerDuty)
- [ ] Analytics (Google Analytics, Mixpanel)
- [ ] Database monitoring

### Backup & Recovery
- [ ] Database backup scheduled daily
- [ ] Backup restoration tested
- [ ] Disaster recovery plan documented
- [ ] Point-in-time recovery available

### Documentation
- [ ] Deployment process documented
- [ ] Environment variables documented
- [ ] API documentation updated
- [ ] Troubleshooting guide created
- [ ] Team trained on deployment

---

## Ongoing Maintenance

### Regular Tasks (Weekly)
- [ ] Review error logs
- [ ] Check performance metrics
- [ ] Monitor server resources
- [ ] Verify backups are running

### Regular Tasks (Monthly)
- [ ] Update dependencies
- [ ] Security patches applied
- [ ] Performance optimization
- [ ] Database cleanup

### Regular Tasks (Quarterly)
- [ ] Security audit
- [ ] Load testing
- [ ] Disaster recovery drill
- [ ] Documentation review

---

## Emergency Procedures

### If Deployment Fails
1. Check error logs
2. Verify environment variables
3. Verify database connection
4. Roll back to previous version
5. Investigate root cause

### If Performance Degrades
1. Check server resources
2. Review database performance
3. Check for error spikes
4. Scale resources if needed
5. Optimize slow queries

### If Security Issue Discovered
1. Take site offline if necessary
2. Investigate scope
3. Implement fix
4. Deploy patch
5. Verify fix in production
6. Post-mortem analysis

---

## Communication

- [ ] Notify stakeholders of deployment
- [ ] Prepare launch announcement
- [ ] Set up status page
- [ ] Prepare support team
- [ ] Monitor for user feedback

---

## Sign-Off

- [ ] Project Manager: _________________ Date: _______
- [ ] Lead Developer: _________________ Date: _______
- [ ] QA Lead: _________________ Date: _______
- [ ] DevOps Engineer: _________________ Date: _______

---

**Deployment Date:** _______________
**Version:** _______________
**Production URL:** _______________

**Notes:**
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
