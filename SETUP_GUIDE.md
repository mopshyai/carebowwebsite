# CareBow - Quick Setup Guide

## 🚀 Quick Start (Minimal Setup)

### Step 1: Update Environment Variables

Only **3 variables** are required to run the app:

```bash
# 1. DATABASE_URL - Update with your PostgreSQL credentials
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/carebow"

# 2. NEXTAUTH_URL - Already set for localhost
NEXTAUTH_URL="http://localhost:3000"

# 3. NEXTAUTH_SECRET - Generate a new secret
# Run this command: openssl rand -base64 32
NEXTAUTH_SECRET="paste-generated-secret-here"
```

### Step 2: Setup PostgreSQL Database

**Option A: Local PostgreSQL**
```bash
# Install PostgreSQL (if not installed)
# Mac: brew install postgresql
# Ubuntu: sudo apt-get install postgresql

# Start PostgreSQL
# Mac: brew services start postgresql
# Ubuntu: sudo service postgresql start

# Create database
createdb carebow
```

**Option B: Cloud Database (Easiest)**
- **Supabase**: https://supabase.com (Free tier available)
- **Neon**: https://neon.tech (Free tier available)
- **Railway**: https://railway.app (Free tier available)

1. Create account
2. Create new PostgreSQL database
3. Copy connection string
4. Paste into `DATABASE_URL` in `.env`

### Step 3: Run Database Migrations

```bash
# Generate Prisma client
npx prisma generate

# Run migrations (creates all tables)
npx prisma migrate dev --name init

# (Optional) View database in Prisma Studio
npx prisma studio
```

### Step 4: Start the App

```bash
npm run dev
```

Visit: **http://localhost:3000**

---

## 🎯 You're Done! The App Should Work Now

### Test It:
1. Go to http://localhost:3000
2. Click "Get Started"
3. Register as Family or Caregiver
4. Login and see your dashboard!

---

## 🔧 Optional: Setup Google OAuth

### Why?
Allows users to sign in with Google (the "Sign in with Google" button)

### How to Get Credentials:

1. Go to **Google Cloud Console**: https://console.cloud.google.com/

2. **Create/Select Project**:
   - Click "Select a project" → "New Project"
   - Name it "CareBow"
   - Click "Create"

3. **Enable Google+ API**:
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click "Enable"

4. **Create OAuth Credentials**:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Application type: **Web application**
   - Name: "CareBow Web"
   - Authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google`
   - Click "Create"

5. **Copy Credentials**:
   - Copy **Client ID** → paste in `.env` as `GOOGLE_CLIENT_ID`
   - Copy **Client secret** → paste in `.env` as `GOOGLE_CLIENT_SECRET`

6. **Restart App**:
   ```bash
   # Stop the server (Ctrl+C)
   npm run dev
   ```

Now the "Sign in with Google" button will work!

---

## 📧 Optional: Setup Email Notifications

### Using Gmail (Easiest for Testing):

1. **Enable 2-Factor Authentication**:
   - Go to https://myaccount.google.com/security
   - Enable 2-Step Verification

2. **Generate App Password**:
   - Go to https://myaccount.google.com/apppasswords
   - Select app: "Mail"
   - Select device: "Other" → type "CareBow"
   - Click "Generate"
   - Copy the 16-character password

3. **Update .env**:
   ```bash
   EMAIL_USER="your-email@gmail.com"
   EMAIL_PASS="your-16-char-app-password"
   ```

### Using SendGrid/Mailgun (For Production):

**SendGrid**:
1. Sign up: https://sendgrid.com
2. Create API key
3. Update `.env`:
   ```bash
   EMAIL_HOST="smtp.sendgrid.net"
   EMAIL_PORT="587"
   EMAIL_USER="apikey"
   EMAIL_PASS="your-sendgrid-api-key"
   ```

---

## 📦 Optional: Setup File Uploads (MinIO)

### For Local Development:

1. **Download MinIO**:
   - Mac: `brew install minio/stable/minio`
   - Linux: https://min.io/download
   - Windows: https://min.io/download

2. **Run MinIO**:
   ```bash
   minio server ./data
   ```

3. **Access MinIO Console**:
   - Open: http://localhost:9000
   - Login: minioadmin / minioadmin
   - Create bucket named "carebow"

4. **.env is already configured** for local MinIO!

### For Production:

Use **AWS S3**, **DigitalOcean Spaces**, or **Cloudflare R2**

---

## 🐛 Troubleshooting

### "Can't connect to database"
- Make sure PostgreSQL is running
- Check `DATABASE_URL` credentials are correct
- Test connection: `npx prisma db push`

### "Module not found"
```bash
npm install
```

### "Prisma Client not generated"
```bash
npx prisma generate
```

### Port 3000 already in use
```bash
# Use different port
PORT=3001 npm run dev
```

### Google OAuth not working
- Check redirect URI is exactly: `http://localhost:3000/api/auth/callback/google`
- Make sure Google+ API is enabled
- Restart the app after adding credentials

---

## 📚 Need Help?

Check these files:
- `IMPLEMENTATION_STATUS.md` - What's built
- `MVP_PLAN.md` - Architecture details
- `README.md` - Project overview

---

## 🎉 You're All Set!

**Your CareBow MVP is ready to use!**

- Landing page: http://localhost:3000
- Register: http://localhost:3000/register
- Login: http://localhost:3000/login

Enjoy! 🚀
