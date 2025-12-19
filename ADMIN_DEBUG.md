# 🔍 Admin Dashboard - Debug Checklist

## Quick Diagnostic Steps

### Step 1: Verify Frontend Environment ✅
```bash
cd frontend
# Check which .env file is being used:
cat .env
```
Should show: `VITE_API_URL=http://localhost:5000`

**NOT** `https://api.your-domain.com`

### Step 2: Check Admin Token in Browser
Open DevTools (F12) → Console → Paste:
```javascript
console.log(localStorage.getItem('adminToken'));
console.log(localStorage.getItem('adminUser'));
```

Should show:
- `adminToken`: Long JWT string starting with `eyJ...`
- `adminUser`: JSON object with name, email, role

If empty: **Re-login as admin**

### Step 3: Test API Endpoints in Browser Console
Paste these one by one in DevTools Console:

```javascript
// Test dashboard endpoint
const token = localStorage.getItem('adminToken');
fetch('http://localhost:5000/api/admin/dashboard', {
  headers: { 'Authorization': `Bearer ${token}` }
})
.then(r => r.json())
.then(data => console.log('Dashboard:', data));
```

```javascript
// Test users endpoint
const token = localStorage.getItem('adminToken');
fetch('http://localhost:5000/api/admin/users', {
  headers: { 'Authorization': `Bearer ${token}` }
})
.then(r => r.json())
.then(data => console.log('Users:', data));
```

```javascript
// Test rooms endpoint
const token = localStorage.getItem('adminToken');
fetch('http://localhost:5000/api/admin/rooms', {
  headers: { 'Authorization': `Bearer ${token}` }
})
.then(r => r.json())
.then(data => console.log('Rooms:', data));
```

```javascript
// Test bookings endpoint
const token = localStorage.getItem('adminToken');
fetch('http://localhost:5000/api/admin/bookings', {
  headers: { 'Authorization': `Bearer ${token}` }
})
.then(r => r.json())
.then(data => console.log('Bookings:', data));
```

### Step 4: Check Network Tab
DevTools → Network tab → Reload page

Look for:
- ❌ Red entries = API errors (check status code and response)
- ✅ Green entries = API working

### Step 5: Check Backend Console
Backend terminal should show logs like:
```
API call: GET /api/admin/dashboard
API call: GET /api/admin/users
API call: GET /api/admin/rooms
API call: GET /api/admin/bookings
```

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| **Empty dashboard, no errors** | Check localStorage - admin token missing or expired |
| **CORS errors in console** | Backend CORS not configured - check `server.js` CORS settings |
| **401 Unauthorized** | Admin token invalid or expired - logout and re-login |
| **404 errors on API calls** | Wrong API URL in .env - verify using `http://localhost:5000` |
| **No data showing but API responds** | Database empty - need to add test data |

---

## Step 6: If Still Empty - Check Database

Run in backend directory:
```bash
npm run debug:bookings
```

Or check if models exist:
```bash
# Check if these collections have data
db.users.count()
db.rooms.count()
db.bookings.count()
```

---

## Emergency Reset

If nothing works:
```bash
# Backend
cd backend
npm start

# Frontend (new terminal)
cd frontend
npm run dev

# Clear browser cache
# DevTools → Application → Storage → Clear All

# Re-login as admin
# Visit: http://localhost:5173/admin-login
```

---

Let me know what errors you see and I'll help fix them! 📊
