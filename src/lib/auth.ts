import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import { verifyPassword } from "./password";

export const { handlers, auth, signIn, signOut } = NextAuth({
  // Pages
  pages: {
    signIn: "/login",
    error: "/login",
  },

  // JWT Sessions (simple, works everywhere)
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // Auth Providers
  providers: [
    // Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // Email/Password
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        // Find user in database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        // Verify password
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

        // Return user data for JWT
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

  // Callbacks
  callbacks: {
    // Add user data to JWT token (only on login)
    async jwt({ token, user, trigger }) {
      // On initial sign in, add user data to token
      if (user) {
        token.id = user.id;
        token.type = user.type;

        // Check if profile exists (only on login, not every request!)
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: {
            familyProfile: { select: { id: true } },
            caregiverProfile: { select: { id: true } },
          },
        });

        token.hasProfile = !!(dbUser?.familyProfile || dbUser?.caregiverProfile);
      }

      // If trigger is "update", refresh profile status
      if (trigger === "update" && token.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: {
            type: true,
            familyProfile: { select: { id: true } },
            caregiverProfile: { select: { id: true } },
          },
        });

        if (dbUser) {
          token.type = dbUser.type;
          token.hasProfile = !!(dbUser.familyProfile || dbUser.caregiverProfile);
        }
      }

      return token;
    },

    // Add token data to session
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.type = token.type as any;
        session.user.hasProfile = token.hasProfile as boolean;
      }
      return session;
    },

    // For OAuth: save user to database
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email as string },
        });

        if (!dbUser) {
          await prisma.user.create({
            data: {
              email: user.email as string,
              name: user.name,
              image: user.image,
              type: "FAMILY",
              emailVerified: new Date(),
            },
          });
        }
      }
      return true;
    },
  },

  trustHost: true,
  debug: process.env.NODE_ENV === "development",
});
