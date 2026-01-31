# Authentication Implementation Guide

## Overview
This guide provides a complete implementation of the authentication system for CareBow, fixing issues from the previous implementation and adapting it for multiple user types (Family, Caregiver, Admin).

---

## 🔧 Key Improvements from Previous Implementation

### Problems in Old Auth Code:
1. ❌ Email verification flow was unreliable
2. ❌ Cookie setting timing issues (set before verification)
3. ❌ returnUrl handling was broken
4. ❌ Complex redirect logic
5. ❌ Only supported 2 user types (user, vendor)
6. ❌ Used JWT session strategy but wanted cookie-based

### Fixes in New Implementation:
1. ✅ Proper email verification flow
2. ✅ Cookie set only after successful verification
3. ✅ Clean redirect handling with middleware
4. ✅ Simple, predictable redirect logic
5. ✅ Support for 3+ user types (Family, Caregiver, Admin)
6. ✅ Database sessions (not JWT) with cookie reference

---

## 📁 File Structure

```
src/
├── lib/
│   ├── auth.ts                 # NextAuth configuration
│   ├── prisma.ts               # Prisma client
│   └── password.ts             # Password hashing utilities
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/route.ts
│   │   │   └── register/route.ts
│   │   ├── check-auth/route.ts
│   │   └── logout/route.ts
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── verify-email/page.tsx
│   └── middleware.ts
└── context/
    └── AuthContext.tsx
```

---

## 🔐 Implementation Files

### 1. Prisma Schema (Relevant Parts)

```prisma
// prisma/schema.prisma

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  emailVerified DateTime?
  name          String?
  phone         String?   @unique
  image         String?
  type          UserType  @default(FAMILY)
  password      String?   // For email/password auth

  accounts      Account[]
  sessions      Session[]

  familyProfile     FamilyProfile?
  caregiverProfile  CaregiverProfile?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([email])
  @@index([type])
}

enum UserType {
  FAMILY
  CAREGIVER
  ADMIN
}

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
```

### 2. Password Utilities

```typescript
// src/lib/password.ts
import bcrypt from 'bcryptjs';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}
```

### 3. Prisma Client

```typescript
// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
```

### 4. NextAuth Configuration

```typescript
// src/lib/auth.ts
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import { verifyPassword } from "./password";

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "database", // NOT jwt - we use database sessions
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        const isValid = await verifyPassword(
          credentials.password as string,
          user.password
        );

        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        if (!user.emailVerified) {
          throw new Error("Email not verified");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          type: user.type,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        // For OAuth providers, ensure user exists and is linked
        if (account?.provider === "google") {
          let dbUser = await prisma.user.findUnique({
            where: { email: user.email as string },
          });

          if (!dbUser) {
            // Create new user with default type (they'll choose during onboarding)
            dbUser = await prisma.user.create({
              data: {
                email: user.email as string,
                name: user.name,
                image: user.image,
                type: "FAMILY", // Default to family
                emailVerified: new Date(), // OAuth emails are pre-verified
              },
            });
          } else if (!dbUser.emailVerified) {
            // OAuth verifies email
            await prisma.user.update({
              where: { id: dbUser.id },
              data: { emailVerified: new Date() },
            });
          }
        }

        return true;
      } catch (error) {
        console.error("Sign in error:", error);
        return false;
      }
    },

    async redirect({ url, baseUrl }) {
      // If url is already a full URL starting with baseUrl, use it
      if (url.startsWith(baseUrl)) {
        return url;
      }
      // If it's a relative URL, make it absolute
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      // Fallback to baseUrl
      return baseUrl;
    },

    async session({ session, user }) {
      // Add user type to session
      if (session.user) {
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: {
            id: true,
            type: true,
            familyProfile: { select: { id: true } },
            caregiverProfile: { select: { id: true } },
          },
        });

        if (dbUser) {
          session.user.id = dbUser.id;
          session.user.type = dbUser.type;
          session.user.hasProfile = !!(
            dbUser.familyProfile || dbUser.caregiverProfile
          );
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
    verifyRequest: "/verify-email",
  },
  trustHost: true,
  debug: process.env.NODE_ENV === "development",
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
```

### 5. NextAuth Route Handler

```typescript
// src/app/api/auth/[...nextauth]/route.ts
export { GET, POST } from "@/lib/auth";
export const runtime = "nodejs";
```

### 6. Registration API

```typescript
// src/app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { sendVerificationEmail } from "@/lib/email";
import { randomBytes } from "crypto";

export async function POST(req: Request) {
  try {
    const { email, password, name, type } = await req.json();

    // Validation
    if (!email || !password || !type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        type,
      },
    });

    // Generate verification token
    const token = randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires,
      },
    });

    // Send verification email
    await sendVerificationEmail(email, token);

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful. Please check your email to verify your account.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Registration failed" },
      { status: 500 }
    );
  }
}
```

### 7. Check Auth API

```typescript
// src/app/api/check-auth/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        image: session.user.image,
        type: session.user.type,
        hasProfile: session.user.hasProfile,
      },
    });
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to check auth" },
      { status: 500 }
    );
  }
}
```

### 8. Logout API

```typescript
// src/app/api/logout/route.ts
import { NextResponse } from "next/server";
import { signOut } from "@/lib/auth";

export async function POST() {
  try {
    await signOut({ redirect: false });

    return NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { success: false, error: "Logout failed" },
      { status: 500 }
    );
  }
}
```

### 9. Middleware for Route Protection

