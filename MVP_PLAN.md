# CareBow MVP - Complete Implementation Plan

## 📋 Executive Summary

CareBow is a comprehensive healthcare platform connecting families with verified caregivers, offering AI-powered health assistance, telehealth, and transparent care coordination. This MVP will focus on core functionality to validate the market and serve initial users.

---

## 🏗️ Project Architecture

### Tech Stack
- **Frontend/Backend**: Next.js 15 (App Router)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js v5 + Custom Cookie Management
- **File Storage**: MinIO (S3-compatible)
- **Email**: Nodemailer with custom transporter
- **Styling**: Tailwind CSS + Framer Motion
- **State Management**: React Context API
- **Form Handling**: React Hook Form + Zod validation

### Project Structure
```
carebow/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── verify-email/
│   │   │   └── forgot-password/
│   │   ├── (marketing)/
│   │   │   ├── page.tsx                    # Landing page
│   │   │   ├── about/
│   │   │   ├── services/
│   │   │   │   ├── caregiver-marketplace/
│   │   │   │   ├── transport-logistics/
│   │   │   │   ├── ai-health-buddy/
│   │   │   │   ├── telehealth/
│   │   │   │   ├── pharmacy-lab/
│   │   │   │   └── companionship/
│   │   │   ├── contact/
│   │   │   ├── pricing/
│   │   │   └── faq/
│   │   ├── (dashboard)/
│   │   │   ├── family/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── find-caregiver/
│   │   │   │   ├── my-caregivers/
│   │   │   │   ├── health-records/
│   │   │   │   ├── appointments/
│   │   │   │   ├── ai-assistant/
│   │   │   │   └── settings/
│   │   │   ├── caregiver/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── my-patients/
│   │   │   │   ├── schedule/
│   │   │   │   ├── earnings/
│   │   │   │   ├── tasks/
│   │   │   │   └── settings/
│   │   │   ├── admin/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── users/
│   │   │   │   ├── caregivers/
│   │   │   │   ├── bookings/
│   │   │   │   ├── verification/
│   │   │   │   ├── payments/
│   │   │   │   ├── analytics/
│   │   │   │   └── settings/
│   │   │   └── _components/
│   │   │       ├── DashboardLayout.tsx
│   │   │       ├── Sidebar.tsx
│   │   │       └── Header.tsx
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/route.ts
│   │   │   ├── check-auth/route.ts
│   │   │   ├── logout/route.ts
│   │   │   ├── users/
│   │   │   ├── caregivers/
│   │   │   ├── bookings/
│   │   │   ├── health-records/
│   │   │   ├── upload/
│   │   │   └── email/
│   │   ├── globals.css
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/                             # Reusable UI components
│   │   ├── forms/                          # Form components
│   │   ├── cards/                          # Card components
│   │   └── modals/                         # Modal components
│   ├── lib/
│   │   ├── prisma.ts
│   │   ├── auth.ts
│   │   ├── minio.ts
│   │   ├── email.ts
│   │   └── utils.ts
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   └── DashboardContext.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   └── useFileUpload.ts
│   ├── types/
│   │   └── index.ts
│   └── middleware.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── public/
│   ├── images/
│   └── icons/
├── .env.local
└── package.json
```

---

## 🗄️ Database Schema (Prisma)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================
// USER & AUTHENTICATION
// ============================================

enum UserType {
  FAMILY           // Families seeking care
  CAREGIVER        // Caregivers, nurses, therapists
  ADMIN            // Platform administrators
}

enum CaregiverType {
  NURSE
  PHYSIOTHERAPIST
  THERAPIST
  ELDER_CARE_SPECIALIST
  PEDIATRIC_SPECIALIST
  COMPANION
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  emailVerified DateTime?
  name          String?
  phone         String?   @unique
  image         String?
  type          UserType  @default(FAMILY)

  password      String?   // For email/password auth

  // Relations
  accounts      Account[]
  sessions      Session[]

  // Type-specific profiles
  familyProfile     FamilyProfile?
  caregiverProfile  CaregiverProfile?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([email])
  @@index([type])
}

