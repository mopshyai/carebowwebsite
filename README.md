# CareBow - Redefining In-Home Healthcare

> AI-powered care coordination platform connecting families with verified caregivers, offering predictive health monitoring and real-time insights.

## 🎯 Project Overview

CareBow is a comprehensive healthcare platform that delivers tech-enabled, humanized healthcare at home — from elder care to urgent care, from companionship to chronic disease management — through a single integrated platform that families can trust.

### Core Services
- 👩‍⚕️ **Caregiver Marketplace**: Smart matching with verified caregivers, nurses, and therapists
- 🚑 **Transport & Logistics**: Ambulance-on-demand and medical transport
- 🤖 **AI Health Buddy**: Symptom checker with Ayurveda + modern medicine guidance
- 📞 **Telehealth**: 24/7 doctor consultations
- 💊 **Pharmacy & Lab**: Home delivery and sample collection
- 🧑‍🤝‍🧑 **Companionship**: Mental health support and daily companionship

## 📚 Documentation

This project includes comprehensive planning documentation:

### Main Planning Documents
1. **[MVP_PLAN.md](./MVP_PLAN.md)** - Complete MVP architecture and features
   - Tech stack overview
   - Database schema (Prisma)
   - Project structure
   - Feature breakdown by phase
   - Component architecture
   - API routes
   - Environment setup

2. **[AUTH_IMPLEMENTATION_GUIDE.md](./AUTH_IMPLEMENTATION_GUIDE.md)** - Authentication system
   - NextAuth v5 configuration
   - Multi-user type support (Family, Caregiver, Admin)
   - Google OAuth setup
   - Email verification flow
   - Middleware for route protection
   - Session management

3. **[COMPONENT_LIBRARY.md](./COMPONENT_LIBRARY.md)** - Reusable components
   - UI components (Button, Card, Modal, etc.)
   - Form components (Input, FileUpload, etc.)
   - Dashboard components
   - Caregiver components
   - Usage examples

4. **[IMPLEMENTATION_CHECKLIST.md](./IMPLEMENTATION_CHECKLIST.md)** - Step-by-step guide
   - Week-by-week breakdown
   - Day-by-day tasks
   - Detailed implementation steps
   - Testing checklist
   - Deployment guide

## 🏗️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js v5 + Google OAuth
- **File Storage**: MinIO (S3-compatible)
- **Email**: Nodemailer
- **Styling**: Tailwind CSS + Framer Motion
- **Language**: TypeScript
- **Validation**: Zod + React Hook Form

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL
- MinIO (or S3)
- Google OAuth credentials
- SMTP email service

### Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd carebow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in all required variables (see [Environment Variables](#environment-variables))

4. **Setup database**
   ```bash
   # Initialize Prisma
   npx prisma generate

   # Run migrations
   npx prisma migrate dev --name init

   # (Optional) Seed database
   npx prisma db seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/carebow"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"  # Generate: openssl rand -base64 32

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# MinIO
MINIO_ENDPOINT="localhost"
MINIO_PORT="9000"
MINIO_USE_SSL="false"
MINIO_ACCESS_KEY="minioadmin"
MINIO_SECRET_KEY="minioadmin"

# Email
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_SECURE="false"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
EMAIL_FROM="CareBow <noreply@carebow.com>"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
COOKIE_DOMAIN="localhost"
```

## 📁 Project Structure

```
carebow/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── (auth)/            # Auth pages (login, register)
│   │   ├── (marketing)/       # Landing & marketing pages
│   │   ├── (dashboard)/       # User dashboards
│   │   │   ├── family/        # Family dashboard
│   │   │   ├── caregiver/     # Caregiver dashboard
│   │   │   └── admin/         # Admin dashboard
│   │   ├── api/               # API routes
│   │   ├── globals.css
│   │   └── layout.tsx
│   ├── components/            # Reusable components
│   │   ├── ui/               # Base UI components
│   │   ├── forms/            # Form components
│   │   ├── dashboard/        # Dashboard components
│   │   └── caregivers/       # Caregiver components
│   ├── lib/                   # Utilities
│   │   ├── prisma.ts         # Prisma client
│   │   ├── auth.ts           # NextAuth config
│   │   ├── minio.ts          # File storage
│   │   └── email.ts          # Email service
│   ├── context/              # React contexts
│   ├── hooks/                # Custom hooks
│   ├── types/                # TypeScript types
│   └── middleware.ts         # Route protection
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Seed data
├── public/                    # Static assets
├── docs/                      # Documentation
│   ├── MVP_PLAN.md
│   ├── AUTH_IMPLEMENTATION_GUIDE.md
│   ├── COMPONENT_LIBRARY.md
│   └── IMPLEMENTATION_CHECKLIST.md
└── package.json
```

