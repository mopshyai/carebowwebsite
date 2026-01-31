# CareBow API Documentation
## Mobile App Integration Guide

**Version:** 1.0.0
**Last Updated:** January 15, 2026
**Backend:** Next.js 15 + PostgreSQL + Prisma
**Authentication:** NextAuth v5 (JWT)

---

## 🚀 Quick Start

### Base URL
```
Production: https://your-domain.com
Development: http://localhost:3000
```

### Authentication
All protected endpoints require authentication via JWT token in cookies or Authorization header.

```javascript
// After login, include credentials in requests
fetch('https://your-domain.com/api/bookings', {
  credentials: 'include', // Important for cookie-based auth
  headers: {
    'Content-Type': 'application/json',
  }
})
```

---

## 📋 Table of Contents

1. [Authentication](#authentication)
2. [User Management](#user-management)
3. [Bookings](#bookings)
4. [Health Records](#health-records)
5. [Care Logs](#care-logs)
6. [Caregivers](#caregivers)
7. [Transport](#transport)
8. [Admin](#admin)
9. [Data Models](#data-models)
10. [Error Handling](#error-handling)

---

## 🔐 Authentication

### Login with Credentials

**Endpoint:** `POST /api/auth/signin`
**Type:** Public
**Description:** Authenticate user with email and password

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "callbackUrl": "/dashboard"
}
```

**Response:**
```json
{
  "url": "/family/dashboard",
  "ok": true,
  "status": 200
}
```

**Response Headers:**
- Sets HTTP-only cookie: `next-auth.session-token`

---

### Login with Google OAuth

**Endpoint:** `GET /api/auth/signin/google`
**Type:** Public
**Description:** Redirect to Google OAuth login

**Usage:**
```javascript
// Redirect user to this URL
window.location.href = 'https://your-domain.com/api/auth/signin/google';
```

---

### Register New User

**Endpoint:** `POST /api/auth/register`
**Type:** Public
**Description:** Create new user account

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "type": "FAMILY" // or "CAREGIVER" or "ADMIN"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "clx1234567890",
    "name": "John Doe",
    "email": "john@example.com",
    "type": "FAMILY"
  }
}
```

---

### Get Current User Session

**Endpoint:** `GET /api/auth/session`
**Type:** Protected
**Description:** Get current authenticated user details

**Response:**
```json
{
  "user": {
    "id": "clx1234567890",
    "name": "John Doe",
    "email": "john@example.com",
    "type": "FAMILY",
    "hasProfile": true
  },
  "expires": "2026-02-15T00:00:00.000Z"
}
```

---

### Logout

**Endpoint:** `POST /api/auth/signout`
**Type:** Protected
**Description:** End user session

**Response:**
```json
{
  "url": "/"
}
```

---

## 👤 User Management

### Create Family Profile

**Endpoint:** `POST /api/family/profile`
**Type:** Protected (FAMILY users only)
**Description:** Create family member profile after registration

**Request Body:**
```json
{
  "phone": "+1-555-0123",
  "address": "123 Main St",
  "city": "San Francisco",
  "state": "CA",
  "zipCode": "94102",
  "emergencyContact": "Jane Doe",
  "emergencyPhone": "+1-555-0124"
}
```

**Response:**
```json
{
  "success": true,
  "profile": {
    "id": "prof_123",
    "userId": "clx1234567890",
    "address": "123 Main St",
    "city": "San Francisco",
    "state": "CA",
    "zipCode": "94102",
    "emergencyContactName": "Jane Doe",
    "emergencyContactPhone": "+1-555-0124"
  }
}
```

---

### Create Caregiver Profile

**Endpoint:** `POST /api/caregiver/profile`
**Type:** Protected (CAREGIVER users only)
**Description:** Create caregiver profile after registration

**Request Body:**
```json
{
  "phone": "+1-555-0125",
  "bio": "Experienced nurse with 10 years of elderly care",
  "experience": 10,
  "hourlyRate": 45.00,
  "address": "456 Oak Ave",
  "city": "San Francisco",
  "state": "CA",
  "zipCode": "94103",
  "specialties": "Elderly Care, Dementia Care, Mobility Assistance",
  "languages": "English, Spanish"
}
```

**Response:**
```json
{
  "success": true,
  "profile": {
    "id": "cg_123",
    "userId": "clx9876543210",
    "caregiverType": "ELDER_CARE_SPECIALIST",
    "bio": "Experienced nurse with 10 years of elderly care",
    "experience": 10,
    "hourlyRate": 45.00,
    "specializations": ["Elderly Care", "Dementia Care", "Mobility Assistance"],
    "languages": ["English", "Spanish"],
    "rating": 0,
    "totalReviews": 0,
    "isActive": true,
    "verificationStatus": "PENDING"
  }
}
```

---

### Update User Information

**Endpoint:** `PUT /api/user/update`
**Type:** Protected
**Description:** Update user profile information

**Request Body:**
```json
{
  "name": "John Updated Doe",
  "phone": "+1-555-9999"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "clx1234567890",
    "name": "John Updated Doe",
    "email": "john@example.com",
    "phone": "+1-555-9999"
  }
}
```

---

## 📅 Bookings

### Create Booking

**Endpoint:** `POST /api/bookings`
**Type:** Protected (FAMILY users only)
**Description:** Book a caregiver for service

**Request Body:**
```json
{
  "caregiverId": "cg_123",
  "startDate": "2026-01-20T10:00:00.000Z",
  "endDate": "2026-01-20T14:00:00.000Z",
  "serviceType": "Elderly Care",
  "notes": "Patient needs assistance with mobility",
  "hours": 4
}
```

**Response:**
```json
{
  "success": true,
  "booking": {
    "id": "book_456",
    "familyId": "clx1234567890",
    "caregiverId": "cg_123",
    "startDate": "2026-01-20T10:00:00.000Z",
    "endDate": "2026-01-20T14:00:00.000Z",
    "serviceType": "Elderly Care",
    "status": "PENDING",
    "totalCost": 180.00,
    "notes": "Patient needs assistance with mobility",
    "createdAt": "2026-01-15T12:00:00.000Z"
  }
}
```

---

### Get All Bookings

**Endpoint:** `GET /api/bookings`
**Type:** Protected
**Description:** Get user's bookings (filtered by role)

**Response for FAMILY:**
```json
{
  "bookings": [
    {
      "id": "book_456",
      "familyId": "clx1234567890",
      "caregiverId": "cg_123",
      "startDate": "2026-01-20T10:00:00.000Z",
      "endDate": "2026-01-20T14:00:00.000Z",
      "serviceType": "Elderly Care",
      "status": "CONFIRMED",
      "totalCost": 180.00,
      "notes": "Patient needs assistance with mobility",
      "caregiver": {
        "id": "cg_123",
        "caregiverType": "ELDER_CARE_SPECIALIST",
        "hourlyRate": 45.00,
        "rating": 4.8,
        "city": "San Francisco",
        "state": "CA",
        "user": {
          "name": "Sarah Johnson",
          "email": "sarah@example.com",
          "phone": "+1-555-0125"
        }
      }
    }
  ]
}
```

**Response for CAREGIVER:**
```json
{
  "bookings": [
    {
      "id": "book_456",
      "familyId": "clx1234567890",
      "caregiverId": "cg_123",
      "startDate": "2026-01-20T10:00:00.000Z",
      "status": "PENDING",
      "totalCost": 180.00,
      "serviceType": "Elderly Care",
      "family": {
        "id": "fam_123",
        "address": "123 Main St",
        "city": "San Francisco",
        "user": {
          "name": "John Doe",
          "email": "john@example.com",
          "phone": "+1-555-0123"
        }
      }
    }
  ]
}
```

---

### Accept/Decline/Cancel Booking

**Endpoint:** `PATCH /api/bookings/[id]`
**Type:** Protected
**Description:** Update booking status

**Request Body:**
```json
{
  "action": "accept" // or "decline" or "cancel" or "complete"
}
```

**Response:**
```json
{
  "success": true,
  "booking": {
    "id": "book_456",
    "status": "CONFIRMED",
    "updatedAt": "2026-01-15T12:30:00.000Z"
  }
}
```

**Actions:**
- `accept` - Caregiver accepts booking (PENDING → CONFIRMED)
- `decline` - Caregiver declines booking (PENDING → CANCELLED)
- `cancel` - Family cancels booking (ANY → CANCELLED)
- `complete` - Mark booking as completed (CONFIRMED → COMPLETED)

---

### Delete Booking

**Endpoint:** `DELETE /api/bookings/[id]`
**Type:** Protected
**Description:** Permanently delete a booking

**Response:**
```json
{
  "success": true,
  "message": "Booking deleted successfully"
}
```

---

## 🏥 Health Records

### Get Health Records

**Endpoint:** `GET /api/health-records`
**Type:** Protected (FAMILY users only)
**Description:** Get all health records for family

**Response:**
```json
{
  "records": [
    {
      "id": "rec_789",
      "familyId": "fam_123",
      "title": "Blood Test Results",
      "type": "LAB_REPORT",
      "fileUrl": "/uploads/health-records/1234567890-bloodtest.pdf",
      "doctorName": "Dr. Smith",
      "date": "2026-01-10T00:00:00.000Z",
      "createdAt": "2026-01-10T14:00:00.000Z"
    }
  ]
}
```

**Record Types:**
- `LAB_REPORT` - Laboratory test results
- `IMAGING` - X-rays, MRI, CT scans
- `PRESCRIPTION` - Medication prescriptions
- `MEDICAL_REPORT` - General medical reports

---

### Upload Health Record

**Endpoint:** `POST /api/health-records`
**Type:** Protected (FAMILY users only)
**Content-Type:** `multipart/form-data`
**Description:** Upload medical document with metadata

**Request Body (FormData):**
```javascript
const formData = new FormData();
formData.append('file', fileBlob); // PDF, JPG, PNG, DOC
formData.append('title', 'Blood Test Results');
formData.append('type', 'LAB_REPORT');
formData.append('date', '2026-01-10');
formData.append('doctorName', 'Dr. Smith');
```

**Response:**
```json
{
  "success": true,
  "record": {
    "id": "rec_789",
    "familyId": "fam_123",
    "title": "Blood Test Results",
    "type": "LAB_REPORT",
    "fileUrl": "/uploads/health-records/1234567890-bloodtest.pdf",
    "doctorName": "Dr. Smith",
    "date": "2026-01-10T00:00:00.000Z"
  }
}
```

**Accepted File Types:**
- PDF (`.pdf`)
- Images (`.jpg`, `.jpeg`, `.png`)
- Documents (`.doc`, `.docx`)

**Max File Size:** 10MB

---

## 📝 Care Logs

### Get Care Logs

**Endpoint:** `GET /api/care-logs`
**Type:** Protected
**Description:** Get care logs (FAMILY sees all, CAREGIVER sees only their own)

**Response:**
```json
{
  "careLogs": [
    {
      "id": "log_321",
      "bookingId": "book_456",
      "caregiverId": "cg_123",
      "date": "2026-01-15T10:00:00.000Z",
      "vitals": "BP: 120/80, Temp: 98.6°F, Pulse: 72",
      "medications": "Aspirin 81mg - morning dose administered",
      "activities": "Light walking exercise, 20 minutes",
      "notes": "Patient in good spirits, mobility improving",
      "caregiver": {
        "user": {
          "name": "Sarah Johnson"
        }
      },
      "booking": {
        "serviceType": "Elderly Care",
        "family": {
          "user": {
            "name": "John Doe"
          }
        }
      }
    }
  ]
}
```

---

### Create Care Log

**Endpoint:** `POST /api/care-logs`
**Type:** Protected (CAREGIVER users only)
**Description:** Document patient care session

**Request Body:**
```json
{
  "bookingId": "book_456",
  "vitals": "BP: 120/80, Temp: 98.6°F, Pulse: 72",
  "medications": "Aspirin 81mg - morning dose administered",
  "activities": "Light walking exercise, 20 minutes",
  "notes": "Patient in good spirits, mobility improving"
}
```

**Response:**
```json
{
  "success": true,
  "careLog": {
    "id": "log_321",
    "bookingId": "book_456",
    "caregiverId": "cg_123",
    "date": "2026-01-15T10:00:00.000Z",
    "vitals": "BP: 120/80, Temp: 98.6°F, Pulse: 72",
    "medications": "Aspirin 81mg - morning dose administered",
    "activities": "Light walking exercise, 20 minutes",
    "notes": "Patient in good spirits, mobility improving"
  }
}
```

---

## 👨‍⚕️ Caregivers

### Search Caregivers

**Endpoint:** `GET /api/caregivers/search`
**Type:** Public
**Description:** Search and filter available caregivers

**Query Parameters:**
- `type` - Filter by caregiver type (optional)
- `search` - Search by name or specialization (optional)

**Example:**
```
GET /api/caregivers/search?type=ELDER_CARE_SPECIALIST&search=dementia
```

**Response:**
```json
{
  "caregivers": [
    {
      "id": "cg_123",
      "caregiverType": "ELDER_CARE_SPECIALIST",
      "bio": "Experienced nurse with 10 years of elderly care",
      "experience": 10,
      "hourlyRate": 45.00,
      "rating": 4.8,
      "totalReviews": 24,
      "specializations": ["Elderly Care", "Dementia Care", "Mobility Assistance"],
      "languages": ["English", "Spanish"],
      "city": "San Francisco",
      "state": "CA",
      "isActive": true,
      "verificationStatus": "VERIFIED",
      "user": {
        "name": "Sarah Johnson",
        "email": "sarah@example.com",
        "image": null
      }
    }
  ]
}
```

**Caregiver Types:**
- `ELDER_CARE_SPECIALIST` - Elderly care specialist
- `NURSE` - Licensed nurse
- `PHYSIOTHERAPIST` - Physical therapist
- `COMPANION` - Companion care
- `SPECIALIZED_CARE` - Specialized medical care

**Verification Status:**
- `PENDING` - Verification in progress
- `VERIFIED` - Verified caregiver
- `REJECTED` - Verification rejected

---

## 🚗 Transport

### Request Transport

**Endpoint:** `POST /api/transport/request`
**Type:** Protected (FAMILY users only)
**Description:** Request medical transport service

**Request Body:**
```json
{
  "pickup": "123 Main St, San Francisco, CA",
  "dropoff": "456 Hospital Drive, San Francisco, CA",
  "date": "2026-01-20",
  "time": "10:00",
  "notes": "Wheelchair accessible vehicle required"
}
```

**Response:**
```json
{
  "success": true,
  "request": {
    "id": "trans_654",
    "familyId": "clx1234567890",
    "pickup": "123 Main St, San Francisco, CA",
    "dropoff": "456 Hospital Drive, San Francisco, CA",
    "date": "2026-01-20T00:00:00.000Z",
    "time": "10:00",
    "notes": "Wheelchair accessible vehicle required",
    "status": "PENDING",
    "createdAt": "2026-01-15T12:00:00.000Z"
  }
}
```

---

## 👑 Admin

### Get All Users

**Endpoint:** `GET /api/admin/users`
**Type:** Protected (ADMIN only)
**Description:** Get all users in the system

**Response:**
```json
{
  "users": [
    {
      "id": "clx1234567890",
      "name": "John Doe",
      "email": "john@example.com",
      "type": "FAMILY",
      "createdAt": "2026-01-01T00:00:00.000Z",
      "familyProfile": {
        "id": "fam_123",
        "city": "San Francisco",
        "state": "CA"
      }
    }
  ]
}
```

---

### Get All Caregivers

**Endpoint:** `GET /api/admin/caregivers`
**Type:** Protected (ADMIN only)
**Description:** Get all caregivers with details

**Response:**
```json
{
  "caregivers": [
    {
      "id": "cg_123",
      "caregiverType": "ELDER_CARE_SPECIALIST",
      "verificationStatus": "PENDING",
      "hourlyRate": 45.00,
      "rating": 4.8,
      "totalReviews": 24,
      "user": {
        "name": "Sarah Johnson",
        "email": "sarah@example.com",
        "createdAt": "2026-01-05T00:00:00.000Z"
      }
    }
  ]
}
```

---

### Verify Caregiver

**Endpoint:** `POST /api/admin/caregivers/[id]/verify`
**Type:** Protected (ADMIN only)
**Description:** Approve or reject caregiver verification

**Request Body:**
```json
{
  "action": "approve" // or "reject"
}
```

**Response:**
```json
{
  "success": true,
  "caregiver": {
    "id": "cg_123",
    "verificationStatus": "VERIFIED"
  }
}
```

---

## 📦 Data Models

### User
```typescript
{
  id: string;
  name: string;
  email: string;
  phone?: string;
  type: "FAMILY" | "CAREGIVER" | "ADMIN";
  image?: string;
  emailVerified?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

### FamilyProfile
```typescript
{
  id: string;
  userId: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
}
```

### CaregiverProfile
```typescript
{
  id: string;
  userId: string;
  caregiverType: "ELDER_CARE_SPECIALIST" | "NURSE" | "PHYSIOTHERAPIST" | "COMPANION" | "SPECIALIZED_CARE";
  bio: string;
  experience: number;
  hourlyRate: Decimal;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  specializations: string[];
  languages: string[];
  rating: Decimal;
  totalReviews: number;
  isActive: boolean;
  verificationStatus: "PENDING" | "VERIFIED" | "REJECTED";
}
```

### Booking
```typescript
{
  id: string;
  familyId: string;
  caregiverId: string;
  startDate: Date;
  endDate: Date;
  serviceType: string;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  totalCost: Decimal;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### HealthRecord
```typescript
{
  id: string;
  familyId: string;
  title: string;
  type: "LAB_REPORT" | "IMAGING" | "PRESCRIPTION" | "MEDICAL_REPORT";
  fileUrl: string;
  doctorName?: string;
  date: Date;
  createdAt: Date;
}
```

### CareLog
```typescript
{
  id: string;
  bookingId: string;
  caregiverId: string;
  date: Date;
  vitals?: string;
  medications?: string;
  activities?: string;
  notes: string;
  createdAt: Date;
}
```

---

## ⚠️ Error Handling

### Error Response Format
```json
{
  "error": "Error message here",
  "code": "ERROR_CODE",
  "details": {} // Optional additional details
}
```

### HTTP Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| `200` | OK | Request successful |
| `201` | Created | Resource created successfully |
| `400` | Bad Request | Invalid request parameters |
| `401` | Unauthorized | Authentication required |
| `403` | Forbidden | Insufficient permissions |
| `404` | Not Found | Resource not found |
| `409` | Conflict | Resource already exists |
| `500` | Server Error | Internal server error |

### Common Errors

**Unauthorized (401)**
```json
{
  "error": "Unauthorized",
  "code": "AUTH_REQUIRED"
}
```

**Forbidden (403)**
```json
{
  "error": "Forbidden - Family members only",
  "code": "INSUFFICIENT_PERMISSIONS"
}
```

**Not Found (404)**
```json
{
  "error": "Booking not found",
  "code": "RESOURCE_NOT_FOUND"
}
```

**Validation Error (400)**
```json
{
  "error": "Validation failed",
  "code": "VALIDATION_ERROR",
  "details": {
    "email": "Invalid email format",
    "password": "Password must be at least 8 characters"
  }
}
```

---

## 🔧 Environment Variables

Mobile app needs to configure:

```env
# Backend URL
NEXT_PUBLIC_API_URL=https://your-domain.com

# OAuth (if using)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

---

## 📱 Mobile App Implementation Example

### Authentication Flow

```typescript
// 1. Login
async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/api/auth/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      callbackUrl: '/dashboard',
    }),
  });

  const data = await response.json();

  if (data.ok) {
    // Store session token in secure storage
    await SecureStore.setItemAsync('session', data.token);
    return data;
  }

  throw new Error(data.error);
}

// 2. Get current user
async function getCurrentUser() {
  const response = await fetch(`${API_URL}/api/auth/session`, {
    credentials: 'include',
  });

  return await response.json();
}

// 3. Make authenticated request
async function makeAuthRequest(endpoint: string, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (response.status === 401) {
    // Redirect to login
    throw new Error('Unauthorized');
  }

  return await response.json();
}
```

### Booking Example

```typescript
// Create booking
async function createBooking(bookingData) {
  const response = await makeAuthRequest('/api/bookings', {
    method: 'POST',
    body: JSON.stringify(bookingData),
  });

  return response;
}

// Get bookings
async function getBookings() {
  const response = await makeAuthRequest('/api/bookings');
  return response.bookings;
}

// Accept booking (for caregivers)
async function acceptBooking(bookingId: string) {
  const response = await makeAuthRequest(`/api/bookings/${bookingId}`, {
    method: 'PATCH',
    body: JSON.stringify({ action: 'accept' }),
  });

  return response;
}
```

### File Upload Example

```typescript
// Upload health record
async function uploadHealthRecord(file, metadata) {
  const formData = new FormData();
  formData.append('file', {
    uri: file.uri,
    type: file.type,
    name: file.fileName,
  });
  formData.append('title', metadata.title);
  formData.append('type', metadata.type);
  formData.append('date', metadata.date);
  formData.append('doctorName', metadata.doctorName);

  const response = await fetch(`${API_URL}/api/health-records`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
    // Don't set Content-Type header, FormData will set it automatically
  });

  return await response.json();
}
```

---

## 🎯 Integration Checklist

- [ ] Configure `API_URL` environment variable
- [ ] Implement authentication flow (login, register, session)
- [ ] Setup secure token storage
- [ ] Implement API client with credential handling
- [ ] Test all endpoints with Postman/Insomnia
- [ ] Implement error handling for all requests
- [ ] Setup file upload for health records
- [ ] Test booking create/accept/decline flow
- [ ] Test caregiver search and filtering
- [ ] Implement logout flow
- [ ] Setup refresh token mechanism (if needed)
- [ ] Test on both iOS and Android

---

## 📞 Support

**Backend Repository:** `rohanvkumarv/carebow`
**Branch:** `claude/mvp-landing-dashboard-Mcaum`

**Issues:** Contact backend team for API questions or bug reports

---

## 🔄 Changelog

### v1.0.0 (2026-01-15)
- Initial API documentation
- All core endpoints documented
- Authentication flow documented
- Data models defined
- Error handling standardized
- Mobile app integration examples added

---

**Last Updated:** January 15, 2026
**Maintained by:** Backend Team