// NextAuth tables
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

// ============================================
// FAMILY PROFILE
// ============================================

model FamilyProfile {
  id          String   @id @default(cuid())
  userId      String   @unique
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  address     String?
  city        String?
  state       String?
  zipCode     String?

  // Emergency contact
  emergencyContactName   String?
  emergencyContactPhone  String?
  emergencyContactRelation String?

  // Family members requiring care
  familyMembers FamilyMember[]

  // Bookings
  bookings      Booking[]

  // Health records
  healthRecords HealthRecord[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model FamilyMember {
  id        String   @id @default(cuid())
  profileId String
  profile   FamilyProfile @relation(fields: [profileId], references: [id], onDelete: Cascade)

  name      String
  age       Int
  relation  String   // Parent, Grandparent, Child, etc.

  medicalConditions String? @db.Text
  medications       String? @db.Text
  allergies         String? @db.Text
  specialNeeds      String? @db.Text

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// ============================================
// CAREGIVER PROFILE
// ============================================

enum VerificationStatus {
  PENDING
  VERIFIED
  REJECTED
}

model CaregiverProfile {
  id          String   @id @default(cuid())
  userId      String   @unique
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  caregiverType   CaregiverType
  bio             String?       @db.Text
  experience      Int?          // Years of experience
  hourlyRate      Decimal?      @db.Decimal(10, 2)

  // Location
  address         String?
  city            String?
  state           String?
  zipCode         String?
  serviceRadius   Int?          // Miles willing to travel

  // Verification
  verificationStatus VerificationStatus @default(PENDING)

  // Certifications & Documents
  certifications  Certification[]
  documents       Document[]

  // Availability
  availability    Availability[]

  // Services offered
  specializations String[]      // Array of specializations
  languages       String[]      // Languages spoken

  // Ratings
  rating          Decimal?      @db.Decimal(3, 2)
  totalReviews    Int           @default(0)

  // Bookings
  bookings        Booking[]

  // Financial
  bankAccountVerified Boolean @default(false)

  isActive        Boolean       @default(true)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([caregiverType])
  @@index([city, state])
  @@index([verificationStatus])
}

model Certification {
  id          String   @id @default(cuid())
  caregiverId String
  caregiver   CaregiverProfile @relation(fields: [caregiverId], references: [id], onDelete: Cascade)

  name        String
  issuingOrg  String
  issueDate   DateTime
  expiryDate  DateTime?

  documentUrl String?  // Stored in MinIO

  verified    Boolean  @default(false)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Document {
  id          String   @id @default(cuid())
  caregiverId String
  caregiver   CaregiverProfile @relation(fields: [caregiverId], references: [id], onDelete: Cascade)

  type        String   // ID_PROOF, ADDRESS_PROOF, BACKGROUND_CHECK, etc.
  fileName    String
  fileUrl     String   // MinIO URL

  verified    Boolean  @default(false)
  verifiedBy  String?  // Admin user ID
  verifiedAt  DateTime?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Availability {
  id          String   @id @default(cuid())
  caregiverId String
  caregiver   CaregiverProfile @relation(fields: [caregiverId], references: [id], onDelete: Cascade)

  dayOfWeek   Int      // 0-6 (Sunday-Saturday)
  startTime   String   // "09:00"
  endTime     String   // "17:00"

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([caregiverId, dayOfWeek, startTime])
}

// ============================================
// BOOKINGS & APPOINTMENTS
// ============================================

enum BookingStatus {
  PENDING
  CONFIRMED
  IN_PROGRESS
  COMPLETED
  CANCELLED
}

enum BookingType {
  HOURLY
  DAILY
  LONG_TERM
  EMERGENCY
}

model Booking {
  id          String   @id @default(cuid())

  // Family
  familyId    String
  family      FamilyProfile @relation(fields: [familyId], references: [id])

  // Caregiver
  caregiverId String
  caregiver   CaregiverProfile @relation(fields: [caregiverId], references: [id])

  // Booking details
  bookingType BookingType
  status      BookingStatus @default(PENDING)

  startDate   DateTime
  endDate     DateTime?

  // For hourly bookings
  hours       Int?

  // Location
  serviceAddress String

  // Requirements
  requirements String?  @db.Text

  // Pricing
  totalAmount Decimal   @db.Decimal(10, 2)

  // Tasks & Logs
  tasks       Task[]
  logs        CareLog[]

  // Review
  review      Review?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([familyId])
  @@index([caregiverId])
  @@index([status])
  @@index([startDate])
}

model Task {
  id          String   @id @default(cuid())
  bookingId   String
  booking     Booking  @relation(fields: [bookingId], references: [id], onDelete: Cascade)

  title       String
  description String?  @db.Text
  completed   Boolean  @default(false)
  completedAt DateTime?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model CareLog {
  id          String   @id @default(cuid())
  bookingId   String
  booking     Booking  @relation(fields: [bookingId], references: [id], onDelete: Cascade)

  timestamp   DateTime @default(now())

  // Vital signs
  bloodPressure String?
  heartRate     Int?
  temperature   Decimal? @db.Decimal(4, 2)
  oxygenLevel   Int?

  // Activities
  activities    String?  @db.Text

  // Medications given
  medications   String?  @db.Text

  // Notes
  notes         String?  @db.Text

  // Photos/attachments
  attachments   String[] // Array of MinIO URLs

  createdAt DateTime @default(now())
}

model Review {
  id          String   @id @default(cuid())
  bookingId   String   @unique
  booking     Booking  @relation(fields: [bookingId], references: [id], onDelete: Cascade)

  rating      Int      // 1-5
  comment     String?  @db.Text

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// ============================================
// HEALTH RECORDS
// ============================================

model HealthRecord {
  id          String   @id @default(cuid())
  familyId    String
  family      FamilyProfile @relation(fields: [familyId], references: [id], onDelete: Cascade)

  memberName  String   // Which family member

  recordType  String   // LAB_REPORT, PRESCRIPTION, DIAGNOSIS, etc.
  title       String
  description String?  @db.Text

  fileUrl     String?  // MinIO URL

  recordDate  DateTime

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([familyId])
}

// ============================================
// AI HEALTH ASSISTANT
// ============================================

model AIConversation {
  id          String   @id @default(cuid())
  userId      String

  messages    AIMessage[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([userId])
}

model AIMessage {
  id              String   @id @default(cuid())
  conversationId  String
  conversation    AIConversation @relation(fields: [conversationId], references: [id], onDelete: Cascade)

  role            String   // user, assistant, system
  content         String   @db.Text

  // Symptom analysis
  symptoms        String[] // Extracted symptoms
  suggestedActions String[] // Suggested remedies/actions
  urgencyLevel    String?  // LOW, MEDIUM, HIGH, EMERGENCY

  createdAt DateTime @default(now())

  @@index([conversationId])
}

// ============================================
// TRANSPORT & LOGISTICS
// ============================================

enum TransportType {
  AMBULANCE
  MEDICAL_TRANSPORT
  WHEELCHAIR_ACCESSIBLE
  REGULAR
}

enum TransportStatus {
  REQUESTED
  ASSIGNED
  EN_ROUTE
  ARRIVED
  IN_TRANSIT
  COMPLETED
  CANCELLED
}

model TransportBooking {
  id          String   @id @default(cuid())
  userId      String

  transportType TransportType
  status        TransportStatus @default(REQUESTED)

  pickupAddress   String
  dropoffAddress  String

  pickupTime      DateTime

  specialRequirements String? @db.Text

  // Tracking
  driverName      String?
  driverPhone     String?
  vehicleNumber   String?
  currentLocation String?

  // Pricing
  estimatedCost   Decimal? @db.Decimal(10, 2)
  actualCost      Decimal? @db.Decimal(10, 2)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([userId])
  @@index([status])
}

// ============================================
// NOTIFICATIONS
// ============================================

enum NotificationType {
  BOOKING_CONFIRMED
  BOOKING_REMINDER
  TASK_COMPLETED
  MESSAGE
  PAYMENT
  SYSTEM
}

model Notification {
  id          String   @id @default(cuid())
  userId      String

  type        NotificationType
  title       String
  message     String   @db.Text

  read        Boolean  @default(false)

  // Optional link
  link        String?

  createdAt DateTime @default(now())

  @@index([userId, read])
}

// ============================================
// PAYMENTS (Future - not in MVP)
// ============================================

// Will be added in Phase 2
```

---

## 🔐 Authentication System

### Overview
- **NextAuth.js v5** for OAuth providers (Google)
- **Custom credential-based auth** for email/password
- **Cookie-based sessions** (not JWT tokens)
- **Multi-user type support** (Family, Caregiver, Admin)
- **Remember me** functionality

### Auth Flow

#### 1. Registration Flow
```
User Registration →
  ↓
Choose User Type (Family/Caregiver) →
  ↓
Fill Registration Form →
  ↓
Create User in DB (status: unverified) →
  ↓
Send Verification Email →
  ↓
User Clicks Verification Link →
  ↓
Mark Email as Verified →
  ↓
Set Auth Cookie →
  ↓
Redirect to Onboarding
```

#### 2. Login Flow
```
User Login →
  ↓
Validate Credentials/OAuth →
  ↓
Check User Type →
  ↓
Set Auth Cookie (httpOnly, secure) →
  ↓
Redirect Based on User Type:
  - Family → /family/dashboard
  - Caregiver → /caregiver/dashboard
  - Admin → /admin/dashboard
```

#### 3. Cookie Structure
```javascript
{
  id: "user_id",
  email: "user@example.com",
  type: "FAMILY" | "CAREGIVER" | "ADMIN",
  exp: timestamp,
  rememberMe: boolean
}
```

### Key Files

**`src/lib/auth.ts`**
```typescript
// NextAuth configuration
// - Google OAuth provider
// - Custom credentials provider
// - Prisma adapter
// - Custom callbacks for multi-user support
```

**`src/middleware.ts`**
```typescript
// Protected route middleware
// - Check auth cookie
// - Validate expiry
// - Redirect based on user type
// - Public vs protected routes
```

**`src/app/api/auth/[...nextauth]/route.ts`**
```typescript
// NextAuth handler
```

**`src/app/api/check-auth/route.ts`**
```typescript
// Check current auth status
// Returns user type and profile data
```

**`src/app/api/logout/route.ts`**
```typescript
// Clear auth cookies
// End session
```

---

## 🎨 Landing & Marketing Pages

### Pages Structure

#### 1. Home Page (`/`)
**Sections:**
- Hero with main value proposition
- "3,000+ Families on Waitlist" stat
- Core services overview (6 services)
- How it works (3 steps)
- Testimonials
- CTA buttons: "Get Early Access", "Try AI CareBow", "Book Demo"

#### 2. About Page (`/about`)
- Vision & Mission
- Team (can be placeholder for MVP)
- Why CareBow is different
- Transparency layer explanation

#### 3. Services Pages (`/services/*`)
Individual pages for each service:
- `/services/caregiver-marketplace`
- `/services/transport-logistics`
- `/services/ai-health-buddy`
- `/services/telehealth`
- `/services/pharmacy-lab`
- `/services/companionship`

Each page includes:
- Detailed explanation
- Benefits
- How it works
- Pricing (if applicable)
- CTA to sign up

#### 4. Contact Page (`/contact`)
- Contact form
- Email: support@carebow.com
- Phone number
- Office address (if any)
- FAQ link

#### 5. FAQ Page (`/faq`)
- Common questions about services
- Pricing
- How to get started
- Safety & verification

#### 6. Pricing Page (`/pricing`)
- Transparent pricing for different services
- Comparison table
- No hidden fees message

---

## 📊 Dashboard Design

### 1. Family Dashboard (`/family/dashboard`)

**Tabs/Sections:**
1. **Overview**
   - Upcoming appointments
   - Active caregivers
   - Recent health logs
   - Quick actions

2. **Find Caregiver** (`/family/find-caregiver`)
   - Search filters (type, location, rate, rating)
   - Caregiver cards with profile previews
   - Book caregiver flow

3. **My Caregivers** (`/family/my-caregivers`)
   - Active bookings
   - Past caregivers
   - Review & rate

4. **Health Records** (`/family/health-records`)
   - Upload documents
   - View/download records
   - Organize by family member

5. **AI Assistant** (`/family/ai-assistant`)
   - Chat interface
   - Symptom checker
   - Health tips
   - Conversation history

6. **Appointments** (`/family/appointments`)
   - Calendar view
   - Upcoming/past appointments
   - Reschedule/cancel

7. **Transport** (`/family/transport`)
   - Book ambulance/transport
   - Track active rides
   - Transport history

8. **Settings** (`/family/settings`)
   - Profile management
   - Family members
   - Notification preferences
   - Payment methods

### 2. Caregiver Dashboard (`/caregiver/dashboard`)

**Tabs/Sections:**
1. **Overview**
   - Today's schedule
   - Pending bookings
   - Earnings summary
   - Notifications

2. **My Patients** (`/caregiver/my-patients`)
   - Active patients
   - Patient profiles
   - Care logs

3. **Schedule** (`/caregiver/schedule`)
   - Calendar view
   - Set availability
   - Upcoming bookings

4. **Bookings** (`/caregiver/bookings`)
   - Pending requests (accept/reject)
   - Confirmed bookings
   - Booking history

5. **Tasks** (`/caregiver/tasks`)
   - Daily task lists for each patient
   - Mark complete
   - Add notes

6. **Care Logs** (`/caregiver/care-logs`)
   - Log vitals
   - Record activities
   - Upload photos
   - Medication tracking

7. **Earnings** (`/caregiver/earnings`)
   - Total earnings
   - Payment history
   - Pending payments
   - Bank details

8. **Profile** (`/caregiver/profile`)
   - Edit bio
   - Upload certifications
   - Manage availability
   - Reviews & ratings

9. **Settings** (`/caregiver/settings`)
   - Account settings
   - Notification preferences
   - Verification status

### 3. Admin Dashboard (`/admin/dashboard`)

**Tabs/Sections:**
1. **Overview**
   - Key metrics (users, bookings, revenue)
   - Recent activity
   - Pending verifications
   - System health

2. **Users** (`/admin/users`)
   - All users table
   - Filter by type
   - User details
   - Deactivate/activate

3. **Caregivers** (`/admin/caregivers`)
   - All caregivers
   - Verification status
   - Ratings & reviews
   - Performance metrics

4. **Verification** (`/admin/verification`)
   - Pending caregiver verifications
   - Document review
   - Approve/reject
   - Background check status

5. **Bookings** (`/admin/bookings`)
   - All bookings
   - Status overview
   - Resolve disputes
   - Booking analytics

6. **Payments** (`/admin/payments`)
   - Transaction history
   - Pending payouts
   - Revenue analytics
   - Refunds

7. **Analytics** (`/admin/analytics`)
   - User growth
   - Booking trends
   - Revenue charts
   - Service popularity

8. **Settings** (`/admin/settings`)
   - Platform settings
   - Email templates
   - Commission rates
   - System configuration

---

## 🎯 MVP Feature Priority

### Phase 1: Core MVP (Week 1-4)

**Must Have:**
1. ✅ User Registration & Login (Family, Caregiver, Admin)
2. ✅ Email verification
3. ✅ Google OAuth
4. ✅ Basic landing page
5. ✅ Family dashboard (basic)
6. ✅ Caregiver dashboard (basic)
7. ✅ Admin dashboard (basic)
8. ✅ Caregiver profile creation
9. ✅ Caregiver search & filtering
10. ✅ Booking flow (request → confirm)
11. ✅ Basic file upload (MinIO)
12. ✅ Email notifications (booking confirmations)

**Nice to Have:**
- Reviews & ratings
- Care logs (basic)
- Health records upload

### Phase 2: Enhanced Features (Week 5-8)

**Add:**
1. AI Health Assistant (basic chat)
2. Transport booking
3. Care logs with vitals tracking
4. Calendar/schedule management
5. Advanced caregiver verification
6. Payment integration (Stripe)
7. Notification system
8. Advanced analytics for admin

### Phase 3: Scale & Polish (Week 9-12)

**Add:**
1. Advanced AI features (Ayurveda + modern medicine)
2. Telehealth integration
3. Pharmacy/lab integration
4. Mobile responsiveness optimization
5. Performance optimization
6. SEO optimization
7. Advanced search with AI recommendations

---

## 📁 File Storage (MinIO)

### Setup
```javascript
// src/lib/minio.ts
import * as Minio from 'minio';

export const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT!,
  port: parseInt(process.env.MINIO_PORT!),
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY!,
  secretKey: process.env.MINIO_SECRET_KEY!,
});

const BUCKET_NAME = 'carebow';

// Initialize bucket
export async function ensureBucket() {
  const exists = await minioClient.bucketExists(BUCKET_NAME);
  if (!exists) {
    await minioClient.makeBucket(BUCKET_NAME, 'us-east-1');
  }
}
```

### Buckets Structure
```
carebow/
├── profile-images/
│   ├── users/
│   └── caregivers/
├── documents/
│   ├── certifications/
│   ├── id-proofs/
│   └── background-checks/
├── health-records/
│   ├── prescriptions/
│   ├── lab-reports/
│   └── medical-images/
└── care-logs/
    └── attachments/
```

### Upload API
```typescript
// src/app/api/upload/route.ts
// Handles file uploads
// Validates file type & size
// Generates unique filename
// Returns MinIO URL
```

---

## 📧 Email System (Nodemailer)

### Setup
```javascript
// src/lib/email.ts
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT!),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

### Email Templates

**1. Email Verification**
```
Subject: Verify your CareBow account
Body: Click link to verify...
```

**2. Booking Confirmation (Family)**
```
Subject: Booking Confirmed
Body: Your caregiver [Name] is confirmed for [Date/Time]
```

**3. New Booking Request (Caregiver)**
```
Subject: New Booking Request
Body: You have a new booking request from [Family Name]
```

**4. Password Reset**
```
Subject: Reset your password
Body: Click link to reset...
```

**5. Welcome Email**
```
Subject: Welcome to CareBow
Body: Getting started guide...
```

### Email Functions
```typescript
// src/lib/email.ts

export async function sendVerificationEmail(email: string, token: string)
export async function sendBookingConfirmation(booking: Booking)
export async function sendPasswordReset(email: string, token: string)
export async function sendWelcomeEmail(user: User)
export async function sendBookingReminder(booking: Booking)
```

---

## 🔄 Component Architecture

### Reusable Components

**1. Auth Components**
```
/components/auth/
├── LoginForm.tsx          # Reusable login form
├── RegisterForm.tsx       # Reusable registration form
├── GoogleButton.tsx       # Google OAuth button
├── RememberMeCheckbox.tsx # Remember me checkbox
└── AuthGuard.tsx          # Protected route wrapper
```

**2. Dashboard Components**
```
/components/dashboard/
├── Sidebar.tsx            # Reusable sidebar
├── Header.tsx             # Dashboard header
├── StatsCard.tsx          # Statistics card
├── QuickAction.tsx        # Quick action button
└── NotificationBell.tsx   # Notification dropdown
```

**3. Caregiver Components**
```
/components/caregivers/
├── CaregiverCard.tsx      # Caregiver profile card
├── CaregiverFilter.tsx    # Search filters
├── BookingModal.tsx       # Booking modal
└── RatingStars.tsx        # Rating display
```

**4. Form Components**
```
/components/forms/
├── Input.tsx              # Form input
├── Select.tsx             # Dropdown select
├── FileUpload.tsx         # File upload with preview
├── DatePicker.tsx         # Date picker
└── FormError.tsx          # Error message
```

**5. UI Components**
```
/components/ui/
├── Button.tsx             # Reusable button
├── Card.tsx               # Card container
├── Modal.tsx              # Modal dialog
├── Alert.tsx              # Alert/notification
├── Badge.tsx              # Status badge
├── Spinner.tsx            # Loading spinner
└── Tabs.tsx               # Tab navigation
```

---

## 🛡️ Middleware & Route Protection

```typescript
// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('auth');

  // Public routes
  const publicRoutes = ['/', '/login', '/register', '/about', '/services', '/contact'];
  const isPublicRoute = publicRoutes.some(route =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Check auth
  if (!authCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const authData = JSON.parse(authCookie.value);

    // Check expiry
    if (authData.exp < Date.now()) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Route protection based on user type
    const pathname = request.nextUrl.pathname;

    if (pathname.startsWith('/family') && authData.type !== 'FAMILY') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    if (pathname.startsWith('/caregiver') && authData.type !== 'CAREGIVER') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    if (pathname.startsWith('/admin') && authData.type !== 'ADMIN') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    return NextResponse.next();

  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
```

---

## 🌐 Environment Variables

```bash
# .env.local

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/carebow"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-generate-this"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# MinIO
MINIO_ENDPOINT="localhost"
MINIO_PORT="9000"
MINIO_USE_SSL="false"
MINIO_ACCESS_KEY="minioadmin"
MINIO_SECRET_KEY="minioadmin"

# Email (Nodemailer)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_SECURE="false"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
EMAIL_FROM="CareBow <noreply@carebow.com>"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
COOKIE_DOMAIN="localhost"

# Feature Flags (for phased rollout)
FEATURE_AI_ASSISTANT="false"
FEATURE_TRANSPORT="false"
FEATURE_PAYMENTS="false"
```

---

## 📝 API Routes Summary

### Auth APIs
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/verify-email` - Verify email token
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `GET /api/check-auth` - Check auth status
- `POST /api/logout` - Logout user

### User APIs
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/notifications` - Get notifications
- `PUT /api/users/notifications/:id/read` - Mark notification as read

### Caregiver APIs
- `GET /api/caregivers` - Search caregivers (with filters)
- `GET /api/caregivers/:id` - Get caregiver details
- `POST /api/caregivers/profile` - Create/update caregiver profile
- `POST /api/caregivers/certifications` - Add certification
- `POST /api/caregivers/availability` - Set availability

### Booking APIs
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get user's bookings
- `GET /api/bookings/:id` - Get booking details
- `PUT /api/bookings/:id/status` - Update booking status
- `POST /api/bookings/:id/review` - Add review
- `POST /api/bookings/:id/tasks` - Add task
- `POST /api/bookings/:id/logs` - Add care log

### Health Record APIs
- `POST /api/health-records` - Upload health record
- `GET /api/health-records` - Get family health records
- `DELETE /api/health-records/:id` - Delete record

### Transport APIs
- `POST /api/transport` - Book transport
- `GET /api/transport/:id` - Get transport status
- `PUT /api/transport/:id/cancel` - Cancel transport

### File Upload API
- `POST /api/upload` - Upload file to MinIO

### Admin APIs
- `GET /api/admin/users` - Get all users
- `GET /api/admin/caregivers/pending` - Get pending verifications
- `PUT /api/admin/caregivers/:id/verify` - Verify caregiver
- `GET /api/admin/bookings` - Get all bookings
- `GET /api/admin/analytics` - Get platform analytics

---

## 🎨 Design System

### Colors
```css
/* Primary */
--primary: #6366F1;          /* Indigo */
--primary-light: #818CF8;
--primary-dark: #4F46E5;

/* Secondary */
--secondary: #EC4899;        /* Pink - for "Coming Soon" badge */
--secondary-light: #F472B6;

/* Neutrals */
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-600: #4B5563;
--gray-900: #111827;

/* Status */
--success: #10B981;
--warning: #F59E0B;
--error: #EF4444;
--info: #3B82F6;
```

### Typography
```css
/* Headings */
--font-heading: 'Inter', sans-serif;
--font-body: 'Inter', sans-serif;

/* Sizes */
--text-xs: 0.75rem;
--text-sm: 0.875rem;
--text-base: 1rem;
--text-lg: 1.125rem;
--text-xl: 1.25rem;
--text-2xl: 1.5rem;
--text-3xl: 1.875rem;
--text-4xl: 2.25rem;
```

### Spacing
```css
--spacing-1: 0.25rem;   /* 4px */
--spacing-2: 0.5rem;    /* 8px */
--spacing-3: 0.75rem;   /* 12px */
--spacing-4: 1rem;      /* 16px */
--spacing-6: 1.5rem;    /* 24px */
--spacing-8: 2rem;      /* 32px */
```

---

## 🚀 Getting Started (Implementation Order)

### Week 1: Foundation
1. ✅ Initialize Next.js project
2. ✅ Setup Prisma with PostgreSQL
3. ✅ Setup MinIO
4. ✅ Configure Nodemailer
5. ✅ Implement auth system (NextAuth + custom)
6. ✅ Create database schema
7. ✅ Run migrations
8. ✅ Create basic middleware

### Week 2: UI Foundation
1. ✅ Create design system (colors, typography)
2. ✅ Build reusable UI components
3. ✅ Create layout components (Sidebar, Header)
4. ✅ Build landing page
5. ✅ Create marketing pages (About, Services, Contact)
6. ✅ Implement responsive design

### Week 3: Core Features
1. ✅ Family dashboard
2. ✅ Caregiver dashboard
3. ✅ Admin dashboard
4. ✅ Caregiver profile creation
5. ✅ Caregiver search & filtering
6. ✅ File upload system
7. ✅ Email notification system

### Week 4: Booking System
1. ✅ Booking flow UI
2. ✅ Booking creation API
3. ✅ Booking management (caregiver side)
4. ✅ Booking status updates
5. ✅ Task management
6. ✅ Basic care logs
7. ✅ Testing & bug fixes

---

## 📊 Success Metrics

### MVP Launch Criteria
- [ ] 10 verified caregivers onboarded
- [ ] 50 families registered
- [ ] 10 successful bookings completed
- [ ] <2s page load time
- [ ] 99% uptime
- [ ] Mobile responsive on all pages
- [ ] Email delivery rate >95%

### Post-MVP Goals (3 months)
- 100+ verified caregivers
- 500+ families
- 100+ bookings/month
- Average rating >4.5 stars
- <1% booking cancellation rate

---

## 🔧 Technical Considerations

### Performance
- Next.js SSR for landing pages (SEO)
- Client-side rendering for dashboards
- Image optimization with Next/Image
- Lazy loading for components
- API response caching

### Security
- HTTPS only
- HttpOnly cookies for auth
- CSRF protection
- Rate limiting on APIs
- Input validation (Zod)
- SQL injection prevention (Prisma)
- File upload validation
- XSS prevention

### Scalability
- Database indexing on frequently queried fields
- Connection pooling for Prisma
- CDN for static assets
- Horizontal scaling ready
- Microservices architecture (future)

### Testing
- Unit tests for utilities
- Integration tests for APIs
- E2E tests for critical flows
- Manual QA before launch

---

## 📱 Mobile Responsiveness

All dashboards and pages must be mobile-first:
- Breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- Touch-friendly buttons (min 44px)
- Mobile navigation (hamburger menu)
- Responsive tables (horizontal scroll or card view)
- Mobile-optimized forms

---

## 🎯 Next Steps After This Plan

1. ✅ Review this plan with stakeholders
2. ✅ Finalize MVP scope
3. ✅ Setup development environment
4. ✅ Create GitHub repository
5. ✅ Start Week 1 implementation
6. ✅ Daily standups to track progress
7. ✅ Weekly demos to stakeholders

---

## 📞 Support & Maintenance

Post-launch support plan:
- Bug fixes within 24 hours
- Feature requests tracked in backlog
- Weekly deployment cycle
- Monthly feature releases
- User feedback collection (in-app survey)

---

**This plan provides a complete roadmap for building the CareBow MVP. Each section can be expanded as development progresses.**