```typescript
// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

// Define public routes that don't require authentication
const publicRoutes = [
  "/",
  "/about",
  "/services",
  "/contact",
  "/pricing",
  "/faq",
  "/login",
  "/register",
  "/verify-email",
  "/forgot-password",
  "/reset-password",
];

// Helper to check if path is public
function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // Allow API routes (they handle their own auth)
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Allow static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check authentication
  const session = await auth();

  if (!session || !session.user) {
    // Redirect to login with return URL
    const url = new URL("/login", request.url);
    url.searchParams.set("returnUrl", pathname);
    return NextResponse.redirect(url);
  }

  const userType = session.user.type;

  // Route protection based on user type
  if (pathname.startsWith("/family") && userType !== "FAMILY") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (pathname.startsWith("/caregiver") && userType !== "CAREGIVER") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (pathname.startsWith("/admin") && userType !== "ADMIN") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  // Check if user has completed profile (for non-admin users)
  if (userType !== "ADMIN" && !session.user.hasProfile) {
    // Redirect to profile creation
    if (!pathname.startsWith("/onboarding")) {
      return NextResponse.redirect(new URL("/onboarding", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\..*|api/auth).*)",
  ],
};
```

### 10. Auth Context Provider

```typescript
// src/context/AuthContext.tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  type: "FAMILY" | "CAREGIVER" | "ADMIN";
  hasProfile: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check auth status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/check-auth");
      const data = await response.json();

      if (data.success) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    // This will be handled by NextAuth signIn
    // Just refresh user after login
    await checkAuth();
  };

  const logout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const refreshUser = async () => {
    await checkAuth();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
```

### 11. Login Page

```typescript
// src/app/(auth)/login/page.tsx
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        // Get user type and redirect accordingly
        const response = await fetch("/api/check-auth");
        const data = await response.json();

        if (data.success) {
          const userType = data.user.type;
          const hasProfile = data.user.hasProfile;

          // Redirect based on user type
          if (!hasProfile) {
            router.push("/onboarding");
          } else if (userType === "FAMILY") {
            router.push(returnUrl !== "/" ? returnUrl : "/family/dashboard");
          } else if (userType === "CAREGIVER") {
            router.push(returnUrl !== "/" ? returnUrl : "/caregiver/dashboard");
          } else if (userType === "ADMIN") {
            router.push(returnUrl !== "/" ? returnUrl : "/admin/dashboard");
          }
        }
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    await signIn("google", {
      callbackUrl: returnUrl,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to CareBow
          </h2>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link href="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                {/* Google icon SVG */}
              </svg>
              Sign in with Google
            </button>
          </div>

          <div className="text-center text-sm">
            <span className="text-gray-600">Don't have an account? </span>
            <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
```

---

## 🔑 Key Differences from Old Implementation

### 1. Database Sessions Instead of JWT
```typescript
// OLD (broken)
session: { strategy: "jwt" }

// NEW (fixed)
session: { strategy: "database" }
```

**Why:** Database sessions are more secure, easier to invalidate, and work better with NextAuth's session management.

### 2. Clean Redirect Logic
```typescript
// OLD (complex, broken returnUrl handling)
Complex redirect callback with cookie checks and multiple conditions

// NEW (simple, middleware-based)
Middleware handles all redirects based on user type and profile status
```

### 3. Email Verification
```typescript
// OLD (unreliable)
Set cookies before verification

// NEW (reliable)
Only set session after email is verified or OAuth is used
```

### 4. Multi-User Type Support
```typescript
// OLD (2 types: user, vendor)
if (authData.type === 'vendor') { ... }
if (authData.type === 'user') { ... }

// NEW (3+ types: FAMILY, CAREGIVER, ADMIN)
enum UserType {
  FAMILY
  CAREGIVER
  ADMIN
}
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install next-auth@latest @auth/prisma-adapter @prisma/client bcryptjs
npm install -D @types/bcryptjs
```

### 2. Setup Environment Variables
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here # Generate with: openssl rand -base64 32

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

DATABASE_URL=postgresql://user:password@localhost:5432/carebow
```

### 3. Run Migrations
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 4. Test Auth Flow
1. Start app: `npm run dev`
2. Register a new user
3. Check email for verification link
4. Click link, verify email
5. Login
6. Should redirect to correct dashboard

---

## 📝 Usage Examples

### Protecting a Page
```typescript
// src/app/family/dashboard/page.tsx
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function FamilyDashboard() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (session.user.type !== "FAMILY") {
    redirect("/unauthorized");
  }

  return <div>Family Dashboard</div>;
}
```

### Using Auth in API Routes
```typescript
// src/app/api/bookings/route.ts
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get bookings for this user
  // ...
}
```

### Using Auth Context in Components
```typescript
"use client";

import { useAuth } from "@/context/AuthContext";

export default function ProfileButton() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div>
      <p>Welcome, {user.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

---

## 🔒 Security Best Practices

1. ✅ Use HTTPS in production
2. ✅ Set secure cookie flags in production
3. ✅ Use strong password hashing (bcrypt with high salt rounds)
4. ✅ Validate all inputs
5. ✅ Rate limit authentication endpoints
6. ✅ Use CSRF protection (NextAuth handles this)
7. ✅ Implement account lockout after failed attempts
8. ✅ Log authentication events
9. ✅ Use secure session tokens
10. ✅ Implement proper session expiry

---

## 🐛 Troubleshooting

### Issue: Infinite redirect loop
**Solution:** Check middleware matcher config and ensure auth routes are excluded

### Issue: Session not persisting
**Solution:** Verify database session is created and cookie is set

### Issue: Google OAuth not working
**Solution:** Check Google Console credentials and authorized redirect URIs

### Issue: Email verification not working
**Solution:** Check SMTP settings and verify email template

---

This implementation provides a robust, secure, and scalable authentication system for CareBow!
