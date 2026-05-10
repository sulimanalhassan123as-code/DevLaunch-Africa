# 🚀 DevLaunch Africa

Discover and showcase African startups and builders.

## Features

✅ **Submit Apps** - Builders can submit their applications  
✅ **Leaderboard** - Apps ranked by upvotes  
✅ **Admin Panel** - Review and approve submissions  
✅ **WhatsApp Integration** - Direct hiring contact  
✅ **Mobile Optimized** - Works perfectly on Android & iOS  
✅ **Authentication** - Secure user login with Supabase  

## Setup Instructions

### 1. **Clone Repository**
```bash
git clone https://github.com/sulimanalhassan123as-code/DevLaunch-Africa.git
cd DevLaunch-Africa
```

### 2. **Set Up Supabase**

1. Go to [supabase.com](https://supabase.com) and create an account
2. Create a new project
3. In the project dashboard:
   - Go to **Settings → API**
   - Copy `Project URL` and `anon/public` key
4. Create a new table called `apps` with these columns:
   ```
   id (UUID, Primary Key)
   name (Text)
   url (Text)
   builder_name (Text)
   whatsapp (Text)
   category (Text)
   description (Text)
   upvotes (Number, default: 0)
   status (Text, default: 'pending')
   created_at (Timestamp, auto)
   ```

### 3. **Configure API Keys**

**Option A: Using Environment Variables (Recommended)**
```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local with your Supabase credentials
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_ADMIN_PIN=your-secure-pin
```

**Option B: Direct Configuration**  
Edit `supabase.js` and replace:
```javascript
const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";
```

### 4. **Run Locally**

```bash
# Using Python (Python 3 required)
python -m http.server 8000

# Or using Node.js
npx http-server

# Then open http://localhost:8000
```

### 5. **Deploy to Vercel**

```bash
npm install -g vercel
vercel
```

## File Structure

```
DevLaunch-Africa/
├── index.html          # Main app page
├── login.html          # Login/Signup page
├── admin.html          # Admin panel
├── app.js              # Main app logic
├── login.js            # Login logic
├── admin.js            # Admin logic
├── supabase.js         # Supabase config
├── protected.js        # Auth protection
├── style.css           # Styling
├── .env.example        # Environment template
├── vercel.json         # Vercel config
└── package.json        # Project metadata
```

## Common Issues & Fixes

### Issue: "Supabase not defined"
**Solution:** Make sure you have your credentials in `supabase.js`

### Issue: Apps not loading
**Solution:** Check browser console (F12) for errors and verify your Supabase credentials

### Issue: Login not working on Android
**Solution:** Clear browser cache and cookies

### Issue: Admin PIN locked
**Solution:** Change the PIN in `admin.js` (currently: `1234`)

## Security Notes ⚠️

- **Never** commit real API keys to GitHub
- Use `.env.example` as a template
- Add `.env.local` to `.gitignore`
- Change default admin PIN to something secure
- Enable Row Level Security (RLS) in Supabase for production

## Support

For issues, email: suleiman@devlaunch.africa

---

**Made with ❤️ by Suleiman Alhassan**