## 👥 User Types

The platform supports three user types:

1. **Family** (`/family/dashboard`)
   - Find and book caregivers
   - Manage health records
   - Track appointments
   - Use AI health assistant

2. **Caregiver** (`/caregiver/dashboard`)
   - Manage patient bookings
   - Log care activities
   - Track earnings
   - Set availability

3. **Admin** (`/admin/dashboard`)
   - Verify caregivers
   - Manage users
   - View analytics
   - Platform settings

## 🔄 Development Workflow

### Git Workflow

```bash
# Work on your branch
git checkout claude/mvp-landing-dashboard-Mcaum

# Make changes and commit frequently
git add .
git commit -m "feat: add caregiver search functionality"

# Push to remote
git push -u origin claude/mvp-landing-dashboard-Mcaum

# Create PR when ready (if main branch exists)
gh pr create --title "Feature: Caregiver Marketplace" --body "..."
```

### Database Changes

```bash
# After modifying schema.prisma
npx prisma migrate dev --name description_of_change

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# View database in Prisma Studio
npx prisma studio
```

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npm run db:push      # Push schema changes
npm run db:studio    # Open Prisma Studio
npm run db:seed      # Seed database

# Generate
npm run generate     # Generate Prisma client
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] User registration (all types)
- [ ] Email verification
- [ ] Login (credentials + Google)
- [ ] Password reset
- [ ] Caregiver search & booking
- [ ] File uploads
- [ ] Email notifications
- [ ] Dashboard navigation
- [ ] Mobile responsiveness

## 📊 MVP Launch Criteria

- [ ] 10 verified caregivers onboarded
- [ ] 50 families registered
- [ ] 10 successful bookings completed
- [ ] < 2s page load time
- [ ] 99% uptime
- [ ] Mobile responsive
- [ ] Email delivery > 95%

## 🚀 Deployment

### Recommended: Vercel

1. Connect GitHub repository to Vercel
2. Configure environment variables
3. Deploy

### Alternative: Railway/Render

1. Create new project
2. Connect repository
3. Add PostgreSQL database
4. Configure environment variables
5. Deploy

See [IMPLEMENTATION_CHECKLIST.md](./IMPLEMENTATION_CHECKLIST.md) for detailed deployment steps.

## 📖 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

1. Create a new branch from `claude/mvp-landing-dashboard-Mcaum`
2. Make your changes
3. Test thoroughly
4. Create a pull request

## 📄 License

[Your License Here]

## 💬 Support

For questions or issues:
- Create an issue in GitHub
- Email: support@carebow.com

---

**Built with ❤️ for better healthcare at home**

## 🗓️ Implementation Timeline

### Week 1: Foundation
- Project setup
- Authentication system
- UI components

### Week 2: Marketing
- Landing page
- Service pages
- Email system

### Week 3: Dashboards
- Family dashboard
- Caregiver dashboard
- Booking system

### Week 4: Admin & Polish
- Admin dashboard
- Testing
- Deployment

See [IMPLEMENTATION_CHECKLIST.md](./IMPLEMENTATION_CHECKLIST.md) for detailed breakdown.

---

## 🎯 Next Steps

1. ✅ Review planning documents
2. ✅ Setup development environment
3. ✅ Start with Phase 1 of [IMPLEMENTATION_CHECKLIST.md](./IMPLEMENTATION_CHECKLIST.md)
4. ✅ Build iteratively
5. ✅ Test continuously
6. ✅ Deploy and iterate

**Ready to build? Start with the [IMPLEMENTATION_CHECKLIST.md](./IMPLEMENTATION_CHECKLIST.md)!**
